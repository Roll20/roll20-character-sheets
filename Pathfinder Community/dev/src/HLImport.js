'use strict';
import _ from 'underscore';
import TAS from './TheAaronSheet.js';
import {PFLog, PFConsole} from './PFLog';
import * as PFSheet from './PFSheet';
import * as PFHealth from './PFHealth';
import * as PFSpellOptions from './PFSpellOptions';
import * as PFSpells from './PFSpells';

export function parseNum(num) {
  if (_.isUndefined(num) || num === '') return 0;
  return parseInt(num) || 0;
}

export function bonusSpellSlots(abilMod, spellLevel) {
  return Math.max(0, Math.floor((abilMod + 4 - spellLevel) / 4));
}

export function buildList(objArray, propName) {
  return _.map(objArray, function (item) {
    return item[propName];
  }).join(', ');
}

export function getSizeMod(size) {
  switch (size.toLowerCase()) {
    case 'colossal':
      return -8;
    case 'gargantuan':
      return -4;
    case 'huge':
      return -2;
    case 'large':
      return -1;
    case 'small':
      return 1;
    case 'tiny':
      return 2;
    case 'diminutive':
      return 4;
    case 'fine':
      return 8;
    default:
      return 0;
  }
}

// Make sure "stuff" is an array
export function arrayify(stuff) {
  if (_.isUndefined(stuff)) return [];
  if (Array.isArray(stuff)) return stuff;
  return new Array(stuff);
}

export function importInit(attrs, initObj) {
  attrs.init = parseNum(initObj._total);
  attrs['init-misc'] = parseNum(initObj._total) - parseNum(initObj._attrtext);
  attrs['init-ability'] = `${initObj._attrname.substr(0, 3).toUpperCase()}-mod`;
  attrs['init-ability-mod'] = parseNum(initObj._attrtext);
  attrs.init_notes = initObj.situationalmodifiers._text;
}

export function importAbilityScores(attrs, attributes) {
  attributes.forEach(function (abScore) {
    const abName = abScore._name.substr(0, 3).toUpperCase();
    const base = parseNum(abScore.attrvalue._base);
    const modifier = parseNum(abScore.attrvalue._modified) - base; // Modifier is the total difference between what HL is reporting as the character's base ability score and the final modified ability score
    attrs[`${abName}-base`] = base;
    attrs[abName] = parseNum(abScore.attrvalue._modified);
    attrs[`${abName}-mod`] = parseNum(abScore.attrbonus._modified);
    // If the modifier is positive, assume it's an enhancement bonus; otherwise, assume it's a penalty
    if (modifier > 0) {
      attrs[`${abName}-enhance`] = modifier;
      attrs[abName] = parseNum(abScore.attrvalue._modified);
    } else {
      attrs[`${abName}-penalty`] = modifier;
      attrs[abName] = base;
    }
  });
}

export function importSaves(attrs, saves) {
  // Since the XML doesn't break this down by class, add it all to class 0
  let i = 0;
  let saveNotes = saves.allsaves.situationalmodifiers._text;
  for (i = 0; i < saves.save.length; i++) {
    const save = saves.save[i];
    const abbr = save._abbr;

    attrs[abbr] = parseNum(save._save);
    attrs[`class-0-${abbr}`] = attrs[`total-${abbr}`] = parseNum(save._base);
    attrs[`${abbr}-resist`] = parseNum(save._fromresist);
    attrs[`${abbr}-misc`] = parseNum(save._save) - parseNum(save._base) - parseNum(save._fromresist) - parseNum(save._fromattr);
    attrs[`${abbr}-ability-mod`] = parseNum(save._fromattr);

    if (save.situationalmodifiers._text !== '' && saveNotes.indexOf(save.situationalmodifiers._text) === -1)
      saveNotes = `${saveNotes}\n**${abbr}:** ${save.situationalmodifiers._text}`;
  }
  attrs['Save-notes'] = saveNotes.trim();
}

// Find an existing repeatable item with the same name, or generate new row ID
export function getOrMakeRowID(featIDList, name) {
  const attrNames = Object.values(featIDList);
  const rows = Object.keys(featIDList);

  const attrMatch = _.find(attrNames, function (currentAttrName) {
    let attrName = currentAttrName;
    // Eliminate anything in parentheses, dice expressions, and "x#" (we use that to indicate we've taken a feat more than once) before comparing names
    attrName = attrName.replace(/ x[0-9]+$/, '').trim();

    if (attrName === name) {
      const ID = rows[_.indexOf(attrNames, currentAttrName)];
      if (!_.isUndefined(ID)) return true;
    }
    return false;
  });
  if (!_.isUndefined(attrMatch)) return rows[_.indexOf(attrNames, attrMatch)];
  return generateRowID();
}

// Find an existing repeatable item with the same name, or generate new row ID; extra processing for items
export function getOrMakeItemRowID(featIDList, name) {
  const attrNames = Object.values(featIDList);
  const rows = Object.keys(featIDList);

  const compareName = name
    .replace(/\(.*\)/, '')
    .replace(/\+\d+/, '')
    .toLowerCase()
    .replace('masterwork', '')
    .trim();
  const attrMatch = _.find(attrNames, function (currentAttrName) {
    let attrName = currentAttrName;
    // Eliminate anything in parentheses, dice expressions, and "x#" (we use that to indicate we've taken a feat more than once) before comparing names
    attrName = attrName
      .replace(/\(.*\)/, '')
      .replace(/\+\d+/, '')
      .toLowerCase()
      .replace('masterwork', '')
      .trim();

    if (attrName === compareName) {
      const ID = rows[_.indexOf(attrNames, currentAttrName)];
      if (!_.isUndefined(ID)) return true;
    }
    return false;
  });
  if (!_.isUndefined(attrMatch)) return rows[_.indexOf(attrNames, attrMatch)];
  return generateRowID();
}

// Find an existing repeatable item with the same name and spellclass, or generate new row ID
export function getOrMakeSpellRowID(featIDList, name, spellclass) {
  const attrMatch = _.find(featIDList, function (currentFeat) {
    if (currentFeat.name === name && currentFeat.spellclass === spellclass) return true;
    return false;
  });
  if (!_.isUndefined(attrMatch)) return attrMatch.rowID;
  return generateRowID();
}

export function getOrMakeClassRowID(featIDList, name) {
  const attrObjs = Object.values(featIDList);
  const rows = Object.keys(featIDList);

  const attrMatch = _.find(attrObjs, function (currentAttrObj) {
    let attrName = currentAttrObj.name;
    // Eliminate anything in parentheses, dice expressions, and "x#" (we use that to indicate we've taken a feat more than once) before comparing names
    name = name
      .replace(/\(.+\)/g, '')
      .replace(/\d+d\d+(\+\d*)*/g, '')
      .replace(/\+\d+/g, '')
      .trim();

    attrName = attrName
      .replace(/\(.+\)/g, '')
      .replace(/\d+d\d+(\+\d*)*/g, '')
      .replace(/\+\d+/g, '')
      .trim();

    if (attrName === name) return true;
    return false;
  });
  if (!_.isUndefined(attrMatch)) return attrMatch.rowID;
  return generateRowID();
}

export function importFeats(attrs, feats, featIDList, resources) {
  const repeatPrefix = 'repeating_ability';
  const skipList = [];
  const featNames = _.map(feats, function (feat) {
    return feat._name;
  });
  _.each(feats, function (feat) {
    // Early exit if we already dealt with another copy of this feat
    if (_.contains(skipList, feat._name)) return;

    // Count the number of times the feat is listed, so we can indicate that in the feat name
    const taken = _.filter(featNames, function (featName) {
      return featName === feat._name;
    }).length;

    const row = getOrMakeRowID(featIDList, feat._name);
    if (!_.isUndefined(featIDList[row])) delete featIDList[row];

    if (taken > 1) attrs[`${repeatPrefix}_${row}_name`] = `${feat._name} x${taken}`;
    else attrs[`${repeatPrefix}_${row}_name`] = feat._name;
    attrs[`${repeatPrefix}_${row}_description`] = feat.description;
    attrs[`${repeatPrefix}_${row}_tabcat`] = attrs[`${repeatPrefix}_${row}_rule_category`] = 'feats';
    skipList.push(feat._name);
    if (_.contains(Object.keys(resources), feat._name)) attrs[`${repeatPrefix}_${row}_max-calculation`] = resources[feat._name]._max;
  });
}

// Hero Lab stores armor and shields identically, so so assume anything with "shield" or "klar" in the name is a shield
export function nameIsShield(name) {
  if (name.toLowerCase().indexOf('shield') !== -1 || name.toLowerCase().indexOf('buckler') !== -1 || name.toLowerCase().indexOf('klar') !== -1) return true;
  return false;
}

