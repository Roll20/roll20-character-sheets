# Heroclix Roll20 Character Sheet

**The Character Sheet / Map Visibility**

The biggest problem with playing Heroclix on Roll20 is the lack of visibilty into the figures on map. You can have the dials open on HCRealms and check, but that current method makes it easy to miss changes in click on figures and hard to keep track of which of multiple of the same figure is on which click. The goal of this extension is to allow the dials to displayed on map in Roll20 to prevent those kinds of mistakes from happening and to make Roll20 play a little smoother. Once it's set up your character will look like this:

![First Image](Documentation/Final%20product.PNG)

The dial is above the figure and can be clicked by changing the value in the green bubble that appears when the figure is clicked.

**Creating A New Figure**

In order to use this sheet you must select it from the character sheet dropdown that shows up when creating a game or in the settings page of an existing game. Once you are in a game that uses the sheet you must first add a character in the journal:

![First Image](Documentation/Create%20Character.png)

One the character has been created click save changes and go to the character sheet tab, it should look like this:

![First Image](Documentation/Character%20Sheet.png)

To fill in the character sheet manually just click the add button to add a new click and then enter the character's stats on that click. In order to load a character intro the sheet automatically go to hcrealms, and find the character you want to load in in the units section. click the dial button on the top right of the chracter dial, as shown below:

![First Image](Documentation/HCRealms%20DialCode%20Link.png)

Once on the Inline dial page copy the contents of the BBcode box, as shown below, and return to the character sheet:

![First Image](Documentation/HCRealms%20BBCode.png)

Paste the BBcode into the dial box on the character sheet and click the populate button

![First Image](Documentation/Character%20Sheet%20BBCode.png)

![First Image](Documentation/Character%20Sheet%20Populate.png)

The result should look like this:

![First Image](Documentation/Populated%20Character%20Sheet.png)

**Adding the Token and Dial to the Map**

Once your character sheet is populated, whether manually or automatically you have to add the image to the map and relate it to the character sheet so that the dial can appear on map. To get started click the settings button that appears when you click on the image, as shown below:

![First Image](Documentation/Token%20Settings.png)

Then relate the first bar to Clicks, the second to attack_current and the third to damage_current. If you aren't using an image of the actual character I reccomend using an image of a black square so that the bars show better on map and moving the bars to bottom overlapping in the advanced tab. Also check show nameplate if not using an actual image of the character. When you are done filling in the setting spage it should look like this:

![First Image](Documentation/Filled%20Token%20Settings.png)

To change clicks change the value in the green bubble when clicking on the character as shown below. Your final result should look like this:

![First Image](Documentation/Filled%20Token%20On%20Map.png)

**Using a Beta version of the sheet or developing new features**

In order to use this character sheet for development you must first have access to a game using this character sheet. In order to gain access to a roll20 game that uses this you must have a Roll20 Pro membership which allows you to use custom sheets and put the HTMl and CSS for this sheet into the settings page.
