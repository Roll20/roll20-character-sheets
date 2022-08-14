
const errorMessage = (name, error) => console.error(`%c ${name}: ${error}`, "color: orange; font-weight:14px;");
const warningMessage = (name, error) => console.warn(`%c ${name}: ${error}`, "color: gold; font-weight:14px;");

const checkSourceForSheetworker = eventinfo => eventinfo.sourceType && eventinfo.sourceType != "sheetworker" ? true : false

// Example: -m2jzgfth07mvwp3hhng
const getReprowid = sourceAttribute => sourceAttribute.split('_')[2]

// Example: repeating_tool_-m2jzgfth07mvwp3hhng
const getRepeatingSectionPrefix = sourceAttribute => {
    const split = sourceAttribute.split('_');
    return `${split[0]}_${split[1]}_${split[2]}`
}

// Example: repeating_tool_-m2jzgfth07mvwp3hhng_attkflag returns attkflag
const getAttrNameAtEndRepeating = sourceAttribute => {
	const repeatingSplit = sourceAttribute.split('_')
	const repeatingSplice = repeatingSplit.splice(3)
	const repeatingAttrName = repeatingSplice.length > 1 ? repeatingSplice.join('_') : repeatingSplice[0]
	return repeatingAttrName
}

