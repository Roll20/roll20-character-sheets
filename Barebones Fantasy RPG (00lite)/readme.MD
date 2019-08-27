This is a character sheet for the **Barebones Fantasy Roleplaying Game** by DwD Studios.  It includes all the fields of the base game's character sheet, plus the additional *Artificer* skill added in Flesh & Blood.
Fields that Autocalculate:
Max BP
All Skill scores

The INIT button will roll initiative but **WILL NOT** add it to the tracker automatically as the roll20 engine requires a token to be selected to add to the tracker.  For this reason I recommend creating a macro like the following that will automatically roll initiative and add it to Roll20's tracker.  It should be set as a token action and visible to All Players:

>&{template:default} {{name=Initiative}} {{Result=[[@{selected|init}d10k1 &{tracker}]]}}

If your group has a Leader in it, a second macro for *Tactics* (INIT +1) made as follows provided the smoothest game experience at the table.  It should also be set as a token action visible to All Players.

>&{template:default} {{name=Initiative}} {{Result=[[(@{selected|init}+1)d10k1 &{tracker}]]}}

All other fields have been given sensible defaults, mins and maxes that should allow you to get up and running with a minimum of fuss.  One thing to note is that the sheet **DOES NOT** currently track bonus damage due to a high strength or dex, that will still need to be added manually.  It is my plan to make that part of the next release.

If the sheet provides you with any problems or you would like to request changes, feel free to reach out to me.
E-mail: linuxfreak1030@gmail.com
Google+ (https://plus.google.com/u/0/109067158712998764793)