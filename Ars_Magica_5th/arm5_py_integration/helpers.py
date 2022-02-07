"""
Small module for helper code that could be helpful everywhere in the part module
"""

import itertools
import textwrap
from dataclasses import dataclass
from typing import ClassVar, Collection, Dict, List, Set, Tuple, Union

# Useful constants
CHARACTERISTICS = [
    "intelligence",
    "perception",
    "presence",
    "communication",
    "strength",
    "stamina",
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


def _match_lengths(
    left: Union[str, Collection[str]],
    right: Union[str, Collection[str]],
    lname: str = "left",
    rname: str = "rigth",
):
    left_len = 1 if isinstance(left, str) else len(left)
    right_len = 1 if isinstance(right, str) else len(right)

    if left_len != right_len and left_len != 1 and right_len != 1:
        raise ValueError(
            f"Cannot match {lname} length {left_len} to {rname} length {right_len}"
        )

    if isinstance(left, str) and isinstance(right, str):
        return zip([left], [right])
    left_iter = itertools.repeat(left) if isinstance(left, str) else left
    right_iter = itertools.repeat(right) if isinstance(right, str) else right
    return zip(left_iter, right_iter)


def repeat_format(
    string: str,
    *,
    replace: Union[str, Collection[str]] = None,
    by: Union[str, Collection[str]] = None,
    keys: Union[str, Collection[str]] = None,
    values: Union[str, Collection[str]] = None,
    keyvalues: Union[Tuple[str, str], Collection[Tuple[str, str]]] = None,
    separator: str = "\n",
):
    """
    Repeatedly format a string and concatenate teh results

    Two formatting options are available through different arguments.
    Simple formatting uses `str.replace()` and dictionary formatting uses
    "%"-style string formatting:

        - `str.replace()` formatting
           The function matches the length of ``replace`` and ``by`` and
           repeatedly calls `string.replace(replace, by)` on the elemnts
           from those arguments
        - "%"-style formatting
          The function matches the length of ``keys`` and ``values`` and
          repeatedly calls `string % mapping`, where mapping is a dict
          containing `key`, `key.lower()` and `key.title()` mapped to respective
          transformation of `value`.

    In both usage, an argument may be a single string to be used for each
    iterations.

    Arguments:
        string: str object to repeatedly format
        replace: collection of parts of `string` to replace using `str.replace`
        by: collection of values to replace by, using `str.replace`
        keys: collection of keys to replace using %-style formatting
        values: collection of values to replace using %-style formatting
        keyvalues: specifies both `keys` and `values` as a collection of pairs.
            Useful when passing a zip of a dictitem object.

    """
    if (replace is None) != (by is None):
        raise ValueError("Simple formatting requires both 'replace' and 'by' arguments")
    if (keys is None) != (values is None):
        raise ValueError(
            "Dictionary formatting requires both 'keys' and " "'values' arguments"
        )
    if (keys is not None) and (keyvalues is not None):
        raise ValueError("Cannot use 'keys' or 'values' arguments with " "'keyvalues'")
    if replace is None and keys is None and values is None:
        raise ValueError("No formatting arguments")

    if replace is not None and by is not None:
        # simple formatting with str.replace()
        return separator.join(
            string.replace(key, value)
            for key, value in _match_lengths(replace, by, "'replace'", "'by'")
        )
    elif (keys is not None and values is not None) or keyvalues is not None:
        # dictionary formatting
        if keys is not None and values is not None:
            pairs = _match_lengths(keys, values, "'keys'", "'values'")
        elif keyvalues is not None:
            pairs = keyvalues
        else:
            raise RuntimeError
        return separator.join(
            string
            % {key.lower(): value.lower(), key.title(): value.title(), key: value}
            for key, value in pairs
        )


def enumerate_helper(iterable, funcs=(), start=0):
    for i, v in enumerate(iterable, start=start):
        yield (i, v, *tuple(f(v) for f in funcs))


def xp(
    name: str,
    *,
    suffix="_exp",
    adv_suffix="_advancementExp",
    tot_suffix="_totalExp",
    factor=5,
) -> str:
    """
    Generate the HTML for the Xp parts of arts & abilities
    """
    return textwrap.dedent(
        f"""\
        <span class="flex-container-left">
            <span class="has-tooltip">
                <input type="text" class="number-xp" name="attr_{name}{suffix}" value="0"/>
                <span class="tooltip" data-i18n="tooltip-xp-input">
                    XP points in this art or ability. You can store either the total amount of XP, or just the XP towards the next score.
                </span>
            </span>
            <span class="flex-container-center">
                (
                <span class="has-tooltip">
                    <input type="number" class="number-xp advance" name="attr_{name}{adv_suffix}" value="{factor} * ((@{{{name}_Score}}) + 1)" disabled="true"/>
                    <span class="tooltip" style="width: 200px; margin-left: -100px;" data-i18n="tooltip-xp-step">Additional XP required for the next score, beyond the XP for the current level.<br>If you store only the XP towards the next score in the xp input, increase the score when this amount is reached.</span>
                </span>
                /
                <span class="has-tooltip">
                    <input type="number" class="number-xp total" name="attr_{name}{tot_suffix}" value="{factor} * (((@{{{name}_Score}}) + 1) * ((@{{{name}_Score}}) + 2) / 2)" disabled="true"/>
                    <span class="tooltip" style="width: 200px; margin-left: -100px;" data-i18n="tooltip-xp-total">Total XP required for the next score.<br>If you store the total XP in the XP input, increase the score when this amount is reached.</span>
                </span>
                )
            </span>
        </span>
        """
    )


def roll(*parts: str) -> str:
    """
    formats parts of a roll into a string

    Returns:
        The string of the sum of the parts
    """
    return " + ".join(parts)


@dataclass
class RollTemplate:
    """
    Helper class to create rolltemplate strings

    This class holds all the parts of a rolltemplate in-chat call and allows
    easier formatting of the rolltemplates. It also handles the simple die or
    stress die version of the rolltemplate through common mecanism.

    Note:
        It is specialized to the Ars Magica 5th sheet
    """

    TEMPLATES: ClassVar[Dict[str, Set[str]]] = {
        "generic": {"Label", "Banner", "Result"},
        "ability": {
            "banner",
            "name",
            *(f"{n}{i}" for n in ("label", "result") for i in range(5)),
        },
        "arcane": {
            "textlabel",
            "textsublabel",
            "textfield",
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
        "soak": {
            "name",
            "rollsoak",
            "armorsoak",
            "soakbonus",
            "formlabel",
            "formbonus",
        },
        "initiative": {"name", "roll", "weapon"},
        "attack": {"name", "weapon", "attack", "damage"},
        "defend": {"name", "weapon", "defend"},
    }
    SHARED_KEYS: ClassVar[List[str]] = ["stress", "botch-button", "crit-button"]

    name: str
    fields: Dict[str, str]
    botch: str = "botch"
    critical: str = "critical"

    def __post_init__(self):
        msg = f"If you added it recently, update TEMPLATES in {__file__}"
        if self.name not in self.TEMPLATES:
            raise ValueError(f"No rolltemplate named '{self.name}'. " + msg)
        if invalids := (self.fields.keys() - self.TEMPLATES[self.name]):
            raise ValueError(
                "rolltemplate '%s' has no key %s. %s"
                % (self.name, ", ".join(invalids), msg)
            )

    def _base(self, with_roll=True) -> str:
        parts = [
            f"&{{template:{self.name}}}",
            *("{{%s=%s}}" % field for field in self.fields.items()),
        ]
        if with_roll:
            parts.extend(
                [
                    "{{botch-button=[@{botch_i18n}!](~@{character_name}|%s)}}"
                    % self.botch,
                    "{{crit-button=[@{critical_i18n}!](~@{character_name}|%s)}}"
                    % self.critical,
                ]
            )
        return " ".join(parts)

    @property
    def no_roll(self) -> str:
        return self._base(with_roll=False)

    @property
    def simple(self) -> str:
        s = self._base() + " {{stress=}}"
        return s % {"die": "@{simple-die}"}

    @property
    def stress(self) -> str:
        s = self._base() + " {{stress=1}}"
        return s % {"die": "@{stress-die}"}


def rolltemplate(
    template: str,
    fields: Dict[str, str] = None,
    botch: str = RollTemplate.botch,
    critical: str = RollTemplate.critical,
    **kwargs,
) -> RollTemplate:
    """
    Generate a RollTemplate object

    Arguments:
        template: name of the template to use
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
