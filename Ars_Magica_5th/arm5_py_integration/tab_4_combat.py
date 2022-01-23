import textwrap

from .helpers import roll, rolltemplate, FORMS, repeat_format

EXPORTS = {}

# Additional fatigue levels
add_fatigue_lvl_num = 10
EXPORTS["fatigue_levels_options"] = repeat_format(
    """<option value="%%">%%</option>""", replace="%%", by=list(map(str, range(0, add_fatigue_lvl_num + 1)))
)
EXPORTS["additional_fatigue_levels"] = "\n".join(
    textwrap.dedent(
    f"""\
    <tr class="addfatigue-{level}">
        <td><input type="radio" class="radio_1" name="attr_Fatigue" value="{level / 1000}"><span></span></td>
        <td style="text-align:center;">0</td>
        <td>2 min.</td>
        <td data-i18n="winded" >Winded</td>
    </tr>""")
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




# Soak by forms that include form bonuses
soak_html = textwrap.dedent(
    """\
    <div class="flex-container-left" style="grid-column: %(col)s / span 1; grid-row: %(row)s / span 1;">
        <button type="roll" class="button stress-roll single-roll" name="roal_soak_%(form)s" value="%(rollbutton)s"></button>
        <input type="text" class="number_1" name="attr_Soak_%(Form)s" value="((@{Stamina_Score}) + (@{soak_bonus}) + (@{armor_soak_bonus}) + ceil(((@{%(Form)s_Score}) + (@{%(Form)s_Puissant})) / 5))" disabled="true"/>
        <span data-i18n="%(form)s">%(Form)s</span>
    </div>"""
)
soak_roll = roll(
    "(@{Stamina_Score}) [@{stamina_i18n}]",
    "(@{soak_bonus}) [@{soakbns_i18n}]",
    "(@{armor_soak_bonus}) [@{armor_i18n}]",
    "ceil(((@{%%(Form)s_Score}) + (@{%%(Form)s_Puissant})) / 5) [@{%%(form)s_i18n}]"
)
soak_template = rolltemplate(
    "soak",
    name="@{character_name}",
    rollsoak=f"[[ %(die)s + {soak_roll} ]]",
    armorsoak="@{armor_soak_bonus}",
    soakbonus="@{soak_bonus}",
    formlabel="^{%%(form)s}",
    formbonus="[[ ceil(((@{%%(Form)s_Score}) + (@{%%(Form)s_Puissant})) / 5) ]]"
)

# We do not use repeat_format because we need the index for the grid pos
soak_by_form_lines = []
for i, form in enumerate(FORMS):
    values = {
        "form": form.lower(),
        "Form": form.title(),
    }
    values["rollbutton"] = soak_template.stress % values
    values.update({
        "col": str(i % 5 + 1),
        "row": str(i // 5 + 1),
    })
    soak_by_form_lines.append(soak_html % values)
EXPORTS["soak_by_forms"] = "\n".join(soak_by_form_lines)