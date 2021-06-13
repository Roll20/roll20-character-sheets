/// <reference path="./utility.ts"/>
/// <reference path="./roll20.d.ts"/>
/// <reference path="./roll20layer1.ts"/>
/// <reference path="./roll20layer2.ts"/>

import Maybe = Utility.Maybe;
import act = Roll20Layer2.act;
import attribute = Roll20Layer2.attribute;
import just = Utility.just;
import nothing = Utility.nothing;
import repeatingAttribute = Roll20Layer2.repeatingAttribute;
import serializerDeserializer = Utility.serializerDeserializer;
import Sheet = Roll20Layer2.Sheet;
import onOpen = Roll20Layer1.onOpen;
import sheet = Roll20Layer2.sheet;
import assign = Utility.assign;
import repeatingAttributeString = Roll20Layer2.repeatingAttributeString;
import attributeString = Roll20Layer2.attributeString;
import attributeInteger = Roll20Layer2.attributeInteger;
import attributeBoolean = Roll20Layer2.attributeBoolean;
import repeatingAttributeInteger = Roll20Layer2.repeatingAttributeInteger;

enum DamageType {
    Brawling = "damageTypeBrawling",
    Melee = "damageTypeMelee",
    Ranged = "damageTypeRanged",
}

function damageTypeMatch<T1>(
    damageType: DamageType,
    fDamageTypeBrawling: (damageType: DamageType) => T1,
    fDamageTypeMelee: (damageType: DamageType) => T1,
    fDamageTypeRanged: (damageType: DamageType) => T1
): T1 {
    return damageType === DamageType.Brawling ? fDamageTypeBrawling(damageType) :
        damageType === DamageType.Melee ? fDamageTypeMelee(damageType) :
            fDamageTypeRanged(damageType)
}

const serializerDeserializerDamageType = serializerDeserializer<string, DamageType>(
    (damageType: DamageType) => just(damageType.toString()),
    (string: string) => string === DamageType.Brawling ? just(DamageType.Brawling) :
        string === DamageType.Melee ? just(DamageType.Melee) :
            string === DamageType.Ranged ? just(DamageType.Ranged) :
                nothing())

enum DamageLocation {
    Head = "damageLocationHead",
    Body = "damageLocationBody"
}

function damageLocationMatch<T1>(
    damageLocation: DamageLocation,
    fDamageLocationHead: (damageLocation: DamageLocation) => T1,
    fDamageLocationBody: (damageLocation: DamageLocation) => T1
): T1 {
    return damageLocation === DamageLocation.Head ? fDamageLocationHead(damageLocation) :
        fDamageLocationBody(damageLocation)
}

const serializerDeserializerDamageLocation = serializerDeserializer<string, DamageLocation>(
    (damageLocation: DamageLocation) => just(damageLocation.toString()),
    (string: string) => string === DamageLocation.Head ? just(DamageLocation.Head) :
        string === DamageLocation.Body ? just(DamageLocation.Body) :
            nothing())

enum CyberwareTarget {
    StatisticIntelligenceSum = "statisticIntelligenceSum",
    StatisticReflexesSum = "statisticReflexesSum",
    StatisticDexteritySum = "statisticDexteritySum",
    StatisticTechniqueSum = "statisticTechniqueSum",
    StatisticCoolSum = "statisticCoolSum",
    StatisticWillSum = "statisticWillSum",
    StatisticLuckSum = "statisticLuckSum",
    StatisticMoveSum = "statisticMoveSum",
    StatisticBodySum = "statisticBodySum",
    StatisticEmpathySum = "statisticEmpathySum",
    SkillAthleticsSum = "skillAthleticsSum",
    SkillBasicTechSum = "skillBasicTechSum",
    SkillBrawlingSum = "skillBrawlingSum",
    SkillBriberySum = "skillBriberySum",
    SkillConcentrationSum = "skillConcentrationSum",
    SkillConversationSum = "skillConversationSum",
    SkillCyberTechSum = "skillCyberTechSum",
    SkillDrivingSum = "skillDrivingSum",
    SkillEducationSum = "skillEducationSum",
    SkillEvasionSum = "skillEvasionSum",
    SkillFirstAidSum = "skillFirstAidSum",
    SkillHumanPerceptionSum = "skillHumanPerceptionSum",
    SkillInterrogationSum = "skillInterrogationSum",
    SkillLocalExpertSum = "skillLocalExpertSum",
    SkillMarksmanshipSum = "skillMarksmanshipSum",
    SkillMeleeWeaponSum = "skillMeleeWeaponSum",
    SkillPerceptionSum = "skillPerceptionSum",
    SkillPersuasionSum = "skillPersuasionSum",
    SkillPlayInstrumentSum = "skillPlayInstrumentSum",
    SkillStealthSum = "skillStealthSum",
    SkillTrackingSum = "skillTrackingSum",
    AttackInitiativeSum = "attackInitiativeSum",
    AttackReputationSum = "attackReputationSum"
}

