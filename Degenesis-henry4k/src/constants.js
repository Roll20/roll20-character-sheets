'use strict'

const characterAttributes = {
    body:      ['athletics', 'brawl', 'force',
                'melee', 'stamina', 'toughness'],
    agility:   ['crafting', 'dexterity', 'navigation',
                'mobility', 'projectiles', 'stealth'],
    charisma:  ['arts', 'conduct', 'expression',
                'leadership', 'negotiation', 'seduction'],
    intellect: ['artifact_lore', 'engineering', 'focus',
                'legends', 'medicine', 'science'],
    psyche:    ['cunning', 'deception', 'domination',
                'faith', 'reaction', 'willpower'],
    instinct:  ['empathy', 'orienteering', 'perception',
                'primal', 'survival', 'taming']
}
module.exports.characterAttributes = characterAttributes;

const attributeInfo = {
    spent_ego: {
        translationKey: 'spent-ego'
    },
    custom_modifier_query: {
        translationKey: 'custom-modifier-description'
    },
    initiative_effect_modifiers: {
        translationKey: 'effect',
        expression: '0@{initiative_effect_modifiers}',
        notes: ['initiative_effect_notes']
    },
    dodge_effect_modifiers: {
        translationKey: 'effect',
        expression: '0@{dodge_effect_modifiers}',
        notes: ['dodge_effect_notes']
    },
    mental_defense_effect_modifiers: {
        translationKey: 'effect',
        expression: '0@{mental_defense_effect_modifiers}',
        notes: ['mental_defense_effect_notes']
    },
    action_modifier: {
        modifiers: ['action_modifier_effect_modifiers'],
        translationKey: 'action-modifier',
        notes: ['action_modifier_effect_notes']
    },
    attack_modifier: {
        modifiers: ['attack_modifier_effect_modifiers',
                    'action_modifier_effect_modifiers'],
        translationKey: 'attack-modifier',
        notes: ['attack_modifier_effect_notes',
                'action_modifier_effect_notes']
    },
    active_defense_modifier: {
        modifiers: ['active_defense_modifier_effect_modifiers',
                    'action_modifier_effect_modifiers'],
        translationKey: 'active-defense-modifier',
        notes: ['active_defense_modifier_effect_notes',
                'action_modifier_effect_notes']
    },
    weapon_attribute_expression: {
        translationKey: 'attribute-@{weapon_attribute}',
        notes: ['weapon_attribute_notes']
    },
    weapon_skill_expression: {
        translationKey: 'skill-@{weapon_skill}',
        notes: ['weapon_skill_notes']
    },
    weapon_handling: {
        translationKey: 'handling'
    },
    weapon_damage_base: {
        translationKey: 'base-damage-placeholder'
    },
    weapon_damage_force: {
        expression: 'ceil('+
                        '@{weapon_damage_force_factor}*('+
                            '@{body}@{body_effect_modifiers}'+
                            '+'+
                            '@{force}@{force_effect_modifiers}'+
                        ') '+
                    ')',
        translationKey: 'skill-force'
    },
    damage_modifier_effect_modifiers: {
        translationKey: 'effect',
        expression: '0@{damage_modifier_effect_modifiers}'
    },
    distance_far_penalty: {
        translationKey: 'distance-penalty',
        expression: '(-4)'
    },
    distance_extreme_penalty: {
        translationKey: 'distance-penalty',
        expression: '(-8)'
    }
}
for(let [attribute, skills] of Object.entries(characterAttributes)) {
    attributeInfo[attribute] = {
        modifiers: [attribute+'_effect_modifiers'],
        notes:     [attribute+'_effect_notes'],
        translationKey: 'attribute-'+attribute
    }
    skills.forEach(function(skill) {
        attributeInfo[skill] = {
            modifiers: [skill+'_effect_modifiers'],
            notes:     [skill+'_effect_notes'],
            translationKey: 'skill-'+skill
        }
    })
}
module.exports.attributeInfo = attributeInfo;