export function importItems(items, resources, armorPenalties, armor, weapons) {
  let repeatPrefix = 'repeating_item';
  getSectionIDs(repeatPrefix, function (idarray) {
    const itemNameAttrs = _.union(
      _.map(idarray, function (id) {
        return `${repeatPrefix}_${id}_name`;
      }),
      ['shield3-acp', 'shield3-spell-fail'],
    );
    getAttrs(itemNameAttrs, function (names) {
      // Pull out the shield attributes before we build the ID list
      const shieldACP = parseNum(names['shield3-acp']);
      const shieldASF = parseNum(names['shield3-spell-fail']);
      if (!_.isUndefined(names['shield3-acp'])) delete names['shield3-acp'];
      if (!_.isUndefined(names['shield3-spell-fail'])) delete names['shield3-spell-fail'];

      const itemIDList = _.object(
        _.map(names, function (name, attr) {
          return [attr.substring(repeatPrefix.length + 1, attr.indexOf('_name')), name];
        }),
      );
      const itemsList = [];
      const attrs = {};
      const armorNames = _.map(armor, function (obj) {
        return obj._name;
      });
      const weaponNames = _.map(weapons, function (obj) {
        return obj._name;
      });

      // List of words that indicate an item is masterwork
      const masterworkWords = ['mithral', 'adamantine', 'angelskin', 'darkleaf', 'darkwood', 'dragonhide', 'eel', 'fire-forged', 'frost-forged', 'greenwood', 'paueliel'];
      _.each(items, function (item) {
        const row = getOrMakeItemRowID(itemIDList, item._name);
        if (!_.isUndefined(itemIDList[row])) delete itemIDList[row];
        itemsList.push(item._name);

        repeatPrefix = `repeating_item_${row}`;
        attrs[`${repeatPrefix}_name`] = item._name;
        attrs[`${repeatPrefix}_item-weight`] = item.weight._value;
        attrs[`${repeatPrefix}_value`] = parseFloat(item.cost._value) / parseInt(item._quantity);
        attrs[`${repeatPrefix}_description`] = item.description;

        if (_.contains(Object.keys(resources), item._name) && item._quantity === '1' && resources[item._name]._max !== '1') {
          attrs[`${repeatPrefix}_qty`] = resources[item._name]._left;
          attrs[`${repeatPrefix}_qty_max`] = resources[item._name]._max;
        } else attrs[`${repeatPrefix}_qty`] = item._quantity;

        if (!_.isUndefined(item.itempower))
          _.each(arrayify(item.itempower), function (itemPower) {
            itemsList.push(itemPower._name);
          });

        // check if this is a weapon
        let weaponCompareName = item._name;
        // If this is a shield (but not a klar), the attack name will be "Heavy/light shield bash"
        if (item._name.toLowerCase().indexOf('shield') !== -1) {
          let attackName;
          if (item._name.toLowerCase().indexOf('heavy' !== -1)) attackName = 'heavy shield bash';
          else attackName = 'light shield bash';
          weaponCompareName =
            _.find(weaponNames, function (name) {
              if (name.toLowerCase().indexOf(attackName) !== -1) return true;
              return false;
            }) || item._name;
        }
        if (_.contains(weaponNames, weaponCompareName)) {
          const weaponObj = weapons[_.indexOf(weaponNames, weaponCompareName)];
          if (weaponObj._damage !== 'As Spell') {
            attrs[`${repeatPrefix}_item-wpenhance`] = parseNum(weaponObj._name.match(/\+\d+/));

            if (!_.isUndefined(weaponObj._typetext)) attrs[`${repeatPrefix}_item-dmg-type`] = weaponObj._typetext;

            // Check to see if item name includes any words that indicate this is a masterwork item
            if (weaponCompareName.toLowerCase().indexOf('masterwork') !== -1 || _.intersection(masterworkWords, item._name.toLowerCase().split(' ')).length > 0)
              attrs[`${repeatPrefix}_item-masterwork`] = 1;

            if (!_.isUndefined(weaponObj._damage)) {
              const weaponDice = weaponObj._damage.match(/\d+d\d+/);
              if (!_.isNull(weaponDice) && weaponDice.length > 0) {
                attrs[`${repeatPrefix}_item-damage-dice-num`] = parseNum(weaponDice[0].split('d')[0]);
                attrs[`${repeatPrefix}_item-damage-die`] = parseNum(weaponDice[0].split('d')[1]);
              }
            }

            if (!_.isUndefined(weaponObj._crit)) {
              const critArray = weaponObj._crit.split('/');
              if (critArray.length > 1) attrs[`${repeatPrefix}_item-crit-target`] = parseNum(critArray[0].match(/\d+/)[0]);
              else attrs[`${repeatPrefix}_item-crit-target`] = 20;
              attrs[`${repeatPrefix}_item-crit-multiplier`] = parseNum(critArray[critArray.length - 1].replace(/\D/g, ''));
            }

            if (!_.isUndefined(weaponObj.rangedattack) && !_.isUndefined(weaponObj.rangedattack._rangeincvalue))
              attrs[`${repeatPrefix}_item-range`] = parseNum(weaponObj.rangedattack._rangeincvalue);
          }
        }

        // check if this is armor
        // If this is a klar, the armor name will be different
        let armorCompareName = item._name;
        if (item._name.toLowerCase().indexOf('klar') !== -1) {
          armorCompareName =
            _.find(armorNames, function (name) {
              if (name.toLowerCase().indexOf('klar') !== -1) return true;
              return false;
            }) || item._name;
        }
        if (_.contains(armorNames, armorCompareName)) {
          const armorObj = armor[_.indexOf(armorNames, armorCompareName)];

          // Item is a shield
          if (nameIsShield(item._name)) {
            var enhancement = parseNum(armorCompareName.match(/\+\d+/));
            var ACbonus = parseNum(armorObj._ac) - enhancement;
            attrs[`${repeatPrefix}_item-acbonus`] = ACbonus;
            attrs[`${repeatPrefix}_item-acenhance`] = enhancement;
            if (!_.isUndefined(armorObj._equipped) && armorObj._equipped === 'yes') {
              attrs[`${repeatPrefix}_item-acp`] = shieldACP;
              attrs[`${repeatPrefix}_item-spell-fail`] = shieldASF;
              attrs.shield3 = item._name;
              attrs['shield3-acbonus'] = ACbonus;
              attrs['shield3-enhance'] = enhancement;
            }
          } else {
            var enhancement = parseNum(item._name.match(/\+\d+/));
            var ACbonus = parseNum(armorObj._ac) - enhancement;
            attrs[`${repeatPrefix}_item-acbonus`] = ACbonus;
            attrs[`${repeatPrefix}_item-acenhance`] = enhancement;
            if (!_.isUndefined(armorObj._equipped) && armorObj._equipped === 'yes') {
              attrs['armor3-acp'] = attrs[`${repeatPrefix}_item-acp`] = armorPenalties.ACP - shieldACP;
              attrs['armor3-spell-fail'] = attrs[`${repeatPrefix}_item-spell-fail`] = armorPenalties.spellfail - shieldASF;
              if (armorPenalties.maxDex === 99) attrs['armor3-max-dex'] = attrs[`${repeatPrefix}_item-max-dex`] = '';
              else attrs['armor3-max-dex'] = attrs[`${repeatPrefix}_item-max-dex`] = armorPenalties.maxDex;
              attrs.armor3 = item._name;
              attrs['armor3-acbonus'] = ACbonus;
              attrs['armor3-enhance'] = enhancement;
            }
          }
        }
      });
      setAttrs(attrs, {silent: true});
    });
  });
}

export function importTraits(attrs, traits, traitIDList, resources) {
  const repeatPrefix = 'repeating_ability';
  traits.forEach(function (trait) {
    const row = getOrMakeRowID(traitIDList, trait._name);
    if (!_.isUndefined(traitIDList[row])) delete traitIDList[row];
    attrs[`${repeatPrefix}_${row}_name`] = trait._name;
    attrs[`${repeatPrefix}_${row}_description`] = trait.description;
    attrs[`${repeatPrefix}_${row}_tabcat`] = attrs[`${repeatPrefix}_${row}_rule_category`] = 'traits';
    if (_.contains(Object.keys(resources), trait._name)) attrs[`${repeatPrefix}_${row}_max-calculation`] = resources[trait._name]._max;
  });
}

export function importSLAs(attrs, SLAs, SLAsIDList, resources) {
  const repeatPrefix = 'repeating_ability';
  SLAs.forEach(function (SLA) {
    const row = getOrMakeRowID(SLAsIDList, SLA._name);
    if (!_.isUndefined(SLAsIDList[row])) delete SLAsIDList[row];
    attrs[`${repeatPrefix}_${row}_name`] = SLA._name;
    attrs[`${repeatPrefix}_${row}_description`] = SLA.description;
    attrs[`${repeatPrefix}_${row}_tabcat`] = attrs[`${repeatPrefix}_${row}_rule_category`] = 'spell-like-abilities';
    attrs[`${repeatPrefix}_${row}_tabcat2`] = attrs[`${repeatPrefix}_${row}_ability_type`] = 'Sp';
    if (_.contains(Object.keys(resources), SLA._name)) attrs[`${repeatPrefix}_${row}_max-calculation`] = resources[SLA._name]._max;
  });
}

export function importFeatures(attrs, featureList, specials, archetypes, resources) {
  const specNameList = _.map(specials, function (special) {
    return special._name;
  });
  const skipList = [];
  _.each(specials, function (special) {
    let name = special._name;
    let repeatPrefix = 'repeating_ability';
    let row;
    let classSource = -1;
    const cleanName = name
      .replace(/ x[0-9]+$/, '')
      .replace(/\(([^\)]*)\)/g, '')
      .trim();
    if (_.contains(skipList, cleanName)) return;
    const multiList = _.filter(specNameList, function (spec) {
      return spec.replace(/\(([^\)]*)\)/g, '').trim() === cleanName;
    });
    if (multiList.length > 1) {
      skipList.push(cleanName);
      const parenList = _.map(multiList, function (item) {
        return item
          .match(/\(([^\)]*)\)/)[0]
          .replace('(', '')
          .replace(')', '');
      });
      name = name.replace(/\(([^\)]*)\)/, `(${_.uniq(parenList).join(', ')})`);
    }
    row = getOrMakeClassRowID(featureList, name);
    repeatPrefix = `repeating_ability_${row}`;
    if (!_.isUndefined(featureList[row])) delete featureList[row];
    // If we created a new row for this, set rule category
    else {
      // Import if it has a "specsource", assume it's a class feature
      if (special.specsource) attrs[`${repeatPrefix}_tabcat`] = attrs[`${repeatPrefix}_rule_category`] = 'class-features';
      else attrs[`${repeatPrefix}_tabcat`] = attrs[`${repeatPrefix}_rule_category`] = 'racial-traits';
    }
    classSource = getClassSource(arrayify(special.specsource), archetypes);
    attrs[`${repeatPrefix}_name`] = name;
    attrs[`${repeatPrefix}_description`] = special.description;

    if (classSource !== -1) {
      attrs[`${repeatPrefix}_CL-basis`] = `@{class-${classSource}-level}`;
      attrs[`${repeatPrefix}_class-name`] = Object.keys(archetypes)[classSource];
    }

    if (_.contains(Object.keys(resources), special._name)) attrs[`${repeatPrefix}_max-calculation`] = resources[special._name]._max;

    if (!_.isUndefined(special._type)) attrs[`${repeatPrefix}_tabcat2`] = attrs[`${repeatPrefix}_ability_type`] = special._type.substr(0, 2);
  });
}

export function importClasses(attrs, classes, hitdice) {
  const classList = new Object();
  let diceList = _.without(
    _.map(
      hitdice
        .split(';')
        [hitdice.split(';').length - 1].trim()
        .split(/[\+\-]/),
      function (hitdie) {
        const splitDie = hitdie.split('d');
        if (splitDie.length < 2) return null;
        return {dice: splitDie[0], die: splitDie[1]};
      },
    ),
    null,
  );

  let i = 0;
  let classObj;
  while (i < classes.length) {
    classObj = classes[i];

    // We can only handle 5 classes
    if (i >= 5) return;

    if (i > 0) attrs[`class${i}_show`] = 1;

    classList[
      classObj._name
        .replace(/\(([^\)]*)\)/g, '')
        .replace('(', '')
        .replace(')', '')
        .trim()
    ] = classObj;
    attrs[`class-${i}-name`] = classObj._name;
    attrs[`class-${i}-level`] = classObj._level;

    const hitDie = _.find(diceList, function (dieObj) {
      return dieObj.dice === classObj._level;
    });
    if (!_.isUndefined(hitDie)) {
      attrs[`class-${i}-hd`] = hitDie.die;
      diceList = _.without(diceList, hitDie);
    }
    i++;
  }

  // Assign any remaining hit dice to racial
  if (diceList.length > 0) attrs['npc-hd'] = diceList[0].die;

  return classList;
}

