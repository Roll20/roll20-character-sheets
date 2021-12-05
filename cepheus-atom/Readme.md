# About

Official Character Sheet for [Cepheus Atom](https://www.drivethrurpg.com/product/324514/Cepheus-Atom), by Stellagama Publishing. Sheet Created by [Andreas J.](https://wiki.roll20.net/Anduh)

## Sheet Info
Basic character sheet for tracking your stats, with roll buttons for Skills Initiative.

If critical Success or Critical Fumbles are rolled with Skills, the crit will be highlighted in the result.

Sheet can be translated to other languages using [CrowdIn](https://wiki.roll20.net/CrowdIn).

### Roll Template

Has built in roll templates that can be used for creating customize roll results, such as sorcery.

**base format**
`&{template:rolls} {{title=the}} {{subtitle= optional subtitle }} {{color= color of title background, default black}} {{anything= anything, can have as many of these sections}} {{desc= optional section that's full width of the template, good for descriptions}}`



**Ex 1**
How the base roll for crafting looks like:
`&{template:rolls} {{title=Combat}} {{subtitle=@{character_name} }} {{color=black}} {{^{roll-i18n}=[[ [[2d6]]+@{combat} ]]}} {{baseroll=$[[0]]}}`

**Ex 2**

`&{template:rolls} {{title=Poison Cloud}} {{color=green}} {{damage=[[2d6]]}} {{desc=Poison cloud spreads in the surrounding}}`


**Ex 3**

`&{template:rolls} {{title=Paralysis}} {{subtitle= @{selected|character_name} }} {{color=purple}} {{^{roll-i18n}=[[ [[2d6]]+@{selected|physical} ]]}} {{baseroll=$[[0]]}} {{desc=Must succeed on a Physical 6+ throw, or be paralysed for [[1d6]] turns. Victim needs only do max one Physical 6+ throw per turn, regardless of numer of paralysis attacks they suffer.}}`

# Contribute

Have [sass](https://www.npmjs.com/package/sass) & [pug-cli](https://www.npmjs.com/package/pug-cli) installed, then run `sass sheet.scss sheet.css --no-source-map --no-charset | pug sheet.pug -o . -Ps` on the CLI, and the source-files will compile the final `.html` and `.css` files.