/**
 * Manage the Heal button action, including revive
 */
on('clicked:repeating_heal', function(ev)
{
    let id = ev.sourceAttribute.split('_').pop();
    let nb_id = 'repeating_heal_' + id + '_healnb';
    let wound_id = 'repeating_heal_' + id + '_heal-blessure';
    let pain_id = 'repeating_heal_' + id + '_heal-souffrance';
    let name_id = 'repeating_heal_' + id + '_heal-name';

    getAttrs([nb_id, wound_id, pain_id, name_id, 'blessures', 'blessures_max', 'souffrances'], function (values) {
        let wounds = parseInt(values["blessures"])||0;
        let max_wounds = parseInt(values["blessures_max"])||0;
        let cur_pain = parseInt(values["souffrances"])||0;
        let nb = parseInt(values[nb_id])||0;
        let pain = parseInt(values[pain_id])||0;
        console.log("Module de soins");
        console.warn("Nb: " + values[nb_id] + " - " + nb);
        if (nb) {
            console.log("Je peux soigner !");
            let revive = values[name_id].match(/[eé]veil/);

            if (revive && wounds == max_wounds) {
                console.log("Résurection");
                if (values[wound_id].indexOf('-')) {
                    let amount = parseInt(values[wound_id].split('-').pop().trim())||0;
                    wounds = max(max_wounds - amount, 0);
                    nb--;
                } else {
                    console.warn("Je sais pas combien je lui mets !")
                }
            } else if (wounds && !revive){
                console.log("Soins");
                let amount = parseInt(values[wound_id])||0;
                wounds = Math.max(wounds - amount, 0);
                cur_pain += pain;
                nb--;
            } else {
                console.log('pas de soins');
            }

            setAttrs({
                blessures: wounds,
                repeating_heal_healnb: nb,
                souffrances: cur_pain
            });
        }
    })

})
