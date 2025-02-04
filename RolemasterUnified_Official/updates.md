# 2025-2-4

- Creatures: Validate attacks for all listed attacks.
- Correctly adjust attack size
- Change display of attack size for creatures.
- Add meditation to attack skills.

# 2025-1-21

- Creature: Handle Level correctly on dropped creatures.
- Dark Mode updates - closer to useful
- Creature layout updates.

# 2025-1-14

The wait... it's already halfway through January update!

- Knack selection now respects power levels.
    - Stil don't support 'set to average' and # stat boosts
    - Coming soon
- Knack and Profession Bonus won't continue until you select all items in
    charactermancer.
- Subtle now works for 'A' spells (0; it's not really a thing that happens)
- Always apply armor casting penalty - even if you don't have transcendance
- Update treasure law armor to include material
- Armor: Make sure we use the material if supplied
- Fix armor metal vs other materials
- Make sure ranged penalty is always a penalty
- Creatures now roll $Realm RRs, not 'undefined RR'
- Partial Dark Mode; not quite usuable, but you can look.
- Custom professions
  - Save weapon costs correctly.
  - Save the correct Knacks/profession bonuses
  - Fix level up spell lists (improves Roll20 Characters too)

# 2025-1-7

- Custom profession support.
  - Documented: https://github.com/nashidau/RMU-Interchange/blob/main/Profession.md
- Improve the styling of buttons & selected
- Update to creatures.  Not so visible to most users as of yet.
- Can now select 'no swap' for stat swaps at creation (@rdanhenry)
- Sort spell lists in charactermancer (@rdanhenry)
- Add 'C' to Urban survival.  C is City/Civilisations.
- Force reset of any background jobs at the start of the charactermancer finish.
- Save powerlevel (@rdanhenry)
- cleanups:
  - remove old dead rollstats2 call
  - Pending info now returns count

Also all the items in the 24th update:

# 2024-12-24

(not released, part of next update)
- Fix a bug where "Clear Saved" breaks level up
- Remove some dead code in level up - should be a trivial smidge faster.
- Discover the 'actions-test' was not being called - re-enable and fix errors
- Fix bleed so you don't bleed straight after being hit

# 2024-12-17

- Edit talents so you can delete excess talents (@major havok)
  - Genericise the code used by edit spells and edit talents
- Fix rendering of side panel after CSS breaks roll20
- Set status penalty to 0 on creature creation.

# 2024-12-12

The Author is an Idiot bugfix release for Treasure Law.

- Allow drops from all magic item types
- Save descriptions for all items (even new format)
- Funky line as you lose hits or PP
- Fix a maneuver penalty error which was messing up item drops

# 2024-12-10

- Finalise handling of Professions with selectable Base lists
    - Alchemists are the first users
- Creatures: Add hx for Hand Crossbows, and a few other attacks
- Half shield bonus skill for partial block - not the full one.
- Try and squash the super long list of errors when you first update stateud
- Compendium data: Move a long bow to Bow, Long for the table.
- Creatures: Creatures can now roll skills.
- Equipment:
  - Perception Penalties are now applied
  - Ranged Penalties are now applied.
- Take a terrible guess if it's a ranged or melee weapon when adding attacks
- Creatures now have framework for type of attack (melee, ranged, directed)
  - Does not (yet) change attack
  - Add test to validate attack types
- Change 'maneuver_penalty' -> status_penalty
  - Update everywhere except inventory; it was a collision of names before.

# 2024-12-3

- Initiative modified by maneuver penalty
- Update rolltemplate for initiative to show penalty if present.
- Add tests and validations for creatures.
- All creature weapons now have a size (usually 0)
- Display a message when an injury takes a character to negative hits.
- Fix a stupid misplaced class for RRs

# 2024-11-26

- Handle the knockback results when they have a ' in them.
- Handle short swords and a few other weapons for creatures.


# 2024-11-19

- Stats are now right aligned.
- Fix update for specialised skills.
- RRs:
    - now have a box.  Make them standout more.
    - Use the pretty name. not the attribute name.
    - Number now rolls with modifier.
- Fix an issue causing some characters to have problems levelling up.
- Fixed specialisations show the skill name when rolling.
- Handle knacks for Alchemists.

# 2024-11-14

- Add description to each step of the Charactermancer buttons
- Clear ranks on specialised skills if 0.  Previously worked for non specilised skills, this fixes
    specialised skills as well (@ixs)
- Add base lists selection in charactermancer.   Useful for professions with base lists.  Additionally
base lists are now stored on the sheet.  So they persist.
- Add control to stop progression until you have entered all data on the sheet required.
- Bump sheet version 7
  - Existing charaacters will have their base lists updated on the main sheet.

# 2024-11-7

- Sheet version to 6.  Funny how lots happen at once.
- Force a skill recalculation after update.
- Fix dependancy issue in edit.js: It depends on the skill list.   Can now edit dynamic specialisations for
the new vocational skills.
- Remove some dead code in skills.
- Update similar skills modifier for fixed specialisations.
- Make roll button for dynamic specialisations actually visible.  0 width buttons are really hard to see and click.

# 2024-11-5

- Bump sheet version to 5
- Vocational skills are now dynamic specialisations.  No longer a fixed list.
  - Cleans up a lot of space on the sheet
  - Update the level up process to match
  - Automatically move old skills across

# 2024-10-29

- Finaly update skills to show specilisations,
- Fix translation issue identified by Jon_joe.
    - Seems French has 2 strings translated.  And one exposed a bug
    - Add tests for case
    - improve code flow.  My JS has improved.
- Add injury string to direcly rolled cripts
- New combat has moved; now in creatures too
- Improve favourite skills buttons and layout
- Remove some spurious nil class descriptions
- RRs can now click on number or die

# 2024-10-22

- Spells: Fix a nbs[ instead of a space
- Less message spew during creation.
- Less message spew during attacks.
- Fix actions code to not break level up
- Attacks small layout changes.
- Heading for feats of strength
- Move New Combat to the status block
- move EP near level.
- CC updates.

# 2024-10-15

- Start of Power Level support
    - Sheet version to 4: Set everyones powerlevel to Superior
    - Show powerlevel on sheet
    - Add create step for power level
    - Add support for powerlevel during stat rolling
- Use the roll20 dice roller for dice; not the js one.
- Send stat rolls to the chat.
- More messages when injuries are applied.
- Make checkboxes a standard size,
- NPC upload button on the front page.
- Directly rolled crits now have injury string


# 2024-10-8

- (Hopefully) quieten monsters AP messages.
- Handle a numeric AT (some monsters)
- Updated attack testing significantly.
- Remove some not-an-error errors in attacks
- Stop using D for side.  That's death/defeat.  O is now side. (Odd)
- Fix for monsters dropped from compendium

Compendium: Fix the couple of corrupted attack tables which were causing random failures on
some attacks.  This has been bugging up a few characters (and creatures).

# 2024-10-3

- Remove a lot of debug in level up and stuff.
- Allow creatures to be called NPCs on drop
- Creatures (NPCS) now display spells

# 2024-10-1

Work continues on improving 'stuff' (aka Inventory or items).  So first up we have casting penalties
for armor calculated and working.  This may may the spell casters in your group most unhappy.  I hope
they stocked up on Transcendance.   We have also added a 'pack' and 'store'.  A pack is backpack or
similar item you can drop if in combat.   Or maybe on your horse.  There is a toggle button to carry
or not carry it.  Encumberance pnealties are calcualted depending if carried or not.   Store is for
stuff you character doesn't have with them.  Homewares or buried treaures.  You can move items between
the three lists easily.

Then there is a pile of small items; Spells persist previous ranks on levelup.  Lots of people have
asked for this - Enjoy!

- Stuff (aka Inventory)
  - Spell equipped correctly.
  - Items only count to encumberance% if equipped (w/ test)
  - Add Store & Backpack sections
  - Add toggle for backpack carried
  - Allow items to move between sections with a click
- Add support for transcendance and spell Enc% penalties
- Make bleed a local (internal change)
- Reset current round/phase on new combat.
- Show the current round in the action box
- Don't set negative PP on the character sheet (min 0)
- Spells remember how many you got on level up.

# 2024-9-26

Start work on fully supporting encumbrance and maneuver penalties.  So now we
calculate load (we did not before), our max pace (been empty forever), change
the property name to carried_weight (was set, but never used before).

- Creatures:
  - Handle more attack types
  - Creature attacks work again with the new maneuver penalties.
  - Fix issue with creatures without skills failing
- Update maxpace and load %s on sheet
  - Need to update equipment in the compendium to make this effective.
- Add a dot to show skills you have a profession bonus in
- Update DB:
  - Add passive block to active dodges and passive dodge to active block
  - Cap running ranks, not passive DB at 50.

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

