import textwrap

from .helpers import FORMS, repeat_format, roll, rolltemplate

EXPORTS = {}

# Additional fatigue levels
add_fatigue_lvl_num = 10
EXPORTS["fatigue_levels_options"] = repeat_format(
    """<option value="%%">%%</option>""",
    replace="%%",
    by=list(map(str, range(0, add_fatigue_lvl_num + 1))),
)
EXPORTS["additional_fatigue_levels"] = "\n".join(
    textwrap.dedent(
        f"""\
    <tr class="addfatigue-{level}">
        <td><input type="radio" class="radio_1" name="attr_Fatigue" value="{level / 1000}"><span></span></td>
        <td style="text-align:center;">0</td>
        <td>2 min.</td>
        <td data-i18n="winded" >Winded</td>
    </tr>"""
    )
    for level in range(1, add_fatigue_lvl_num + 1)
)

# In the CSS, the replacement is in a comment block
# We add end-of-comment and start-of-comment syntax atthe begining and end so
# that it de-comment itself
lines = ["*/"]
for level in range(1, add_fatigue_lvl_num + 1):
    # IF the additional fatigue select is not on a value for which the level
    # is visible
    line = "".join(
        f':not(.sheet-fatigue-proxy[value="{selector}"])'
        for selector in range(level, add_fatigue_lvl_num + 1)
    )
    line += f" + table tr.sheet-addfatigue-{level} "
    lines.append(line)
    # Then hide it
    lines.append("{")
    lines.append("    display: none;")
    lines.append("}")
lines.append("/*")
EXPORTS["fatigue_level_css"] = "\n".join(lines)


# Soak total used by the auto-calc field
soak_total = roll(
    "(@{Stamina_Score})",
    "(@{armors_total_prot})",
    "(@{soak_bonus})",
    "(@{combat-mods_total_soak})",
)
EXPORTS["soak_total"] = soak_total


# Soak rolltemplate
soak_roll = roll(
    "(@{Stamina_Score}) [@{stamina_i18n}]",
    "(@{armors_total_prot_detailed}) [@{armor_i18n}]",
    "(@{soak_bonus}) [@{soakbns_i18n}]",
    "(@{combat-mods_total_soak_detailed}) [@{soakbns_i18n}]",
)
soak_template = rolltemplate(
    "soak",
    name="@{character_name}",
    rollsoak=f"[[ %(die)s + {soak_roll} ]]",
    armorsoak="[[@{armors_total_prot_detailed}]]",
    soakbonus="[[(@{soak_bonus}) + (@{combat-mods_total_soak_detailed})]]",
)
EXPORTS["soak_roll_stress"] = soak_template.stress


form_soak_total = roll(
    soak_total, "ceil(((@{%(Form)s_Score}) + (@{%(Form)s_Puissant})) / 5)"
)
form_soak_html = textwrap.dedent(
    f"""\
    <div class="flex-container-left" style="grid-column: %(col)s / span 1; grid-row: %(row)s / span 1;">
        <button type="roll" class="button stress-roll single-roll" name="roll_soak_%(form)s" value="%(rollbutton)s"></button>
        <input type="text" class="number_1" name="attr_Soak_%(Form)s" value="({form_soak_total})" disabled="true"/>
        <span data-i18n="%(form)s">%(Form)s</span>
    </div>"""
)

form_soak_roll = roll(
    soak_roll,
    "ceil(((@{%%(Form)s_Score}) + (@{%%(Form)s_Puissant})) / 5) [@{%%(form)s_i18n}]",
)
form_soak_template = rolltemplate(
    "soak",
    name="@{character_name}",
    rollsoak=f"[[ %(die)s + {form_soak_roll} ]]",
    armorsoak="[[@{armors_total_prot_detailed}]]",
    soakbonus="[[(@{soak_bonus}) + (@{combat-mods_total_soak_detailed})]]",
    formlabel="^{%%(form)s}",
    formbonus="[[ ceil(((@{%%(Form)s_Score}) + (@{%%(Form)s_Puissant})) / 5) ]]",
)

