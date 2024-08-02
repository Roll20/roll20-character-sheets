from bs4 import BeautifulSoup as BS
import os
import json

text_i18n = "data-i18n"
attribute_i18n = {
    "title": "data-i18n-title",
    "placeholder": "data-i18n-placeholder",
    "alt": "data-i18n-alt",
}
lisible_element_map = {
    "button": "button",
    "p": "text",
    "span": "text",
    "h1": "title",
    "h2": "title",
    "h3": "title",
    "h4": "title",
    "h5": "title",
    "h6": "title",
    "option": "option",
}

translation = {}


def get_element_suffix(element):
    return f"-{get_element_name(element)}"


def get_element_name(element):
    if element.name in lisible_element_map:
        return lisible_element_map[element.name]
    else:
        return element.name


def make_standard(string):
    string = (
        string
        .encode('ascii', 'ignore')
        .decode('ascii')
        .lower()
        .replace(".", "")
        .replace(":", "")
        .replace("(", "")
        .replace(")", "")
        .replace("+", "")
        .strip()
        .replace(" ", "-")
        .replace("_", "-")
        .replace("/", "-")
    )
    return string


def get_html_element(file_path, element):
    with open(file_path, 'r') as file:
        html_content = file.read()

    soup = BS(html_content, 'html.parser')
    element = soup.find(element)

    return (element, soup)


def parse_children(element):
    if not element or not element.name:
        return

    if element.name == "rolltemplate":
        return

    children: list = list(element.children)
    attributes = {
        attr: element.get(attr)
        for attr
        in element.attrs
    }

    if (
        len(children) == 1 and
        not children[0].name
    ):
        name = make_standard(children[0].strip())
        if (
            "name" in attributes or
            (name and any(char.isalpha() for char in name))
        ):
            token_name = (
                (
                    (
                        attributes["name"]
                        .removeprefix("attr_")
                        .removeprefix("act_")
                    )
                    if "name" in attributes
                    else name
                )
                + get_element_suffix(element)
            )
            # Add text_i18n to the element
            element[text_i18n] = token_name
            translation[token_name] = children[0].strip()

    name: str = None
    if "name" in attributes:
        name = (
            attributes["name"]
            .removeprefix("attr_")
            .removeprefix("act_")
        )
    elif len(children) == 1 and not children[0].name:
        name = (
            make_standard(children[0].strip())
        )

    for attr_name, attr_value in attributes.items():
        if attr_name in attribute_i18n:
            token_name = (
                make_standard(name)
                + get_element_suffix(element)
                + f"-{attr_name}"
            )
            # Add attribute_i18n[attr_name] to the element
            element[attribute_i18n[attr_name]] = token_name
            translation[token_name] = attr_value

    for child in element.children:
        parse_children(child)


# Example usage
modified_html = None

element = 'html'
file_path = os.path.join(
    os.path.dirname(__file__),
    'cloudbreaker_alliance.html'
)
translation_path = os.path.join(
    os.path.dirname(__file__),
    'translation.json'
)
absolute_path = os.path.abspath(file_path)

new_file_path = os.path.join(
    os.path.dirname(__file__),
    'new_cloudbreaker_alliance.html'
)

(html_element, soup) = get_html_element(absolute_path, element)
if html_element:
    for child in html_element.children:
        if not child.name:
            continue
        parse_children(child)

    modified_html = (
        html_element.prettify()
    )
    other_than_html = soup.find_all(
        lambda tag: (
            tag.name != 'html' and
            not any(
                parent.name == 'html'
                for parent
                in tag.parents
            )
        )
    )

    with open(new_file_path, 'w') as file:
        file.write("<!DOCTYPE html>\n\n")
        file.write("\n\n".join(
                other_than_html.prettify()
                for other_than_html
                in other_than_html
            )
        )
        file.write("\n\n")
        file.write(modified_html)

    with open(translation_path, 'w') as file:
        json.dump(translation, file)
else:
    print(f"Element with id '{element}' not found.")
