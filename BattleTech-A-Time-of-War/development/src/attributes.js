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
    STRENGTH_LINK: "STR",
    BODY_LINK: "BOD",
    REFLEX_LINK: "RFL",
    DEXTERITY_LINK: "DEX",
    INTELLIGENCE_LINK: "INT",
    WILL_LINK: "WIL",
    CHARISMA_LINK: "CHA",
    EDGE_LINK: "EDG",
}

export const calculateAbilityScore = ({
    sourceAttribute,
    newValue
}) => {
    if (typeof newValue !== "number") {
        console.error("Expected numerical value for attribute [ " + sourceAttribute + " ] but got [ " + newValue + " ]")
        return undefined
    }

    const attributeValue = Math.floor(newValue / 100)
    const attributeLinkedValue = calculateLinkedAttributeValue(attributeValue)

    let attribute

    switch (sourceAttribute) {
        case STRENGTH_XP:
            attribute = {
                name: "strength",
                value: attributeValue,
                linkName: STRENGTH_LINK,
                linkValue: attributeLinkedValue,
            }
            break
        case BODY_XP:
            attribute = {
                name: "body",
                value: attributeValue,
                linkName: BODY_LINK,
                linkValue: attributeLinkedValue,
            }
            break
        case REFLEX_XP:
            attribute = {
                name: "reflex",
                value: attributeValue,
                linkName: REFLEX_LINK,
                linkValue: attributeLinkedValue,
            }
            break
        case DEXTERITY_XP:
            attribute = {
                name: "dexterity",
                value: attributeValue,
                linkName: DEXTERITY_LINK,
                linkValue: attributeLinkedValue,
            }
            break
        case INTELLIGENCE_XP:
            attribute = {
                name: "intelligence",
                value: attributeValue,
                linkName: INTELLIGENCE_LINK,
                linkValue: attributeLinkedValue,
            }
            break
        case WILL_XP:
            attribute = {
                name: "will",
                value: attributeValue,
                linkName: WILL_LINK,
                linkValue: attributeLinkedValue,
            }
            break
        case CHARISMA_XP:
            attribute = {
                name: "charisma",
                value: attributeValue,
                linkName: CHARISMA_LINK,
                linkValue: attributeLinkedValue,
            }
            break
        case EDGE_XP:
            attribute = {
                name: "edge",
                value: attributeValue,
                linkName: EDGE_LINK,
                linkValue: attributeLinkedValue,
            }
            break
        default:
            console.error("unknown attribute type passed in to basic attribute on change function")
    }

    return attribute
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