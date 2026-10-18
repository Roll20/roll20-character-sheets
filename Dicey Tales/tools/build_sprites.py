#!/usr/bin/env python3
"""Regenerate per-tab image sprites for the Dicey Tales Roll20 sheet.

Each tab's block background images are composited into a single WEBP
sprite so the sheet fetches 2-3 images instead of ~30 through Roll20's
imgsrv proxy. The script also emits the CSS classes that position each
block inside the sprite.

Sprites are built at 2x display resolution (retina) from the original
PNG masters; the emitted CSS halves them with background-size.

Usage:
    python3 tools/build_sprites.py

Outputs (next to the masters, i.e. in the sheet folder):
    DT_SPRITE_PC.webp          all PC/NPC tab block images
    DT_SPRITE_CREATURE.webp    all Creature tab block images
and prints the CSS fragment to paste into dicey_tales.css.
"""

import os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SHEET_DIR = os.path.dirname(HERE)

# group name -> (sprite filename, [block, ...])
# block: (image base name, display width px, display height px or None for auto)
MANIFEST = {
    "pc": (
        "DT_SPRITE_PC.webp",
        [
            ("PIECES1", 150, None),
            ("PIECES2", 150, None),
            ("PIECES3", 150, None),
            ("DICEY_STAT_DIAL_PNG", 300, 300),
            ("DT_NAME_BLOCK", 300, None),
            ("DT_ATTRIBUTES_BLOCK", 150, None),
            ("DT_BOONS_BLOCK", 250, None),
            ("DT_CAREERS_BLOCK", 160, None),
            ("DT_FLAWS_BLOCK", 250, None),
            ("DT_LANGUAGES_BLOCK", 150, None),
            ("DT_PIC_NOTES_BLOCK", 150, None),
            ("DT_WEAPONS_BLOCK2", 150, None),
            ("DT_EQUIPMENT_BLOCK", 150, None),
            ("DT_ARCANE_BLOCK_V2", 150, None),
            ("DT_RESEARCH_BLOCK", 150, None),
            ("DT_ADVANCE_BLOCK_PNG", 150, None),
            ("DT_BULLET_BLOCK", 42, None),
            ("DT_BULLET_BLOCK_2", 42, None),
        ],
    ),
    "creature": (
        "DT_SPRITE_CREATURE.webp",
        [
            ("DT_CREATURE_NAME_BLOCK", 145, 60),
            ("CREATURE_size", 180, None),
            ("DT_CREATURE_ATTRIBUTES_BLOCK", 150, None),
            ("DT_VITALITY_ATTRIBUTES_BLOCK", 170, 32),
            ("COMBAT_ATTRIBUTES_CREATURE", 200, None),
            ("CREATURE_DAMAGES", 220, None),
            ("SPECIAL_ABILITIES", 350, None),
            ("SPECIAL_ATTACKS", 390, None),
            ("NOTES", 390, None),
        ],
    ),
}

SCALE = 2      # sprite built at 2x display resolution
QUALITY = 90   # webp encode quality


def find_master(base):
    """Prefer the original PNG master, fall back to the WEBP asset."""
    for ext in (".png", ".webp"):
        p = os.path.join(SHEET_DIR, base + ext)
        if os.path.exists(p):
            return p
    raise FileNotFoundError(f"no master for {base} in {SHEET_DIR}")


def build_group(name):
    sprite_file, blocks = MANIFEST[name]
    regions = []
    for base, disp_w, disp_h in blocks:
        src = Image.open(find_master(base)).convert("RGBA")
        if disp_h is None:  # height auto: preserve aspect
            tw = disp_w * SCALE
            th = round(disp_w * SCALE * src.height / src.width)
        else:  # fixed display box: reproduce the current <img> stretching
            tw = disp_w * SCALE
            th = disp_h * SCALE
        if (src.width, src.height) != (tw, th):
            src = src.resize((tw, th), Image.Resampling.LANCZOS)
        regions.append((base, disp_w, tw, th, src))

    canvas_w = max(tw for _, _, tw, _, _ in regions)
    canvas_h = sum(th for _, _, _, th, _ in regions)
    canvas = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))

    y = 0
    out = []
    for base, disp_w, tw, th, im in regions:
        canvas.alpha_composite(im, (0, y))
        out.append((base, disp_w, tw / SCALE, th / SCALE, y / SCALE))
        y += th

    out_path = os.path.join(SHEET_DIR, sprite_file)
    canvas.save(out_path, "WEBP", quality=QUALITY, method=6)
    size_kb = os.path.getsize(out_path) / 1024
    print(f"wrote {out_path}  ({canvas_w}x{canvas_h} px, {size_kb:.1f} KB)")

    # --- emit CSS fragment -------------------------------------------
    lines = []
    lines.append("/* =====================================================")
    lines.append("   auto-generated sprite block backgrounds")
    lines.append("   Run `python3 tools/build_sprites.py` to regenerate.")
    lines.append("   ===================================================== */")
    lines.append("")
    bg_url = ("url('https://github.com/Roll20/roll20-character-sheets/"
              "blob/master/Dicey%20Tales/" + sprite_file + "?raw=true')")
    lines.append(".dt-blk-{0} {{".format(name))
    lines.append(f"    background-image: {bg_url};")
    lines.append("    background-repeat: no-repeat;")
    lines.append(f"    background-size: {canvas_w / SCALE}px auto;")
    lines.append("    display: inline-block;")
    lines.append("}")
    for base, disp_w, out_w, out_h, out_y in out:
        cls = ".dt-blk-{0}-{1}".format(name, base.lower())
        lines.append(f"{cls} {{")
        lines.append(f"    width: {disp_w}px;")
        lines.append(f"    height: {out_h}px;")
        lines.append(f"    background-position: 0 -{out_y}px;")
        lines.append("}")
    lines.append("")
    css = "\n".join(lines)
    with open("/tmp/sprite_css_" + name + ".txt", "w") as fh:
        fh.write(css)
    print("css -> /tmp/sprite_css_%s.txt (%d lines)" % (name, len(lines)))
    return css


if __name__ == "__main__":
    for grp in MANIFEST:
        build_group(grp)
