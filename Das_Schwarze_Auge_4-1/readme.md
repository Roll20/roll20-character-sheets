# Das Schwarze Auge 4.1 Character Sheet
Character sheet for the German system "Das Schwarze Auge" (The Dark Eye) version 4.1. If you are new to the system, you might prefer the most recent version 5.

## Known/Open Issues
For a quite up-to-date list of known issues (and for posting issues), please take a look at the fork of GitHub user "kreuvf":
https://github.com/kreuvf/roll20-character-sheets/issues

## Implementation Notes
These notes contain some of the thoughts behind certain design decisions. They are not complete, but a beginning.

### Character Advancement
There will not be any character advancement, use [Heldensoftware](http://www.helden-software.de/) for this.

### Advantages and Disadvantages
#### Swift ("Flink")
The following effects are not implemented and there are reasons to not implement them ever:
* Battle Reflexes ("Kampfreflexe") is not a prerequisite to get Blade Storm/Wall ("Klingensturm/wand").
* Charge ("Ausfall") does not require a minimum constitution (KO).

Reason: As prerequisites for special skills are not checked by the sheet this will also have no effect.

#### Short Stature ("Kleinwüchsig")
The following effect is not implemented, but may be implemented in the future:
* Non-spear weapons longer than 1.5 m get AT/PA -3 and TP -2.

The following effects are not implemented and there are reasons to no implement them ever:
* Weapons with several distance classes are only allowed to be used in the shorter distance class.
* Encumbrance (BE) of "large" armours increase by 1.
* Hitting an average-sized opponents head is modified by +1, hitting the legs is modified by -1.

Reason: Battle would require an overhaul that a) is not worth the effort (all sheets of all battling parties would require to track certain states and be aware of the other parties) and b) would require battles to use fully set up tokens.

#### Dwarven Stature ("Zwergenwuchs")
The following effects are not implemented, but may be implemented in the future:
* Non-dagger non-spear weapons not made for dwarves get AT/PA/TP -1.
* Non-spear weapons longer than 1.3 m (even shorter than with Short Stature!) get AT/PA -3 and TP -2.

The following effects are not implemented and there are reasons to no implement them ever:
* Weapons with several distance classes are only allowed to be used in the shorter distance class.
* Encumbrance (BE) of "large" armours increase by 1.
* AP costs for High Kick ("hoher Tritt"), Jump ("Sprung"), Jump Kick ("Sprungtritt") are increased to five times the normal cost. This does not apply if they are part of a melee style ("Kampfstil").
* AP costs for ??? ("Fußfeger") are reduced to half the normal cost.
* Hitting an average-sized opponents head is modified by +2, hitting the legs is modified by -2.

Reason: Battle would require an overhaul that a) is not worth the effort (all sheets of all battling parties would require to track certain states and be aware of the other parties) and b) would require battles to use fully set up tokens. AP costs are only relevant for character advancement (see "Character Advancement").

#### Combination of Short Stature and Dwarven Stature
* The implemented effects are applied independently of each other.

