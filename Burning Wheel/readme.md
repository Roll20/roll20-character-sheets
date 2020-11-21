# Burning Wheel

This sheet is designed for use with the Burning Wheel system written by Luke Crane and produced with permission for use on Roll20. Much of the Character Burner process has been enhanced with auto calculating values and many of the final results translate to the rest of the sheet.

Hovering over most of the Stats & Skills will reveal with underlying Roll20 Attribute names. Roll by clicking on the white D6 next to Stats/Skills/Attributes names in order to make use of the roll template. In the roll query you'll be asked for a Modifier which represents dice that affect the comparison to Obs, Artha (such as Persona or Deeds dice) that add to the roll but don't compare to the Obs, and the base Obs.

Wound dice and Obs penalties from wounds are automatically calculated from the Combat tab into rolls that are affected by wound penatlies. The hidden 'star ✦ symbol' to the upper right of an ability exponent mark's the roll as Open Ended and will cause any 6s rolled to explode.

To the far right of each skill is a hidden 'mod ⌘ symbol' which will turn that skill instead a group separator instead.

There is now also a 'Magic' tab to put your spells and songs in, but all of the title fields are re-namable so additional homebrew / codex content could be put here also. And there's a new 'Rogues' tab for tracking PC bodyguards and animal companions, multiple NPCs within an organisation, or simple creature stat-blocks as described in BWG pp 565-571.

