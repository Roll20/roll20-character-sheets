/*
 * Version 0.0.1
 * Made By Noel da Costa
 */
// import compendium from './compendium'
function empty(mixedVar) {
  //  discuss at: http://locutus.io/php/empty/
  // original by: Philippe Baumann
  //    input by: Onno Marsman (https://twitter.com/onnomarsman)
  //    input by: LH
  //    input by: Stoyan Kyosev (http://www.svest.org/)
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Francesco
  // improved by: Marc Jansen
  // improved by: Rafał Kukawski (http://blog.kukawski.pl)
  //   example 1: empty(null)
  //   returns 1: true
  //   example 2: empty(undefined)
  //   returns 2: true
  //   example 3: empty([])
  //   returns 3: true
  //   example 4: empty({})
  //   returns 4: true
  //   example 5: empty({'aFunc' : function () { alert('humpty'); } })
  //   returns 5: false
  var undef;
  var key;
  var i;
  var len;
  var emptyValues = [undef, null, false, 0, "", "0"];

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i]) {
      return true;
    }
  }

  if (typeof mixedVar === "object") {
    for (key in mixedVar) {
      if (mixedVar.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  return false;
}

import compendium from "./compendium";

var GW3Companion =
  GW3Companion ||
  (function () {
    "use strict";

    let observers = {
      tokenChange: [],
    };

    // Styling for the chat responses.
    const styles = {
        reset: "padding: 0; margin: 0;",
        menuborder:
        "border: 0px solid transparent; border-radius: 4px; padding: 6px; background: red;",
        menu:
          "background-color: #f1f1f1; border: 5px solid transparent; padding: 6px 5px 10px 5px; border-radius: 4px;",
        button:
          "background-color: #000; border: 1px solid #292929; border-radius: 3px; padding: 5px; color: #f1f1f1; text-align: center;",
        list: "list-style: none;",
        float: {
          right: "float: right;",
          left: "float: left;",
        },
        success:
          "color: green; background-color: white; padding: 0.3rem 1rem; margin-left: 1rem, border-radius: 3px;",
        fail:
          "color: red; background-color: white; padding: 0.3rem 1rem; margin-left: 1rem, border-radius: 3px;",
        rank:
          "border: solid 1px black; border-radius: 2px; padding: 2px 4px; background-color: #fefefe; cursor: pointer; display: inline-block;",
        overflow: "overflow: hidden;",
        row: "margin-bottom: 5px",
        fullWidth: "width: 100%;",
        underline: "text-decoration: underline;",
        strikethrough: "text-decoration: strikethrough",
        border:
          "margin-top: 1rem; border: 1px solid #aaa; padding: 1rem; border-radius: 5px;",
        description:
          "font-weight: normal; margin-top: 5px; border: 1px solid grey; padding: 1rem; border-radius: 5px; background-color: #aaa; color: white;",
        effect:
          "font-weight: bold; margin-top: 5px; border: 1px solid grey; padding: 1rem; border-radius: 5px; background-color: #aaa; color: white;",
      },
      script_name = "GW3Companion",
      state_name = "GW3COMPANION",
      markers = [
        "none",
        "blue",
        "brown",
        "green",
        "pink",
        "purple",
        "red",
        "yellow",
        "-",
        "all-for-one",
        "angel-outfit",
        "archery-target",
        "arrowed",
        "aura",
        "back-pain",
        "black-flag",
        "bleeding-eye",
        "bolt-shield",
        "broken-heart",
        "broken-shield",
        "broken-skull",
        "chained-heart",
        "chemical-bolt",
        "cobweb",
        "dead",
        "death-zone",
        "drink-me",
        "edge-crack",
        "fishing-net",
        "fist",
        "fluffy-wing",
        "flying-flag",
        "frozen-orb",
        "grab",
        "grenade",
        "half-haze",
        "half-heart",
        "interdiction",
        "lightning-helix",
        "ninja-mask",
        "overdrive",
        "padlock",
        "pummeled",
        "radioactive",
        "rolling-tomb",
        "screaming",
        "sentry-gun",
        "skull",
        "sleepy",
        "snail",
        "spanner",
        "stopwatch",
        "strong",
        "three-leaves",
        "tread",
        "trophy",
        "white-tower",
      ],
      generateUUID = (function () {
        var a = 0,
          b = [];
        return function () {
          var c = new Date().getTime() + 0,
            d = c === a;
          a = c;
          for (var e = new Array(8), f = 7; 0 <= f; f--) {
            e[
              f
            ] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(
              c % 64
            );
            c = Math.floor(c / 64);
          }
          c = e.join("");
          if (d) {
            for (f = 11; 0 <= f && 63 === b[f]; f--) {
              b[f] = 0;
            }
            b[f]++;
          } else {
            for (f = 0; 12 > f; f++) {
              b[f] = Math.floor(64 * Math.random());
            }
          }
          for (f = 0; 12 > f; f++) {
            c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(
              b[f]
            );
          }
          return c;
        };
      })(),
      generateRowID = function () {
        return generateUUID().replace(/_/g, "Z");
      },
      getParameters = function (args) {
        let parameters = {};
        _.each(args, (arg, key) => {
          let splat = args.shift().split("|");
          if (splat[1] !== undefined) {
            parameters[splat[0]] =
              splat[0] === "title" ? splat[1].replace("_", " ") : splat[1];
          }
        });
        return parameters;
      },
      getRollResult = function (msg, rolltext, callback, parameters) {
        sendChat(msg.playerid, rolltext, function (ops) {
          const rollresult = ops[0];
          log(rollresult);
          let result = JSON.parse(ops[0].content);
          roll = parseInt(result.total);
          callback(roll, parameters);
        });
      },
      handleInput = (msg) => {
        if (msg.type != "api") return;
        let data = {},
          listItems = [],
          contents = "",
          button = "";
        // Split the message into command and argument(s)
        let args = msg.content.split(" ");
        let command = args.shift().substring(1);
        let extracommand = args.shift();
        log(msg);
        log("GM issued " + script_name + " msg: " + msg.content);
        log("GM issued " + script_name + " command: " + command);
        log("state config", state[state_name].config.command);
        if (command == state[state_name].config.command) {
          switch (extracommand) {
            case "reset":
              if (!playerIsGM(msg.playerid)) return;
              state[state_name] = {};
              setDefaults(true);
              sendConfigMenu();
              break;

            case "config":
              if (!playerIsGM(msg.playerid)) return;
              let message;
              if (args.length > 0) {
                let setting = args.shift().split("|");
                let key = setting.shift();
                let value =
                  setting[0] === "true"
                    ? true
                    : setting[0] === "false"
                    ? false
                    : setting[0];
                state[state_name].config[key] = value;
                if (key === "bar") {
                  //registerEventHandlers();
                  message =
                    '<span style="color: red">The API Sandbox needs to be restarted for this to take effect.</span>';
                }
              }

              sendConfigMenu(false, message);
              break;
            case "set":
              if (!playerIsGM(msg.playerid)) return;
              if (args.length > 0) {
                let score = args.shift().split("|");
                let ability = score.shift();
                log("ability: " + ability);
                log("score: " + score);
                _.each(msg.selected, function (obj) {
                  let token, character, attribute, exists;
                  token = getObj("graphic", obj._id);
                  if (token) {
                    character = getObj("character", token.get("represents"));
                  }

                  // attribute = getAttrByName(parameters['character'], `${ability}_rolled`);
                  attribute = findObjs({
                    _type: "attribute",
                    characterid: character.id,
                    name: `${ability}_rolled`,
                  });
                  log("ATTRIBUTE: ");
                  log(attribute);
                  log(attribute.length);
                  if (attribute.length) {
                    attribute[0].setWithWorker({ current: score });
                  }
                  // if (character) {
                  //   let rowId = generateRowID();
                  //   let objTemplate = {
                  //     max: '',
                  //     _id: rowId,
                  //     _characterid: character.id
                  //   };
                  //   let obj = Object.assign(objTemplate, {
                  //     name:`attr_${ability}_rolled`,
                  //     current: score
                  //   });
                  //   log(obj);
                  //   createObj('attribute',obj);
                  // }
                });
              }
              break;
            case "act":
              log("ACT roll");
              if (args.length > 0) {
                log("args obj...");
                log(args);
                // Get main settings
                let rankSetting = args.shift().split("|");
                log("rankSetting...");
                log(rankSetting);
                let rank = rankSetting.shift();
                log("rank: ", rank);
                let roll1 = rankSetting[0];
                let roll2 = rankSetting[1];

                // Get other parameters
                const parameters = getParameters(args);
                log("parameters: ");
                log(parameters);
                log("act passed rank: " + rank);
                log("roll1 & roll2...");
                log(roll1);
                log(roll2);
                // log(value);

                // get target if any and target CS mod and
                rollAct(msg, rank, parameters, roll1, roll2);
              }
              break;
            case "import":
              let ids = args.shift().split("|");
              let category = ids.shift();
              log("name: " + ids);
              log("typeof ids: " + typeof ids);
              log("ids: " + ids);
              log("category: " + category);
              log("typeof category: " + typeof category);
              importCompendiumItemToCharacter(msg, ids, category);
              break;
            case "category":
              log("category");
              log("args length:" + args.length);
              if (args.length > 0) {
                let category = args.shift();
                log("category: " + category);
                let cost = 0;
                data = getData();
                if (!data) {
                  return;
                }
                log("got data");
                listItems = [];
                let items = Object.keys(data[category]);
                let subcat = {};
                let header = "";
                log("got items");
                _.each(items, (item) => {
                  // render type headers
                  if (data[category][item].type) {
                    log("type: " + data[category][item].type);
                    if (!subcat[data[category][item].type]) {
                      subcat[data[category][item].type] = true;
                      header = `<h3>${ucFirst(data[category][item].type)}</h3>`;
                      log("set header");
                      log(header);
                    } else {
                      header = "";
                    }
                  }
                  cost = data[category][item].cost
                    ? data[category][item].cost
                    : data[category][item].rarity === 2
                    ? "**"
                    : "";
                  button =
                    header +
                    makeButton(
                      ucFirst(data[category][item].name),
                      `!gw import ${category}|${item}`,
                      styles.button + styles.float.right
                    );
                  // log("COST: "+cost);
                  if (cost !== "") {
                    listItems.push(`<span>cost: ${cost}</span>` + button);
                  } else {
                    listItems.push(button);
                  }
                });
                let backbutton = makeButton(
                  "Back",
                  `!gw compendium`,
                  styles.button + styles.float.right
                );

                contents =
                  makeList(
                    listItems,
                    styles.reset + styles.list + styles.overflow,
                    styles.overflow
                  ) +
                  '<hr><p style="font-size: 80%">You can always come back to the compendium by typing `!' +
                  state[state_name].config.command +
                  " compendium`.</p><hr>" +
                  backbutton;
                makeAndSendMenu(
                  contents,
                  "Compendium </br> " + category + " import",
                  ""
                );
              }
              // button = makeButton('Backpack', '!' + state[state_name].config.command + ' import backpack', styles.button + styles.fullWidth);
              // makeAndSendMenu(button, 'Import Gear');
              break;
            case "compendium":
              log("compendium");
              data = getData();
              if (!data) {
                return;
              }
              listItems = [];
              let categories = [
                "armour",
                "attacks",
                "gear",
                "mutations",
                "skills",
                "talents",
              ];
              _.each(categories, (category) => {
                button = makeButton(
                  ucFirst(category),
                  `!gw category ${category}`,
                  styles.button + styles.float.right
                );
                listItems.push(button);
              });
              contents =
                makeList(
                  listItems,
                  styles.reset + styles.list + styles.overflow,
                  styles.overflow
                ) +
                '<hr><p style="font-size: 80%">You can always come back to the compendium by typing `!' +
                state[state_name].config.command +
                " compendium`.</p><hr>";
              makeAndSendMenu(contents, "Compendium - Categories", "");
              break;
            case "effect":
              if (args.length > 0) {
                log(args);
                let setting = args.shift().split("|");
                log(setting);
                let effect = setting.shift();
                let background = setting[0] || null;
                let colour =
                  background == "white" || background == "yellow"
                    ? "black"
                    : "white";
                let result = getEffectResult(effect, background);
                let title = result.name;
                let player = getObj("player", msg.playerid);
                log("PLAYER: ");
                log(player);
                const parameters = getParameters(args);
                let whisper = parameters["whisper"]
                  ? player.get("_displayname")
                  : "";
                let content = `<div>${makeResult(
                  colour,
                  background,
                  result.result
                )}</div>`;
                makeAndSendResult(content, title, whisper, msg.playerid);
              }
              break;
            default:
              sendConfigMenu();
              break;
          }
        }
      },
      getRollColour = (roll, row) => {
        let colour = "white",
          RF = 0,
          background = "black";
        if (roll >= row[0]) {
          colour = "black";
          background = "white";
        }
        if (roll >= row[1]) {
          colour = "white";
          RF++;
          background = "blue";
        }
        if (roll >= row[2]) {
          colour = "white";
          RF++;
          background = "green";
        }
        if (row[3] !== null && roll >= row[3]) {
          colour = "black";
          RF++;
          background = "yellow";
        }
        if (row[4] !== null && roll >= row[4]) {
          colour = "white";
          RF++;
          background = "orange";
        }
        if (roll >= row[5]) {
          colour = "white";
          RF++;
          background = "red";
        }
        return { colour, RF, background };
      },
      /**
       * @param {object} msg the msg object from chat window
       * @param {string} rank the rank column to roll against
       * @param {object} parameters the message content parsed as key, value pairs
       * @param {Number} roll1 the ability ACT roll (i.e. number from 1 - 100)
       * @param {Number} roll2 the save ACT roll (i.e. number from 1 - 100)
       */
      rollAct = (msg, rank, parameters = {}, roll1, roll2) => {
        const self = this;
        log("rollACT: " + rank);
        const data = getData();
        if (!data) {
          return;
        }
        let save,
          rankHTML = "",
          effectType = "effect",
          token = false,
          character = false,
          targetCharacter = false,
          colorResult = {},
          effectName = "",
          category = parameters["category"],
          dmgTotalString = "",
          orig_rank = parseInt(rank);
        rank = parseInt(rank);
        rankHTML = `<span style="${styles.rank}" title="Score: ${rank}">${rank}</span>`;
        sendChat(msg.playerid, "/roll 2d100", function (ops) {
          log("roll1: " + roll1);
          log("roll2: " + roll2);
          if (roll1) {
            log("roll1 hardcoded");
          } else {
            log("roll object");
            log(ops);
            log(JSON.parse(ops[0].content));
            // return;
            roll1 = parseInt(JSON.parse(ops[0].content).rolls[0].results[0].v);
            roll2 = parseInt(JSON.parse(ops[0].content).rolls[0].results[1].v);
          }
          // ops will be an ARRAY of command results.
          log("roll1: " + roll1);
          log("roll2: " + roll2);
          if (parameters["mod"]) {
            // log('calculating rank based on modifier');
            // log(parameters['character']);
            // log(`${parameters['modifier']}_mod`);
            // log(getAttrByName(parameters['character'], 'PS_modifier'));

            const mod = parseInt(
              getAttrByName(
                parameters["character"],
                `${parameters["mod"]}_modifier`
              )
            );
            rankHTML += ` + <span style="${styles.rank}" title="${parameters["mod"]} modifier">${mod}</span>`;
            rank += mod;
          }
          if (parameters["character"]) {
            character = getObj("character", parameters["character"]);
            log("character: ");
            log(character);
          }
          if (parameters["CS"]) {
            log("calculating rank based on CS: " + parseInt(parameters["CS"]));
            rankHTML += ` + <span style="${styles.rank}" title="Situational CS">${parameters["CS"]}</span>`;
            rank += parseInt(parameters["CS"]);
            log("rank: " + rank);
          }
          if (parameters["tech"]) {
            log("calculating rank based on tech level");
            let character_tech_level;
            if (character) {
              character_tech_level = getAttrByName(
                character.id,
                "character_tech_level"
              );
              let tech_difference = Math.abs(
                parseInt(character_tech_level) - parseInt(parameters["tech"])
              );
              rankHTML += ` - <span style="${styles.rank}" title="Tech Level Difference">${tech_difference}</span>`;
              rank -= tech_difference;
              log("rank: " + rank);
            }
          }
          if (parameters["target_id"]) {
            log("target attributes");
            token = getObj("graphic", parameters["target_id"]);
            log(token);
            if (token) {
              targetCharacter = getObj("character", token.get("represents"));
              log(targetCharacter);
            }
            if (!targetCharacter) {
              log("character not found");
              return;
            }
            if (parameters["target_mod"]) {
              let modVal = getAttrByName(
                targetCharacter.id,
                parameters["target_mod"]
              );
              log("modVal: " + modVal);
              rank += parseInt(modVal);
              // attributes = findObjs({
              //   _type: 'attribute',
              //   characterid: targetCharacter.id
              // });
              // _.each(attributes, fnction(attribute) {
              //   log(attribute);
              // });
            }

            // minus target's DX mod for melee attacks
            if (parameters["category"] === "attacks") {
              let character_rank = parseInt(
                getAttrByName(character.id, "character_rank")
              );
              log("character");
              log(character);
              log("talents");

              rank += character_rank;
              rankHTML += ` + <span style="${styles.rank}" title="Character rank">${character_rank}</span>`;
              if (parameters["type"] === "melee") {
                let targetDXmod = getAttrByName(
                  targetCharacter.id,
                  "DX_modifier"
                );
                log("targetDXmod: " + targetDXmod);
                rankHTML += ` - <span style="${styles.rank}" title="Melee target DX mod">${targetDXmod}</span>`;
                rank -= parseInt(targetDXmod);
              }
              if (parameters["type"] === "throwing") {
                let throwingTalent = filterObjs(
                  (a) =>
                    a.get("type") === "attribute" &&
                    a.get("characterid") === character.id &&
                    /^repeating_talents_[^_]*_ref$/.test(a.get("name")) &&
                    a.get("current") === "throwing"
                );
                if (throwingTalent.length) {
                  rankHTML += ` + <span style="${styles.rank}" title="Throwing talent">${character_rank}</span>`;
                  rank += character_rank;
                }
              }
              if (parameters["type"] === "shooting") {
                let shootingTalent = filterObjs(
                  (a) =>
                    a.get("type") === "attribute" &&
                    a.get("characterid") === character.id &&
                    /^repeating_talents_[^_]*_ref$/.test(a.get("name")) &&
                    a.get("current") === "shooting"
                );
                if (shootingTalent.length) {
                  rankHTML += ` + <span style="${styles.rank}" title="Shooting talent">${character_rank}</span>`;
                  rank += character_rank;
                }
              }
              if (parameters["type"] === "grappling") {
                let grapplingTalent = filterObjs(
                  (a) =>
                    a.get("type") === "attribute" &&
                    a.get("characterid") === character.id &&
                    /^repeating_talents_[^_]*_ref$/.test(a.get("name")) &&
                    a.get("current") === "grappling"
                );
                if (grapplingTalent.length) {
                  rankHTML += ` + <span style="${styles.rank}" title="Wrestling talent">${character_rank}</span>`;
                  rank += character_rank;
                }
              }
              if (parameters["type"] === "martialarts") {
                let martialartsTalent = filterObjs(
                  (a) =>
                    a.get("type") === "attribute" &&
                    a.get("characterid") === character.id &&
                    /^repeating_talents_[^_]*_ref$/.test(a.get("name")) &&
                    a.get("current") === "martialarts"
                );
                if (martialartsTalent.length) {
                  rankHTML += ` + <span style="${styles.rank}" title="Martialarts talent">${character_rank}</span>`;
                  rank += character_rank;
                }
              }
              if (parameters["type"] === "brawling") {
                let brawlingTalent = filterObjs(
                  (a) =>
                    a.get("type") === "attribute" &&
                    a.get("characterid") === character.id &&
                    /^repeating_talents_[^_]*_ref$/.test(a.get("name")) &&
                    a.get("current") === "brawling"
                );
                if (brawlingTalent.length) {
                  rankHTML += ` + <span style="${styles.rank}" title="Brawling talent">${character_rank}</span>`;
                  rank += character_rank;
                }
              }
            }
          }

          rankHTML += `: <span style="${styles.rank}" title="Final Rank">${rank}</span>`;
          let row = getActRow(rank);
          log("row: " + row);
          log(typeof row);
          log(Array.isArray(row));
          if (!Array.isArray(row)) {
            let player = getObj("player", msg.playerid);
            makeAndSendResult(
              "ACT roll failed!",
              "Error:",
              player.get("_displayname"),
              msg.playerid
            );
            return;
          }

          colorResult = getRollColour(roll1, row);
          log("colorResult: " + colorResult);
          // log('background: ' + background);
          // log('RC: ' + background);
          // log('RF: ' + RF);
          let title = `ACT Roll'`;
          if (parameters["title"]) {
            if (parameters["category"] && parameters["title"] === "ref") {
              if (
                data[parameters["category"]] &&
                data[parameters["category"]][parameters["id"]]
              ) {
                title = data[parameters["category"]][parameters["id"]].name;
              }
            } else {
              title = parameters["title"];
            }
            title += ` (${rank})`;
          }
          let content = "";
          content += `<div style="${styles.row}; font-weight: bold;">Roll: <span>${roll1}</span><div style="font-weight: bold; margin-bottom: 5px;">Rank: ${rankHTML}</div>`;

          if (parameters["dmg"]) {
            log(
              "damage parameter: " +
                parameters["dmg"] +
                " - " +
                parameters["dmg_type"]
            );
            let baseDmg = 0,
              DR = 0,
              dmgAfterDRsoak = 0;
            if (parameters["dmg"] === "mutation" || parameters["dmg"] === "M") {
              baseDmg = parseInt(orig_rank) / 2;
            } else if (parameters["dmg"].includes("/")) {
              //- cater for damage ratings for different sizes
              let dmg = parameters["dmg"].split("/");
              log("dmg: ");
              log(dmg);
              let size =
                getAttrByName(targetCharacter.id, "character_size") || 3;
              log("size: " + size);
              baseDmg =
                parseInt(size) < 4 ? parseInt(dmg[0]) : parseInt(dmg[1]);
              log("baseDmg after size: " + baseDmg);
              if (_.isNaN(baseDmg)) baseDmg = 0;
            } else {
              baseDmg = parseInt(parameters["dmg"]);
              if (_.isNaN(baseDmg)) baseDmg = 0;
            }

            if (parameters["category"] === "attacks") {
              if (parameters["skilldmg"]) {
                log("baseDmg orig_rank: " + orig_rank);
                log("baseDmg before skilldmg: " + baseDmg);
                baseDmg += parseInt(orig_rank);
                log("baseDmg after skilldmg: " + baseDmg);
              }
            }

            log("baseDMG: " + baseDmg);
            log("RF: " + colorResult.RF);
            DR = getAttrByName(targetCharacter.id, "DR_physical") || 0;
            log("DR: " + DR);
            log("DR in: " + parseInt(DR));

            let dmgTotal = parseInt(colorResult.RF) * parseInt(baseDmg);
            if (_.isNaN(dmgTotal)) dmgTotal = 0;
            dmgAfterDRsoak = dmgTotal;
            dmgAfterDRsoak += parseInt(DR);
            dmgAfterDRsoak = dmgAfterDRsoak < 1 ? 0 : dmgAfterDRsoak;
            log("dmgTotal: " + dmgTotal);
            log("dmgAfterDRsoak: " + dmgAfterDRsoak);
            dmgTotalString = `Physical Damage: <span title="Base: ${baseDmg}, Dmg: ${dmgTotal} DR: ${DR}">${dmgAfterDRsoak}</span>`;
          }

          content += makeResult(
            colorResult.colour,
            colorResult.background,
            colorResult.background,
            "RF",
            colorResult.RF,
            dmgTotalString
          );

          const send = (msg, parameters, title, content) => {
            if (parameters["character"]) {
              makeAndSendResult(
                content,
                title,
                "",
                parameters["character"],
                "character"
              );
            } else {
              makeAndSendResult(content, title, "", msg.playerid);
            }
          };

          // show ability description
          if (parameters["describe"] === "on") {
            const description = _.defaults(
              data[parameters["category"]][parameters["id"]],
              { description: false }
            ).description;
            if (description) {
              content += `<div style="${styles.description};">${description}</div>`;
            }
          }

          if (parameters["save"]) {
            save = parameters["save"];
          }
          let effectsContent = "";
          // override save type from damage type
          if (parameters["dmg_type"]) {
            log(
              "Damage Type: " +
                data["damage_types"][parameters["dmg_type"]].name
            );
            if (data["damage_types"][parameters["dmg_type"]]) {
              if (data["damage_types"][parameters["dmg_type"]].save) {
                save = data["damage_types"][parameters["dmg_type"]].save;
              }
              if (data["damage_types"][parameters["dmg_type"]].effect_crit) {
                parameters["effect_crit"] =
                  data["damage_types"][parameters["dmg_type"]].effect_crit;
              }
              if (data["damage_types"][parameters["dmg_type"]].effect) {
                parameters["effect"] =
                  data["damage_types"][parameters["dmg_type"]].effect;
              }
              if (data["damage_types"][parameters["dmg_type"]].description) {
                content += `<div style="${
                  styles.description
                };"><b style="${row}">Damage Type: ${
                  data["damage_types"][parameters["dmg_type"]].name
                }</b><p>${
                  data["damage_types"][parameters["dmg_type"]].description
                }</p></div>`;
              }
            }
          }

          if (parameters["effect"]) {
            effectName = parameters["effect"];
            log("effect name: " + effectName);
            if (
              !empty(data.effects) &&
              !empty(data.effects[parameters["effect"]])
            ) {
              effectDisplayName = data.effects[parameters["effect"]].name;
              log("effect name: " + effectDisplayName);
              // let result = getEffectResult(parameters['effect'], colorResult.background);
              content += `<div style="font-weight: bold">Effect: </div><div>${effectDisplayName}</div>`;
            } else if (
              !empty(data.damage_types) &&
              data.damage_types[parameters["effect"]]
            ) {
              log("damage_type based on effect: " + effectName);
              log(data.damage_types[parameters["effect"]]);

              effectsContent += `<div style="${
                styles.effect
              }">Effect: <span style="font-weight: normal" title="${
                data.damage_types[parameters["effect"]].description
              }">${data.damage_types[parameters["effect"]].name}</span></div>`;
              save = data.damage_types[parameters["effect"]].save;
            }
          }

          if (parameters["effect_crit"]) {
            effectName = "(Critical)";
            log("effect_crit: " + parameters["effect_crit"]);
            log("background: " + colorResult.background);
            log(
              !empty(data.effects) && data.effects[parameters["effect_crit"]]
            );
            if (colorResult.background === "red") {
              log("RED show save");
              if (data.effects[parameters["effect_crit"]]) {
                log("Crit effect according to Ability setting");
                effectType = "effect_crit";
                effectsContent += `<div style="${
                  styles.effect
                }">Critical Effect: <span style="font-weight: normal">${
                  data.effects[parameters["effect_crit"]].name
                }</span></div>`;
              }
              // else if (data.damage_types[parameters["effect_crit"]]) {
              //   log("Crit effect according to Damage Type");
              //   log(data.damage_types);
              //   log(parameters["effect_crit"]);
              //   log(data.damage_types[parameters["effect_crit"]]);
              //   content += `<div style="${
              //     styles.effect
              //   }">Critical Effect: <span style="font-weight: normal" title="${
              //     data.damage_types[parameters["effect_crit"]].description
              //   }">${
              //     data.damage_types[parameters["effect_crit"]].name
              //   }</span></div>`;
              //   save = data.damage_types[parameters["effect_crit"]].save;
              //   content += renderSaveRoll(
              //     save,
              //     targetCharacter,
              //     roll2,
              //     parameters,
              //     effectType,
              //     colorResult,
              //     effectName
              //   );
              // }
            }
          }
          if (!empty(save)) {
            content += renderSaveRoll(
              save,
              targetCharacter,
              roll2,
              parameters,
              effectType,
              colorResult,
              effectsContent
            );
          } else {
            log('Will not render Save as the "save" parameter was not set.');
          }
          send(msg, parameters, title, content);
        });
      },
      renderSaveRoll = (
        save,
        targetCharacter,
        roll2,
        parameters,
        effectType,
        colorResult,
        effectsContent
      ) => {
        const data = getData();
        if (!data) {
          return;
        }
        log("START renderSaveRoll");
        let saveScore = getAttrByName(targetCharacter.id, `${save}`);
        log("saveScore: " + saveScore);
        let effectsActRow = getActRow(saveScore);
        log("effectsActRow");
        log(effectsActRow);
        let effectsColorResult = getRollColour(roll2, effectsActRow);
        let effectsResult = { result: effectsColorResult.background };
        let result = "";
        if (!empty(data.effects) && data.effects[parameters[effectType]]) {
          effectsResult = getEffectResult(
            parameters[effectType],
            effectsColorResult.background
          );
        }
        result = effectsResult.result;
        let success =
          parseInt(effectsColorResult.RF) >= parseInt(colorResult.RF);
        let successMessage = success
          ? `<span style="${styles.success}">success</span>`
          : `<span style="${styles.fail}">fail</span>`;

        log("END renderSaveRoll");
        let content = `<div style="${styles.border} font-weight: bold; background-color: ${effectsColorResult.background}; color: ${effectsColorResult.colour};">Save vs. ${save}: <span style="font-weight: normal; font-variant:small-caps;">${result} ${successMessage}</span></div>`;
        if (!success) {
          content += effectsContent;
        }
        return content;
      },
      getActRow = (rank) => {
        log("getActRow");
        rank = parseInt(rank);
        log(typeof rank + ": " + rank);
        const cols = {
          A: [18, 74, 99, null, null, 100],
          B: [17, 73, 98, 99, null, 100],
          C: [16, 72, 97, 99, null, 100],
          1: [15, 71, 96, 98, 99, 100],
          2: [14, 69, 94, 97, 99, 100],
          3: [13, 68, 93, 97, 97, 100],
          4: [12, 66, 91, 96, 97, 100],
          5: [11, 62, 87, 93, 97, 99],
          6: [10, 60, 85, 92, 96, 99],
          7: [9, 58, 83, 91, 96, 99],
          8: [8, 56, 80, 89, 95, 99],
          9: [7, 54, 78, 88, 93, 99],
          10: [6, 52, 75, 86, 92, 99],
          11: [5, 49, 71, 83, 91, 98],
          12: [5, 47, 68, 81, 90, 98],
          13: [4, 44, 65, 79, 89, 98],
          14: [4, 42, 62, 77, 88, 98],
          15: [4, 40, 58, 75, 87, 98],
          16: [3, 37, 53, 72, 86, 97],
          17: [3, 35, 49, 70, 85, 97],
          18: [3, 33, 45, 68, 84, 97],
          19: [3, 30, 41, 66, 83, 97],
          20: [2, 26, 36, 63, 82, 96],
          21: [2, 23, 32, 61, 81, 96],
          X: [2, 20, 27, 59, 80, 96],
          Y: [2, 17, 22, 56, 78, 95],
          Z: [2, 13, 16, 51, 76, 94],
        };
        if (rank <= -26) return cols["A"];
        if (rank <= -6) return cols["B"];
        if (rank <= 0) return cols["C"];
        if (rank === 1) return cols["1"];
        if (rank === 2) return cols["2"];
        if (rank === 3) return cols["3"];
        if (rank === 4) return cols["4"];
        if (rank === 5) return cols["5"];
        if (rank === 6) return cols["6"];
        if (rank === 7) return cols["7"];
        if (rank === 8) return cols["8"];
        if (rank === 9) return cols["9"];
        if (rank === 10) return cols["10"];
        if (rank === 11) return cols["11"];
        if (rank === 12) return cols["12"];
        if (rank === 13) return cols["13"];
        if (rank === 14) return cols["14"];
        if (rank === 15) return cols["15"];
        if (rank === 16) return cols["16"];
        if (rank === 17) return cols["17"];
        if (rank === 18) return cols["18"];
        if (rank === 19) return cols["19"];
        if (rank === 20) return cols["20"];
        if (rank === 21) return cols["21"];
        if (rank <= 120) return cols["X"];
        if (rank <= 600) return cols["Y"];
        if (rank > 600) return cols["Z"];
      },
      getEffectResult = (effect, colour) => {
        let data = getData().effects;
        const index =
          colour === "red"
            ? 0
            : colour === "orange"
            ? 1
            : colour === "yellow"
            ? 2
            : colour === "green"
            ? 3
            : colour === "blue"
            ? 4
            : colour === "white"
            ? 5
            : 6;
        log("index: ", index);
        log("effectname: ", effect);
        log(data[effect]);
        log(data[effect].name);
        log(data[effect].data[index]);
        return { name: data[effect].name, result: data[effect].data[index] };
      },
      importCompendiumItemToCharacter = function (msg, ids, category) {
        log("import");
        const data = getData();
        let player = getObj("player", msg.playerid);
        log("player:");
        log(player);
        log("player displayname:");
        log(player.get("_displayname"));
        if (msg.selected === undefined) {
          makeAndSendResult(
            "Please first select a token representing the character to which you wish to import!",
            "Error:",
            player.get("_displayname"),
            msg.playerid
          );
          return;
        }
        _.each(msg.selected, function (obj) {
          let token, character, attribute, sections, exists;
          token = getObj("graphic", obj._id);
          if (token) {
            character = getObj("character", token.get("represents"));
          }
          if (character) {
            attribute = findObjs({
              _type: "attribute",
              characterid: character.id,
            });
          } else {
            log("character not found");
            return;
          }
          if (!attribute) {
            makeAndSendResult(
              "This character sheet is blank.",
              "Error: ",
              player.get("_displayname"),
              character.id,
              "character"
            );
            return;
          }
          _.each(ids, (itemId) => {
            let rowId = generateRowID();
            let objTemplate = {
              max: "",
              _id: rowId,
              _characterid: character.id,
            };
            if (data[category] === undefined) {
              makeAndSendResult(
                "The selected category could not be found.",
                "Error: ",
                player.get("_displayname"),
                character.id,
                "character"
              );
              return;
            }
            // let items = data[category].filter(item => item.id === itemId);
            if (!_.has(data[category], itemId)) {
              makeAndSendResult(
                "The selected itemID could not be found.",
                "Error: ",
                player.get("_displayname"),
                character.id,
                "character"
              );
              return;
            }
            let itemAttributes = data[category][itemId];
            log("itemAttributes: ");
            log(itemAttributes);
            _.each(itemAttributes, (attributeValue, attributeName) => {
              if (attributeName !== "id") {
                let obj = Object.assign(objTemplate, {
                  name: `repeating_${category}_${rowId}_${attributeName}`,
                  current: attributeValue,
                });
                log(obj);
                createObj("attribute", obj);
              }
            });
            // add in the compendium reference
            let obj = Object.assign(objTemplate, {
              name: `repeating_${category}_${rowId}_ref`,
              current: itemId,
            });
            createObj("attribute", obj);
            if (category === "armour" || category === "gear") {
              let obj = Object.assign(objTemplate, {
                name: `repeating_${category}_${rowId}_equipped`,
                current: 0,
              });
              createObj("attribute", obj);
            }
            if (category === "attacks" || category === "ammo") {
              if (category === "attacks") {
                //@deprecated: Attack ranks are distinct from Character ranks
                // log("import attack");
                // let character_rank = parseInt(
                //   getAttrByName(character.id, "character_rank")
                // );
                // log("character rank:" + character_rank);
                // if (_.isNaN(character_rank)) {
                //   log(
                //     "character rank was not found and thus the attack rank could not be accurately determined and will default to 1"
                //   );
                //   character_rank = 1;
                // }
                // let obj = Object.assign(objTemplate, {
                //   name: `repeating_${category}_${rowId}_rank`,
                //   current: character_rank,
                // });
                // createObj("attribute", obj);
              }
              // also add it to gear
              _.each(itemAttributes, (attributeValue, attributeName) => {
                if (attributeName !== "id") {
                  let obj = Object.assign(objTemplate, {
                    name: `repeating_gear_${rowId}_${attributeName}`,
                    current: attributeValue,
                  });
                  log(obj);
                  createObj("attribute", obj);
                }
              });
            }
            if (category === "mutations") {
              sendChat(msg.playerid, "/roll 2d6", function (ops) {
                let rollresult = ops[0];
                let result = JSON.parse(ops[0].content);
                let rolltotal = parseInt(result.total);
                if (itemAttributes.modifier !== undefined) {
                  let mod =
                    itemAttributes["type"] === "mental"
                      ? "MS_modifier"
                      : "PS_modifier";
                  let ability = attribute.filter((x) => x.get("name") === mod);
                  if (ability.length) {
                    let obj = Object.assign(objTemplate, {
                      name: `repeating_${category}_${rowId}_rank`,
                      current: parseInt(ability[0].get("current")) + rolltotal,
                    });
                    createObj("attribute", obj);
                  }
                }
              });
            }
          });
        });
      },
      handleBarValueChange = (obj, prev) => {
        pre_log("handleBarValueChange: ");
        log(obj);
        log(prev);

        let bar = "bar" + state[state_name].config.bar;

        if (
          !obj ||
          !prev ||
          !obj.get("represents") ||
          obj.get(bar + "_value") === prev[bar + "_value"]
        ) {
          return;
        }

        // let attributes = {};
        let character = {},
          characterID = obj.get("represents");
        character = getObj("character", characterID);

        // obj.set(attributes);
        notifyObservers("tokenChange", obj, prev);
      },
      getColor = (value) => {
        return hslToHex((1 - value) * 120, 75, 50);
      },
      hslToHex = (h, s, l) => {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;
        if (s === 0) {
          r = g = b = l; // achromatic
        } else {
          const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
          };
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }
        const toHex = (x) => {
          const hex = Math.round(x * 255).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      },
      ucFirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      sendConfigMenu = (first, message) => {
        let commandButton = makeButton(
            "!" + state[state_name].config.command,
            "!" +
              state[state_name].config.command +
              " config command|?{Command (without !)}",
            styles.button + styles.float.right
          ),
          barButton = makeButton(
            "bar " + state[state_name].config.bar,
            "!" +
              state[state_name].config.command +
              " config bar|?{Bar|Bar 1 (green),1|Bar 2 (blue),2|Bar 3 (red),3}",
            styles.button + styles.float.right
          ),
          listItems = [
            '<span style="' +
              styles.float.left +
              '">Command:</span> ' +
              commandButton,
            '<span style="' +
              styles.float.left +
              '">HP Bar:</span> ' +
              barButton,
          ];

        let resetButton = makeButton(
          "Reset",
          "!" + state[state_name].config.command + " reset",
          styles.button + styles.fullWidth
        );

        let title_text = first
          ? script_name + " First Time Setup"
          : script_name + " Config";
        message = message ? "<p>" + message + "</p>" : "";
        let contents =
          message +
          makeList(
            listItems,
            styles.reset + styles.list + styles.overflow,
            styles.overflow
          ) +
          '<hr><p style="font-size: 80%">You can always come back to this config by typing `!' +
          state[state_name].config.command +
          " config`.</p><hr>" +
          resetButton;
        makeAndSendMenu(contents, title_text, "gm");
      },
      makeAndSendMenu = (contents, title, whisper) => {
        title = title && title != "" && makeTitle(title);
        whisper = whisper && whisper !== "" && "/w " + whisper + " ";
        sendChat(
          script_name,
          whisper +
            '<div style="'+styles.menuborder+'"><div style="' +
            styles.menu +
            styles.overflow +
            '">' +
            title +
            contents +
            "</div></div>",
          null,
          {
            noarchive: true,
          }
        );
      },
      makeAndSendResult = (contents, title, whisper, id, type = "player") => {
        log("makeAndSendResult");
        log(id);
        log(type);
        title = title && title != "" && makeTitle(title);
        whisper = whisper && whisper !== "" ? "/w " + whisper + " " : "";
        sendChat(
          `${type}|${id}`,
          whisper +
            '<div style="'+styles.menuborder+'"><div style="' +
            styles.menu +
            styles.overflow +
            '">' +
            title +
            contents +
            "</div></div>",
          null,
          {
            noarchive: true,
          }
        );
      },
      makeTitle = (title) => {
        return (
          '<h3 style="margin-bottom: 10px; color: #ae6a00"; font-family: "Contrail One";>' +
          title +
          "</h3>"
        );
      },
      makeButton = (title, href, style) => {
        return '<a style="' + style + '" href="' + href + '">' + title + "</a>";
      },
      makeList = (items, listStyle, itemStyle) => {
        let list = '<ul style="' + listStyle + '">';
        items.forEach((item) => {
          list += '<li style="' + itemStyle + '">' + item + "</li>";
        });
        list += "</ul>";
        return list;
      },
      makeResult = (colour, background, text, label, value, category = "") => {
        return `<div style="color:${colour}; background-color:${background}; border: 1px solid #aaa; border-radius: 5px; padding: 1rem; margin-bottom: 10px;"><div>${category}</div><div style="font-variant:small-caps">${text} (${label}: ${value})</div></div>`;
      },
      pre_log = (message) => {
        log(
          "---------------------------------------------------------------------------------------------"
        );
        log(message);
        log(
          "---------------------------------------------------------------------------------------------"
        );
      },
      checkInstall = () => {
        if (!_.has(state, state_name)) {
          state[state_name] = state[state_name] || {};
        }
        setDefaults();

        log(
          script_name + " Ready! Command: !" + state[state_name].config.command
        );
        if (state[state_name].config.debug) {
          makeAndSendMenu(script_name + " Ready! Debug On.", "", "gm");
        }
      },
      observeTokenChange = function (handler) {
        pre_log("token change: ");
        log(handler);
        if (handler && _.isFunction(handler)) {
          observers.tokenChange.push(handler);
        }
      },
      notifyObservers = function (event, obj, prev) {
        _.each(observers[event], function (handler) {
          handler(obj, prev);
        });
      },
      registerEventHandlers = () => {
        on("chat:message", handleInput);
        on("change:graphic", handleBarValueChange);
        if ("undefined" !== typeof TokenMod && TokenMod.ObserveTokenChange) {
          TokenMod.ObserveTokenChange(handleBarValueChange);
        }
      },
      setDefaults = (reset) => {
        const defaults = {
          config: {
            command: "gw",
            bar: 1,
            firsttime: reset ? false : true,
          },
        };

        if (!state[state_name].config) {
          state[state_name].config = defaults.config;
        } else {
          if (!state[state_name].config.hasOwnProperty("command")) {
            state[state_name].config.command = defaults.config.command;
          }
          if (!state[state_name].config.hasOwnProperty("bar")) {
            state[state_name].config.bar = defaults.config.bar;
          }
        }

        if (state[state_name].config.firsttime) {
          sendConfigMenu(true);
          state[state_name].config.firsttime = false;
        }
      },
      getData = () => {
        if (typeof compendium === "undefined") {
          log("The compendium is not installed");
          return false;
        }
        return compendium;
        // return {}
      };

    return {
      CheckInstall: checkInstall,
      ObserveTokenChange: observeTokenChange,
      RegisterEventHandlers: registerEventHandlers,
      GetData: getData,
    };
  })();

on("ready", function () {
  "use strict";

  GW3Companion.CheckInstall();
  GW3Companion.RegisterEventHandlers();
});
