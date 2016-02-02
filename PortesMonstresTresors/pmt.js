var PmT = PmT || (function () {
    'use strict';
    var version = 1.1,
    releasedate= "2016-01-14",
    schemaversion = 1.0,
    author="Natha (roll20userid:75857)",
    warning = "This script is meant to be used with the Portes-Monstres-Trésors sheet",
    sortsDivins=["Détection de la Magie","Détection du Mal","Lumière","Protection contre le Mal","Purification","Regain d’Assurance","Résistance au Froid","Soins Légers"],
    sortsProfanes=["Bouclier","Charme-personne","Détection de la Magie","Disque Flottant","Lecture des Langages","Lecture de la Magie","Lumière","Projectile Magique","Protection contre le Mal","Sommeil","Ventriloquie","Verrouillage"],
    // Clerc 58 PO + Standard = 65
    packClerc='{"nom":"Brigandine","qte":"1","poids":"10"}|{"nom":"Bouclier","qte":"1","poids":"5"}|{"nom":"Casque","qte":"1","poids":"2.5"}|{"nom":"Fronde","qte":"1","poids":"0"}|{"nom":"Masse","qte":"1","poids":"1.5"}|{"nom":"Pierres de fronde","qte":"10","poids":"0.15"}|{"nom":"Symbole religieux en bois","qte":"1","poids":"0"}',
    // Guerrier 94 PO + Standard = 103
    packGuerrier='{"nom":"Arc court","qte":"1","poids":"1"}|{"nom":"Brigandine","qte":"1","poids":"10"}|{"nom":"Bouclier","qte":"1","poids":"5"}|{"nom":"Carquois","qte":"1","poids":"0.5"}|{"nom":"Flèches","qte":"20","poids":"0.07"}|{"nom":"Casque","qte":"1","poids":"2.5"}|{"nom":"Dague","qte":"1","poids":"0.5"}|{"nom":"Epée longue","qte":"1","poids":"2"}',
    // Magicien 54 PO + Standard = 61
    packMagicien='{"nom":"Bâton","qte":"1","poids":"4"}|{"nom":"Dague","qte":"1","poids":"0.5"}|{"nom":"Fléchettes","qte":"10","poids":"0.1"}|{"nom":"Grimoire","qte":"1","poids":"1.5"}|{"nom":"Encre (fiole de 30 ml)","qte":"1","poids":"0"}|{"nom":"Plume","qte":"1","poids":"0"}',
    // Voleur 78 PO + Standard = 85
    packVoleur='{"nom":"Arc court","qte":"1","poids":"1"}|{"nom":"Armure de cuir","qte":"1","poids":"7.5"}|{"nom":"Carquois","qte":"1","poids":"0.5"}|{"nom":"Flèches","qte":"20","poids":"0.07"}|{"nom":"Dague","qte":"1","poids":"0.5"}|{"nom":"Epée courte","qte":"1","poids":"1"}|{"nom":"Pitons","qte":"12","poids":"0.33"}|{"nom":"Outils de crochetage","qte":"1","poids":"0.5"}',
    // Elfe 89 PO + Standard = 96
    packElfe='{"nom":"Arc long","qte":"1","poids":"1"}|{"nom":"Brigandine","qte":"1","poids":"10"}|{"nom":"Carquois","qte":"1","poids":"0.5"}|{"nom":"Flèches","qte":"20","poids":"0.07"}|{"nom":"Dague","qte":"1","poids":"0.5"}|{"nom":"Epée longue","qte":"1","poids":"2"}',
    // Halfelin 47 PO + Standard = 54
    packHalfelin='{"nom":"Arc court","qte":"1","poids":"1"}|{"nom":"Armure de cuir","qte":"1","poids":"7.5"}|{"nom":"Carquois","qte":"1","poids":"0.5"}|{"nom":"Flèches","qte":"20","poids":"0.07"}|{"nom":"Dague","qte":"1","poids":"0.5"}|{"nom":"Epée courte","qte":"1","poids":"1"}',
    // Standard 7 PO
    packStandard='{"nom":"Sac à dos (20 kg)","qte":"1","poids":"1"}|{"nom":"Silex et amorce","qte":"1","poids":"0"}|{"nom":"Gourde","qte":"1","poids":"0.5"}|{"nom":"Jour de rations de voyage","qte":"4","poids":"0.5"}|{"nom":"Corde en chanvre de 15 m de long","qte":"1","poids":"5"}|{"nom":"Torches","qte":"4","poids":"0.5"}',
    //Attaques
    atkClerc='{"nom":"Fronde","mod":"@{MOD_DEX}","bonus":"0","nbde":"1","de":"4","moddgt":"0","bonusdgt":"0"}|{"nom":"Masse","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"6","moddgt":"@{MOD_FOR}","bonusdgt":"0"}',
    atkGuerrier='{"nom":"Arc court","mod":"@{MOD_DEX}","bonus":"0","nbde":"1","de":"6","moddgt":"0","bonusdgt":"0"}|{"nom":"Dague (Mêlée)","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Dague (Lancer)","mod":"@{MOD_DEX}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Epée longue","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"8","moddgt":"@{MOD_FOR}","bonusdgt":"0"}',
    atkMagicien='{"nom":"Bâton","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Dague (Mêlée)","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Dague (Lancer)","mod":"@{MOD_DEX}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Fléchette","mod":"@{MOD_DEX}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}',
    atkVoleur='{"nom":"Arc court","mod":"@{MOD_DEX}","bonus":"0","nbde":"1","de":"6","moddgt":"0","bonusdgt":"0"}|{"nom":"Dague (Mêlée)","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Dague (Lancer)","mod":"@{MOD_DEX}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Epée courte","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"6","moddgt":"@{MOD_FOR}","bonusdgt":"0"}',
    atkElfe='{"nom":"Arc long","mod":"@{MOD_DEX}","bonus":"0","nbde":"1","de":"6","moddgt":"0","bonusdgt":"0"}|{"nom":"Dague (Mêlée)","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Dague (Lancer)","mod":"@{MOD_DEX}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Epée longue","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"8","moddgt":"@{MOD_FOR}","bonusdgt":"0"}',
    atkHalfelin='{"nom":"Arc court","mod":"@{MOD_DEX}","bonus":"1","nbde":"1","de":"6","moddgt":"0","bonusdgt":"0"}|{"nom":"Dague (Mêlée)","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Dague (Lancer)","mod":"@{MOD_DEX}","bonus":"1","nbde":"1","de":"4","moddgt":"@{MOD_FOR}","bonusdgt":"0"}|{"nom":"Epée courte","mod":"@{MOD_FOR}","bonus":"0","nbde":"1","de":"6","moddgt":"@{MOD_FOR}","bonusdgt":"0"}',
    //-----------------------------------------------------------------------------
    checkInstall = function() {
        log(""+author+"'s Portes-Monstres-Trésors script version "+version+" ("+releasedate+") installed.");
        log(warning);
        log("https://github.com/Roll20/roll20-character-sheets/tree/master/PortesMonstresTresors");
        log("Enjoy!");
    },
    //-----------------------------------------------------------------------------
    charRoll = function (playerId,paramArray) {
        //méthode de détermination des caractéristiques
        var tirage = parseInt(paramArray[0]) || 0;
        var carFOR = 0;
        var carDEX = 0;
        var carCON = 0;
        var carINT  = 0;
        var carSAG = 0;
        var carCHA  = 0;
        var tabcars=[0,0,0,0];
        //Lancer les jets de caractéristiques
        switch(tirage) {
            case 0: //Tirage 3d6 dans l'ordre
                carFOR = randomInteger(6) + randomInteger(6) + randomInteger(6);
                carDEX = randomInteger(6) + randomInteger(6) + randomInteger(6);
                carCON = randomInteger(6) + randomInteger(6) + randomInteger(6);
                carINT  = randomInteger(6) + randomInteger(6) + randomInteger(6);
                carSAG = randomInteger(6) + randomInteger(6) + randomInteger(6);
                carCHA  = randomInteger(6) + randomInteger(6) + randomInteger(6);
                break;
            case 1: //Tirage 4d6 dans l'ordre, on garde les 3 meilleurs
                //Force
                tabcars[0]=randomInteger(6);
                tabcars[1]=randomInteger(6);
                tabcars[2]=randomInteger(6);
                tabcars[3]=randomInteger(6);
                tabcars.sort(function(a, b){return b-a;});
                carFOR=tabcars[0]+tabcars[1]+tabcars[2];
                //Dextérité
                tabcars[0]=randomInteger(6);
                tabcars[1]=randomInteger(6);
                tabcars[2]=randomInteger(6);
                tabcars[3]=randomInteger(6);
                tabcars.sort(function(a, b){return b-a;});
                carDEX=tabcars[0]+tabcars[1]+tabcars[2];
                //Constitution
                tabcars[0]=randomInteger(6);
                tabcars[1]=randomInteger(6);
                tabcars[2]=randomInteger(6);
                tabcars[3]=randomInteger(6);
                tabcars.sort(function(a, b){return b-a;});
                carCON=tabcars[0]+tabcars[1]+tabcars[2];
                //Intelligence
                tabcars[0]=randomInteger(6);
                tabcars[1]=randomInteger(6);
                tabcars[2]=randomInteger(6);
                tabcars[3]=randomInteger(6);
                tabcars.sort(function(a, b){return b-a;});
                carINT=tabcars[0]+tabcars[1]+tabcars[2];
                //Sagesse
                tabcars[0]=randomInteger(6);
                tabcars[1]=randomInteger(6);
                tabcars[2]=randomInteger(6);
                tabcars[3]=randomInteger(6);
                tabcars.sort(function(a, b){return b-a;});
                carSAG=tabcars[0]+tabcars[1]+tabcars[2];
                //Charisme
                tabcars[0]=randomInteger(6);
                tabcars[1]=randomInteger(6);
                tabcars[2]=randomInteger(6);
                tabcars[3]=randomInteger(6);
                tabcars.sort(function(a, b){return b-a;});
                carCHA=tabcars[0]+tabcars[1]+tabcars[2];
                break;
        }
        //Commencer à construire le template de chat
        var msg = "&{template:pmtchar} {{name=Tirage de caractéristiques}}";
        msg = msg + "{{for="+carFOR+"}}";
        msg = msg + "{{dex="+carDEX+"}}";
        msg = msg + "{{con="+carCON+"}}";
        msg = msg + "{{int="+carINT+"}}";
        msg = msg + "{{sag="+carSAG+"}}";
        msg = msg + "{{cha="+carCHA+"}}";
        msg = msg + "{{tabcar="+carFOR+","+carDEX+","+carCON+","+carINT+","+carSAG+","+carCHA+"}}";
        //Classes avec prérequis
        if(carINT>8){msg = msg + "{{elfe=1}}";}
        if(carDEX>8 && carCON>8){msg = msg + "{{halfelin=1}}";}
        if(carCON>8){msg = msg + "{{nain=1}}";}
        //Fin
        sendChat("player|"+playerId, msg);
        return;
    },
    //-----------------------------------------------------------------------------
    charNew = function (playerId,paramArray) {
        /*
            paramArray[0] : classe
            paramArray[1] : nom du personnage
            paramArray[2] : valeurs des caractéristiques, séparées par des ,
        */
        var classe = paramArray[0];
        var nom = paramArray[1];
        var tmp = paramArray[2] || "";
        var tabcars = tmp.split(",");
        //Préparation des valeurs
        var Niveau= 1;
        var Alignement="Neutralité";
        var Force=parseInt(tabcars[0]);
        var MOD_FOR=0;
        if (Force <4) {MOD_FOR=-3;}
            else if (Force>3 && Force<6) {MOD_FOR=-2;}
            else if (Force>5 && Force<9) {MOD_FOR=-1;}
            else if (Force>12 && Force<16) {MOD_FOR=1;}
            else if (Force>15 && Force<18) {MOD_FOR=2;}
            else if (Force>17) {MOD_FOR=3;}
            else {MOD_FOR=0;}
        var Dexterite=parseInt(tabcars[1]);
        var MOD_DEX=0;
        if (Dexterite <4) {MOD_DEX=-3;}
            else if (Dexterite>3 && Dexterite<6) {MOD_DEX=-2;}
            else if (Dexterite>5 && Dexterite<9) {MOD_DEX=-1;}
            else if (Dexterite>12 && Dexterite<16) {MOD_DEX=1;}
            else if (Dexterite>15 && Dexterite<18) {MOD_DEX=2;}
            else if (Dexterite>17) {MOD_DEX=3;}
            else {MOD_DEX=0;}
        var Constitution=parseInt(tabcars[2]);
        var MOD_CON=0;
        if (Constitution <4) {MOD_CON=-3;}
            else if (Constitution>3 && Constitution<6) {MOD_CON=-2;}
            else if (Constitution>5 && Constitution<9) {MOD_CON=-1;}
            else if (Constitution>12 && Constitution<16) {MOD_CON=1;}
            else if (Constitution>15 && Constitution<18) {MOD_CON=2;}
            else if (Constitution>17) {MOD_CON=3;}
            else {MOD_CON=0;}
        var Intelligence=parseInt(tabcars[3]);
        var MOD_INT=0;
        if (Intelligence>12 && Intelligence<16) {MOD_INT=1;}
            else if (Intelligence>15 && Intelligence<18) {MOD_INT=2;}
            else if (Intelligence>17) {MOD_INT=3;}
            else {MOD_INT=0;}
        var Sagesse=parseInt(tabcars[4]);
        var MOD_SAG=0;
        if (Sagesse <4) {MOD_SAG=-3;}
            else if (Sagesse>3 && Sagesse<6) {MOD_SAG=-2;}
            else if (Sagesse>5 && Sagesse<9) {MOD_SAG=-1;}
            else if (Sagesse>12 && Sagesse<16) {MOD_SAG=1;}
            else if (Sagesse>15 && Sagesse<18) {MOD_SAG=2;}
            else if (Sagesse>17) {MOD_SAG=3;}
            else {MOD_SAG=0;}
        var Charisme=parseInt(tabcars[5]);
        var MOD_CHA=0;
        var MaxCompagnons=0;
        var MoralCompagnons=0;
        if (Charisme <4) {
                MOD_CHA=2;
                MaxCompagnons=1;
                MoralCompagnons=4;
            }
            else if (Charisme>3 && Charisme<6) {
                MOD_CHA=1;
                MaxCompagnons=2;
                MoralCompagnons=5;
            }
            else if (Charisme>5 && Charisme<9) {
                MOD_CHA=1;
                MaxCompagnons=3;
                MoralCompagnons=6;
            }
            else if (Charisme>12 && Charisme<16) {
                MOD_CHA=-1;
                MaxCompagnons=5;
                MoralCompagnons=8;
            }
            else if (Charisme>15 && Charisme<18) {
                MOD_CHA=-1;
                MaxCompagnons=6;
                MoralCompagnons=9;
            }
            else if (Charisme>17) {
                MOD_CHA=-2;
                MaxCompagnons=7;
                MoralCompagnons=10;
            }
            else {
                MOD_CHA=0;
                MaxCompagnons=4;
                MoralCompagnons=7;
            }
        // en fonction de la classe
        var DV = 0;
        var PV = 0;
        var XP = 0;
        var ATK_Bonus=1;
        var JS_Souffles=0;
        var JS_Poison=0;
        var JS_Petrification=0;
        var JS_Baton=0;
        var JS_Sorts=0;
        var ToucheCAm6=20;
        var ToucheCAm5=20;
        var ToucheCAm4=20;
        var ToucheCAm3=20;
        var ToucheCAm2=20;
        var ToucheCAm1=20;
        var ToucheCA0=19;
        var ToucheCA1=18;
        var ToucheCA2=17;
        var ToucheCA3=16;
        var ToucheCA4=15;
        var ToucheCA5=14;
        var ToucheCA6=13;
        var ToucheCA7=12;
        var ToucheCA8=11;
        var ToucheCA9=10;
        var lesort ="";
        var lepack="";
        var latak="";
        var lecout=0;
        var CaAscArmure = 0;
        var CaDescArmure = 0;
        var CaBouclier = 0;
        var CaracPrinc = 0;
        var laclasse = 0;
        switch(classe){
            case 'clerc':
                laclasse = 0;
                DV = 6;
                XP = 1565;
                JS_Souffles=16;
                JS_Poison=11;
                JS_Petrification=14;
                JS_Baton=12;
                JS_Sorts=15;
                //lesort=sortsDivins[randomInteger(8)-1];
                lesort="Détection de la Magie|Détection du Mal|Lumière|Protection contre le Mal|Purification|Regain d’Assurance|Résistance au Froid|Soins Légers";
                lepack=""+packClerc+"|"+packStandard;
                lecout=65;
                CaAscArmure = 12;
                CaDescArmure = 7;
                CaBouclier = 1;
                CaracPrinc = Sagesse;
                latak = atkClerc;
                break;
            case 'guerrier':
                laclasse = 1;
                DV = 8;
                XP = 2035;
                JS_Souffles=17;
                JS_Poison=14;
                JS_Petrification=16;
                JS_Baton=15;
                JS_Sorts=18;
                lesort="";
                lepack=""+packGuerrier+"|"+packStandard;
                lecout=103;
                CaAscArmure = 12;
                CaDescArmure = 7;
                CaBouclier = 1;
                CaracPrinc = Force;
                latak = atkGuerrier;
                break;
            case 'magicien':
                laclasse = 2;
                DV = 4;
                XP = 2501;
                JS_Souffles=16;
                JS_Poison=13;
                JS_Petrification=13;
                JS_Baton=13;
                JS_Sorts=14;
                lesort=sortsProfanes[randomInteger(12)-1];
                lepack=""+packMagicien+"|"+packStandard;
                lecout=61;
                CaAscArmure = 10;
                CaDescArmure = 9;
                CaBouclier = 0;
                CaracPrinc = Intelligence;
                latak = atkMagicien;
                break;
            case 'voleur':
                laclasse = 3;
                DV = 4;
                XP = 1251;
                JS_Souffles=16;
                JS_Poison=14;
                JS_Petrification=13;
                JS_Baton=15;
                JS_Sorts=14;
                lesort="";
                lepack=""+packVoleur+"|"+packStandard;
                lecout=85;
                CaAscArmure = 11;
                CaDescArmure = 8;
                CaBouclier = 0;
                CaracPrinc = Dexterite;
                latak = atkVoleur;
                break;
            case 'elfe':
                laclasse = 4;
                DV = 6;
                XP = 4065;
                JS_Souffles=15;
                JS_Poison=12;
                JS_Petrification=13;
                JS_Baton=13;
                JS_Sorts=15;
                lesort=sortsProfanes[randomInteger(12)-1];
                lepack=""+packElfe+"|"+packStandard;
                lecout=96;
                CaAscArmure = 12;
                CaDescArmure = 7;
                CaBouclier = 0;
                CaracPrinc = Math.max(Force, Intelligence);
                latak = atkElfe;
                break;
            case 'halfelin':
                laclasse = 5;
                DV = 6;
                XP = 2035;
                JS_Souffles=13;
                JS_Poison=8;
                JS_Petrification=10;
                JS_Baton=9;
                JS_Sorts=12;
                lesort="";
                lepack=""+packHalfelin+"|"+packStandard;
                lecout=54;
                CaAscArmure = 11;
                CaDescArmure = 8;
                CaBouclier = 0;
                CaracPrinc = Math.max(Dexterite, Constitution);
                latak = atkHalfelin;
                break;
            case 'nain':
                laclasse = 6;
                DV = 8;
                XP = 2187;
                JS_Souffles=13;
                JS_Poison=8;
                JS_Petrification=10;
                JS_Baton=9;
                JS_Sorts=12;
                lesort="";
                lepack=""+packGuerrier+"|"+packStandard;
                lecout=103;
                CaAscArmure = 12;
                CaDescArmure = 7;
                CaBouclier = 1;
                CaracPrinc = Force;
                latak = atkGuerrier;
                break;
        }
        var BonusXp = 0;
        if (CaracPrinc <6) {BonusXp=-10;}
            else if (CaracPrinc>5 && CaracPrinc<9) {BonusXp=-5;}
            else if (CaracPrinc>12 && CaracPrinc<16) {BonusXp=5;}
            else if (CaracPrinc>16) {BonusXp=10;}
            else {BonusXp=0;}
        var equippo= Math.max(((randomInteger(8)+randomInteger(8)+randomInteger(8))*10)-lecout,0);
        PV = Math.max(DV+MOD_CON,1);
        //Création du personnage / l'objet character
        var char = createObj("character", {
                name: nom,
                inplayerjournals: "all",
                controlledby: playerId
            });
        //Base
        createObj("attribute", {name: "Classe", current: laclasse, characterid: char.id});
        createObj("attribute", {name: "Niveau", current: Niveau, characterid: char.id});
        createObj("attribute", {name: "DV", current: DV, characterid: char.id});
        createObj("attribute", {name: "PV", current: PV, max: PV, characterid: char.id});
        createObj("attribute", {name: "XP", current: 0, max: XP, characterid: char.id});
        createObj("attribute", {name: "BonusXp", current: BonusXp, characterid: char.id});
        createObj("attribute", {name: "sheetOptionCa", current: 1, characterid: char.id});
        createObj("attribute", {name: "CaAscArmure", current: CaAscArmure, characterid: char.id});
        createObj("attribute", {name: "CaDescArmure", current: CaDescArmure, characterid: char.id});
        createObj("attribute", {name: "CaBouclier", current: CaBouclier, characterid: char.id});
        createObj("attribute", {name: "Alignement", current: Alignement, characterid: char.id});
        // Caractéristiques
        createObj("attribute", {name: "Force", current: Force, characterid: char.id});
        createObj("attribute", {name: "MOD_FOR", current: MOD_FOR, characterid: char.id});
        createObj("attribute", {name: "Dexterite", current: Dexterite, characterid: char.id});
        createObj("attribute", {name: "MOD_DEX", current: MOD_DEX, characterid: char.id});
        createObj("attribute", {name: "Constitution", current: Constitution, characterid: char.id});
        createObj("attribute", {name: "MOD_CON", current: MOD_CON, characterid: char.id});
        createObj("attribute", {name: "Intelligence", current: Intelligence, characterid: char.id});
        createObj("attribute", {name: "MOD_INT", current: MOD_INT, characterid: char.id});
        createObj("attribute", {name: "Sagesse", current: Sagesse, characterid: char.id});
        createObj("attribute", {name: "MOD_SAG", current: MOD_SAG, characterid: char.id});
        createObj("attribute", {name: "Charisme", current: Charisme, characterid: char.id});
        createObj("attribute", {name: "MOD_CHA", current: MOD_CHA, characterid: char.id});
        createObj("attribute", {name: "MaxCompagnons", current: MaxCompagnons, characterid: char.id});
        createObj("attribute", {name: "MoralCompagnons", current: MoralCompagnons, characterid: char.id});
        // Jets de Sauvegarde
        createObj("attribute", {name: "JS_Souffles", current: JS_Souffles, characterid: char.id});
        createObj("attribute", {name: "JS_Poison", current: JS_Poison, characterid: char.id});
        createObj("attribute", {name: "JS_Petrification", current: JS_Petrification, characterid: char.id});
        createObj("attribute", {name: "JS_Baton", current: JS_Baton, characterid: char.id});
        createObj("attribute", {name: "JS_Sorts", current: JS_Sorts, characterid: char.id});
        // Attaques
        createObj("attribute", {name: "ATK_Bonus", current: ATK_Bonus, characterid: char.id});
        createObj("attribute", {name: "ToucheCAm6", current: ToucheCAm6, characterid: char.id});
        createObj("attribute", {name: "ToucheCAm5", current: ToucheCAm5, characterid: char.id});
        createObj("attribute", {name: "ToucheCAm4", current: ToucheCAm4, characterid: char.id});
        createObj("attribute", {name: "ToucheCAm3", current: ToucheCAm3, characterid: char.id});
        createObj("attribute", {name: "ToucheCAm2", current: ToucheCAm2, characterid: char.id});
        createObj("attribute", {name: "ToucheCAm1", current: ToucheCAm1, characterid: char.id});
        createObj("attribute", {name: "ToucheCA0", current: ToucheCA0, characterid: char.id});
        createObj("attribute", {name: "ToucheCA1", current: ToucheCA1, characterid: char.id});
        createObj("attribute", {name: "ToucheCA2", current: ToucheCA2, characterid: char.id});
        createObj("attribute", {name: "ToucheCA3", current: ToucheCA3, characterid: char.id});
        createObj("attribute", {name: "ToucheCA4", current: ToucheCA4, characterid: char.id});
        createObj("attribute", {name: "ToucheCA5", current: ToucheCA5, characterid: char.id});
        createObj("attribute", {name: "ToucheCA6", current: ToucheCA6, characterid: char.id});
        createObj("attribute", {name: "ToucheCA7", current: ToucheCA7, characterid: char.id});
        createObj("attribute", {name: "ToucheCA8", current: ToucheCA8, characterid: char.id});
        createObj("attribute", {name: "ToucheCA9", current: ToucheCA9, characterid: char.id});
        //Argent
        createObj("attribute", {name: "equip-po", current: equippo, characterid: char.id});
        //---
        //Eléments stockés dans des attributs todoxxx et qui seront traités par Sheet Worker sheet opened
        // -- Sorts
        if (lesort.length > 0){
            createObj("attribute", {name: "todosort", current: lesort, characterid: char.id});
        }
        // -- Equipements
        createObj("attribute", {name: "todoequip", current: lepack, characterid: char.id});
        // -- Attaques
        createObj("attribute", {name: "todoatk", current: latak, characterid: char.id});
        //Affichage du résultat
        var msg = "&{template:pmtchar} {{name=Personnage créé}}";
        msg = msg + "{{personnage="+nom+"}}";
        msg = msg + "{{classe="+classe+"}}";
        msg = msg + "{{charid="+char.id+"}}";
        sendChat("player|"+playerId, msg);
        return;
    },
    //-----------------------------------------------------------------------------
    handleAttributeEvent = function(obj, prev) {
        /*
            Check and set character states according to stats pools attributes
                and special damage, when their current values are manually
                changed on the sheet or directly in the character window.
            Note that this event isn't fired when attributes are modified by API functions,
                that's why some functions here call checkCharStates() too.
        */
        var attrName = obj.get("name");
        if ( attrName=="might" || attrName=="speed" || attrName=="intellect" || attrName=="SpecialDamage") {
            checkCharStates(getObj("character", obj.get("_characterid")));
        }
        return;
    },
    //-----------------------------------------------------------------------------
    handleInput = function(msg) {
        if (msg.type !== "api") {
            return;
        }
        var paramArray= [];
        var functionCalled = "";
        if (msg.content.indexOf("!pmt-") !== 0) {
            return;
        } else {
            if (parseInt(msg.content.indexOf(" ")) ==-1) {
                functionCalled = msg.content;
            } else {
                functionCalled = msg.content.split(" ")[0];
                paramArray[0] = msg.content.replace(functionCalled,"").trim();
                //log("Function called:"+functionCalled+" Parameters:"+paramArray[0]); //DEBUG
                if (parseInt(paramArray[0].indexOf("|")) !=-1) {
                    //more than 1 parameter (supposedly character_id as first parameter)
                    paramArray = paramArray[0].split("|");
                }
            }
        }
        switch(functionCalled) {
            case '!pmt-rollchar':
                // Initier une création de perso, et proposer des choix
                //sendChat("GM", "&{template:pmt} {{chatmessage=cypher-checkpcstate}} {{noCharacter="+msg.content+"}}");
                charRoll(msg.playerid,paramArray);
                break;
            case '!pmt-newchar':
                // Créer un personnage à partir des choix et carac générés par rollchar/charRoll
                charNew(msg.playerid, paramArray);
                break;
        }
        return;
    },
    //-----------------------------------------------------------------------------
    registerEventHandlers = function() {
        on('chat:message', handleInput);
        //on('change:attribute:current', handleAttributeEvent);
    };
    //-----------------------------------------------------------------------------
    return {
        CheckInstall: checkInstall,
        RegisterEventHandlers: registerEventHandlers
    };
}());
//-----------------------------------------------------------------------------
on('ready',function() {
    'use strict';
    PmT.CheckInstall();
    PmT.RegisterEventHandlers();
});
