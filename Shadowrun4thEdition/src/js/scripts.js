  //Edge toggle to include ! for exploding dice
const edgeToggle = newValue => {
  processingFunctions.setAttributes({
    explode_toggle: processingFunctions.shadowrun.determineExplodingEdge(newValue)
  })
}

const updateHostAttributes = newValue => {
  newValue = processingFunctions.parseInteger(newValue)
  processingFunctions.setAttributes({
    matrix_max: 8 + Math.ceil(newValue/2),
    ic_attack: Math.min(newValue + newValue)
  })
}

const updateSpriteConditionTrack = newValue => {
  newValue = processingFunctions.parseInteger(newValue)
  processingFunctions.setAttributes({
    matrix_max: 8 + Math.ceil(newValue/2)
  })
}

//ALSO COVER COMPLEX FORMS
const updateSpellsDicepool = eventinfo => {
  const repRowID = processingFunctions.getReprowid(eventinfo.triggerName)
  getAttrs([`${repRowID}_specialization`, `${repRowID}_dicepool_modifier`], attrs => {
    attrs = processingFunctions.parseIntegers(attrs)
    processingFunctions.setAttributes({
      [`${repRowID}_dicepool`]: processingFunctions.sumIntegers(Object.values(attrs))
    })
  })
}

const resetNpcCondition = () => setAttributes({physical: 0, stun: 0, matrix: 0})

const updatePrimary = eventinfo => {
  const repRowID = processingFunctions.getReprowid(eventinfo.triggerName)
  getAttrs([`${repRowID}_primary`], attrs => {
    if (attrs[`${repRowID}_primary`] === 'primary') {
      let update = {}

      if (repRowID.includes('armor')) {
        update = processingFunctions.shadowrun.updatePrimaryArmor({[eventinfo.triggerName]: eventinfo.newValue})
      } else {
        update = processingFunctions.shadowrun.updatePrimaryWeapons({[eventinfo.triggerName]: eventinfo.newValue})
      }

      processingFunctions.setAttributes(update)
    }
  })
}

const updateRepeatingArmorPrimary = eventinfo => {
  const repRowID = processingFunctions.getReprowid(eventinfo.triggerName)
  if (eventinfo.newValue === undefined) {
    return false
  } else if (eventinfo.newValue === 'primary') {
    const constructedArmorAttributes = processingFunctions.shadowrun.addRepRow(repRowID, sheetAttributes.armorAttributes)
    getAttrs(constructedArmorAttributes, attrs => { 
      const update = processingFunctions.shadowrun.updatePrimaryArmor(attrs)
      processingFunctions.setAttributes(update)
    })
    processingFunctions.shadowrun.resetRepeatingFieldsPrimaries(`repeating_armor`, repRowID)
  } else {
    const update = processingFunctions.shadowrun.resetPrimaryArmor()
    processingFunctions.setAttributes(update)
  }
}

const updateRepeatingWeaponPrimary = (eventinfo, type) => {
  const repRowID = processingFunctions.getReprowid(eventinfo.triggerName)
  if (eventinfo.newValue === undefined) {
    return false
  } else if (eventinfo.newValue === 'primary') {
    const constructedWeaponAttributes = processingFunctions.shadowrun.contructRepeatingWeaponAttributes(repRowID, type)
    getAttrs(constructedWeaponAttributes, attrs => { 
      const update = processingFunctions.shadowrun.updatePrimaryWeapons(attrs)
      processingFunctions.setAttributes(update)
    })
    processingFunctions.shadowrun.resetRepeatingFieldsPrimaries(`repeating_${type}`, repRowID)
  } else {
    const update = processingFunctions.shadowrun.resetPrimaryWeapon(type)
    processingFunctions.setAttributes(update)
  }
}

const updateRepeatingWeaponDicepool = trigger => {
  const repRowID = processingFunctions.getReprowid(trigger)
  getAttrs([`${repRowID}_dicepool_modifier`, `${repRowID}_specialization`], attrs => {   
    attrs = processingFunctions.parseIntegers(attrs)
    processingFunctions.setAttributes({
      [`${repRowID}_dicepool`]: processingFunctions.sumIntegers(Object.values(attrs))
    })
  })
}

