'use strict';
import _ from 'underscore';
import TAS from './TheAaronSheet.js';
import * as SWUtils from './SWUtils';
import PFConst from './PFConst';
import * as PFUtils  from './PFUtils';

/****************************ASYNCHRONOUS UTILITIES ***********************************
 ***************************************************************************************/
/** Looks at a dropdown selected value, finds the matching attribute value #, and then
 * sets the writeFields with that number.
 *
 * @param {string} from the dropdown fieldname
 * @param {string} to fieldname to which we write the numeric value of the 'from' dropdown selection
 * @param {function(new,old,changed)} callback - the function to call when done with the numeric value of the dropdown setting
 * @param {boolean} silently if quiet or not
 * @param {string} useFindAbility true if @{} around values in the dropdown
 */
export function setDropdownValue (readField, writeFields, callback, silently,useFindAbility) {
    var functionToPass = null;
    if(useFindAbility){
        functionToPass=PFUtils.findAbilityInString;
    }
    SWUtils.setDropdownValue(readField, writeFields, functionToPass, callback, silently);
}
/** calls setDropdownValue for a dropdown in a repeating section
 * @param {string} section the string between "repeating_" and "_<id>"
 * @param {string} id optional- the id of this row, blank if in context of the current row
 * @param {string} from the attribute name of the dropdown , string after "repeating_section_id_"
 * @param {string} to the attribute to write to, string after "repeating_section_id_"
 * @param {function(new,old,changed)} callback - the function to call when done with the numeric value of the dropdown setting
 * @param {boolean} silently if quiet or not
 * @param {string} useFindAbility true if @{} around values in the dropdown
 */
export function setRepeatingDropdownValue (section, id, from, to, callback,silently,useFindAbility) {
    var idStr = SWUtils.getRepeatingIDStr(id),
    prefix = "repeating_" + section + "_" + idStr,
    functionToPass = null;
    if(useFindAbility){
        functionToPass=PFUtils.findAbilityInString;
    }
    //setDropdownValue(prefix + from, prefix + to, callback,silently);
    SWUtils.setDropdownValue(prefix + from,  prefix + to, functionToPass, callback, silently);
}
/** sets the _row_id fields for all rows in the section
 * @param {string} section the fieldset (name after "section_")
 */
export function setRowIds (section) {
    getSectionIDs("repeating_" + section, function (ids) {
        var setter = {};
        _.each(ids, function (id) {
            setter["repeating_" + section + "_" + id + "_row_id"] = id;
        });
        SWUtils.setWrapper(setter);
    });
}
/* toggles default header images */
const header_images = {
    'header_image-pf_spell': "[default](https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/Pathfinder%20Community/Images/pf_spell.png)",
    'header_image-pf_attack-melee': "[default](https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/Pathfinder%20Community/Images/pf_attack_melee.png)",
    'header_image-pf_attack-dual': "[default](https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/Pathfinder%20Community/Images/pf_attack_dual.png)",
    'header_image-pf_attack-ranged': "[default](https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/Pathfinder%20Community/Images/pf_attack_ranged.png)",
    'header_image-pf_attack-cmb': "[default](https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/Pathfinder%20Community/Images/pf_attack_cmb.png)",
    'header_image-pf_defense': "[default](https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/Pathfinder%20Community/Images/pf_defense.png)",
    'header_image-pf_generic': "[default](https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/Pathfinder%20Community/Images/pf_generic.png)",
    'header_image-pf_ability': "[default](https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/Pathfinder%20Community/Images/pf_ability.png)",
    'header_image-pf_block': "[default](https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/Pathfinder%20Community/Images/pf_block.png)",
    'header_image-pf_generic-skill': "[default](https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/Pathfinder%20Community/Images/pf_generic.png)",
    'header_image-pf_generic-init': "[default](https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/Pathfinder%20Community/Images/pf_generic_initiative.png)",
    'header_image-pf_block-item': "[default](https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/Pathfinder%20Community/Images/pf_block_item.png)",
    'header_image-pf_block-check': "[default](https://raw.githubusercontent.com/Roll20/roll20-character-sheets/master/Pathfinder%20Community/Images/pf_block_ability_check.png)"
};
const header_image_names = Object.keys(header_images);
on("change:header_images_toggle", function () {
    getAttrs(header_image_names.concat(['header_images_toggle']), function (values) {
        const tempToggle = +values.header_images_toggle || 0;
        let tempImages = {};
        header_image_names.forEach(image => {
            const currentImage = values[image];
            if (currentImage === header_images[image] || currentImage === '') {
                tempImages[image] = tempToggle > 0 ? header_images[image] : '';
            }
        });
        if(tempImages) setAttrs(tempImages);
    });
});

export function registerEventHandlers() {
    //REPEATING SECTIONS set IDs
    _.each(PFConst.repeatingSections, function (section) {
        var eventToWatch = "change:repeating_" + section + ":ids-show";
        on(eventToWatch, TAS.callback(function eventCheckIsNewRow(eventInfo) {
            var setter={},id;
            TAS.debug("caught " + eventInfo.sourceAttribute + " event: " + eventInfo.sourceType);
            if (eventInfo.sourceType === "player" || eventInfo.sourceType === "api") {
                id = SWUtils.getRowId(eventInfo.sourceAttribute);
                setter["repeating_" + section + "_"+id+"_row_id"]=id;
                SWUtils.setWrapper(setter,PFConst.silentParams);
            }
        }));
    });
}
registerEventHandlers();
