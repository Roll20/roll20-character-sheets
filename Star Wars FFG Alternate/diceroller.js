/*
 Current Version: 6.3.1
 Last updated: 04.06.2020
 Character Sheet and Script Maintained by: Samuel T.
 Older Verions: https://github.com/dayst/StarWarsEdgeOfTheEmpire_Dice

 6.3.1:  Added rollRandomCritical

 Credits:
 Original creator: Konrad J.
 Helped with Dice specs: Alicia G. and Blake the Lake
 Dice graphics hosted by Alicia G. at galacticcampaigns.com
 Dice graphics borrowed from the awesome google+ hangouts EotE Dice App
 Basic Character Sheet and Advanced Dice Roller: Steve Day
 GM Sheet Campaign Details design inspiration: www.reddit.com/user/JohnSquiggleton
 Sheet Autocreator: www.reddit.com/user/lowdownfool
 New Tab Labels: Steve D., GM Knowledge Rhino, and Loki
 Skill Description by: Gribble - https://dl.dropboxusercontent.com/u/9077657/SW-EotE-Reference-Sheets.pdf
 Critical Descriptions by: Gribble - https://dl.dropboxusercontent.com/u/9077657/SW-EotE-Reference-Sheets.pdf
 Debugger: Arron
 Basic Roll Templates for basic rolls: Josh A.
 Initiative Roller: Andrew H.
 Opposed Roller: Tom F.
 Method to hide depreciated Vehicle Tabs: Phil B.
 Work done by GM Knowledge Rhino:
 Group Tab
 Companion Tab
 GM Resources
 Redesign of Vehicle Tab
 Riding Beast Display
 Roll Template Code Fixes
 Roll Templates integrated with all Rolls
 Overencumbrance roll notification
 Work done by Samuel T.:
 Versions 4.0.10.0 - 6.3.0 b5
 SuggestionEngine
 NPC Sheet
 Initiative fix
 Label generation fix
 Semantic Versioning
 Consolidated the Dice Ppol and Destiny Sections
 Collapsing sections
 Optgroups for dropdowns

 API Chat Commands
 Settings:
 Log
 * default: 'on' and 'single'
 * Description: Sets the visual output in the chat window for the dice rolls
 * Command: !eed log on|off|multi|single

 Graphics
 * default: 'on' and 'm'
 * Description: Sets chat window dice output as graphic, small, medium, or large if "on" or as text if "off"
 * Command: !eed graphics on|off|s|m|l

 Test
 * Description: Output every side of every die to the chat window
 * !eed test

 Debug
 * default: 'off'
 * DescriptionL Sets the logging level of the script in the API console.  If you are having issues with the
 * script rolling incorrect dice, turn on debug logging and post the result in the forums. No need to restart the
 * script with this command.
 * Command: !eed debug on|off

 GM Sheet Settings:
 SuggestionDisplay
 * Description: Sets the state of the skill_suggestion_setting_display status on the DicePool
 * Command: !eed suggestionDisplay none|whisper|always

 Fear
 * Description: Sets the state of the Fear check status on the DicePool
 * Command: !eed fear on|off

 Roll:
 Label
 * default: null
 * Description: set the skill name of the roll
 * Command: !eed label(Name of Skill)

 Initiative
 * default: false
 * Description: Set NPC/PC initiative true
 * Command: !eed npcinit or pcinit and #b #g #y #blk #p #r #w

 Skill
 * default:
 * Description: create the ability and proficiency dice for a skill check
 * Command: !eed skill(char_value|skill_value)

 Opposed
 * default:
 * Description: create the difficulty and challenge dice for an opposed skill check
 * Command: !eed opposed(char_value|skill_value|[NPC minion group size]|[Is skill a minion skill])

 Dice
 * default:
 * Description: Loop thru the dice and adds or subtracts them from the dice object
 * Command: !eed #g #y #b #blk #r #p #w #s #a

 Upgrade
 * default:
 * Description: upgrades ability and difficulty dice
 * Command: !eed upgrade(ability|#) or upgrade(difficulty|#)

 Downgrade
 * default:
 * Description: downgrades proficiency and challenge dice
 * Command: !eed downgrade(proficiency|#) or downgrade(challenge|#)

 Destiny
 * default:
 * Description: Rolls 1w die and adds the result to the destiny pool
 * Command: !eed #w destiny doRoll

 Other:
 Charsheet
 * default:
 * Description: Generates a blank character sheet and automatically makes it viewable and editable by the person calling the script.
 * Command: !charsheet
 */

/* Define functions that may not always exist */
if(!log) {
  log = function(input) {
      console.log(input);
  }
}

if (!sendChat) {
  sendChat = function (sender, msg) {
      log(sender + " says " + msg);
  }
}
/* End special function definitions*/


/* Begin Sheet Character Sheet Auto Creator */
var Charsheet = Charsheet || {};

on('chat:message', function (msg) {
  // Exit if not an api command
  if (msg.type != "api") {
      return;
  }
  if (msg.content.indexOf('!charsheet') != -1) {
      Charsheet.Generate(msg);
  }
});

Charsheet.Generate = function (msg) {
  var player = msg.who;
  var character_name = msg.who + Date.now();

  var character = createObj('character', {
      name: character_name,
      inplayerjournals: msg.playerid,
      controlledby: msg.playerid
  });
  /* Create attributes */
  createObj('attribute', {
      name: 'player_name',
      current: player,
      _characterid: character.id
  });
  createObj('attribute', {
      name: 'name',
      current: character_name,
      _characterid: character.id
  });
  sendChat("Dice System", "/w " + msg.who + " a blank character sheet was created for you named \"" + character_name);
  sendChat("GM", "/w " + "gm " + "A blank character sheet was created for " + msg.who);
};

if (!Date.now) {
  Date.now = function now() {
      return new Date().getTime();
  };
}
/* End Sheet Character Sheet Auto Creator */