// Import spellclasses; presence in spellclasses node means it's a spellcaster, but some of the data is in the classes node
export function importSpellClasses(attrs, spellclasses, classes, abScores) {
  const spellClassesList = new Object();

  let i;
  let j;
  let abMod = 0;
  let currentAbMod;
  let spellslots;
  let spelllevel;
  let casterlevel;
  let concmod;
  let spellpenmod;
  let spellClassIndex = 0;
  for (i = 0; i < spellclasses.length; i++) {
    const spellClass = spellclasses[i];
    // Only 3 spellclasses on character sheet, so if they somehow have more...
    if (spellClassIndex >= 3) return spellClassesList;

    var spellClassName = spellClass._name
      .replace(/\(([^\)]*)\)/g, '')
      .replace('(', '')
      .replace(')', '')
      .trim();
    const classIndex = _.indexOf(
      Object.keys(classes),
      _.find(Object.keys(classes), function (className) {
        if (className.toLowerCase().indexOf(spellClassName.toLowerCase()) !== -1) return true;
        return false;
      }),
    );

    if (classIndex !== -1) {
      casterlevel = parseNum(classes[spellClassName]._casterlevel);
      attrs[`spellclass-${spellClassIndex}`] = classIndex;
      attrs[`spellclass-${spellClassIndex}-level-misc`] = casterlevel - parseNum(classes[spellClassName]._level);
      attrs[`spellclass-${spellClassIndex}-level`] = parseNum(classes[spellClassName]._level);
      attrs[`spellclass-${spellClassIndex}-level-total`] = casterlevel;
      attrs[`spellclass-${spellClassIndex}-name`] = classes[spellClassName]._name.replace(/\(.*\)/g, '').trim();
      attrs[`spellclass-${spellClassIndex}-exists`] = 1;

      attrs[`spellclass-${spellClassIndex}-close`] = 25 + 5 * Math.floor(casterlevel / 2);
      attrs[`spellclass-${spellClassIndex}-medium`] = 100 + 10 * casterlevel;
      attrs[`spellclass-${spellClassIndex}-long`] = 400 + 40 * casterlevel;

      if (!_.isUndefined(classes[spellClassName].arcanespellfailure)) attrs['armor3-spell-fail'] = parseNum(classes[spellClassName].arcanespellfailure._value);

      // Make a guess at which ability modifier is used for this class
      if (!_.isUndefined(classes[spellClassName]._basespelldc)) {
        abMod = parseNum(classes[spellClassName]._basespelldc) - 10;

        // Start at the fourth ability score (Intelligence), so we skip the physical abilities
        for (j = 3; j < abScores.length; j++) {
          if (parseNum(abScores[j].attrbonus._modified) === abMod) {
            attrs[`Concentration-${spellClassIndex}-ability`] = `${abScores[j]._name.substr(0, 3).toUpperCase()}-mod`;
            break;
          }
        }
      }

      if (abMod !== 0) {
        // Calculate misc mods to concentration
        if (!_.isUndefined(classes[spellClassName]._concentrationcheck)) {
          concmod = parseNum(classes[spellClassName]._concentrationcheck) - casterlevel - abMod;
          attrs[`Concentration-${spellClassIndex}-misc`] = concmod;
          attrs[`Concentration-${spellClassIndex}`] = parseNum(classes[spellClassName]._concentrationcheck);
          attrs[`Concentration-${spellClassIndex}-mod`] = abMod;
        }

        // Calculate misc mods to spell penetration
        if (!_.isUndefined(classes[spellClassName].overcomespellresistance)) {
          spellpenmod = parseNum(classes[spellClassName].overcomespellresistance) - casterlevel;
          attrs[`spellclass-${spellClassIndex}-SP_misc`] = spellpenmod;
        }

        // Populate spells / day; Hero Lab includes bonus slots, so remove those
        if (!_.isUndefined(spellclasses[i].spelllevel)) {
          // Initialize spells/day
          for (j = 0; j < 10; j++) attrs[`spellclass-${spellClassIndex}-level-${j}-spells-per-day_max`] = 0;
          spellclasses[i].spelllevel = arrayify(spellclasses[i].spelllevel);
          for (j = 0; j < spellclasses[i].spelllevel.length; j++) {
            spellslots = parseNum(spellclasses[i].spelllevel[j]._maxcasts);
            spelllevel = parseNum(spellclasses[i].spelllevel[j]._level);
            attrs[`spellclass-${spellClassIndex}-level-${spelllevel}-spells-per-day_max`] = spellslots;
            if (spelllevel > 0) spellslots -= bonusSpellSlots(abMod, spelllevel);
            if (spellslots < 0) spellslots = '';
            attrs[`spellclass-${spellClassIndex}-level-${spelllevel}-class`] = spellslots;
          }
        }
        // Set bonus spell slot table entries
        attrs[`spellclass-${spellClassIndex}-level-1-bonus`] = bonusSpellSlots(abMod, 1);
        attrs[`spellclass-${spellClassIndex}-level-2-bonus`] = bonusSpellSlots(abMod, 2);
        attrs[`spellclass-${spellClassIndex}-level-3-bonus`] = bonusSpellSlots(abMod, 3);
        attrs[`spellclass-${spellClassIndex}-level-4-bonus`] = bonusSpellSlots(abMod, 4);
        attrs[`spellclass-${spellClassIndex}-level-5-bonus`] = bonusSpellSlots(abMod, 5);
        attrs[`spellclass-${spellClassIndex}-level-6-bonus`] = bonusSpellSlots(abMod, 6);
        attrs[`spellclass-${spellClassIndex}-level-7-bonus`] = bonusSpellSlots(abMod, 7);
        attrs[`spellclass-${spellClassIndex}-level-8-bonus`] = bonusSpellSlots(abMod, 8);
        attrs[`spellclass-${spellClassIndex}-level-9-bonus`] = bonusSpellSlots(abMod, 9);
      }
      spellClassesList[spellClassName] = classes[Object.keys(classes)[classIndex]];
      spellClassIndex++;
    }
  }

  if (spellClassIndex > 1) attrs.spellclasses_multiclassed = 1;

  return spellClassesList;
}

export function importSpells(spells, spellclasses) {
  const wizNames = ['Abjurer', 'Conjurer', 'Diviner', 'Enchanter', 'Evoker', 'Illusionist', 'Necromancer', 'Transmuter'];
  let repeatPrefix = 'repeating_spells';
  getSectionIDs(repeatPrefix, function (idarray) {
    const spellNameAttrs = _.union(
      _.map(idarray, function (id) {
        return `${repeatPrefix}_${id}_name`;
      }),
      _.map(idarray, function (id) {
        return `${repeatPrefix}_${id}_spellclass_number`;
      }),
    );
    getAttrs(spellNameAttrs, function (spellAttrs) {
      const spellObjList = {};
      const spellKeys = Object.keys(spellAttrs);
      _.each(spellKeys, function (spellKey) {
        let rowID;
        if (spellKey.indexOf('_name') !== -1) {
          rowID = spellKey.substring(repeatPrefix.length + 1, spellKey.indexOf('_name'));
          if (_.isUndefined(spellObjList[rowID])) spellObjList[rowID] = {rowID};
          spellObjList[rowID].name = spellAttrs[spellKey];
        }
        if (spellKey.indexOf('_spellclass_number') !== -1) {
          rowID = spellKey.substring(repeatPrefix.length + 1, spellKey.indexOf('_spellclass_number'));
          if (_.isUndefined(spellObjList[rowID])) spellObjList[rowID] = {rowID};
          spellObjList[rowID].spellclass = spellAttrs[spellKey];
        }
      });

      const spellClassesKeys = Object.keys(spellclasses);
      const attrs = {};
      _.each(spells, function (spell) {
        let rowID;
        let spellClass;
        let spellClassName;
        let spellName;
        let school;
        let level;

        // Search for a repeating spell with the same name and spellclass; if not found, make new row
        level = parseNum(spell._level);
        repeatPrefix = 'repeating_spells_';
        spellName = spell._name.replace(/\(x\d+\)/, '').trim();

        // If the spell doesn't specify a class, assume its our first spellcaster
        if (spell._class === '') {
          spellClass = 0;
          spellClassName = spellClassesKeys[0];
        } else {
          spellClassName = spell._class;
          spellClass = _.indexOf(spellClassesKeys, spellClassName);

          if (spellClass === -1) {
            spellClassName = _.intersection(spellClassesKeys, wizNames)[0];
            spellClass = _.indexOf(spellClassesKeys, spellClassName);
          }
        }

        rowID = getOrMakeSpellRowID(spellObjList, spellName, spellClass);
        if (_.isUndefined(rowID)) {
          console.log('Undefined spell row ID!');
          console.log(spell);
        }
        // Update prefix with ID
        repeatPrefix += rowID;

        attrs[`${repeatPrefix}_name`] = spellName;
        attrs[`${repeatPrefix}_spell_level_r`] = attrs[`${repeatPrefix}_spell_level`] = level;
        attrs[`${repeatPrefix}_spellclass_number`] = spellClass;
        attrs[`${repeatPrefix}_spellclass`] = spellClassName;
        attrs[`${repeatPrefix}_components`] = spell._componenttext
          .replace('Divine Focus', 'DF')
          .replace('Focus', 'F')
          .replace('Material', 'M')
          .replace('Verbal', 'V')
          .replace('Somatic', 'S')
          .replace(' or ', '/');
        attrs[`${repeatPrefix}_duration`] = spell._duration;
        attrs[`${repeatPrefix}_save`] = spell._save.replace(/DC \d+/, '').trim();
        attrs[`${repeatPrefix}_savedc`] = parseNum(spell._dc);
        attrs[`${repeatPrefix}_cast-time`] = spell._casttime;
        attrs[`${repeatPrefix}_DC_misc`] = parseNum(spell._dc) - parseNum(spellclasses[spellClassName !== '' ? spellClassName : Object.keys(spellclasses)[0]]._basespelldc) - level;
        attrs[`${repeatPrefix}_CL_misc`] =
          parseNum(spell._casterlevel) - parseNum(spellclasses[spellClassName !== '' ? spellClassName : Object.keys(spellclasses)[0]]._casterlevel);
        attrs[`${repeatPrefix}_casterlevel`] = spell._casterlevel;

        if (spell._resist.toLowerCase().indexOf('yes') !== -1) {
          if (spell._resist.toLowerCase().indexOf('harmless') !== -1) attrs[`${repeatPrefix}_sr`] = 'Yes (Harmless)';
          else if (spell._resist.toLowerCase().indexOf('object') !== -1) attrs[`${repeatPrefix}_sr`] = 'Yes (Object)';
          else attrs[`${repeatPrefix}_sr`] = 'Yes';
        } else if (spell._resist.toLowerCase().indexOf('no') !== -1) attrs[`${repeatPrefix}_sr`] = 'No';
        else attrs[`${repeatPrefix}_sr`] = '';

        switch (spell._range.toLowerCase()) {
          case 'close (25 + 5 ft./2 levels)':
            attrs[`${repeatPrefix}_range_pick`] = 'close';
            break;
          case 'medium (100 + 10 ft./level)':
            attrs[`${repeatPrefix}_range_pick`] = 'medium';
            break;
          case 'long (400 + 40 ft./level)':
            attrs[`${repeatPrefix}_range_pick`] = 'long';
            break;
          case 'touch':
          case 'personal':
            attrs[`${repeatPrefix}_range_pick`] = spell._range.toLowerCase();
            break;
          default:
            attrs[`${repeatPrefix}_range_pick`] = 'number';
            attrs[`${repeatPrefix}_range`] = spell._range;
        }

        if (spell._area !== '') attrs[`${repeatPrefix}_targets`] = spell._area;
        else if (spell._effect !== '') attrs[`${repeatPrefix}_targets`] = spell._effect;
        else attrs[`${repeatPrefix}_targets`] = spell._target;

        school = spell._schooltext;
        if (spell._subschooltext !== '') school = `${school} (${spell._subschooltext})`;
        if (spell._descriptortext !== '') school = `${school} [${spell._descriptortext}]`;
        attrs[`${repeatPrefix}_school`] = school;

        attrs[`${repeatPrefix}_description`] = spell.description;
      });
      setAttrs(attrs, {silent: true}, function () {
        PFSpellOptions.resetOptions();
        PFSpells.resetCommandMacro();
      });
    });
  });
}

