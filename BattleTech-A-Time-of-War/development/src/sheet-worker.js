import {
    calculateAttributeScore,
    linkedAttributeDisplayNames
} from './attributes'
import {
    calculateSkillLevel,
    getSkill,
    getSkillDisplayName
} from './skills'
import {
    skillsList,
    tieredSkillsBasic,
    tieredSkills
} from './domain/skills/skills-list'

const sheetOpened = () => {
    sheetMigration()

    getAttrs(["btatow_sheet_version", ], ({
        btatow_sheet_version
    }) => {
        if (btatow_sheet_version >= 3) {
            recalculateSkills()
        }
    })
}

// run any data migrations
on("sheet:opened", sheetOpened)

const recalculateSkills = () => {
    getSectionIDs("skills", ids =>
        ids.forEach(
            id => getAttrs(["repeating_skills_" + id + "_skill_xp", ],
                values =>
                skillXPChanged({
                    newValue: values["repeating_skills_" + id + "_skill_xp"],
                    id,
                })
            )
        )
    )
}

// calculate stat values when XP amount changes
on("change:strength_xp change:body_xp change:reflex_xp change:dexterity_xp change:intelligence_xp change:will_xp change:charisma_xp change:edge_xp", ({
    sourceAttribute,
    newValue
}) => {
    const attributes = calculateAttributeScore(sourceAttribute, newValue)

    const set = {}
    set[attributes.name] = attributes.value
    set[attributes.linkName] = attributes.linkValue
    setAttrs(set, {}, recalculateSkills)
})

on("change:repeating_skills:skill change:repeating_skills:sub_skill", _ => {
    getAttrs(["repeating_skills_skill_xp", ], ({
        repeating_skills_skill_xp
    }) => {
        skillXPChanged({
            newValue: repeating_skills_skill_xp,
        })
    })
})

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

        const skillAttributesToSet = {}

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

// calculate skill modifiers when skill xp changes
on("change:repeating_skills:skill_xp", skillXPChanged)

// recalculate all skills when learning speed modifier changes
on("change:learning_speed", recalculateSkills)

const sheetMigration = () => {
    console.log("Running sheet data migration")

    let sheetVersionAttributeName = "btatow_sheet_version"
    let currentVersion = 3

    getAttrs([sheetVersionAttributeName, ], sheetVersionAttribute => {
        let sheetVersion = Number(sheetVersionAttribute[sheetVersionAttributeName])
        // Check if we should do the migration
        if (isNaN(sheetVersion)) {
            console.error("No sheet version defined, unable to determine if sheet data needs to be migrated.")
            return
        }

        if (sheetVersion === currentVersion) {
            console.log("No migration needed")
            return
        }

        switch (sheetVersion) {
            case 1:
                migrateFrom1To2()
                break
            case 2:
                migrateFrom2To3()
                break
            default:
                break
        }
    })
}

// Migrate attribute data from version 1 to version 2
const migrateFrom1To2 = () => {
    const oldAttributeNames = [
        "STRXP",
        "BODXP",
        "RFLXP",
        "DEXXP",
        "INTXP",
        "WILXP",
        "CHAXP",
        "EDGXP",
    ]
    const newAttributeNames = [
        "strength_xp",
        "body_xp",
        "reflex_xp",
        "dexterity_xp",
        "intelligence_xp",
        "will_xp",
        "charisma_xp",
        "edge_xp",
    ]

    let newAttributes = {}

    console.log("Starting migration from version 1 to version 2.")

    getAttrs(oldAttributeNames, attributes => {
        console.debug("Attributes fetched: " + JSON.stringify(attributes))
        for (let i = 0; i < oldAttributeNames.length; i++) {
            if (attributes[oldAttributeNames[i]] !== undefined) {
                console.debug("Attributes[" + oldAttributeNames[i] + "]: " + attributes[oldAttributeNames[i]])
                newAttributes[newAttributeNames[i]] = attributes[oldAttributeNames[i]]
            }
        }

        console.debug("New attributes: " + JSON.stringify(newAttributes))

        setAttrs(newAttributes, {}, () => {
            setAttrs({
                btatow_sheet_version: "2",
            }, {}, () => {
                console.log("Sheet data migration completed")
            })
        })
    })
}