function SuggestionEngine () {
  var that = this;

  var flags = {
      displayOption: null,
      generalSuggesting: true,
      combatSuggesting: true,
      combatType: null,
      isFearCheck: false
  };

  function convertToBoolean (value) {
      // will trap the following properly: false, true, "false", "true", 0, 1, "", and undefined
      //noinspection RedundantConditionalExpressionJS
      return !value || value == 1 || value === 'true';
  }

  this.suggestions = {
      special: {
          fear: {
              allowedSkills: [
                  "Cool",
                  "Discipline"
              ],
              success: [
                  {
                      text: "The character avoids any fear effects, except those triggered by threats",
                      required: 1
                  }
              ],
              advantage: [
                  {text: "Gain $BOOST$ on the character's first check.", required: 1},
                  {
                      text: "If spending multiple $ADVANTAGE$, grant $BOOST$ to an additional player's first check.",
                      required: 2
                  }
              ],
              triumph: [
                  {
                      text: "Can be spent to cancel all previous penalties from fear checks, or",
                      required: 1
                  },
                  {
                      text: "Spent to ensure the character need not make any additional fear checks during the encounter, no matter the source.",
                      required: 1
                  }
              ],
              failure: [
                  {
                      text: "The character adds $SETBACK$ to each action he takes during the encounter.",
                      required: 1
                  }
              ],
              threat: [
                  {
                      text: "The character suffers a number of strain equal to the number of $FAILURE$.",
                      required: 1
                  },
                  {
                      text: "If the check generates $THREAT$$THREAT$$THREAT$+, the character can be staggered for his first turn, instead.",
                      required: 3
                  }
              ],
              despair: [
                  {
                      text: "The character is incredibly frightened and increases the difficulty of all checks until the end of the encounter by one.",
                      required: 1
                  }
              ]
          }
      },
      general: {
          Astrogation: {
              success: [
                  {
                      text: "Better target for the destination, e.g.: place vessel directly into orbit around target planet.",
                      required: 1
                  },
                  {text: "Reduce time spent calculating.", required: 1}
              ],
              advantage: [
                  {text: "Reduce travel time.", required: 1},
                  {text: "Identify convenient stopovers to resupply or conduct additional business.", required: 1}
              ],
              triumph: [
                  {text: "Complete calculations in minimum time.", required: 1},
                  {text: "Greatly reduce travel time.", required: 1},
                  {text: "Reveal highly valuable but previously unknown information.", required: 1}
              ],
              threat: [
                  {text: "Decrease accuracy of hyperspace jump.", required: 1},
                  {text: "Increase travel time.", required: 1},
                  {text: "Miss relevant details when analyzing hyperspace routes or galactic maps.", required: 1}
              ],
              despair: [
                  {text: "Greatly decrease accuracy of hyperspace jump.", required: 1},
                  {text: "Greatly increase travel time.", required: 1},
                  {
                      text: "Miss large amounts of relevant details when analyzing hyperspace routes or galactic maps.",
                      required: 1
                  },
                  {
                      text: "Trigger something truly awful happening, such as jumping out of hyperspace in the path of an asteroid.",
                      required: 1
                  }
              ]
          },
          Athletics: {
              success: [
                  {text: "Reduce time required.", required: 1},
                  {text: "Increase distance travelled.", required: 1}
              ],
              advantage: [
                  {
                      text: "Generate bonus on other physical checks performed later or by allies that turn.",
                      required: 1
                  },
                  {
                      text: "Spend $ADVANTAGE$$ADVANTAGE$ to grant additional maneuver during turn to move or perform physical activity.",
                      required: 2
                  }
              ],
              triumph: [
                  {text: "Perform the check with truly impressive results.", required: 1}
              ],
              threat: [
                  {text: "Small amounts cause strain.", required: 1},
                  {
                      text: "Larger amounts may cause character to fall prone, or even suffer a wound from sprains and bruises.",
                      required: 1
                  }
              ],
              despair: [
                  {
                      text: "Inflict a Critical Injury, which the GM can choose to be thematic or roll randomly.",
                      required: 1
                  }
              ]
          },
          Charm: {
              success: [
                  {
                      text: "Gain an extra scene in which target is willing to support you for each additional success.",
                      required: 1
                  }
              ],
              advantage: [
                  {text: "Affect unexpected subjects beyond the original target.", required: 1}
              ],
              triumph: [
                  {text: "Have target NPC become recurring character who remains predisposed to assist.", required: 1}
              ],
              threat: [
                  {text: "Reduce the number of people able to influence", required: 1},
                  {text: "Turn those affected negatively against character.", required: 1}
              ],
              despair: [
                  {text: "Turn NPC against character and make into a minor recurring adversary.", required: 1}
              ]
          },
          Coercion: {
              success: [
                  {text: "Spend 2 extra successes to inflict one strain on target. ", required: 2}
              ],
              advantage: [
                  {text: "Affect unexpected subjects beyond the original target.", required: 1}
              ],
              triumph: [
                  {text: "Shift allegiance of target.", required: 1}
              ],
              threat: [
                  {text: "Target has building resentment towards character.", required: 1}
              ],
              despair: [
                  {text: "Reveal something about goals and motivations to target.", required: 1}
              ]
          },
          Computers: {
              success: [
                  {text: "Reduce time required.", required: 1}
              ],
              advantage: [
                  {text: "Uncover additional information about the system.", required: 1}
              ],
              triumph: [
                  {
                      text: "Obfuscate actions taken, add a $CHALLENGE$ to any check to detect or identify the characters actions.",
                      required: 1
                  }
              ],
              threat: [
                  {
                      text: "The character does a poor job of concealing his presence in the system. Security systems are alerted, and add $BOOST$ to the check of any NPC attempting to discover evidence of his actions.",
                      required: 1
                  }
              ],
              despair: [
                  {
                      text: "Leave behind trace information of your own system in the system being sliced. Add $BOOST$ to the check of any NPC using the target system to slice the character's system.",
                      required: 1
                  }
              ]
          },
          Cool: {
              advantage: [
                  {text: "Gain an additional insight into the situation at hand.", required: 1}
              ],
              triumph: [
                  {text: "Heal 3 strain.", required: 1}
              ],
              threat: [
                  {text: "Miss a vital detail or event.", required: 1}
              ],
              despair: [
                  {text: "The character is overwhelmed by the chaos and is stunned for one round.", required: 1}
              ]
          },
          Coordination: {
              success: [
                  {text: "Reduce time required.", required: 1},
                  {text: "Increase distance travelled by 25%, (maximum 100% increase).", required: 1}
              ],
              advantage: [
                  {text: "Spend $ADVANTAGE$$ADVANTAGE$ to grant additional maneuver during turn.", required: 2}
              ],
              triumph: [
                  {text: "Perform the check with truly impressive results.", required: 1}
              ],
              threat: [
                  {text: "Lose free maneuver for one round.", required: 1}
              ],
              despair: [
                  {text: "Suffer a wound", required: 1},
                  {text: "Lose a vital piece of equipment.", required: 1}
              ]
          },
          Deception: {
              success: [
                  {text: "Extend duration of Deceit action.", required: 1}
              ],
              advantage: [
                  {text: "Increase the value of any goods or services gained through the action.", required: 1}
              ],
              triumph: [
                  {
                      text: "Fool the target into believing the character is trustworthy - future Deceit checks against target do not require an opposed check.",
                      required: 1
                  }
              ],
              threat: [
                  {text: "Give away a portion of the lie, making target suspicious.", required: 1}
              ],
              despair: [
                  {
                      text: "Target realises he has been lied to and spreads word of his deceit to harm his reputation or uses the situation to his advantage.",
                      required: 1
                  }
              ]
          },
          Discipline: {
              success: [
                  {text: "Downgrade difficulty of the dice pool for next action (max. 1).", required: 1}
              ],
              advantage: [
                  {text: "Gain an additional insight into the situation at hand.", required: 1}
              ],
              triumph: [
                  {
                      text: "Add $BOOST$ to any Discipline checks made by allies during the following round.",
                      required: 1
                  }
              ],
              threat: [
                  {
                      text: "Undermine the characters resolve, perhaps inflicting a penalty on further actions in distressing circumstances.",
                      required: 1
                  }
              ],
              despair: [
                  {
                      text: "The character is overwhelmed entirely and is unable to perform more than one maneuver next round.",
                      required: 1
                  }
              ]
          },
          Leadership: {
              success: [
                  {text: "Extend target's support for additional scenes.", required: 1},
                  {text: "Increase efficiency or effectiveness of target during ordered actions.", required: 1}
              ],
              advantage: [
                  {text: "Affect bystanders in addition to target.", required: 1}
              ],
              triumph: [
                  {
                      text: "Have target NPC become recurring character who decides to faithfully follow the acting character.",
                      required: 1
                  }
              ],
              threat: [
                  {
                      text: "Decrease the efficiency of ordered actions, causing them to take longer or be done poorly.",
                      required: 1
                  }
              ],
              despair: [
                  {
                      text: "Undermine the character's authority, damaging the characters ability to command target or those who witnessed the attempt.",
                      required: 1
                  },
                  {
                      text: "With multiple $DESPAIR$ the target may become a recurring thorn in the character's side,refusing future orders or turning others against the character.",
                      required: 2
                  }
              ]
          },
          Mechanics: {
              success: [
                  {text: "Reduce time required by 10-20%", required: 1}
              ],
              advantage: [
                  {
                      text: "Grant $BOOST$ on checks when using repaired item, or even the Superior quality, for a session.",
                      required: 1
                  }
              ],
              triumph: [
                  {text: "Give device additional single use function.", required: 1}
              ],
              threat: [
                  {
                      text: "Particularly shoddy repairs or temporary measures, the GM may spend $THREAT$ to cause the target object or system to malfunction shortly after check completed.",
                      required: 1
                  }
              ],
              despair: [
                  {text: "Cause further harm to target object or system.", required: 1},
                  {text: "Cause other components of target to malfunction.", required: 1}
              ]
          },
          Medicine: {
              success: [
                  {text: "Target recovers one additional wound.", required: 1},
                  {text: "Reduce healing time by one hour.", required: 1}
              ],
              advantage: [
                  {text: "Eliminate one strain from target.", required: 1}
              ],
              triumph: [
                  {
                      text: "Heal additional wounds while attempting to heal Critical Injury, or vice versa.",
                      required: 1
                  }
              ],
              threat: [
                  {text: "Inflict strain on the target due to shock of procedure.", required: 1},
                  {text: "Increase time procedure takes.", required: 1}
              ],
              despair: [
                  {text: "A truly terrible accident, perhaps inflicting further wounds on target.", required: 1}
              ]
          },
          Negotiation: {
              success: [
                  {text: "Increase acting character's profit by 5%.", required: 1},
                  {text: "Modify scope of agreement.", required: 1}
              ],
              advantage: [
                  {
                      text: "Earn unrelated boons from target, concessions if failed or extra perks if passed.",
                      required: 1
                  }
              ],
              triumph: [
                  {text: "Have target NPC become regular client or specialist vendor.", required: 1}
              ],

              threat: [
                  {text: "Increase cost of goods purchased.", required: 1},
                  {text: "Decrease value of goods sold.", required: 1},
                  {text: "Shorten contracts negotiated.", required: 1}
              ],
              despair: [
                  {
                      text: "Seriously sabotage goals during the interaction, perhaps receive counterfeit goods or payment, or agree to terms entirely beyond scope of negotiation.",
                      required: 1
                  }
              ]
          },
          Perception: {
              success: [
                  {text: "Reveal additional details.", required: 1}
              ],
              advantage: [
                  {text: "Recall additional information associated with object noticed.", required: 1}
              ],
              triumph: [
                  {
                      text: "Notice details that can be useful later to gain $BOOST$ on future interactions with noticed object.",
                      required: 1
                  }
              ],
              threat: [
                  {text: "Conceal a vital detail about situation or environment.", required: 1}
              ],
              despair: [
                  {text: "Obtain false information about surroundings or target.", required: 1}
              ]
          },
          PilotingPlanetary: {
              success: [
                  {text: "Gain insights into situation.", required: 1},
                  {text: "Deduce way to modify vehicle to make it more effective in future.", required: 1}
              ],
              advantage: [
                  {
                      text: "Reveal vulnerability in opponent's piloting style or vehicle, giving benefit in later rounds.",
                      required: 1
                  }
              ],
              triumph: [
                  {text: "Grant additional maneuver while continuing to pilot vehicle.", required: 1}
              ],
              threat: [
                  {
                      text: "Spend $THREAT$$THREAT$ to give opponents $BOOST$ on checks against character and vehicle due to momentary malfunction in system.",
                      required: 2
                  }
              ],
              despair: [
                  {
                      text: "Deal damage to vehicle as character strains systems throughout vehicle during check.",
                      required: 1
                  }
              ]
          },
          PilotingSpace: {
              success: [
                  {text: "Gain insights into situation.", required: 1},
                  {text: "Deduce way to modify vehicle to make it more effective in future.", required: 1}
              ],
              advantage: [
                  {
                      text: "Reveal vulnerability in opponent's piloting style or vehicle, giving benefit in later rounds.",
                      required: 1
                  }
              ],
              triumph: [
                  {text: "Grant additional maneuver while continuing to pilot vehicle.", required: 1}
              ],
              threat: [
                  {
                      text: "Spend $THREAT$$THREAT$ to give opponents $BOOST$ on checks against character and vehicle due to momentary malfunction in system.",
                      required: 2
                  }
              ],
              despair: [
                  {
                      text: "Deal damage to vehicle as character strains systems throughout vehicle during check.",
                      required: 1
                  }
              ]
          },
          Resilience: {
              success: [
                  {text: "Extend effects of the success to increase time between checks.", required: 1}
              ],
              advantage: [
                  {text: "Identify way to reduce difficulty of future checks against same threat.", required: 1}
              ],
              triumph: [
                  {text: "Recover 3 strain.", required: 1}
              ],
              threat: [
                  {text: "Overburden the character, inflicting penalties on subsequent checks.", required: 1}
              ],
              despair: [
                  {
                      text: "Inflict a wound or minor Critical Injury on character, as they succumb to harsh conditions.",
                      required: 1
                  }
              ]
          },
          Skulduggery: {
              success: [
                  {text: "Gain additional insights about nature of opposition.", required: 1}
              ],
              advantage: [
                  {text: "Identify additional potential target.", required: 1}
              ],
              triumph: [
                  {text: "Earn an unexpected boon.", required: 1}
              ],
              threat: [
                  {
                      text: "Opportunity to catch character immediately after act, number of $THREAT$ determine immediacy of discovery and ensuing danger.",
                      required: 1
                  }
              ],
              despair: [
                  {text: "Leave behind evidence of larceny.", required: 1}
              ]
          },
          Stealth: {
              success: [
                  {text: "Assist allied character infiltrating at same time.", required: 1}
              ],
              advantage: [
                  {text: "Decrease time taken to perform action while hidden.", required: 1}
              ],
              triumph: [
                  {text: "Identify way to completely distract opponent for duration of scene.", required: 1}
              ],
              threat: [
                  {text: "Increase time taken to perform action while hidden by 20%.", required: 1}
              ],
              despair: [
                  {text: "Leave behind evidence of passing, concerning identity and possibly motive.", required: 1}
              ]
          },
          Streetwise: {
              success: [
                  {text: "Reduce time or funds required to obtain item, information or service.", required: 1}
              ],
              advantage: [
                  {text: "Reveal additional rumours or alternative sources.", required: 1}
              ],
              triumph: [
                  {text: "Gain semi-permanent contact on street.", required: 1}
              ],
              threat: [
                  {text: "Seed gathered information with minor falsehoods.", required: 1}
              ],
              despair: [
                  {text: "Character lets slip details about self or information sought.", required: 1}
              ]
          },
          Survival: {
              success: [
                  {text: "Assist other character in surviving.", required: 1},
                  {text: "Stockpile goods to increase time between checks.", required: 1}
              ],
              advantage: [
                  {text: "Gain insight into environment to make future checks simpler.", required: 1},
                  {
                      text: "When tracking, learn significant detail about target, such as number, species or how recently tracks were made.",
                      required: 1
                  }
              ],
              triumph: [
                  {
                      text: "When handling domesticated animal, predispose animal towards character earning loyal companion.",
                      required: 1
                  },
                  {text: "When tracking, learn vital clue about target.", required: 1}
              ],
              threat: [
                  {text: "Spend vital resources (food, fuel, etc.) during check.", required: 1}
              ],
              despair: [
                  {text: "Inflict wounds, Critical Injuries or large amounts of strain on character.", required: 1}
              ]
          },
          Vigilance: {
              success: [
                  {text: "Character is particularly well prepared.", required: 1}
              ],
              advantage: [
                  {text: "Notice key environmental factor.", required: 1}
              ],
              triumph: [
                  {text: "Gain extra maneuver during first round of combat.", required: 1}
              ],
              threat: [
                  {text: "Miss key piece of information about situation or environment.", required: 1}
              ],
              despair: [
                  {
                      text: "The character is unable to perform more than one maneuver during first round of combat.",
                      required: 1
                  }
              ]
          }
      },
      combat: {
          /*TODO continue working on the combat skill suggestions*/
          personal: {
              AllowedSkills: [
                  "RangedLight",
                  "RangedHeavy",
                  "Melee",
                  "Brawl",
                  "Lightsaber",
                  "Gunnery"
              ],
              '1advantage1triumph': [
                  {text: "Recover 1 strain", advantage: 1, triumph: 1},
                  {text: "Add $BOOST$ to the next allied active character's next check.", advantage: 1, triumph: 1},
                  {text: "Notice a single important point in the ongoing conflict.", advantage: 1, triumph: 1},
                  {
                      text: "Inflict a Critical Injury with a successful attack that deals damage past soak. ($ADVANTAGE$ cost may vary)",
                      advantage: 1,
                      triumph: 1,
                      crit: true
                  }
              ],
              '2advantage1triumph': [
                  {text: "Activate a weapon quality ($ADVANTAGE$ cost may vary)", advantage: 2, triumph: 1},
                  {
                      text: "Perform an immediate free maneuver that does not exceed the two maneuver per turn limit",
                      advantage: 2,
                      triumph: 1
                  },
                  {text: "Add $SETBACK$ to the targeted character's next check.", advantage: 2, triumph: 1},
                  {
                      text: "Add $BOOST$ to any allied character's next check, including that of the active character.",
                      advantage: 2,
                      triumph: 1
                  }
              ],
              '3advantage1triumph': [
                  {
                      text: "Negate the targeted enemy's defensive bonuses until the end of turn",
                      advantage: 3,
                      triumph: 1
                  },
                  {
                      text: "Ignore penalizing environmental effects until the end of the active character's next turn.",
                      advantage: 3,
                      triumph: 1
                  },
                  {
                      text: "When dealing damage to a target, have the attack disable the opponent or one piece of gear rather than dealing wounds or strain.",
                      advantage: 3,
                      triumph: 1
                  },
                  {
                      text: "Gain +1 melee or ranged defense until the end of the active character's next turn",
                      advantage: 3,
                      triumph: 1
                  },
                  {
                      text: "Force the target to drop a melee or ranged weapon they are wielding.",
                      advantage: 3,
                      triumph: 1
                  }
              ],
              '1triumph': [
                  {text: "Upgrade the difficulty of the targeted character's next check.", triumph: 1},
                  {
                      text: "Upgrade any allied character's next check, including that of the current active character.",
                      triumph: 1
                  },
                  {text: "Do something vital, such as shooting the controls to the nearby blast doors.", triumph: 1}
              ],
              '2triumph': [
                  {
                      text: "When dealing damage to a target, had the attack destroyed a piece of equipment the target is using.",
                      triumph: 2
                  }
              ],
              '1threat1despair': [
                  {text: "The active character suffers 1 strain", threat: 1, despair: 1},
                  {text: "The active character looses the benefits of a prior maneuver", threat: 1, despair: 1}
              ],
              '2threat1despair': [
                  {text: "An opponent may immediately perform one free maneuver.", threat: 2, despair: 1},
                  {text: "Add $BOOST$ to the targeted character's next check", threat: 2, despair: 1},
                  {
                      text: "The active character or an allied character suffers a $SETBACK$ on their next action.",
                      threat: 2,
                      despair: 1
                  }
              ],
              '3threat1despair': [
                  {text: "The active character falls prone.", threat: 3, despair: 1},
                  {
                      text: "The active character grants the enemy a significant advantage in the ongoing encounter.",
                      threat: 3,
                      despair: 1
                  }
              ],
              '1despair': [
                  {text: "The character's ranged weapon immediately runs out of ammunition.", despair: 1},
                  {
                      text: "Upgrade the difficulty of an allied character's next check, including the active character.",
                      despair: 1
                  },
                  {text: "The tool or melee weapon the character is using becomes damaged.", despair: 1}
              ]
          },
          vehicle: {
              AllowedSkills: [
                  "RangedHeavy",
                  "Gunnery",
                  "PilotingSpace",
                  "PilotingPlanetary"

              ],
              '1advantage1triumph': [
                  {
                      text: "Add $BOOST$ to the next allied active character's Piloting, Gunnery, Computers, or Mechanics check.",
                      advantage: 1,
                      triumph: 1
                  },
                  {text: "Notice a single important point in the ongoing conflict.", advantage: 1, triumph: 1},
                  {
                      text: "Inflict a Critical Hit with successful attack that deals damage past armor ($ADVANTAGE$ cost may vary)",
                      advantage: 1,
                      triumph: 1,
                      crit: true
                  }
              ],
              '2advantage1triumph': [
                  {text: "Activate a weapon quality ($ADVANTAGE$ cost may vary", advantage: 2, triumph: 1},
                  {
                      text: "Perform an immediate free maneuver, provided the active character has not already performed two maneuvers in that turn.",
                      advantage: 2,
                      triumph: 1
                  },
                  {
                      text: "Add $SETBACK$ to the targeted character's next Piloting or Gunnery check.",
                      advantage: 2,
                      triumph: 1
                  },
                  {
                      text: "Add $BOOST$ to any allied character's next Piloting, Gunnery, Computers or Mechanics check, including the active character,",
                      advantage: 2,
                      triumph: 1
                  }
              ],
              '3advantage1triumph': [
                  {
                      text: "When dealing damage to an opposing vehicle or ship, have the shot temporarily damage a component of the attacker's choice rather than deal hull damage or system strain.",
                      advantage: 3,
                      triumph: 1
                  },
                  {
                      text: "Ignore penalizing terrain or stellar phenomena until the end of the active character's next turn.",
                      advantage: 3,
                      triumph: 1
                  },
                  {
                      text: "If piloting the ship, perform one free Pilot Only maneuver (provided it does not break the limit of maximum number of Pilot Only maneuvers in a turn).",
                      advantage: 3,
                      triumph: 1
                  },
                  {
                      text: "Force the target ship or vehicle to veer off, breaking any Aim or Stay on Target maneuvers.",
                      advantage: 3,
                      triumph: 1
                  }
              ],
              '1triumph': [
                  {
                      text: "Upgrade the difficulty of the targeted character's next Piloting or Gunnery check.",
                      triumph: 1
                  },
                  {
                      text: "Upgrade any allied character's next Piloting, Gunnery, Computers or Mechanics check.",
                      triumph: 1
                  }
              ],
              '2triumph': [
                  {text: "Destroy an important component when dealing damage.", triumph: 2}
              ],
              '1threat1despair': [
                  {
                      text: "If piloting a ship, sudden maneuvers force the ship to slow down by 1 point of speed.",
                      threat: 1,
                      despair: 1
                  },
                  {text: "The active character looses the benefits of a prior maneuver.", threat: 1, despair: 1},
                  {
                      text: "The character's active ship suffers 1 system strain. (This option may be selected multiple times)",
                      threat: 1,
                      despair: 1
                  }
              ],
              '2threat1despair': [
                  {text: "An opponent may immediately perform one free maneuver.", threat: 2, despair: 1},
                  {
                      text: "Add $BOOST$ to the targeted character's next Piloting or Gunnery Check",
                      threat: 2,
                      despair: 1
                  },
                  {
                      text: "The active character or allied character suffers $SETBACK$ on their next action.",
                      threat: 2,
                      despair: 1
                  }
              ],
              '3threat1despair': [
                  {
                      text: "The initiative currently being used drops below the last slot in the round.",
                      threat: 3,
                      despair: 1
                  },
                  {text: "The enemy gains a significant advantage in the ongoing encounter.", threat: 3, despair: 1},
                  {
                      text: "The primary weapon system of the active character's ship (or weapon the character is manning if acting as a gunner) suffers a Component Critical Hit.",
                      despair: 1
                  }
              ],
              '1despair': [
                  {
                      text: "Upgrade the difficulty of an allied character's next Gunnery, Piloting, computers or Mechanics check.",
                      despair: 1
                  },
                  {
                      text: "The active character's ship suffers a minor collision either with one of their opponents within close range or with the terrain around them.",
                      despair: 1
                  },
                  {
                      text: "The active character's ship suffers a major collision either with one of their opponents within close range or with the terrain around them.",
                      despair: 1,
                      failed: true
                  }
              ]
          }
      }
  };

  this.enum = {
      types: {
          general: {number:0, text:"general"},
          combat: {number:1, text:"combat"}
      },
      displayOptions: {
          none: {number:0, text:"none"},          // Suggestions are not displayed
          whisper: {number:1, text:"whisper"},    // Suggestions are whispered to the GM
          always: {number:2, text:"always"}       // Suggestions are included in the dice roll result
      },
      combatType: {
          personal: {number:0, text:"personal"},
          vehicle: {number:1, text:"vehicle"}
      }
  };

  this.setDisplayOption = function (input) {
      if (input == null || input === "")
          return;

      var flag = null;
      if (flag = that.enum.isValidInput(input, that.enum.displayOptions))
          flags.displayOption = flag;
  };

  this.getDisplayOption = function () {
      return flags.displayOption;
  };

  this.setGeneralSuggestions = function (input) {
      if (input == null || input === "")
          return;
      log("input="+input);

      flags.generalSuggesting = convertToBoolean(input);
      log("flags.generalSuggesting="+flags.generalSuggesting);
  };

  this.getGeneralSuggesting = function () {
      return flags.generalSuggesting;
  };

  this.setCombatSuggestions = function (input) {
      if (input == null || input === "")
          return;
      log("input="+input);
      flags.combatSuggesting = convertToBoolean(input);
      log("flags.combatSuggesting="+flags.combatSuggesting);
  };

  this.getCombatSuggesting = function () {
      return flags.combatSuggesting;
  };

  this.setIsFearCheck = function (input) {
      if (input == null || input === "")
          return;

      flags.isFearCheck = convertToBoolean(input);
  };

  this.getIsFearCheck = function () {
      return flags.isFearCheck;
  };

  this.setCombatType = function (input) {
      if (input == null || input === "") {
          flags.combatType = null;
          return;
      }

      var flag = null;
      if (flag = that.enum.isValidInput(input, that.enum.combatType))
          flags.combatType = flag;
  };

  this.getCombatType = function () {
      return flags.combatType;
  };

  this.enum.isValidInput = function (input, enumToUse) {
      if (input == null || input === "" || !enumToUse)
          return;

      var retVal = null;

      Object.keys(enumToUse).some(function(key) {
          var object = enumToUse[key];

          if (input == object || input === object.text || input === object.number) {
              return retVal = object;
          }
      });

      return retVal;
  };

  this.enum.mapTextToNumber = function (input, enumToUse) {
      if (input == null || input === "")
          return;

      var flag = null;
      if (flag = that.enum.isValidInput(input, enumToUse))
          return flag.number;
  };

  this.enum.mapNumberToText = function (input, enumToUse) {
      if (input == null || input === "")
          return;

      var flag = null;
      if (flag = that.enum.isValidInput(input, enumToUse))
          return flag.text;
  };


  /* Suggestion Handling */
  function addSkillSuggestionsFromArray (diceObj, array, key, rollResultForSymbol, suggestionsType) {
      for (var i = 0; i < array.length; i++) {
          if (array[i].required <= rollResultForSymbol) {
              suggestionsType[key] += "<li>" + array[i].text + "</li>";
              diceObj.vars.suggestions.suggestionsExist = true;
          }
      }
      return diceObj;
  }

  function buildSuggestionSet (suggestionSet, symbol, rollResultForSymbol, suggestionJSON) {
      if (suggestionSet == null)
          suggestionSet = new Set();

      var item = {};
      for (var i = 0; i < suggestionJSON.length; i++) {
          item = suggestionJSON[i];
          if (item.hasOwnProperty(symbol) && item[symbol] <= rollResultForSymbol) {
              suggestionSet.add(item.text);
          }
      }

      return suggestionSet;
  }

  function buildCombatSuggestions (diceObj, symbol, rollResultForSymbol, suggestionJSON) {
      var suggestionSet = null;
      var spendingSuggestions = diceObj.vars.suggestions;
      Object.keys(suggestionJSON).forEach(function(property) {
          if (property === "AllowedSkills")
              return;

          suggestionSet = spendingSuggestions.combat[property];
          suggestionSet = buildSuggestionSet(suggestionSet, symbol, rollResultForSymbol, suggestionJSON[property]);

          if (suggestionSet.size > 0) {
              spendingSuggestions.suggestionsExist = true;
              spendingSuggestions.combat[property] = suggestionSet;
          }
      });

      return diceObj;
  }

  function buildRollTemplateItem (key, value) {
      return "{{" + key + "=<ul>" + value + "</ul>}}";
  }

  function generateSuggestions (diceObj, symbol, rollResultForSymbol) {
      var skillName = diceObj.vars.skillName;

      var combatType = flags.combatType;
      if (flags.combatSuggesting && combatType) {
          var combatSkills = that.suggestions.combat;
          var personal = that.enum.combatType.personal;
          var vehicle = that.enum.combatType.vehicle;
          if (combatType == personal)
          {
              diceObj = buildCombatSuggestions(diceObj, symbol, rollResultForSymbol, combatSkills.personal);
          }
          else if (combatType == vehicle)
          {
              diceObj = buildCombatSuggestions(diceObj, symbol, rollResultForSymbol, combatSkills.vehicle);
          }
      } else if (flags.generalSuggesting) {
          var generalSkills = that.suggestions.general;
          if (generalSkills.hasOwnProperty(skillName)) {
              var skill = generalSkills[skillName];
              var fearJSON = (diceObj.vars.isFearCheck ? that.suggestions.special.fear : null);

              if (skill.hasOwnProperty(symbol)) {
                  diceObj = addSkillSuggestionsFromArray(diceObj, skill[symbol], symbol, rollResultForSymbol, diceObj.vars.suggestions.general);
              }

              if (fearJSON && fearJSON.allowedSkills.indexOf(skillName)) {
                  diceObj = addSkillSuggestionsFromArray(diceObj, fearJSON[symbol], symbol, rollResultForSymbol, diceObj.vars.suggestions.general);
              }
          }
      }
      return diceObj;
  }

  this.processSuggestions = function(diceObj) {
      if (flags.displayOption === that.enum.displayOptions.none)
          return diceObj;

      diceObj.vars.suggestions = {
          general: {
              success: "",
              advantage: "",
              triumph: "",
              failure: "",
              threat: "",
              despair: ""
          },
          combat: {
              '1advantage1triumph': null,
              '2advantage1triumph': null,
              '3advantage1triumph': null,
              '1triumph': null,
              '2triumph': null,
              '1threat1despair': null,
              '2threat1despair': null,
              '3threat1despair': null,
              '1despair': null,
              '2despair': null
          },
          suggestionsExist: false
      };


      var failedCheck = !diceObj.totals.success > 0;
      Object.keys(diceObj.totals).forEach(function(key) {
          var rollResultForSymbol = diceObj.totals[key];
          if (rollResultForSymbol > 0) {
              diceObj = generateSuggestions(diceObj, key, rollResultForSymbol, failedCheck);
          }
      });

      return diceObj;
  };

  this.buildSuggestionsRollTemplate = function (diceObj) {
      var suggestions = diceObj.vars.suggestions;
      var suggestionsRollTemplate = "";

      // display results shown to character owners and GM
      Object.keys(suggestions).forEach(function (property) {
          if (property === "suggestionsExist")
              return;

          var propertyObject = suggestions[property];
          Object.keys(propertyObject).forEach(function(symbol) {
              var object = propertyObject[symbol];

              if (!object)
                  return;

              if (typeof object === "string")
                  suggestionsRollTemplate += buildRollTemplateItem(symbol, object);
              else if (object.size > 0) {
                  var suggestionList = "";
                  object.forEach(function (value) {
                      suggestionList += "<li>" + value + "</li>";
                  });
                  suggestionsRollTemplate += buildRollTemplateItem(symbol, suggestionList);
              }
          });
      });
      return suggestionsRollTemplate;
  }
}

/*TODO refactor eote to be swrpg*/
var eote = {};

eote.init = function () {
  eote.setCharacterDefaults();
  eote.createGMDicePool();
  eote.events();
  convertTokensToTags(suggestionEngine.suggestions, eote.defaults.graphics.SymbolicReplacement);
  attemptRegisterGMObj();
};


