from pathlib import Path

import bs4
import markdown

from . import helpers

EXPORTS = {}

# Convert the documentation.md file into HTML
with open(Path(__file__).parents[1] / "documentation.md") as f:
    html = markdown.markdown("".join(f))

soup = bs4.BeautifulSoup(html, "html.parser")

# Add the CSS class to the headings
for i in range(1, 10):
    for tag in soup.find_all(f"h{i}"):
        tag.attrs["class"] = tag.get("class", "") + " heading_label"
# Convert code tags to span with a class, because Roll20 removes code tags
for tag in soup.find_all("code"):
    tag.name = "span"
    tag.attrs["class"] = tag.get("class", "") + " codespan"

EXPORTS["documentation"] = helpers.format_html(str(soup))


# Convert the changelog.md file into HTML
with open(Path(__file__).parents[1] / "changelog.md") as f:
    html = markdown.markdown("".join(f))

soup = bs4.BeautifulSoup(html, "html.parser")

# Add the CSS class to the headings
for i in range(1, 10):
    for tag in soup.find_all(f"h{i}"):
        tag.attrs["class"] = " ".join(tag.get("class", "").split(" ") + ["heading_label"])

EXPORTS["changelog"] = helpers.format_html(str(soup))