const updateRepeatingSkillDicepool = eventinfo => {
   const repRowID = processingFunctions.getReprowid(eventinfo.triggerName)
    getAttrs([`${repRowID}_skill`], attrs => {
      let skill = processingFunctions.shadowrun.convertSkillSelectToHiddenSkill(attrs[`${repRowID}_skill`])
      processingFunctions.setAttributes({
        [`${skill}`]: eventinfo.newValue
      })
    })
}

const updateRepeatingSkillName = eventinfo => {
  const repRowID = processingFunctions.getReprowid(eventinfo.triggerName)
  const translationKey = eventinfo.newValue.replace(/ /g, '').toLowerCase()
  const translation = getTranslationByKey(translationKey);
  processingFunctions.setAttributes({
    [`${repRowID}_display_skill`]: translation
  })
}

const updateRepeatingSkillAttribute = eventinfo => {
  const repRowID = processingFunctions.getReprowid(eventinfo.triggerName)
  const translationKey = processingFunctions.sliceAttr(eventinfo.newValue)
  const translation = getTranslationByKey(translationKey);
  processingFunctions.setAttributes({
    [`${repRowID}_display_attribute`]: translation
  })
}

const updateRepeatingSkillRating = trigger => {
  const repRowID = processingFunctions.getReprowid(trigger)
  getAttrs([`${repRowID}_rating`, `${repRowID}_rating_modifier`], attrs => {   
    attrs = processingFunctions.shadowrun.attributeFactory(attrs)
    processingFunctions.setAttributes({
      [`${repRowID}_dicepool`]: attrs.total,
      [`${repRowID}_display_rating`]: processingFunctions.shadowrun.buildDisplay(attrs.base, attrs.bonus)
    })
  })
}

const updateWounds = () => {
  getAttrs(sheetAttributes.woundCalculation, attrs => {
    attrs = processingFunctions.parseIntegers(attrs)
    const sum = processingFunctions.shadowrun.calculateWounds(attrs)
    processingFunctions.setAttributes({wounds: sum})
  })
}

const updateConditionTracks= conditionTrack => {
  getAttrs(sheetAttributes[conditionTrack], attrs => {
    attrs = processingFunctions.shadowrun.conditionFactory(attrs)
    const conditionTotal = processingFunctions.shadowrun.calculateConditionTracks(attrs)
    processingFunctions.setAttributes({[`${conditionTrack}_max`]: conditionTotal}, true)
  })
}

const translations = () => {
  const attributes = sheetAttributes.translationsAttributes
  const translations = processingFunctions.getTranslations(attributes)
  let attribute_roll = `?{${translations.attribute}`
  delete translations.attribute
  for (let [key, value] of Object.entries(translations)) {
      attribute_roll += key !== 'none' ? `|${value},@{${key}}` : `|${value},0}`
  }
  processingFunctions.setAttributes({attribute_roll: attribute_roll})
} 

const updateShotsFired = trigger => {
  getAttrs([`shots_fired`], attrs => {   
    attrs = processingFunctions.parseIntegers(attrs)
    const shots = processingFunctions.shadowrun.shotsFired(attrs.shots_fired, trigger)
    processingFunctions.setAttributes({shots_fired: shots})
  });
}

const updateAmmoWithShotsFired = () => {
  getAttrs([`primary_range_weapon_ammo`, `shots_fired`], attrs => {
    attrs = processingFunctions.parseIntegers(attrs)
    attrs.shots_fired = processingFunctions.convertIntegerNegative(attrs.shots_fired)
    processingFunctions.setAttributes({primary_range_weapon_ammo: processingFunctions.sumIntegers(Object.values(attrs))})
  });
}

const updateAmmoWithMax = () => {
  getAttrs([`primary_range_weapon_ammo_max`], attrs => {
    attrs = processingFunctions.parseIntegers(attrs)
    processingFunctions.setAttributes({primary_range_weapon_ammo: attrs.primary_range_weapon_ammo_max})
  });
}

const updateTab = attr => processingFunctions.setAttributes({tab: attr})

const updateAttributes = (array, attribute) => {
  getAttrs(array, attrs => {
    attrs = processingFunctions.shadowrun.attributeFactory(attrs)
    processingFunctions.setAttributes({
      [attribute]: attrs.total,
      [`display_${attribute}`]: attrs.base === attrs.total ? attrs.base : `${attrs.base} (${attrs.total})`
    })
  })
}

