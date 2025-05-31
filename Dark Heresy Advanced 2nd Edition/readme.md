This is an Advanced character sheet for the Dark Heresy 2nd Edition role-playing game. It differs from the standard character sheet available and utilizes API scripts to accurately (and correctly) provide dice rolls measuring Degrees of Success and Degrees of Failure. It has been redesigned to include a multitude of differing features and organizations. 


The changes include tabbed divisions for organization, repeatable fields added to gear items, cybernetics, psychic powers, skills and talents, provided an 'Other skill' field for overflow of Trade/Lore/Specializations of Operate, and built-in macros for variable initiative rolls.


Note: The following API Scripts must be utilized in your API console for this sheet to work properly;
> DH Degrees of Success for Skill by Jack D: https://github.com/Roll20/roll20-character-sheets/blob/master/Dark%20Heresy%20Advanced%202nd%20Edition/API%20Scripts/DH_Degrees_Skills.js
> DH Degrees of Success for Weapons by Jack D: https://github.com/Roll20/roll20-character-sheets/blob/master/Dark%20Heresy%20Advanced%202nd%20Edition/API%20Scripts/DH_Degrees_Weapons.js
> Ammo Count by Aaron C. Meadow: https://github.com/shdwjk/Roll20API/blob/master/Ammo/Ammo.js



Several Changes were made recently by Dustin1230 to update the sheet and fix things that were broken or not calculating correctly, including the below API scripts that were calculating degrees of success incorrectly.  For now the fixes/changes have been centered around Gear and Advancements but more is on the way.
> Additional Gear Sections: The standard section for carried gear with the addition of sections for Backpack items as well as for Stored gear that doesn’t get calculated into weight limits:
o Gear
o Backpack/Vest
o Stored Gear
> Gear Calculations: All calculations are done for you regarding Gear now.  The information is also displayed so that you can verify that it is working correctly, these calculations include:
o Finding Strength and Toughness Bonus and adding them together (SB+TB:)
o Using the SB+TB modifier to give your character’s starting weight (Base:)
o Location to insert Backpack/Vest weight bonuses (Pack Bonus: | Vest Bonus:)
o Adding up the different sections’ total weight (Pack Weight: | Total Stored Weight: | Total Weight:)
o Character’s maximum carry weight (Max:)
o Remaining weight before being encumbered (Available:)

If you have ideas for changes or need something fixed in the DH2E Advanced Character Sheet you are welcome to DM Dustin S on Roll20
> Dustin S. | Roll20: Online virtual tabletop