eote.defaults = {
  globalVars: {
      diceLogChat: true,
      diceGraphicsChat: true,
      diceGraphicsChatSize: 30,//medium size
      diceTextResult: "",
      diceTextResultLog: "",
      diceGraphicResult: "",
      diceGraphicResultLog: "",
      diceTestEnabled: false,
      diceLogRolledOnOneLine: true,
      scriptDebug: false
  },
  '-DicePoolID': '',
  GMSheet: {
      obj: null,
      name: "-DicePool"
  },
  character: {
      attributes: [
          /* Don't need to update characterID
           * 
           *{
           name : "characterID",
           current : "UPDATES TO CURRENT ID",
           max : "",
           update : false
           }*/
      ],
      abilities: []
  },
  graphics: {
      SIZE: {
          SMALL: 20,
          MEDIUM: 30,
          LARGE: 40
      },
      ABILITY: {
          BLANK: "https://i.imgur.com/g3hoJRG.png",
          A: "https://i.imgur.com/VG7HnFE.png",
          AA: "https://i.imgur.com/ynn0deR.png",
          S: "https://i.imgur.com/HnweiQT.png",
          SA: "https://i.imgur.com/iVXuNKP.png",
          SS: "https://i.imgur.com/IVDgDKo.png"
      },
      BOOST: {
          BLANK: "https://i.imgur.com/nlIAfJx.png",
          A: "https://i.imgur.com/d6X6QEs.png",
          AA: "https://i.imgur.com/EqMcrlF.png",
          S: "https://i.imgur.com/vrt51oP.png",
          SA: "https://i.imgur.com/r9xl3CP.png"
      },
      CHALLENGE: {
          BLANK: "https://i.imgur.com/GInMHEN.png",
          F: "https://i.imgur.com/zKdsTV9.png",
          FF: "https://i.imgur.com/QcZXdpS.png",
          FT: "https://i.imgur.com/wxV072J.png",
          T: "https://i.imgur.com/n2rgehM.png",
          TT: "https://i.imgur.com/SaWvZMV.png",
          DESPAIR: "https://i.imgur.com/5EppLES.png"
      },
      DIFFICULTY: {
          BLANK: "https://i.imgur.com/oxbKghK.png",
          F: "https://i.imgur.com/rujbVt9.png",
          FF: "https://i.imgur.com/VUj86X2.png",
          FT: "https://i.imgur.com/l8rUPCX.png",
          T: "https://i.imgur.com/2gLDiqq.png",
          TT: "https://i.imgur.com/4wqEJsa.png"
      },
      FORCE: {
          D: "https://i.imgur.com/8kBnDI1.png",
          DD: "https://i.imgur.com/eki6Bnc.png",
          L: "https://i.imgur.com/JCI7Mgm.png",
          LL: "https://i.imgur.com/Z58SAHI.png"
      },
      PROFICIENCY: {
          BLANK: "https://i.imgur.com/4bQ0dY8.png",
          A: "https://i.imgur.com/PU7pp3w.png",
          S: "https://i.imgur.com/jXGG6L1.png",
          SA: "https://i.imgur.com/oQMDNdm.png",
          SS: "https://i.imgur.com/UDW3jYZ.png",
          AA: "https://i.imgur.com/jUA6PVw.png",
          TRIUMPH: "https://i.imgur.com/7zrDoEN.png"
      },
      SETBACK: {
          BLANK: "https://i.imgur.com/n9W07Lp.png",
          F: "https://i.imgur.com/jMV5VOB.png",
          T: "https://i.imgur.com/TYgM9LP.png"
      },
      SYMBOLS: {
          A: "https://i.imgur.com/Gav94H2.png",
          S: "https://i.imgur.com/z79ieDp.png",
          T: "https://i.imgur.com/o8EQ4z6.png",
          F: "https://i.imgur.com/y2qABhW.png",
          TRIUMPH: "https://i.imgur.com/1lJCfnB.png",
          DESPAIR: "https://i.imgur.com/rOEJlCc.png",
          L: "https://i.imgur.com/j5bV12H.png",
          D: "https://i.imgur.com/AZ3lzVj.png"
      },
      SymbolicReplacement: {}
  },
  regex: {
      cmd: /!eed/,
      log: /log (on|multi|single|off)/,
      debug: /debug (on|off)/,
      graphics: /graphics (on|off|s|m|l)/,
      test: /test/,
      resetdice: /(resetgmdice|resetdice)/,
      initiative: /\bnpcinit|\bpcinit/,
      characterID: /characterID\((.*?)\)/,
      rollPlayer: /rollPlayer(\(.*?\))/,
      label: /label\((.*?)\)/,
      skill: /skill\((.*?)\)/g,
      fear: /fear (on|off)/,
      suggestionDisplay: /suggestionDisplay (none|whisper|always)/,
      opposed: /opposed\((.*?)\)/g,
      upgrade: /upgrade\((.*?)\)/g,
      downgrade: /downgrade\((.*?)\)/g,
      gmdice: /\(gmdice\)/,
      encum: /encum\((.*?)\)/g,
      dice: /(-?\d{1,2}blk)\b|(-?\d{1,2}b)\b|(-?\d{1,2}g)\b|(-?\d{1,2}y)\b|(-?\d{1,2}p)\b|(-?\d{1,2}r)\b|(-?\d{1,2}w)\b|(-?\d{1,2}a)\b|(-?\d{1,2}s)|(-?\d{1,2}t)\b|(-?\d{1,2}f)/g,
      crit: /crit\((.*?)\)/,
      critShip: /critship\((.*?)\)/,
      unusable: /unusableWeapon/,
      destiny: /destiny (useDark|useLight|registerPlayer|sendUpdate|doRoll|clearPool)/,
      combat: /combat\(personal|vehicle\)/,
      calculateDamage: /calculateDamage\((.*?)\)/,
      rollEnemyCritical: /rollEmemyCritical/,      
      rollRandomCritical: /rollRandomCritical/
  },
  destinyListeners: []
};

var GMSheet = eote.defaults.GMSheet;
var suggestionEngine = new SuggestionEngine();

function buildReplacementObject (title, src, size) {
  return {matcher: new RegExp("\\$" + title.toUpperCase() + "\\$","g"), replacer: '<img src="' + src + '" title="' + title + '" height="' + size + '" width="' + size + '"/>'};
}

// dice symbols
eote.defaults.graphics.SymbolicReplacement.success = buildReplacementObject("success", eote.defaults.graphics.SYMBOLS.S, eote.defaults.graphics.SIZE.SMALL);
eote.defaults.graphics.SymbolicReplacement.advantage = buildReplacementObject("advantage", eote.defaults.graphics.SYMBOLS.A, eote.defaults.graphics.SIZE.SMALL);
eote.defaults.graphics.SymbolicReplacement.triumph = buildReplacementObject("triumph", eote.defaults.graphics.SYMBOLS.TRIUMPH, eote.defaults.graphics.SIZE.SMALL);
eote.defaults.graphics.SymbolicReplacement.failure = buildReplacementObject("failure", eote.defaults.graphics.SYMBOLS.F, eote.defaults.graphics.SIZE.SMALL);
eote.defaults.graphics.SymbolicReplacement.threat = buildReplacementObject("threat", eote.defaults.graphics.SYMBOLS.T, eote.defaults.graphics.SIZE.SMALL);
eote.defaults.graphics.SymbolicReplacement.despair = buildReplacementObject("despair", eote.defaults.graphics.SYMBOLS.DESPAIR, eote.defaults.graphics.SIZE.SMALL);

// dice icons
eote.defaults.graphics.SymbolicReplacement.ability = buildReplacementObject("ability", eote.defaults.graphics.ABILITY.BLANK, eote.defaults.graphics.SIZE.SMALL);
eote.defaults.graphics.SymbolicReplacement.boost = buildReplacementObject("boost", eote.defaults.graphics.BOOST.BLANK, eote.defaults.graphics.SIZE.SMALL);
eote.defaults.graphics.SymbolicReplacement.proficiency = buildReplacementObject("proficiency", eote.defaults.graphics.PROFICIENCY.BLANK, eote.defaults.graphics.SIZE.SMALL);
eote.defaults.graphics.SymbolicReplacement.difficulty = buildReplacementObject("difficulty", eote.defaults.graphics.DIFFICULTY.BLANK, eote.defaults.graphics.SIZE.SMALL);
eote.defaults.graphics.SymbolicReplacement.setback = buildReplacementObject("setback", eote.defaults.graphics.SETBACK.BLANK, eote.defaults.graphics.SIZE.SMALL);
eote.defaults.graphics.SymbolicReplacement.challenge = buildReplacementObject("challenge", eote.defaults.graphics.CHALLENGE.BLANK, eote.defaults.graphics.SIZE.SMALL);

function attemptRegisterGMObj() {
  var GMObj = GMSheet.obj;

  // if the GMObj is null then it means that this is the first time this version of the script is being run on this campaign.
  if (!GMObj) {
      GMObj = findObjs({
          _type: "character",
          name: GMSheet.name
      });
      if (GMObj.length > 0) {
          GMSheet.obj = GMObj[0];
          eote.process.logger("attemptRegisterGMObj", "Registering of GMObj successful");
      }
      else {
          var msg = "The character sheet called " + GMSheet.name + " was not found in your campaign.";
          eote.process.logger("attemptRegisterGMObj", msg);
          sendChat("System", "/w gm " + msg);
      }
  } else {
      eote.process.logger("attemptRegisterGMObj", "GMObj previously registered.");
  }
}

eote.createGMDicePool = function () {

  var charObj_DicePool = findObjs({ _type: "character", name: "-DicePool" })[0];
  var attrObj_DicePool = [
      {
          name: 'pcgm',
          current: 3,
          max: '',
          update: true
      },
      {
          name: 'gmdicepool',
          current: 2,
          max: '',
          update: true
      }
  ];
  //create character -DicePool
  if (!charObj_DicePool) {
      charObj_DicePool = createObj("character", {
          name: GMSheet.name,
          bio: "GM Dice Pool"
      });
  }
  eote.defaults['-DicePoolID'] = charObj_DicePool.id;
  GMSheet.obj = charObj_DicePool;
  eote.updateAddAttribute(charObj_DicePool, attrObj_DicePool);
};

eote.createObj = function () {//Create Object Fix - Firebase.set failed
  var obj = createObj.apply(this, arguments);
  var id = obj.id;
  var characterID = obj.get('characterid');
  var type = obj.get('type');
  if (obj && !obj.fbpath && obj.changed) {
      obj.fbpath = obj.changed._fbpath.replace(/([^\/]*\/){4}/, "/");
  } else if (obj && !obj.changed && type == 'attribute') { //fix for dynamic attribute after in character created in game
      obj.fbpath = '/char-attribs/char/' + characterID + '/' + id;
      // /char-attribs/char/characterID/attributeID
  }
  return obj;
};

eote.setCharacterDefaults = function (characterObj) {

  var charObj = [characterObj];

  if (!characterObj) {
      charObj = findObjs({ _type: "character" });
  }
  //add/update characterID field
  _.each(charObj, function (charObj) {
      //updates default attr:CharacterID to current character id
      //_.findWhere(eote.defaults.character.attributes, {'name':'characterID'}).current = charObj.id;

      //Attributes
      eote.updateAddAttribute(charObj, eote.defaults.character.attributes);//Update Add Attribute defaults
      //Abilities
  });
};

eote.updateListeners = function (attributes) {

  _.each(eote.defaults.destinyListeners, function (charID) {

      var charObj = findObjs({
          _type: "character",
          _id: charID
      });
      //add/update characterID field
      _.each(charObj, function (charObj) {
          //Attributes
          eote.updateAddAttribute(charObj, attributes); //Update Add Attribute defaults
      });
  });
  //Update GM
  var GMObj = findObjs({
      _type: "character",
      name: GMSheet.name
  });
  GMSheet.obj = GMSheet.obj || GMObj;
  eote.updateAddAttribute(GMObj, attributes);
};

eote.updateAddAttribute = function (charactersObj, updateAddAttributesObj) { // charactersObj = object or array objects, updateAddAttributesObj = object or array objects
  if (!charactersObj) {
      log("error: charactersObj passed into eote.updateAddAttribute is not set");
      return;
  }

  //check if object or array
  if (!_.isArray(charactersObj)) {
      charactersObj = [charactersObj];
  }
  if (!_.isArray(updateAddAttributesObj)) {
      updateAddAttributesObj = [updateAddAttributesObj];
  }
  _.each(charactersObj, function (characterObj) {//loop characters

      var characterName = '';

      if (characterObj.name) {
          characterName = characterObj.name;
      } else {
          characterName = characterObj.get('name');
      }
      //find attribute via character ID
      var characterAttributesObj = findObjs({ _type: "attribute", characterid: characterObj.id });

      if (updateAddAttributesObj.length != 0) {

          log('UPDATE/ADD ATTRIBUTES FOR:----------------------->' + characterName);

          _.each(updateAddAttributesObj, function (updateAddAttrObj) { //loop attributes to update / add

              attr = _.find(characterAttributesObj, function (a) {
                  return (a.get('name') === updateAddAttrObj.name);
              });
              if (attr) {
                  if (updateAddAttrObj.update) {
                      log('Update Attr: ' + updateAddAttrObj.name);
                      attr.set({ current: updateAddAttrObj.current });
                      attr.set({ max: updateAddAttrObj.max ? updateAddAttrObj.max : '' });
                  }
              } else {
                  // log('Add Attr: '+ updateAddAttrObj.name);
                  eote.createObj('attribute', {
                      characterid: characterObj.id,
                      name: updateAddAttrObj.name,
                      current: updateAddAttrObj.current,
                      max: updateAddAttrObj.max ? updateAddAttrObj.max : ''
                  });
              }
          });
      }
  });
};

/* DICE PROCESS 
* 
* Matches the different regex commands and runs that dice processing step
* The order of step should not be change or dice could be incorrectly rolled.
* example: All dice needs to be 'upgraded" before it can be 'downgraded'
* ---------------------------------------------------------------- */

eote.defaults.dice = function () {
  this.vars = {
      characterName: '',
      characterID: '',
      playerName: '',
      playerID: '',
      label: '',
      suggestions: {},
      skillName: '',
      isFearCheck: false,
      combatCheck: false
  };
  this.totals = {
      success: 0,
      failure: 0,
      advantage: 0,
      threat: 0,
      triumph: 0,
      despair: 0,
      light: 0,
      dark: 0
  };
  this.graphicsLog = {
      Boost: '',
      Ability: '',
      Proficiency: '',
      SetBack: '',
      Difficulty: '',
      Challenge: '',
      Force: '',
      Success: '',
      Advantage: '',
      Threat: '',
      Failure: ''
  };
  this.textLog = {
      Boost: '',
      Ability: '',
      Proficiency: '',
      SetBack: '',
      Difficulty: '',
      Challenge: '',
      Force: '',
      Success: '',
      Advantage: '',
      Threat: '',
      Failure: ''
  };
  this.count = {
      boost: 0,
      ability: 0,
      proficiency: 0,
      setback: 0,
      difficulty: 0,
      challenge: 0,
      force: 0,
      success: 0,
      advantage: 0,
      threat: 0,
      failure: 0
  }
};

eote.process = {};

eote.process.logger = function (functionName, cmd) {
  if (eote.defaults.globalVars.debugScript) {
      log(functionName + ' : ' + cmd);
  }
};

eote.process.setup = function (cmd, playerName, playerID) {

  if (!cmd.match(eote.defaults.regex.cmd)) { //check for api cmd !eed
      return false;
  }
  var debugMatch = cmd.match(eote.defaults.regex.debug);
  if (debugMatch) {
      eote.process.debug(debugMatch);
      return false;
  }
  var fearMatch = cmd.match(eote.defaults.regex.fear);
  if (fearMatch) {
      eote.process.fear(fearMatch);
      return false;
  }

  var suggestionDisplayMatch = cmd.match(eote.defaults.regex.suggestionDisplay);
  if (suggestionDisplayMatch) {
      eote.process.suggestionDisplay(suggestionDisplayMatch);
      return false;
  }

  eote.process.logger("eote.process.setup", "NEW ROLL");
  eote.process.logger("eote.process.setup", "Original Command: " + cmd);

  /* reset dice - test, might not need this */
  var diceObj = new eote.defaults.dice();
  diceObj.vars.playerName = playerName;
  diceObj.vars.playerID = playerID;

  /* Dice config
   * Description: Change dice roller default config
   * --------------------------------------------------------------*/
  var logMatch = cmd.match(eote.defaults.regex.log);

  if (logMatch) {
      eote.process.log(logMatch);
      return false; //Stop current roll and run test
  }
  var graphicsMatch = cmd.match(eote.defaults.regex.graphics);

  if (graphicsMatch) {
      eote.process.graphics(graphicsMatch);
      return false; //Stop current roll and run test
  }
  var testMatch = cmd.match(eote.defaults.regex.test);

  if (testMatch) {
      eote.process.test(testMatch);
      return false; //Stop current roll and run test
  }
  /* Roll information
   * Description: Set default dice roll information Character Name and Skill Label
   * --------------------------------------------------------------*/

  var rollPlayerMatch = cmd.match(eote.defaults.regex.rollPlayer);

  if (rollPlayerMatch) {
      diceObj = eote.process.rollPlayer(rollPlayerMatch, diceObj);

      if (!diceObj) {
          return false;
      }
  }
  var characterIDMatch = cmd.match(eote.defaults.regex.characterID);

  if (characterIDMatch) {
      diceObj = eote.process.characterID(characterIDMatch, diceObj);
      //Once Character ID is parsed, remove it from the cmd.
      //it is possible that the character ID could contain dice values
      //for ex. characterID(-JMBFmYX1i0L259bjb-X)  will add 59 blue dice to the pool
      cmd = cmd.replace(characterIDMatch[0], '');
      eote.process.logger("eote.process.setup.characterIDMatch", "New command: " + cmd);
  }
  var unusableMatch = cmd.match(eote.defaults.regex.unusable);

  if (unusableMatch) {
      eote.process.logger("eote.process.setup.unusableMatch", "Roll ended because of unusable weapon");
      sendChat(diceObj.vars.characterName, "&{template:base} {{title=" + diceObj.vars.characterName + "}} {{wide=Weapon is too damaged to be used. Try repairing it.}}");
      return false;
  }
  var labelMatch = cmd.match(eote.defaults.regex.label);

  if (labelMatch) {
      diceObj = eote.process.label(labelMatch, diceObj);
  }
  /* Dice rolls 
   * Description: Create dice pool before running any custom roll
   * script commands that may need dice evaluated.
   * --------------------------------------------------------------*/
  var gmdiceMatch = cmd.match(eote.defaults.regex.gmdice);

  if (gmdiceMatch) {
      // Check to see if GM Dice pool is enabled for roll
      var useGmDice = true;
      var gmDiceSetting = findObjs({_type: "attribute",name: "use-gm-dice-pool-for-rolls",_characterid: eote.defaults['-DicePoolID']})[0];
      if (typeof gmDiceSetting !== 'undefined') {
          if (gmDiceSetting.get('current') == 0) {
              useGmDice = false;
          }
      }
      if (useGmDice) {
          cmd = eote.process.gmdice(cmd); // update the cmd string to contain the gmdice
          eote.process.logger("eote.process.setup.gmDice", "New command: " + cmd);
      }
  }
  var encumMatch = cmd.match(eote.defaults.regex.encum);

  if (encumMatch) {
      diceObj = eote.process.encum(encumMatch, diceObj);
      //eote.process.logger("eote.process.setup.encumMatch","New dice:" + diceObj);
  }

  var combatMatch = cmd.match(eote.defaults.regex.combat);
  if (combatMatch) {
      suggestionEngine.setCombatType(cmd[1]);
  } else {
      suggestionEngine.setCombatType(null);
  }

  var skillMatch = cmd.match(eote.defaults.regex.skill);
  if (skillMatch) {
      suggestionEngine.setIsFearCheck(getAttrByName(GMSheet.obj.id, "skill_suggestion_setting_fear"));
      var CombatSuggestions = getAttrByName(GMSheet.obj.id, "skill_suggestion_setting_combat");
      log("CombatSuggestions="+CombatSuggestions);
      suggestionEngine.setCombatSuggestions(getAttrByName(GMSheet.obj.id, "skill_suggestion_setting_combat"));
      var generalSuggestions = getAttrByName(GMSheet.obj.id, "skill_suggestion_setting_general");
      log("generalSuggestions="+generalSuggestions);
      suggestionEngine.setGeneralSuggestions(generalSuggestions);
      suggestionEngine.setIsFearCheck(getAttrByName(GMSheet.obj.id, "skill_suggestion_setting_fear"));

      suggestionEngine.setDisplayOption(getAttrByName(GMSheet.obj.id, "skill_suggestion_setting_display"));
      diceObj = eote.process.skill(skillMatch, diceObj);
  }

  var opposedMatch = cmd.match(eote.defaults.regex.opposed);
  if (opposedMatch) {
      diceObj = eote.process.opposed(opposedMatch, diceObj);
  }

  var diceMatch = cmd.match(eote.defaults.regex.dice);
  if (diceMatch) {
      diceObj = eote.process.setDice(diceMatch, diceObj);
  }

  var upgradeMatch = cmd.match(eote.defaults.regex.upgrade);
  if (upgradeMatch) {
      diceObj = eote.process.upgrade(upgradeMatch, diceObj);
  }

  var downgradeMatch = cmd.match(eote.defaults.regex.downgrade);
  if (downgradeMatch) {
      diceObj = eote.process.downgrade(downgradeMatch, diceObj);
  }

  /* Roll dice and update success / fail 
   * ------------------------------------------------------------- */
  diceObj = eote.process.rollDice(diceObj);

  // process and display skill suggestions
  if (diceObj.vars.skillName != null || suggestionEngine.getCombatType() != null) {
      diceObj = suggestionEngine.processSuggestions(diceObj);
  }

  /* Custom rolls
   * Description: Custom dice components have their own message, results and
   * often will return false to not allow proceeding scripts to fire
   * --------------------------------------------------------------*/
  var resetdiceMatch = cmd.match(eote.defaults.regex.resetdice);

  if (resetdiceMatch) {
      eote.process.resetdice(resetdiceMatch, diceObj);
      return false;
  }
  var initiativeMatch = cmd.match(eote.defaults.regex.initiative);

  if (initiativeMatch) {
      eote.process.initiative(initiativeMatch, diceObj);
      //return false;
  }
  var destinyMatch = cmd.match(eote.defaults.regex.destiny);

  if (destinyMatch) {
      eote.process.logger("eote.process.setup.destiny", "Destiny Point Command");
      var doRoll = eote.process.destiny(destinyMatch, diceObj);
      if (!doRoll) {
          return false;
      }
  }
  var calculateDamageMatch = cmd.match(eote.defaults.regex.calculateDamage);

  if (calculateDamageMatch) {
      diceObj = eote.process.calculateDamage(calculateDamageMatch,diceObj);
  }
  var rollEnemyCritical = cmd.match(eote.defaults.regex.rollEnemyCritical);

  if (rollEnemyCritical) {
      eote.process.rollEnemyCritical(diceObj);
      return false;
  }

  var rollRandomCritical = cmd.match(eote.defaults.regex.rollRandomCritical);

  if (rollRandomCritical) {
    eote.process.rollRandomCritical(diceObj);
    return false;
}

  var critMatch = cmd.match(eote.defaults.regex.crit);

  if (critMatch) {
      eote.process.crit(critMatch, diceObj);
      return false;
  }
  var critShipMatch = cmd.match(eote.defaults.regex.critShip);

  if (critShipMatch) {
      eote.process.crit(critShipMatch, diceObj);
      return false;
  }

  /* Display dice output in chat window 
   * ------------------------------------------------------------- */
  eote.process.diceOutput(diceObj, playerName, playerID);
};

