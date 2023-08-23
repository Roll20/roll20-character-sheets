
const updateBonuses = () => {
    const array = ["strength","empathy","acuity","perception","willpower","intelligence"];

    getAttrs(array, values => {

        array.forEach(item => updateBonus(item, values[item]));

    });
}

const updateBonus = (stat, new_value) => {
    const bonus = Math.floor(new_value/10);

    const updateAttrs = {};

    updateAttrs[`${stat}_bonus`] = bonus;

    setAttrs(updateAttrs);

    console.log(updateAttrs);
}

["strength","empathy","acuity","perception","willpower","intelligence"].forEach(item => on(`change:${item}`, eventInfo => updateBonus(item, eventInfo.newValue)));

on(`sheet:opened`, eventInfo => updateBonuses())