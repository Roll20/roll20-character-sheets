function pInt(val){
    return parseInt(val)||0;
};
const repeatingSum = (destinations, section, fields) => {
    if (!Array.isArray(destinations)) destinations = [destinations.replace(/\s/g, '').split(',')];
    if (!Array.isArray(fields)) fields = [fields.replace(/\s/g, '').split(',')];
    getSectionIDs(`repeating_${section}`, idArray => {
        const attrArray = idArray.reduce((m, id) => [...m, ...(fields.map(field => `repeating_${section}_${id}_${field}`))], []);
        getAttrs([...attrArray], v => {
            const getValue = (section, id, field) => v[`repeating_${section}_${id}_${field}`] === 'on' ? 1 : parseFloat(v[`repeating_${section}_${id}_${field}`]) || 0;
            const commonMultipliers = (fields.length <= destinations.length) ? [] : fields.splice(destinations.length, fields.length - destinations.length);
            const output = {};
            destinations.forEach((destination, index) => {
                output[destination] = idArray.reduce((total, id) => total + getValue(section, id, fields[index]) * commonMultipliers.reduce((subtotal, mult) => subtotal * getValue(section, id, mult), 1), 0);
            });
            setAttrs(output);
        }); 
    }); 
};
function getAttributes(idArray,section,allids,attrArray)
{
    idArray.forEach(id=>{allids.push(section + "_" + id )});
    idArray.forEach(id=>{attrArray.push(section + "_" + id + "_attribute" )});
    idArray.forEach(id=>{attrArray.push(section + "_" + id + "_bonus" )});
    idArray.forEach(id=>{attrArray.push(section + "_" + id + "_attribute2" )});
    idArray.forEach(id=>{attrArray.push(section + "_" + id + "_bonus2" )});
    idArray.forEach(id=>{attrArray.push(section + "_" + id + "_active" )});
}