/* DICE PROCESS FUNCTION
* 
* ---------------------------------------------------------------- */



eote.process.log = function (cmd) {

  /* Log
   * default: 'on' and 'single'
   * Description: Sets the visual output in the chat window for the dice rolls
   * Command: !eed log on|off|multi|single
   * ---------------------------------------------------------------- */

   switch (cmd[1]) {
      case "on": //if 'on' outputs dice to chat window
          eote.defaults.globalVars.diceLogChat = true;
          sendChat("Dice System", 'Output rolled dice to chat window "On"');
          break;
      case "off": //if 'off' outputs only results to chat window
          eote.defaults.globalVars.diceLogChat = false;
          sendChat("Dice System", 'Output rolled dice to chat window "Off"');
          break;
      case "multi": //if 'multi' multiple sets dice per line
          eote.defaults.globalVars.diceLogRolledOnOneLine = false;
          sendChat("Dice System", 'Multiple line output "Off". NOTE: This setting can cause issues with the Roll Templates. Recommended setting is !eed log single');
          break;
      case "single": //if 'single' single set of dice per line
          eote.defaults.globalVars.diceLogRolledOnOneLine = true;
          sendChat("Dice System", 'Multiple line output "On"');
          break;
  }
};

eote.process.debug = function (cmd) {
  switch (cmd[1]) {
      case "on":
          eote.defaults.globalVars.debugScript = true;
          sendChat("Dice System", 'Debug Script "On"');
          break;
      case "off":
          eote.defaults.globalVars.debugScript = false;
          sendChat("Dice System", 'Debug Script "Off"');
          break;
  }
};

eote.process.fear = function (cmd) {

  /* Fear
   * Description: Sets the state of the Fear check status on the DicePool
   * Command: !eed fear on|off
   * ---------------------------------------------------------------- */

  var value = null;
  switch (cmd[1]) {
      case "off":
          value = 0;
          break;
      case "on":
          value = 1;
          break;
  }

  if (value != null) {
      eote.updateAddAttribute(GMSheet.obj, {
          name: "skill_suggestion_setting_fear",
          current: value,
          update: true
      });
  }
};

eote.process.suggestionDisplay = function (cmd) {

  /* SuggestionDisplay
   * Description: Sets the state of the skill_suggestion_setting_display check status on the DicePool
   * Command: !eed suggestionDisplay none|whisper|always
   * ---------------------------------------------------------------- */

  /*TODO fix why suggestionDisplay is no longer working*/
  var value = (suggestionEngine.enum.displayOptions.hasOwnProperty(cmd[1]) ? cmd[1] : null);

  if (value != null) {
      eote.updateAddAttribute(GMSheet.obj, {
          name: "skill_suggestion_setting_display",
          current: value,
          update: true
      });
  } else {
      sendChat("Error", "/w gm " + cmd[1] + " is not a valid argument for suggestionDisplay.");
  }
};

eote.process.graphics = function (cmd) {

  /* Graphics
   * default: 'on' and 'm'
   * Description: Sets chat window dice output as graphic, small, medium, or large if "on" or as text if "off"
   * Command: !eed graphics on|off|s|m|l
   * ---------------------------------------------------------------- */

  //log(cmd[1]);
  switch (cmd[1]) {
      case "on":
          eote.defaults.globalVars.diceGraphicsChat = true;
          sendChat("Dice System", 'Chat graphics "On"');
          break;
      case "off":
          eote.defaults.globalVars.diceGraphicsChat = false;
          sendChat("Dice System", 'Chat graphics "Off"');
          break;
      case "s":
          eote.defaults.globalVars.diceGraphicsChatSize = eote.defaults.graphics.SIZE.SMALL;
          sendChat("Dice System", 'Chat graphics size "Small"');
          break;
      case "m":
          eote.defaults.globalVars.diceGraphicsChatSize = eote.defaults.graphics.SIZE.MEDIUM;
          sendChat("Dice System", 'Chat graphics size "Medium"');
          break;
      case "l":
          eote.defaults.globalVars.diceGraphicsChatSize = eote.defaults.graphics.SIZE.LARGE;
          sendChat("Dice System", 'Chat graphics size "Large"');
          break;
  }
};

eote.process.test = function (cmd) {

  eote.process.logger("eote.process.test", cmd);

  //Set test vars to true
  eote.defaults.globalVars.diceTestEnabled = true;
  tmpLogChat = eote.defaults.globalVars.diceLogChat;
  tmpGraphicsChat = eote.defaults.globalVars.diceGraphicsChat;
  eote.defaults.globalVars.diceLogChat = true;
  eote.defaults.globalVars.diceGraphicsChat = true;

  //Roll dice
  eote.process.setup('!eed 1b 1g 1y 1blk 1p 1r 1w', 'GM', 'Dice Test');

  //After test reset vars back
  eote.defaults.globalVars.diceTestEnabled = false;
  eote.defaults.globalVars.diceLogChat = tmpLogChat;
  eote.defaults.globalVars.diceGraphicsChat = tmpGraphicsChat;
};

eote.process.rollPlayer = function (cmd, diceObj) {
  //Build cmd string
  //get characterID
  //get skills
  //get encum
  //remove rollPlayer(xxxx) from string
  var match = {
      skill: /skill:(.*?)[\|\)]/,
      encum: /encum/,
      character: /character:(.*?)[\|\)]/
  };
  var characterMatch = cmd[1].match(match.character);

  var companion = null;
  var character = null;
  if (characterMatch) {
      var charObj = findObjs({ _type: "character", name: characterMatch[1] });

      if (charObj.length > 0) {
          diceObj.vars.characterName = charObj[0].get('name');
          diceObj.vars.characterID = charObj[0].id;
      }
      else {
          sendChat("Alert", "Can't find character. Please update character, or npc, name field to match sheet character name and try again.");
          return false;
      }
  }
  else {
      sendChat("Alert", "Please update character, or npc, name field.");
      return false;
  }
  var encumMatch = cmd[1].match(match.encum);
  var attr_1 = null;
  var attr_2 = null;
  if (encumMatch) {
      //encumbrance
      attr_1 = getAttrByName(diceObj.vars.characterID, 'encumbrance', 'max');
      attr_2 = getAttrByName(diceObj.vars.characterID, 'encumbrance');
      var cmdEncum = ['encum(' + attr_1 + '|' + attr_2 + ')']; //["encum(3|5)"]

      diceObj = eote.process.encum(cmdEncum, diceObj);
  }
  var skillMatch = cmd[1].match(match.skill);
  if (eote.defaults.globalVars.debugScript) sendChat("Alert", "skillmatch=" + skillMatch.toString());

  if (skillMatch) {

      var attrArray = skillMatch[1].split(',');
      attr_1 = getAttrByName(diceObj.vars.characterID, attrArray[0]);
      attr_2 = getAttrByName(diceObj.vars.characterID, attrArray[1]);

      if (eote.defaults.globalVars.debugScript) {
          sendChat("Alert", "attr_1 = " + attr_1);
          sendChat("Alert", "attr_2 = " + attr_2);
      }

      var cmdSkill;
      if(!isNaN((parseFloat(attr_1)) && isFinite(attr_1))) { // is numeric
          cmdSkill = ['skill(' + attr_1 + '|' + attr_2 + ')']; //['skill(0|2)']
      } else {
          var attr_3 =  getAttrByName(diceObj.vars.characterID, attr_1.substr(2,attr_1.length-3));
          cmdSkill = ['skill(' + attr_3 + '|' + attr_2 + ')']; //['skill(0|2)']
      }

      diceObj = eote.process.skill(cmdSkill, diceObj);
  }
  return diceObj;
};

eote.process.destiny = function (cmd, diceObj) {

  var charObj_DicePool = findObjs({ _type: "character", name: "-DicePool" })[0];
  var doRoll = false;

  if (!charObj_DicePool) {
      sendChat("GM", "/w " + "gm The DicePool character sheet could not be found! Re-save this script and it should be recreated. In the future do not rename the -DicePool Character Sheet.");
      return doRoll;
  }
  //GM's Destiny Point Pool
  var currentLightSidePoints = findObjs({
      _characterid: charObj_DicePool.get("_id"),
      _type: "attribute",
      _name: "lightSidePoints"
  });
  var currentDarkSidePoints = findObjs({
      _characterid: charObj_DicePool.get("_id"),
      _type: "attribute",
      _name: "darkSidePoints"
  });
  if (!currentDarkSidePoints[0] || !currentLightSidePoints[0]) {
      sendChat("Dice System", "No Destiny Points Defined. The GM has been whispered with instructions to reset the Destiny Pool.");
      sendChat("GM", "/w " + "gm The Destiny Pool system needs to be (or has been) reset. To fix this functionality, go to the -DicePool Character Sheet and add 1 dark side and 1 light side destiny point, then click the Force Player Update button. This should clear up the issue.");
      return doRoll;
  }
  var darkSide = parseInt(currentDarkSidePoints[0].get("current"));
  var lightSide = parseInt(currentLightSidePoints[0].get("current"));

  var displayPool = '';
  //noinspection FallThroughInSwitchStatementJS
  switch (cmd[1]) {
      case "useDark":
          if (darkSide > 0) {
              darkSide = darkSide - 1;
              lightSide = lightSide + 1;

              displayPool = '/direct &{template:base} {{title=' + 'The GM flips a Dark Side Destiny Point' + '}}';
              displayPool = displayPool + '{{Dark Side points remaining=' + darkSide + '}}';
              displayPool = displayPool + '{{New Light Side total=' + lightSide + '}}';

              sendChat('Dice System', displayPool);
          }
          else {
              sendChat("GM", "/w " + "gm There are no Dark Side points left in the Destiny Pool. Encourage your Players to use a Light Side Point." );
              return doRoll;
          }
          break;
      case "useLight":
          if (lightSide > 0) {
              lightSide = lightSide - 1;
              darkSide = darkSide + 1;

              displayPool = '/direct &{template:base} {{title=' + diceObj.vars.characterName + ' flips a Light Side Destiny Point' + '}}';
              displayPool = displayPool + '{{New Dark Side total=' + darkSide + '}}';
              displayPool = displayPool + '{{Light Side points remaining=' + lightSide + '}}';

              sendChat('Dice System', displayPool);
          }
          else {
              sendChat("Dice System", "/w " + diceObj.vars.characterName + " There are no Light Side points left in the Destiny Pool. Suggest to your GM to use a Dark Side point to make one available.");
              return doRoll;
          }
          break;
      case "doRoll":
          sendChat(diceObj.vars.characterName, '/direct Rolling a Destiny Point.');
          doRoll = true;
      // falls through on purpose (I think) to sync automatically when destiny point is rolled
      case "registerPlayer":
          if (!doRoll) {
              sendChat("Dice System", "/w " + diceObj.vars.characterName + '&{template:base} {{title=Syncing your Destiny Pool to the GM\'s}}');
          }
          darkSide = darkSide + diceObj.totals.dark;
          lightSide = lightSide + diceObj.totals.light;

          //Register 
          if (eote.defaults.destinyListeners.indexOf(diceObj.vars.characterID) == -1) {
              eote.defaults.destinyListeners.push(diceObj.vars.characterID);
          }
          break;
      case "sendUpdate":
          sendChat("Dice System", "Updating Players Destiny Pools");
          break;
      case "clearPool":
          sendChat("Dice System", '&{template:base} {{title=The GM cleared the Destiny Pool}}');
          lightSide = 0;
          darkSide = 0;
          break;
  }
  var newDestPool = [
      {
          name: 'lightSidePoints',
          current: lightSide,
          max: '',
          update: true
      },
      {
          name: 'darkSidePoints',
          current: darkSide,
          max: '',
          update: true
      }
  ];
  eote.updateListeners(newDestPool);
  return doRoll;
};

eote.process.characterID = function (cmd, diceObj) {

  /* CharacterId
   * default: null
   * Description: looks up the characters name based on character ID
   * Command: !eed characterID(##########)
   * ---------------------------------------------------------------- */

  eote.process.logger("eote.process.characterID", cmd);

  var characterID = cmd[1];

  if (characterID) {

      diceObj.vars.characterName = getObj("character", characterID).get('name');
      diceObj.vars.characterID = characterID;
  }
  return diceObj;
};

eote.process.label = function (cmd, diceObj) {

  /* Label
   * default: null
   * Description: set the skill name of the roll
   * Command: !eed label(Name of Skill)
   * ---------------------------------------------------------------- */
  //log(cmd);

  var label = cmd[1];

  if (label) {

      var labelStr = '';
      var labelArray = label.split('|');

      _.each(labelArray, function (labelVal) {
          var labelArray = labelVal.split(':');
          var label = labelArray[0];
          var message = labelArray[1];
          var labelTest = label.toLowerCase();

          switch (labelTest) {
              case 'skill':
                  labelStr = '{{title='+labelStr + message + '}}';
                  break;
              case 'dice':
                  labelStr = '{{title='+labelStr + message + '}}';
                  break;
              case 'weapon':
                  labelStr = '{{title='+labelStr + message + '}}';
                  break;
              default:
                  labelStr = labelStr + '{{' + label + '=' + message + '}}';
          }

      });
      diceObj.vars.label = labelStr;
  }
  return diceObj;
};

eote.process.resetdice = function (cmd, diceObj) {

  var characterObj = [{ name: diceObj.vars.characterName, id: diceObj.vars.characterID }];
  eote.process.logger("eote.process.resetdice", cmd);
  var resetdice = [];

  if (cmd[1] == 'resetdice') {
      resetdice = [
          {
              name: "b",
              current: 0,
              update: true
          },
          {
              name: "g",
              current: 0,
              update: true
          },
          {
              name: "y",
              current: 0,
              update: true
          },
          {
              name: "blk",
              current: 0,
              update: true
          },
          {
              name: "r",
              current: 0,
              update: true
          },
          {
              name: "p",
              current: 0,
              update: true
          },
          {
              name: "w",
              current: 0,
              update: true
          },
          {
              name: "upgradeAbility",
              current: 0,
              update: true
          },
          {
              name: "downgradeProficiency",
              current: 0,
              update: true
          },
          {
              name: "upgradeDifficulty",
              current: 0,
              update: true
          },
          {
              name: "downgradeChallenge",
              current: 0,
              update: true
          }
      ];
  }

  if (cmd[1] == 'resetgmdice') {
      resetdice = [
          {
              name: "bgm",
              current: 0,
              update: true
          },
          {
              name: "ggm",
              current: 0,
              update: true
          },
          {
              name: "ygm",
              current: 0,
              update: true
          },
          {
              name: "blkgm",
              current: 0,
              update: true
          },
          {
              name: "rgm",
              current: 0,
              update: true
          },
          {
              name: "pgm",
              current: 0,
              update: true
          },
          {
              name: "wgm",
              current: 0,
              update: true
          },
          {
              name: "upgradeAbilitygm",
              current: 0,
              update: true
          },
          {
              name: "downgradeProficiencygm",
              current: 0,
              update: true
          },
          {
              name: "upgradeDifficultygm",
              current: 0,
              update: true
          },
          {
              name: "downgradeChallengegm",
              current: 0,
              update: true
          }
      ];
  }
  eote.updateAddAttribute(characterObj, resetdice);
};

eote.process.initiative = function (cmd, diceObj) {

  /* initiative
   * default: false
   * Description: Set NPC/PC initiative true
   * Command: !eed npcinit or pcinit
   * ---------------------------------------------------------------- */

  var type = '';
  var NumSuccess = diceObj.totals.success;
  var NumAdvantage = diceObj.totals.advantage;
  var turnorder;

  eote.process.logger("eote.process.initiative.diceObj", diceObj);
  eote.process.logger("eote.process.initiative.NumSuccess", NumSuccess);
  eote.process.logger("eote.process.initiativeNumAdvantage", NumAdvantage);

  if (Campaign().get("turnorder") == "") turnorder = []; //NOTE: We check to make sure that the turnorder isn't just an empty string first. If it is treat it like an empty array.
  else turnorder = JSON.parse(Campaign().get("turnorder"));

  if (cmd[0] == 'pcinit') {
      type = 'PC';
  }

  if (cmd[0] == 'npcinit') {
      type = 'NPC';
  }
  //Add a new custom entry to the end of the turn order.
  turnorder.push({
      id: "-1",
      pr: NumSuccess + ":" + NumAdvantage,
      custom: type
  });
  turnorder.sort(function (x, y) {
      // verify that x or y contains a colon, if it doesn't put it below
      if (x.toString().indexOf(":") < 1 || y.toString().indexOf(":") < 1) {
          return 1;
      } else {
          var a = x.pr.split(":");
          var b = y.pr.split(":");

          if (b[0] - a[0] != 0) {//First rank on successes
              return b[0] - a[0];
          } else if (b[1] - a[1] != 0) {//Then rank on Advantage
              return b[1] - a[1];
          } else { //If they are still tied, PC goes first

              if (x.custom == y.custom) {
                  return 0;
              } else if (x.custom == "NPC") {
                  return 1;
              } else {
                  return -1;
              }
          }
      }
  });
  Campaign().set("turnorder", JSON.stringify(turnorder));
};

