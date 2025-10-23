
/**
 * Library of useful functions to manage repeating sections
 */
const section_name = (section, id, field) => `${section.startsWith('repeating_') ? section : `repeating_${section}`}_${id}_${field}`

const section_parts = (full_name, part='section') => {
    let [stub, section, row, ...field] = full_name.split('_')
    if (part === 'section' || part === 1) return section;
    else if (part === 'row' || part === 'id' || part === 2) return row;
    else return field.join('_')
}

const section_changes = section_object => {
    let output = ''
    Object.keys(section_object).forEach((key, index) => {
        if (index) section += ' ';
        section_object[key].forEach(field => {
            output += 'change:'
            output += key === 'globals' ? field : `repeating_${key}:${field}`
        })
    })
    return output
}
