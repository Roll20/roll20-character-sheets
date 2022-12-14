/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
/**
 * A function to calculate the value of the base attribute mods in the system (might, finesse, resolve, insight, bearing, and weal).
 * 
 * Also, Note that the K-scaffold passes three properties of the args object to calculation, triggered, and initial functions. We're using `trigger`, and `attributes` here, but an object containing arrays of all the row IDs of each section is also passed under the term `sections`.
 * 
 * I've only listed the parameters of the trigger object that are relevant to this function. You can see the full parameter list in the [readme](https://github.com/Kurohyou/Roll20-Snippets/tree/main/K_Scaffold)
 * @param {object} args - An object containing the trigger and attributes
 * @param {object} args.trigger - The details of which attribute is being calculated.
 * @param {string} args.trigger.name - The full name of the attribute, including any repeating section information (won't be applicable for this function)
 * @param {object} args.attributes - The object containing the attribute values. Note that this is actually proxy for the actual attribute object that ensures values are returned correctly.
 * @returns {number} - Returns the new attribute mod, which the K-scaffold's infrastructure will apply to the sheet.
 */
 const calcAttributeMod = function({trigger,attributes}){
    let attribute = trigger.name.replace(/_mod/,'');//extract the base attribute name from the name of the triggering attribute
    let returnValue;
    switch(true){//We're looking for the first expression that returns true;
      case (attributes[attribute] < 4):
        returnValue = -2;
        break;
      case (attributes[attribute] < 7):
        returnValue = -1;
        break;
      case (attributes[attribute] < 15):
        returnValue = 0;
        break;
      case (attributes[attribute] < 18):
        returnValue = 1;
        break;
      case (attributes[attribute] >= 18):
        returnValue = 2;
        break;
      default:
        returnValue = 0;
        break;
    }
    return returnValue;
  };
  k.registerFuncs({calcAttributeMod});//We need to register the function with the k-scaffold so that the k-scaffold's listeners can call it when needed.
  
  /**
   * Our function to calculate our total Defense or reduction_value rating.
   * 
   * We are using the new `sections` parameter so that we can loop over our `repeating_armor` rows to determine what defense or reduction_value bonuses to apply.
   * 
   * Note that the `trigger` paramter is coming last here. Because the K-scaffold calls functions via the object destructuring argument method, We can put these arguments in any order, as long as they are all part of object. Even though this is possible, I would typically put these in a standardized order of `trigger`,`attributes`,`sections` just to make it easier for me to read the code.
   * @param {object} attributes - Same as in {@link calcAttributeMod}.
   * @param {object} sections - An object that contains all of the repeating row information for our sheet.
   * @param {string[]} sections.repeating_armor - The row IDs of our `repeating_armor` section. We'll use this to loop through and determine which defense bonuses should apply.
   * @param {object} trigger - As in {@link calcAttributeMod}
   * @returns {number} - Returns the new defense stat value, which the K-scaffold's infrastructure will apply to the sheet.
   */
  const calcDefense = function({attributes,sections,trigger}){
    let name = trigger.name.replace(/_.+/,'');//Extract the attribute name that will be used for referencing affecting attributes. e.g. `defense_total` becomes `defense` for use in referencing `defence_mod` and `repeating_armor_-oyho8987uLKJ_defense`.
    let activeArmorIDs = sections.repeating_armor.filter((id)=>attributes[`repeating_armor_${id}_equipped`]);//Because the K-scaffold's attributes object takes care of ensuring a proper return value for our attributes, we can just do a simple check for whether the attribute value is truthy (e.g. `1`) or falsy (e.g. `0`) because this attribute is a checkbox with a checked state of `1` and an off state of `0`.
    let finesse = name === 'defense' ?//Handles accounting for finesse in the defense calculation.
      10 + attributes.finesse_mod :
      0;
    let activeArmorBonus = activeArmorIDs.reduce((total,id)=>total += attributes[`repeating_armor_${id}_${name}`],0);//Total up the bonuses from all our equipped gear.
    return attributes[`${name}_mod`] + finesse + activeArmorBonus;//Total our defense or reduction score using the miscellaneous modifier and all of our equipped armors/shields.
  };
  k.registerFuncs({calcDefense});//Register the function

  const boundNumber = (value, min, max) => {
    [ value, min, max ] = [ value, min, max].map(input => parseFloat(input));
    if (!isNaN(value)) {
      value = (!isNaN(min)) ? Math.max(value, min) : value;
      value = (!isNaN(max)) ? Math.min(value, max) : value;
    }
    return value;
  }

  on('change:vigor change:vigor_max change:wounds change:vitality', () => {
    getAttrs([ 'vigor', 'vigor_max' ], (attributeValues) => {
      const boundValue = boundNumber(attributeValues.vigor, 0, attributeValues.vigor_max);
      if (boundValue !== attributeValues.vigor) {
        setAttrs({ vigor: boundValue });
      }
    });
  });

  on('change:hp change:hp_max change:wounds change:vitality', () => {
    getAttrs([ 'hp', 'hp_max' ], (attributeValues) => {
      const boundValue = boundNumber(attributeValues.hp, 0, attributeValues.hp_max);
      if (boundValue !== attributeValues.hp) {
        setAttrs({ hp: boundValue });
      }
    });
  });

  const calcHP = function({attributes}){
    return attributes.vitality * (attributes.ratio_max_hp - attributes.wounds);
  };
  k.registerFuncs({calcHP});

  const calcBloodied = function({attributes}){
    let returnValue;
    let hp_max = attributes.vitality * attributes.ratio_max_hp;
    let bloodied_hp = hp_max * attributes.ratio_bloodied;
    switch(true){ //We're looking for the first expression that returns true;
      case (attributes.hp <= bloodied_hp):
        returnValue = 1;
        break;
      default:
        returnValue = 0;
        break;
      }
    return returnValue;
  }
  k.registerFuncs({calcBloodied});

  // const calcPlusOne = function({attributes}){
  //   return attributes.number + 1;
  // }
  // k.registerFuncs({calcPlusOne});

  // const calcMultiply = function({attributes}){
  //   return attributes.mult1 * attributes.mult2;
  // }
  // k.registerFuncs({calcMultiply});