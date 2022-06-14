# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

If you have any issue, you can contact me through a private message in my Roll20 profile : https://app.roll20.net/users/562012/eric

## Known issue

- I know there are no upper limits to mental health but 13 seems enough.
- This character sheet is not suitable for powerfull npcs (like Nepharites) with wounds exceeding player character's maximum values.
- Repercussion range does not include the Unskilled modifier.


## [1.1.1] - July 2021

### Changed

- Images now hosted on roll20 character sheet repository.

## [1.1.0] - June 2021

### Added

- Added a datalist to suggest weapon "Mode" value.
- Added a datalist to suggest weapon "Size" value.
- Added a datalist to suggest talent "Skill" value.
- Added "Starting value" for chronicles points and wounds.
- Added skill table header to identify fields.
- Added an "Event" fieldset in the "Background" section.
- Added odd line background color in repeating sections.
- Added an arrow icon next to advanced skills.
- Added "Attack Skill" field and button in the weapon section.
- Added some "Help" buttons

### Changed

- Layout has been partially migrated from &lt;table&gt; to flex or grid.
- Some field's width now adapt to the character sheet size.
- "Wounds" section layout changed to improve readability.
- Numerous style and visual improvements. 
- All rolls now use a template.
- Changed the number of wound's checkboxes to allow all possible character attributes according to the core rulebook. Some checkboxes have moved due to this change and players should check if they need to move some of the check mark. 
- Merged the two "Talent" sections into one. Note that the fixed talent section was kept to remain backward compatible.
- Damage bonus from attributes are no longer an absolute number. Instead you choose the type in a selectbox. This cause the value from previous sheet version to be lost.
- Damage bonuses are now an &lt;input type="number"&gt;. This could help prevent problems while rolling damages.
- A lot of "text" fields have been changed to "number" fields.

### Removed

- "Attribute Bonus Dice" field in the weapon section. It was replaced by the "Damage bonus" selectbox.

### Fixed

- Earning roll now include Earning score.
- Skill tests now use the dread setting. (I houseruled that Attributes check are not subject to the unskilled Repercussion range)
- Skill test now count the additionnal sucess generated when you roll equal to or under the focus rank.

## [1.0.1] - 2017-03-30

### Changed

- Changed image hosting. Thanks to Rob Heath.

## [1.0.0] - June 2016

### Added

- Initial release. Thanks to Rob Heath.
