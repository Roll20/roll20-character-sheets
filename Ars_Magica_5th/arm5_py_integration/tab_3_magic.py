import textwrap

from .helpers import (
    FORMS,
    TECHNIQUES,
    enumerate_helper,
    repeat_format,
    roll,
    rolltemplate,
    xp,
)

EXPORTS = {}

# Technique definitions
EXPORTS["technique_definitions"] = repeat_format(
    textwrap.dedent(
        f"""\
        <tr>
            <td><input type="text" class="number_3" name="attr_%(Tech)s_Score" value="0"/></td>
            <td data-i18n="%(tech)s" >%(Tech)s</td>
            <td>{xp("%(Tech)s", factor=1)}</td>
            <td style="text-align: center"><input type="text" class="number_3 minor" name="attr_%(Tech)s_Puissant" value="0"/></td>
        </tr>"""
    ),
    keys="tech",
    values=TECHNIQUES,
)


# Technique options
EXPORTS["technique_score_options"] = repeat_format(
    """<option value="(@{%(Tech)s_Score} + @{%(Tech)s_Puissant}) [@{%(tech)s_i18n}]" data-i18n="%(tech)s" >%(Tech)s</option>""",
    keys="tech",
    values=TECHNIQUES,
)
EXPORTS["technique_score_options_unlabeled"] = repeat_format(
    """<option value="@{%(Tech)s_Score} + @{%(Tech)s_Puissant}" data-i18n="%(tech)s" >%(Tech)s</option>""",
    keys="tech",
    values=TECHNIQUES,
)
EXPORTS["technique_name_options"] = repeat_format(
    """<option value="%(Tech)s" data-i18n="%(tech)s" >%(Tech)s</option>""",
    keys="tech",
    values=TECHNIQUES,
)

EXPORTS["technique_enumerated_options"] = "\n".join(
    f"""<option value="{index}" data-i18n="{tech.lower()}" >{tech.title()}</option>"""
    for index, tech in enumerate(TECHNIQUES, start=1)
)


# Form definitions
form_template = textwrap.dedent(
    f"""\
    <tr>
        <td><input type="text" class="number_3" name="attr_%(Form)s_Score" value="0"/></td>
        <td data-i18n="%(form)s" >%(Form)s</td>
        <td>{xp("%(Form)s", factor=1)}</td>
        <td style="text-align: center"><input type="text" class="number_3 minor" name="attr_%(Form)s_Puissant" value="0"/></td>
    </tr>"""
)
EXPORTS["form_definitions_1"] = repeat_format(
    form_template, keys="form", values=FORMS[:5]
)
EXPORTS["form_definitions_2"] = repeat_format(
    form_template, keys="form", values=FORMS[5:]
)


# Form options
EXPORTS["form_score_options"] = repeat_format(
    """<option value="(@{%(Form)s_Score} + @{%(Form)s_Puissant}) [@{%(form)s_i18n}]" data-i18n="%(form)s" >%(Form)s</option>""",
    keys="form",
    values=FORMS,
)
EXPORTS["form_score_options_unlabeled"] = repeat_format(
    """<option value="@{%(Form)s_Score} + @{%(Form)s_Puissant}" data-i18n="%(form)s" >%(Form)s</option>""",
    keys="form",
    values=FORMS,
)
EXPORTS["form_name_options"] = repeat_format(
    """<option value="%(Form)s" data-i18n="%(form)s" >%(Form)s</option>""",
    keys="form",
    values=FORMS,
)

EXPORTS["form_enumerated_options"] = "\n".join(
    f"""<option value="{index}" data-i18n="{form.lower()}" >{form.title()}</option>"""
    for index, form in enumerate(FORMS, start=1)
)


# Casting rolls
spontaneous_roll = roll(
    "@{Spontaneous1_Technique}",
    "@{Spontaneous1_Form}",
    "([[@{Spontaneous1_Focus}]]) [@{focus_i18n}]",
    "(@{gestures})",
    "(@{words})",
    "(@{Stamina_Score}) [@{stamina_i18n}]",
    "(@{aura}) [@{aura_i18n}]",
    "([[floor(@{Fatigue})]]) [@{fatigue_i18n}]",
    "(@{wound_total}) [@{wounds_i18n}]",
    "(?{@{modifiers_i18n}|0}) [@{modifiers_i18n}]",
)
spontaneous_template = rolltemplate(
    "arcane",
    label0="^{spontaneous} ^{casting}",
    result0=f"[[ (%(die)s + {spontaneous_roll} ) / ([[1 + (@{{Spontaneous1_Deficiency}})]] [@{{deficiency_i18n}}]) /2]]",
    label1="^{aura}",
    result1="@{aura}",
    label2="^{weakness-m}",
    result2="[[ (@{wound_total}) [@{wounds_i18n}] + [[floor(@{fatigue})]] [@{fatigue_i18n}] ]]",
    label3="^{circumstances-m}",
    result3="[[ ?{@{modifiers_i18n}|0} ]]",
    critical="critical-spontaneous",
)
# EXPORTS["spontaneous_roll_simple"] = spontaneous_template.simple
EXPORTS["spontaneous_roll_stress"] = spontaneous_template.stress