const updateMovement = () => {
  getAttrs(['agility', 'walk_modifier', 'run_modifier'], attrs => {
    attrs = processingFunctions.parseIntegers(attrs)
    processingFunctions.setAttributes({
      walk: processingFunctions.shadowrun.calculateWalkSpeed(attrs.agility, attrs.walk_modifier),
      run: processingFunctions.shadowrun.calculateRunSpeed(attrs.agility, attrs.run_modifier)
    })
  })
}

const updateDerivedAttribute = derivedAttribute => {
  getAttrs(sheetAttributes[derivedAttribute], attrs => {
    attrs = processingFunctions.shadowrun.attributeFactory(attrs)
    processingFunctions.setAttributes({[derivedAttribute]: attrs.total})
  })
}


//Calculate Astral Initiatve
const updateAstralInitiative = () => {
  getAttrs(["intuition", "astral_initiative_modifier"], v => {
    v = processingFunctions.parseIntegers(v);
    const base = v.intuition * 2, bonus = v.astral_initiative_modifier, total = base + bonus;

    setAttrs({
      ["astral_initiative"]: total,
      ["display_astral_initiative"]: bonus === 0 ? base : `${base} (${total})`
    });
  });
};

const resetConditionTrack = eventinfo => {
  const attr = eventinfo.triggerName.split("_").pop()
  processingFunctions.setAttributes({
    [`${attr}`] : 0
  })
}

//Calculate Matrix Initiatve.
const updateMatrixInitiative = () => {
  getAttrs(["sheet_type", "data_processing", "pilot", "intuition", "matrix_mod_modifier", "host_rating", "level", "matrix_dice_modifier", "edge_toggle"], v => {
    const sheetType = v.sheet_type;
    const edgeFlag = v.edge_toggle === "@{edge}" ? true : false;

    v = processingFunctions.parseIntegers(v);

    let base = v.data_processing;
    base += sheetType === "sprite" ? v.level : sheetType === "vehicle" ? v.pilot : sheetType === "host" ? v.host_rating : v.intuition;

    const total = base + v.matrix_mod_modifier;

    setAttrs({
      ["matrix_mod"]: total,
      ["matrix_dice"]: sheetType === "grunt" && edgeFlag ? 5 : sheetType === "grunt" && !edgeFlag ? 4 + v.matrix_dice_modifier : 4,
      ["display_matrix_mod"]: v.matrix_mod_modifier === 0 ? base : `${base} (${total})`
    })
  })
}

//Setting the Default attribute name for default skill
const updateDefaultAttribute = newValue => {
  getAttrs(["default_display"], value => {
    const display   = value.default_display
    let update      = {};

    //This sets a hidden input with the Attribute name so the roll template can use it to indicate what attribute was rolled
    const attribute   = processingFunctions.sliceAttr(newValue)
    const translation = getTranslationByKey(`${attribute}`)
    if (translation != display) {
      processingFunctions.setAttributes({default_display: translation})
    }
  })
}


