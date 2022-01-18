Backlog
=======


02.00.00 (many thanks to @dwarfwing for joining the dev and contributing his great 2e sheet!!)
========

- integrate roll parsing to get rid of custom roll tables.
- integration of armour qualities in the layout (cunning make and close fitting)
- favoured/ill-favoured rolls for adversaries
- integrate roll-templates 
- numerous layout optimizations and UI improvments

01.01.00
========

- (done) optimize favoured rolls using sheet workers (currently the roll includes an ugly binary switche that is not easy to read for players)

01.00.00
========

Character Sheet

- (done) rewrite with grid layout
- (done) readd attributes: name, age
- (reject) add attributes: weaponlist 5-6
- (done) add canvas toggle for notes
- (done) add active toggles for stance
- (done) add favoured rolls for valour and wisdom
- (mostly done) check and complete all translation attributes
- (done) add damage bonus on stance (e.g. great strength of beornings)
- (done) make tooltips work again
- (done) forward stance attack roll + 1
- (done) mark totalparry, protection and load as readonly (they are calculated by sheetworkers)

Adversary Sheet

- (done) initial version
- (done) correct layout to common style
- (done) implement attack and protection rolls

Technical:

- (done) reimplement sheet workers to a universal version (without copy and paste) 
- (done) migration for the treasure attribute
- (done) update sheet.jpg