export function calcHitDice(hitdice) {
  const dice = hitdice.match(/\d+d\d/g);
  let numDice = 0;
  let i = 0;
  while (i < dice.length) {
    numDice += parseInt(dice[i].split('d')[0]);
    i++;
  }
  return numDice;
}

// Builds an object collection of archetypes, with the appropriate classes as the keys, in the order they're entered in the character sheet; use this to determine class specials come from
export function buildArchetypeArray(classes) {
  const archetypes = new Object();

  _.each(classes, function (classObj, className) {
    if (classObj._name.indexOf('(') === -1) {
      archetypes[className] = [];
      return;
    }
    const archeString = classObj._name
      .match(/\(([^\)]*)\)/)[0]
      .replace('(', '')
      .replace(')', '');
    let archeList = archeString.split(',');
    archeList = _.map(archeList, function (arche) {
      return arche.trim();
    });
    archetypes[className] = archeList;
  });
  return archetypes;
}

// Returns the array number of the class that grants a feature; returns -1 if we can't find the class
export function getClassSource(sources, archetypes) {
  // If there's no listed source, it isn't from a class
  if (!sources.length) return -1;

  // Grab an array of class names from the archetypes object
  const classes = Object.keys(archetypes);

  // Check if source is a class, first
  const intersect = _.intersection(sources, classes);
  if (intersect.length) return classes.indexOf(intersect[0]);

  // If not a class, check for an archetype as a source, and return the associated class
  const className = _.find(classes, function (item) {
    return _.intersection(archetypes[item], sources).length;
  });
  if (className) return classes.indexOf(className);

  return -1;
}

