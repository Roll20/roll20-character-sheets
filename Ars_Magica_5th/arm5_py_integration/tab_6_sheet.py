from pathlib import Path
import markdown
from bs4 import BeautifulSoup as soup

EXPORTS = {}

# Convert the documentation.md file into HTML
with open(Path(__file__).parents[1] / "documentation.md") as f:
    html = markdown.markdown("".join(f))

html = soup(html, "html.parser")

# Add the CSS class to the headings
for i in range(1, 10):
    for tag in html.find_all(f"h{i}"):
        tag.attrs["class"] = tag.get("class", "") + " heading_label"

EXPORTS["documentation"] = html.prettify()