"""
Small module for helper code that could be helpful everywhere in the part module
"""

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