export function importSkills(attrs, skills, size, ACP) {
  // Ripped from the PF character sheet JS
  let skillSize;
  switch (Math.abs(size)) {
    case 0:
      skillSize = 0;
      break;
    case 1:
      skillSize = 2;
      break;
    case 2:
      skillSize = 4;
      break;
    case 4:
      skillSize = 6;
      break;
    case 8:
      skillSize = 8;
      break;
    case 16:
      skillSize = 10;
      break;
    default:
      skillSize = 0;
  }
  if (size < 0) {
    skillSize *= -1;
  }

  // Clear out all existing skills data
  _.extend(attrs, {
    'acrobatics-ability': '',
    'acrobatics-cs': '',
    'acrobatics-ranks': '',
    'acrobatics-class': '',
    'acrobatics-ability-mod': '',
    'acrobatics-racial': '',
    'acrobatics-feat': '',
    'acrobatics-item': '',
    'acrobatics-size': '',
    'acrobatics-acp': '',
    'acrobatics-misc': '',
    'acrobatics-reqtrain': '',
    'artistry-ability': '',
    'artistry-cs': '',
    'artistry-ranks': '',
    'artistry-class': '',
    'artistry-ability-mod': '',
    'artistry-racial': '',
    'artistry-feat': '',
    'artistry-item': '',
    'artistry-size': '',
    'artistry-acp': '',
    'artistry-misc': '',
    'artistry-reqtrain': '',
    'artistry2-ability': '',
    'artistry2-cs': '',
    'artistry2-ranks': '',
    'artistry2-class': '',
    'artistry2-ability-mod': '',
    'artistry2-racial': '',
    'artistry2-feat': '',
    'artistry2-item': '',
    'artistry2-size': '',
    'artistry2-acp': '',
    'artistry2-misc': '',
    'artistry2-reqtrain': '',
    'artistry3-ability': '',
    'artistry3-cs': '',
    'artistry3-ranks': '',
    'artistry3-class': '',
    'artistry3-ability-mod': '',
    'artistry3-racial': '',
    'artistry3-feat': '',
    'artistry3-item': '',
    'artistry3-size': '',
    'artistry3-acp': '',
    'artistry3-misc': '',
    'artistry3-reqtrain': '',
    'appraise-ability': '',
    'appraise-cs': '',
    'appraise-ranks': '',
    'appraise-class': '',
    'appraise-ability-mod': '',
    'appraise-racial': '',
    'appraise-feat': '',
    'appraise-item': '',
    'appraise-size': '',
    'appraise-acp': '',
    'appraise-misc': '',
    'appraise-reqtrain': '',
    'bluff-ability': '',
    'bluff-cs': '',
    'bluff-ranks': '',
    'bluff-class': '',
    'bluff-ability-mod': '',
    'bluff-racial': '',
    'bluff-feat': '',
    'bluff-item': '',
    'bluff-size': '',
    'bluff-acp': '',
    'bluff-misc': '',
    'bluff-reqtrain': '',
    'climb-ability': '',
    'climb-cs': '',
    'climb-ranks': '',
    'climb-class': '',
    'climb-ability-mod': '',
    'climb-racial': '',
    'climb-feat': '',
    'climb-item': '',
    'climb-size': '',
    'climb-acp': '',
    'climb-misc': '',
    'climb-reqtrain': '',
    'craft-ability': '',
    'craft-cs': '',
    'craft-ranks': '',
    'craft-class': '',
    'craft-ability-mod': '',
    'craft-racial': '',
    'craft-feat': '',
    'craft-item': '',
    'craft-size': '',
    'craft-acp': '',
    'craft-misc': '',
    'craft-reqtrain': '',
    'craft2-ability': '',
    'craft2-cs': '',
    'craft2-ranks': '',
    'craft2-class': '',
    'craft2-ability-mod': '',
    'craft2-racial': '',
    'craft2-feat': '',
    'craft2-item': '',
    'craft2-size': '',
    'craft2-acp': '',
    'craft2-misc': '',
    'craft2-reqtrain': '',
    'craft3-ability': '',
    'craft3-cs': '',
    'craft3-ranks': '',
    'craft3-class': '',
    'craft3-ability-mod': '',
    'craft3-racial': '',
    'craft3-feat': '',
    'craft3-item': '',
    'craft3-size': '',
    'craft3-acp': '',
    'craft3-misc': '',
    'craft3-reqtrain': '',
    'diplomacy-ability': '',
    'diplomacy-cs': '',
    'diplomacy-ranks': '',
    'diplomacy-class': '',
    'diplomacy-ability-mod': '',
    'diplomacy-racial': '',
    'diplomacy-feat': '',
    'diplomacy-item': '',
    'diplomacy-size': '',
    'diplomacy-acp': '',
    'diplomacy-misc': '',
    'diplomacy-reqtrain': '',
    'disable-device-ability': '',
    'disable-device-cs': '',
    'disable-device-ranks': '',
    'disable-device-class': '',
    'disable-device-ability-mod': '',
    'disable-device-racial': '',
    'disable-device-feat': '',
    'disable-device-item': '',
    'disable-device-size': '',
    'disable-device-acp': '',
    'disable-device-misc': '',
    'disable-device-reqtrain': '',
    'disguise-ability': '',
    'disguise-cs': '',
    'disguise-ranks': '',
    'disguise-class': '',
    'disguise-ability-mod': '',
    'disguise-racial': '',
    'disguise-feat': '',
    'disguise-item': '',
    'disguise-size': '',
    'disguise-acp': '',
    'disguise-misc': '',
    'disguise-reqtrain': '',
    'escape-artist-ability': '',
    'escape-artist-cs': '',
    'escape-artist-ranks': '',
    'escape-artist-class': '',
    'escape-artist-ability-mod': '',
    'escape-artist-racial': '',
    'escape-artist-feat': '',
    'escape-artist-item': '',
    'escape-artist-size': '',
    'escape-artist-acp': '',
    'escape-artist-misc': '',
    'escape-artist-reqtrain': '',
    'fly-ability': '',
    'fly-cs': '',
    'fly-ranks': '',
    'fly-class': '',
    'fly-ability-mod': '',
    'fly-racial': '',
    'fly-feat': '',
    'fly-item': '',
    'fly-size': '',
    'fly-acp': '',
    'fly-misc': '',
    'fly-reqtrain': '',
    'handle-animal-ability': '',
    'handle-animal-cs': '',
    'handle-animal-ranks': '',
    'handle-animal-class': '',
    'handle-animal-ability-mod': '',
    'handle-animal-racial': '',
    'handle-animal-feat': '',
    'handle-animal-item': '',
    'handle-animal-size': '',
    'handle-animal-acp': '',
    'handle-animal-misc': '',
    'handle-animal-reqtrain': '',
    'heal-ability': '',
    'heal-cs': '',
    'heal-ranks': '',
    'heal-class': '',
    'heal-ability-mod': '',
    'heal-racial': '',
    'heal-feat': '',
    'heal-item': '',
    'heal-size': '',
    'heal-acp': '',
    'heal-misc': '',
    'heal-reqtrain': '',
    'intimidate-ability': '',
    'intimidate-cs': '',
    'intimidate-ranks': '',
    'intimidate-class': '',
    'intimidate-ability-mod': '',
    'intimidate-racial': '',
    'intimidate-feat': '',
    'intimidate-item': '',
    'intimidate-size': '',
    'intimidate-acp': '',
    'intimidate-misc': '',
    'intimidate-reqtrain': '',
    'linguistics-ability': '',
    'linguistics-cs': '',
    'linguistics-ranks': '',
    'linguistics-class': '',
    'linguistics-ability-mod': '',
    'linguistics-racial': '',
    'linguistics-feat': '',
    'linguistics-item': '',
    'linguistics-size': '',
    'linguistics-acp': '',
    'linguistics-misc': '',
    'linguistics-reqtrain': '',
    'lore-ability': '',
    'lore-cs': '',
    'lore-ranks': '',
    'lore-class': '',
    'lore-ability-mod': '',
    'lore-racial': '',
    'lore-feat': '',
    'lore-item': '',
    'lore-size': '',
    'lore-acp': '',
    'lore-misc': '',
    'lore-reqtrain': '',
    'lore2-ability': '',
    'lore2-cs': '',
    'lore2-ranks': '',
    'lore2-class': '',
    'lore2-ability-mod': '',
    'lore2-racial': '',
    'lore2-feat': '',
    'lore2-item': '',
    'lore2-size': '',
    'lore2-acp': '',
    'lore2-misc': '',
    'lore2-reqtrain': '',
    'lore3-ability': '',
    'lore3-cs': '',
    'lore3-ranks': '',
    'lore3-class': '',
    'lore3-ability-mod': '',
    'lore3-racial': '',
    'lore3-feat': '',
    'lore3-item': '',
    'lore3-size': '',
    'lore3-acp': '',
    'lore3-misc': '',
    'lore3-reqtrain': '',
    'knowledge-arcana-ability': '',
    'knowledge-arcana-cs': '',
    'knowledge-arcana-ranks': '',
    'knowledge-arcana-class': '',
    'knowledge-arcana-ability-mod': '',
    'knowledge-arcana-racial': '',
    'knowledge-arcana-feat': '',
    'knowledge-arcana-item': '',
    'knowledge-arcana-size': '',
    'knowledge-arcana-acp': '',
    'knowledge-arcana-misc': '',
    'knowledge-arcana-reqtrain': '',
    'knowledge-dungeoneering-ability': '',
    'knowledge-dungeoneering-cs': '',
    'knowledge-dungeoneering-ranks': '',
    'knowledge-dungeoneering-class': '',
    'knowledge-dungeoneering-ability-mod': '',
    'knowledge-dungeoneering-racial': '',
    'knowledge-dungeoneering-feat': '',
    'knowledge-dungeoneering-item': '',
    'knowledge-dungeoneering-size': '',
    'knowledge-dungeoneering-acp': '',
    'knowledge-dungeoneering-misc': '',
    'knowledge-dungeoneering-reqtrain': '',
    'knowledge-engineering-ability': '',
    'knowledge-engineering-cs': '',
    'knowledge-engineering-ranks': '',
    'knowledge-engineering-class': '',
    'knowledge-engineering-ability-mod': '',
    'knowledge-engineering-racial': '',
    'knowledge-engineering-feat': '',
    'knowledge-engineering-item': '',
    'knowledge-engineering-size': '',
    'knowledge-engineering-acp': '',
    'knowledge-engineering-misc': '',
    'knowledge-engineering-reqtrain': '',
    'knowledge-geography-ability': '',
    'knowledge-geography-cs': '',
    'knowledge-geography-ranks': '',
    'knowledge-geography-class': '',
    'knowledge-geography-ability-mod': '',
    'knowledge-geography-racial': '',
    'knowledge-geography-feat': '',
    'knowledge-geography-item': '',
    'knowledge-geography-size': '',
    'knowledge-geography-acp': '',
    'knowledge-geography-misc': '',
    'knowledge-geography-reqtrain': '',
    'knowledge-history-ability': '',
    'knowledge-history-cs': '',
    'knowledge-history-ranks': '',
    'knowledge-history-class': '',
    'knowledge-history-ability-mod': '',
    'knowledge-history-racial': '',
    'knowledge-history-feat': '',
    'knowledge-history-item': '',
    'knowledge-history-size': '',
    'knowledge-history-acp': '',
    'knowledge-history-misc': '',
    'knowledge-history-reqtrain': '',
    'knowledge-local-ability': '',
    'knowledge-local-cs': '',
    'knowledge-local-ranks': '',
    'knowledge-local-class': '',
    'knowledge-local-ability-mod': '',
    'knowledge-local-racial': '',
    'knowledge-local-feat': '',
    'knowledge-local-item': '',
    'knowledge-local-size': '',
    'knowledge-local-acp': '',
    'knowledge-local-misc': '',
    'knowledge-local-reqtrain': '',
    'knowledge-nature-ability': '',
    'knowledge-nature-cs': '',
    'knowledge-nature-ranks': '',
    'knowledge-nature-class': '',
    'knowledge-nature-ability-mod': '',
    'knowledge-nature-racial': '',
    'knowledge-nature-feat': '',
    'knowledge-nature-item': '',
    'knowledge-nature-size': '',
    'knowledge-nature-acp': '',
    'knowledge-nature-misc': '',
    'knowledge-nature-reqtrain': '',
    'knowledge-nobility-ability': '',
    'knowledge-nobility-cs': '',
    'knowledge-nobility-ranks': '',
    'knowledge-nobility-class': '',
    'knowledge-nobility-ability-mod': '',
    'knowledge-nobility-racial': '',
    'knowledge-nobility-feat': '',
    'knowledge-nobility-item': '',
    'knowledge-nobility-size': '',
    'knowledge-nobility-acp': '',
    'knowledge-nobility-misc': '',
    'knowledge-nobility-reqtrain': '',
    'knowledge-planes-ability': '',
    'knowledge-planes-cs': '',
    'knowledge-planes-ranks': '',
    'knowledge-planes-class': '',
    'knowledge-planes-ability-mod': '',
    'knowledge-planes-racial': '',
    'knowledge-planes-feat': '',
    'knowledge-planes-item': '',
    'knowledge-planes-size': '',
    'knowledge-planes-acp': '',
    'knowledge-planes-misc': '',
    'knowledge-planes-reqtrain': '',
    'knowledge-religion-ability': '',
    'knowledge-religion-cs': '',
    'knowledge-religion-ranks': '',
    'knowledge-religion-class': '',
    'knowledge-religion-ability-mod': '',
    'knowledge-religion-racial': '',
    'knowledge-religion-feat': '',
    'knowledge-religion-item': '',
    'knowledge-religion-size': '',
    'knowledge-religion-acp': '',
    'knowledge-religion-misc': '',
    'knowledge-religion-reqtrain': '',
    'perception-ability': '',
    'perception-cs': '',
    'perception-ranks': '',
    'perception-class': '',
    'perception-ability-mod': '',
    'perception-racial': '',
    'perception-feat': '',
    'perception-item': '',
    'perception-size': '',
    'perception-acp': '',
    'perception-misc': '',
    'perception-reqtrain': '',
    'perform-ability': '',
    'perform-cs': '',
    'perform-ranks': '',
    'perform-class': '',
    'perform-ability-mod': '',
    'perform-racial': '',
    'perform-feat': '',
    'perform-item': '',
    'perform-size': '',
    'perform-acp': '',
    'perform-misc': '',
    'perform-reqtrain': '',
    'perform2-ability': '',
    'perform2-cs': '',
    'perform2-ranks': '',
    'perform2-class': '',
    'perform2-ability-mod': '',
    'perform2-racial': '',
    'perform2-feat': '',
    'perform2-item': '',
    'perform2-size': '',
    'perform2-acp': '',
    'perform2-misc': '',
    'perform2-reqtrain': '',
    'perform3-ability': '',
    'perform3-cs': '',
    'perform3-ranks': '',
    'perform3-class': '',
    'perform3-ability-mod': '',
    'perform3-racial': '',
    'perform3-feat': '',
    'perform3-item': '',
    'perform3-size': '',
    'perform3-acp': '',
    'perform3-misc': '',
    'perform3-reqtrain': '',
    'profession-ability': '',
    'profession-cs': '',
    'profession-ranks': '',
    'profession-class': '',
    'profession-ability-mod': '',
    'profession-racial': '',
    'profession-feat': '',
    'profession-item': '',
    'profession-size': '',
    'profession-acp': '',
    'profession-misc': '',
    'profession-reqtrain': '',
    'profession2-ability': '',
    'profession2-cs': '',
    'profession2-ranks': '',
    'profession2-class': '',
    'profession2-ability-mod': '',
    'profession2-racial': '',
    'profession2-feat': '',
    'profession2-item': '',
    'profession2-size': '',
    'profession2-acp': '',
    'profession2-misc': '',
    'profession2-reqtrain': '',
    'profession3-ability': '',
    'profession3-cs': '',
    'profession3-ranks': '',
    'profession3-class': '',
    'profession3-ability-mod': '',
    'profession3-racial': '',
    'profession3-feat': '',
    'profession3-item': '',
    'profession3-size': '',
    'profession3-acp': '',
    'profession3-misc': '',
    'profession3-reqtrain': '',
    'ride-ability': '',
    'ride-cs': '',
    'ride-ranks': '',
    'ride-class': '',
    'ride-ability-mod': '',
    'ride-racial': '',
    'ride-feat': '',
    'ride-item': '',
    'ride-size': '',
    'ride-acp': '',
    'ride-misc': '',
    'ride-reqtrain': '',
    'sense-motive-ability': '',
    'sense-motive-cs': '',
    'sense-motive-ranks': '',
    'sense-motive-class': '',
    'sense-motive-ability-mod': '',
    'sense-motive-racial': '',
    'sense-motive-feat': '',
    'sense-motive-item': '',
    'sense-motive-size': '',
    'sense-motive-acp': '',
    'sense-motive-misc': '',
    'sense-motive-reqtrain': '',
    'sleight-of-hand-ability': '',
    'sleight-of-hand-cs': '',
    'sleight-of-hand-ranks': '',
    'sleight-of-hand-class': '',
    'sleight-of-hand-ability-mod': '',
    'sleight-of-hand-racial': '',
    'sleight-of-hand-feat': '',
    'sleight-of-hand-item': '',
    'sleight-of-hand-size': '',
    'sleight-of-hand-acp': '',
    'sleight-of-hand-misc': '',
    'sleight-of-hand-reqtrain': '',
    'spellcraft-ability': '',
    'spellcraft-cs': '',
    'spellcraft-ranks': '',
    'spellcraft-class': '',
    'spellcraft-ability-mod': '',
    'spellcraft-racial': '',
    'spellcraft-feat': '',
    'spellcraft-item': '',
    'spellcraft-size': '',
    'spellcraft-acp': '',
    'spellcraft-misc': '',
    'spellcraft-reqtrain': '',
    'stealth-ability': '',
    ' stealth-cs': '',
    'stealth-ranks': '',
    'stealth-class': '',
    'stealth-ability-mod': '',
    'stealth-racial': '',
    'stealth-feat': '',
    'stealth-item': '',
    'stealth-size': '',
    'stealth-acp': '',
    'stealth-misc': '',
    'stealth-reqtrain': '',
    'survival-ability': '',
    'survival-cs': '',
    'survival-ranks': '',
    'survival-class': '',
    'survival-ability-mod': '',
    'survival-racial': '',
    'survival-feat': '',
    'survival-item': '',
    'survival-size': '',
    'survival-acp': '',
    'survival-misc': '',
    'survival-reqtrain': '',
    'swim-ability': '',
    'swim-cs': '',
    'swim-ranks': '',
    'swim-class': '',
    'swim-ability-mod': '',
    'swim-racial': '',
    'swim-feat': '',
    'swim-item': '',
    'swim-size': '',
    'swim-acp': '',
    'swim-misc': '',
    'swim-reqtrain': '',
    'use-magic-device-ability': '',
    'use-magic-device-cs': '',
    'use-magic-device-ranks': '',
    'use-magic-device-class': '',
    'use-magic-device-ability-mod': '',
    'use-magic-device-racial': '',
    'use-magic-device-feat': '',
    'use-magic-device-item': '',
    'use-magic-device-size': '',
    'use-magic-device-acp': '',
    'use-magic-device-misc': '',
    'use-magic-device-reqtrain': '',
    'misc-skill-0-ability': '',
    'misc-skill-0-cs': '',
    'misc-skill-0-ranks': '',
    'misc-skill-0-class': '',
    'misc-skill-0-ability-mod': '',
    'misc-skill-0-racial': '',
    'misc-skill-0-feat': '',
    'misc-skill-0-item': '',
    'misc-skill-0-size': '',
    'misc-skill-0-acp': '',
    'misc-skill-0-misc': '',
    'misc-skill-0-reqtrain': '',
    'misc-skill-1-ability': '',
    'misc-skill-1-cs': '',
    'misc-skill-1-ranks': '',
    'misc-skill-1-class': '',
    'misc-skill-1-ability-mod': '',
    'misc-skill-1-racial': '',
    'misc-skill-1-feat': '',
    'misc-skill-1-item': '',
    'misc-skill-1-size': '',
    'misc-skill-1-acp': '',
    'misc-skill-1-misc': '',
    'misc-skill-1-reqtrain': '',
    'misc-skill-2-ability': '',
    'misc-skill-2-cs': '',
    'misc-skill-2-ranks': '',
    'misc-skill-2-class': '',
    'misc-skill-2-ability-mod': '',
    'misc-skill-2-racial': '',
    'misc-skill-2-feat': '',
    'misc-skill-2-item': '',
    'misc-skill-2-size': '',
    'misc-skill-2-acp': '',
    'misc-skill-2-misc': '',
    'misc-skill-2-reqtrain': '',
    'misc-skill-3-ability': '',
    'misc-skill-3-cs': '',
    'misc-skill-3-ranks': '',
    'misc-skill-3-class': '',
    'misc-skill-3-ability-mod': '',
    'misc-skill-3-racial': '',
    'misc-skill-3-feat': '',
    'misc-skill-3-item': '',
    'misc-skill-3-size': '',
    'misc-skill-3-acp': '',
    'misc-skill-3-misc': '',
    'misc-skill-3-reqtrain': '',
    'misc-skill-4-ability': '',
    'misc-skill-4-cs': '',
    'misc-skill-4-ranks': '',
    'misc-skill-4-class': '',
    'misc-skill-4-ability-mod': '',
    'misc-skill-4-racial': '',
    'misc-skill-4-feat': '',
    'misc-skill-4-item': '',
    'misc-skill-4-size': '',
    'misc-skill-4-acp': '',
    'misc-skill-4-misc': '',
    'misc-skill-4-reqtrain': '',
    'misc-skill-5-ability': '',
    'misc-skill-5-cs': '',
    'misc-skill-5-ranks': '',
    'misc-skill-5-class': '',
    'misc-skill-5-ability-mod': '',
    'misc-skill-5-racial': '',
    'misc-skill-5-feat': '',
    'misc-skill-5-item': '',
    'misc-skill-5-size': '',
    'misc-skill-5-acp': '',
    'misc-skill-5-misc': '',
    'misc-skill-5-reqtrain': '',
    'craft-name': '',
    'craft2-name': '',
    'craft3-name': '',
    'lore-name': '',
    'perform-name': '',
    'perform2-name': '',
    'perform3-name': '',
    'profession-name': '',
    'profession2-name': '',
    'profession3-name': '',
    'misc-skill-0-name': '',
    'misc-skill-1-name': '',
    'misc-skill-2-name': '',
    'misc-skill-3-name': '',
    'misc-skill-4-name': '',
    'misc-skill-5-name': '',
  });

  // Keep track of which of these skills we're on
  let craft = 1;
  let perform = 1;
  let profession = 1;
  let artistry = 1;
  let lore = 1;
  let misc = 0;

  let i = 0;
  let skill;
  let skillMisc;
  let skillAttrPrefix;
  for (i = 0; i < skills.length; i++) {
    /* if (_.isUndefined(skill._name))
		{
			continue;
		} */
    skill = skills[i];

    // Figure out where we're putting this skill on the character sheet
    if (skill._name.indexOf('Craft') !== -1) {
      if (craft === 1) {
        skillAttrPrefix = 'craft';
        if (skill._name.match(/\(([^\)]*)\)/) !== null)
          attrs['craft-name'] = skill._name
            .match(/\(([^\)]*)\)/)[0]
            .replace('(', '')
            .replace(')', '');
        craft++;
      } else if (craft <= 10) {
        skillAttrPrefix = `craft${craft}`;
        if (skill._name.match(/\(([^\)]*)\)/) !== null)
          attrs[`craft${craft}-name`] = skill._name
            .match(/\(([^\)]*)\)/)[0]
            .replace('(', '')
            .replace(')', '');
        craft++;
      } else if (misc <= 10) {
        skillAttrPrefix = `misc-skill-${misc}`;
        if (skill._name.match(/\(([^\)]*)\)/) !== null) attrs[`${skillAttrPrefix}-name`] = skill._name;
        misc++;
      } else console.log(`Ran out of misc skills for ${skill._name}!`);
    } else if (skill._name.indexOf('Perform') !== -1) {
      if (perform === 1) {
        skillAttrPrefix = 'perform';
        if (skill._name.match(/\(([^\)]*)\)/) !== null)
          attrs['perform-name'] = skill._name
            .match(/\(([^\)]*)\)/)[0]
            .replace('(', '')
            .replace(')', '');
        perform++;
      } else if (perform <= 10) {
        skillAttrPrefix = `perform${perform}`;
        if (skill._name.match(/\(([^\)]*)\)/) !== null)
          attrs[`perform${perform}-name`] = skill._name
            .match(/\(([^\)]*)\)/)[0]
            .replace('(', '')
            .replace(')', '');
        perform++;
      } else if (misc <= 10) {
        skillAttrPrefix = `misc-skill-${misc}`;
        if (skill._name.match(/\(([^\)]*)\)/) !== null) attrs[`${skillAttrPrefix}-name`] = skill._name;
        misc++;
      } else console.log(`Ran out of misc skills for ${skill._name}!`);
    } else if (skill._name.indexOf('Profession') !== -1) {
      if (profession === 1) {
        skillAttrPrefix = 'profession';
        if (skill._name.match(/\(([^\)]*)\)/) !== null)
          attrs['profession-name'] = skill._name
            .match(/\(([^\)]*)\)/)[0]
            .replace('(', '')
            .replace(')', '');
        profession++;
      } else if (profession <= 10) {
        skillAttrPrefix = `profession${profession}`;
        if (skill._name.match(/\(([^\)]*)\)/) !== null)
          attrs[`profession${profession}-name`] = skill._name
            .match(/\(([^\)]*)\)/)[0]
            .replace('(', '')
            .replace(')', '');
        profession++;
      } else if (misc <= 10) {
        skillAttrPrefix = `misc-skill-${misc}`;
        if (skill._name.match(/\(([^\)]*)\)/) !== null) attrs[`${skillAttrPrefix}-name`] = skill._name;
        misc++;
      } else console.log(`Ran out of misc skills for ${skill._name}!`);
    } else if (skill._name.indexOf('Knowledge') !== -1) {
      switch (skill._name.match(/\(([^\)]*)\)/g)[0]) {
        case '(arcana)':
        case '(dungeoneering)':
        case '(engineering)':
        case '(geography)':
        case '(history)':
        case '(local)':
        case '(nature)':
        case '(nobility)':
        case '(planes)':
        case '(religion)':
          skillAttrPrefix = skill._name.toLowerCase().replace(/\s/g, '-').replace('(', '').replace(')', '');
          break;
        default:
          skillAttrPrefix = `misc-skill-${misc}`;
          attrs[`${skillAttrPrefix}-name`] = skill._name;
          misc++;
      }
    } else if (skill._name.indexOf('Artistry') !== -1) {
      if (artistry === 1) {
        skillAttrPrefix = 'artistry';
        attrs['artistry-name'] = skill._name
          .match(/\(([^\)]*)\)/)[0]
          .replace('(', '')
          .replace(')', '');
        artistry++;
      } else if (artistry <= 10) {
        skillAttrPrefix = `artistry${artistry}`;
        attrs[`artistry${artistry}-name`] = skill._name
          .match(/\(([^\)]*)\)/)[0]
          .replace('(', '')
          .replace(')', '');
        artistry++;
      } else if (misc <= 10) {
        skillAttrPrefix = `misc-skill-${misc}`;
        attrs[`${skillAttrPrefix}-name`] = skill._name;
        misc++;
      } else console.log(`Ran out of misc skills for ${skill._name}!`);
    } else if (skill._name.indexOf('Lore') !== -1) {
      if (lore === 1) {
        skillAttrPrefix = 'lore';
        attrs['lore-name'] = skill._name
          .match(/\(([^\)]*)\)/)[0]
          .replace('(', '')
          .replace(')', '');
        lore++;
      } else if (lore <= 10) {
        skillAttrPrefix = `lore${lore}`;
        attrs[`lore${lore}-name`] = skill._name
          .match(/\(([^\)]*)\)/)[0]
          .replace('(', '')
          .replace(')', '');
        lore++;
      } else if (misc <= 10) {
        skillAttrPrefix = `misc-skill-${misc}`;
        attrs[`${skillAttrPrefix}-name`] = skill._name;
        misc++;
      } else console.log(`Ran out of misc skills for ${skill._name}!`);
    } else
      skillAttrPrefix = skill._name
        .toLowerCase()
        .replace(/\s/g, '-')
        .replace('(', '')
        .replace(')', '')
        .replace('-hand', '-Hand')
        .replace('e-device', 'e-Device')
        .replace('-artist', '-Artist')
        .replace('-animal', '-Animal');

    attrs[skillAttrPrefix] = parseNum(skill._value);
    attrs[`${skillAttrPrefix}-ranks`] = parseNum(skill._ranks);
    attrs[`${skillAttrPrefix}-ability`] = `${skill._attrname}-mod`;
    attrs[`${skillAttrPrefix}-ability-mod`] = parseNum(skill._attrbonus);

    if (skill._classskill === 'yes') attrs[`${skillAttrPrefix}-cs`] = 3;

    skillMisc = parseNum(skill._value) - parseNum(skill._ranks) - parseNum(skill._attrbonus);
    if (parseNum(skill._ranks) !== 0 && skill._classskill === 'yes') skillMisc -= 3;
    if (skill._armorcheck === 'yes') skillMisc -= ACP;
    if (skill._name === 'Fly') skillMisc -= skillSize;
    if (skill._name === 'Stealth') skillMisc -= 2 * skillSize;
    attrs[`${skillAttrPrefix}-misc`] = skillMisc;

    if (skill._trainedonly === 'yes') attrs[`${skillAttrPrefix}-ReqTrain`] = 1;

    // Add situation modifiers to the macro
    if (!_.isUndefined(skill.situationalmodifiers.situationalmodifier)) {
      let notes = '';
      skill.situationalmodifiers.situationalmodifier = arrayify(skill.situationalmodifiers.situationalmodifier);
      let j = 0;
      while (j < skill.situationalmodifiers.situationalmodifier.length) {
        notes = `${notes}}} {{${skill.situationalmodifiers.situationalmodifier[j]._source}=${skill.situationalmodifiers.situationalmodifier[j]._text}`;
        j++;
      }
      attrs[`${skillAttrPrefix}-note`] = notes;
    }
  }
  const numCPP = Math.max(craft, perform, profession, artistry, lore);
  if (numCPP > 6) attrs.custom_skill_num_show = 10;
  else if (numCPP > 3) attrs.custom_skill_num_show = 6;
  else if (numCPP > 2) attrs.custom_skill_num_show = 3;
  else if (numCPP > 2) attrs.custom_skill_num_show = 2;
  else attrs.custom_skill_num_show = 1;

  if (misc > 6) attrs.misc_skill_num_show = 10;
  else if (misc > 3) attrs.misc_skill_num_show = 6;
  else if (misc > 2) attrs.misc_skill_num_show = 3;
  else if (misc > 2) attrs.misc_skill_num_show = 2;
  else attrs.misc_skill_num_show = 1;
}