function cyberwareTargetMatch<T1>(
    cyberwareTarget: CyberwareTarget,
    fCyberwareTargetStatisticIntelligenceSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetStatisticReflexesSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetStatisticDexteritySum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetStatisticTechniqueSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetStatisticCoolSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetStatisticWillSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetStatisticLuckSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetStatisticMoveSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetStatisticBodySum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetStatisticEmpathySum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillAthleticsSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillBasicTechSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillBrawlingSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillBriberySum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillConcentrationSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillConversationSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillCyberTechSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillDrivingSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillEducationSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillEvasionSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillFirstAidSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillHumanPerceptionSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillInterrogationSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillLocalExpertSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillMarksmanshipSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillMeleeWeaponSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillPerceptionSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillPersuasionSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillPlayInstrumentSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillStealthSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetSkillTrackingSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetAttackInitiativeSum: (cyberwareTarget: CyberwareTarget) => T1,
    fCyberwareTargetAttackReputationSum: (cyberwareTarget: CyberwareTarget) => T1
): T1 {
    return cyberwareTarget === CyberwareTarget.StatisticIntelligenceSum ? fCyberwareTargetStatisticIntelligenceSum(cyberwareTarget) :
        cyberwareTarget === CyberwareTarget.StatisticReflexesSum ? fCyberwareTargetStatisticReflexesSum(cyberwareTarget) :
            cyberwareTarget === CyberwareTarget.StatisticDexteritySum ? fCyberwareTargetStatisticDexteritySum(cyberwareTarget) :
                cyberwareTarget === CyberwareTarget.StatisticTechniqueSum ? fCyberwareTargetStatisticTechniqueSum(cyberwareTarget) :
                    cyberwareTarget === CyberwareTarget.StatisticCoolSum ? fCyberwareTargetStatisticCoolSum(cyberwareTarget) :
                        cyberwareTarget === CyberwareTarget.StatisticWillSum ? fCyberwareTargetStatisticWillSum(cyberwareTarget) :
                            cyberwareTarget === CyberwareTarget.StatisticLuckSum ? fCyberwareTargetStatisticLuckSum(cyberwareTarget) :
                                cyberwareTarget === CyberwareTarget.StatisticMoveSum ? fCyberwareTargetStatisticMoveSum(cyberwareTarget) :
                                    cyberwareTarget === CyberwareTarget.StatisticBodySum ? fCyberwareTargetStatisticBodySum(cyberwareTarget) :
                                        cyberwareTarget === CyberwareTarget.StatisticEmpathySum ? fCyberwareTargetStatisticEmpathySum(cyberwareTarget) :
                                            cyberwareTarget === CyberwareTarget.SkillAthleticsSum ? fCyberwareTargetSkillAthleticsSum(cyberwareTarget) :
                                                cyberwareTarget === CyberwareTarget.SkillBasicTechSum ? fCyberwareTargetSkillBasicTechSum(cyberwareTarget) :
                                                    cyberwareTarget === CyberwareTarget.SkillBrawlingSum ? fCyberwareTargetSkillBrawlingSum(cyberwareTarget) :
                                                        cyberwareTarget === CyberwareTarget.SkillBriberySum ? fCyberwareTargetSkillBriberySum(cyberwareTarget) :
                                                            cyberwareTarget === CyberwareTarget.SkillConcentrationSum ? fCyberwareTargetSkillConcentrationSum(cyberwareTarget) :
                                                                cyberwareTarget === CyberwareTarget.SkillConversationSum ? fCyberwareTargetSkillConversationSum(cyberwareTarget) :
                                                                    cyberwareTarget === CyberwareTarget.SkillCyberTechSum ? fCyberwareTargetSkillCyberTechSum(cyberwareTarget) :
                                                                        cyberwareTarget === CyberwareTarget.SkillDrivingSum ? fCyberwareTargetSkillDrivingSum(cyberwareTarget) :
                                                                            cyberwareTarget === CyberwareTarget.SkillEducationSum ? fCyberwareTargetSkillEducationSum(cyberwareTarget) :
                                                                                cyberwareTarget === CyberwareTarget.SkillEvasionSum ? fCyberwareTargetSkillEvasionSum(cyberwareTarget) :
                                                                                    cyberwareTarget === CyberwareTarget.SkillFirstAidSum ? fCyberwareTargetSkillFirstAidSum(cyberwareTarget) :
                                                                                        cyberwareTarget === CyberwareTarget.SkillHumanPerceptionSum ? fCyberwareTargetSkillHumanPerceptionSum(cyberwareTarget) :
                                                                                            cyberwareTarget === CyberwareTarget.SkillInterrogationSum ? fCyberwareTargetSkillInterrogationSum(cyberwareTarget) :
                                                                                                cyberwareTarget === CyberwareTarget.SkillLocalExpertSum ? fCyberwareTargetSkillLocalExpertSum(cyberwareTarget) :
                                                                                                    cyberwareTarget === CyberwareTarget.SkillMarksmanshipSum ? fCyberwareTargetSkillMarksmanshipSum(cyberwareTarget) :
                                                                                                        cyberwareTarget === CyberwareTarget.SkillMeleeWeaponSum ? fCyberwareTargetSkillMeleeWeaponSum(cyberwareTarget) :
                                                                                                            cyberwareTarget === CyberwareTarget.SkillPerceptionSum ? fCyberwareTargetSkillPerceptionSum(cyberwareTarget) :
                                                                                                                cyberwareTarget === CyberwareTarget.SkillPersuasionSum ? fCyberwareTargetSkillPersuasionSum(cyberwareTarget) :
                                                                                                                    cyberwareTarget === CyberwareTarget.SkillPlayInstrumentSum ? fCyberwareTargetSkillPlayInstrumentSum(cyberwareTarget) :
                                                                                                                        cyberwareTarget === CyberwareTarget.SkillStealthSum ? fCyberwareTargetSkillStealthSum(cyberwareTarget) :
                                                                                                                            cyberwareTarget === CyberwareTarget.SkillTrackingSum ? fCyberwareTargetSkillTrackingSum(cyberwareTarget) :
                                                                                                                                cyberwareTarget === CyberwareTarget.AttackInitiativeSum ? fCyberwareTargetAttackInitiativeSum(cyberwareTarget) :
                                                                                                                                    fCyberwareTargetAttackReputationSum(cyberwareTarget)
}

const serializerDeserializerCyberwareTarget = serializerDeserializer<string, CyberwareTarget>(
    (cyberwareTarget: CyberwareTarget) => just(cyberwareTarget.toString()),
    (string: string) =>
        string === CyberwareTarget.StatisticIntelligenceSum ? just(CyberwareTarget.StatisticIntelligenceSum) :
            string === CyberwareTarget.StatisticReflexesSum ? just(CyberwareTarget.StatisticReflexesSum) :
                string === CyberwareTarget.StatisticDexteritySum ? just(CyberwareTarget.StatisticDexteritySum) :
                    string === CyberwareTarget.StatisticTechniqueSum ? just(CyberwareTarget.StatisticTechniqueSum) :
                        string === CyberwareTarget.StatisticCoolSum ? just(CyberwareTarget.StatisticCoolSum) :
                            string === CyberwareTarget.StatisticWillSum ? just(CyberwareTarget.StatisticWillSum) :
                                string === CyberwareTarget.StatisticLuckSum ? just(CyberwareTarget.StatisticLuckSum) :
                                    string === CyberwareTarget.StatisticMoveSum ? just(CyberwareTarget.StatisticMoveSum) :
                                        string === CyberwareTarget.StatisticBodySum ? just(CyberwareTarget.StatisticBodySum) :
                                            string === CyberwareTarget.StatisticEmpathySum ? just(CyberwareTarget.StatisticEmpathySum) :
                                                string === CyberwareTarget.SkillAthleticsSum ? just(CyberwareTarget.SkillAthleticsSum) :
                                                    string === CyberwareTarget.SkillBasicTechSum ? just(CyberwareTarget.SkillBasicTechSum) :
                                                        string === CyberwareTarget.SkillBrawlingSum ? just(CyberwareTarget.SkillBrawlingSum) :
                                                            string === CyberwareTarget.SkillBriberySum ? just(CyberwareTarget.SkillBriberySum) :
                                                                string === CyberwareTarget.SkillConcentrationSum ? just(CyberwareTarget.SkillConcentrationSum) :
                                                                    string === CyberwareTarget.SkillConversationSum ? just(CyberwareTarget.SkillConversationSum) :
                                                                        string === CyberwareTarget.SkillCyberTechSum ? just(CyberwareTarget.SkillCyberTechSum) :
                                                                            string === CyberwareTarget.SkillDrivingSum ? just(CyberwareTarget.SkillDrivingSum) :
                                                                                string === CyberwareTarget.SkillEducationSum ? just(CyberwareTarget.SkillEducationSum) :
                                                                                    string === CyberwareTarget.SkillEvasionSum ? just(CyberwareTarget.SkillEvasionSum) :
                                                                                        string === CyberwareTarget.SkillFirstAidSum ? just(CyberwareTarget.SkillFirstAidSum) :
                                                                                            string === CyberwareTarget.SkillHumanPerceptionSum ? just(CyberwareTarget.SkillHumanPerceptionSum) :
                                                                                                string === CyberwareTarget.SkillInterrogationSum ? just(CyberwareTarget.SkillInterrogationSum) :
                                                                                                    string === CyberwareTarget.SkillLocalExpertSum ? just(CyberwareTarget.SkillLocalExpertSum) :
                                                                                                        string === CyberwareTarget.SkillMarksmanshipSum ? just(CyberwareTarget.SkillMarksmanshipSum) :
                                                                                                            string === CyberwareTarget.SkillMeleeWeaponSum ? just(CyberwareTarget.SkillMeleeWeaponSum) :
                                                                                                                string === CyberwareTarget.SkillPerceptionSum ? just(CyberwareTarget.SkillPerceptionSum) :
                                                                                                                    string === CyberwareTarget.SkillPersuasionSum ? just(CyberwareTarget.SkillPersuasionSum) :
                                                                                                                        string === CyberwareTarget.SkillPlayInstrumentSum ? just(CyberwareTarget.SkillPlayInstrumentSum) :
                                                                                                                            string === CyberwareTarget.SkillStealthSum ? just(CyberwareTarget.SkillStealthSum) :
                                                                                                                                string === CyberwareTarget.SkillTrackingSum ? just(CyberwareTarget.SkillTrackingSum) :
                                                                                                                                    string === CyberwareTarget.AttackInitiativeSum ? just(CyberwareTarget.AttackInitiativeSum) :
                                                                                                                                        string === CyberwareTarget.AttackReputationSum ? just(CyberwareTarget.AttackReputationSum) :
                                                                                                                                            nothing())

