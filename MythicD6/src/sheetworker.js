

const int = score => parseInt(score, 10) || 0;

const mainattributes = ["coordination", "knowledge", "perception", "physique", "presence", "reflexes"];

const skills = ["athletics", "evasion", "fighting", "influence", "intuition", "investigation", "knowhow", "language", "movement", "perform", "piloting", "ranged_fighting", "resistance", "scholar", "sneak", "technical", "thievery", "willpower", "spec1", "spec2", "spec3"];
const cooskills = ["piloting","ranged_fighting","thievery"];
const knoskills = ["language","scholar","technical"];
const perskills = ["intuition","investigation","knowhow"];
const physkills = ["athletics","resistance","movement"];
const preskills = ["influence","perform","willpower"];
const refskills = ["evasion","fighting","sneak"];
const archtype = ["archetype", "feature1", "feature2", "archetypetemplate"];
const miscstats = ["stress_points", "stress_points_max", "hero_points", "hero_points_max", "renown", "pd", "bdv", "pdv", "wealth", "treasure"];
const mainattributesnmisc = ["coordination", "knowledge", "perception", "physique", "presence", "reflexes", "fighting"];


// tabs

const buttonlist = ["notes","settings","npc","character"];
buttonlist.forEach(button => {
    on(`clicked:${button}`, function() {

        setAttrs({
            sheetTab: button
        });
    });
});

on("sheet:opened", function() {

  getAttrs(["npc", "sheetTab"], values => {

    let npc = int(values["npc"]);
    let sheetTab = values["sheetTab"];
    console.log("sheetTab: ", sheetTab);
    //let page = "character";

    if (sheetTab === "character"){
      npc = 0;
      console.log("sheetTab was char, set NPC=0: ", npc);
    }
    else if (sheetTab === "npc"){
      npc = 1;
      console.log("sheetTab was npc, set NPC=1: ", npc);
    }
    else if (sheetTab === "notes"){
      console.log("sheetTab was note");
    }
    else if (sheetTab === "settings"){
      console.log("sheetTab was settings");
    }
    setAttrs({
        npc: npc
    });
  });
});

// update misc stats

mainattributes.forEach(statmod => {
    on(`change:${statmod}`, eventInfo => {
        //TAS.log('attr mod change');
        //TAS.log('old mod: ' + eventInfo.previousValue);
        let temp = eventInfo.previousValue;
        if (temp === undefined){
            temp = 0;
        }else{
            temp = temp.replace('+', '');
        }
        
        let oldstatmod = int(temp);

        //TAS.log("old attr val: " + oldstatmod);

        getAttrs(mainattributes, values => {

            var update = {};

            let modnew = int(values[`${statmod}`]);
            let moddiff = modnew - oldstatmod;

            switch (`${statmod}`) {
                case "coordination":
                    
                    break;
                case "knowledge":
                    
                    break;
                case "perception":

                    break;
                case "physique":
                    if (int(values["physique"])<7)
                      update["pd"] = Math.floor(int(values["physique"]) / 2);
                    else if (int(values["physique"])<11)
                      update["pd"] = int(values["physique"]);
                    else if (int(values["physique"])<16)
                      update["pd"] = int(values["physique"])*3;
                    else
                      update["pd"] = 0;

                    setAttrs(update);
                    break;
                case "presence":
                    update["hero_points_max"] = int(values["presence"])*2;

                    setAttrs(update);
                    break;
                case "reflexes":
                    update["pdv"] = Math.floor(int(values["reflexes"]) / 2);

                    setAttrs(update);
                    break;
                default:
                    false;
            }
            //TAS.log(update);

        });
    });
});


// update skill pips when the used attribute is changed, and changes total dice and pip based on total pip from skill + attr

