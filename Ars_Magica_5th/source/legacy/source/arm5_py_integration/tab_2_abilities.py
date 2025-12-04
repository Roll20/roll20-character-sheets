import textwrap

from .helpers import CHARACTERISTICS, repeat_format, roll, rolltemplate

EXPORTS = {}

# Characteristics definitions
characteristic_roll = roll(
    "(@{%%(Char)s_Score}) [@{%%(char)s_i18n}]",
    "(@{wound_total}) [@{wounds_i18n}]",
    "([[floor(@{Fatigue})]]) [@{fatigue_i18n}]",
    "(?{@{circumstantial_i18n}|0}) [@{circumstances_i18n}]",
)
characteristic_template = rolltemplate(
    "ability",
    name="@{character_name}",
    label0="^{%%(char)s}",
    result0=f"[[ %(die)s + {characteristic_roll} ]]",
    banner="@{%%(Char)s_Description}",
    label1="^{score}",
    result1="@{%%(Char)s_Score}",
    label2="^{weakness-m}",
    result2="[[ [[floor(@{Fatigue})]] [@{fatigue_i18n}] + @{wound_total} [@{wounds_i18n}] ]]",
    label3="^{circumstances-m}",
    result3="[[(?{@{circumstantial_i18n}|0})]]",
)
EXPORTS["mental_characteristic_rows"] = repeat_format(
    textwrap.dedent(
        f"""\
        <tr>
            <th data-i18n="%(char)s" >%(Char)s</th>
            <td><input type="text" class="heading_2" name="attr_%(Char)s_Description"/></td>
            <td><input type="text" class="number_1" name="attr_%(Char)s_Score" value="0"/></td>
            <td><input type="text" class="number_1" name="attr_%(Char)s_Aging" value="0"/></td>
            <td><div class="flex-container-center">
                <button type="roll" class="button simple-roll" name="roll_%(Char)s_simple" value="{characteristic_template.simple}"></button>
                <button type="roll" class="button stress-roll" name="roll_%(Char)s_stress" value="{characteristic_template.stress}"></button>
            </div></td>
        </tr>"""
    ),
    keys="char",
    values=CHARACTERISTICS[:4],
)

EXPORTS["physical_characteristic_rows"] = repeat_format(
    textwrap.dedent(
        f"""\
        <tr>
            <th data-i18n="%(char)s" >%(Char)s</th>
            <td><input type="text" class="heading_2" name="attr_%(Char)s_Description"/></td>
            <td><input type="text" class="number_1" name="attr_%(Char)s_Score" value="0"/></td>
            <td><input type="text" class="number_1" name="attr_%(Char)s_Aging" value="0"/></td>
            <td><div class="flex-container-center">
                <button type="roll" class="button simple-roll" name="roll_%(Char)s_simple" value="{characteristic_template.simple}"></button>
                <button type="roll" class="button stress-roll" name="roll_%(Char)s_stress" value="{characteristic_template.stress}"></button>
            </div></td>
        </tr>"""
    ),
    keys="char",
    values=CHARACTERISTICS[4:],
)

# Characteristic options
EXPORTS["characteristic_score_options"] = repeat_format(
    """<option value="@{%(Char)s_Score}" data-i18n="%(char)s" >%(Char)s</option>""",
    keys="char",
    values=CHARACTERISTICS,
)
EXPORTS["characteristic_score_ask"] = (
    "?{@{characteristic_i18n}|"
    + "| ".join(
        "@{%(char)s_i18n}, @{%(Char)s_Score} [@{%(char)s_i18n}]"
        % {"char": char, "Char": char.capitalize()}
        for char in CHARACTERISTICS
    )
    + "}"
)
EXPORTS["characteristic_name_options"] = repeat_format(
    """<option value="%(Char)s" data-i18n="%(char)s" >%(Char)s</option>""",
    keys="char",
    values=CHARACTERISTICS,
)
EXPORTS["characteristic_name_ask_attr"] = (
    "?{@{characteristic_i18n}|"
    + "| ".join(
        "@{%(char)s_i18n},@{%(char)s_Score} [@{%(char)s_i18n}]" % {"char": char}
        for char in CHARACTERISTICS
    )
    + "}"
)

# Abilities
ability_roll = roll(
    "(@{Ability_Score} + @{Ability_Puissant}) [@{Ability_name}]",
    "(@{sys_at}@{character_name}@{sys_pipe}@{Ability_CharacName}_Score@{sys_rbk}) [@{sys_at}@{character_name}@{sys_pipe}@{Ability_CharacName}_i18n@{sys_rbk}]",
    "(@{wound_total}) [@{wounds_i18n}]",
    "([[floor(@{Fatigue})]]) [@{fatigue_i18n}]",
    "(?{@{circumstantial_i18n}|0}) [@{circumstances_i18n}]",
)
ability_template = rolltemplate(
    "ability",
    name="@{character_name}",
    label0="@{Ability_name}",
    result0=f"[[ %(die)s + {ability_roll} ]]",
    banner="@{Ability_Speciality}",
    label1="^{rank}",
    result1="[[ @{Ability_Score} + @{Ability_Puissant} ]]",
    label2="@{sys_at}@{character_name}@{sys_pipe}@{Ability_CharacName}_i18n@{sys_rbk}",
    result2="[[ @{sys_at}@{character_name}@{sys_pipe}@{Ability_CharacName}_Score@{sys_rbk} ]]",
    label3="^{weakness-m}",
    result3="[[ ([[floor(@{Fatigue})]]) [@{fatigue_i18n}] + (@{wound_total}) [@{wounds_i18n}] ]]",
    label4="^{circumstances-m}",
    result4="[[ (?{@{circumstantial_i18n}|0}) ]]",
)

EXPORTS["ability_roll_simple"] = ability_template.simple
EXPORTS["ability_roll_stress"] = ability_template.stress
