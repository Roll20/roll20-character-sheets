# Firefly RPG Character Sheet

*This sheet has a website with an interactive preview!*

[View Interactive Sheet Preview](https://ramblurr.github.io/roll20-character-sheets/)

### Usage

This character sheet requires a modern web browser. You must be the latest
version of Chrome, Firefox or Internet Explorer to get the full experience.

Editing attributes, skills, distinctions, etc is straightforward, simply fill
out the text fields and  mouseover the dice image to change its value.

#### Bugs and Suggestions

Report bugs or suggestions to the project’s [issue
tracker](https://github.com/Ramblurr/roll20-character-sheets/issues).

### Dice Pool Rolling

*This is Mentor feature only.*

This sheet integrates with the `CortexPlus-DicePool.js` API script to handle
dice pool building and rolling.

All attributes, skills, distinctions, etc have roll buttons to add the
corresponding value to the dice pool.

The script must be added to your campaign in order to work. If it is not added,
then the buttons will not do anything.

### Compiling

This sheet uses the [Less](http://lesscss.org/) CSS pre-processor to generate
the CSS. You’ll need the less compiler to build the stylesheet from source.

Compile the CSS with:

```bash
lessc styles.less > firefly.css
```

A pre-compiled stylesheet is included in the source repo.

