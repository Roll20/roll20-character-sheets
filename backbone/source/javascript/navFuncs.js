/**
 * Resets the fresh state for animation containers so that they do not run on reloading a page.
 * @param {object} trigger - The trigger that caused the function to be called
 * @param {object} attributes - The attribute values of the character
 * @param {object[]} sections - All the repeating section IDs
 * @param {object} casc - Expanded cascade object
 */
const refreshAnimations = function({trigger,attributes,sections,casc}){
  $20('#pc-conditions .sidebar-toggle,#pc-conditions').addClass('fresh');
};
k.registerFuncs({ refreshAnimations });