skills.forEach(skill => {
    on(`change:${skill}_attr change:${skill}_pip change:coordination_pip change:knowledge_pip change:perception_pip change:physique_pip change:presence_pip change:reflexes_pip`, eventInfo => {

        let newattr = eventInfo.newValue;
        let sourcename = eventInfo.sourceAttribute;
        //TAS.log(sourcename + ' changed to ' + newattr);
        //TAS.log("Skill Attribute changed, '" + skill + "' now uses " + newattr);

        let attrarray = ["coordination_pip", "knowledge_pip", "perception_pip", "physique_pip", "presence_pip", "reflexes_pip"];

        let issourcenameinarray = (attrarray.indexOf(sourcename) > -1);


        if (issourcenameinarray === true){//attribute pip changed, update relevant skill pip_rest & pip_boost 
          //TAS.log("attribute pip changed: '" + sourcename + "'");

          getAttrs([`${skill}_pip`, `${skill}_attr`, "coordination_pip", "knowledge_pip", "perception_pip", "physique_pip", "presence_pip", "reflexes_pip"], values => {

              var update = {};
              let skillpip = 0;
              let attrpip = 0;
              let pipboost = 0;

              setAttrs(update);
          });
        }

        else {//a skill attr or skill pip was changed

          //TAS.log('skill pip changed: ' + sourcename);

          getAttrs([`${skill}_pip`, `${skill}_attr`, "coordination_pip", "knowledge_pip", "perception_pip", "physique_pip", "presence_pip", "reflexes_pip"], values => {

              var update = {};

              let skillpip = int(values[`${skill}_pip`]);
              let attrpip = int(values[`${skill}_attr_pip`]);

              switch (`${newattr}`) {//when assosiated attribute for a skill changes, the skill's skill_attr_pip is updated to the new one
                  case "[[@{coordination}]]":
                      //TAS.log("skill_attr was coordination");
                      update[`${skill}_attr_pip`] = int(values["coordination_pip"]);
                      attrpip = int(values["coordination_pip"]);
                      break;
                  case "[[@{knowledge}]]":
                      //TAS.log("skill_attr was knowledge");
                      update[`${skill}_attr_pip`] = int(values["knowledge_pip"]);
                      attrpip = int(values["knowledge_pip"]);
                      break;
                  case "[[@{perception}]]":
                      update[`${skill}_attr_pip`] = int(values["perception_pip"]);
                      attrpip = int(values["perception_pip"]);
                      break;
                  case "[[@{physique}]]":
                      update[`${skill}_attr_pip`] = int(values["physique_pip"]);
                      attrpip = int(values["physique_pip"]);
                      break;
                  case "[[@{presence}]]":
                      update[`${skill}_attr_pip`] = int(values["presence_pip"]);
                      attrpip = int(values["presence_pip"]);
                      break;
                  case "[[@{reflexes}]]":
                      update[`${skill}_attr_pip`] = int(values["reflexes_pip"]);
                      attrpip = int(values["reflexes_pip"]);
                      break;
                  default:
                      //TAS.log("bad newattr");
                      false;
              }

              let pipboost = skillpip + attrpip;
              //TAS.log(`pipboost for ${skill}  is ` + pipboost);

              switch (pipboost){
                case 5:
                  update[`${skill}_pip_boost`] = 1;
                  update[`${skill}_pip_rest`] = 2;
                  break;
                case 4:
                  update[`${skill}_pip_boost`] = 1;
                  update[`${skill}_pip_rest`] = 1;
                  break;
                case 3:
                  update[`${skill}_pip_boost`] = 1;
                  update[`${skill}_pip_rest`] = 0;
                  break;
                case 2:
                  update[`${skill}_pip_boost`] = 0;
                  update[`${skill}_pip_rest`] = 2;
                  break;
                case 1:
                  update[`${skill}_pip_boost`] = 0;
                  update[`${skill}_pip_rest`] = 1;
                  break;
                case 0:
                  update[`${skill}_pip_boost`] = 0;
                  update[`${skill}_pip_rest`] = 0;
                  break;
                default:
                  false;
              }
              setAttrs(update);
          });
        }


    });
});