const character_name = attributeString("character_name")
const statisticIntelligenceSum = attributeInteger("statisticIntelligenceSum")
const statisticIntelligence = attributeInteger("statisticIntelligence")
const statisticReflexesSum = attributeInteger("statisticReflexesSum")
const statisticReflexes = attributeInteger("statisticReflexes")
const statisticDexteritySum = attributeInteger("statisticDexteritySum")
const statisticDexterity = attributeInteger("statisticDexterity")
const statisticTechniqueSum = attributeInteger("statisticTechniqueSum")
const statisticTechnique = attributeInteger("statisticTechnique")
const statisticCoolSum = attributeInteger("statisticCoolSum")
const statisticCool = attributeInteger("statisticCool")
const statisticWillSum = attributeInteger("statisticWillSum")
const statisticWill = attributeInteger("statisticWill")
const statisticLuckSum = attributeInteger("statisticLuckSum")
const statisticLuck = attributeInteger("statisticLuck")
const statisticMoveSum = attributeInteger("statisticMoveSum")
const statisticMove = attributeInteger("statisticMove")
const statisticBodySum = attributeInteger("statisticBodySum")
const statisticBody = attributeInteger("statisticBody")
const statisticEmpathySum = attributeInteger("statisticEmpathySum")
const statisticEmpathy = attributeInteger("statisticEmpathy")
const skillAthleticsSum = attributeInteger("skillAthleticsSum")
const skillAthletics = attributeInteger("skillAthletics")
const skillBasicTechSum = attributeInteger("skillBasicTechSum")
const skillBasicTech = attributeInteger("skillBasicTech")
const skillBrawlingSum = attributeInteger("skillBrawlingSum")
const skillBrawling = attributeInteger("skillBrawling")
const skillBriberySum = attributeInteger("skillBriberySum")
const skillBribery = attributeInteger("skillBribery")
const skillConcentrationSum = attributeInteger("skillConcentrationSum")
const skillConcentration = attributeInteger("skillConcentration")
const skillConversationSum = attributeInteger("skillConversationSum")
const skillConversation = attributeInteger("skillConversation")
const skillCyberTechSum = attributeInteger("skillCyberTechSum")
const skillCyberTech = attributeInteger("skillCyberTech")
const skillDrivingSum = attributeInteger("skillDrivingSum")
const skillDriving = attributeInteger("skillDriving")
const skillEducationSum = attributeInteger("skillEducationSum")
const skillEducation = attributeInteger("skillEducation")
const skillEvasionSum = attributeInteger("skillEvasionSum")
const skillEvasion = attributeInteger("skillEvasion")
const skillFirstAidSum = attributeInteger("skillFirstAidSum")
const skillFirstAid = attributeInteger("skillFirstAid")
const skillHumanPerceptionSum = attributeInteger("skillHumanPerceptionSum")
const skillHumanPerception = attributeInteger("skillHumanPerception")
const skillInterrogationSum = attributeInteger("skillInterrogationSum")
const skillInterrogation = attributeInteger("skillInterrogation")
const skillLocalExpertSum = attributeInteger("skillLocalExpertSum")
const skillLocalExpert = attributeInteger("skillLocalExpert")
const skillMarksmanshipSum = attributeInteger("skillMarksmanshipSum")
const skillMarksmanship = attributeInteger("skillMarksmanship")
const skillMeleeWeaponSum = attributeInteger("skillMeleeWeaponSum")
const skillMeleeWeapon = attributeInteger("skillMeleeWeapon")
const skillPerceptionSum = attributeInteger("skillPerceptionSum")
const skillPerception = attributeInteger("skillPerception")
const skillPersuasionSum = attributeInteger("skillPersuasionSum")
const skillPersuasion = attributeInteger("skillPersuasion")
const skillPlayInstrumentSum = attributeInteger("skillPlayInstrumentSum")
const skillPlayInstrument = attributeInteger("skillPlayInstrument")
const skillStealthSum = attributeInteger("skillStealthSum")
const skillStealth = attributeInteger("skillStealth")
const skillTrackingSum = attributeInteger("skillTrackingSum")
const skillTracking = attributeInteger("skillTracking")

const attackInitiativeSum = attributeInteger("attackInitiativeSum")
const attackReputation = attributeInteger("attackReputation")
const attackReputationSum = attributeInteger("attackReputationSum")
const attackGrapplingSum = attributeInteger("attackGrapplingSum")
const attackChokingSum = attributeInteger("attackChokingSum")
const attackThrowingSum = attributeInteger("attackThrowingSum")

