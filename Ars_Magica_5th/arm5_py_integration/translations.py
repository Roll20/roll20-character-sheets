from .helpers import CHARACTERISTICS, FORMS, TECHNIQUES

# list of (attr, default, translation_key)
TRANSLATION_ATTRS = (
    [
        ("ability", "Abiliy", "ability"),
        ("armor", "Armor", "armor"),
        ("artes", "Artes Lib.", "artes-lib-"),
        ("attack", "Attack", "attack"),
        ("aura", "Aura", "aura"),
        ("bold", "Bold", "gestures-bold"),
        ("bonus", "Bonus", "bonus"),
        ("botch", "Botch", "botch"),
        ("characteristic", "Characteristic", "characteristic"),
        ("botch_num", "Number of botch dice", "botch-num"),
        ("circumstances", "Circumstances", "circumstances-m"),
        ("circumstantial", "Circumstancial", "circumstantial"),
        ("critical", "Critical", "critical"),
        ("damage", "Damage", "damage"),
        ("defense", "Defense", "defense"),
        ("deficiency", "Deficiency", "deficiency"),
        ("encumbrance", "Encumbrance", "encumbrance"),
        ("exaggerated", "Exaggerated", "gestures-exaggerated"),
        ("fatigue", "Fatigue", "fatigue-m"),
        ("firm", "Firm", "words-firm"),
        ("focus", "Focus", "focus"),
        ("form", "Form", "form"),
        ("gestures", "Gestures", "gestures"),
        ("gest-none", "None", "gestures-none"),
        ("initiative", "Initiative", "initiative"),
        ("loud", "Loud", "words-loud"),
        ("modifiers", "Modifiers", "modifiers"),
        ("philos", "Philos.", "philos-"),
        ("quiet", "Quiet", "words-quiet"),
        ("simple-die", "Simple", "simple"),
        ("soakbns", "Soak Bonus", "soak-bonus"),
        ("spontaneous", "Spontaneous", "spontaneous"),
        ("stress-die", "Stress", "stress"),
        ("subtle", "Subtle", "gestures-subtle"),
        ("technique", "Technique", "technique"),
        ("total", "Total", "total"),
        ("unselected", "Unselected", "unselected"),
        ("words", "Words", "words"),
        ("words-none", "None", "words-none"),
        ("wounds", "Wounds", "wounds"),
    ]
    + [(char.lower(), char.capitalize(), char.lower()) for char in CHARACTERISTICS]
    + [(tech.lower(), tech.capitalize(), tech.lower()) for tech in TECHNIQUES]
    + [(form.lower(), form.capitalize(), form.lower()) for form in FORMS]
)

translation_attrs = "\n".join(
    """<input name ="attr_%s_i18n" type="hidden" value="%s" />""" % (attr, default)
    for attr, default, tkey in TRANSLATION_ATTRS
)

translation_attrs_setup = (
    "setAttrs({\n    "
    + ",\n    ".join(
        """"%s_i18n": getTranslationByKey("%s")""" % (attr, tkey)
        for attr, default, tkey in TRANSLATION_ATTRS
    )
    + "\n});"
)
