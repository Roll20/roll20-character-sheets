import {
    linkedAttributeDisplayNames
} from './attributes'
import {
    skillsList,
    tieredSkills,
    tieredSkillsBasic,
    tieredSkillsAdvanced
} from './domain/skills/skills-list'

const skillXPChanged = ({
    id,
    newValue
}) => {
    // When the sheet is opened, or data migrations are run, the skills are retrieved via ID, and thus must have their
    // ID included in the attribute name when setting attributes.
    const skillId = id !== undefined ? id + "_" : ""

    const skill = "repeating_skills_" + skillId + "skill"
    const skillLevel = "repeating_skills_" + skillId + "skill_level"
    const subSkillAttrName = "repeating_skills_" + skillId + "sub_skill"

    getAttrs([skill, subSkillAttrName, "learning_speed", ], values => {
        const skillName = values[skill]
        const skillNameLookupKey = skillName.split("_")[0]
        const subSkill = values[subSkillAttrName]

        let skillAttributesToSet = {}

        skillAttributesToSet[skillLevel] = calculateSkillLevel(Number(newValue), values.learning_speed)

        const skillData = getSkill(
            skillNameLookupKey,
            skillAttributesToSet[skillLevel],
            tieredSkills.includes(skillNameLookupKey)
        )

        skillAttributesToSet["repeating_skills_" + skillId + "skill_tnc"] = skillData.targetNumber + "/" + skillData.complexity
        skillAttributesToSet["repeating_skills_" + skillId + "target_number"] = skillData.targetNumber

        getAttrs(skillData.linkedAttributes, values => {
            skillAttributesToSet["repeating_skills_" + skillId + "skill_modifier"] = Object.values(values)
                .reduce((total, num) => Number(total) + Number(num)) + Number(skillAttributesToSet[skillLevel])

            skillAttributesToSet["repeating_skills_" + skillId + "skill_linked_attributes"] = skillData.linkedAttributes
                .map(linkAtr => linkedAttributeDisplayNames[linkAtr] + " (" + values[linkAtr] + ")")
                .join(" + ")

            skillAttributesToSet["repeating_skills_" + skillId + "skill_roll_value"] =
                getSkillDisplayName(skillData, skillName, subSkill) + " Skill Check:\n" +
                "Margin of Success: [[2d6 + @{skill_modifier}[MOD] - @{target_number}[TN]]]"

            setAttrs(skillAttributesToSet, {}, () => {})
        })
    })
}

export const calculateSkillLevel = (skillXP, learningSpeedModifier) => {
    const learningSpeedPercentageModifier = 1 + 0.2 * learningSpeedModifier

    if (skillXP < 20 * learningSpeedPercentageModifier) {
        return -1
    }

    for (let i = 0; i < 10; i++) {
        if (skillXP < getXPForLevel(i + 1) * learningSpeedPercentageModifier)
            return i
    }

    return 10
}

const getXPForLevel = level => {
    let total = 0

    while (level > 0) {
        total += level * 10
        level--
    }

    return total + 20
}

export const getSkillDisplayName = (skill, skillDisplayNameKey, subSkill) => {
    if (skill.subSkills === true) {
        return skill.displayName[skillDisplayNameKey] + "/" + subSkill
    }

    if (typeof subSkill === "string" && subSkill != "") {
        return skill.displayName[skillDisplayNameKey] + " (" + subSkill + ")"
    }

    return skill.displayName[skillDisplayNameKey]
}

export const getSkill = (skillName, skillLevel, tieredSkill) => {
    if (tieredSkill) {
        if (skillLevel <= 3) {
            return tieredSkillsBasic[skillName]
        } else {
            return tieredSkillsAdvanced[skillName]
        }
    } else {
        return skillsList[skillName]
    }
}