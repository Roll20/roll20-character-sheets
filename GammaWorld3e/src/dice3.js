/*
 * Dices 3.1
 */
(function() {
    'use strict';
  
  
    window.dices = {
  
      Version: '3.1.3',
  
  
      // TODO: add 'dropped' array to return dropped rolls
  
  
      /**
       * Parses a dice string into an object
       *
       * @param  {string} dice string to be parsed (e.g '1d6')
       * @return {object} return an object containing count, sides, and modifier values
       */
      parseRoll: function(roll) {
  
        var dice = {
              count: 0,
              sides: 0,
              modifier: 0
            },
            indexAt = -1,
            i = 0,
            l = 0;
  
        for (i=0, l=roll.length; i < l; i += 1) {
  
          // finds index of 'd' or 'D' character in dice string
          if (roll.charCodeAt(i) === 100 || roll.charCodeAt(i) === 68) {
            indexAt = i;
            break;
          }
  
        }
  
        if (indexAt === -1) {
          return dice;
        }
        else {
  
          dice.count = roll.substring(0, indexAt) >> 0;
  
          for (i=0, l=roll.length; i < l; i+=1) {
            if (roll.charCodeAt(i) === 43) {
              dice.sides = roll.substring(indexAt+1, i) >> 0;
              indexAt = i;
              dice.modifier = roll.substring(indexAt+1, l) >> 0;
              break;
            }
            else if (roll.charCodeAt(i) === 45) {
              dice.sides = roll.substring(indexAt+1, i) >> 0;
              indexAt = i;
              dice.modifier = (roll.substring(indexAt+1, l) >> 0) * -1;
              break;
            }
          }
  
          if (!dice.sides) {
            dice.sides = roll.substring(indexAt+1, roll.length) >> 0;
          }
        }
  
        return dice;
  
      },
  
  
      /**
       * Rolls the dice, and handles the result based on optional parameters, then returns the result object
       *
       * @param  {object} dice     The dice to be rolled, if string, calls parseDice.
       * @param  {object} options  An object containing optional parameter overrides.
       * @return {object}          A object containing all of the roll results, as well as the total.
       */
      roll: function(dice, options) {
  
        var parsedDice = {
              count: 0,
              sides: 0,
              modifier: 0
            },
            result = {
              rolls: [],
              total: 0
            },
            rolled = 0,
            i = 0,
            l = 0;
  
        options = dices.extend({
          multiMod    :  false, // Add modifier to for each dice rolled, instead of only once.
          dropLowest  :  0,     // Useful for quick character stats generation
          dropHighest :  0,     // I don't know why you'd need this, but here it is anyway!
          multiplier  :  1      // Probably only useful for very specific needs. Multies roll, before adding modifier
        }, options);
  
  
        if (!dice) {
          return result;
        }
        else if (typeof dice === 'string') {
          parsedDice = dices.parseRoll(dice);
        }
        else if (typeof dice === 'object' && dices.isInt(dice.count) && dices.isInt(dice.sides)) {
          parsedDice = dice;
        }
        else {
          return result;
        }
  
        for (i = 0, l = parsedDice.count; i < l; i += 1) {
  
          rolled = Math.round(Math.random() * (parsedDice.sides - 1)) + 1;
          rolled = rolled * options.multiplier;
  
          if (options.multiMod) {
            rolled += parsedDice.modifier;
          }
  
          result.rolls.push(rolled);
  
        }
  
        // TODO: Re-sort array back to original state, instead of leaving it sorted by value
        if (dices.isInt(options.dropLowest) && options.dropLowest > 0) {
  
          result.rolls.sort(dices.highSort);
          result.rolls.length -= options.dropLowest;
  
        }
        if (dices.isInt(options.dropHighest) && options.dropLowest > 0) {
  
          result.rolls.sort(dices.lowSort);
          result.rolls.length -= options.dropHighest;
  
        }
  
        for (i = 0, l = result.rolls.length; i < l; i+=1) {
  
          result.total += result.rolls[i];
  
        }
  
        if (!options.multiMod) {
          result.total += parsedDice.modifier;
        }
  
        return result;
  
      },
  
  
      /**
       * Overrides values of one object with the values of another.
       */
      extend: function(a, b) {
  
        b = b || {};
  
        Object.keys(b).forEach(function(key) {
          a[key] = b[key];
        });
  
        return a;
  
      },
  
  
      /**
       * Sorts from highest to lowest.
       */
      highSort: function(a, b) {
  
        return b - a;
  
      },
  
  
      /**
       * Sorts from lowest to highest.
       */
      lowSort: function(a, b) {
  
        return a - b;
  
      },
  
  
      /**
       * Returns true if parameter is integer.
       */
      isInt: function(n) {
  
        return n === (n >> 0);
  
      },
  
  
      version: function() {
  
        return dices.Version;
  
      },
  
  
    };
  
  
  })();
  