// adjust weapon attribute &  PD to weapon damage 
on("change:weapon1skill change:weapon2skill change:weapon3skill", eventInfo => {
    let wpnskill = eventInfo.sourceAttribute;
    let skillname = eventInfo.newValue; 
    console.log("wpnskill:" + wpnskill + " skillname:" + skillname);

  getAttrs(["pd", "fighting", "reflexes", "fighting_pip_boost", "ranged_fighting", "coordination", "ranged_fighting_pip_boost"], values => {

    let pd = int(values["pd"]);
    let fighting = int(values["fighting"]);
    let reflexes = int(values["reflexes"]);
    let fighting_pip_boost = int(values["fighting_pip_boost"]);
    let ranged_fighting = int(values["ranged_fighting"]);
    let coordination = int(values["coordination"]);
    let ranged_fighting_pip_boost = int(values["ranged_fighting_pip_boost"]);

    let update = {};

    switch (`${skillname}`) {
      case "fighting":

          console.log("fighting:" + fighting + " reflexes:" + reflexes + " fighting_pip_boost:" + fighting_pip_boost);

          update[`${wpnskill}die`] = fighting + reflexes + fighting_pip_boost;
          update[`${wpnskill}pd`] = int(values["pd"]);

          setAttrs(update);
          break;
      case "ranged_fighting":
          console.log("ranged_fighting:" + ranged_fighting + " reflexes:" + reflexes + " ranged_fighting_pip_boost:" + ranged_fighting_pip_boost);

          update[`${wpnskill}die`] = ranged_fighting + coordination + ranged_fighting_pip_boost;
          update[`${wpnskill}pd`] = 0;

          setAttrs(update);
          break;
        default:
          false;
      }
    });
 });

// calculate initiative bonus
on("change:intuition_pip change:perception_pip change:initiative_pip", eventInfo => {

  getAttrs(["intuition_pip", "perception_pip", "initiative_pip"], values => {

    let intuition_pip = int(values["intuition_pip"]);
    let perception_pip = int(values["perception_pip"]);
    let initiative_pip = int(values["initiative_pip"]);

    let pipboost = intuition_pip + perception_pip + initiative_pip;

    let update = {};

    switch (pipboost){
      case 6:
        update["initiative_pip_boost"] = 2;
        update["initiative_pip_rest"] = 0;
        break;
      case 5:
        update["initiative_pip_boost"] = 1;
        update["initiative_pip_rest"] = 2;
        break;
      case 4:
        update["initiative_pip_boost"] = 1;
        update["initiative_pip_rest"] = 1;
        break;
      case 3:
        update["initiative_pip_boost"] = 1;
        update["initiative_pip_rest"] = 0;
        break;
      case 2:
        update["initiative_pip_boost"] = 0;
        update["initiative_pip_rest"] = 2;
        break;
      case 1:
        update["initiative_pip_boost"] = 0;
        update["initiative_pip_rest"] = 1;
        break;
      case 0:
        update["initiative_pip_boost"] = 0;
        update["initiative_pip_rest"] = 0;
        break;
      default:
        false;
    }
    setAttrs(update);
 });
});

// Updates Archetype Concept Bonuses & Penalty

