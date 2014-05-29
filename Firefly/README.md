# Firefly RPG Character Sheet

### Usage

Editing attributes, skills, distinctions, etc is straightforward, simply fill
out the text fields and  mouseover the dice image to change its value.

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