/* OLD SCRIPTS */
//This function checks changes to repeating_armor and updates the Primary Armor if needed
on("change:repeating_armor", (eventInfo) => {
  const source = eventInfo.sourceAttribute;
  const newV   = eventInfo.newValue;
  const arm    = ["repeating_armor"];
  const armors = [`${arm}_name`, `${arm}_rating`, `${arm}_acid_modifier`, `${arm}_electrical_modifier`, `${arm}_laser_modifier`, `${arm}_gause_round_modifier`, `${arm}_cold_modifier`,`${arm}_fire_modifier`, `${arm}_radiation_modifier`, `${arm}_dicepool_modifier`];

  //Check if the event was related to the primary flag & armor is set to primary
  if (source.includes('primary') && newV === 'primary') {
    //Get attributes from the repeating_armor
    getAttrs(armors, (v) => {
      let update = {};
      //Update the hidden static Primary Armor attributes with the repeating_armor attributes
      _.each(armors, (armor) => {
        const name = (armor.includes("name") || armor.includes("rating")) ? armor.split("repeating_")[1] : armor.split(`${arm}_`)[1];
        update[`${name}`] = v[`${armor}`];
            });

            setAttrs(update);
          });

    //Set the other repeating_armor primary flags to 0 aka unchecked
          getSectionIDs(`${arm}`, function(ids) {
      let IDs    = [];
      let update = {};

          for(var i=0; i < ids.length; i++) {
              IDs.push(`${arm}_` + ids[i] + "_primary");
          };

          IDs.forEach(id => {
            if (id != source) {
              update[`${id}`] = 0;
            };
          });

          setAttrs(update);
        });
  //Check if the event was for a relevant Primary Armor attribute
  } else if (source.includes('name') || source.includes('rating') || source.includes('dicepool') || source.includes('acid') || source.includes('cold') || source.includes('electrical') || source.includes('fire') || source.includes('radiation')) {
    //Get the primary flag attribute for this armor. Also get the repeating_armor attribute we'll need for an update, doing it now is more efficient.
    getAttrs([`${arm}_primary`, `${source}`], (v) => {
      //Check if this armor is the designated Primary Armor.
      if (v[`${arm}_primary`] === 'primary') {
        let update = {};
        //Apply the repeating_armor attribute to its static counterpart
        switch (true) {
          case /name/.test(source)      : update["armor_name"] = v[`${source}`]; break;
          case /rating/.test(source)    : update["armor_rating"] = v[`${source}`]; break;
          case /dicepool/.test(source)  : update["soak"] = v[`${source}`]; break;
          case /acid/.test(source)      : update["acid"] = v[`${source}`]; break;
          case /cold/.test(source)      : update["cold"] = v[`${source}`]; break;
          case /electrical/.test(source): update["electrical"] = v[`${source}`]; break;
          case /fire/.test(source)      : update["fire"] = v[`${source}`]; break;
          case /radiation/.test(source) : update["radiation"] = v[`${source}`]; break;
          default: console.log(`Source  ${source} was invalid`);}

        setAttrs(update);
      };
    });
  } else {
    console.log("CHANGE NOT RELEVENT Primary Armor");
  };
});


//Weapon displays set into an Array
// Builder function to display details properly
// Note that since undefined are falsey if there's no label or sign we can leave the parameters blank
function repeatingStringBuilder(v, keyBase) {
    return function(key, label, sign) {
        // fetch the attr from v checking if it has a value
        const val = v[`${keyBase}${key}`];
        if (!val) return '';

        // Apply the sign if needed
        const disp = sign && val > 0 ? `+${val}` : val;

        // Apply label if needed
        return label ? `${label} ${disp}` : disp;
    }
}

on("change:repeating_weapon", () => {
  const source = "repeating_weapon_weapon";
    getAttrs([`${source}_range`, `${source}_type`, `${source}_reach`, `${source}_dv`, `${source}_ap`, `${source}_mode`, `${source}_rc`, `${source}_ammo`, `${source}_note`, `${source}_primary`], (v) => {
        // Local builder putting the needed variables into scope for repeatingStringBuilder
        const b = repeatingStringBuilder(v, `${source}_`);
        // Determine fields to display and in their proper order and formatting
        // Anonymous function is purely stylistic and adds more overhead than just a simple switch/case.  Personally I find the function looks cleaner and hides any internal scope that might conflict with outside
        const display = (() => {
            // 0 for weapon_range is a ranged weapon. A 1 is a melee weapon.
            switch(v.repeating_weapon_weapon_range) {
                case '0':
                // Not a fan of how ammo has to be handled.  Could potentially be placed in the repeatingStringBuilder if used more often for other change:repeating functions as some sort of suffix parameter
                const ammo = b('amm');
                return [
                    b('type'),
                    b('dv', 'DV'),
                    b('ap', 'AP', true),
                    b('mode'),
                    b('rc', 'RC'),
                    ammo ? `${ammo} (c)` : '',
                    b('note')
                ];
                case '1': return [
                    b('type'),
                    b('reach', 'Reach', true),
                    b('dv', 'DV'),
                    b('ap', 'AP', true),
                    b('note')
                ];
                default: return [
                    b('type'),
                    b('dv', 'DV'),
                    b('ap', 'AP', true),
                    b('note')
                ];
            }
        })()
            // Remove all empty strings
            .filter(s => s)
            // Concat all the strings and add comma between
            .join(', ');

        let update = {};
        update[`${source}`] = `[${display}]`;

        // Finally wrap square brackets around the weapon display
        setAttrs(update);
    });
});