on("change:archetypetemplate", eventInfo => {
    //TAS.log('archetype changes');
    getAttrs(["archetypetemplate"], values => {
        let template = values["archetypetemplate"];
        //TAS.log("achetype" + template);
        let archename = "";
        let archedesc = "";
        let f1 = "";
        let f2 = "";

        switch (template) {
            case "adventurer":
                //TAS.log("Arche is adventurer");
                archename = "The Adventurer";
                archedesc = "The Adventurer is an everyday kind of person who happens to have special abilities and the will to use them. An Adventurer’s goals are not lofty or dark; if you are an Adventurer, you just know right from wrong and feel a responsibility to use your abilities for the common interest. Adventurers are known for flexibility and thoughtfulness. This is one of the most open and Heroic of the Archetypes, and suitable for a character who’s certain he wants to be Heroic, but not sure how to be.";
                f1 = "Helping Hand. The Adventurer has seen and experienced many things and is always ready with a solution to a problem. A number of times per game equal to the Hero’s KNO they may augment theirs or another’s skill roll by a number of dice equal to twice their PER attribute.";
                f2 = "The Adventurer adds 2D to the Aggravation Pool when she refuses to, or through inaction, allows a person in need or dire situation go unattended.";
                setAttrs({
                    "archetype": archename,
                    "archedesc": archedesc,
                    "feature1": f1,
                    "feature2": f2
                });
                break;
            case "avenger":
                //TAS.log("Arche is Avenger");
                archename = "The Avenger";
                archedesc = "The Avenger is the character who fights the forces of evil with his rules, driven by some need to see justice being done, possibly on any terms. The character is consumed by the desire to wreak retribution on all villains, for some slight or tragedy that was committed against them in their past. To the Avenger’s view, the streets are full of crime, and the local law enforcement is either on the take or completely ineffectual. To take back the streets, the Avenger, and every right-thinking citizen, should get their hands dirty, making the predators the prey. However, they may destroy a lot in the process of their vengeance, and certainly aren’t likely to make more friends – in fact, they may drive some away.";
                f1 = "Dark Justice. The Avenger is unrelenting in his quest for vengeance or what he believes to be just and adept at impressing his will upon others in pursuits. A number of times per game equal to the Heroes PER the Hero may double the Skill Level of any PRE+ Skill roll.";
                f2 = "The Avenger adds 2D to the Aggravation Pool when she allows a grievous wrong to go unpunished.";
                setAttrs({
                    "archetype": archename,
                    "archedesc": archedesc,
                    "feature1": f1,
                    "feature2": f2
                });
                break;
            case "bravo":
                archename = "The Bravo";
                archedesc = "The Bravo has not a care in the world and lives for the moment. She’s the life of the party, the Ayatollah of Rock-n-Rolla, constantly joking, and taking everything, not with a single grain of salt, but the whole bag. She’s a high-octane joy girl (or boy) who always takes the big chances and somehow gains the big rewards, a thrill-seeker who lives life to the fullest. But she must also beware the consequences of her actions!";
                f1 = "Bravos are constantly in motion, moving from one outrageous activity to another. A number of times per game equal to the Heroes PER, the Hero may double the Skill Level of any REF+ skill roll.";
                f2 = "The Bravo adds 2D to the Aggravation Pool when she plans or takes part in planning actions before taking them.";
                setAttrs({
                    "archetype": archename,
                    "archedesc": archedesc,
                    "feature1": f1,
                    "feature2": f2
                });
                break;
            case "icon":
                archename = "The Icon";
                archedesc = "The Icon is the essence of the loftier ideals of humanity. People look up to her for what she stands for. She’s the person who tries to lead by example, putting her best foot forward in the hopes that it will inspire humanity to do the same. Sometimes the people around her think she’s corny and stuffy, but it’s a small price to pay to achieve her goals!";
                f1 = "Inspire. The Icons can inspire those that respect her times per game equal to her PRE. The Hero must spend an action inciting the others to greatness and rolls her PRE + Influence; everyone in the Icon’s group receives a number of bonus successes to their next roll equal to one (1) plus the Effect Value of the roll.";
                f2 = "The Icon adds 2D to the Aggravation Pool when she, through her actions, fails to live up to the lofty ideas she espouses.";
                setAttrs({
                    "archetype": archename,
                    "archedesc": archedesc,
                    "feature1": f1,
                    "feature2": f2
                });
                break;
            case "outsider":
                archename = "The Outsider";
                archedesc = "The Outsider is different from normal society or people… or so he thinks, anyway. Whether hunted for real, or by some imaginary foes, the world is a much colder place to live than normal society, because The Outsider realizes what’s really going on. He’s the ultimate survivor, living by his own cunning and sharp wits. His friends consider him a pessimist if they’re not like-minded.";
                f1 = "Outsiders are excellent at reading a situation and known where the cards will fall. Because Outsiders place a high priority on self-reliance, they are also very adept at taking care of themselves. Several times per game equal to the Hero’s PER, the Hero may double the Skill Level of any PER + skill.";
                f2 = "The Outsider adds 2D to the Aggravation Pool when she allows herself to trust those in authority without checking all the facts and angles.";
                setAttrs({
                    "archetype": archename,
                    "archedesc": archedesc,
                    "feature1": f1,
                    "feature2": f2
                });
                break;
            case "protector":
                archename = "The Protector";
                archedesc = "The Protector is the champion of an idea or place. She might be the defender of the environment on an island or a small community anywhere or might devote herself to ideals like “justice,” “purity,” etc. She fights with an almost religious fervor when protecting her charges, and takes her duties very seriously. She feels personal pain if, by her own inaction, she allows harm to come to that which she protects.";
                f1 = "Aegis. The protector may shield others equal to his REF from any attack (physical, mental, or social). The Hero must spend an action defending others and rolls her PER + willpower; everyone under the protector’s defense reduces the number of successes of the attack directed at them by one (1) plus the Effect Value of the roll (for a single attack). The Hero may do this times equal to his PER attribute per game.";
                f2 = "The Protector adds 2D to the Aggravation Pool when she refuses through action or the expressed action of those around them to protect someone/thing in his charge.";
                setAttrs({
                    "archetype": archename,
                    "archedesc": archedesc,
                    "feature1": f1,
                    "feature2": f2
                });
                break;
            case "rogue":
                archename = "The Rogue";
                archedesc = "No one has more secrets than the Rogue does. The Rogue runs the borderline of a criminal, barely Heroic character, and may have a shady past that he’s trying to run away from or forget. The straight and narrow path is one littered with temptation, and he must stay strong and not falter… because sometimes the unsavory deeds of the past come back to haunt you. Often, he’ll stumble on that path, looking for an angle that leads to personal gain. He’s not above using his status to help himself. He has an absolute disdain for authority, and will always want to do things his way. Yet with all these personal drawbacks, he still has a sense of honor and will stick with a friend to the end.";
                f1 = "Slick. The Hero is slippery and can usually find his way out of any problem. A number of times per game equal to his PER the Hero may add double his Skill Level in any COO + skill.";
                f2 = "The Rogue adds 2D to the Aggravation Pool when she gives of herself without regard to personal gain or reward.";
                setAttrs({
                    "archetype": archename,
                    "archedesc": archedesc,
                    "feature1": f1,
                    "feature2": f2
                });
                break;
            case "scholar":
                archename = "The Scholar";
                archedesc = "The Scholar seeks knowledge for the sake of knowing. She could be any type of educated figure, from a mathematician to an exotic sorcerer. The Scholar is brilliant, and oft a little quirky, always looking for the cutting edge; and she won’t stop looking until she’s lacerated herself on it! This is not to say that every Scholar is a goofy, wild-haired person in the basement of the science building – she could also be that astrophysicist rock star who gets anyone she wants because she has all the brains. However, most Scholars share the common trait that they must know the unknowable – and that can get them into a lot of trouble!";
                f1 = "Deductive Reasoning. Scholars excel at making leaps of deduction or thinking creatively. The Hero can double the Skill Level in any KNO skill a number of times per game equal to her PER attribute.";
                f2 = "The Scholar adds 2D to the Aggravation Pool when she fails to delves into the unknown or probe to uncover secrets.";
                setAttrs({
                    "archetype": archename,
                    "archedesc": archedesc,
                    "feature1": f1,
                    "feature2": f2
                });
                break;
            case "warrior":
                archename = "The Warrior";
                archedesc = "Your character lives for the fight and little else. He lives the Spartan life, always honing his abilities. He may have a social life, but this is probably by pure accident. The Warrior is always completely obsessed with the fight – his goal is to be the best, and the only way to be the best is through battle.";
                f1 = "Signature Attack. The Warrior has perfected a single attack maneuver that he is known and feared for. The move can be performed a number of times per game equal to the Hero’s KNO attribute. When the attack is executed, the Hero may double their Skill Level in a Fighting or Ranged Fighting skill (picked at character creation).";
                f2 = "The Warrior adds 2D to the Aggravation Pool when they refuse to settle a dispute with action rather than reason and words.";
                setAttrs({
                    "archetype": archename,
                    "archedesc": archedesc,
                    "feature1": f1,
                    "feature2": f2
                });
                break;
            default:
                    false;
        }
    });
 });


