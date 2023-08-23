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
      if (boundValue === attributeValues.vigor) {
        setAttrs({ vigor: boundValue });
      }
    });
  });

  on('change:hp change:hp_max change:wounds change:vitality', () => {
    getAttrs([ 'hp', 'hp_max' ], (attributeValues) => {
      const boundValue = boundNumber(attributeValues.hp, 0, attributeValues.hp_max);
      if (boundValue === attributeValues.hp) {
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
    let bloodied_hp = Math.ceil(hp_max * attributes.ratio_bloodied);
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

  const calcDash = function({attributes}){
    return Math.ceil(attributes.speed * attributes.ratio_dash);
  };
  k.registerFuncs({calcDash});

  const calcInterval = function({attributes}){
    return Math.ceil(attributes.xp_max / 3);
  };
  k.registerFuncs({calcInterval});

  // const calcPlusOne = function({attributes}){
  //   return attributes.number + 1;
  // }
  // k.registerFuncs({calcPlusOne});

  // const calcMultiply = function({attributes}){
  //   return attributes.mult1 * attributes.mult2;
  // }
  // k.registerFuncs({calcMultiply});