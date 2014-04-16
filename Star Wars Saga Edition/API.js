/* Automatically create the character sheet when a new character journal is added.
* Default min / max of attributes may be adjusted below.
* Updated 4/10/2014 to pre-fill the Journal with the attributes used in the Character Sheet for better organization.
* Updated 3/30/2014 including arrays and for the most part cleaning up the code in the process. Now to add attributes and
* abilities just include them in the order in which the should appear on the sheet.
*
*
* Thanks to Jarod for assisting in getting the arrays to work.
*/
 
 
// Change the values for the following attributes to meet the standards in your game.
// You can also remove any fields you don't wish to be automatically created.
 
 
var attr = [ // Attributes
    { name: "HP", current: 0, max: 0 },
    { name: "CT", current: 0, max: ""},
    { name: "Level", current: 0, max: "[[floor(@{level}/2)]]"},
    { name: "BAB", current: 0, max:  ""},
    { name: "FP", current: 5, max: 5 },
    { name: "DP", current: 0, max: "" },
    { name: "DarkSideScore", current: 0, max: "" } ,
    { name: "STR", current: 8, max: "[[floor(@{str}/2-5)]]"} ,
    { name: "DEX", current: 8, max: "[[floor(@{dex}/2-5)]]" } ,
    { name: "CON", current: 8, max: "[[floor(@{con}/2-5)]]" } ,
    { name: "INT", current: 8, max: "[[floor(@{int}/2-5)]]" } ,
    { name: "WIS", current: 8, max: "[[floor(@{wis}/2-5)]]" } ,
    { name: "CHA", current: 8, max: "[[floor(@{cha}/2-5)]]" },,
    { name: "DR", current: 0, max: "" },
    { name: "SR", current: 0, max: "0" },
    { name: "Speed", current: 0, max: "0" }
];
 
var abil = [ // Abilities
// Action will take into effect the relevant ability, half level and Condition modifier. Players will need to manually edit to include bonuses from Skill Focus and Skill Training or if they are using other ability modifiers. 
// For Initiative, remove &{Tracker} if you are not using the Turn tracker.
    {name: "RollFP", description: "", action: "Spending Force Point\n/r 1d6", istokenaction: true},
    {name: "Acrobatics", description: "",action: "Acrobatics\n@{Acrobatics}", istokenaction: false},  
    {name: "Climb", description: "", action: "Climb\n@{Climb}", istokenaction: false},  
    {name: "Deception",description: "",action: "Deception\n@{Deception}", istokenaction: false},  
    {name: "Endurance",description: "",action: "Endurance\n@{Endurance}", istokenaction: false},  
    {name: "Gather-Information",description: "",action: "Gather Information\n@{GatherInformation}", istokenaction: false},  
    {name: "Initiative",description: "",action: "Initiative\n@{Initiative} ${tracker}", istokenaction: true},  
    {name: "Jump",description: "",action: "Jump\n@{Jump}", istokenaction: false},  
    {name: "Knowledge-Bureaucracy",description: "",action: "Knowledge: Bureaucracy\n@{Knowledge-Bureaucracy}", istokenaction: false},  
    {name: "Knowledge-GalacticLore",description: "",action: "Knowledge: Galactic Lore\n@{Knowledge-GalacticLore}", istokenaction: false},  
    {name: "Knowledge-LifeSciences",description: "",action: "Knowledge: Life Sciences\n@{Knowledge-LifeSciences}", istokenaction: false},  
    {name: "Knowledge-PhysicalSciences",description: "",action: "Knowledge: Physical Sciences\n@{Knowledge-PhysicalSciences}", istokenaction: false},   
    {name: "Knowledge-SocialScience",description: "",action: "Knowledge:Social Science\n@{Knowledge-SocialScience}", istokenaction: false},  
    {name: "Knowledge-Tactics",description: "",action: "Knowledge: -Tactics\n@{Knowledge-Tactics}", istokenaction: false},  
    {name: "Knowledge-Technology",description: "",action: "Knowledge: Technology\n@{Knowledge-Technology}", istokenaction: false},  
    {name: "Mechanics",description: "",action: "Mechanics\n@{Mechanics}", istokenaction: false},  
    {name: "Perception",description: "",action: "Perception\n@{Perception}", istokenaction: true},  
    {name: "Persuasion",description: "",action: "Persuasion\n@{Persuasion}", istokenaction: false},  
    {name: "Pilot",description: "",action: "Pilot\n@{Pilot}", istokenaction: false},  
    {name: "Ride",description: "",action: "Ride\n@{Dex} + @{halfLevel} + @{Condition}", istokenaction: false},  
    {name: "Stealth",description: "",action: "Stealth\n@{Stealth}", istokenaction: false},  
    {name: "Survival",description: "",action: "Survival\n@{Survival}", istokenaction: false},  
    {name: "Swim",description: "",action: "Swim\n@{Swim}", istokenaction: false},  
    {name: "Treat-Injury",description: "",action: "Treat Injury\n@{TreatInjury}", istokenaction: false},  
    {name: "Use-Computer",description: "",action: "Use Computer\n@{UseComputer}", istokenaction: false},  
    {name: "Use-the-Force",description: "",action: "Use the Force\n@{UsetheForce}", istokenaction: false}
];
 
// Don't change anything below here.
on("ready", function() {
    on("add:character", function(character) {
        for (i=0 ; i < attr.length; i++) {
            log (attr[i].name + " " + attr[i].current + " " + attr[i].max);
            createObj("attribute", {name: attr[i].name, current: attr[i].current, max: attr[i].max, _characterid: character.id});
        };
        for (i=0 ; i < abil.length; i++) {
            log (abil[i].name + " " + abil[i].current + " " + abil[i].max);
            createObj("ability", {name: abil[i].name, description: abil[i].description, action: abil[i].action, _characterid: character.id, istokenaction: abil[i].istokenaction});
    	};	
	});
});