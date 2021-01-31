from .helpers import CHARACTERISTICS, FORMS, TECHNIQUES

# list of (attr, default, translation_key)
TRANSLATION_ATTRS = (
    [
        ("ability", "Abiliy", "ability"),
        ("armor", "Armor", "armor"),
        ("artes", "Artes Lib.", "artes-lib-"),
        ("attack", "Attack", "attack"),
        ("aura", "Aura", "aura"),
        ("bonus", "Bonus", "bonus"),
        ("botch_num", "Number of botch dice", "botch-num"),
        ("circumstances", "Circumstances", "circumstances-m"),
        ("circumstantial", "Circumstancial", "circumstantial"),
        ("damage", "Damage", "damage"),
        ("defense", "Defense", "defense"),
        ("encumbrance", "Encumbrance", "encumbrance"),
        ("fatigue", "Fatigue", "fatigue-m"),
        ("form", "Form", "form"),
        ("initiative", "Initiative", "initiative"),
        ("modifiers", "Modifiers", "modifiers"),
        ("philos", "Philos.", "philos-"),
        ("simple-die", "Simple", "simple"),
        ("soakbns", "Soak Bonus", "soak-bonus"),
        ("stress-die", "Stress", "stress"),
        ("technique", "Technique", "technique"),
        ("total", "Total", "total"),
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

translation_attrs_setup = ",\n".join(
    """"%s_i18n": getTranslationByKey("%s")""" % (attr, tkey)
    for attr, default, tkey in TRANSLATION_ATTRS
)
