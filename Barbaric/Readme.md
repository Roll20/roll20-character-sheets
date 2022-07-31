# About

Official Character Sheet for [Barbaric!](https://www.drivethrurpg.com/product/348272/Barbaric)/[¡Bárbaro!](https://www.drivethrurpg.com/product/357031/Barbaro) by Stellagama Publishing. Sheet Created by [Andreas J.](https://wiki.roll20.net/Anduh)

## Sheet Info
Basic character sheet for tracking your stats, with roll buttons for Skills, Attacks & Initiative.

If critical Success or Critical Fumbles are rolled with Skills or Attacks, the crit will be highlighted in the result.

Sheet can be translated to other languages using [CrowdIn](https://wiki.roll20.net/CrowdIn).

### Roll Template

Has built in roll templates that can be used for creating customize roll results, such as sorcery.

**base format**
`&{template:rolls} {{title=the}} {{subtitle= optional subtitle }} {{color= color of title background, default black}} {{anything= anything, can have as many of these sections}} {{desc= optional section that's full width of the template, good for descriptions}}`



**Ex 1**
How the base roll for crafting looks like:
`&{template:rolls} {{title=craft}} {{subtitle=@{character_name} }} {{color=black}} {{^{roll-i18n}[[ [[2d6]]+@{craft} ]]}} {{baseroll=$[[0]]}}`

**Ex 2**

`&{template:rolls} {{title=Poison Cloud}} {{color=green}} {{damage=[[3d6]]}} {{desc=poison cloud spreads in the surrounding}}`


**Ex 3**

`&{template:rolls} {{title=Read/Sense Magic}} {{subtitle= @{selected|character_name} }} {{color=purple}} {{^{roll-i18n}[[ [[2d6]]+@{selected|sorcery} ]]}} {{baseroll=$[[0]]}} {{desc=Succeeds on a Sorcery 8+ throw}}`

# Contribute

Compile `barbaric.scss` from the `src` folder to get the barbaric.css, don't edit barbaric.css directly.