eote.process.calculateDamage = function (cmd, diceObj) {
  var values = String(cmd[1]);
  var splitCmd = values.split("|");
  var baseDamage = parseInt(splitCmd[0]);
  var critical = parseInt(splitCmd[1]);
  var damageBonus = parseInt(splitCmd[2]);
  if (isNaN(damageBonus)) {
      damageBonus = 0;
  }
  var criticalBonus = parseInt(splitCmd[3]);
  if (isNaN(criticalBonus)) {
      criticalBonus = 0;
  }
  var i = 4;
  while (i<17) {
      var attachmentDamageBonus = parseInt(splitCmd[i]);
      if ( ! isNaN(attachmentDamageBonus)) {
          damageBonus += attachmentDamageBonus;
      }
      i = i+2;
  }
  var i = 5;
  while (i<18) {
      var attachmentCriticalBonus = parseInt(splitCmd[i]);
      if ( ! isNaN(attachmentCriticalBonus)) {
          criticalBonus += attachmentCriticalBonus;
      }
      i = i+2;
  }

  var globalDamageBonus = findObjs({_type: "attribute",name: "damage-bonus",_characterid: diceObj.vars.characterID})[0];
  if (typeof globalDamageBonus !== 'undefined') {
      globalDamageBonus = parseInt(globalDamageBonus.get('current'));
  } else {
      globalDamageBonus = 0;
  }
  var bonusText = "";
  if (globalDamageBonus > 0 || damageBonus > 0) {
      bonusText = " (after bonuses)";
  }
  var calculatedDamage = ((diceObj.totals.success + baseDamage) - 1) + damageBonus + globalDamageBonus;
  if (diceObj.totals.success > 0) {
      diceObj.vars.calculatedDamage = "{{Hit For=<strong style='color:navy;'>" + calculatedDamage + "</strong>" + bonusText + "}}";
  } else {
      diceObj.vars.calculatedDamage = "{{Hit For=<span style='color:lightgray'>0</span>}}";
  }
  if ((diceObj.totals.success > 0 ) && (diceObj.totals.advantage >= critical))  {
      diceObj.vars.inflictedCritical = true;
      diceObj.vars.calculatedDamage = diceObj.vars.calculatedDamage + "{{Critical Hit=<strong style='color:maroon;'>Critical Hit!</strong>}}";
      if (typeof criticalBonus !== 'undefined' && ! isNaN(criticalBonus) && criticalBonus > 0) {
          diceObj.vars.weaponCriticalBonus = criticalBonus;
      }
  }
  return diceObj;
};

var critTableLifeform = [
  {
      percent: '1 to 5',
      severity: 1,
      name: 'Minor Nick',
      Result: 'Suffer 1 strain.'
  },
  {
      percent: '6 to 10',
      severity: 1,
      name: 'Slowed Down',
      Result: 'May only act during last allied Initiative slot on next turn.'
  },
  {
      percent: '11 to 15',
      severity: 1,
      name: 'Sudden Jolt',
      Result: 'May only act during last hero Initiative slot on next turn.'
  },
  {
      percent: '16 to 20',
      severity: 1,
      name: 'Distracted',
      Result: 'Cannot perform free maneuver on next turn.'
  },
  {
      percent: '21 to 25',
      severity: 1,
      name: 'Off-Balance',
      Result: 'Add 1 Setback die to next skill check.'
  },
  {
      percent: '26 to 30',
      severity: 1,
      name: 'Discouraging Wound',
      Result: 'Flip one light destiny to dark.'
  },
  {
      percent: '31 to 35',
      severity: 1,
      name: 'Stunned',
      Result: 'Staggered, cannot perform action on next turn.'
  },
  {
      percent: '36 to 40',
      severity: 1,
      name: 'Stinger',
      Result: 'Increase difficulty of next check by 1 Difficulty die.'
  },
  //----------------------------- Severity 2
  {
      percent: '41 to 45',
      severity: 2,
      name: 'Bowled Over',
      Result: 'Knocked prone and suffer 1 strain.'
  },
  {
      percent: '46 to 50',
      severity: 2,
      name: 'Head Ringer',
      Result: 'Increase difficulty of all Intellect and Cunning checks by 1 Difficulty die until end of encounter.'
  },
  {
      percent: '51 to 55',
      severity: 2,
      name: 'Fearsome Wound',
      Result: 'Increase difficulty of all Presence and Willpower checks by 1 Difficulty die until end of encounter.'
  },
  {
      percent: '56 to 60',
      severity: 2,
      name: 'Agonizing Wound',
      Result: 'Increase difficulty of all Brawn and Agility checks by 1 Difficulty die until end of encounter.'
  },
  {
      percent: '61 to 65',
      severity: 2,
      name: 'Slightly Dazed',
      Result: 'Add 1 Setback die to all skill checks until end of encounter.'
  },
  {
      percent: '66 to 70',
      severity: 2,
      name: 'Scattered Senses',
      Result: 'Remove all Boost dice from all skill checks until end of encounter.'
  },
  {
      percent: '71 to 75',
      severity: 2,
      name: 'Hamstrung',
      Result: 'Lose free maneuver until end of encounter.'
  },
  {
      percent: '76 to 80',
      severity: 2,
      name: 'Staggered',
      Result: 'Attacker may immediately attempt another free attack against you using same dice pool as original attack.'
  },
  {
      percent: '81 to 85',
      severity: 2,
      name: 'Winded',
      Result: 'Cannot voluntarily suffer strain to activate abilities or gain additional maneuvers until end of encounter.'
  },
  {
      percent: '86 to 90',
      severity: 2,
      name: 'Compromised',
      Result: 'Increase difficulty of all skill checks by 1 Difficulty die until end of encounter.'
  },
  //---------------------------------------- Severity 3
  {
      percent: '91 to 95',
      severity: 3,
      name: 'At the Brink',
      Result: 'Suffer 1 strain each time you perform an action.'
  },
  {
      percent: '96 to 100',
      severity: 3,
      name: 'Crippled',
      Result: 'Limb crippled until healed or replaced. Increase difficulty of all checks that use that limb by 1 Difficulty die.'
  },
  {
      percent: '101 to 105',
      severity: 3,
      name: 'Maimed',
      Result: 'Limb permanently lost. Unless you have a cybernetic replacement, cannot perform actions that use that limb. Add 1 Setback to all other actions.'
  },
  {
      percent: '106 to 110',
      severity: 3,
      name: 'Horrific Injury',
      Result: 'Roll 1d10 to determine one wounded characteristic -- roll results(1-3 = Brawn, 4-6 = Agility, 7 = Intellect, 8 = Cunning, 9 = Presence, 10 = Willpower. Until Healed, treat characteristic as one point lower.'
  },
  {
      percent: '111 to 115',
      severity: 3,
      name: 'Temporarily Lame',
      Result: 'Until healed, may not perform more than one maneuver each turn.'
  },
  {
      percent: '116 to 120',
      severity: 3,
      name: 'Blinded',
      Result: 'Can no longer see. Upgrade the difficulty of Perception and Vigilance checks three times, and all other checks twice.'
  },
  {
      percent: '121 to 125',
      severity: 3,
      name: 'Knocked Senseless',
      Result: 'You can no longer upgrade dice for checks.'
  },
  //---------------------------------------- Severity 4
  {
      percent: '126 to 130',
      severity: 4,
      name: 'Gruesome Injury',
      Result: 'Roll 1d10 to determine one wounded characteristic -- roll results(1-3 = Brawn, 4-6 = Agility, 7 = Intellect, 8 = Cunning, 9 = Presence, 10 = Willpower. Characteristic is permanently one point lower.'
  },
  {
      percent: '131 to 140',
      severity: 4,
      name: 'Bleeding Out',
      Result: 'Suffer 1 wound and 1 strain every round at the beginning of turn. For every 5 wounds suffered beyond wound threshold, suffer one additional Critical Injury (ignore the details for any result below this result).'
  },
  {
      percent: '141 to 150',
      severity: 4,
      name: 'The End is Nigh',
      Result: 'Die after the last Initiative slot during the next round.'
  },
  {
      percent: '151',
      severity: 4,
      name: 'Dead',
      Result: 'Complete, absolute death.'
  }
];
var critTableMachine = [
  {
      percent: '1 to 9',
      severity: 1,
      name: 'Mechanical Stress',
      Result: 'Ship or vehicle suffers 1 system strain.'
  },
  {
      percent: '10 to 18',
      severity: 1,
      name: 'Jostled',
      Result: 'All crew members suffer 1 strain.'
  },
  {
      percent: '19 to 27',
      severity: 1,
      name: 'Losing Power to Shields',
      Result: 'Decrease defense in affected defense zone by 1 until repaired. If ship or vehicle has no defense, suffer 1 system strain.'
  },
  {
      percent: '28 to 36',
      severity: 1,
      name: 'Knocked Off Course',
      Result: 'On next turn, pilot cannot execute any maneuvers. Instead, must make a Piloting check to regain bearings and resume course. Difficulty depends on current speed.'
  },
  {
      percent: '37 to 45',
      severity: 1,
      name: 'Tailspin',
      Result: 'All firing from ship or vehicle suffers 2 setback dice until end of pilot\'s next turn.'
  },
  {
      percent: '46 to 54',
      severity: 1,
      name: 'Component Hit',
      Result: 'One component of the attacker\'s choice is knocked offline, and is rendered inoperable until the end of the following round. See page 245 CRB for Small/Large Vehicle and Ship Component tables. '
  },
  // --------------- severity : 2
  {
      percent: '55 to 63',
      severity: 2,
      name: 'Shields Failing',
      Result: 'Decrease defense in all defense zones by 1 until repaired. If ship or vehicle has no defense, suffer 2 system strain.'
  },
  {
      percent: '64 to 72',
      severity: 2,
      name: 'Hyperdrive or Navicomputer Failure',
      Result: 'Cannot make any jump to hyperspace until repaired. If ship or vehicle has no hyperdrive, navigation systems fail leaving it unable to tell where it is or is going.'
  },
  {
      percent: '73 to 81',
      severity: 2,
      name: 'Power Fluctuations',
      Result: 'Pilot cannot voluntarily inflict system strain on the ship until repaired.'
  },
  // --------------- severity : 3
  {
      percent: '82 to 90',
      severity: 3,
      name: 'Shields Down',
      Result: 'Decrease defense in affected defense zone to 0 and all other defense zones by 1 point until repaired. If ship or vehicle has no defense, suffer 4 system strain.'
  },
  {
      percent: '91 to 99',
      severity: 3,
      name: 'Engine Damaged',
      Result: 'Ship or vehicle\'s maximum speed reduced by 1, to a minimum of 1, until repaired.'
  },
  {
      percent: '100 to 108',
      severity: 3,
      name: 'Shield Overload',
      Result: 'Decrease defense in all defense zones to 0 until repaired. In addition, suffer 2 system strain. Cannot be repaired until end of encounter. If ship or vehicle has no defense, reduce armor by 1 until repaired.'
  },
  {
      percent: '109 to 117',
      severity: 3,
      name: 'Engines Down',
      Result: 'Ship or vehicle\'s maximum speed reduced to 0. In addition, ship or vehicle cannot execute maneuvers until repaired. Ship continues on course at current speed and cannot be stopped or course changed until repaired.'
  },
  {
      percent: '118 to 126',
      severity: 3,
      name: 'Major System Failure',
      Result: 'One component of the attacker\'s choice is heavily damages, and is inoperable until the critical hit is repaired. See page 245 CRB for Small/Large Vehicle and Ship Component tables. '
  },
  // --------------- severity : 4
  {
      percent: '127 to 133',
      severity: 4,
      name: 'Major Hull Breach',
      Result: 'Ships and vehicles of silhouette 4 and smaller depressurize in a number of rounds equal to silhouette. Ships of silhouette 5 and larger don\'t completely depressurize, but parts do (specifics at GM discretion). Ships and vehicles operating in atmosphere instead suffer a Destabilized Critical.'
  },
  {
      percent: '134 to 138',
      severity: 4,
      name: 'Destabilised',
      Result: 'Reduce ship or vehicle\'s hull integrity threshold and system strain threshold to half original values until repaired.'
  },
  {
      percent: '139 to 144',
      severity: 4,
      name: 'Fire!',
      Result: 'Fire rages through ship or vehicle and it immediately takes 2 system strain. Fire can be extinguished with appropriate skill, Vigilance or Cool checks at GM\'s discretion. Takes one round per two silhouette to put out.'
  },
  {
      percent: '145 to 153',
      severity: 4,
      name: 'Breaking Up',
      Result: 'At the end of next round, ship is completely destroyed. Anyone aboard has one round to reach escape pod or bail out before they are lost.'
  },
  {
      percent: '154+',
      severity: 4,
      name: 'Vaporized',
      Result: 'The ship or Vehicle is completely destroyed.'
  }
];

eote.process.crit = function (cmd, diceObj) {

  /* Crit
   * default: 
   * Description: Rolls critical injury table
   * Command: !eed crit(roll) crit(roll|#) crit(heal|#)
   * ---------------------------------------------------------------- */

  eote.process.logger("eote.process.crit", "");

  var characterObj = [{ name: diceObj.vars.characterName, id: diceObj.vars.characterID }];
  var critRoll = function (addCritNum, type) {
      var openSlot = false;
      var diceRoll = '';
      var critMod = '';
      var rollTotal = '';
      var rollOffset = parseInt(getAttrByName(diceObj.vars.characterID, type + '-critAddOffset'));
      rollOffset = rollOffset ? rollOffset : 0;
      var totalcrits = parseInt(getAttrByName(diceObj.vars.characterID, type + '-critTotal'));
      if(!totalcrits){
          totalcrits = 0;
      }
      
      //roll random
      if (!addCritNum) {
          diceRoll = randomInteger(100);
          critMod = (totalcrits * 10);
          rollTotal = diceRoll + critMod + rollOffset;
          rollTotal = rollTotal < 1 ? 1 : rollTotal;
          eote.process.logger("critRoll", "diceRoll: " + diceRoll);
          eote.process.logger("critRoll", "critMod: " + critMod);
          eote.process.logger("critRoll", "rollTotal " + rollTotal);
      } else {
          rollTotal = parseInt(addCritNum);
      }
      //find crit in critical table
      if(type=="character" || type=="npc" || type == "companion" || type=="beast"){
          critTable = critTableLifeform;
      }
      if(type=="starship" || type=="vehicle"){
          critTable = critTableMachine;            
      }
      for (var key in critTable) {
          var percent = critTable[key].percent.split(' to ');
          var low = parseInt(percent[0]);
          var high = percent[1] ? parseInt(percent[1]) : 1000;
         
          if ((rollTotal >= low) && (rollTotal <= high)) {

              critAttrs = [
                  {
                      name: type + '-critTotal',
                      current: totalcrits+1,
                      max: '',
                      update: true
                  },
              ];
              critAttrs2 = [
                  {
                      name: type + '-critName',
                      current: critTable[key].name,
                      max: '',
                      update: true
                  },
                  {
                      name: type + '-critSeverity' ,
                      current: critTable[key].severity,
                      max: '',
                      update: true
                  },
                  {
                      name: type + '-critRange',
                      current: critTable[key].percent,
                      max: '',
                      update: true
                  },
                  {
                      name: type + '-critSummary',
                      current: critTable[key].Result,
                      max: '',
                      update: true
                  },
              ];
              var chat = '/direct &{template:critical} {{title='+type.charAt(0).toUpperCase()+type.slice(1)+' Critical}} ';
              chat = chat + '{{subtitle=' + diceObj.vars.characterName + '}}';
              chat = chat + '{{Previous Criticals=' + totalcrits + ' x 10}}';
              if (rollOffset) {
                  chat = chat + '{{Dice Roll Offset=' + rollOffset + '}}';
              }
              chat = chat + '{{Dice Roll=' + diceRoll + '}}';
              chat = chat + '{{Total=' + rollTotal + '}}';
              chat = chat + '{{wide=<h4>' + critTable[key].name + '</h4><p>';
              chat = chat + critTable[key].Result + '</p>}}';

              sendChat(diceObj.vars.characterName, chat);
          }
      }
      eote.updateAddAttribute(characterObj, critAttrs);
      eote.process.createRepeatingCrit(type,characterObj,critAttrs2);
  };
  var critHeal = function (critID, type) {
      log(critID);
      log(type);
      var rowid = critID;
      var regex = new RegExp('^repeating_.*?_' + rowid + '_.*?$');
      var attrsInRow = filterObjs(function(obj) {
          if (obj.get('type') !== 'attribute' || obj.get('characterid') !== diceObj.vars.characterID) return false;
          return regex.test(obj.get('name'));
      });
      _.each(attrsInRow, function (attribute) {//loop characters
          attribute.remove();
      });
      var totalcrits = parseInt(getAttrByName(diceObj.vars.characterID, type + '-critTotal'));
      critAttrs = [
          {
              name: type + '-critTotal',
              current: totalcrits-1,
              max: '',
              update: true
          },

      ];
      eote.updateAddAttribute(characterObj, critAttrs);
  };
  var critArray = cmd[1].split('|');
  var command = critArray[0];
  var type = critArray[1] ? critArray[1] : null;
  var input = critArray[2] ? critArray[2] : null;

  if (type == null) {
      sendChat("Alert", "Type not supplied. Needs character, companion or beast");
      return;
  }

  if (command == 'heal') {
      critHeal(input, type);
  } else if (command == 'add') {
      critRoll(input, type);
  } else { // crit(roll)
      critRoll(null, type);
  }
};
eote.process.createRepeatingCrit = function(type,charactersObj,critAttrs) {
  eote.process.logger("repeating","repeating");
  eote.process.logger("type",type);
  eote.process.logger("critAttrs",critAttrs);
  var newId = eote.process.generateRowID();
 //check if object or array
  if (!_.isArray(charactersObj)) {
      charactersObj = [charactersObj];
  }
  if (!_.isArray(critAttrs)) {
      critAttrs = [critAttrs];
  }
  var characterId = "";
  _.each(charactersObj, function (characterObj) {//loop characters

      var characterName = '';

      if (characterObj.name) {
          characterName = characterObj.name;
      } else {
          characterName = characterObj.get('name');
      }
      characterId = characterObj.id;
      //find attribute via character ID
      var characterAttributesObj = findObjs({ _type: "attribute", characterid: characterObj.id });

      if (critAttrs.length != 0) {

          log('UPDATE/ADD ATTRIBUTES FOR:----------------------->' + characterName);

          _.each(critAttrs, function (critAttr) { //loop attributes to update / add

              attr = _.find(characterAttributesObj, function (a) {
                  return (a.get('name') === critAttr.name);
              });
              if (attr) {
                  if (critAttr.update) {
                      log('Update Attr: ' + critAttr.name);
                      attr.set({ current: critAttr.current });
                      attr.set({ max: critAttr.max ? critAttr.max : '' });
                  }
              } else {
                   log('Add Attr: '+ critAttr.name);
                   log( 'Value: '+ critAttr.current);
                  eote.createObj('attribute', {
                      characterid: characterObj.id,
                      name: "repeating_crit"+type+"_" + newId + "_" + critAttr.name,
                      current: critAttr.current,
                      max: critAttr.max ? critAttr.max : ''
                  });
              }
          });
      }
  });   
  eote.createObj('attribute', {
      characterid: characterId,
      name: "repeating_crit"+type+"_" + newId + "_"+type+"-critId",
      current: newId
  }); 
     
};



