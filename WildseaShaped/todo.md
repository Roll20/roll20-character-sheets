# Main Objectives
- Finish styling and functionality of the ship sheet
- Find way to replace the following with repeatable sections
  - Character:
	- Aspects
	- Temporary Aspects
	- Mires
  - Ship:
    - Undercrew
	- Reputation

## Notes for CSS refactor:
- Create generic .panel class (no outline)
  - Should have 
    - height: min-content;
	- some padding everywhere except the top
	- some bottom margin
  - Create .panel .panel-outline (black)
  - Create .panel .sub-panel-outline (grey)
- Find the better font to use for the text
- Create generic .check-track class
  - Create version with lines and spaces between?
- Need .standard-text, .subtitle-text, and .title-text
- Create a better global textarea, input\[text\], input\[number\], and input\[select\]
- Make all divs height: minmax(min-context, 100%)?

## Notes for HTML refactor:
- Character sheet's left, mid, and right columns don't need classes anymore
- All panels will be .panel .section-name for the shared panel stuff
  - If an outline is needed then .panel .panel-outline .section-name
- All large, small, and regular blanks will be replaced by panel padding and margins
- All .standard-texts need to be spans
- All .subtitle-texts need to be divs
- All .title-texts need to be h2
- Find way to check onload if an aspect should be burnt or not