For the best user experience we reccomend that you install the two open-license fonts [Crimson Pro](https://fonts.google.com/specimen/Crimson+Pro) and [Open Sans](https://fonts.google.com/specimen/Open+Sans).

Please direct major issues, suggestions, or complains to user [Seraaron](https://github.com/Seraaron/roll20-character-sheets/issues) on GitHub.

Enjoy!

## Preview v2.2
![Screenshot](https://raw.githubusercontent.com/Seraaron/roll20-character-sheets/master/Burning%20Wheel/Burning%20Wheel.png)

# Change log

## v2.3 (2020-11-20)
Update by Seraaron (147454).

* Added new 'Rogues' tab for tracking PC bodyguards and animal companions, multiple NPCs within an organisation, or simple creature stat-blocks as described in BWG pp 565-571.
* Updated image hosting links to official Roll20 repo.
* Minor bug fixes, tweaks, and usability improvements.
* Added a 'quote README to chat' button in the Character Burner tab to redirect users to this page.

### v2.2.2 (2020-11-18)
Update by Seraaron (147454).

* Fixed Attribute 'routine tests needed' incorrect calculation, and added special case for second emotional attribute that stays at 5 once you're at exponent 5 and above, for Greed and Corruption
* Added new 'quote' macro template that lets you quote parts of the sheet to the chat log, such as beliefs, special traits, and magic spells. (Look for the 'thought bubble symbol'). You can also style the quoted text with basic formatting `**bold**` and `*italic*`.
* Slightly altered appearance of belief, instinct, and trait artha trackers, and added two new repeating segments for bonus beliefs and instincts
* Moved old belief and instinct 4th slots to the 'Character Burner' tab for posterity, so that there are no breaking changes for existing users
* Added roll button to repeating magic segment, so that they can be better used for elven spell songs with less page flipping

### v2.2.1 (2020-11-03)
Early bug fixes by Seraaron (147454).

* Users in the public test of the preview build reported browser incompatibility issues with Chrome. Specifically, the difficulty tracker buttons for stats and wounds couldn't be selected properly. In the process of fixing this bug, it was required to fit most stats and attributes into `<div>` elements, and generally beautify the HTML code and CSS to be more legible (many long sections of code were written on one line which looked horrible) (this is also the main reason that the number of lines of code in this PR basically just doubled)
* Fixed a styling issue where columns would wrap onto themselves and look very bad at certain browser zoom levels.
* Put test trackers in separate boxes, and a few other things for a prettier general aesthetic.
* Added some non-proprietary fonts to the stack for better Mac and Linux support. The new default font is an open-license font called 'Crimson Pro' by Jacques Le Bailly, which fits in with the style and theme of BW quite nicely. But there are plenty of fallback fonts now too.
* Changed page tab style to newer sheet-worker format, as recommended in the Roll20 CSS Wizardry wiki
* Fixed background image stretching on long page tabs by splitting it into a top, middle, and bottom segment, where the middle repeats until it reaches the bottom.
* Corrected an implementation of the 'Being Learned' autocalc that would use the average Aptitude as your skill total, rather than the first chosen Root (see BWG pg 49). And also made tax affect these rolls.
* User request fulfilled: Added option to make every stat and attribute renamable and taxable to support more homebrew mechanics (see the 'Additional Taxes' dropdown in the new Magic tab)
* Similarly, all magic spells' subtitles are renamable, meaning that the Magic tab could ostensibly be used to list vehicles or other custom powers or objects from systems like Burning Empires.

## v2.2 (public test / preview build)
Tweaked design and code by Seraaron (147454).

* Added dropdown menu in the wound tolerance scale that can actually go grey or white
* Improved injury tracking with automated segments
* Added a dropdown menu in the Combat tab to remind players how 'Shrugging it Off' works
* Separated trait names from description and added tags and a 'used' checkbox
* Added Hesitation and Reflexes modifiers
* Added base Mortal Wound modifier in the Char Burner, and a Stature dropdown on main sheet (nb. these are deliberately not linked, because the answer to how much base MW each stature grants changes with editions)
* Made Beliefs and Instinct slots renamable
* Slightly better organised the layout of the Character Index
* Expanded 'Additional Notes' section and moved 'Gear Notes' to Combat tab
* Added a taxable emotional attribute slot for things like Corruption, and made them open-ended by default
* Added a repeating segment to Cash, so that players can better organise their monies
* Slightly altered appearance of the weapons tables, and made editing them easier
* Moved Artha trackers to the top of the sheet for ease of access on every tab
* Added new repeating segments for Fatigue and Tools
* Added extra Stride options
* Added a 'luck' macro button for exploding 6s after a roll next to the Fate tracker
* Updated the wording of and moved the 'Earning Artha' dropdown to the Information tab
* Added a semi-hidden command symbol "⌘" checkbox on the far right of each skill list that turns the skill into a renamable skill 'group / type' separator, which will be useful for organised players with many skills
* Reformatted skill layout to be clearer and look better with the above-mentioned skill groups. Basically every skill is on one line now, but every (n*2)th row is lightly shaded gray
* Changed the 'open-ended' checkbox to a more magical looking "✦" star symbol
* Made the roll-dice macro button invert on hover to more clearly indicate to the user that it's actually a button
* Altered the 'Test Difficulty' dropdown segment to fit the width better, and added useful table for quickly calculating arbitrary test difficulties
* Moved the 'Old text practice log' into the 'Practice Times' dropdown menu
* Changed the default selected stat for learning new skills and the Char Burner to Perception (the most common stat Root)
* Added passive steel tests dropdown
* Added an extra armor and missile weapon slot, and made the 'Bare-fist' weapon renamable
* Created a new 'Magic' tab and moved spells lists and notes into it. In addition, spell fields are now renamable to better accommodate elven spell songs and alternate magic systems from the Codex (and there is still plenty space here for perhaps more additions and improvements in the future)
* Added numbers to the weapon Lengths for ease of making numerical references
* Added dropdown check-boxes for Training skill effect descriptions
* Adjusted Character Burner section to make transferral of skills and traits easier
* User request fulfilled: Added Age-Table support for Great Spiders (from the old Monster Burner) and the Kerrn and Kukhadish (from Burning Empires)

### Minor Breaking changes in v2.2
The following changes affect current sheet users, but the impact will be minimal, because all of these changes only alter single values that are easily looked up again and replaced:

* Changed the checkboxes on Beliefs and Instincts into number inputs for better long-term tracking
* The 'All Other Tests' for clumsy weight has been automated to a dropdown menu and gets treated like an additional wound penalty in macro calculations.
* Removed dropdown menus on Add and WS in the weapons section for ease of customisability

## v2.1 (2018-11-12)

Tweaks and improvements by LeeRhodes, Aureyia, Solarswordsman, and Anduh.

* Added armor rolls table
* Included armor vs VA rolls
* Made sheet.json instructions more clear
* Fixed column sizing
* Made Reps & Affs repeating segements
* And other bug fixes

## v2.0 (2017-10-02)

Update designed by Jordan W. (806426) and coded by Natha (75857).

* Traits are 3 rows above each other instead of 3 columns next to each other,  utilize the full width. Trait text can be expanded.
* Skills section utilizes the full width and now adds to the left and bottom.
* Relationships, Circles, and Enemy Circles are 3 rows and utilize the full width to display text. Text can be expanded.
* Relationships have a dropdown menu to choose whether the relationship is minor, important, or powerful
* Relationships have checkboxes to mark relationship modifiers: immediate family, other family, forbidden, hateful, romantic. Immediate family and other family are mutually exclusive.
* Circles and Enemy Circles are now repeating sections, with a Relationship Aptitude value.
* Expanded Artha section takes up the entire width of the sheet, between the Attributes and Skills sections. Spending and Earning help completed.
* Practice Log is now a repeating section, utilizes the full width, has two dropdown lists (Category and Difficulty). Practice time and Cycle fills automatically. A text field allows to record the amount of time practiced so far.
* Being Learned section section utilizes the full width and now adds to the left and bottom.
* Resources and Forte taxes can be tracked and are accounted in rolls.
* Armor and Clumsy Weight Penalties are moved between Injury and Recovery and Weapons. The new expanded Armor section on the left, and the expanded clumsy weight section on the right.
* New Training Skills repeating section with a checkbox next to each to mark if you have the skill
* Larger expanded Missile section
* WS column in Weapons changed from a text field to a dropdown list (1, 2, 3, 4, and X).
* Add column in Weapons changed from a text field to a dropdown (1 or 2).
* New "Sustained Spells" input reducing Will rolls, plus new repeating section to note sustained spells
* Wound penalty dice directly reduce Reflexes
* New Stock list to filter age dropdown lists.
* Marking a Stat as Gray shade removes 5 pts from the relative pool. White removes 10.
* Training sills : new Shade and special mark columns (Training Skill, Dwarven Magical Skill, Elven Spell or Skill Song, Wolf Song). Skill pool calculation takes shade and
* New "Tough" (trait) checkbox to round up when factoring Mortal Wound
* Roll with Resources 0 is now possible

## v1.0 - v1.9

Sheet created by Steve K.(5047).
