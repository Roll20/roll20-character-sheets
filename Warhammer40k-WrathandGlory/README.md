Warhammer 40k Wrath & Glory Character Sheet
=======================

This is the Warhammer 40k Wrath & Glory Sheet readme.

## General Guidelines

This sheet will work with Firefox but its best suited for Chrome.

### Attributes

* **Attributes**  that are rollable have buttons for headers which will toggle on that attribute for the Dice Roller. Hover over these headers and if they have a white/red glow to them they are rollable.
* **Rating** input is not tied to any sheet workers and is there for users to track their base rating.
* **Adjusted Rating** are tied to Totals for skills and will trigger automatic calculations if changed.

### Traits

Some traits have rollable buttons for headers. Traits in general are not automatically calculated nor directly tied to the sheet elsewhere with sheet workers.

### Dice Roller

This sheet uses a dice roller for rolling. You will need to click on the attribute or skill you want to roll the press the row of 4x d6 dice under the Dice Roller header to roll. Rolls are generated based on selected stats and modifiers which is currently capped at 30.

* **Modifier** input will add additional modifiers to your roll template.
* **Wrath Dice** input will increase or decrease the number of Wrath dice included in the roll template.
* **D6** button will roll a single d6.
* **D3** button will roll a single d3.
* **D66** button rolls 2x d6s for the d66 charts found in the core book.
* **Selected** simply displays the current skill or attribute selected for rolling.
* **To GM** speech bubble will toggle on and off GM whisper rolling.
* **Roll** button represented by 4x d6s can be used to make any die roll that is selectable on the sheet.

### Skills

* **Skills** headers are buttons and can be clicked to toggle them into the Dice Roller.
* **Rating** inputs are linked to sheet workers which will use the Linked Attribute select to auto calculate Total. Changing a Rating will change the Total.
* **Linked Attribute** for skills is tied to the Total. Changing the Adjusted Rating for an attribute should also update the Total.
* **Total** input is automatically calculated by changing Rating or the Linked Attribute value. You can set the Total to a different number and it will roll using that number. Changing the Rating or Linked Attribute will overwrite any manual entry.

## NPC

NPCs function similar to PCs. Their skills are currently set to the suggested attribute as described in the book and this cannot be changed. Use the PC sheet for more diverse NPCs.

## Roll Template

The roll template will always show you the dice roll rather than counting successes. The d6 button found on weapon rolls can be used to Shift.
