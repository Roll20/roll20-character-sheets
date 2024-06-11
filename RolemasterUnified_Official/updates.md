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
  - Added tests fpr jybrid own realm
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

