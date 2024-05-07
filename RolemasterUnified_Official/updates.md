2024-05-06

- Attacks:
   - HP Scaling (based on size - beta rules)
   - Add missing criticals to attack results.  So all crits on attack tables should resolve
   - Add DB Bonus for small attacks
   - Fix bug: Attack scaling based on Attack size not attacker size.
- Fix bug finding attack types (eg Greater Hafted)
- AP tracking
   - With hacky messages!
   - Update preview image to something a little more relevance.

2024-04-29

 - Attacks!

2024-04-14

 - Fix bug in parseIntDefault to return the default if passed a 0
 - Add test for parseIntDefault
 - Roll buttons updated
    - The die rolls with a modifier.
    - The (skill) number rolls natural.
 - Fix a layout issue on safari (I hope)

2024-04-07

  - Fix grammar when casting spells; "cast from Spells List, not casts Spell List"
  - Weight Allowance calculation now shows
  - Fix DB blocking calculation
  - Talents:
    - Fix change of tier tracking
    - Make removal work
    - Levelup Talents now persist
  - Fix typo on 'received'

2024-03-31

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
 
2024-03-26

 - Improvements to the roll template layout
 - Charactermancer fix realm
 - Fix open ended rolls from skills
 - Handle rmuasync errors by continuing
 - Sort translations.json to reduce deltas

2024-03-24

 - Skill rolls
 - Fix height and weight craziness
 - Lots of creation bug fixes.
 - Fix some update function on derived/frontpage

2024-03-17

 - Add specialisations
 - Edit specialisations
 - Add Spell lists on sheet
 - Edit spells
 - Bug: Fix skill ranks purchase for specialized skills

2024-03-10

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

