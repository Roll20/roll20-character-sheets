"""
Small module for helper code that could be helpful everywhere in the part module
"""

from typing import Dict, Set, ClassVar, List
from dataclasses import dataclass
import string

# Useful constants
CHARACTERISTICS = [
    "intelligence",
    "perception",
    "strength",
    "stamina",
    "presence",
    "communication",
    "dexterity",
    "quickness",
]
TECHNIQUES = [
    "creo",
    "intellego",
    "muto",
    "perdo",
    "rego",
]

FORMS = [
    "animal",
    "aquam",
    "auram",
    "corpus",
    "herbam",
    "ignem",
    "imaginem",
    "mentem",
    "terram",
    "vim",
]


def repeat_template(
    tpl, values, *, sep="\n", str_key="value", tuple_keys=(), rep_key="%%"
):
    """
    Repeatedly formats a template with values from the list.

    This function behaves differently based on the type of values:
    - if the value is a str, it uses %-formatting with a dict where:
        - key.lower() maps to value.lower()
        - key.capitalize() maps to value.capitalize()
    -if the value is a tuple, it uses %-formatting with a dict where:
        - the i-th key found in tuple_keys has the i-th value found in the tuple
        ( the shortes length between the two is used)
    - else, it uses str.replace(rep_key, str(value)) to format the template

    Arguments:
        tpl: template to repeatedly format
        values: iterable of values to format the template with
        str_key: key to use for the string behavior
        rep_key: key to replace when the value is not a string
        sep: separator used to join all formatted templates
    """
    elements = []
    for value in values:
        if isinstance(value, str):
            elements.append(
                tpl
                % {
                    str_key.lower(): value.lower(),
                    str_key.capitalize(): value.capitalize(),
                }
            )
        elif isinstance(value, tuple):
            elements.append(tpl % dict(zip(tuple_keys, value)))
        else:
            elements.append(tpl.replace(rep_key, str(value)))
    return sep.join(elements)


def enumerate_helper(iterable, funcs=(), start=0):
    for i, v in enumerate(iterable, start=start):
        yield (i, v, *tuple(f(v) for f in funcs))


def roll(*parts: str) -> str:
    """
    formats parts of a roll into a string

    Returns:
        The string of the sum of the parts
    """
    return " + ".join(parts)


@dataclass
class RollTemplate:
    TEMPLATES: ClassVar[Dict[str, Set[str]]] = {
        "generic": {"Label", "Banner", "Result"},
        "ability": {
            "banner",
            "name",
            *(f"{n}{i}" for n in ("label", "result") for i in range(5)),
        },
        "arcane": {
            "textfield",
            "labelfield",
            *(f"{n}{i}" for n in ("label", "result") for i in range(7)),
        },
        "spell": {
            "character",
            "duration",
            "effect",
            "Form",
            "Level",
            "mastery",
            "range",
            "roll",
            "sigil",
            "spell",
            "target",
            "Technique",
        },
    }
    SHARED_KEYS: ClassVar[List[str]] = ["stress", "botch-button", "crit-button"]

    name: str
    fields: Dict[str, str]
    botch: str = "botch"
    critical: str = "critical"

    def __post_init__(self):
        msg = f"If you added it recently, update TEMPLATES in {__file__}"
        if self.name not in self.TEMPLATES:
            raise ValueError(f"No roll-template named '{self.name}'. " + msg)
        if invalids := (self.fields.keys() - self.TEMPLATES[self.name]):
            raise ValueError(
                "roll-template '%s' has no key %s. %s"
                % (self.name, ", ".join(invalids), msg)
            )

    @property
    def _base(self) -> str:
        parts = [
            f"&{{template:{self.name}}}",
            *("{{%s=%s}}" % field for field in self.fields.items()),
            "{{botch-button=[@{botch_i18n}!](~@{character_name}|%s)}}" % self.botch,
            "{{crit-button=[@{botch_i18n}!](~@{character_name}|%s)}}" % self.critical,
        ]
        return " ".join(parts)

    @property
    def simple(self) -> str:
        s = self._base + " {{stress=}}"
        return s % {"die": "@{simple-die}"}

    @property
    def stress(self) -> str:
        s = self._base + " {{stress=1}}"
        return s % {"die": "@{stress-die}"}


def rolltemplate(
    template: str,
    fields: Dict[str, str] = None,
    botch: str = RollTemplate.botch,
    critical: str = RollTemplate.critical,
    **kwargs,
) -> RollTemplate:
    """
    Generate a rolltemplate call as a string

    Arguments:
        templae: name of the template to use
        fields: fields to add to the template
        botch: name of the roll button to use for botches
        critical: name of the roll button to use for criticals
        kwargs: fields to add to the template

    Returns:
        A string representing a roll template call. The string
        must be formatted using python's percent formatting with
        the key 'stress', to toggle between simple and stress
        rolls.
    """
    if fields is None:
        fields = {}
    if duplicates := fields.keys() & kwargs.keys():
        raise ValueError("Duplicated fields: " + ", ".join(duplicates))
    fields.update(kwargs)
    return RollTemplate(template, fields, botch=botch, critical=critical)