eote.process.generateRowID = function () {
  "use strict";
  var a = 0, b = [];
  var c = (new Date()).getTime() + 0, d = c === a;
  a = c;
  for (var e = new Array(8), f = 7; 0 <= f; f--) {
      e[f] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c % 64);
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
  for (f = 0; 12 > f; f++){
      c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
  }
  return c.replace(/_/g, "Z");
};


eote.process.gmdice = function (cmd) {

  /* gmdice
   * default: g
   * Description: Update CMD string to include -DicePool dice
   * Command: (gmdice)
   * ---------------------------------------------------------------- */

  //var charObj = findObjs({ _type: "character", name: "-DicePool" });
  var charID = eote.defaults['-DicePoolID'];//charObj[0].id;

  var g = getAttrByName(charID, 'ggm');
  var y = getAttrByName(charID, 'ygm');
  var p = getAttrByName(charID, 'pgm');
  var r = getAttrByName(charID, 'rgm');
  var b = getAttrByName(charID, 'bgm');
  var blk = getAttrByName(charID, 'blkgm');
  var w = getAttrByName(charID, 'wgm');
  var upAbility = getAttrByName(charID, 'upgradeAbilitygm');
  var upDifficulty = getAttrByName(charID, 'upgradeDifficultygm');
  var downProficiency = getAttrByName(charID, 'downgradeProficiencygm');
  var downChallenge = getAttrByName(charID, 'downgradeChallengegm');

  var gmdiceCMD = g + 'g ' + y + 'y ' + p + 'p ' + r + 'r ' + b + 'b ' + blk + 'blk ' + w + 'w upgrade(ability|' + upAbility + ') downgrade(proficiency|' + downProficiency + ') upgrade(difficulty|' + upDifficulty + ') downgrade(challenge|' + downChallenge + ')';

  eote.process.logger("eote.process.gmDice.charID", charID);
  cmd = cmd.replace('(gmdice)', gmdiceCMD);
  //log(cmd);
  return cmd;
};

eote.process.encum = function (cmd, diceObj) {

  /* Encumberment
   * default: 
   * Description: If the current encum is great than threshold add 1 setback per unit over current encum
   * Command: !eed encum(encum_current|encum_threshold)
   * ---------------------------------------------------------------- */

  eote.process.logger("eote.process.encum", cmd);

  _.each(cmd, function (encum) {

      var diceArray = encum.match(/\((.*?)\|(.*?)\)/);

      if (diceArray && diceArray[1] && diceArray[2]) {

          var num1 = eote.process.math(diceArray[1]);
          var num2 = eote.process.math(diceArray[2]);
          var setbackDice = diceObj.count.setback;

          if (num2 > num1) {
              diceObj.count.setback = setbackDice + (num2 - num1);
              eote.process.logger("eote.process.encum.NewSetbackTotal", diceObj.count.setback + "blk");
              //sendChat("Dice System", "/w " + diceObj.vars.characterName + " **Overencumbered** " + diceObj.count.setback + " Setbacks added");
          }
          else {
              eote.process.logger("eote.process.encum", "No New Setback");
          }
      }
  });
  return diceObj;
};

eote.process.skill = function (cmd, diceObj) {

  /* Skill
   * default: 
   * Description: create the ability and proficiency dice for a skill check
   * Command: !eed skill(char_value|skill_value|[NPC minion group size]|[Is minion skill])
   * ---------------------------------------------------------------- */

  eote.process.logger("eote.process.skill", cmd);

  _.each(cmd, function (skill) {
      var matchers = {
          matchNPCGroupWSkillName: /\((.*?)\|(.*?)\|(.*?)\|(.*?)\|(.*?)\)/,
          matchNPCGroupWOSkillName: /\((.*?)\|(.*?)\|(.*?)\|(.*?)\)/,
          matchRegSkillWSkillName: /\((.*?)\|(.*?)\|(.*?)\)/,
          matchRegSkillWOSkillName: /\((.*?)\|(.*?)\)/
      };
      var diceArray = null;
      Object.keys(matchers).some(function(key) {
          if ((diceArray = skill.match(matchers[key])) != null) {
              return true;
          }
      });

      if (diceArray && diceArray[1] && diceArray[2]) {
          var num1 = eote.process.math(diceArray[1]);
          if (diceArray[3] && diceArray[4] && diceArray[4] === "1") {
              num1 += (eote.process.math(diceArray[3]) - 1);
          }
          var num2 = eote.process.math(diceArray[2]);
          var totalAbil = Math.abs(num1 - num2);
          var totalProf = (num1 < num2 ? num1 : num2);
          var abilityDice = diceObj.count.ability;
          var proficiencyDice = diceObj.count.proficiency;

          diceObj.count.ability = abilityDice + totalAbil;
          diceObj.count.proficiency = proficiencyDice + totalProf;

          // check for skill name
          if (diceArray[5] || diceArray[3] && !diceArray[4]) {
              var name = (diceArray[5] ? diceArray[5] : diceArray[3]);

              /*  remove all non-letter characters to bring the name in line with the JSON properties
               *  in order to have the closest chance in getting a match.
               *
               *  does not guarantee a match.
               */
              name = name.replace(/[^A-Za-z]/g, "");

              diceObj.vars.skillName = name;
          } else {
              diceObj.vars.skillName = null;
          }

          eote.process.logger("eote.process.skill.abilityTotal", diceObj.count.ability + "g");
          eote.process.logger("eote.process.skill.proficiencyTotal", diceObj.count.proficiency + "y");
      }

  });
  return diceObj;
};

eote.process.opposed = function (cmd, diceObj) {
  /*Opposed
   * default:
   * Description: create the difficulty and challenge dice for an opposed skill check
   * Command: !eed opposed(char_value|skill_value)
   * ---------------------------------------------------------------- */

  eote.process.logger("eote.process.opposed", cmd);

  _.each(cmd, function (opposed) {

      var diceArray = opposed.match(/\((.*?)\|(.*?)\)/);

      if (diceArray && diceArray[1] && diceArray[2]) {
          var num1 = eote.process.math(diceArray[1]);
          var num2 = eote.process.math(diceArray[2]);
          var totalOppDiff = Math.abs(num1 - num2);
          var totalOppChal = (num1 < num2 ? num1 : num2);
          var opposeddifficultyDice = diceObj.count.difficulty;
          var opposedchallengeDice = diceObj.count.challenge;
          diceObj.count.difficulty = opposeddifficultyDice + totalOppDiff;
          diceObj.count.challenge = opposedchallengeDice + totalOppChal;
      }
  });
  return diceObj;
};

eote.process.setDice = function (cmd, diceObj) {

  /* setDice
   * default: 
   * Description: Loop thru the dice and adds or subtracts them from the dice object
   * Command: !eed g# y# b# blk# r# p# w# or g#+# or g#-#
   * ---------------------------------------------------------------- */

  eote.process.logger("eote.process.setDice", cmd);

  _.each(cmd, function (dice) {

      var diceArray = dice.match(/(-?\d{1,2})(\w{1,3})/);

      if (diceArray && diceArray[1] && diceArray[2]) {

          var diceQty = eote.process.math(diceArray[1]);
          diceQty = (isNaN(diceQty) ? 0 : diceQty);

          var abilityDice = diceObj.count.ability;
          var proficiencyDice = diceObj.count.proficiency;
          var difficultyDice = diceObj.count.difficulty;
          var challengeDice = diceObj.count.challenge;
          var boostDice = diceObj.count.boost;
          var setbackDice = diceObj.count.setback;
          var forceDice = diceObj.count.force;
          var success = diceObj.count.success;
          var advantage = diceObj.count.advantage;
          var threat = diceObj.count.threat;
          var failure = diceObj.count.failure;

          switch (diceArray[2]) {
              case 'b':
                  diceObj.count.boost = boostDice + diceQty;
                  break;
              case 'g':
                  diceObj.count.ability = abilityDice + diceQty;
                  break;
              case 'y':
                  diceObj.count.proficiency = proficiencyDice + diceQty;
                  break;
              case 'blk':
                  diceObj.count.setback = setbackDice + diceQty;
                  break;
              case 'p':
                  diceObj.count.difficulty = difficultyDice + diceQty;
                  break;
              case 'r':
                  diceObj.count.challenge = challengeDice + diceQty;
                  break;
              case 'w':
                  diceObj.count.force = forceDice + diceQty;
                  break;
              case 's':
                  diceObj.count.success = success + diceQty;
                  break;
              case 'a':
                  diceObj.count.advantage = advantage + diceQty;
                  break;
              case 't':
                  diceObj.count.threat = threat + diceQty;
                  break;
              case 'f':
                  diceObj.count.failure = failure + diceQty;
                  break;
          }
      }
  });
  diceObj = eote.process.checkNegative(diceObj);

  eote.process.logger("eote.process.setDice.DiceToRoll", diceObj.count.boost + "b," + diceObj.count.ability + "g," + diceObj.count.proficiency + "y," + diceObj.count.setback + "blk," + diceObj.count.difficulty + "p," + diceObj.count.challenge + "r," + diceObj.count.force + "w," + diceObj.count.advantage + "a," + diceObj.count.threat + "t," + diceObj.count.failure + "f");

  return diceObj;
};

eote.process.checkNegative = function (diceObj) {
  if (diceObj.count.boost < 0) {
      eote.process.logger("eote.process.checkNegative.boost", "Setting count to 0 for being negative.");
      diceObj.count.boost = 0;
  }
  if (diceObj.count.ability < 0) {
      eote.process.logger("eote.process.checkNegative.ability", "Setting count to 0 for being negative.");
      diceObj.count.ability = 0;
  }
  if (diceObj.count.proficiency < 0) {
      eote.process.logger("eote.process.checkNegative.proficiency", "Setting count to 0 for being negative.");
      diceObj.count.proficiency = 0;
  }
  if (diceObj.count.setback < 0) {
      eote.process.logger("eote.process.checkNegative.setback", "Setting count to 0 for being negative.");
      diceObj.count.setback = 0;
  }
  if (diceObj.count.difficulty < 0) {
      eote.process.logger("eote.process.checkNegative.difficulty", "Setting count to 0 for being negative.");
      diceObj.count.difficulty = 0;
  }
  if (diceObj.count.challenge < 0) {
      eote.process.logger("eote.process.checkNegative.challenge", "Setting count to 0 for being negative.");
      diceObj.count.challenge = 0;
  }
  if (diceObj.count.force < 0) {
      eote.process.logger("eote.process.checkNegative.force", "Setting count to 0 for being negative.");
      diceObj.count.force = 0;
  }
  if (diceObj.count.success < 0) {
      eote.process.logger("eote.process.checkNegative.success", "Setting count to 0 for being negative.");
      diceObj.count.success = 0;
  }
  if (diceObj.count.advantage < 0) {
      eote.process.logger("eote.process.checkNegative.advantage", "Setting count to 0 for being negative.");
      diceObj.count.advantage = 0;
  }
  if (diceObj.count.threat < 0) {
      eote.process.logger("eote.process.checkNegative.threat", "Setting count to 0 for being negative.");
      diceObj.count.threat = 0;
  }
  if (diceObj.count.failure < 0) {
      eote.process.logger("eote.process.checkNegative.failure", "Setting count to 0 for being negative.");
      diceObj.count.failure = 0;
  }
  return diceObj;
};

eote.process.upgrade = function (cmd, diceObj) {

  /* Upgrade
   * default: 
   * Description: upgrades ability and difficulty dice
   * Command: !eed upgrade(ability|#) or upgrade(difficulty|#)
   * ---------------------------------------------------------------- */

  eote.process.logger("eote.process.upgrade", cmd);

  _.each(cmd, function (dice) {

      var diceArray = dice.match(/\((.*?)\|(.*?)\)/);

      if (diceArray && diceArray[1] && diceArray[2]) {

          var type = diceArray[1];
          var upgradeVal = eote.process.math(diceArray[2]);
          var abilityDice = diceObj.count.ability;
          var proficiencyDice = diceObj.count.proficiency;
          var difficultyDice = diceObj.count.difficulty;
          var challengeDice = diceObj.count.challenge;

          switch (type) {
              case 'ability':

                  var totalProf = (upgradeVal < abilityDice ? upgradeVal : abilityDice);
                  var totalAbil = Math.abs(upgradeVal - abilityDice);

                  if (upgradeVal > abilityDice) {
                      totalProf = totalProf + Math.floor(totalAbil / 2);
                      totalAbil = totalAbil % 2;
                  }
                  diceObj.count.ability = totalAbil;
                  diceObj.count.proficiency = proficiencyDice + totalProf;

                  eote.process.logger("eote.process.upgrade.abilityTotal", diceObj.count.ability + "g");
                  eote.process.logger("eote.process.upgrade.proficiencyTotal", diceObj.count.proficiency + "y");

                  break;
              case 'difficulty':

                  var totalChall = (upgradeVal < difficultyDice ? upgradeVal : difficultyDice);
                  var totalDiff = Math.abs(upgradeVal - difficultyDice);

                  if (upgradeVal > difficultyDice) {
                      totalChall = totalChall + Math.floor(totalDiff / 2);
                      totalDiff = totalDiff % 2;
                  }
                  diceObj.count.difficulty = totalDiff;
                  diceObj.count.challenge = challengeDice + totalChall;

                  eote.process.logger("eote.process.upgrade.difficultyTotal", diceObj.count.difficulty + "p");
                  eote.process.logger("eote.process.upgrade.challengeTotal", diceObj.count.challenge + "r");

                  break;
          }
      }
  });
  return diceObj;
};

eote.process.downgrade = function (cmd, diceObj) {

  /* Downgrade
   * default: 
   * Description: downgrades proficiency and challenge dice
   * Command: !eed downgrade(proficiency|#) or downgrade(challenge|#)
   * ---------------------------------------------------------------- */

  eote.process.logger("eote.process.downgrade", cmd);

  _.each(cmd, function (dice) {

      var diceArray = dice.match(/\((.*?)\|(.*?)\)/);

      if (diceArray && diceArray[1] && diceArray[2]) {

          var type = diceArray[1];
          var downgradeVal = eote.process.math(diceArray[2]);
          var abilityDice = diceObj.count.ability;
          var proficiencyDice = diceObj.count.proficiency;
          var difficultyDice = diceObj.count.difficulty;
          var challengeDice = diceObj.count.challenge;

          switch (type) {
              case 'proficiency':

                  var profConvertedToAbil = proficiencyDice * 2;

                  if (downgradeVal > (abilityDice + profConvertedToAbil)) {
                      diceObj.count.ability = 0;
                      diceObj.count.proficiency = 0;
                  } else if (downgradeVal > profConvertedToAbil) {
                      downgradeVal = Math.abs(downgradeVal - profConvertedToAbil);
                      diceObj.count.ability = Math.abs(downgradeVal - abilityDice);
                      diceObj.count.proficiency = 0;
                  } else {
                      diceObj.count.ability = abilityDice + (profConvertedToAbil - downgradeVal) % 2;
                      diceObj.count.proficiency = Math.floor((profConvertedToAbil - downgradeVal) / 2);
                  }
                  break;
              case 'challenge':

                  var challConvertedToDiff = challengeDice * 2;

                  if (downgradeVal > (difficultyDice + challConvertedToDiff)) {
                      diceObj.count.difficulty = 0;
                      diceObj.count.challenge = 0;
                  } else if (downgradeVal > challConvertedToDiff) {
                      downgradeVal = Math.abs(downgradeVal - challConvertedToDiff);
                      diceObj.count.difficulty = Math.abs(downgradeVal - difficultyDice);
                      diceObj.count.challenge = 0;
                  } else {
                      diceObj.count.difficulty = difficultyDice + (challConvertedToDiff - downgradeVal) % 2;
                      diceObj.count.challenge = Math.floor((challConvertedToDiff - downgradeVal) / 2);
                  }
                  break;
          }
      }
  });
  return diceObj;
};

eote.process.math = function (expr) {

  /* Math
   * Returns: Number
   * Description: Evaluates a mathematical expression (as a string) and return the result 
   * ---------------------------------------------------------------- */

  var chars = expr.split("");
  var n = [], op = [], index = 0, oplast = true;

  n[index] = "";

  // Parse the expression
  for (var c = 0; c < chars.length; c++) {

      if (isNaN(parseInt(chars[c])) && chars[c] !== "." && !oplast) {
          op[index] = chars[c];
          index++;
          n[index] = "";
          oplast = true;
      } else {
          n[index] += chars[c];
          oplast = false;
      }
  }
  // Calculate the expression
  expr = parseFloat(n[0]);
  for (var o = 0; o < op.length; o++) {
      var num = parseFloat(n[o + 1]);
      switch (op[o]) {
          case "+":
              expr = expr + num;
              break;
          case "-":
              expr = expr - num;
              break;
          case "*":
              expr = expr * num;
              break;
          case "/":
              expr = expr / num;
              break;
      }
  }
  return expr;
};

eote.process.addDiceValues = function (diceTotalObj, diceResult) {

  diceTotalObj.success = diceTotalObj.success + diceResult.success;
  diceTotalObj.failure = diceTotalObj.failure + diceResult.failure;
  diceTotalObj.advantage = diceTotalObj.advantage + diceResult.advantage;
  diceTotalObj.threat = diceTotalObj.threat + diceResult.threat;
  diceTotalObj.triumph = diceTotalObj.triumph + diceResult.triumph;
  diceTotalObj.despair = diceTotalObj.despair + diceResult.despair;
  diceTotalObj.light = diceTotalObj.light + diceResult.light;
  diceTotalObj.dark = diceTotalObj.dark + diceResult.dark;

  return diceTotalObj;
};

eote.process.totalDiceValues = function (diceTotalObj) {

  var diceTS = {
      success: 0,
      failure: 0,
      advantage: 0,
      threat: 0,
      triumph: 0,
      despair: 0,
      light: 0,
      dark: 0,
      diceGraphicsLog: "",
      diceTextLog: ""
  };
  var i = 0;

  i = diceTotalObj.success - diceTotalObj.failure;

  if (i >= 0) {
      diceTS.success = i;
  } else {
      diceTS.failure = Math.abs(i);
  }
  i = diceTotalObj.advantage - diceTotalObj.threat;

  if (i >= 0) {
      diceTS.advantage = i;
  } else {
      diceTS.threat = Math.abs(i);
  }
  diceTS.triumph = diceTotalObj.triumph;
  diceTS.despair = diceTotalObj.despair;
  diceTS.light = diceTotalObj.light;
  diceTS.dark = diceTotalObj.dark;

  return diceTS;
};