const luck = attributeInteger("luck")
const luck_max = attributeInteger("luck_max")
const luckDecrement = act("luckDecrement")
const luckReset = act("luckReset")

const attackBrawlingDamage = attributeInteger("attackBrawlingDamage")

const attackMeleeDamage = repeatingAttributeInteger("attackMelee", "attackMeleeDamage")
const attackMeleeName = repeatingAttributeString("attackMelee", "attackMeleeName")

const attackRanged1Damage = repeatingAttributeInteger("attackRanged1", "attackRangedDamage")
const attackRanged1Name = repeatingAttributeString("attackRanged1", "attackRangedName")
const attackRanged11Difficulty012 = repeatingAttributeInteger("attackRanged1", "attackRangedDifficulty012")
const attackRanged11Difficulty025 = repeatingAttributeInteger("attackRanged1", "attackRangedDifficulty025")
const attackRanged11Difficulty050 = repeatingAttributeInteger("attackRanged1", "attackRangedDifficulty050")
const attackRanged11Difficulty100 = repeatingAttributeInteger("attackRanged1", "attackRangedDifficulty100")
const attackRanged11Difficulty200 = repeatingAttributeInteger("attackRanged1", "attackRangedDifficulty200")
const attackRanged11Difficulty400 = repeatingAttributeInteger("attackRanged1", "attackRangedDifficulty400")
const attackRanged11Difficulty800 = repeatingAttributeInteger("attackRanged1", "attackRangedDifficulty800")

const attackRanged3Damage = repeatingAttributeInteger("attackRanged3", "attackRangedDamage")
const attackRanged3Name = repeatingAttributeString("attackRanged3", "attackRangedName")
const attackRanged31Difficulty012 = repeatingAttributeInteger("attackRanged3", "attackRanged1Difficulty012")
const attackRanged31Difficulty025 = repeatingAttributeInteger("attackRanged3", "attackRanged1Difficulty025")
const attackRanged31Difficulty050 = repeatingAttributeInteger("attackRanged3", "attackRanged1Difficulty050")
const attackRanged31Difficulty100 = repeatingAttributeInteger("attackRanged3", "attackRanged1Difficulty100")
const attackRanged31Difficulty200 = repeatingAttributeInteger("attackRanged3", "attackRanged1Difficulty200")
const attackRanged31Difficulty400 = repeatingAttributeInteger("attackRanged3", "attackRanged1Difficulty400")
const attackRanged31Difficulty800 = repeatingAttributeInteger("attackRanged3", "attackRanged1Difficulty800")
const attackRanged33Difficulty012 = repeatingAttributeInteger("attackRanged3", "attackRanged3Difficulty012")
const attackRanged33Difficulty025 = repeatingAttributeInteger("attackRanged3", "attackRanged3Difficulty025")
const attackRanged33Difficulty050 = repeatingAttributeInteger("attackRanged3", "attackRanged3Difficulty050")
const attackRanged33Difficulty100 = repeatingAttributeInteger("attackRanged3", "attackRanged3Difficulty100")

const hit = attributeInteger("hit")
const hit_max = attributeInteger("hit_max")
const hitDecrement = act("hitDecrement")
const hitReset = act("hitReset")

const armorHeadStoppingPower = attributeInteger("armorHeadStoppingPower")
const armorHeadStoppingPower_max = attributeInteger("armorHeadStoppingPower_max")
const armorHeadName = attributeString("armorHeadName")
const armorHeadStoppingPowerDecrement = act("armorHeadStoppingPowerDecrement")
const armorHeadStoppingPowerReset = act("armorHeadStoppingPowerReset")

const armorBodyStoppingPower = attributeInteger("armorBodyStoppingPower")
const armorBodyStoppingPower_max = attributeInteger("armorBodyStoppingPower_max")
const armorBodyName = attributeString("armorBodyName")
const armorBodyStoppingPowerDecrement = act("armorBodyStoppingPowerDecrement")
const armorBodyStoppingPowerReset = act("armorBodyStoppingPowerReset")

const conditionGrappled = attributeBoolean("conditionGrappled")
const conditionProne = attributeBoolean("conditionProne")

const deathSave = attributeInteger("deathSave")
const deathSaveIncrement = act("deathSaveIncrement")
const deathSaveReset = act("deathSaveReset")

const damageType = attribute<DamageType>("damageType", serializerDeserializerDamageType)
const damageLocation = attribute<DamageLocation>("damageLocation", serializerDeserializerDamageLocation)

const damage1 = attributeInteger("damage1")
const damage2 = attributeInteger("damage2")
const damage3 = attributeInteger("damage3")
const damage = act("damage")

const cyberwareAllRoll = repeatingAttributeString("cyberwareAll", "rollCyberware")
const cyberwareAllRollWithDifficulty = repeatingAttributeString("cyberwareAll", "rollCyberwareWithDifficulty")
const cyberwareAllRollWithDifficultyFirstAid = repeatingAttributeString("cyberwareAll", "rollCyberwareWithDifficultyFirstAid")
const cyberwareAllRollInitiative = repeatingAttributeString("cyberwareAll", "rollCyberwareInitiative")
const cyberwareAllRollReputation = repeatingAttributeString("cyberwareAll", "rollCyberwareReputation")
const cyberwareAllSum = repeatingAttributeInteger("cyberwareAll", "cyberwareSum")
const cyberwareAll = repeatingAttributeInteger("cyberwareAll", "cyberware")
const cyberwareAllTarget = repeatingAttribute<CyberwareTarget>("cyberwareAll", "cyberwareTarget", serializerDeserializerCyberwareTarget)
const cyberwareAllTargetName = repeatingAttributeString("cyberwareAll", "cyberwareTargetName")
const cyberwareAllName = repeatingAttributeInteger("cyberwareAll", "cyberwareName")

const cyberwareSomeRoll = repeatingAttributeString("cyberwareSome", "rollCyberware")
const cyberwareSomeRollWithDifficulty = repeatingAttributeString("cyberwareSome", "rollCyberwareWithDifficulty")
const cyberwareSomeRollWithDifficultyFirstAid = repeatingAttributeString("cyberwareSome", "rollCyberwareWithDifficultyFirstAid")
const cyberwareSomeRollInitiative = repeatingAttributeString("cyberwareSome", "rollCyberwareInitiative")
const cyberwareSomeRollReputation = repeatingAttributeString("cyberwareSome", "rollCyberwareReputation")
const cyberwareSomeSum = repeatingAttributeInteger("cyberwareSome", "cyberwareSum")
const cyberwareSome = repeatingAttributeInteger("cyberwareSome", "cyberware")
const cyberwareSomeTarget = repeatingAttribute<CyberwareTarget>("cyberwareSome", "cyberwareTarget", serializerDeserializerCyberwareTarget)
const cyberwareSomeName = repeatingAttributeInteger("cyberwareSome", "cyberwareName")