ceremonial_roll = roll(
    "@{Ceremonial_Technique}",
    "@{Ceremonial_Form}",
    "([[@{Ceremonial_Focus}]]) [@{focus_i18n}]",
    "(@{gestures})",
    "(@{words})",
    "(@{Stamina_Score}) [@{stamina_i18n}]",
    "(@{aura}) [@{aura_i18n}]",
    "([[floor(@{Fatigue})]]) [@{fatigue_i18n}]",
    "(@{wound_total}) [@{wounds_i18n}]",
    "(@{Ceremonial_Artes_Lib}) [@{artes_i18n}]",
    "(@{Ceremonial_Philos}) [@{philos_i18n}]",
    "(?{@{modifiers_i18n}|0}) [@{modifiers_i18n}]",
)
ceremonial_template = rolltemplate(
    "arcane",
    label0="^{ceremonial} ^{casting}",
    result0=f"[[ (%(die)s + {ceremonial_roll} ) / ([[1 + (@{{Ceremonial_Deficiency}})]] [@{{deficiency_i18n}}]) /2 ]]",
    label1="^{aura}",
    result1="@{aura}",
    label2="^{weakness-m}}} ",
    result2="[[ (@{wound_total}) [@{wounds_i18n}] + [[floor(@{fatigue})]] [@{fatigue_i18n}] ]]",
    label3="^{circumstances-m}",
    result3="?{@{modifiers_i18n}|0}",
    critical="critical-spontaneous",
)
# EXPORTS["ceremonial_roll_simple"] = ceremonial_template.simple
EXPORTS["ceremonial_roll_stress"] = ceremonial_template.stress

nf_spontaneous_roll = roll(
    "@{Spontaneous2_Technique}",
    "@{Spontaneous2_Form}",
    "([[@{Spontaneous2_Focus}]]) [@{focus_i18n}]",
    "(@{gestures})",
    "(@{words})",
    "(@{Stamina_Score}) [@{stamina_i18n}]",
    "(@{aura}) [@{aura_i18n}]",
    "([[floor(@{Fatigue})]]) [@{fatigue_i18n}]",
    "(@{wound_total}) [@{wounds_i18n}]",
    "(?{@{modifiers_i18n}|0}) [@{modifiers_i18n}]",
)
nf_spontaneous_template = rolltemplate(
    "arcane",
    label0="^{spontaneous} ^{casting}",
    result0=f"[[ ( {nf_spontaneous_roll} ) / ([[1 + (@{{Spontaneous1_Deficiency}})]] [@{{deficiency_i18n}}]) /5]]",
    label1="^{aura}",
    result1="@{aura}",
    label2="^{weakness-m}",
    result2="[[ (@{wound_total}) [@{wounds_i18n}] + [[floor(@{fatigue})]] [@{fatigue_i18n}] ]]",
    label3="^{circumstances-m}",
    result3="[[ ?{@{modifiers_i18n}|0} ]]",
)
EXPORTS["spontaneous_nodice"] = nf_spontaneous_template.no_roll


formulaic_roll = roll(
    "@{Formulaic_Technique}",
    "@{Formulaic_Form}",
    "([[@{Formulaic_Focus}]]) [@{focus_i18n}]",
    "(@{gestures})",
    "(@{words})",
    "(@{Stamina_Score}) [@{stamina_i18n}]",
    "(@{aura}) [@{aura_i18n}]",
    "([[floor(@{Fatigue})]]) [@{fatigue_i18n}] + (@{wound_total}) [@{wounds_i18n}]",
    "(?{@{modifiers_i18n}|0}) [@{modifiers_i18n}]",
)
formulaic_template = rolltemplate(
    "arcane",
    label0="^{formulaic} ^{casting}",
    result0=f"[[ (%(die)s + {formulaic_roll}) / ([[1 + (@{{Formulaic_Deficiency}})]] [@{{deficiency_i18n}}]) ]]",
    label1="^{aura}",
    result1="@{aura}",
    label2="^{weakness-m}",
    result2="[[ (@{wound_total}) [@{wounds_i18n}] + [[floor(@{fatigue})]] [@{fatigue_i18n}] ]]",
    label3="^{circumstances-m}",
    result3="?{@{modifiers_i18n}|0}",
)
EXPORTS["formulaic_roll_simple"] = formulaic_template.simple
EXPORTS["formulaic_roll_stress"] = formulaic_template.stress


ritual_roll = roll(
    "@{Ritual_Technique}",
    "@{Ritual_Form}",
    "([[@{Ritual_Focus}]]) [@{focus_i18n}]",
    "(@{Stamina_Score}) [@{stamina_i18n}]",
    "(@{aura}) [@{aura_i18n}]",
    "(@{Ritual_Artes_Lib}) [@{artes_i18n}]",
    "(@{Ritual_Philos}) [@{philos_i18n}]",
    "(@{wound_total}) [@{wounds_i18n}]",
    "([[floor(@{fatigue})]]) [@{fatigue_i18n}]",
    "(?{@{modifiers_i18n}|0}) [@{modifiers_i18n}]",
)
ritual_template = rolltemplate(
    "arcane",
    label0="^{ritual} ^{casting}",
    result0=f"[[ (%(die)s + {ritual_roll}) / ([[1 + (@{{Ritual_Deficiency}})]] [@{{deficiency_i18n}}]) ]]",
    label1="^{aura}",
    result1="@{aura}",
    label2="^{weakness-m}",
    result2="[[ @{wound_total}[@{wounds_i18n}] + [[floor(@{fatigue})]][@{fatigue_i18n}] ]]",
    label3="^{circumstances-m}",
    result3="?{@{modifiers_i18n}|0}",
)
EXPORTS["ritual_roll_simple"] = ritual_template.simple
EXPORTS["ritual_roll_stress"] = ritual_template.stress
