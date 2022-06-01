from .helpers import roll, rolltemplate

EXPORTS = {}

## Spells
# Deferred attribute access to get the spell's technique & form values
spell_tech_value = (
    "("
    "@{sys_at}@{character_name}@{sys_pipe}@{spell_tech_name}_Score@{sys_rbk} "
    "+ @{sys_at}@{character_name}@{sys_pipe}@{spell_tech_name}_Puissant@{sys_rbk}"
    ") "
    "[@{sys_at}@{character_name}@{sys_pipe}@{spell_tech_name}_i18n@{sys_rbk}]"
)
spell_form_value = (
    "("
    "@{sys_at}@{character_name}@{sys_pipe}@{spell_form_name}_Score@{sys_rbk} "
    "+ @{sys_at}@{character_name}@{sys_pipe}@{spell_form_name}_Puissant@{sys_rbk}"
    ") "
    "[@{sys_at}@{character_name}@{sys_pipe}@{spell_form_name}_i18n@{sys_rbk}]"
)
# Export the deferred attribute access for use in the HTML since the focus depends on them
EXPORTS["spell_tech_value"] = spell_tech_value
EXPORTS["spell_form_value"] = spell_form_value

# Formulaic spell rolls
spell_roll = roll(
    "(@{Stamina_Score}) [@{stamina_i18n}]",
    f"{spell_tech_value}",
    f"{spell_form_value}",
    "([[@{spell_Focus}]]) [@{focus_i18n}]",
    "(@{spell_bonus}) [@{bonus_i18n}]",
    "(@{gestures})",
    "(@{words})",
    "(@{aura}) [@{aura_i18n}]",
    "([[floor(@{Fatigue})]]) [@{fatigue_i18n}]",
    "(@{wound_total}) [@{wounds_i18n}]",
    "(?{@{modifiers_i18n}|0}) [@{modifiers_i18n}]",
)
spell_template = rolltemplate(
    "spell",
    spell="@{spell_name}",
    character="@{character_name}",
    sigil="@{sigil}",
    roll=f"[[ (%(die)s + {spell_roll}) / ([[1 + (@{{spell_Deficiency}})]] [@{{deficiency_i18n}}]) ]]",
    range="@{spell_range}",
    duration="@{spell_duration}",
    target="@{spell_target}",
    effect="@{spell_note}",
    mastery="@{spell_note-2}",
    Technique="@{sys_at}@{character_name}@{sys_pipe}@{spell_tech_name}_i18n@{sys_rbk}",
    Form="@{sys_at}@{character_name}@{sys_pipe}@{spell_form_name}_i18n@{sys_rbk}",
    Level="@{spell_level}",
)
EXPORTS["spell_roll_simple"] = spell_template.simple
EXPORTS["spell_roll_stress"] = spell_template.stress

# Spontaneous spell rolls
spont_template = rolltemplate(
    "arcane",
    label0="@{spell_name}",
    result0=f"[[ (%(die)s + {spell_roll} ) / ([[1 + (@{{spell_Deficiency}})]] [@{{deficiency_i18n}}]) /2 ]]",
    label1="^{aura}",
    result1="@{aura}",
    label2="^{weakness-m}",
    result2="[[ (@{wound_total}) [@{wounds_i18n}] + [[floor(@{fatigue})]] [@{fatigue_i18n}] ]]",
    label3="^{circumstances-m}",
    result3="[[ ?{@{modifiers_i18n}|0} ]]",
    textlabel="@{spell_tech_name} @{spell_form_name} @{spell_level}",
    textsublabel="@{spell_range} - @{spell_duration} - @{spell_target}",
    textfield="@{spell_note}",
    critical="critical-spontaneous",
)
EXPORTS["saved_spontaneous_roll_stress"] = spont_template.stress