const sheetChangeInput = statisticBody
    .plus(statisticCool)
    .plus(statisticDexterity)
    .plus(statisticEmpathy)
    .plus(statisticIntelligence)
    .plus(statisticLuck)
    .plus(statisticMove)
    .plus(statisticReflexes)
    .plus(statisticTechnique)
    .plus(statisticWill)
    .plus(skillAthletics)
    .plus(skillBasicTech)
    .plus(skillBrawling)
    .plus(skillBribery)
    .plus(skillConcentration)
    .plus(skillConversation)
    .plus(skillCyberTech)
    .plus(skillDriving)
    .plus(skillEducation)
    .plus(skillEvasion)
    .plus(skillFirstAid)
    .plus(skillHumanPerception)
    .plus(skillInterrogation)
    .plus(skillLocalExpert)
    .plus(skillMarksmanship)
    .plus(skillMeleeWeapon)
    .plus(skillPerception)
    .plus(skillPersuasion)
    .plus(skillPlayInstrument)
    .plus(skillStealth)
    .plus(skillTracking)
    .plus(attackReputation)
    .plus(hit)
    .plus(conditionGrappled)
    .plus(cyberwareAllRollWithDifficulty)
    .plus(cyberwareAllRollWithDifficultyFirstAid)
    .plus(cyberwareAllRollInitiative)
    .plus(cyberwareAllRollReputation)
    .plus(cyberwareAll)
    .plus(cyberwareAllTarget)
    .plus(cyberwareSomeRollWithDifficulty)
    .plus(cyberwareSomeRollWithDifficultyFirstAid)
    .plus(cyberwareSomeRollInitiative)
    .plus(cyberwareSomeRollReputation)
    .plus(cyberwareSome)
    .plus(cyberwareSomeTarget)

const sheetReadInput = hit_max
    .plus(luck)
    .plus(luck_max)

const sheetDamage = damageLocation
    .plus(damageType)
    .plus(hit)
    .plus(armorBodyStoppingPower)
    .plus(armorHeadStoppingPower)
    .plus(damage1)
    .plus(damage2)
    .plus(damage3)

hitReset.onClick(event =>
    hit_max.readMaybe((sourceValue, valueMaybe) =>
        valueMaybe.map(value => hit.write(value))))

hitDecrement.onClick(event =>
    hit.readMaybe((sourceValue, valueMaybe) =>
        valueMaybe.map(value => hit.write(value > 0 ? value - 1 : 0))))

luckReset.onClick(event =>
    luck_max.readMaybe((sourceValue, valueMaybe) =>
        valueMaybe.map(value => luck.write(value))))

luckDecrement.onClick(event =>
    luck.readMaybe((sourceValue, valueMaybe) =>
        valueMaybe.map(value => luck.write(value > 0 ? value - 1 : 0))))

armorHeadStoppingPowerReset.onClick(event =>
    armorHeadStoppingPower_max.readMaybe((sourceValue, valueMaybe) =>
        valueMaybe.map(value => armorHeadStoppingPower.write(value))))

armorHeadStoppingPowerDecrement.onClick(event =>
    armorHeadStoppingPower.readMaybe((sourceValue, valueMaybe) =>
        valueMaybe.map(value => armorHeadStoppingPower.write(value > 0 ? value - 1 : 0))))

armorBodyStoppingPowerReset.onClick(event =>
    armorBodyStoppingPower_max.readMaybe((sourceValue, valueMaybe) =>
        valueMaybe.map(value => armorBodyStoppingPower.write(value))))

armorBodyStoppingPowerDecrement.onClick(event =>
    armorBodyStoppingPower.readMaybe((sourceValue, valueMaybe) =>
        valueMaybe.map(value => armorBodyStoppingPower.write(value > 0 ? value - 1 : 0))))

deathSaveIncrement.onClick(event =>
    deathSave.readMaybe((sourceValue, valueMaybe) =>
        valueMaybe.map(value => deathSave.write(value + 1))))

deathSaveReset.onClick(event =>
    deathSave.write(0))

onOpen(() =>
    sheetChangeInput.readMaybe((sourceValueReadonly, valueReadonly) =>
        sheetReadInput.readMaybe((sourceValue, value) =>
            onUpdate(new Sheet(just(sourceValueReadonly), valueReadonly, just(sourceValue), value)))));

sheetChangeInput.onChangeMaybe(event =>
    sheetReadInput.readMaybe((sourceValue, value) =>
        onUpdate(new Sheet(just(event.source), event.valueNew, just(sourceValue), value))))

damage.onClick(event => sheetDamage.readMaybe((sourceValue, valueMaybe) => onCalculate(sheet(sourceValue, valueMaybe))))