//Spell displays set into an Array
  on("change:repeating_NPCspell", () => {
      getAttrs(["repeating_NPCspell_combat_type", "repeating_NPCspell_type", "repeating_NPCspell_range", "repeating_NPCspell_damage", "repeating_NPCspell_duration", "repeating_NPCspell_drain", "repeating_NPCspell_note"], (v) =>{
          const com = v.repeating_NPCspell_combat_type;
          const typ = `Type ${v.repeating_NPCspell_type}, `;
      const ran = `${v.repeating_NPCspell_range}, `;
      const dam = `Damage ${v.repeating_NPCspell_damage}, `;
      const dur = `Duration ${v.repeating_NPCspell_duration}, `;
      const not = `, ${v.repeating_NPCspell_note}`;
      const dra = v.repeating_NPCspell_drain;

      const drain = (dra > 0) ? `F+${dra} ` : (dra < 0) ? `F${dra} ` :"F ";
      const info = `[${typ}${ran}${dam}${dur}${drain}${not}]`;

      display = (com === "Direct, Force ") ? ` (Direct) ${info}` : 
        (com === "Indirect, Force ?{Force|}, AP -") ? ` (Indirect) ${info}` : `${info}`;
          setAttrs({repeating_NPCspell_spell: display});
      });
  });

//Complex Form displays  set into an Array
  on("change:repeating_form", () => {
      getAttrs(["repeating_form_form_duration", "repeating_form_form_target", "repeating_form_form_fade", "repeating_form_form_note", ], (v) =>{
        const tar = `Target ${v.repeating_form_form_target}, `;
      const dur = `Duration ${v.repeating_form_form_duration}, `;
      const not = `, ${v.repeating_form_form_note}` || '';
      const fad = (v.repeating_form_form_fade > 0) ? `L+${v.repeating_form_form_fade}` : 
            (v.repeating_form_form_fade < 0) ? `L${v.repeating_form_form_fade}` : "L";

          setAttrs({
            repeating_form_form: ` [${tar}${dur}${fad}${not}]`
          });
      });
  });

//IC displays are set into an Array
  on("change:repeating_IC", () => {
      getAttrs(["attack", "data_processing", "repeating_IC_IC_limit", "repeating_IC_IC_attribute", "repeating_IC_IC_matrix", "repeating_IC_IC_note"], (v) =>{
        const att = parseInt(v.attack) || 0;
        const data = parseInt(v.data_processing) || 0;
        const attr = v.repeating_IC_IC_attribute;
        const mat = v.repeating_IC_IC_matrix;
        const not = v.repeating_IC_IC_note;

          setAttrs({
            repeating_IC_IC: (v.repeating_IC_IC_limit === "@{data_processing}") ? ` ([${data}] vs. ${attr} + ${mat}, ${not})` : `([${att}] vs. ${attr} + ${mat}, ${not})`
          });
      });
  });

   ['acceleration', 'armor', 'body', 'data_processing', 'handling', 'pilot', 'sensor','speed'].forEach(attr => {
        // Attach listener
        on(`change:repeating_vehicle:${attr}_base change:repeating_vehicle:${attr}_modifier change:repeating_vehicle:${attr}_temp`, () => {
            // Load attribute values
            getAttrs([`repeating_vehicle_${attr}_base`, `repeating_vehicle_${attr}_modifier`, `repeating_vehicle_${attr}_temp`], (v) => {
                // Do some math to calculate the total
                const bas = parseInt(v[`repeating_vehicle_${attr}_base`]) || 0;
                const mod = parseInt(v[`repeating_vehicle_${attr}_modifier`]) || 0;
                const tem = parseInt(v[`repeating_vehicle_${attr}_temp`]) || 0;
                const bon = mod + tem;
                const stat = bas + bon;

                // Update the finalized total
                setAttrs({
                    [attr]: stat,
                    [`repeating_vehicle_display_${attr}`]: bon === 0 ? bas : `${bas} (${stat})`
                }, {silent: true});
            });
        });
    });