// Updates stats if template character is selected.


on("change:template", eventInfo => {

  //TAS.log('change char template');

  getAttrs(["template"], values => {
    let template = values["template"];
    let update = {};

    switch (template) {
      case "bravo":
          //TAS.log("Bravo template used");
          update["character_name"] = "Bravo";
          update["power_level"] = 3;

          update["archetype"] = "Bravo";
          update["feature1"] = "Reckless abandon. constant motion";
          update["feature2"] = "2D aggro pool if hero plans ahead.";

          update["coordination"] = 3;
          update["coordination_pip"] = 1; 
          update["knowledge"] = 2;
          update["knowledge_pip"] = 0; 
          update["perception"] = 3;
          update["perception_pip"] = 0; 
          update["physique"] = 7;
          update["physique_pip"] = 0; 
          update["presence"] = 2;
          update["presence_pip"] = 0; 
          update["reflexes"] = 4;
          update["reflexes_pip"] = 2;

          
          update["athletics"] = 9;
          update["evasion"] = 3;
          update["fighting"] = 3;
          update["influence"] = 3;
          update["intuition"] = 2;
          update["investigation"] = 1;

          update["knowhow"] = 0;
          update["language"] = 3;
          update["movement"] = 2;
          update["perform"] = 0;
          update["piloting"] = 0;
          update["ranged_fighting"] = 2;

          update["resistance"] = 2;
          update["scholar"] = 0;
          update["sneak"] = 3;
          update["technical"] = 0;
          update["thievery"] = 2;
          update["willpower"] = 1;


          update["power1name"] = "";
          update["power1desc"] = "";
          update["power1rank"] = "";
          update["power1cost"] = "";

          update["power2name"] = "";
          update["power2desc"] = "";
          update["power2rank"] = "";
          update["power2cost"] = "";

          update["power3name"] = "";
          update["power3desc"] = "";
          update["power3rank"] = "";
          update["power3cost"] = "";

          update["advantage1name"] = "Wrestler of Bulls";
          update["advantage1"] = 2;
          update["advantage2name"] = "";
          update["advantage2"] = "";
          update["advantage3name"] = "";
          update["advantage3"] = "";

          update["personal"] = "Enemy,Misery";
          update["personaldice"] = 2;
          update["internal"] = "Hot Blooded";
          update["internaldice"] = 1;
          update["external"] = "Debt to Hastur";
          update["externaldice"] = 2;

          update["stress_points"] = 0;
          update["stress_points_max"] = 52;
          update["hero_points"] = 4;
          update["hero_points_max"] = 4;
          
          update["renown"] = 25;
          update["pd"] = 7;
          update["bdv"] = 2;
          update["pdv"] = 2;
          update["wealth"] = "3";
          update["treasure"] = "";

          update["equipment"] = "adidas sneakers, blue hoodie, burner phone";

          setAttrs(update);
          break;
      case "cardinal":
          //TAS.log("Cardinal template used");
          update["character_name"] = "Cardinal";
          update["power_level"] = 3;

          update["archetypetemplate"] = "avenger";

          update["coordination"] = 2;
          update["coordination_pip"] = 0; 
          update["knowledge"] = 3;
          update["knowledge_pip"] = 0; 
          update["perception"] = 4;
          update["perception_pip"] = 0; 
          update["physique"] = 3;
          update["physique_pip"] = 0; 
          update["presence"] = 2;
          update["presence_pip"] = 0; 
          update["reflexes"] = 4;
          update["reflexes_pip"] = 0;

          update["thievery"] = 3;
          update["athletics"] = 4;

          update["power1name"] = "Beast Control";
          update["power1desc"] = "only birds";
          update["power1rank"] = 5;

          update["power2name"] = "Language Comprehension";
          update["power2desc"] = "only birds";
          update["power2rank"] = 5;

          update["advantage1name"] = "";
          update["advantage1"] = "";


          update["personal"] = 3;
          update["internal"] = 1;
          update["external"] = 1;

          update["stress_points"] = 29;

          update["equipment"] = "wings(tool/gear sp5, flight 5), claws(weapon, sp5, bdv6, armor piercing";
          setAttrs(update);
          break;
        default:
          false;
      }
    });
 });