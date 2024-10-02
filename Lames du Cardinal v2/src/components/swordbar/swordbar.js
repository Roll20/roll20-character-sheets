
/**
 * Triggers the change of state of the health boxes
 */
on('clicked:health_1_cycle clicked:health_2_cycle clicked:health_3_cycle clicked:health_4_cycle clicked:health_5_cycle clicked:health_6_cycle clicked:health_7_cycle clicked:health_8_cycle', (ev) => {
    let srcName = ev.htmlAttributes.name.replace('act_', '').replace('_cycle', '')
    cycleBoxState(srcName, 4);
})