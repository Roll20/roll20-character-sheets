# 2024-9-24

A number of small updates this week.  Starting some work to fix a mumber of other wierd bugs; but nothing yet.
Thank you to all who have reported problems.  Please let me know if there are more.

- Dark mode tweaks for side panel, and the crit box.  Dark mode is still a long
  way from complete on the main sheet; but the side panel should be usual.
- Spell rank modifier when casting; missed that in the other massive improvements.
- Don't barf AP updates on New Combat. 
- Fix for weight allowance (thanks spaturno80).  I totally misread those rules.  Like totally.
- Creature sheet improvements for skills and other items.
- Async: Recover is a few more wierd situations (thanks major__havoc).
- Spells: Show trickery and grace bonuses in spells.  This is the sort of
  feature you get when I play with the sheet, not just GM with the sheet.

[Compendium]
Add base lists by profession to the spell law list. Treasure Law data imported
for most non-magical items.  Chapter 1 complete.  Chapter 2 is 75% complete.
Monsters for other modules are getting ready too.

# 2024-9-19

Urgent fix for a roll20 API change.  Some of the values in fields from the
charactermancer started getting expansion ids shoved on the return values.
(if they contain a ~).

So before we look parse the string, remove any expansion ids on the end.


Sheet updates:
- Force HP and PP to max on levelup

# 2024-9-17

Miscalenous bug fix week!

After one week of activity there are a number of bugs.  Talents seemed to cause most grief - I've
fixed a lot of them.  Hopefully this means peoples sheets won't lock up anymore.

Otherwise it's a whole host of little things.

- Hair is now a box you can edit
- Save gender set during character creation
- Initiative:
  - Fix the button so it works again (stupid roll20 quotes)
  - Show the penalty in the result box
  - Send the value to the tracker
- Fix a few missing translation strings.
- Set correct ranks for written languages.
- On creation, make sure each stat gain has a unique name
- Creature:
  - Allow JSON and string items.
  - RR rolls for creatures
  - Injuries for creatures
- Talents
  - Save talent cost correctly for single tier talents
  - Fix some of the talents that cause problems on some browsers.
  - Handle more errors
  - Delete a malformed talent in the database
- Roll templates (side panel)
  - Add basic darkmode support
  - Put the results before the mods for skills and spell rolls.
