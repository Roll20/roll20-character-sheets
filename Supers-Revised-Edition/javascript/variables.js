/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
// Variables
const sheetName = 'Supers! Revised Edition';
const version = 1.4;
let debugMode = false;
const rollButtons = [
    //PC Buttons
    'repeating_aptitudes:compute-aptitude','repeating_powers:compute-power','compute-composure','compute-fortitude','compute-reaction','compute-will','compute-aptitude','compute-power',

    //Mook Buttons
    'compute-rating','repeating_exceptional:compute-exceptional',

    //HQ Buttons
    'compute-material-strength','compute-security',
];
const sheetSections = ['character','mook','vehicle','headquarters','settings'];
const repeatingSectionDetails = [
    {section:'repeating_aptitudes',fields:['compute-aptitude','aptitudename']},
    {section:'repeating_powers',fields:['powernamename','power','powername','compute-power']},
    {section:'repeating_exceptional',fields:['name','dice','compute-exceptional']},
    {section:'repeating_hq-aptitudes',fields:['compute-aptitude','aptitudename']},
    {section:'repeating_hq-powers',fields:['power','powername','compute-power']},
    {section:'repeating_vehicle-aptitudes',fields:['compute-aptitude','aptitudename']},
    {section:'repeating_vehicle-powers',fields:['power','powername','compute-power']},
];
const baseGet = [];