function onUpdate(sheet: Sheet<Record<string, string | Record<string, Record<string, string>>>, Record<string, string | Record<string, Record<string, string>>>>): void {

    // seriously wounded, -3 to checks
    // mortally wounded, -5 to checks

    const modWounded: number = sheet.get(hit)
        .bind(hit => sheet.get(hit_max)
            .map(hitMax => hit < Math.ceil(hitMax / 2) ?
                hit === 0 ?
                    -5 :
                    -3 :
                0))
        .orValue(0)

    // grappled, -3 to checks

    const modConditionGrab: number = sheet.get(conditionGrappled).map(conditionGrappled => conditionGrappled ? -3 : 0).orValue(0)

    function modCyberware(cyberwareTarget: CyberwareTarget): number {
        return sheet.get(cyberwareAllTarget).map(cyberwareAllTargetInner =>
            Object.keys(cyberwareAllTargetInner)
                .filter(repeatingId => cyberwareAllTargetInner[repeatingId] === cyberwareTarget)
                .reduce((cyberwareSum, repeatingId) => cyberwareSum + sheet.get(cyberwareAll)
                        .map(cyberwareAllInner => cyberwareAllInner[repeatingId])
                        .orValue(0),
                    0))
            .orValue(0)
    }

    function cyberwareSumFor(sheet: Sheet<Record<string, string | Record<string, Record<string, string>>>, Record<string, string | Record<string, Record<string, string>>> | number>, cyberwareTarget: CyberwareTarget): Utility.Maybe<number> {
        return cyberwareTargetMatch(cyberwareTarget,
            ignore => sheet.get(statisticIntelligenceSum),
            ignore => sheet.get(statisticReflexesSum),
            ignore => sheet.get(statisticDexteritySum),
            ignore => sheet.get(statisticTechniqueSum),
            ignore => sheet.get(statisticCoolSum),
            ignore => sheet.get(statisticWillSum),
            ignore => sheet.get(statisticLuckSum),
            ignore => sheet.get(statisticMoveSum),
            ignore => sheet.get(statisticBodySum),
            ignore => sheet.get(statisticEmpathySum),
            ignore => sheet.get(skillAthleticsSum),
            ignore => sheet.get(skillBasicTechSum),
            ignore => sheet.get(skillBrawlingSum),
            ignore => sheet.get(skillBriberySum),
            ignore => sheet.get(skillConcentrationSum),
            ignore => sheet.get(skillConversationSum),
            ignore => sheet.get(skillCyberTechSum),
            ignore => sheet.get(skillDrivingSum),
            ignore => sheet.get(skillEducationSum),
            ignore => sheet.get(skillEvasionSum),
            ignore => sheet.get(skillFirstAidSum),
            ignore => sheet.get(skillHumanPerceptionSum),
            ignore => sheet.get(skillInterrogationSum),
            ignore => sheet.get(skillLocalExpertSum),
            ignore => sheet.get(skillMarksmanshipSum),
            ignore => sheet.get(skillMeleeWeaponSum),
            ignore => sheet.get(skillPerceptionSum),
            ignore => sheet.get(skillPersuasionSum),
            ignore => sheet.get(skillPlayInstrumentSum),
            ignore => sheet.get(skillStealthSum),
            ignore => sheet.get(skillTrackingSum),
            ignore => sheet.get(attackInitiativeSum),
            ignore => sheet.get(attackReputationSum))
    }

    function cyberwareAllTargetNameFor(cyberwareTarget: CyberwareTarget): Maybe<string> {
        return cyberwareTargetMatch(cyberwareTarget,
            ignore => just("Intelligence"),
            ignore => just("Reflexes"),
            ignore => just("Dexterity"),
            ignore => just("Technique"),
            ignore => just("Cool"),
            ignore => just("Will"),
            ignore => just("Luck"),
            ignore => just("Move"),
            ignore => just("Body"),
            ignore => just("Empathy"),
            ignore => just("Athletics"),
            ignore => just("Basic Tech"),
            ignore => just("Brawling"),
            ignore => just("Bribery"),
            ignore => just("Concentration"),
            ignore => just("Conversation"),
            ignore => just("Cyber Tech"),
            ignore => just("Driving"),
            ignore => just("Education"),
            ignore => just("Evasion"),
            ignore => just("First Aid"),
            ignore => just("Human Perception"),
            ignore => just("Interrogation"),
            ignore => just("Local Expert"),
            ignore => just("Marksmanship"),
            ignore => just("Melee Weapon"),
            ignore => just("Perception"),
            ignore => just("Persuasion"),
            ignore => just("Play Instrument"),
            ignore => just("Stealth"),
            ignore => just("Tracking"),
            ignore => just("Initiative"),
            ignore => just("Reputation"))
    }

    function cyberwareRollFor(
        cyberwareTarget: CyberwareTarget,
        cyberwareRollWithDifficulty: Maybe<string>,
        cyberwareRollWithDifficultyFirstAid: Maybe<string>,
        cyberwareRollInitiative: Maybe<string>,
        cyberwareRollReputation: Maybe<string>): Maybe<string> {

        return cyberwareTargetMatch(cyberwareTarget,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficultyFirstAid,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollWithDifficulty,
            ignore => cyberwareRollInitiative,
            ignore => cyberwareRollReputation)
    }

    sheet.set(statisticIntelligenceSum, sheet.get(statisticIntelligence).map(value => value + modWounded + modConditionGrab + modCyberware(CyberwareTarget.StatisticIntelligenceSum)))
        // @formatter:off
        .bind(sheet => sheet.set(statisticReflexesSum,     sheet.get(statisticReflexes)    .map(value => value + modWounded + modConditionGrab + modCyberware(CyberwareTarget.StatisticReflexesSum))))
        .bind(sheet => sheet.set(statisticDexteritySum,    sheet.get(statisticDexterity)   .map(value => value + modWounded + modConditionGrab + modCyberware(CyberwareTarget.StatisticDexteritySum))))
        .bind(sheet => sheet.set(statisticTechniqueSum,    sheet.get(statisticTechnique)   .map(value => value + modWounded + modConditionGrab + modCyberware(CyberwareTarget.StatisticTechniqueSum))))
        .bind(sheet => sheet.set(statisticCoolSum,         sheet.get(statisticCool)        .map(value => value + modWounded + modConditionGrab + modCyberware(CyberwareTarget.StatisticCoolSum))))
        .bind(sheet => sheet.set(statisticWillSum,         sheet.get(statisticWill)        .map(value => value + modWounded + modConditionGrab + modCyberware(CyberwareTarget.StatisticWillSum))))
        .bind(sheet => sheet.set(statisticLuckSum,         sheet.get(statisticLuck)        .map(value => value + modWounded + modConditionGrab + modCyberware(CyberwareTarget.StatisticLuckSum))))
        .bind(sheet => sheet.set(statisticMoveSum,         sheet.get(statisticMove)        .map(value => value + modWounded + modConditionGrab + modCyberware(CyberwareTarget.StatisticMoveSum))))
        .bind(sheet => sheet.set(statisticBodySum,         sheet.get(statisticBody)        .map(value => value + modWounded + modConditionGrab + modCyberware(CyberwareTarget.StatisticBodySum))))
        .bind(sheet => sheet.set(statisticEmpathySum,      sheet.get(statisticEmpathy)     .map(value => value + modWounded + modConditionGrab + modCyberware(CyberwareTarget.StatisticEmpathySum))))

        .bind(sheet => sheet.set(skillAthleticsSum,        sheet.get(statisticDexterity)   .map(statistic => statistic + sheet.get(skillAthletics)      .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillAthleticsSum))))
        .bind(sheet => sheet.set(skillBasicTechSum,        sheet.get(statisticTechnique)   .map(statistic => statistic + sheet.get(skillBasicTech)      .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillBasicTechSum))))
        .bind(sheet => sheet.set(skillBrawlingSum,         sheet.get(statisticDexterity)   .map(statistic => statistic + sheet.get(skillBrawling)       .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillBrawlingSum))))
        .bind(sheet => sheet.set(skillBriberySum,          sheet.get(statisticCool)        .map(statistic => statistic + sheet.get(skillBribery)        .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillBriberySum))))
        .bind(sheet => sheet.set(skillConcentrationSum,    sheet.get(statisticWill)        .map(statistic => statistic + sheet.get(skillConcentration)  .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillConcentrationSum))))
        .bind(sheet => sheet.set(skillConversationSum,     sheet.get(statisticCool)        .map(statistic => statistic + sheet.get(skillConversation)   .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillConversationSum))))
        .bind(sheet => sheet.set(skillCyberTechSum,        sheet.get(statisticTechnique)   .map(statistic => statistic + sheet.get(skillCyberTech)      .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillCyberTechSum))))
        .bind(sheet => sheet.set(skillDrivingSum,          sheet.get(statisticReflexes)    .map(statistic => statistic + sheet.get(skillDriving)        .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillDrivingSum))))
        .bind(sheet => sheet.set(skillEducationSum,        sheet.get(statisticIntelligence).map(statistic => statistic + sheet.get(skillEducation)      .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillEducationSum))))
        .bind(sheet => sheet.set(skillEvasionSum,          sheet.get(statisticReflexes)    .map(statistic => statistic + sheet.get(skillEvasion)        .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillEvasionSum))))
        .bind(sheet => sheet.set(skillFirstAidSum,         sheet.get(statisticTechnique)   .map(statistic => statistic + sheet.get(skillFirstAid)       .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillFirstAidSum))))
        .bind(sheet => sheet.set(skillHumanPerceptionSum,  sheet.get(statisticEmpathy)     .map(statistic => statistic + sheet.get(skillHumanPerception).orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillHumanPerceptionSum))))
        .bind(sheet => sheet.set(skillInterrogationSum,    sheet.get(statisticCool)        .map(statistic => statistic + sheet.get(skillInterrogation)  .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillInterrogationSum))))
        .bind(sheet => sheet.set(skillLocalExpertSum,      sheet.get(statisticIntelligence).map(statistic => statistic + sheet.get(skillLocalExpert)    .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillLocalExpertSum))))
        .bind(sheet => sheet.set(skillMarksmanshipSum,     sheet.get(statisticReflexes)    .map(statistic => statistic + sheet.get(skillMarksmanship)   .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillMarksmanshipSum))))
        .bind(sheet => sheet.set(skillMeleeWeaponSum,      sheet.get(statisticDexterity)   .map(statistic => statistic + sheet.get(skillMeleeWeapon)    .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillMeleeWeaponSum))))
        .bind(sheet => sheet.set(skillPerceptionSum,       sheet.get(statisticIntelligence).map(statistic => statistic + sheet.get(skillPerception)     .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillPerceptionSum))))
        .bind(sheet => sheet.set(skillPersuasionSum,       sheet.get(statisticCool)        .map(statistic => statistic + sheet.get(skillPersuasion)     .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillPersuasionSum))))
        .bind(sheet => sheet.set(skillPlayInstrumentSum,   sheet.get(statisticEmpathy)     .map(statistic => statistic + sheet.get(skillPlayInstrument) .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillPlayInstrumentSum))))
        .bind(sheet => sheet.set(skillStealthSum,          sheet.get(statisticDexterity)   .map(statistic => statistic + sheet.get(skillStealth)        .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillStealthSum))))
        .bind(sheet => sheet.set(skillTrackingSum,         sheet.get(statisticIntelligence).map(statistic => statistic + sheet.get(skillTracking)       .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.SkillTrackingSum))))
        .bind(sheet => sheet.set(attackReputationSum,      sheet.get(statisticCool)        .map(statistic => statistic + sheet.get(attackReputation)    .orValue(0) + modWounded + modConditionGrab + modCyberware(CyberwareTarget.AttackReputationSum))))

        .bind(sheet => sheet.set(attackInitiativeSum,      sheet.get(statisticReflexes).map(statistic => statistic + modCyberware(CyberwareTarget.AttackInitiativeSum))))
        .bind(sheet => sheet.set(attackChokingSum,         sheet.get(statisticBody)))
        .bind(sheet => sheet.set(attackThrowingSum,        sheet.get(statisticBody)))
        .bind(sheet => sheet.set(attackBrawlingDamage,     sheet.get(statisticBody).map(statistic => statistic > 2 ? Math.floor((statistic - 1) / 2) : 0)))
        .bind(sheet => sheet.set(attackGrapplingSum,       sheet.get(skillAthleticsSum)
            .map(skillAthleticsSum =>
                sheet.get(skillBrawlingSum)
                    .map(skillBrawlingSum => Math.max(skillAthleticsSum, skillBrawlingSum) + modWounded + modConditionGrab)
                    .orValue(skillAthleticsSum + modWounded + modConditionGrab))
            .orMaybe(sheet.get(skillBrawlingSum)
                .map(skillBrawlingSum => skillBrawlingSum + modWounded + modConditionGrab))))

        .bind(sheet => sheet.set(hit_max,                  sheet.get(statisticBody).map(statistic => (statistic + modCyberware(CyberwareTarget.StatisticBodySum)) * 5)))
        .bind(sheet => sheet.set(luck_max,                 sheet.get(statisticLuck).map(statistic => (statistic + modCyberware(CyberwareTarget.StatisticLuckSum)))))
        // @formatter:on
        .bind(sheet => sheet.set(cyberwareAllSum, sheet.get(cyberwareAllTarget)
            .map(cyberwareAllTargetInner => Object.keys(cyberwareAllTargetInner)
                .reduce((record, repeatingId) => cyberwareSumFor(sheet, cyberwareAllTargetInner[repeatingId])
                        .map(value => assign(record, repeatingId, value))
                        .orValue(record),
                    {}))))

        .bind(sheet => sheet.set(cyberwareAllTargetName, sheet.get(cyberwareAllTarget)
            .map(cyberwareAllTargetInner => Object.keys(cyberwareAllTargetInner)
                .reduce((record, repeatingId) => cyberwareAllTargetNameFor(cyberwareAllTargetInner[repeatingId])
                        .map(value => assign(record, repeatingId, value))
                        .orValue(record),
                    {}))))

        .bind(sheet => sheet.set(cyberwareAllRoll, sheet.get(cyberwareAllTarget)
            .map(cyberwareAllTargetInner => Object.keys(cyberwareAllTargetInner)
                .reduce((record, repeatingId) => cyberwareRollFor(
                    cyberwareAllTargetInner[repeatingId],
                    sheet.get(cyberwareAllRollWithDifficulty).map(value => value[repeatingId]),
                    sheet.get(cyberwareAllRollWithDifficultyFirstAid).map(value => value[repeatingId]),
                    sheet.get(cyberwareAllRollInitiative).map(value => value[repeatingId]),
                    sheet.get(cyberwareAllRollReputation).map(value => value[repeatingId]))
                        .map(value => assign(record, repeatingId, value))
                        .orValue(record),
                    {}))))

        .bind(sheet => sheet.set(cyberwareSomeSum, sheet.get(cyberwareSomeTarget)
            .bind(cyberwareSomeTargetInner => sheet.get(cyberwareSome)
                .map(cyberwareSomeInner => Object.keys(cyberwareSomeTargetInner).filter(repeatingId => Object.keys(cyberwareSomeInner).includes(repeatingId))
                    .reduce((record, repeatingId) => cyberwareSumFor(sheet, cyberwareSomeTargetInner[repeatingId])
                            .map(value => assign(record, repeatingId, cyberwareSomeInner[repeatingId] + value))
                            .orValue(record),
                        {})))))

        .bind(sheet => sheet.set(cyberwareSomeRoll, sheet.get(cyberwareSomeTarget)
            .map(cyberwareSomeTarget => Object.keys(cyberwareSomeTarget)
                .reduce((record, repeatingId) => cyberwareRollFor(
                    cyberwareSomeTarget[repeatingId],
                    sheet.get(cyberwareSomeRollWithDifficulty).map(value => value[repeatingId]),
                    sheet.get(cyberwareSomeRollWithDifficultyFirstAid).map(value => value[repeatingId]),
                    sheet.get(cyberwareSomeRollInitiative).map(value => value[repeatingId]),
                    sheet.get(cyberwareSomeRollReputation).map(value => value[repeatingId]))
                        .map(value => assign(record, repeatingId, value))
                        .orValue(record),
                    {}))))

        .sequenceLeft(sheetMaybe => just(sheetMaybe.match(
            () => {
                throw new Error("The system cannot write to a readonly source.");
            },
            sheet => sheet.write())))
}

