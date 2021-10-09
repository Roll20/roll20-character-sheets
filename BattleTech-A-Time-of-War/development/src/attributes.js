const STRENGTH_XP = "strength_xp"
const BODY_XP = "body_xp"
const REFLEX_XP = "reflex_xp"
const DEXTERITY_XP = "dexterity_xp"
const INTELLIGENCE_XP = "intelligence_xp"
const WILL_XP = "will_xp"
const CHARISMA_XP = "charisma_xp"
const EDGE_XP = "edge_xp"

export const STRENGTH_LINK = "strength_link"
export const BODY_LINK = "body_link"
export const REFLEX_LINK = "reflex_link"
export const DEXTERITY_LINK = "dexterity_link"
export const INTELLIGENCE_LINK = "intelligence_link"
export const WILL_LINK = "will_link"
export const CHARISMA_LINK = "charisma_link"
const EDGE_LINK = "edge_link"

export const linkedAttributeDisplayNames = {
    [STRENGTH_LINK]: "STR",
    [BODY_LINK]: "BOD",
    [REFLEX_LINK]: "RFL",
    [DEXTERITY_LINK]: "DEX",
    [INTELLIGENCE_LINK]: "INT",
    [WILL_LINK]: "WIL",
    [CHARISMA_LINK]: "CHA",
    [EDGE_LINK]: "EDG",
}

export const calculateAttributeScore = (attributeXPName, attributeXP) => {
    const attributeXPAsNumber = parseInt(attributeXP)

    if (isNaN(attributeXPAsNumber)) {
        console.error("Expected numerical value for attribute [ " + attributeXPName + " ] but got [ " + attributeXP + " ]")
        return undefined
    }

    const attributeValue = Math.floor(attributeXPAsNumber / 100)
    const attributeLinkedValue = calculateLinkedAttributeValue(attributeValue)

    switch (attributeXPName) {
        case STRENGTH_XP:
            return {
                name: "strength",
                value: attributeValue,
                linkName: STRENGTH_LINK,
                linkValue: attributeLinkedValue,
            }
        case BODY_XP:
            return {
                name: "body",
                value: attributeValue,
                linkName: BODY_LINK,
                linkValue: attributeLinkedValue,
            }
        case REFLEX_XP:
            return {
                name: "reflex",
                value: attributeValue,
                linkName: REFLEX_LINK,
                linkValue: attributeLinkedValue,
            }
        case DEXTERITY_XP:
            return {
                name: "dexterity",
                value: attributeValue,
                linkName: DEXTERITY_LINK,
                linkValue: attributeLinkedValue,
            }
        case INTELLIGENCE_XP:
            return {
                name: "intelligence",
                value: attributeValue,
                linkName: INTELLIGENCE_LINK,
                linkValue: attributeLinkedValue,
            }
        case WILL_XP:
            return {
                name: "will",
                value: attributeValue,
                linkName: WILL_LINK,
                linkValue: attributeLinkedValue,
            }
        case CHARISMA_XP:
            return {
                name: "charisma",
                value: attributeValue,
                linkName: CHARISMA_LINK,
                linkValue: attributeLinkedValue,
            }
        case EDGE_XP:
            return {
                name: "edge",
                value: attributeValue,
                linkName: EDGE_LINK,
                linkValue: attributeLinkedValue,
            }
        default:
            console.error("unknown attributeData type passed in to basic attributeData on change function")
            return undefined
    }
}

export const calculateLinkedAttributeValue = attribute => {
    if (attribute > 10) {
        return Math.floor(attribute / 3)
    } else {
        if (attribute < 1)
            return -4
        else if (attribute < 2)
            return -2
        else if (attribute < 4)
            return -1
        else if (attribute < 7)
            return 0
        else if (attribute < 10)
            return 1
        else
            return 2
    }
}