// Import ACP and Max Dex; these aren't included under items, but the final values are listed in penalties
export function importPenalties(attrs, penalties) {
  let ACP = 0;
  let i = 0;
  while (i < penalties.length) {
    if (penalties[i]._name === 'Armor Check Penalty') {
      ACP = parseNum(penalties[i]._value);
      attrs['armor3-acp'] = ACP;
    } else if (penalties[i]._name === 'Max Dex Bonus') attrs['armor3-max-dex'] = Math.min(99, parseNum(penalties[i]._value)); // Hero Lab uses 1000 for Max Dex when player doesn't have one; cap it at 99 to match sheet default
    i++;
  }
  return ACP;
}

export function importAC(attrs, acObj, armorPenalties) {
  attrs.AC = parseNum(acObj._ac);
  attrs.Touch = parseNum(acObj._touch);
  attrs['Flat-Footed'] = parseNum(acObj._flatfooted);

  attrs['AC-natural'] = parseNum(acObj._fromnatural);
  attrs['AC-deflect'] = parseNum(acObj._fromdeflect);
  attrs['AC-dodge'] = parseNum(acObj._fromdodge);
  attrs['AC-armor'] = parseNum(acObj._fromarmor);
  attrs['AC-shield'] = parseNum(acObj._fromshield);

  // Are we replacing Dex to AC with something else?
  if (acObj._fromdexterity === '') {
    if (acObj._fromcharisma !== '') {
      attrs['AC-ability'] = 'CHA-mod';
      attrs['AC-ability-mod'] = attrs['AC-ability-display'] = parseNum(acObj._fromcharisma);
      attrs['AC-misc'] =
        parseNum(acObj._ac) -
        10 -
        parseNum(acObj._fromarmor) -
        parseNum(acObj._fromshield) -
        parseNum(acObj._fromcharisma) -
        parseNum(acObj._fromsize) -
        parseNum(acObj._fromnatural) -
        parseNum(acObj._fromdeflect) -
        parseNum(acObj._fromdodge);
    } else if (acObj._fromwisdom !== '') {
      attrs['AC-ability'] = 'WIS-mod';
      attrs['AC-ability-mod'] = attrs['AC-ability-display'] = parseNum(acObj._fromwisdom);
      attrs['AC-misc'] =
        parseNum(acObj._ac) -
        10 -
        parseNum(acObj._fromarmor) -
        parseNum(acObj._fromshield) -
        parseNum(acObj._fromwisdom) -
        parseNum(acObj._fromsize) -
        parseNum(acObj._fromnatural) -
        parseNum(acObj._fromdeflect) -
        parseNum(acObj._fromdodge);
    }
  } else {
    attrs['AC-ability'] = 'DEX-mod';
    attrs['AC-ability-mod'] = attrs['AC-ability-display'] = parseNum(acObj._fromdexterity);
    attrs['AC-misc'] =
      parseNum(acObj._ac) -
      10 -
      parseNum(acObj._fromarmor) -
      parseNum(acObj._fromshield) -
      parseNum(acObj._fromdexterity) -
      parseNum(acObj._fromsize) -
      parseNum(acObj._fromnatural) -
      parseNum(acObj._fromdeflect) -
      parseNum(acObj._fromdodge);
  }
}