function onCalculate(sheet: Sheet<unknown, Record<string, string | Record<string, Record<string, string>>>>): void {
    sheet.get(damageLocation).bind(damageLocation =>
        sheet.get(damageType).bind(damageType =>
            sheet.get(hit).bind(hitValue =>
                damageLocationMatch(
                    damageLocation,
                    damageLocation => sheet.get(armorHeadStoppingPower).bind(armorHeadStoppingPowerValue =>
                        damageTypeMatch(
                            damageType,

                            // up to two attacks
                            // if head armor stopping power is zero
                            // hit is 2 * damage

                            damageType => sheet.set(hit,
                                just(Math.max(hitValue -
                                    (
                                        armorHeadStoppingPowerValue === 0 ?
                                            2 * (sheet.get(damage1).orValue(0) + sheet.get(damage2).orValue(0)) :
                                            0
                                    ), 0))),

                            // up to two attacks, each ablates armor
                            // hit is 2 * damage less head armor stopping power / 2

                            damageType => sheet.set(hit,
                                just(Math.max(hitValue -
                                    (
                                        2 * sheet.get(damage1).map(damage => Math.max(damage - Math.ceil(armorHeadStoppingPowerValue / 2), 0)).orValue(0) +
                                        2 * sheet.get(damage2).map(damage => Math.max(damage - Math.ceil(armorHeadStoppingPowerValue / 2), 0)).orValue(0)
                                    ), 0)))
                                .bind(sheet => sheet.set(armorHeadStoppingPower,
                                    just(Math.max(armorHeadStoppingPowerValue -
                                        (
                                            sheet.get(damage1).map(damage => damage === 0 ? 0 : 1).orValue(0) +
                                            sheet.get(damage2).map(damage => damage === 0 ? 0 : 1).orValue(0)
                                        ), 0)))),

                            // up to three attacks, one ablates armor
                            // hit is 2 * damage less head armor stopping power

                            damageType => sheet.set(hit,
                                just(Math.max(hitValue -
                                    (
                                        2 * sheet.get(damage1).map(damage => Math.max(damage - Math.ceil(armorHeadStoppingPowerValue), 0)).orValue(0) +
                                        2 * sheet.get(damage2).map(damage => Math.max(damage - Math.ceil(armorHeadStoppingPowerValue), 0)).orValue(0) +
                                        2 * sheet.get(damage3).map(damage => Math.max(damage - Math.ceil(armorHeadStoppingPowerValue), 0)).orValue(0)
                                    ), 0)))
                                .bind(sheet => sheet.set(armorHeadStoppingPower,
                                    just(Math.max(armorHeadStoppingPowerValue -
                                        (
                                            sheet.get(damage1).bind(damage1 =>
                                                sheet.get(damage2).bind(damage2 =>
                                                    sheet.get(damage3).map(damage3 =>
                                                        damage1 === 0 && damage2 === 0 && damage3 === 0 ?
                                                            0 :
                                                            1)))
                                                .orValue(0)
                                        ), 0)))))),
                    damageLocation => sheet.get(armorBodyStoppingPower).bind(armorBodyStoppingPowerValue =>
                        damageTypeMatch(
                            damageType,

                            // up to two attacks
                            // if body armor stopping power is zero
                            // hit is damage

                            damageType => sheet.set(hit,
                                just(Math.max(hitValue -
                                    (
                                        armorBodyStoppingPowerValue === 0 ?
                                            sheet.get(damage1).orValue(0) + sheet.get(damage2).orValue(0) :
                                            0
                                    ), 0))),

                            // up to two attacks, each ablates armor
                            // hit is damage less body armor stopping power / 2

                            damageType => sheet.set(hit,
                                just(Math.max(hitValue -
                                    (
                                        sheet.get(damage1).map(damage => Math.max(damage - Math.ceil(armorBodyStoppingPowerValue / 2), 0)).orValue(0) +
                                        sheet.get(damage2).map(damage => Math.max(damage - Math.ceil(armorBodyStoppingPowerValue / 2), 0)).orValue(0)
                                    ), 0)))
                                .bind(sheet => sheet.set(armorBodyStoppingPower,
                                    just(Math.max(armorBodyStoppingPowerValue -
                                        (
                                            sheet.get(damage1).map(damage => damage === 0 ? 0 : 1).orValue(0) +
                                            sheet.get(damage2).map(damage => damage === 0 ? 0 : 1).orValue(0)
                                        ), 0)))),

                            // up to three attacks, one ablates armor
                            // hit is damage less body armor stopping power

                            damageType => sheet.set(hit,
                                just(Math.max(hitValue -
                                    (
                                        sheet.get(damage1).map(damage => Math.max(damage - Math.ceil(armorBodyStoppingPowerValue), 0)).orValue(0) +
                                        sheet.get(damage2).map(damage => Math.max(damage - Math.ceil(armorBodyStoppingPowerValue), 0)).orValue(0) +
                                        sheet.get(damage3).map(damage => Math.max(damage - Math.ceil(armorBodyStoppingPowerValue), 0)).orValue(0)
                                    ), 0)))
                                .bind(sheet => sheet.set(armorBodyStoppingPower,
                                    just(Math.max(armorBodyStoppingPowerValue -
                                        (
                                            sheet.get(damage1).bind(damage1 =>
                                                sheet.get(damage2).bind(damage2 =>
                                                    sheet.get(damage3).map(damage3 =>
                                                        damage1 === 0 && damage2 === 0 && damage3 === 0 ?
                                                            0 :
                                                            1)))
                                                .orValue(0)
                                        ), 0)))),
                        ))))))
        .bind(sheet => sheet.set(damage1, just(0)))
        .bind(sheet => sheet.set(damage2, just(0)))
        .bind(sheet => sheet.set(damage3, just(0)))
        .map(sheet => sheet.write())
}





























