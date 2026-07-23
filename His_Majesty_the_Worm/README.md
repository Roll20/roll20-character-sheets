# His Majesty the Worm Character Sheet for roll20

This is a character sheet for running His Majesty the Worm (https://www.hismajestytheworm.games) in roll20.  This is largely based on the character sheet provided here: https://riseupcomus.itch.io/his-majesty-the-worm/devlog/228706/form-fillable-character-sheet

There are two tabs (Character Compendium and Resources), each with two pages. They are organised in a way that makes it easier to play in-game.

## Character Compendium

This tab contains two pages - a Cheat Sheet with a summary of key rules and the Character Compendium with things like Name, Kith/Kin, attribute scores, Quest, Motifs, Bonds, and Languages.  
> Note the Kith and Kin selection has some automation built in to populate the correct values - including the specific Kin Talent on the next page.

## Resources

The tab also contains two pages - Character Resources and Supply Resources.

### Character Resources 

This page contains the various status checkboxes (Stressed, Staggered, Injured, and Death's Door).  It also contains the Resolve and Lore checkboxes.

The Path Talents section can be automatically filled with the path talents by clicking one of the buttons (Swords, Cups, Pentacles, Wands) - this will fill all seven path-specific talents into the sheet.  Note that you can click the arrow next to each line to expand and see the full description.

there is a section for the Kin Arete Talent but it currently is not populated with the "base" Kin Talent (no one has gotten that far yet). The rest of this page contains the Animal Companion details and the unspent experience points.

### Supply Resources 

This sections contains the main inventory management area - including the Armor, Hands, and Light slots with the Notch/Flicker checkboxes.  Note that these are tri-state checkboxes - so you can mark light armor (for example) as only having one available notch by setting the final two checkbox with the "X" symbol.

The belt and pack slots fill out the rest of the page.


## Cards in two ways
Note, that you will still need to create two decks to actually play His Majesty the Worm within roll20.  There is not an easy way to share decks for non pro players - but the setup is fairly straightforward.

### Build a Deck:

For building a deck in game using the Deck tools, the Rider Tarot card images are available on Wikipedia - if you need any help getting things setup please ping Xaak on Discord: @xaak/690338223703982081

### Build rollable tables with a macro:


1. For for both pro and free Roll20 users make a new macro under the collection tab then paste the following in its respective boxes, and check the make visible to "all players" and "DM" boxes.

Name: 
Tarot-Draw

Macro:
```
?{Which deck are you drawing from?|
Major Arcana,&{template:default&#125; {{name=Major Arcana Draw&#125;&#125; {{Card=[[1t[Major-Arcana]]]&#125;&#125; {{Orientation=[[1t[Orientation]]]&#125;&#125; |
Minor Arcana,&{template:default&#125; {{name=Minor Arcana Draw&#125;&#125; {{Card=[[1t[Minor-Arcana]]]&#125;&#125;
}
```

2. In the same collection tab, select +add next to rollable tables
3. for manual input, add all below as a +Add Item all with a weight of 1. for the minor cards repeat this for each suit in a new table
Major Arcana
```
0 - The Fool
I - The Magician
II - The High Priestess
III - The Empress
IV - The Emperor
V - The Hierophant
VI - The Lovers
VII - The Chariot
VIII - Strength
IX - The Hermit
X - Wheel of Fortune
XI - Justice
XII - The Hanged Man
XIII - Death
XIV - Temperance
XV - The Devil
XVI - The Tower
XVII - The Star
XVIII - The Moon
XIX - The Sun
XX - Judgement
XXI - The World
```
Minor Arcana
```
Ace of Wands
Two of Wands
Three of Wands
Four of Wands
Five of Wands
Six of Wands
Seven of Wands
Eight of Wands
Nine of Wands
Ten of Wands
Page of Wands
Knight of Wands
Queen of Wands
King of Wands
Ace of Cups
Two of Cups
Three of Cups
Four of Cups
Five of Cups
Six of Cups
Seven of Cups
Eight of Cups
Nine of Cups
Ten of Cups
Page of Cups
Knight of Cups
Queen of Cups
King of Cups
Ace of Swords
Two of Swords
Three of Swords
Four of Swords
Five of Swords
Six of Swords
Seven of Swords
Eight of Swords
Nine of Swords
Ten of Swords
Page of Swords
Knight of Swords
Queen of Swords
King of Swords
Ace of Pentacles
Two of Pentacles
Three of Pentacles
Four of Pentacles
Five of Pentacles
Six of Pentacles
Seven of Pentacles
Eight of Pentacles
Nine of Pentacles
Ten of Pentacles
Page of Pentacles
Knight of Pentacles
Queen of Pentacles
King of Pentacles
```
For optional card orientation, create a rollable table Called Orientation with two items: Upright and Inverted.

For Pro users, go into the Mod(API) Scripts under options and add TableExport from the dropdown list, then in the game chat box paste the appropriate sections. this will directly import the tables into your game!
```
!import-table --Major-Arcana --show
!import-table-item --Major-Arcana --0 - The Fool --1 --
!import-table-item --Major-Arcana --I - The Magician --1 --
!import-table-item --Major-Arcana --II - The High Priestess --1 --
!import-table-item --Major-Arcana --III - The Empress --1 --
!import-table-item --Major-Arcana --IV - The Emperor --1 --
!import-table-item --Major-Arcana --V - The Hierophant --1 --
!import-table-item --Major-Arcana --VI - The Lovers --1 --
!import-table-item --Major-Arcana --VII - The Chariot --1 --
!import-table-item --Major-Arcana --VIII - Strength --1 --
!import-table-item --Major-Arcana --IX - The Hermit --1 --
!import-table-item --Major-Arcana --X - Wheel of Fortune --1 --
!import-table-item --Major-Arcana --XI - Justice --1 --
!import-table-item --Major-Arcana --XII - The Hanged Man --1 --
!import-table-item --Major-Arcana --XIII - Death --1 --
!import-table-item --Major-Arcana --XIV - Temperance --1 --
!import-table-item --Major-Arcana --XV - The Devil --1 --
!import-table-item --Major-Arcana --XVI - The Tower --1 --
!import-table-item --Major-Arcana --XVII - The Star --1 --
!import-table-item --Major-Arcana --XVIII - The Moon --1 --
!import-table-item --Major-Arcana --XIX - The Sun --1 --
!import-table-item --Major-Arcana --XX - Judgement --1 --
!import-table-item --Major-Arcana --XXI - The World --1 --
```
For Orientation
```
!import-table --Orientation --show
!import-table-item --Orientation --Upright --1 --
!import-table-item --Orientation --Inverted --1 --
```
For Minor Arcana Import, copy and paste below just like above.

```
!import-table --Minor-Arcana --show
!import-table-item --Minor-Arcana --Ace of Wands --1 --
!import-table-item --Minor-Arcana --Two of Wands --1 --
!import-table-item --Minor-Arcana --Three of Wands --1 --
!import-table-item --Minor-Arcana --Four of Wands --1 --
!import-table-item --Minor-Arcana --Five of Wands --1 --
!import-table-item --Minor-Arcana --Six of Wands --1 --
!import-table-item --Minor-Arcana --Seven of Wands --1 --
!import-table-item --Minor-Arcana --Eight of Wands --1 --
!import-table-item --Minor-Arcana --Nine of Wands --1 --
!import-table-item --Minor-Arcana --Ten of Wands --1 --
!import-table-item --Minor-Arcana --Page of Wands --1 --
!import-table-item --Minor-Arcana --Knight of Wands --1 --
!import-table-item --Minor-Arcana --Queen of Wands --1 --
!import-table-item --Minor-Arcana --King of Wands --1 --
!import-table-item --Minor-Arcana --Ace of Cups --1 --
!import-table-item --Minor-Arcana --Two of Cups --1 --
!import-table-item --Minor-Arcana --Three of Cups --1 --
!import-table-item --Minor-Arcana --Four of Cups --1 --
!import-table-item --Minor-Arcana --Five of Cups --1 --
!import-table-item --Minor-Arcana --Six of Cups --1 --
!import-table-item --Minor-Arcana --Seven of Cups --1 --
!import-table-item --Minor-Arcana --Eight of Cups --1 --
!import-table-item --Minor-Arcana --Nine of Cups --1 --
!import-table-item --Minor-Arcana --Ten of Cups --1 --
!import-table-item --Minor-Arcana --Page of Cups --1 --
!import-table-item --Minor-Arcana --Knight of Cups --1 --
!import-table-item --Minor-Arcana --Queen of Cups --1 --
!import-table-item --Minor-Arcana --King of Cups --1 --
!import-table-item --Minor-Arcana --Ace of Swords --1 --
!import-table-item --Minor-Arcana --Two of Swords --1 --
!import-table-item --Minor-Arcana --Three of Swords --1 --
!import-table-item --Minor-Arcana --Four of Swords --1 --
!import-table-item --Minor-Arcana --Five of Swords --1 --
!import-table-item --Minor-Arcana --Six of Swords --1 --
!import-table-item --Minor-Arcana --Seven of Swords --1 --
!import-table-item --Minor-Arcana --Eight of Swords --1 --
!import-table-item --Minor-Arcana --Nine of Swords --1 --
!import-table-item --Minor-Arcana --Ten of Swords --1 --
!import-table-item --Minor-Arcana --Page of Swords --1 --
!import-table-item --Minor-Arcana --Knight of Swords --1 --
!import-table-item --Minor-Arcana --Queen of Swords --1 --
!import-table-item --Minor-Arcana --King of Swords --1 --
!import-table-item --Minor-Arcana --Ace of Pentacles --1 --
!import-table-item --Minor-Arcana --Two of Pentacles --1 --
!import-table-item --Minor-Arcana --Three of Pentacles --1 --
!import-table-item --Minor-Arcana --Four of Pentacles --1 --
!import-table-item --Minor-Arcana --Five of Pentacles --1 --
!import-table-item --Minor-Arcana --Six of Pentacles --1 --
!import-table-item --Minor-Arcana --Seven of Pentacles --1 --
!import-table-item --Minor-Arcana --Eight of Pentacles --1 --
!import-table-item --Minor-Arcana --Nine of Pentacles --1 --
!import-table-item --Minor-Arcana --Ten of Pentacles --1 --
!import-table-item --Minor-Arcana --Page of Pentacles --1 --
!import-table-item --Minor-Arcana --Knight of Pentacles --1 --
!import-table-item --Minor-Arcana --Queen of Pentacles --1 --
!import-table-item --Minor-Arcana --King of Pentacles --1 --
```

# MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