eote.process.rollDice = function (diceObj) {

  results = {
      success: 0,
      failure: 0,
      advantage: 0,
      threat: 0,
      triumph: 0,
      despair: 0,
      light: 0,
      dark: 0,
      diceGraphicsLog: '',
      diceTextLog: ''
  };
  eote.process.logger("eote.process.rollDice.FinalDiceToRoll", diceObj.count.boost + "b," + diceObj.count.ability + "g," + diceObj.count.proficiency + "y," + diceObj.count.setback + "blk," + diceObj.count.difficulty + "p," + diceObj.count.challenge + "r," + diceObj.count.force + "w," + diceObj.count.advantage + "a," + diceObj.count.threat + "t," + diceObj.count.failure + "f");

  //Blue "Boost" die (d6)
  if (diceObj.count.boost > 0) {
      results = eote.roll.boost(diceObj.count.boost);
      diceObj.graphicsLog.Boost = results.diceGraphicsLog;
      diceObj.textLog.Boost = results.diceTextLog;
      diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
  }
  //Green "Ability" die (d8) 
  if (diceObj.count.ability > 0) {
      results = eote.roll.ability(diceObj.count.ability);
      diceObj.graphicsLog.Ability = results.diceGraphicsLog;
      diceObj.textLog.Ability = results.diceTextLog;
      diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
  }
  //Yellow "Proficiency" die (d12)
  if (diceObj.count.proficiency > 0) {
      results = eote.roll.proficiency(diceObj.count.proficiency);
      diceObj.graphicsLog.Proficiency = results.diceGraphicsLog;
      diceObj.textLog.Proficiency = results.diceTextLog;
      diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
  }
  //Black "SetBack" die (d6)
  if (diceObj.count.setback > 0) {
      results = eote.roll.setback(diceObj.count.setback);
      diceObj.graphicsLog.SetBack = results.diceGraphicsLog;
      diceObj.textLog.SetBack = results.diceTextLog;
      diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
  }
  //Purple "Difficulty" die (d8)
  if (diceObj.count.difficulty > 0) {
      results = eote.roll.difficulty(diceObj.count.difficulty);
      diceObj.graphicsLog.Difficulty = results.diceGraphicsLog;
      diceObj.textLog.Difficulty = results.diceTextLog;
      diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
  }
  //Red "Challenge" die (d12)
  if (diceObj.count.challenge > 0) {
      results = eote.roll.challenge(diceObj.count.challenge);
      diceObj.graphicsLog.Challenge = results.diceGraphicsLog;
      diceObj.textLog.Challenge = results.diceTextLog;
      diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
  }
  //White "Force" die (d12)
  if (diceObj.count.force > 0) {
      results = eote.roll.force(diceObj.count.force);
      diceObj.graphicsLog.Force = results.diceGraphicsLog;
      diceObj.textLog.Force = results.diceTextLog;
      diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
  }
  // Free Successes (from skills)
  if (diceObj.count.success > 0) {
      results = eote.roll.success(diceObj.count.success);
      diceObj.graphicsLog.Success = results.diceGraphicsLog;
      diceObj.textLog.Success = results.diceTextLog;
      diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
  }
  // Free Advantage (from skills)
  if (diceObj.count.advantage > 0) {
      results = eote.roll.advantage(diceObj.count.advantage);
      diceObj.graphicsLog.Advantage = results.diceGraphicsLog;
      diceObj.textLog.Advantage = results.diceTextLog;
      diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
  }
  //Free Threat (from skills)
  if (diceObj.count.threat > 0) {
      results = eote.roll.threat(diceObj.count.threat);
      diceObj.graphicsLog.Threat = results.diceGraphicsLog;
      diceObj.textLog.Threat = results.diceTextLog;
      diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
  }
  // Free Failure (from skills)
  if (diceObj.count.failure > 0) {
      results = eote.roll.failure(diceObj.count.failure);
      diceObj.graphicsLog.Failure = results.diceGraphicsLog;
      diceObj.textLog.Failure = results.diceTextLog;
      diceObj.totals = eote.process.addDiceValues(diceObj.totals, results);
  }
  //finds the sum of each dice attribute
  diceObj.totals = eote.process.totalDiceValues(diceObj.totals);
  return diceObj;
};

eote.process.diceOutput = function (diceObj, playerName, playerID) {

  //log(diceObj);
  var s1 = '<img src="';
  var s2 = '" title="';
  var s3 = '" height="';
  var s4 = '" width="';
  var s5 = '"/>';
  var chatGlobal = '';
  var diceGraphicsResults = "";
  var diceGraphicsRolled = "";
  var diceTextRolled = "";
  var diceTextResults = "";

  diceTextResults = "[";
  if (diceObj.totals.success > 0) {
      diceTextResults = diceTextResults + " Success:" + diceObj.totals.success;
      for (i = 1; i <= diceObj.totals.success; i++) {
          diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.S + s2 + "Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
      }
  }
  if (diceObj.totals.failure > 0) {
      diceTextResults = diceTextResults + " Fail:" + diceObj.totals.failure;
      for (i = 1; i <= diceObj.totals.failure; i++) {
          diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.F + s2 + "Failure" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
      }
  }
  if (diceObj.totals.advantage > 0) {
      diceTextResults = diceTextResults + " Advant:" + diceObj.totals.advantage;
      for (i = 1; i <= diceObj.totals.advantage; i++) {
          diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.A + s2 + "Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
      }
  }
  if (diceObj.totals.threat > 0) {
      diceTextResults = diceTextResults + " Threat:" + diceObj.totals.threat;
      for (i = 1; i <= diceObj.totals.threat; i++) {
          diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.T + s2 + "Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
      }
  }
  if (diceObj.totals.triumph > 0) {
      diceTextResults = diceTextResults + " Triumph:" + diceObj.totals.triumph;
      for (i = 1; i <= diceObj.totals.triumph; i++) {
          diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.TRIUMPH + s2 + "Triumph" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
      }
  }
  if (diceObj.totals.despair > 0) {
      diceTextResults = diceTextResults + " Despair:" + diceObj.totals.despair;
      for (i = 1; i <= diceObj.totals.despair; i++) {
          diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.DESPAIR + s2 + "Despair" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
      }
  }
  if (diceObj.totals.light > 0) {
      diceTextResults = diceTextResults + " Light:" + diceObj.totals.light;

      for (i = 1; i <= diceObj.totals.light; i++) {
          diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.L + s2 + "Light" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
      }
  }
  if (diceObj.totals.dark > 0) {
      diceTextResults = diceTextResults + " Dark:" + diceObj.totals.dark;
      for (i = 1; i <= diceObj.totals.dark; i++) {
          diceGraphicsResults = diceGraphicsResults + s1 + eote.defaults.graphics.SYMBOLS.D + s2 + "Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
      }
  }
  diceTextResults = diceTextResults + "]";
  //------------------------------------>
  if (eote.defaults.globalVars.diceTestEnabled === true) {
      characterPlayer = 'TEST';
  } else if (diceObj.vars.characterName) {
      characterPlayer = diceObj.vars.characterName;
  } else {
      characterPlayer = playerName;
  }

  var templateName = (diceObj.vars.suggestions.suggestionsExist
  && suggestionEngine.getDisplayOption() == suggestionEngine.enum.displayOptions.always ? "suggestion" : "base");

  /*Dice roll images work just fine when whispered*/
  var label = diceObj.vars.label;
  if (eote.defaults.globalVars.diceTestEnabled === true) {
      chatGlobal = "/direct <br>6b 8g 12y 6blk 8p 12r 12w <br>";
  } else if (label) {
      chatGlobal = "/direct &{template:" + templateName +"} " + diceObj.vars.label + "{{subtitle=" + characterPlayer + "}}";
  } else {
      chatGlobal = "/direct &{template:" + templateName +"} {{title=" + characterPlayer + "}}";
  }
  //------------------------------------>
  if (eote.defaults.globalVars.diceLogChat === true) {
      if (eote.defaults.globalVars.diceLogRolledOnOneLine === true) {

          diceGraphicsRolled = diceObj.graphicsLog.Boost + diceObj.graphicsLog.Ability + diceObj.graphicsLog.Proficiency + diceObj.graphicsLog.SetBack + diceObj.graphicsLog.Difficulty + diceObj.graphicsLog.Challenge + diceObj.graphicsLog.Force + diceObj.graphicsLog.Success + diceObj.graphicsLog.Advantage + diceObj.graphicsLog.Failure + diceObj.graphicsLog.Threat;

          if (diceObj.textLog.Boost != "") diceTextRolled = diceTextRolled + "Boost:" + diceObj.textLog.Boost;
          if (diceObj.textLog.Ability != "") diceTextRolled = diceTextRolled + "Ability:" + diceObj.textLog.Ability;
          if (diceObj.textLog.Proficiency != "") diceTextRolled = diceTextRolled + "Proficiency:" + diceObj.textLog.Proficiency;
          if (diceObj.textLog.SetBack != "") diceTextRolled = diceTextRolled + "SetBack:" + diceObj.textLog.SetBack;
          if (diceObj.textLog.Difficulty != "") diceTextRolled = diceTextRolled + "Difficulty:" + diceObj.textLog.Difficulty;
          if (diceObj.textLog.Challenge != "") diceTextRolled = diceTextRolled + "Challenge:" + diceObj.textLog.Challenge;
          if (diceObj.textLog.Force != "") diceTextRolled = diceTextRolled + "Force:" + diceObj.textLog.Force;
          if (diceObj.textLog.Success != "") diceTextRolled = diceTextRolled + "Success:" + diceObj.textLog.Success;
          if (diceObj.textLog.Advantage != "") diceTextRolled = diceTextRolled + "Advantage:" + diceObj.textLog.Advantage;
          if (diceObj.textLog.Failure != "") diceTextRolled = diceGraphicsRolled + "Failure:" + diceObj.textLog.Failure;
          if (diceObj.textLog.Threat != "") diceTextRolled = diceGraphicsRolled + "Threat:" + diceObj.textLog.Threat;

          if (eote.defaults.globalVars.diceGraphicsChat === true) {
              chatGlobal = chatGlobal + '{{roll=' + diceGraphicsRolled + '}}';
          } else {
              sendChat("", diceTextRolled);
          }
      } else {

          if (eote.defaults.globalVars.diceGraphicsChat === true) {

              if (diceObj.vars.label) {
                  sendChat(characterPlayer, "/direct " + diceObj.vars.label + '<br>');
              }
              if (diceObj.graphicsLog.Boost != "") sendChat("", "/direct " + diceObj.graphicsLog.Boost);
              if (diceObj.graphicsLog.Ability != "") sendChat("", "/direct " + diceObj.graphicsLog.Ability);
              if (diceObj.graphicsLog.Proficiency != "") sendChat("", "/direct " + diceObj.graphicsLog.Proficiency);
              if (diceObj.graphicsLog.SetBack != "") sendChat("", "/direct " + diceObj.graphicsLog.SetBack);
              if (diceObj.graphicsLog.Difficulty != "") sendChat("", "/direct " + diceObj.graphicsLog.Difficulty);
              if (diceObj.graphicsLog.Challenge != "") sendChat("", "/direct " + diceObj.graphicsLog.Challenge);
              if (diceObj.graphicsLog.Force != "") sendChat("", "/direct " + diceObj.graphicsLog.Force);
              if (diceObj.graphicsLog.Success != "") sendChat("", "/direct " + diceObj.graphicsLog.Success);
              if (diceObj.graphicsLog.Advantage != "") sendChat("", "/direct " + diceObj.graphicsLog.Advantage);
              if (diceObj.graphicsLog.Failure != "") sendChat("", "/direct " + diceObj.graphicsLog.Failure);
              if (diceObj.graphicsLog.Threat != "") sendChat("", "/direct " + diceObj.graphicsLog.Threat);
          } else {
              if (diceObj.vars.label) {
                  sendChat(characterPlayer, "/direct " + diceObj.vars.label + '<br>');
              }
              if (diceObj.textLog.Boost != "") sendChat("", "Boost:" + diceObj.textLog.Boost);
              if (diceObj.textLog.Ability != "") sendChat("", "Ability:" + diceObj.textLog.Ability);
              if (diceObj.textLog.Proficiency != "") sendChat("", "Proficiency:" + diceObj.textLog.Proficiency);
              if (diceObj.textLog.SetBack != "") sendChat("", "SetBack:" + diceObj.textLog.SetBack);
              if (diceObj.textLog.Difficulty != "") sendChat("", "Difficulty:" + diceObj.textLog.Difficulty);
              if (diceObj.textLog.Challenge != "") sendChat("", "Challenge:" + diceObj.textLog.Challenge);
              if (diceObj.textLog.Force != "") sendChat("", "Force:" + diceObj.textLog.Force);
              if (diceObj.textLog.Success != "") sendChat("", "Success:" + diceObj.textLog.Success);
              if (diceObj.textLog.Advantage != "") sendChat("", "Advantage:" + diceObj.textLog.Advantage);
              if (diceObj.textLog.Failure != "") sendChat("", "Failure:" + diceObj.textLog.Failure);
              if (diceObj.textLog.Threat != "") sendChat("", "Threat:" + diceObj.textLog.Threat);
          }
      }
  }

  var suggestions = suggestionEngine.buildSuggestionsRollTemplate(diceObj);
  var suggestionStatus = suggestionEngine.enum.displayOptions;
  var suggestionsFlag = suggestionEngine.getDisplayOption();
  var suggestionsExist = diceObj.vars.suggestions.suggestionsExist;

  if (suggestionsExist) {
      switch (suggestionsFlag) {
          case suggestionStatus.none:
              // not really needed since the other checks won't allow a status of none to do anything
              // but this prevents the default from yelling at you.
              suggestions = null;
              break;
          case suggestionStatus.whisper:
              suggestions = "&{template:base} {{title=Skill Suggestions}} " + suggestions;
              break;
          case suggestionStatus.always:
              suggestions = " {{suggestionsExist=true}} " + suggestions;
              break;
          case null:
            var msg = "No display option determined! Please set the display option on the " + eote.defaults.GMSheet.name;
            log(msg);
            sendChat("System", "/w gm " + msg);
          break;
          default:
              // this should never be entered
              log("Report Me! A suggestionFlag of '"+ suggestionsFlag +"' is not handled properly!");
      }
  }
  if (diceObj.vars.calculatedDamage) {
      diceTextResults += diceObj.vars.calculatedDamage; 
  }
  if (eote.defaults.globalVars.diceGraphicsChat === true) {
      chatGlobal = chatGlobal + '{{results=' + diceGraphicsResults + '}}';
      if (suggestions && suggestionsFlag == suggestionStatus.always)
          chatGlobal += " " + suggestions;
      if (diceObj.vars.calculatedDamage) {
          chatGlobal += diceObj.vars.calculatedDamage; 
      }
      sendChat(characterPlayer, chatGlobal);
  } else {
      sendChat("Roll", diceTextResults);
  }
  

  if (suggestions && suggestionsFlag == suggestionStatus.whisper) {
      sendChat("System", "/w gm " + suggestions);
  }
  eote.process.logger("eote.process.rollResult", diceTextResults);
  if (diceObj.vars.inflictedCritical) {
      eote.process.rollEnemyCritical(diceObj);
  }
};

eote.process.rollEnemyCritical = function(diceObj)
{
  var targetType = findObjs({_type: "attribute",name: "target-type",_characterid: diceObj.vars.characterID})[0];
  var criticalBonus = findObjs({_type: "attribute",name: "critical-bonus",_characterid: diceObj.vars.characterID})[0];
  var bonus = 0;
  if (typeof criticalBonus !== 'undefined') {
      bonus = parseInt(criticalBonus.get('current'));
  }
  if (diceObj.vars.weaponCriticalBonus && diceObj.vars.weaponCriticalBonus > 0 && ! isNaN(parseInt(diceObj.vars.weaponCriticalBonus))) {
      bonus += parseInt(diceObj.vars.weaponCriticalBonus);
  }
  var randomCrit =  Math.floor(Math.random() * 100) + 1;

  var criticalTable = critTableLifeform;
  var targetTypeName = "NPC";
  if(typeof targetType !== 'undefined') {
      targetTypeName = targetType.get('current').toUpperCase();
  }
  if (targetTypeName == "VEHICLE" || targetTypeName == "STARSHIP") {
      criticalTable = critTableMachine;
  }
  for (var key in criticalTable) {
      var percent = criticalTable[key].percent.split(' to ');
      var low = parseInt(percent[0]);
      var high = percent[1] ? parseInt(percent[1]) : 1000;
      var rollTotal = randomCrit;
      var afterBonus = rollTotal;
      if (! isNaN(bonus) && bonus > 0) {
          afterBonus = bonus + rollTotal;
      }

      if ((afterBonus >= low) && (afterBonus <= high)) {
          var chat = '/direct &{template:critical} {{title=' + targetTypeName + ' Critical}} ';
          chat = chat + '{{flavor=Inflicted by <strong style="color: navy;">' + diceObj.vars.characterName + '</strong>}}';
          chat = chat + '{{Crit Dice Roll=' + rollTotal + '}}';
          if (! isNaN(bonus) && bonus > 0) {
              chat = chat + '{{Crit Bonus=' + bonus + '}}';
              chat = chat + '{{Total Critical=' + (randomCrit + bonus) + '}}';
          }
          chat = chat + '{{wide=<h4>' + criticalTable[key].name + '</h4><p>';
          chat = chat + criticalTable[key].Result + '</p>}}';

          sendChat(diceObj.vars.characterName, chat);
      }
  }
};

eote.process.rollRandomCritical = function(diceObj)
{
    var criticalBonus = findObjs({_type: "attribute",name: "critical-bonus-standalone",_characterid: diceObj.vars.characterID})[0];
    var bonus = 0;
    if (typeof criticalBonus !== 'undefined') {
        bonus = parseInt(criticalBonus.get('current'));
    }
    if (diceObj.vars.weaponCriticalBonus && diceObj.vars.weaponCriticalBonus > 0 && ! isNaN(parseInt(diceObj.vars.weaponCriticalBonus))) {
        bonus += parseInt(diceObj.vars.weaponCriticalBonus);
    }
    var randomCrit =  Math.floor(Math.random() * 100) + 1;

    var criticalTable = critTableLifeform;
    var targetTypeName = "Random";
    for (var key in criticalTable) {
        var percent = criticalTable[key].percent.split(' to ');
        var low = parseInt(percent[0]);
        var high = percent[1] ? parseInt(percent[1]) : 1000;
        var rollTotal = randomCrit;
        var afterBonus = rollTotal;
        if (! isNaN(bonus) && bonus > 0) {
            afterBonus = bonus + rollTotal;
        }

        if ((afterBonus >= low) && (afterBonus <= high)) {
            var chat = '/direct &{template:critical} {{title=' + targetTypeName + ' Critical}} ';
            chat = chat + '{{flavor=Rolled by <span>' + diceObj.vars.characterName + '</span>}}';
            chat = chat + '{{Crit Dice Roll=' + rollTotal + '}}';
            if (! isNaN(bonus) && bonus > 0) {
                chat = chat + '{{Crit Bonus=' + bonus + '}}';
                chat = chat + '{{Total Critical=' + (randomCrit + bonus) + '}}';
            }
            chat = chat + '{{wide=<h4>' + criticalTable[key].name + '</h4><p>';
            chat = chat + criticalTable[key].Result + '</p>}}';

            sendChat(diceObj.vars.characterName, chat);
        }
    }
};

