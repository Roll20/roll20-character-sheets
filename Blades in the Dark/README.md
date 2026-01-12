# Blades in the Dark Character Sheet

This is the source code for the Blades in the Dark character sheet on Roll20. 

Blades in the Dark source code is currently maintained by Evil Hat. Please contact Evil Hat at [feedback@evilhat.com](mailto:feedback@evilhat.com)  if you have changes you want to see made and we'll consider working that into our official support!

If you want to hack the sheet for your own Blades hack, a more hackable (earlier) version and instructions for hacking can be found [here](https://github.com/joesinghaus/Blades-template). Build command: `./build.js` (requires node, with pug and sass installed via npm).

## Changelog

### 3.11
General
- Made sure the "type in the ability name and it will automatically fill in the description" feature functions inclusive of new ability versions resulting from enabled Deep Cuts modules.
- Added the deep cuts module toggles to sheet.json so GMs can set those defaults when initially creating their game (thus ensuring individual players don't have to go in and activate them all themselves on each sheet)
- Implemented new Stranger playbook from Deep Cuts

Deep Cuts Factions
- Added setting toggle for factions module to gear menu
- Display modestly reconfigures itself when toggling the module.
- Codework done to switch between two different faction list data objects depending on whether or not the DC Factions module is activated.
- For DC factions, got the districts Citizenry list to split into new Citizens vs Nobility/Bosses lists
- Added Deep Cuts factions: Tangletown, Covenant, Unity Commission, Rowan House, Strangford House, Ironworks Labor, Void Divers, Ragskulla, Sparkrunners, Unchained, Strangers
- Added "Other" faction area for ad hoc creation of factions that don't fit any other category
- Reworked the display of the Faction sheet in general (both with and without DC) to give it some more pleasant flexibility rather than having hard (invisible) grid structure vertically.

Deep Cuts Action Module
- Added setting toggle for action module to gear menu
- Changed position options on action rolls to remove Controlled when the Action module is active. (In the module, you do not roll if the current position is Controlled.)
- Changed subtitle and instructional text on roll display for Push (aka Resist) rolls when the Action module is active
- Created an "Edge" field underneath the actions & attributes that displays when Action module is active.
- Removed the "push yourself" option from the "Bonus Die" box when the action module is active.
- Characters abilities given DC alts when Action is active: Ambush, Bodyguard, Daredevil, Expertise, Foresight, Ghost Mind, Iron Will, Mastermind, Savage, Scout, Trust in Me
- Crew abilities given DC alts when Action is active: Blood Brothers, Bound in Darkness, Synchronized. 
- Crew turf claim given DC alt when Action is active: Informants

Deep Cuts Advancement Module
- Added setting toggle for advancement module to gear menu
- Implemented setting to set the advancement clocks sizes at 4, 6, or 8 segments (default 6)
- Removed XP tracker Above the Character Special Abilities when module active
- Removed XP trackers next to Insight, Prowess, and Resolve when module active
- Replaced XP triggers (below the special abilities) with Deep Cuts versions when module active
- Added XP clocks in XP section, along with instructions, when module active
- Removed XP tracker above the Crew Special Abilities when module active
- Added XP clocks in Crew XP section when module active

Deep Cuts Downtime Module
- Added setting toggle for downtime module to gear menu
- Added a 4-tick Debt clock to all playbook sheets, to the right of the vice/purveyor area, "north" from healing and coin area. When the Downtime module is active, the "indulge vice" button disappears at the debt clock takes up its space.
- Character abilities affected by module given alternatives: Connected, Functioning Vice, Vigorous, Physicker, and Sinister Guile.
- Crew abilities affected by module given alternatives: No Traces, Patron, and Slippery.
- Implemented function to handle swapping certain crew Claims in response to the Downtime module being active; used for Warehouse claims.
- Increased size of crew vaults when in Downtime Module mode; ensured that current balance is reflected in new vault config when switching the module on/off.
- Added a "bank" field, right underneath vaults, to display when in Downtime Module mode
- Added "Ward Boss" field for both standard and deep cuts modes
- Made a debt clock appear next to Ward Boss when the downtime module is active
- Changed all crew upgrades to have a coin cost when in Downtime Module mode

Deep Cuts Harm Module
- Added setting toggle for harm module to gear menu
- Supported reconfig of Harm area when module active
- Harm share button (bell) reimplemented for active module context
- Character abilities affected by module given alternatives: Vigorous, Tough as Nails.
- Implemented settings toggle to give a second level 3 harm entry area (to support Tough as Nails alt)
- Crew abilities affected by module given alternatives: Anointed.
- Changed display of crew's harm-tracking displays to match Deep Cuts when module active.

Deep Cuts Innovations
- Added setting toggle for innovations to gear menu
- Enabled adding of Prichard Camera, Slugger Pistol, Spiritbane Charm, Arclighter & Glimmer, and Slugger Rifle by enabling Innovations mod. 
- Renamed "Throwing Knives" to "Thrown Weapon" for Deep Cuts matching. Will persist as "Thrown Weapon" for standard, because this is largely cosmetic.

Deep Cuts Load Module
- Added setting toggle for load module to gear menu
- Added ability to override the default Load values when load module is active (swapping out the override controls for the non-module defaults)
- Changed Load choices To: Discreet: 4 (no heavy items) Conspicuous: 6 when module active
- Character abilities affected by module given alternatives: Mule.
- Separated list of normal items, heavy items, and playbook items when module active.
- Changed all crew Rigging options to match Deep Cuts version when module active.


### 3.10

* Added Dark Mode support
* Added Crew playbooks for City of Red Waters:
	* Emcees
	* River
	* Roots

### 3.9

* Option to rename attributes and actions
* Internal refactoring of sheet worker code
* CSS fixes for Portuguese translation

### 3.8

* Minor bugfixes and removal of legacy code

### 3.7

* Simplified the roll template code
* Support for French translations added
* Support for Spanish translations added

### 3.6

* Simpler formula for dice rolls (with legacy transition stuff in the roll template)

### 3.5

* Added notes for friends and contacts

### 3.4

* Look up entered ability names and fill description automatically

### 3.3

* New option to display a small character picture on all chat rolls
* Number of dice rolled is now pre-calculated by sheet workers; this means that there's no more need for nested inline rolls in the roll buttons
* Rename attributes corresponding to upgrades
* Some tweaks around spirit playbook special abilities
* Minor visual tweaks

### 3.2

* Added proper vampire traumas (thanks Jeffrey Lamb)

### 3.1

* Fixed font for the Korean localization
* Alchemicals now have a renameable title, and bandoliers can be hidden
* Restyled repeating section controls to use symbols instead of text
* Use CSS grid for large-scale sheet layout, fixing some weird margins along the way

### 3.0

* Large internal refactoring and cleanup: the sheet is now generated from pug code. There should be no functionality change from this, but it has probably introduced a few new bugs
* Unofficial Iruvian playbooks by Johnstone Metzger added
* Ancient upgrade code (pre-2.0) removed

### 2.6

* Updates to the sheet to make the Korean translation work

### 2.5

* Added option to use Kirsty font if installed
* Small graphical changes

### 2.4

* Several bugfixes
* New clocks-only mode for the faction page for those who want a character sheet just to store clocks
* Alchemicals repeating section

### 2.3

* Added broadcast button for sending information to chat for special abilities, clocks, and harm.
* Image clocks have been replaced by a CSS version that looks sharper, especially in the roll template.

### 2.2

* It is now possible to add a cohort to the character sheet. Automatic for Hounds.
* Various small bugfixes

### 2.1

* New auto-expand technique allowing some fields to grow according to their contents
* Sheet worker tweaks for better transition to spirit playbooks

### 2.0

* Additions
  * The names for heat, wanted, and deity can now be changed
  * Settings are now filtered by sheet type
  * Buttons for adding playbook items and crew-specific upgrades
  * Option to make bonus dice a freeform input field
  * Option to ask for a consequence name when resisting
  * Fortune roll button added to factions sheet
  * Engagement roll button added to crew sheet
  * Added a clocks repeating section to the faction sheet, and a real notes field
  * Box-shadow effect to focused input fields (can be disabled in settings)
  * Button to reset items and load with one click
* Changes
  * New model for action and tier dots that gets rid of the need for extra attributes
  * Refactored sheet workers and cleaned them up using new features
  * Adjusted the width of crew type and playbook input
  * Roll template header changed to have character name and text inline
  * Disabled spell checking on all input fields
  * Bypassed unnecessary extra padding around the sheet
  * Veteran special ability added to all playbooks for clarity
  * Frame features are now a repeating section, as they should be
  * Improved spacing for action dots when expanding the sheet

### 1.15

* Added 10-clocks, courtesy of Chris McDonald
* Fixed resistance bonuses erroneously applying to vice indulgence

### 1.14

* Changed font to Georgia for unified look on all platforms, and better alignment
* Quality-of-life changes in several places

### 1.13

* Visual improvements
* Labels now properly used to toggle some smaller checkboxes
* Added option for vampires' Dark Gift and global resistance bonuses
* The sheet now shows the options for heritage, background, and vice if they are empty

### 1.12

* Calculate trauma automatically
* Overhauled roll template internally, no more distinction between normal dice and bonus dice
* Visual improvements to layout for some kinds of checkboxes
* Overall transition eye-candy

### 1.11

* Internal change to how checkbox attributes are stored
* Change how default values are set so that only necessary attributes are changed

### 1.10

* Revamped flexbox-based layout and CSS changes
* New design for clocks area

### 1.9

* Clock segments are now clickable
* Moved the healing clock to the other column of the harm/armor/coin container
* CSS cleanup
* Added descriptions to upgrades and items
* Added button to roll lifestyle, healing
* Added more visible indicator that stuff happens when you fill in playbook or crew type

### 1.8

* Extra rows of claims can now be added
* Corrected minor typos
* Internal changes to the sheet upgrade process to make it more robust for ancient sheets

### 1.7

* Change to auto-generated abilities/items/friends: they will now be deleted if you change playbook/crew type, unless they have been changed at some point
* Small CSS adjustments
* Change stash gained by crew advance to printed version

### 1.6

* Translation support for everything except fixed fields in roll templates
* Crew-specific upgrades are now a repeating section, repeating upgrades moved to crew-specific upgrades, descriptions added to crew upgrades

### 1.5

* All items are now repeating
* Optional description field added for all items (via settings menu)

### 1.4

* Changes for items; made playbook items a repeating section, and added options for non-playbook-items.
* Entering a playbook or crew name will now automatically generate abilities and friends/contacts
* Small fix for ghost/hull label for stress and trauma

### 1.3

* Added Vigilantes data

### 1.2

* Roll titles are moved to the roll template so they are no longer displayed as links
* Fortune rolls will ask for bonus dice first to remedy confusion
* Minor data fix for Bravos barracks claim
* Fixed a bug where sometimes not all rows in a repeating section would be created

### 1.1

* Some small visual changes, mostly around boxes for stress/rep/heat/coin/stash
* Maximum number of stress boxes increased to 14
* Image hosting moved to Github
* Updated 6-segment clock to use correct image

### 1.0.2

* Small styling tweaks

### 1.0.1

* Corrected an issue with number inputs not saving their values in Firefox

### 1.0

* Overly long character names will now be shortened in roll templates, instead of becoming an unreadable mess
* Negative bonus dice (up to -3) can now be selected
* Invisible dice will no longer be rolled; the sheet will now work properly with 3D dice
* Unified roll templates (this should be invisible to the user)
* Added setting for flexible sheet width
* The Friends section now has the correct title based on playbook

### 0.9

* Sheet-worker-based solution to displaying a row for abilities/friends/crew abilities/contacts by default

### 0.8.1

* Added names for all roll buttons

### 0.8

* Added buttons to generate special abilities and friends/contacts (in the settings menu)

### 0.7

* Faction mode added (to Character Mode and Crew Mode)
* Old "Factions & Status" section is removed, all the content added to a notes box
* Standard Doskvol factions can be generated by pressing a button

### 0.6

* Further improvements to cohort section

### 0.5

* Added description field to Factions & Status section
* Changed type choice for cohorts to a pseudo-select dropdown
* Added button to roll cohort quality
* Removed spirit playbook dots, since you're supposed to add them to existing dots
* Disabled reset-to-zero feature when switching to a spirit playbook
* Added Frame section under items to support the Hull playbook

### 0.4.2

* Added Georgia to list of header fonts for a better look on Windows

### 0.4.1

* Improved behaviour when sheet is popped-out
* CSS cleanup

### 0.4

* Added Factions section on crew sheet to record faction status

### 0.3.3

* Fixed display issues on Firefox/Windows
* Vampires now have an Indulge Vice button
* When turf boxes are checked, they now turn a darker shade

### 0.3.2

* Fixed several minor display issues
* Try to fix some display issues in obscure configurations
* The Entanglement/Wanted button now displays correctly

### 0.3.1

* Added option to show longer xp bars (for vampires)
* Added vampire strictures
* fixed overflow error in traumata box

### 0.3

* Full support for Ghost playbook
* Partial support Hull and Vampire playbooks: different traumata and replacements for vice
* Stress has now more room to breathe when you don't have extra boxes

### 0.2.4

* Recovery clock is now a 4-tick clock
* Added option to modify the names of Stress and Trauma via gear settings
* Added the option of adding a 12th stress tooth (for vampires)
* Added reset-to-zero applied before switching playbooks. This won't change any field that has been modified by the user.
* Unused playbook item slots will be hidden automatically
* Some minor styling changes

### 0.2.3

* Added preliminary version of Wanted button (no correct title yet)
* Fixed a bug with the repeating\_crewclock and repeating\_crewability sections
* Removed Pet/Special upgrade
* Starting Hold changed to Strong
* Fix bug in resistance roll button color

### 0.2.2

* Changed cohort section to conform to 8.1 - removed cohort button and added text field instead, since you now roll your crew tier
* Removed deprecated special armor section
* Internal change in how mutually exclusive checkboxes in Shady Friends and Load section are handled. Needs no sheet workers!

### 0.2.1

* Added triangle next to contact name to mirror paper sheet
* Made crew special ability and clock separate repeating sections in case they need to be distinguished
* Added cohort description to output of cohort roll template

### 0.2 Initial Release