- Can edit height/weight/build on sheet
- Stat gains uniquely identified during levelup
- Fix for item's name's template in the compendium
- Partial fix for vmabraces`greaves
- Fix for short bow and long bow attack tables
- Remove old Claw & Shockbolt hacks from compendium
- Spells correct display of realm stats
- Fix vambrace and greave ordering
- Update equipment on deletion
- Add a pending reset button to hopefully unjam people.
- Add an animated icon when doing work


# 2024-9-12

The first post compendium release... and it's small.  This is a good thing.
Sooner I get to Treasure Law I guess.


- Rewrite the way we track spell lists on level up.
  - Makes Hybrids happy; stops duplicated lists during level up
  - Track lists from from the sheet side.  Should stop the annoying
    duplicate spell list after level up.
- Fix a problem with single tier talents not applying

# 2024-9-10

The headline feature of this weeks release is using CRP (Custom Roll Parsing)
for skill rolls. This means we have a lot more descriptive text and information
in skill rolls; similar to attacks and spells.

Experimental support for custom spells has been added, and there is a way you
can turn a sheet to a creature sheet.  More on that coming soon.

Othwise there are lot of nits; hiding stun effects when you don't have any; and
show current ranks when you level up.  For both skills and spells.

- Skills:
  - Use CRP for rolls
  - Expand descirption and modifiers for use.
- Custom Spells now supported (experimental)
- Status effects like stun/staggered/bleed disappear if empty.
- Spell mastery masters magic; not manipulates (message change)
- Remove some injury debug.
- Religion is now an attribute.
- Compendium:
  - Evaporate Liquid is not 1, and it's 1000 cu ft, not 000 cu ft
  - Darkvision 10 + 5/tier. not 10+10
  - Golden throat 5/tier
  - Fix some minor grammar issues in some talent descriptions (.s and the like)
- Talents:
  - Fix costs with different per tier costs
  - Add placeholder support for spell lists.
- Optimisation: Reduce by ~3 number of API calls in updateSkils.
- Force ' ' for empty skills when there was a value.
- Attacks now have parry and 'other' modifiers (Long requested feature)
- Fix a bug stoppind stun penalies from applying to spells
- Levelup:
  - Spells persist their ranks (again)
  - Show current rank of simple skills
  - Show current rank of specialised skills.
  - Show current rank of spells
- Creatures:
  - Make creature loading more resiliant
  - Add a hidden way to turn a sheet into a creature
- Add a new preview image.

# 2024-9-3

- Bump sheet to version 3
  - Version 3 has only 'Realm Stat' for SCRs, removes 'Realm Stat Bonus'
- Clear high level spell names on updates.
- Move defenses near RRs on the main page.
- Spell display:
  - Don't add Realm Stat to casting bonuses twice.
  - Always put things [ ] (even hand bonusues) in description
  - Display 'no voice' corrently (not undefined)
- Attacks:
  - Fix escaping for ')' on targets
  - Fix for target size bug (typo I guess)
  - Encode location in the damage string.
- Actions
  - Persist free action, and clear after 4 phases.
  - Show the correct phase (relative, not the total)
  - Add 'new combat' button
- Status
  - Display staggered/stun status
  - Apply stun penalties to spells & attacks
- Injuries
  - Display knockback, grapple and other injury types
  - Keep record of penalty based injuries
  - Display injuries on Scratch page
  - Add basic recovery rolls
  - Set the location in the injury
  - Can delete injuries
- Bug fixes:
  - Misc Remove Attr function now actually does something
  - Fix minor (but amazinlgy irritating) bug in the AP description

# 2024-8-29

Bonus midweek update
- Split injury handling out
- Handle breakage penalties in criticals correctly
- Improve layout of rolltemplates; only show Apply when it's useful
- Condition tracking:
  - Track current phase
  - Handle bleeds
- AP Tracking for attacks: Melee & Spells
- Add special page to apply injuries

# 2024-8-27

- Add movement for creatures
- Set default values for hp, pp and injuries and the like.
- Sort skill and table names in attack add
- Add option for no attack skill
- Spells show +/-
- Initiative is an action; not a roll.  No d20 logo.
- Attacks
  - include manuever penalty
  - add AP tracking (melee only)
  - Expand modifiers clearly
- Spells now include manuever penalty
- Bugs
  - Fix missing attack modifiers
  - Handle applying damage to creatures with ')' in their name 
- Add internal sheet versions.  Unfortuantely
- Display sheet version on last page
- Automatically upgrade sheet 1 -> 2
  - Sheet 2 is skill costs on sheet (Character support)

# 2024-8-20

- Characters now save their skill costs on creation
  - Enables use of custom professions
  - Helps with Roll20 Characters (create characters outside of game)
- Support: Add "charactermancer" button to the settings page.
  - Will break your character.  You hae been warned
  - Allows migration to new skill costs
- Bugfix: Highest stat gets confused if the first is highest, and the second is not the
   secondhighest.  Add tests for these cases.

# 2024-8-15

- Show BMR info on front page
- Make BMR info more legible
- Don't add racial bonnus to BMR twice.
- Eyes/Skin/Hair now save
- Improve layout of the derived properties on the front page.
- Integrate EP into layout.
- Updates to way sheets open to make creatures easier to deal with.
- Force all sheets to be playersheets unless they are creatures
- Spell Lists -> click on the i to see the list in the compendium
- Foe box looks a little pretier.
- Endurance:
  - Create correctly if zero
- Misc:
  - Handle 'Null' data
- Creatures;
  - They have critreduction, not critreduciton
  - Redo layout.
  - Can now target PCs
  - Track AP box
  - Status box (hits etc)
  - Creatures can attack!
  - Don't apply DB size mod twice.

# 2024-8-6

- Spells:
  - Fix bug where OE Low rolls failed with NaN
  - Show the correct OE Low roll when rolling OE Low
  - Tweak message for PP on failure
- Fonts; add some more fallback fonts.  Impact is terrible
- Create:
  - Fix a bug where lanages spent in creation were not showing.
- Add validation that events are registered correctly.
- Inventory/Attacks
  - Correctly cleanup old attacks.  No longer thousands of attacks
  - Refactor code to be cleaner in process
  - Use pending infrastructure to remove potential race conditions
  - Automatically update the bonuses for attacks.
- Remove encoded attack message on attacks.

# 2024-7-30

- Lots more work on Creatures on the backend.
  - Big thanks to Scott C on the roll20 discord for his aid.
- Override 0 ranks when set.  Thanks to Hurin for this bug
- Handle not having compendium when adding attacks.  Thanks to Christoffer Holm for the report

# 2024-7-23

- Start of Injury tracking
  - Hits updates
  - Fatigue updated
  - Penalty total updates
- Shadows and colour for buttons
- Dynamic columns for skills
- Handle Grace
- Basic Creature sheet
  - Drop from Compendium to VTT (For Creature Law Owners)
  - Targetable NPC sheet.
  - Support Roman numeral style creature size
  - Don't update RRs on creature sheets.
  - Inititive for creatures
  - Start of creature attacks
- Internal:
  - Add a validating rmuSetAttrs

# 2024-7-18

- SCR now includes stat modifier.
- Improve layout of hits/injuries/endurance etc
- AP Tracking for spells: So cast a spell with 2AP, -50 mod.  Optional checkbox to enable
- Handle Spell Trickery
- Put a gradient on buttons... make them a little more obvious about action.

# 2024-7-16

- Display "No Voice" instead of "none" in spells
- Show all the modifier in the casting log all the time.
- Can edit spell names
- Spell results show RR targets for F, Fm and I spells.
- No PP spells now longer check or require PP
- Cap passive dodge & passive block at 50
- Fix calculation of partial dodge when encumbered (Thanks @filroden)
- No stats is equal to a 50.  Makes NPCs super easy.

# 2024-7-9

- First version of individual spell casting
  - With compendium; click a spell to cast it
- Spells get own css file now
- Tests for some spell casting function
- New misc Flattern for inline summaries
- Tweaks to edit spell list

# 2024-6-24

- Remove HP & PP from side list on main page (tracked in status)
- Internal
  - Ignore (generated) inventory files
- Compendium
  - Fix issue with Claw Table missing a row causing wierd misses.
  - Improvements for content for the character creation chapter

# 2024-06-17

- Bugs
  - Handle 0 running ranks in DB calculations
  - Fix over zealous const in culture ranks
  - Fix 4th Crafting skill in Urban Culture
  - Fix display of running ranks in DB info
- Charactermancer:
  - Make the pbonus & knack totals text, not entries.
  - Save languages from charactermancer for all cultures.
- Special button to edit spells (reorder and delete)
- Fix knacks using short name for attributes (without the misc)
- Set critreduction by default

# 2024-06-10

- Attacks:
  - Attacks have a proper pop up
  - Add useful error messages for bad attacks
  - Hide the error message when we show/hide the attack add box
  - update data when items are added.
- Bugs
  - Hybrid fix 'own realm'
  - Fix dependancies when building CSS for sheet
  - Deleted the mysterious 'Skills' race
  - fix swapepd fumble and ranks on attack listing
  - Show attack ranks (not rank)
  - Correctly scale non-medium attacks
- Inventory
  - (Internal) Move to own file for html
  - Delete items
  - Modify item count (update encumberance)
  - Can add equipment
    - Can add Armor - by location
    - Can add shields - db bonus and # attacks
  - Handle numeric weights as well as strings (x%)
  - Handle a few more error states for bad equipment.
- Expertise skills now show as 0 for 0 ranks (not -25)
- Spells have * or • afer them (compendium)
- Tests
  - Added tests for hybrid own realm
- Add some styling to updates.
- Internal
  - Attacks are a little less verbose.
  - Update documentation on attacks

# 2024-06-03

- Add attacks: Fully(?) customisable:
 - Any pubished attack table
 - Any listed attack skill
 - Modifiers
 - Fumble
 - etc
- Default skill values for Dynamic Specialisations
- Clear levelup purchases option (button - click it!)
- most buttons are now styled
- Added settings tab to character.
- Added discord link
- Bugs:
 - Handle missing regions and lores for culture ranks.
 - Fix subskill rolls
 - Remove "Immortal" talent from Elves - it's not a thing
- Internal
 - Add test framework for level up
 - Remove some dead code
- (Need to do rake)

# 2024-05-27

- Charactermancer:
  - Fix material and creature lore specializations
  - Really hit with a hammer the hide chaactermancer button.
    Hide directly at end of charactermancer.
- Direct critical roll (eg roll an C Electricity)
- Rest to recover Fatigue penalties
- Count the weight of items < 1 lbs
- Update total maneuver penalty when fatigue changes
- Stat info show potential (clearly)
- Fix Talents applying on level up
- Bugs:
  - Fix some internal calls using terrible way of saving ranks
  - Fix for targets smaller than attacker (no more insane DBs)
  - Update Weight Allowance when strength changes.
  - Fix alignment of stat info hover
  - Fix adding skills failing on error
- Stat gain:
  - Show the potential and temporary for stat gains
  - Add and remove stat gains tracked correctly
  - Extra stat gains are now required
  - Stat gains persist through level up
- Internal:
  - Remove unused charmancer.html.gvz
  - Less logging on feats of strength
  - RMU Async functions a bit more verbose on error

# 2024-05-20

- Fatigue rolls
- Track HP
- Calculate total maneuver:
  - Fatigue
  - Injury
  - HP Loss
- RR rolls
- (internal) Async calls now timeout and unblock if too long
- Charactermancer:
  - Toggle button dissapears more often (when it should)
  - Back from languages goes back one, not two.
  - Show region selectors in culture ranks
  - Fix selection of Region Lore Skills
  - Fancy navigation buttons
  - Fix most skills (not Material Lore and Languages)

# 2024-05-13

- Add support for the targetting button.

# 2024-05-06

- Attacks:
   - HP Scaling (based on size - beta rules)
   - Add missing criticals to attack results.  So all crits on attack tables should resolve
   - Add DB Bonus for small attacks
   - Fix bug: Attack scaling based on Attack size not attacker size.
- Fix bug finding attack types (eg Greater Hafted)
- AP tracking
   - With hacky messages!
   - Update preview image to something a little more relevance.

# 2024-04-29

 - Attacks!

# 2024-04-14

 - Fix bug in parseIntDefault to return the default if passed a 0
 - Add test for parseIntDefault
 - Roll buttons updated
    - The die rolls with a modifier.
    - The (skill) number rolls natural.
 - Fix a layout issue on safari (I hope)

# 2024-04-07

  - Fix grammar when casting spells; "cast from Spells List, not casts Spell List"
  - Weight Allowance calculation now shows
  - Fix DB blocking calculation
  - Talents:
    - Fix change of tier tracking
    - Make removal work
    - Levelup Talents now persist
  - Fix typo on 'received'

# 2024-03-31

 - More roll template improvements
    - Generalize
    - Fix dynamic specializations
 - Initiative roller
 - Spell & Spell Mastery rolls
 - Add support for scr_misc
    - support for eloquence and friends.
 - Info and edit buttons merge
 - Can edit names of Skill specialisations
 - Levelup stat gain fix
 
# 2024-03-26

 - Improvements to the roll template layout
 - Charactermancer fix realm
 - Fix open ended rolls from skills
 - Handle rmuasync errors by continuing
 - Sort translations.json to reduce deltas

# 2024-03-24

 - Skill rolls
 - Fix height and weight craziness
 - Lots of creation bug fixes.
 - Fix some update function on derived/frontpage

# 2024-03-17

 - Add specialisations
 - Edit specialisations
 - Add Spell lists on sheet
 - Edit spells
 - Bug: Fix skill ranks purchase for specialized skills

# 2024-03-10

- Skill specialisations now work in Favourite skills
    Use Ambush: Shields or Ambush:Shields
 - Inventory: Handle item removals.
 - Gender saved on sheet
 - Height and Weight updates:
    - S/M/B handled
    - Build supported
    - Variance added to racial data
 - Race previews
 - Culture previews
 - Fancy buttons
 - Edit skills (including fixed specialisations)
 - Edit stats
 - Use icons for edit/info
 - Other misc fixes.

