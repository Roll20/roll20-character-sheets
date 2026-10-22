"""Check the sheet's movement formulas against Rules Cyclopedia, page 88.

Run with: python3 -m unittest discover -s tests
"""

from html.parser import HTMLParser
import math
from pathlib import Path
import re
import unittest


class InputParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.values = {}

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        name = attrs.get("name", "")
        if tag == "input" and name.startswith("attr_"):
            self.values[name[5:].lower()] = attrs.get("value", "0")


class MovementTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        parser = InputParser()
        parser.feed((Path(__file__).resolve().parents[1] / "BDnDSheet.html").read_text())
        cls.formulas = parser.values

    def movement(self, weight, base=120, suit=False):
        values = {
            "total_weight": weight,
            "basemove": base,
            "eqsuittoggle": int(suit),
            "eqnosuittoggle": int(not suit),
        }

        def resolve(name):
            name = name.lower()
            if name not in values:
                formula = re.sub(
                    r"@\{([^}]+)\}",
                    lambda match: str(resolve(match[1])),
                    self.formulas[name],
                )
                values[name] = eval(
                    formula,
                    {"__builtins__": {}},
                    {"ceil": math.ceil, "floor": math.floor, "abs": abs},
                )
            return values[name]

        return tuple(resolve(name) for name in ("move_normal", "move_encounter", "move_run"))

    def test_encumbrance_table_and_boundaries(self):
        bands = [(0, 400, 120), (400, 800, 90), (800, 1200, 60),
                 (1200, 1600, 30), (1600, 2400, 15), (2400, 10000, 0)]
        self.assertEqual(self.movement(0), (120, 40, 120))
        for lower, upper, expected in bands:
            for weight in (lower + 0.01, lower + 1, (lower + upper) / 2, upper):
                with self.subTest(weight=weight):
                    self.assertEqual(self.movement(weight), (expected, expected / 3, expected))

    def test_custom_base_movement(self):
        for base in (0, 60, 90, 120, 180):
            for weight, fraction in ((0, 1), (600, 0.75), (1000, 0.5),
                                     (1400, 0.25), (2000, 0.125), (2401, 0)):
                with self.subTest(base=base, weight=weight):
                    normal = base * fraction
                    self.assertEqual(self.movement(weight, base), (normal, normal / 3, normal))

    def test_suit_armour_caps_movement_without_increasing_it(self):
        for weight, normal in ((0, 30), (800, 30), (1600, 30), (2000, 15), (2401, 0)):
            with self.subTest(weight=weight):
                self.assertEqual(self.movement(weight, suit=True), (normal, normal / 3, normal))

    def test_extreme_overload_cannot_produce_negative_movement(self):
        self.assertEqual(self.movement(1000000), (0, 0, 0))


if __name__ == "__main__":
    unittest.main()