export function importCharacter(characterObj) {
  const attrs = {};

  importAbilityScores(attrs, characterObj.attributes.attribute);
  importSaves(attrs, characterObj.saves);
  let classes;
  let spellClasses;
  let archetypes = {};
  // Class objects won't exist for creatures w/o class levels, such as animals
  if (!_.isUndefined(characterObj.classes.class)) {
    // Class will be an array if multiclassed, but a single object if single-classed; make it an array, just to be safe
    characterObj.classes.class = arrayify(characterObj.classes.class);

    classes = importClasses(attrs, characterObj.classes.class, characterObj.health._hitdice);

    // If any of the character's classes is a spellcaster, it'll be listed here, too
    if (!_.isUndefined(characterObj.spellclasses.spellclass)) {
      attrs.use_spells = 1;
      characterObj.spellclasses.spellclass = arrayify(characterObj.spellclasses.spellclass);
      spellClasses = importSpellClasses(attrs, characterObj.spellclasses.spellclass, classes, characterObj.attributes.attribute);

      // Well, it's a spellcaster, so let's import those spells, too!
      let spellsArray = arrayify(characterObj.spellsknown.spell).concat(arrayify(characterObj.spellbook.spell)).concat(arrayify(characterObj.spellsmemorized.spell));
      const spellNames = [];
      spellsArray = _.reject(spellsArray, function (spell) {
        if (_.contains(spellNames, spell._name)) return true;
        spellNames.concat(spell._name);
        return false;
      });
      importSpells(spellsArray, spellClasses);
    }

    // Need to keep track of what archetypes the character has, since class feature source could be an archetype
    archetypes = buildArchetypeArray(classes);
  }

  characterObj.penalties.penalty = arrayify(characterObj.penalties.penalty);
  const ACP = importPenalties(attrs, characterObj.penalties.penalty);

  // Build an object we can pass to the item importing, so we can attach this to the inventory item
  const armorPenalties = {};
  armorPenalties.ACP = parseNum(attrs['armor3-acp']);
  armorPenalties.maxDex = parseNum(attrs['armor3-max-dex']);
  armorPenalties.spellfail = parseNum(attrs['armor3-spell-fail']);

  importAC(attrs, characterObj.armorclass, armorPenalties);

  // We might change these values if we're using a shield, so don't set them outside of item import
  if (!_.isUndefined(attrs['armor3-acp'])) delete attrs['armor3-acp'];
  if (!_.isUndefined(attrs['armor3-spell-fail'])) delete attrs['armor3-spell-fail'];

  const armor = _.reject(arrayify(characterObj.defenses.armor || {}), function (item) {
    return _.isUndefined(item._name);
  });
  const weapons = _.reject(arrayify(characterObj.melee.weapon || {}).concat(arrayify(characterObj.ranged.weapon || {})), function (item) {
    return _.isUndefined(item._name);
  });

  // "Tracked Resources" is a list of uses, either a quantity of items, charges, or uses per day
  const resources = _.object(
    _.map(characterObj.trackedresources.trackedresource, function (resource) {
      return [resource._name, resource];
    }),
  );

  // Make an array of items, both magic and mundane
  const items = _.reject(arrayify(characterObj.magicitems.item || {}).concat(arrayify(characterObj.gear.item || {})), function (item) {
    return _.isUndefined(item._name);
  });

  // "Specials" could include items, so we need to filter them out
  const itemNames = _.map(items, function (obj) {
    return obj._name;
  });
  const specials = _.reject(
    arrayify(characterObj.attack.special).concat(
      arrayify(characterObj.defenses.special),
      arrayify(characterObj.otherspecials.special),
      arrayify(characterObj.movement.special),
      arrayify(characterObj.defensive.special),
    ),
    function (obj) {
      return _.contains(itemNames, obj._name);
    },
  );

  importItems(items, resources, armorPenalties, armor, weapons);

  getSectionIDs('repeating_ability', function (idarray) {
    const abilityNameAttrs = _.union(
      _.map(idarray, function (id) {
        return `repeating_ability_${id}_name`;
      }),
      _.map(idarray, function (id) {
        return `repeating_ability_${id}_rule_category`;
      }),
    );
    getAttrs(abilityNameAttrs, function (abilityAttrs) {
      const abilityObjList = {};
      const abilityKeys = Object.keys(abilityAttrs);
      const asyncAttrs = {};
      _.each(abilityKeys, function (abilityKey) {
        let rowID;
        if (abilityKey.indexOf('_name') !== -1) {
          rowID = abilityKey.substring('repeating_ability_'.length, abilityKey.indexOf('_name'));
          if (_.isUndefined(abilityObjList[rowID])) abilityObjList[rowID] = {rowID};
          abilityObjList[rowID].name = abilityAttrs[abilityKey];
        }
        if (abilityKey.indexOf('_rule_category') !== -1) {
          rowID = abilityKey.substring('repeating_ability_'.length, abilityKey.indexOf('_rule_category'));
          if (_.isUndefined(abilityObjList[rowID])) abilityObjList[rowID] = {rowID};
          abilityObjList[rowID].rulecategory = abilityAttrs[abilityKey];
        }
      });

      if (!_.isUndefined(characterObj.feats.feat)) {
        const featsArray = _.filter(abilityObjList, _.matcher({rulecategory: 'feats'}));
        const featsList = {};
        _.each(featsArray, function (obj) {
          featsList[obj.rowID] = obj.name;
        });
        characterObj.feats.feat = arrayify(characterObj.feats.feat);
        importFeats(asyncAttrs, characterObj.feats.feat, featsList, resources);
      }

      if (!_.isUndefined(characterObj.traits.trait)) {
        const traitsArray = _.filter(abilityObjList, _.matcher({rulecategory: 'traits'}));
        const traitsList = {};
        _.each(traitsArray, function (obj) {
          traitsList[obj.rowID] = obj.name;
        });
        characterObj.traits.trait = arrayify(characterObj.traits.trait);
        importTraits(asyncAttrs, characterObj.traits.trait, traitsList, resources);
      }

      if (!_.isUndefined(characterObj.spelllike.special)) {
        const SLAsArray = _.filter(abilityObjList, _.matcher({rulecategory: 'spell-like-abilities'}));
        const SLAsList = {};
        _.each(SLAsArray, function (obj) {
          SLAsList[obj.rowID] = obj.name;
        });
        characterObj.spelllike.special = arrayify(characterObj.spelllike.special);
        importSLAs(asyncAttrs, characterObj.spelllike.special, SLAsList, resources);
      }

      const featuresArray = _.filter(abilityObjList, function (obj) {
        if (obj.rulecategory === 'traits' || obj.rulecategory === 'feats') return false;
        return true;
      });
      const featuresList = {};
      _.each(featuresArray, function (obj) {
        featuresList[obj.rowID] = obj;
      });
      importFeatures(asyncAttrs, featuresList, specials, archetypes, resources);

      setAttrs(asyncAttrs, {silent: true});
    });
  });

  attrs.experience = parseFloat(characterObj.xp._total);

  attrs['class-0-bab'] =
    attrs.bab =
    attrs['melee_bab-mod'] =
    attrs['melee2_bab-mod'] =
    attrs['ranged_bab-mod'] =
    attrs['ranged2_bab-mod'] =
    attrs['melee_bab-mod'] =
    attrs['cmb_bab-mod'] =
    attrs['cmb2_bab-mod'] =
      parseNum(characterObj.attack._baseattack);

  // Set max hp; remove Con mod from hp first, since the sheet will add that in
  // Since the XML doesn't break this down by class, add it all to class 0
  attrs['non-lethal-damage_max'] = attrs.HP_max = parseNum(characterObj.health._hitpoints);
  const level = calcHitDice(characterObj.health._hitdice);
  attrs.level = level;
  attrs['HP-ability-mod'] = parseNum(characterObj.attributes.attribute[2].attrbonus._modified);
  attrs.hp_ability_bonus = level * parseNum(characterObj.attributes.attribute[2].attrbonus._modified);
  attrs['total-hp'] = attrs['class-0-hp'] = parseNum(characterObj.health._hitpoints) - level * parseNum(characterObj.attributes.attribute[2].attrbonus._modified);
  importInit(attrs, characterObj.initiative);
  const racialHD = level - parseNum(characterObj.classes._level);
  if (racialHD > 0) {
    attrs.add_race = 1;
    attrs['npc-hd-num'] = racialHD;
  }

  const size = getSizeMod(characterObj.size._name);
  attrs.size = size;
  attrs.default_char_size = size;
  attrs['CMD-size'] = size * -1;

  characterObj.skills.skill = arrayify(characterObj.skills.skill);
  importSkills(attrs, characterObj.skills.skill, size, ACP);

  if (!_.isUndefined(characterObj.senses.special)) {
    characterObj.senses.special = arrayify(characterObj.senses.special);
    attrs.vision = buildList(characterObj.senses.special, '_shortname');
  }

  if (!_.isUndefined(characterObj.damagereduction.special)) {
    characterObj.damagereduction.special = arrayify(characterObj.damagereduction.special);
    attrs.DR = buildList(characterObj.damagereduction.special, '_shortname');
  }

  if (!_.isUndefined(characterObj.resistances.special)) {
    characterObj.resistances.special = arrayify(characterObj.resistances.special);
    attrs.resistances = buildList(characterObj.resistances.special, '_shortname');
  }

  if (!_.isUndefined(characterObj.immunities.special)) {
    characterObj.immunities.special = arrayify(characterObj.immunities.special);
    attrs.immunities = buildList(characterObj.immunities.special, '_shortname');
  }

  if (!_.isUndefined(characterObj.weaknesses.special)) {
    characterObj.weaknesses.special = arrayify(characterObj.weaknesses.special);
    attrs.weaknesses = buildList(characterObj.weaknesses.special, '_shortname');
  }

  if (!_.isUndefined(characterObj.languages.language)) {
    characterObj.languages.language = arrayify(characterObj.languages.language);
    attrs.languages = buildList(characterObj.languages.language, '_name');
  }

  attrs['npc-type'] = arrayify(characterObj.types.type)[0]._name;
  if (!_.isUndefined(characterObj.subtypes.subtype)) attrs['npc-type'] = `${attrs['npc-type']} (${buildList(arrayify(characterObj.subtypes.subtype), '_name')})`;

  attrs.character_name = characterObj._name;
  // NPC Only
  if (characterObj._role !== 'pc') {
    attrs.is_npc = 1;
    attrs.tab = 8;
    if (!_.isUndefined(characterObj.npc.ecology.npcinfo)) {
      attrs.environment = arrayify(characterObj.npc.ecology.npcinfo)[0].text || '';
      attrs.organization = arrayify(characterObj.npc.ecology.npcinfo)[1].text || '';
      attrs.other_items_treasure = arrayify(characterObj.npc.ecology.npcinfo)[2].text || '';
    }
    if (!_.isUndefined(characterObj.npc.tactics)) {
      attrs['npc-during-combat'] = characterObj.npc.tactics || '';
    }
  }
  attrs['player-name'] = characterObj._playername;
  attrs.deity = characterObj.deity._name;
  attrs.race = characterObj.race._racetext.substr(0, 1).toUpperCase() + characterObj.race._racetext.substr(1, 1000);
  attrs.alignment = characterObj.alignment._name;
  attrs.gender = characterObj.personal._gender;
  attrs.age = characterObj.personal._age;
  attrs.height = characterObj.personal.charheight._text;
  attrs.weight = characterObj.personal.charweight._text;
  attrs.hair = characterObj.personal._hair;
  attrs.eyes = characterObj.personal._eyes;
  attrs.skin = characterObj.personal._skin;
  // PC/NPC
  attrs.character_description = characterObj._role !== 'pc' ? characterObj.npc.description : characterObj.personal.description;

  attrs['npc-cr'] = characterObj.challengerating._text.replace('CR ', '');
  attrs['npc-xp'] = characterObj.xpaward._value;

  attrs['speed-base'] = attrs['speed-modified'] = parseNum(characterObj.movement.speed._value);

  attrs.cmb = parseNum(characterObj.maneuvers._total);
  attrs.cmd = parseNum(characterObj.maneuvers._cmd);
  attrs['ff-cmd'] = parseNum(characterObj.maneuvers._cmdflatfooted);
  attrs['cmd-str'] = attrs['STR-mod']; // CMB/CMD doesn't have any breakdown in XML, so have to assume still using STR
  attrs['cmd-misc'] = attrs.cmd - 10 - attrs['AC-ability-mod'] - attrs['cmd-str'] - attrs['CMD-size'] - attrs['AC-dodge'] - attrs['AC-deflect'] - attrs.bab;

  attrs['attk-melee'] = parseNum(characterObj.attack._meleeattack.split('/')[0]);
  attrs['attk-ranged'] = attrs['attk-melee2'] = parseNum(characterObj.attack._rangedattack.split('/')[0]); // Assuming Melee 2 is using Dex, setting to ranged bonus because lazy

  if (!_.isUndefined(characterObj.favoredclasses.favoredclass)) {
    characterObj.favoredclasses.favoredclass = arrayify(characterObj.favoredclasses.favoredclass);
    attrs['class-favored'] = buildList(characterObj.favoredclasses.favoredclass, '_name');
  }

  attrs['other-PP'] = characterObj.money._pp;
  attrs['other-GP'] = characterObj.money._gp;
  attrs['other-SP'] = characterObj.money._sp;
  attrs['other-CP'] = characterObj.money._cp;

  attrs['load-str-bonus'] = parseNum(characterObj.encumbrance._encumstr) - attrs.STR;
  attrs['load-light'] = characterObj.encumbrance._light;
  attrs['load-medium'] = characterObj.encumbrance._medium;
  attrs['load-heavy'] = attrs['lift-above-head'] = characterObj.encumbrance._heavy;
  attrs['load-max'] = attrs['lift-off-ground'] = parseNum(characterObj.encumbrance._heavy) * 2;
  attrs['lift-drag-and-push'] = parseNum(characterObj.encumbrance._heavy) * 5;

  if (!_.isUndefined(characterObj.pathfindersociety)) {
    attrs.set_pfs = 1;
    PFHealth.setToPFS(null);
  }

  if (!_.isUndefined(characterObj.factions.faction)) {
    const faction = _.find(arrayify(characterObj.factions.faction), function (fac) {
      return _.isUndefined(fac._retired);
    });
    if (!_.isUndefined(faction)) {
      attrs.prestige = faction._cpa;
      attrs.fame = faction._tpa;
      attrs.faction_notes = faction._name;
    }
  }

  setAttrs(attrs, {silent: true});
}
export function registerEventHandlers() {
  on('change:herolab_import', function (eventInfo) {
    TAS.debug(`caught ${eventInfo.sourceAttribute} event${eventInfo.sourceType}`);
    if (eventInfo.sourceType !== 'player') return;
    getAttrs(['herolab_import'], function (values) {
      let xmlObj;
      if (_.isUndefined(values.herolab_import)) return;
      try {
        xmlObj = JSON.parse(values.herolab_import);
        if (_.isArray(xmlObj.document.public.character)) importCharacter(xmlObj.document.public.character[0]);
        else importCharacter(xmlObj.document.public.character);
        setAttrs({herolab_import: ''}, {silent: true});
      } catch (err) {
        console.log(err);
        setAttrs({herolab_import: err.message}, {silent: true});
      }
    });
  });
}
registerEventHandlers();
//PFConsole.log('   HLImport module loaded          ');
//PFLog.modulecount++;