eote.roll = {

  boost: function (diceQty) {
      //Blue "Boost" die (d6)
      //1 Blank
      //2 Blank
      //3 Success
      //4 Advantage
      //5 Advantage + Advantage
      //6 Success + Advantage
      var roll = 0;
      var diceResult = {
          success: 0,
          failure: 0,
          advantage: 0,
          threat: 0,
          triumph: 0,
          despair: 0,
          light: 0,
          dark: 0,
          diceGraphicsLog: "",
          diceTextLog: ""
      };
      var i = 0;
      var s1 = '<img src="';
      var s2 = '" title="';
      var s3 = '" height="';
      var s4 = '" width="';
      var s5 = '"/>';

      if (eote.defaults.globalVars.diceTestEnabled === true) {
          diceQty = 6;
      }
      for (i = 1; i <= diceQty; i++) {
          if (eote.defaults.globalVars.diceTestEnabled === true) {
              roll = roll + 1;
          } else {
              roll = randomInteger(6);
          }
          switch (roll) {
              case 1:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.BOOST.BLANK + s2 + "Boost Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  break;
              case 2:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.BOOST.BLANK + s2 + "Boost Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  break;
              case 3:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Success)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.BOOST.S + s2 + "Boost Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.success = diceResult.success + 1;
                  break;
              case 4:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.BOOST.A + s2 + "Boost Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.advantage = diceResult.advantage + 1;
                  break;
              case 5:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage x2)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.BOOST.AA + s2 + "Boost Advantage x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.advantage = diceResult.advantage + 2;
                  break;
              case 6:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Success + Advantage)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.BOOST.SA + s2 + "Boost Success + Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.success = diceResult.success + 1;
                  diceResult.advantage = diceResult.advantage + 1;
                  break;
          }
      }
      return diceResult;
  },
  ability: function (diceQty) {
      //Green "Ability" die (d8)
      //1 Blank
      //2 Success
      //3 Success
      //4 Advantage
      //5 Advantage
      //6 Success + Advantage
      //7 Advantage + Advantage
      //8 Success + Success
      var roll = 0;
      var diceTextLog = "";
      var diceGraphicsLog = "";
      var diceResult = {
          success: 0,
          failure: 0,
          advantage: 0,
          threat: 0,
          triumph: 0,
          despair: 0,
          light: 0,
          dark: 0,
          diceGraphicsLog: "",
          diceTextLog: ""
      };
      var i = 0;
      var s1 = '<img src="';
      var s2 = '" title="';
      var s3 = '" height="';
      var s4 = '" width="';
      var s5 = '"/>';

      if (eote.defaults.globalVars.diceTestEnabled === true) {
          diceQty = 8;
      }
      for (i = 1; i <= diceQty; i++) {
          if (eote.defaults.globalVars.diceTestEnabled === true) {
              roll = roll + 1;
          }
          else {
              roll = randomInteger(8);
          }
          switch (roll) {
              case 1:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.BLANK + s2 + "Ability Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  break;
              case 2:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Success)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.S + s2 + "Ability Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.success = diceResult.success + 1;
                  break;
              case 3:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Success)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.S + s2 + "Ability Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.success = diceResult.success + 1;
                  break;
              case 4:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.A + s2 + "Ability Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.advantage = diceResult.advantage + 1;
                  break;
              case 5:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.A + s2 + "Ability Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.advantage = diceResult.advantage + 1;
                  break;
              case 6:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Success + Advantage)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.SA + s2 + "Ability Success + Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.success = diceResult.success + 1;
                  diceResult.advantage = diceResult.advantage + 1;
                  break;
              case 7:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage x2)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.AA + s2 + "Ability Advantage x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.advantage = diceResult.advantage + 2;
                  break;
              case 8:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Success x2)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.ABILITY.SS + s2 + "Ability Success x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.success = diceResult.success + 2;
                  break;
          }
      }
      return diceResult;
  },
  proficiency: function (diceQty) {
      //Yellow "Proficiency" die (d12)
      //1 Blank
      //2 Triumph
      //3 Success
      //4 Success
      //5 Advantage
      //6 Success + Advantage
      //7 Success + Advantage
      //8 Success + Advantage
      //9 Success + Success
      //10 Success + Success
      //11 Advantage + Advantage
      //12 Advantage + Advantage
      var roll = 0;
      var diceTextLog = "";
      var diceGraphicsLog = "";
      var diceResult = {
          success: 0,
          failure: 0,
          advantage: 0,
          threat: 0,
          triumph: 0,
          despair: 0,
          light: 0,
          dark: 0,
          diceGraphicsLog: "",
          diceTextLog: ""
      };
      var i = 0;
      var s1 = '<img src="';
      var s2 = '" title="';
      var s3 = '" height="';
      var s4 = '" width="';
      var s5 = '"/>';

      if (eote.defaults.globalVars.diceTestEnabled === true) {
          diceQty = 12;
      }
      for (i = 1; i <= diceQty; i++) {
          if (eote.defaults.globalVars.diceTestEnabled === true) {
              roll = roll + 1;
          }
          else {
              roll = randomInteger(12);
          }
          switch (roll) {
              case 1:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.BLANK + s2 + "Proficiency Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  break;
              case 2:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Triumph(+Success))";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.TRIUMPH + s2 + "Proficiency Triumph(+Success)" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.triumph = diceResult.triumph + 1;
                  diceResult.success = diceResult.success + 1;
                  break;
              case 3:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Success)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.S + s2 + "Proficiency Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.success = diceResult.success + 1;
                  break;
              case 4:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Success)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.S + s2 + "Proficiency Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.success = diceResult.success + 1;
                  break;
              case 5:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.A + s2 + "Proficiency Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.advantage = diceResult.advantage + 1;
                  break;
              case 6:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Success + Advantage)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.SA + s2 + "Proficiency Success + Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.success = diceResult.success + 1;
                  diceResult.advantage = diceResult.advantage + 1;
                  break;
              case 7:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Success + Advantage)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.SA + s2 + "Proficiency Success + Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.success = diceResult.success + 1;
                  diceResult.advantage = diceResult.advantage + 1;
                  break;
              case 8:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Success + Advantage)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.SA + s2 + "Proficiency Success + Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.success = diceResult.success + 1;
                  diceResult.advantage = diceResult.advantage + 1;
                  break;
              case 9:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Success x2)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.SS + s2 + "Proficiency Success x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.success = diceResult.success + 2;
                  break;
              case 10:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Success x2)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.SS + s2 + "Proficiency Success x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.success = diceResult.success + 2;
                  break;
              case 11:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage x2)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.AA + s2 + "Proficiency Advantage x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.advantage = diceResult.advantage + 2;
                  break;
              case 12:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Advantage x2)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.PROFICIENCY.AA + s2 + "Proficiency Advantage x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.advantage = diceResult.advantage + 2;
                  break;
          }
      }
      return diceResult;
  },
  setback: function (diceQty) {
      //Black "Setback" die (d6)
      //1 Blank
      //2 Blank
      //3 Failure
      //4 Failure
      //5 Threat
      //6 Threat
      var roll = 0;
      var diceTextLog = "";
      var diceGraphicsLog = "";
      var diceResult = {
          success: 0,
          failure: 0,
          advantage: 0,
          threat: 0,
          triumph: 0,
          despair: 0,
          light: 0,
          dark: 0,
          diceGraphicsLog: "",
          diceTextLog: ""
      };
      var i = 0;
      var s1 = '<img src="';
      var s2 = '" title="';
      var s3 = '" height="';
      var s4 = '" width="';
      var s5 = '"/>';

      if (eote.defaults.globalVars.diceTestEnabled === true) {
          diceQty = 6;
      }
      for (i = 1; i <= diceQty; i++) {
          if (eote.defaults.globalVars.diceTestEnabled === true) {
              roll = roll + 1;
          }
          else {
              roll = randomInteger(6);
          }
          switch (roll) {
              case 1:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SETBACK.BLANK + s2 + "Setback Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  break;
              case 2:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SETBACK.BLANK + s2 + "Setback Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  break;
              case 3:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Failure)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SETBACK.F + s2 + "Setback Failure" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.failure = diceResult.failure + 1;
                  break;
              case 4:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Failure)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SETBACK.F + s2 + "Setback Failure" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.failure = diceResult.failure + 1;
                  break;
              case 5:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SETBACK.T + s2 + "Setback Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.threat = diceResult.threat + 1;
                  break;
              case 6:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SETBACK.T + s2 + "Setback Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.threat = diceResult.threat + 1;
                  break;
          }
      }
      return diceResult;
  },
  difficulty: function (diceQty) {
      //Purple "Difficulty" die (d8)
      //1 Blank
      //2 Failure
      //3 Threat
      //4 Threat
      //5 Threat
      //6 Failure + Failure
      //7 Failure + Threat
      //8 Threat + Threat
      var roll = 0;
      var diceTextLog = "";
      var diceGraphicsLog = "";
      var diceResult = {
          success: 0,
          failure: 0,
          advantage: 0,
          threat: 0,
          triumph: 0,
          despair: 0,
          light: 0,
          dark: 0,
          diceGraphicsLog: "",
          diceTextLog: ""
      };
      var i = 0;
      var s1 = '<img src="';
      var s2 = '" title="';
      var s3 = '" height="';
      var s4 = '" width="';
      var s5 = '"/>';

      if (eote.defaults.globalVars.diceTestEnabled === true) {
          diceQty = 8;
      }
      for (i = 1; i <= diceQty; i++) {
          if (eote.defaults.globalVars.diceTestEnabled === true) {
              roll = roll + 1;
          }
          else {
              roll = randomInteger(8);
          }
          switch (roll) {
              case 1:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.BLANK + s2 + "Difficulty Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  break;
              case 2:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Failure)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.F + s2 + "Difficulty Failure" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.failure = diceResult.failure + 1;
                  break;
              case 3:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.T + s2 + "Difficulty Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.threat = diceResult.threat + 1;
                  break;
              case 4:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.T + s2 + "Difficulty Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.threat = diceResult.threat + 1;
                  break;
              case 5:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.T + s2 + "Difficulty Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.threat = diceResult.threat + 1;
                  break;
              case 6:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Failure x2)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.FF + s2 + "Difficulty Failure x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.failure = diceResult.failure + 2;
                  break;
              case 7:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Failure + Threat)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.FT + s2 + "Difficulty Failure + Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.failure = diceResult.failure + 1;
                  diceResult.threat = diceResult.threat + 1;
                  break;
              case 8:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Threat x2)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.DIFFICULTY.TT + s2 + "Difficulty Threat x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.threat = diceResult.threat + 2;
                  break;
          }
      }
      return diceResult;
  },
  challenge: function (diceQty) {
      //Red "Challenge" die (d12)
      //1 Blank
      //2 Despair
      //3 Failure
      //4 Failure
      //5 Threat
      //6 Threat
      //7 Failure + Failure
      //8 Failure + Failure
      //9 Threat + Threat
      //10 Threat + Threat
      //11 Failure + Threat
      //12 Failure + Threat
      var roll = 0;
      var diceTextLog = "";
      var diceGraphicsLog = "";
      var diceResult = {
          success: 0,
          failure: 0,
          advantage: 0,
          threat: 0,
          triumph: 0,
          despair: 0,
          light: 0,
          dark: 0,
          diceGraphicsLog: "",
          diceTextLog: ""
      };
      var i = 0;
      var s1 = '<img src="';
      var s2 = '" title="';
      var s3 = '" height="';
      var s4 = '" width="';
      var s5 = '"/>';

      if (eote.defaults.globalVars.diceTestEnabled === true) {
          diceQty = 12;
      }
      for (i = 1; i <= diceQty; i++) {
          if (eote.defaults.globalVars.diceTestEnabled === true) {
              roll = roll + 1;
          }
          else {
              roll = randomInteger(12);
          }
          switch (roll) {
              case 1:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Blank)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.BLANK + s2 + "Challenge Blank" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  break;
              case 2:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Despair)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.DESPAIR + s2 + "Challenge Despair" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.despair = diceResult.despair + 1;
                  diceResult.failure = diceResult.failure + 1;
                  break;
              case 3:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Failure)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.F + s2 + "Challenge Failure" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.failure = diceResult.failure + 1;
                  break;
              case 4:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Failure)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.F + s2 + "Challenge Failure" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.failure = diceResult.failure + 1;
                  break;
              case 5:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.T + s2 + "Challenge Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.threat = diceResult.threat + 1;
                  break;
              case 6:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Threat)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.T + s2 + "Challenge Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.threat = diceResult.threat + 1;
                  break;
              case 7:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Failure x2)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.FF + s2 + "Challenge Failure x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.failure = diceResult.failure + 2;
                  break;
              case 8:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Failure x2)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.FF + s2 + "Challenge Failure x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.failure = diceResult.failure + 2;
                  break;
              case 9:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Threat x2)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.TT + s2 + "Challenge Threat x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.threat = diceResult.threat + 2;
                  break;
              case 10:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Threat x2)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.TT + s2 + "Challenge Threat x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.threat = diceResult.threat + 2;
                  break;
              case 11:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Failure + Threat)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.FT + s2 + "Challenge Failure + Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.failure = diceResult.failure + 1;
                  diceResult.threat = diceResult.threat + 1;
                  break;
              case 12:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Failure + Threat)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.CHALLENGE.FT + s2 + "Challenge Failure + Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.failure = diceResult.failure + 1;
                  diceResult.threat = diceResult.threat + 1;
                  break;
          }
      }
      return diceResult;
  },
  force: function (diceQty) {
      //White "Force" die (d12)
      //1 Light
      //2 Light
      //3 Light + Light
      //4 Light + Light
      //5 Light + Light
      //6 Dark
      //7 Dark
      //8 Dark
      //9 Dark
      //10 Dark
      //11 Dark
      //12 Dark + Dark
      var roll = 0;
      var diceTextLog = "";
      var diceGraphicsLog = "";
      var diceResult = {
          success: 0,
          failure: 0,
          advantage: 0,
          threat: 0,
          triumph: 0,
          despair: 0,
          light: 0,
          dark: 0,
          diceGraphicsLog: "",
          diceTextLog: ""
      };
      var i = 0;
      var s1 = '<img src="';
      var s2 = '" title="';
      var s3 = '" height="';
      var s4 = '" width="';
      var s5 = '"/>';

      if (eote.defaults.globalVars.diceTestEnabled === true) {
          diceQty = 12;
      }
      for (i = 1; i <= diceQty; i++) {
          if (eote.defaults.globalVars.diceTestEnabled === true) {
              roll = roll + 1;
          }
          else {
              roll = randomInteger(12);
          }
          switch (roll) {
              case 1:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Light)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.L + s2 + "Force Light" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.light = diceResult.light + 1;
                  break;
              case 2:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Light)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.L + s2 + "Force Light" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.light = diceResult.light + 1;
                  break;
              case 3:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Light x2)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.LL + s2 + "Force Light x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.light = diceResult.light + 2;
                  break;
              case 4:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Light x2)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.LL + s2 + "Force Light x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.light = diceResult.light + 2;
                  break;
              case 5:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Light x2)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.LL + s2 + "Force Light x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.light = diceResult.light + 2;
                  break;
              case 6:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Dark)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.D + s2 + "Force Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.dark = diceResult.dark + 1;
                  break;
              case 7:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Dark)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.D + s2 + "Force Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.dark = diceResult.dark + 1;
                  break;
              case 8:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Dark)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.D + s2 + "Force Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.dark = diceResult.dark + 1;
                  break;
              case 9:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Dark)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.D + s2 + "Force Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.dark = diceResult.dark + 1;
                  break;
              case 10:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Dark)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.D + s2 + "Force Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.dark = diceResult.dark + 1;
                  break;
              case 11:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Dark)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.D + s2 + "Force Dark" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.dark = diceResult.dark + 1;
                  break;
              case 12:
                  diceResult.diceTextLog = diceResult.diceTextLog + "(Dark x2)";
                  diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.FORCE.DD + s2 + "Force Dark x2" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
                  diceResult.dark = diceResult.dark + 2;
                  break;
          }
      }
      return diceResult;
  },
  success: function (diceQty) {
      //Free Success
      var i = 0;
      var s1 = '<img src="';
      var s2 = '" title="';
      var s3 = '" height="';
      var s4 = '" width="';
      var s5 = '"/>';

      var roll = 0;
      var diceTextLog = "";
      var diceGraphicsLog = "";

      var diceResult = {
          success: 0,
          failure: 0,
          advantage: 0,
          threat: 0,
          triumph: 0,
          despair: 0,
          light: 0,
          dark: 0,
          diceGraphicsLog: "",
          diceTextLog: ""
      };
      diceResult.diceTextLog = diceTextLog + "(Success x" + diceQty + ")";
      diceResult.success = diceResult.success + diceQty;
      for (i = 0; i < diceQty; i++) {
          diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SYMBOLS.S + s2 + "Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
      }
      return diceResult;
  },
  advantage: function (diceQty) {
      //Free Advantage
      var i = 0;
      var s1 = '<img src="';
      var s2 = '" title="';
      var s3 = '" height="';
      var s4 = '" width="';
      var s5 = '"/>';

      var roll = 0;
      var diceTextLog = "";
      var diceGraphicsLog = "";

      var diceResult = {
          success: 0,
          failure: 0,
          advantage: 0,
          threat: 0,
          triumph: 0,
          despair: 0,
          light: 0,
          dark: 0,
          diceGraphicsLog: "",
          diceTextLog: ""
      };
      diceResult.diceTextLog = diceTextLog + "(Advantage x" + diceQty + ")";
      diceResult.advantage = diceResult.advantage + diceQty;
      for (i = 0; i < diceQty; i++) {
          diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SYMBOLS.A + s2 + "Advantage" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
      }
      return diceResult;
  },
  threat: function (diceQty) {
      //Free threat
      var i = 0;
      var s1 = '<img src="';
      var s2 = '" title="';
      var s3 = '" height="';
      var s4 = '" width="';
      var s5 = '"/>';

      var roll = 0;
      var diceTextLog = "";
      var diceGraphicsLog = "";

      var diceResult = {
          success: 0,
          failure: 0,
          advantage: 0,
          threat: 0,
          triumph: 0,
          despair: 0,
          light: 0,
          dark: 0,
          diceGraphicsLog: "",
          diceTextLog: ""
      };
      diceResult.diceTextLog = diceTextLog + "(Threat x" + diceQty + ")";
      diceResult.threat = diceResult.threat + diceQty;
      for (i = 0; i < diceQty; i++) {
          diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SYMBOLS.T + s2 + "Threat" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
      }
      return diceResult;
  },
  failure: function (diceQty) {
      //Free Failure
      var i = 0;
      var s1 = '<img src="';
      var s2 = '" title="';
      var s3 = '" height="';
      var s4 = '" width="';
      var s5 = '"/>';

      var roll = 0;
      var diceTextLog = "";
      var diceGraphicsLog = "";

      var diceResult = {
          success: 0,
          failure: 0,
          advantage: 0,
          threat: 0,
          triumph: 0,
          despair: 0,
          light: 0,
          dark: 0,
          diceGraphicsLog: "",
          diceTextLog: ""
      };
      diceResult.diceTextLog = diceTextLog + "(Failure x" + diceQty + ")";
      diceResult.failure = diceResult.failure + diceQty;
      for (i = 0; i < diceQty; i++) {
          diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + eote.defaults.graphics.SYMBOLS.F + s2 + "Success" + s3 + eote.defaults.globalVars.diceGraphicsChatSize + s4 + eote.defaults.globalVars.diceGraphicsChatSize + s5;
      }
      return diceResult;
  }
};

eote.events = function () {

  //event listener Add character defaults to new characters
  on("add:character", function (characterObj) {
      eote.setCharacterDefaults(characterObj);
  });
  on("chat:message", function (msg) {

      if (msg.type != 'api') {
          return;
      }
      eote.process.setup(msg.content, msg.who, msg.playerid);
  });
};

// this only runs once per initialization of the script in order to prevent this process from running too frequently
// this converts any $\w$ token that matches a defined list of tokens into a html image tag.
function convertTokensToTags(skillSuggestions, symReplace) {
  Object.keys(skillSuggestions).forEach(function(categoryKey) {
      var category = skillSuggestions[categoryKey];
      Object.keys(category).forEach(function(categoryElemKey) {
          var categoryElem = category[categoryElemKey];
          Object.keys(categoryElem).forEach(function(symbolKey) {
              var item = categoryElem[symbolKey];
              for (var i = 0; i < item.length; i++)
              {
                  var itemElem = item[i];
                  if (typeof itemElem == "object") {
                      if (itemElem.text.indexOf("$") > 0) {
                          Object.keys(symReplace).forEach(function (symReplaceKey) {
                              itemElem.text = itemElem.text.replace(symReplace[symReplaceKey].matcher, symReplace[symReplaceKey].replacer);
                          });
                      }
                  }
              }
          });
      });
  });
  log("Finished converting tokens to tags");
}

on('ready', function() {
  eote.init();
});