on("ready", function(obj) {

  var town_events = [
  {
    "Weight":147,
    "Name":"Archaeological Find",
    "Type":"Kingdom",
    "Description":"A well-preserved ruin is found in your kingdom, with historical artifacts connected to the people who lived in your land long ago. Effect: Lore +1. If you have a Museum, the discoverers donate 10,000 gp worth of historical artifacts to its collection (if you have multiple Museums, choose one as the recipient)."
  },
  {
    "Weight":125,
    "Name":"Assassination Attempt ",
    "Type":"Kingdom",
    "Description":"One of your leaders (determined randomly) is the target of an assassination attempt. If the target is a PC, the GM should run the attempt as an encounter, using an assassin of a CR equal to the targeted PC's level. If the target is an NPC, you must succeed at a Stability check to prevent the assassination. If the assassination occurs, Unrest increases by 1d6 and the kingdom immediately incurs the penalties for not having a leader in that role."
  },
  {
    "Weight":325,
    "Name":"Bandit Activity ",
    "Type":"Kingdom",
    "Description":"Bandits are preying upon those who travel through your kingdom. Attempt a Stability check. If you succeed, your kingdom's defenses stop the bandits before they cause any harm. If you fail, the bandits reduce your kingdom's Treasury by 1d6 BP (each time you roll a 6, add the result to the total and roll again)."
  },
  {
    "Weight":1,
    "Name":"Bandit Activity & Roll Again",
    "Type":"Kingdom",
    "Description":"Bandits are preying upon those who travel through your kingdom. Attempt a Stability check. If you succeed, your kingdom's defenses stop the bandits before they cause any harm. If you fail, the bandits reduce your kingdom's Treasury by 1d6 BP (each time you roll a 6, add the result to the total and roll again)."
  },
  {
    "Weight":350,
    "Name":"Boomtown",
    "Type":"Settlement",
    "Description":"Randomly select one settlement. Commerce booms among that settlement. Until the next Event Phase, Economy increases by the number of buildings in the settlement that grant an Economy bonus, and Corruption increases by 1d4 in that settlement."
  },
  {
    "Weight":158,
    "Name":"Building Demand (Build)",
    "Type":"Settlement",
    "Description":"The citizens demand a particular building be built. Select the building type randomly from those available for the settlement. If the demand is not met by the next Event Phase, Unrest increases by 1. Alternatively, you can suppress the citizens' demands and negate the event by succeeding at a Loyalty check, but this reduces Loyalty by 2 and increases Unrest by 1."
  },
  {
    "Weight":52,
    "Name":"Building Demand (Demolish)",
    "Type":"Settlement",
    "Description":"The citizens demand a particular building be demolished. Select the building type randomly from those available for the settlement. If the demand is not met by the next Event Phase, Unrest increases by 1. Alternatively, you can suppress the citizens' demands and negate the event by succeeding at a Loyalty check, but this reduces Loyalty by 2 and increases Unrest by 1."
  },
  {
    "Weight":147,
    "Name":"Crop Failure",
    "Type":"Settlement",
    "Description":"Pests, blight, and weather ruin the harvest in the settlement's hex and all adjacent hexes. Attempt two Stability checks. If both succeed, the problem is fixed before your kingdom takes any penalties from the event. If only one succeeds, affected farms reduce Consumption by 1 (instead of the normal reduction) in the next Upkeep Phase. If neither succeeds, affected farms do not reduce Consumption at all in the next Upkeep Phase."
  },
  {
    "Weight":168,
    "Name":"Cult Activity",
    "Type":"Settlement",
    "Description":"A religious cult of an alignment opposed to the kingdom's alignment begins kidnapping, converting, or even publicly sacrificing citizens. Attempt a Loyalty check and a Stability check. If both succeed, the cult is disbanded before your kingdom takes any penalties from the event. For each of these checks you fail, Unrest increases by 1 and Productivity, Society, and Stability decrease by 1. If both checks fail, the event continues in the next Event Phase."
  },
  {
    "Weight":105,
    "Name":"Diplomatic Overture",
    "Type":"Kingdom",
    "Description":"A nearby kingdom sends an ambassador to you to negotiate an embassy (01–60), treaty (61–90), or alliance (91–100), as if using a diplomatic edict (see Special Edicts). If the GM doesn't have an appropriate kingdom in mind when this event occurs, determine the kingdom's alignment randomly; it may be hostile or friendly. The ambassador bears 1d4 BP worth of gifts for your kingdom."
  },
  {
    "Weight":168,
    "Name":"Discovery",
    "Type":"Kingdom",
    "Description":"Scholars unearth a bit of ancient lore or devise important new research of their own. Fame increases by 1 and Lore increases by 1d4."
  },
  {
    "Weight":300,
    "Name":"Discovery",
    "Type":"Settlement",
    "Description":"Scholars unearth a bit of ancient lore or devise important new research of their own. Fame increases by 1 and Lore increases by 1d4."
  },
  {
    "Weight":168,
    "Name":"Drug Den",
    "Type":"Settlement",
    "Description":"One of your Houses or Tenements becomes a hive of illicit drug trade. Attempt a Loyalty check and a Stability check, with a penalty equal to the number of Brothels, Tenements, Waterfronts, and lots with squatters in the settlement. If you succeed at both checks, you eliminate the drug den before your kingdom takes any penalties from the event. If you fail at one check, Crime and Unrest increase by 1. If you fail at both checks, Crime and Unrest increase by 1; Economy, Loyalty, and Stability decrease by 1; and on the next Event Phase, a second drug den event occurs in the same settlement (01–50) or the nearest settlement (51–100)."
  },
  {
    "Weight":231,
    "Name":"Economic Boom",
    "Type":"Kingdom",
    "Description":"Trade is booming in your kingdom! Your Treasury increases by 1d6 BP (each time you roll a 6, add the result to the total and roll again)."
  },
  {
    "Weight":168,
    "Name":"Festive Invitation",
    "Type":"Kingdom",
    "Description":"Your kingdom's leaders are invited to a festival in a neighboring kingdom. If you attend and bring 1d4 BP worth of gifts, for 1 year Society increases by 1, Fame increases by 1 for any check relating to that kingdom, and you gain a +2 bonus on edict checks relating to that kingdom."
  },
  {
    "Weight":250,
    "Name":"Feud",
    "Type":"Kingdom",
    "Description":"Nobles (or other influential rival groups) are bickering. Attempt a Loyalty check. If you succeed, you end the event but Unrest increases by 1. If you fail, Corruption increases by 1, Unrest increases by 1d6, and the event is continuous."
  },
  {
    "Weight":168,
    "Name":"Feud",
    "Type":"Settlement",
    "Description":"Nobles (or other influential rival groups) are bickering. Attempt a Loyalty check. If you succeed, you end the event but Unrest increases by 1. If you fail, Corruption increases by 1, Unrest increases by 1d6, and the event is continuous."
  },
  {
    "Weight":325,
    "Name":"Food Shortage",
    "Type":"Kingdom",
    "Description":"Spoilage, treachery, or bad luck has caused a food shortage this turn. Attempt a Stability check. If you succeed, Consumption in the next Upkeep Phase increases by 50%. If you fail, Consumption in the next Upkeep Phase increases by 100%."
  },
  {
    "Weight":294,
    "Name":"Food Surplus",
    "Type":"Kingdom",
    "Description":"Farmers produce an unexpected windfall! In the nextUpkeep Phase, the kingdom's Consumption is halved (but returns to normal on the next turn)."
  },
  {
    "Weight":273,
    "Name":"Good Weather",
    "Type":"Kingdom",
    "Description":"Good weather raises spirits and productivity. Economy, Loyalty, and Productivity increase by 2 until the next Event Phase."
  },
  {
    "Weight":2,
    "Name":"Good Weather & Roll Again)",
    "Type":"Kingdom",
    "Description":"Good weather raises spirits and productivity. Economy, Loyalty, and Productivity increase by 2 until the next Event Phase."
  },
  {
    "Weight":250,
    "Name":"Improvement Demand",
    "Type":"Kingdom",
    "Description":"This event is identical to the building demand event, but the citizens want the construction or destruction of a terrain improvement in the hex."
  },
  {
    "Weight":200,
    "Name":"Inquisition",
    "Type":"Kingdom",
    "Description":"Zealots mobilize public opinion against a particular race, religion, kingdom, behavior, or kingdom leader. Attempt a Loyalty check. If you fail, the zealots run rampant; Infamy and Law increase by 1 and Lore, Loyalty, Productivity, and Stability decrease by 2. If you succeed, the zealots are somewhat suppressed; Lore, Loyalty, Productivity, and Stability decrease by 1. Two successful checks in a row end the event (if a check ends the event, no penalties from it occur that turn)."
  },
  {
    "Weight":168,
    "Name":"Inquisition",
    "Type":"Settlement",
    "Description":"Zealots mobilize public opinion against a particular race, religion, kingdom, behavior, or kingdom leader. Attempt a Loyalty check. If you fail, the zealots run rampant; Infamy and Law increase by 1 and Lore, Loyalty, Productivity, and Stability decrease by 2. If you succeed, the zealots are somewhat suppressed; Lore, Loyalty, Productivity, and Stability decrease by 1. Two successful checks in a row end the event (if a check ends the event, no penalties from it occur that turn)."
  },
  {
    "Weight":350,
    "Name":"Justice Prevails",
    "Type":"Settlement",
    "Description":"Authorities shut down a major criminal operation or thwart a plot against the settlement. Law and Loyalty increase by 1 and Crime and Unrest decreases by 1."
  },
  {
    "Weight":189,
    "Name":"Land Rush",
    "Type":"Kingdom",
    "Description":"Overeager settlers claim an unclaimed hex and construct a Farm, Mine, Quarry, or Sawmill at their own expense, but are fighting over ownership. This hex is not part of your kingdom, so you gain no benefits from it. Productivity, Society, and Stability decrease by 1. Attempt a Loyalty check. If you succeed, Unrest increases by 1. If you fail, Unrest increases by 1d4. If you construct an identical improvement in an adjacent hex during your next Edict Phase, remove this event's changes to Productivity, Society, and Stability."
  },
  {
    "Weight":125,
    "Name":"Large Disaster ",
    "Type":"Kingdom",
    "Description":" A fire, storm, earthquake, flood, massive sabotage, or other disaster strikes! Roll 1d6; on a result of 1–5, the disaster threatens only 1 improved hex. On a result of 6, the disaster is widespread and threatens 1d6 additional improved hexes adjacent to the target hex. Attempt a Stability check for each threatened hex; failure means the disaster destroys one terrain improvement in the hex and Unrest increases by 1. (This Stability check represents your kingdom's ability to prepare for or react to the disaster as well as the structure's ability to withstand damage.)"
  },
  {
    "Weight":105,
    "Name":"Localized Disaster",
    "Type":"Settlement",
    "Description":"A fire, a flood, a storm, an earthquake, massive sabotage, or another disaster strikes the settlement! Roll 1d6 to determine how many lots are threatened by the disaster. On a result of 6, the disaster is widespread and affects 1d6 additional adjacent lots. Attempt a Stability check for each threatened lot; failure means the disaster destroys the building in that lot and Unrest increases by 1. (This Stability check represents your kingdom's ability to prepare for or react to the disaster as well as the structure's ability to withstand damage.)"
  },
  {
    "Weight":300,
    "Name":"Monster Attack",
    "Type":"Kingdom",
    "Description":"A monster (or group of monsters) attacks the kingdom. The GM picks a claimed hex in the kingdom in which the monster is active. The CR of the monster encounter is equal to the party's APL + 1d4 – 1. You can personally deal with the monster (earning XP and treasure normally for your efforts) or succeed at a Stability check to eliminate it (which doesn't affect you or the kingdom's statistics). If the monster is not defeated this turn, Unrest increases by 4. If the kingdom's Unrest is 5 or higher, the monster's hex becomes unclaimed—this is in addition to losing control of hexes in the Upkeep Phase because of the kingdom's high Unrest score."
  },
  {
    "Weight":147,
    "Name":"Monster Attack",
    "Type":"Settlement",
    "Description":"A monster (or group of monsters) attacks the kingdom. The GM picks a claimed hex in the kingdom in which the monster is active. The CR of the monster encounter is equal to the party's APL + 1d4 – 1. You can personally deal with the monster (earning XP and treasure normally for your efforts) or succeed at a Stability check to eliminate it (which doesn't affect you or the kingdom's statistics). If the monster is not defeated this turn, Unrest increases by 4. If the kingdom's Unrest is 5 or higher, the monster's hex becomes unclaimed—this is in addition to losing control of hexes in the Upkeep Phase because of the kingdom's high Unrest score."
  },
  {
    "Weight":1,
    "Name":"Monster Attack & Roll Again",
    "Type":"Kingdom",
    "Description":"A monster (or group of monsters) attacks the kingdom. The GM picks a claimed hex in the kingdom in which the monster is active. The CR of the monster encounter is equal to the party's APL + 1d4 – 1. You can personally deal with the monster (earning XP and treasure normally for your efforts) or succeed at a Stability check to eliminate it (which doesn't affect you or the kingdom's statistics). If the monster is not defeated this turn, Unrest increases by 4. If the kingdom's Unrest is 5 or higher, the monster's hex becomes unclaimed—this is in addition to losing control of hexes in the Upkeep Phase because of the kingdom's high Unrest score."
  },
  {
    "Weight":210,
    "Name":"Natural Blessing",
    "Type":"Kingdom",
    "Description":"A natural event, such as a bloom of rare and beautiful wildflowers or a good omen in the stars, raises your kingdom's morale. You gain a +4 bonus on Stability checks until the next Event Phase."
  },
  {
    "Weight":2,
    "Name":"Natural Blessing & Roll Again",
    "Type":"Kingdom",
    "Description":"A natural event, such as a bloom of rare and beautiful wildflowers or a good omen in the stars, raises your kingdom's morale. You gain a +4 bonus on Stability checks until the next Event Phase."
  },
  {
    "Weight":105,
    "Name":"New Subjects",
    "Type":"Kingdom",
    "Description":"A small group of indigenous intelligent creatures joins your kingdom and submits to your rule. Society and Stability increase by 1, Unrest decreases by 1, and your Treasury increases by 1d6 BP (each time you roll a 6, add the result to the total and roll again)."
  },
  {
    "Weight":150,
    "Name":"Noblesse Oblige",
    "Type":"Settlement",
    "Description":"A noble family offers to construct aMonument (01–50) or Park (51–100) in your settlement at the family's own expense. The nobles pay all costs and Consumption for this purpose."
  },
  {
    "Weight":300,
    "Name":"Outstanding Success",
    "Type":"Settlement",
    "Description":"One of your kingdom's citizens creates an artistic masterpiece, constructs a particularly impressive building, or otherwise brings glory to your kingdom. Fame increases by 1, your Treasury increases by 1d6 BP, and Unrest decreases by 2. You gain a +4 bonus on Economy checks until the next Event Phase."
  },
  {
    "Weight":200,
    "Name":"Pilgrimage",
    "Type":"Settlement",
    "Description":"Randomly select one settlement with aCathedral, Shrine, or Temple. Pious religious folk journey to your settlement, holding a religious festival in that settlement at no BP cost to you."
  },
  {
    "Weight":200,
    "Name":"Plague",
    "Type":"Kingdom",
    "Description":"A deadly sickness strikes the target hex or settlement. You cannot construct terrain improvements or buildings there while plague persists. Attempt two Stability checks, each with a penalty equal to the number of Brothels, Foreign Quarters,Highways, Inns, Piers, Roads, Stables, Stockyards, Tenements, and Waterfronts in the hex, and a bonus equal to the number of ss,Cathedrals, Herbalists, Hospitals, and Temples in the hex. If you succeed at both checks, the event ends, but Stability decreases by 2 and Treasury by 1d3 BP. If you fail at one check, Stability decreases by 4, Treasury decreases by 1d6 BP, and Unrest increases by 1d3. If you fail at both, Stability decreases by 4, Treasury decreases by 1d6 BP, Unrest increases by 1d6, and in the next Event Phase the plague spreads to an adjacent hex."
  },
  {
    "Weight":105,
    "Name":"Plague",
    "Type":"Settlement",
    "Description":"A deadly sickness strikes the target hex or settlement. You cannot construct terrain improvements or buildings there while plague persists. Attempt two Stability checks, each with a penalty equal to the number of Brothels, Foreign Quarters,Highways, Inns, Piers, Roads, Stables, Stockyards, Tenements, and Waterfronts in the hex, and a bonus equal to the number of ss,Cathedrals, Herbalists, Hospitals, and Temples in the hex. If you succeed at both checks, the event ends, but Stability decreases by 2 and Treasury by 1d3 BP. If you fail at one check, Stability decreases by 4, Treasury decreases by 1d6 BP, and Unrest increases by 1d3. If you fail at both, Stability decreases by 4, Treasury decreases by 1d6 BP, Unrest increases by 1d6, and in the next Event Phase the plague spreads to an adjacent hex."
  },
  {
    "Weight":210,
    "Name":"Political Calm",
    "Type":"Kingdom",
    "Description":"A sudden absence of political machinations coincides with an increase in public approval. Unrest decreases by 1d6. Until the next Event Phase, you gain a +2 bonus on checks to resolve continuous events. If your kingdom has no Unrest and no continuous events, both Loyalty and Stability increase by 1. If you are using Law settlement modifiers for the kingdom (see Expanding Settlement Modifiers), this also increases Law by 1 for the entire kingdom."
  },
  {
    "Weight":200,
    "Name":"Public Scandal",
    "Type":"Kingdom",
    "Description":"One of your leaders is implicated in a crime or an embarrassing situation, such as an affair with another leader's spouse. Infamy increases by 1. Attempt a Loyalty check. If you fail, Unrest increases by 2 and you take a –4 penalty on all Loyalty checks until the next Event Phase."
  },
  {
    "Weight":150,
    "Name":"Remarkable Treasure",
    "Type":"Settlement",
    "Description":"The settlement immediately fills one of its open magic item slots (selected randomly) with a better than normal item (medium if a minor slot, major if a medium slot). Treat the settlement's base value as 50% higher than normal for determining the item's maximum price. If the settlement doesn't have any open magic item slots, treat this event as Unexpected Find."
  },
  {
    "Weight":168,
    "Name":"Sensational Crime",
    "Type":"Settlement",
    "Description":"A serial killer, arsonist, or daring bandit plagues your kingdom. Attempt two Stability checks, adding the settlement's Law and subtracting its Crime. If you succeed at both checks, the criminal is caught before your kingdom takes any penalties from the event. If you fail at one, the criminal escapes, Unrest increases by 1, and the event is continuous. If you fail at both, the criminal makes a fool of the authorities; Law and Loyalty decrease by 1, Treasury decreases by 1d4 BP, Unrest increases by 2, and the event is continuous."
  },
  {
    "Weight":126,
    "Name":"Slavers",
    "Type":"Settlement",
    "Description":"Criminals begin kidnapping citizens and selling them into slavery. Attempt a Loyalty check and a Stability check, each with a penalty equal to the number of Brothels, Tenements, Waterfronts, and lots with squatters in the settlement. If you succeed at both checks, the slavers are caught before your kingdom takes any penalties from the event. If you fail at one of the checks, Loyalty, Stability, and Unrest decrease by 1, but the event is not continuous. If you fail at both checks, Loyalty, Stability, and Unrest decrease by 2, and the event is continuous."
  },
  {
    "Weight":200,
    "Name":"Smugglers",
    "Type":"Kingdom",
    "Description":"Unscrupulous merchants are subverting legitimate businesses. Attempt a Loyalty check and a Stability check, each with a penalty equal to the number of Piers, Waterfronts, and trade routes in the kingdom. If you succeed at both checks, the smugglers are stopped before your kingdom takes any penalties from the event. If you fail at one of the checks, Corruption increases by 1d2 in each settlement, Crime increases by 1 for the kingdom (Optional Kingdom Rules), Productivity for the kingdom decreases by 1d3, Treasury decreases by 1d3 BP, and the event is not continuous. If you fail at both of the checks, Corruption increases by 1d4, Crime for the kingdom increases by 1, Productivity for the kingdom decreases by 1d6, Treasury decreases by 1d6 BP, and the event is continuous."
  },
  {
    "Weight":210,
    "Name":"Squatters",
    "Type":"Settlement",
    "Description":"An empty settlement lot is taken over by beggars, troublemakers, and people unable to find adequate work or housing; they camp there with tents, wagons, and shanties. You cannot use the lot for anything until the squatters are dispersed. Fame and Stability decrease by 1, and Unrest increases by 2. You may try to disperse the squatters with a Stability check. Success means the squatters are dispersed and the event is not continuous, but if a House or Tenement is not built in that lot on the next turn, Infamy increases by 1 and Unrest by 2. Failing the Stability check means the event is continuous, and you may not build on that lot until the event is resolved."
  },
  {
    "Weight":1,
    "Name":"Squatters & Roll Again",
    "Type":"Kingdom",
    "Description":"An empty settlement lot is taken over by beggars, troublemakers, and people unable to find adequate work or housing; they camp there with tents, wagons, and shanties. You cannot use the lot for anything until the squatters are dispersed. Fame and Stability decrease by 1, and Unrest increases by 2. You may try to disperse the squatters with a Stability check. Success means the squatters are dispersed and the event is not continuous, but if a House or Tenement is not built in that lot on the next turn, Infamy increases by 1 and Unrest by 2. Failing the Stability check means the event is continuous, and you may not build on that lot until the event is resolved."
  },
  {
    "Weight":225,
    "Name":"Unexpected Find",
    "Type":"Settlement",
    "Description":"Local citizens discover a forgotten magical item. The settlement gains one temporary minor (01–70) or medium (71–100) magic item slot that is automatically filled in the nextUpkeep Phase. This slot and the item go away if the item is purchased or in the next Event Phase, whichever comes first."
  },
  {
    "Weight":210,
    "Name":"Vandals",
    "Type":"Settlement",
    "Description":"Thugs and dissidents riot and destroy property. Attempt a Loyalty check and a Stability check. If you succeed at both, the vandals are stopped before your kingdom takes any penalties. If you fail at one check, Society decreases by 1 and one random building in the settlement is damaged. If you fail at both, one random building is destroyed (Unrest increases by 1 for each lot of the destroyed building), and 1d3 other random buildings are damaged. a damaged building provides no benefits until half its cost is spent repairing it."
  },
  {
    "Weight":1,
    "Name":"Vandals & Roll Again",
    "Type":"Kingdom",
    "Description":"Thugs and dissidents riot and destroy property. Attempt a Loyalty check and a Stability check. If you succeed at both, the vandals are stopped before your kingdom takes any penalties. If you fail at one check, Society decreases by 1 and one random building in the settlement is damaged. If you fail at both, one random building is destroyed (Unrest increases by 1 for each lot of the destroyed building), and 1d3 other random buildings are damaged. a damaged building provides no benefits until half its cost is spent repairing it."
  },
  {
    "Weight":300,
    "Name":"Visiting Celebrity",
    "Type":"Settlement",
    "Description":"A celebrity from another kingdom visits one of your settlements, causing a sudden influx of other visitors and spending. Fame increases by 1 and Treasury increases by 1d6 BP (each time you roll a 6, add the result to the total and roll again)."
  },
  {
    "Weight":175,
    "Name":"Wealthy Immigrant",
    "Type":"Settlement",
    "Description":"A rich merchant or a noble from another land is impressed with your kingdom and asks to construct a Mansion (01–75) or Noble Villa (76–100) in the settlement at no cost to you. If you allow it, the building provides its normal benefits to your kingdom."
  },
  {
    "Weight":50,
    "Name":"Visiting Diplomats",
    "Type":"Kingdom",
    "Description":"Diplomats from neighboring kingdoms arrive to participate in a fete held in their honor. If the kingdom size is between 3 and 25 hexes, the kingdom rulers can invite one diplomat; between 26 and 50 hexes, two diplomats; 51 and 100 three diplomats; and over 100 hexes, an additional diplomat for every 100 hexes. Whether or not the diplomats show up depends on the relationships between the kingdoms (the GM is encouraged to roleplay this out). You gain a +2 bonus on Economy checks for every diplomat that shows up to the fete until your next event phase."
  },
  {
    "Weight":75,
    "Name":"Foreign Spy",
    "Type":"Kingdom",
    "Description":"A spy from a foreign kingdom is discovered trying to find out the kingdom’s weaknesses. Increase Unrest by 1."
  },
  {
    "Weight":75,
    "Name":"Entertainers Troupe",
    "Type":"Settlement",
    "Description":"A traveling circus or entertainers’ troupe from a neighboring kingdom visits your realm. You gain 1d4 BP and a +4 bonus on Stability checks until your next Event phase. Reduce your Unrest by 2."
  }
];
	var targetTokens = findObjs({
        name: "Town-Event",
        _type: "rollabletable"
    })
    
    log(targetTokens);
    
    if(targetTokens.length ==0 ){
        log("none found");
        
        var eventTable = createObj('rollabletable',{name: "Town-Event"});
        
        for(var i = 0; i < town_events.length; i++) {
			var event = createObj('tableitem',{
				_rollabletableid: eventTable.id,
				name: town_events[i].Name+"\n ("+town_events[i].Type+") - \n"+town_events[i].Description,
				weight: town_events[i].Weight
			});
			log(town_events[i]);
		}
        return;
    }
    else{
        log("found!");
        return;
    }
});