// Migrate skills data from version 2 to version 3
const migrateFrom2To3 = () => {
    console.log("Starting migration from version 2 to version 3.")

    getSectionIDs("skills", ids => {
        let skillsUpdated = 0

        ids.forEach(id => {
            const oldSkillDataNames = {
                skill: "repeating_skills_" + id + "_skill",
                subSkill: "repeating_skills_" + id + "_skillNotes",
                xp: "repeating_skills_" + id + "_skillXP",
            }
            const newSkillDataNames = {
                skill: "repeating_skills_" + id + "_skill",
                subSkill: "repeating_skills_" + id + "_sub_skill",
                xp: "repeating_skills_" + id + "_skill_xp",
            }
            getAttrs(Object.values(oldSkillDataNames), oldSkillValues => {
                const oldSkillName = oldSkillValues[oldSkillDataNames.skill]
                const oldSkillSubSkillName = oldSkillValues[oldSkillDataNames.subSkill]

                if (oldSkillName === undefined || oldSkillValues[oldSkillDataNames.xp] === undefined) {
                    console.error("Old skill data is missing values, unable to migrate.\n" + JSON.stringify(oldSkillValues))
                    skillsUpdated++
                    return
                }

                let parsedSkillName = oldSkillName.toLowerCase()
                    .replace(" ", "_")
                    .replace("-", "_")

                const skillFirstName = parsedSkillName.split("_")[0]

                let skillData = {}
                const newSkillValues = {}

                if (skillFirstName in skillsList) {
                    skillData = skillsList[skillFirstName]
                } else if (skillFirstName in tieredSkillsBasic) {
                    skillData = tieredSkillsBasic[skillFirstName]
                } else if (skillFirstName.substring(0, skillFirstName.length - 1) in tieredSkillsBasic) {
                    skillData = tieredSkillsBasic[skillFirstName.substring(0, skillFirstName.length - 1)]
                    parsedSkillName = parsedSkillName.substring(0, parsedSkillName.length - 1)
                } else {
                    console.error("Unable to migrate skill data. Old values are: " + JSON.stringify(oldSkillValues))
                    skillsUpdated++
                    return
                }

                let skillName = ""
                let displaySubSkill = true

                if (parsedSkillName in skillData.displayName) {
                    skillName = parsedSkillName
                } else if (parsedSkillName.substring(0, parsedSkillName.length - 1) in skillData.displayName) {
                    skillName = parsedSkillName.substring(0, parsedSkillName.length - 1)
                } else if (oldSkillSubSkillName === undefined) {
                    console.error("Unable to identify skill. Old skill name: " + oldSkillName)
                    skillsUpdated++
                    return
                } else {
                    const parsedSubSkillName = oldSkillSubSkillName.trim()
                        .replace("'", "")
                        .replace("`", "")
                        .replace("-", "_")
                        .replace("/", "_")
                        .toLowerCase()

                    const skillWithSubSkill = parsedSkillName + "_" + parsedSubSkillName

                    if (skillWithSubSkill in skillData.displayName) {
                        skillName = skillWithSubSkill
                        displaySubSkill = false
                    } else {
                        console.error("Unable to identify skill. Old skill name and notes: " + oldSkillName + " " + oldSkillSubSkillName)
                        skillsUpdated++
                        return
                    }
                }

                newSkillValues[newSkillDataNames.skill] = skillName
                if (displaySubSkill && oldSkillSubSkillName !== undefined) {
                    newSkillValues[newSkillDataNames.subSkill] = oldSkillSubSkillName
                }
                newSkillValues[newSkillDataNames.xp] = oldSkillValues[oldSkillDataNames.xp]

                setAttrs(newSkillValues, {}, () => {
                    skillsUpdated++

                    if (skillsUpdated === ids.length) {
                        setAttrs({
                            btatow_sheet_version: 3,
                        }, {}, () => {
                            console.log("Sheet migrated from version 2 to version 3.")
                            recalculateSkills()
                        })
                    }
                })
            })
        })
    })
}