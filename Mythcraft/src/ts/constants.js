//Set variables, traits, and other attributes
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var mentalAttributes = ["awareness", "intellect", "charisma"];
var metaphysicAttributes = ["luck", "coordination"];
var physicalAttributes = ["strength", "dexterity", "endurance"];
var attributes = __spreadArray(__spreadArray(__spreadArray([], mentalAttributes, true), metaphysicAttributes, true), physicalAttributes, true);
var action_points = ["coordination", "action_points_base"];
var hit_points = ["endurance", "hit_points_base", "level"];
var critical_range = ["critical_range", "luck", "critical_range_base"];
// Defenses
var armor_rating = ["armor_rating_base"];
var anticipation = ["anticipation_base", "awareness"];
var fortitude = ["fortitude_base", "endurance"];
var logic = ["logic_base", "intellect"];
var reflexes = ["reflexes_base", "dexterity"];
var willpower = ["willpower_base", "charisma"];
// const skills = [
//   "awareness",,
//   "first aid",
//   "intrigue",
// ];
// const characteristics = {
//   movement: ["strength", "dexterity"],
// };