# We do not use repeat_format because we need the index for the grid pos
soak_by_form_lines = []
for i, form in enumerate(FORMS):
    values = {
        "form": form.lower(),
        "Form": form.title(),
    }
    values["rollbutton"] = form_soak_template.stress % values
    values.update(
        {
            "col": str(i % 5 + 1),
            "row": str(i // 5 + 1),
        }
    )
    soak_by_form_lines.append(form_soak_html % values)
EXPORTS["soak_by_forms"] = "\n".join(soak_by_form_lines)


# Combat totals and rolls
# Initiative
# Manually add the minus
init_total = (
    roll("(@{Quickness_Score})", "(@{Init_Weap})", "(@{combat-mods_total_init})")
    + "- (@{Init_Encumbrance})"
)
EXPORTS["init_total"] = init_total

# Manually add the minus
init_roll = (
    roll(
        "(@{Quickness_Score}) [@{quickness_i18n}]",
        "(@{Init_Weap}) [@{Weapon_name}]",
        "(@{combat-mods_total_init}) [@{bonus_i18n}]",
    )
    + (" - (@{Init_Encumbrance}) [@{encumbrance_i18n}] + ")
    + roll(
        "([[floor(@{Fatigue})]]) [@{fatigue_i18n}]",
        "(@{wound_total}) [@{wounds_i18n}]",
        "(?{@{initiative_i18n} @{modifiers_i18n}|0}) [@{initiative_i18n} @{modifiers_i18n}]",
    )
)
init_template = rolltemplate(
    "initiative",
    name="@{character_name}",
    weapon="@{Weapon_name}",
    roll=f"[[ %(die)s + {init_roll} &{{tracker}}]]",
    critical="critical-init",
)
EXPORTS["init_roll"] = init_template.stress


# Attack
atk_total = roll(
    "(@{Dexterity_Score})",
    "(@{WeaponAbility})",
    "(@{combat-mods_total_atk})",
    "(@{Atk_Weap})",
)
EXPORTS["atk_total"] = atk_total

atk_roll = roll(
    "(@{Dexterity_Score}) [@{dexterity_i18n}]",
    "(@{WeaponAbility}) [@{ability_i18n}]",
    "(@{combat-mods_total_atk}) [@{bonus_i18n}]",
    "(@{Atk_Weap}) [@{Weapon_name}]",
    "(@{wound_total}) [@{wounds_i18n}]",
    "([[floor(@{Fatigue})]]) [@{fatigue_i18n}]",
    "(?{@{circumstantial_i18n} @{attack_i18n}|0}) [@{circumstantial_i18n} @{attack_i18n}]",
)
dam_roll = roll(
    "(@{Strength_Score}) [@{strength_i18n}]",
    "(@{Dam_Weap}) [@{Weapon_name}]",
    "(@{combat-mods_total_dam}) [@{bonus_i18n}]",
    "(?{@{circumstantial_i18n} @{damage_i18n}|0}) [@{circumstantial_i18n} @{damage_i18n}]",
)

atk_template = rolltemplate(
    "attack",
    name="@{character_name}",
    weapon="@{Weapon_name}",
    attack=f"[[ %(die)s + {atk_roll}]]",
    damage=f"[[ {dam_roll} ]]",
)
EXPORTS["atk_roll"] = atk_template.stress


# Defense
dfn_total = roll(
    "(@{Quickness_Score})",
    "(@{WeaponAbility})",
    "(@{combat-mods_total_dfn})",
    "(@{Dfn_Weap})",
)
EXPORTS["dfn_total"] = dfn_total

dfn_roll = roll(
    "(@{Quickness_Score}) [@{quickness_i18n}]",
    "(@{WeaponAbility}) [@{ability_i18n}]",
    "(@{combat-mods_total_dfn}) [@{bonus_i18n}]",
    "(@{Dfn_Weap}) [@{Weapon_name}]",
    "(@{wound_total}) [@{wounds_i18n}]",
    "([[floor(@{Fatigue})]]) [@{fatigue_i18n}]",
    "(?{@{circumstantial_i18n} @{defense_i18n}|0}) [@{circumstantial_i18n} @{defense_i18n}]",
)
dfn_template = rolltemplate(
    "defend",
    name="@{character_name}",
    weapon="@{Weapon_name}",
    defend=f"[[ %(die)s + {dfn_roll} ]]",
)
EXPORTS["dfn_roll"] = dfn_template.stress
