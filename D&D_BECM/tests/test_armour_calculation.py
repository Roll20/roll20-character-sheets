"""Exercise the existing armour formula without adding an armour data table."""

import math
from pathlib import Path
import re
import unittest

from test_movement import InputParser


class ArmourCalculationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        parser = InputParser()
        parser.feed((Path(__file__).resolve().parents[1] / 'BDnDSheet.html').read_text())
        cls.formulas = parser.values

    def armour_class(self, weight, **overrides):
        values = {'eqarmour': weight, 'paenabled': 0, 'dexterity_mod': 0}
        values.update(overrides)

        def resolve(name):
            name = name.lower()
            if name not in values:
                formula = re.sub(
                    r'@\{([^}]+)\}', lambda match: str(resolve(match[1])),
                    self.formulas[name],
                )
                values[name] = eval(
                    formula, {'__builtins__': {}},
                    {'round': round, 'floor': math.floor, 'abs': abs},
                )
            return values[name]

        return resolve('ac')

    def test_existing_labelled_armour_values(self):
        # These expectations are already printed on the existing sheet options.
        for weight, ac in ((0, 9), (200, 7), (300, 6), (400, 5),
                           (450, 4), (500, 3), (750, 0)):
            with self.subTest(weight=weight):
                self.assertEqual(self.armour_class(weight), ac)

    def test_full_plate_does_not_raise_ac_after_suit_armour(self):
        self.assertEqual(self.armour_class(900), self.armour_class(750))
        self.assertEqual(self.armour_class(900), 0)

    def test_full_plate_combines_with_existing_bonuses(self):
        self.assertEqual(self.armour_class(
            900, eqarmourmagic=2, ac_shield=-1, ac_magic=1, dexterity_mod=1,
        ), -5)

    def test_better_natural_ac_is_preserved(self):
        self.assertEqual(self.armour_class(900, natac=-2), -2)

    def test_piecemeal_armour_ignores_full_set_ac(self):
        for weight in (0, 500, 750, 900):
            with self.subTest(weight=weight):
                self.assertEqual(self.armour_class(weight, paenabled=1, pa_pr=40), 5)


if __name__ == '__main__':
    unittest.main()
