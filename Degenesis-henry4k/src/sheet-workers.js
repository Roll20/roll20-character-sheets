// See http://wiki.roll20.net/Sheet_Worker_Scripts
//
// change:<attribute> - Attribut wurde geändert.
// change:repeating_<section> - Repeating Section wurde geändert.
// change:repeating_<section>:<attribute> - Bestimmtes Attribut einer Repeating Section wurde geändert.
// change:_reporder_repeating_<section> - Repeating Section wurde verschoben.
// remove:repeating_<section> - Repeating Section wurde gelöscht.
// remove:repeating_<section>:-<row_id> - Bestimmte Repeating Section wurde gelöscht.
// sheet:opened - Charakterbogen wurde im Browser geöffnet.
// clicked:<button> - Ein Knopf mit `name="act_<button>` wurde gedrückt.

'use strict'

var SHEET_VERSION = 3


// --- UTILITY FUNCTIONS ---

var isValid = function(value) {
    return value !== undefined && value !== ''
}

/**
 * Convert a string to an integer, defaulting to zero.
 */
var toInt = function(value) {
    if(typeof value === 'number')
        return value
    else
        return parseInt(value, 10) || 0
}

/**
 * Convert a string to a floating point number, defaulting to zero.
 */
var toFloat = function(value) {
    if(typeof value === 'number')
        return value
    else
        return parseFloat(value) || 0.0
}

/**
 * Works like `getAttrs`, but converts some attributes automatically to
 * integers.
 */
var getParsedAttrs = function(parsedAttributes,
                              rawAttributes,
                              callback) {
    return getAttrs(parsedAttributes.concat(rawAttributes), function(values) {
        parsedAttributes.forEach(function(attribute) {
            values[attribute] = toInt(values[attribute])
        })
        return callback(values)
    })
}

/**
 * Generates the name of a repeating section attribute.
 *
 * Example: `sectionAttribute('weapon', 'damage', weaponId)`
 */
var sectionAttribute = function(section, postfix, id) {
    return 'repeating_'+section+'_'+id+'_'+section+'_'+postfix
}

/**
 * Generate names for entries of an specific section attribute.
 *
 * Example: `getSectionAttributes('weapon', 'base_damage', weaponIds)`
 */
var getSectionAttributes = function(section, postfix, ids) {
    var attributes = []
    ids.forEach(function(id) {
        attributes.push(sectionAttribute(section, postfix, id))
    })
    return attributes
}

/**
 * Works like `getSectionAttributes` but for different sections that share the
 * same postfix.
 *
 * Example: `getManySectionAttributes('encumbrance', {weapon: weaponIds, armor: armorIds})`
 */
var getManySectionAttributes = function(postfix, sectionIdLists) {
    var attributes = []
    sectionIdLists.forEach(function(ids, section) {
        ids.forEach(function(id) {
            attributes.push(sectionAttribute(section, postfix, id))
        })
    })
    return attributes
}

/**
 * Can be used if an integer attribute solely depends on other integer attributes.
 */
var calculateAttribute = function(attribute,
                                  parsedSourceAttributes,
                                  rawSourceAttributes,
                                  calculationFn) {
    var eventString = (parsedSourceAttributes.concat(rawSourceAttributes)).map(s => 'change:'+s).join(' ')
    on(eventString, function() {
        getParsedAttrs(parsedSourceAttributes, rawSourceAttributes, function(v) {
            var set = {}
            set[attribute] = calculationFn(v)
            setAttrs(set)
        })
    })
}

var constantModifierPattern = /\+\((\d+)\)/g
/**
 * Tries to parse an effect modifier string and sum up its constant elements.
 */
var getConstantPartOfEffectModifier = function(str) {
    str = str || '';
    var total = 0
    for(var constant of str.matchAll(constantModifierPattern)) {
        total += parseInt(constant[1])
    }
    return total
}

var calculateAttributePreview = function(attribute) {
    var modifiersAttribute = attribute+'_effect_modifiers'
    calculateAttribute(attribute+'_preview',
                       [attribute],
                       [modifiersAttribute],
                       v => v[attribute] +
                            getConstantPartOfEffectModifier(v[modifiersAttribute]))
}

var calculateEffectModifierPreview = function(attribute) {
    var modifiersAttribute = attribute+'_effect_modifiers'
    var previewAttribute = modifiersAttribute+'_preview'
    calculateAttribute(previewAttribute,
                       [],
                       [modifiersAttribute],
                       v => getConstantPartOfEffectModifier(v[modifiersAttribute]))
}


// --- CORE ATTRIBUTES AND SKILLS ---

var characterAttributes = new Map(Object.entries({
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
}))

var characterAttributeBySkill = (function() {
    var map = new Map()
    characterAttributes.forEach(function(skills, attribute) {
        skills.forEach(skill => map.set(skill, attribute))
    })
    return map
})()

var getCoreAttributeBySkill = function(skill) {
    return characterAttributeBySkill.get(skill)
}

var characterAttributeAndSkillList = (function() {
    var list = []
    characterAttributes.forEach(function(skills, attribute) {
        list.push(attribute)
        skills.forEach(skill => list.push(skill))
    })
    return list
})()

characterAttributeAndSkillList.forEach(function(attribute) {
    calculateAttributePreview(attribute)
})


// --- INITIATIVE, SPEED, ACTION MODIFIER ---

calculateAttribute('initiative_preview',
                   ['psyche',
                    'reaction',
                    'spent_ego'],
                   ['psyche_effect_modifiers',
                    'reaction_effect_modifiers',
                    'initiative_effect_modifiers'],
                   v => v.psyche +
                        getConstantPartOfEffectModifier(v.psyche_effect_modifiers) +
                        v.reaction +
                        getConstantPartOfEffectModifier(v.reaction_effect_modifiers) +
                        v.spent_ego +
                        getConstantPartOfEffectModifier(v.initiative_effect_modifiers))

calculateAttribute('speed',
                   ['body', 'athletics'],
                   ['speed_effect_modifiers'],
                   v => v.body + v.athletics +
                        getConstantPartOfEffectModifier(v.speed_effect_modifiers))

calculateAttribute('action_modifier',
                   ['trauma',
                    'encumbrance_penalty',
                    'in_motion',
                    'spent_ego'],
                   [],
                   v => -(v.trauma + v.encumbrance_penalty + v.in_motion*2) +
                        v.spent_ego)
calculateAttributePreview('action_modifier')
calculateEffectModifierPreview('action_modifier')

calculateAttribute('attack_modifier',
                   ['action_modifier',
                    'total_shield_attack_modifier'],
                   [],
                   v => v.action_modifier +
                        v.total_shield_attack_modifier)
calculateAttributePreview('attack_modifier')
calculateEffectModifierPreview('attack_modifier')

//calculateAttribute('damage_modifier',
//                   [],
//                   v => 0)
//calculateAttributePreview('damage_modifier')

calculateAttribute('active_defense_modifier',
                   ['action_modifier',
                    'total_shield_active_defense'],
                   [],
                   v => v.action_modifier +
                        v.total_shield_active_defense)
calculateAttributePreview('active_defense_modifier')
calculateEffectModifierPreview('active_defense_modifier')


// --- WILLPOWER/FAITH & FOCUS/PRIMAL ---

/**
 * Either willpower or faith must be 0.
 */
on('change:willpower change:faith', function(e) {
    if(e.sourceType !== 'player')
        return // prevent event loops

    if(e.sourceAttribute === 'willpower')
        setAttrs({mental_strength_source: 'willpower',
                  faith: 0})
    else
        setAttrs({mental_strength_source: 'faith',
                  willpower: 0})
})

/**
 * Either focus or primal must be 0.
 */
on('change:focus change:primal', function(e) {
    if(e.sourceType !== 'player')
        return // prevent event loops

    if(e.sourceAttribute === 'focus')
        setAttrs({problem_solving_approach: 'focus',
                  primal: 0})
    else
        setAttrs({problem_solving_approach: 'primal',
                  focus: 0})
})


// --- EGO & PHYSICAL CONDITION ---

/**
 * Calculate ego limit.
 *
 * See KatharSys p. 94 "Ego".
 */
on('change:intellect '+
   'change:focus '+
   'change:instinct '+
   'change:primal '+
   'change:problem_solving_approach', function() {
    getParsedAttrs(['intellect',
                    'focus',
                    'instinct',
                    'primal',
                    'ego'],
                   ['problem_solving_approach'],
                   function(v) {
        var maxEgo = 0
        if(v.problem_solving_approach === 'focus')
            maxEgo = 2*(v.intellect+v.focus)
        else
            maxEgo = 2*(v.instinct+v.primal)

        setAttrs({ego: Math.min(v.ego, maxEgo),
                  ego_max: maxEgo})
    })
})

/**
 * Calculate spore infestation limit.
 *
 * See KatharSys p. 94 "Spore infestation".
 */
calculateAttribute('spore_infestation_max',
                   ['psyche',
                    'willpower',
                    'faith'],
                   [],
                   function(v) {
    if(v.willpower > 0)
        return 2*(v.psyche+v.willpower)
    else
        return 2*(v.psyche+v.faith)
})

/**
 * Update some values which are mostly just used for display purposes.
 *
 * Noteworthy are
 *
 * - spore_infestation: Total spore infestation (may be beyond the maximum)
 * - spore_infestation_excess: Spore infestation beyond the maximum
 *
 * The rest is solely used for cosmetic purposes and may be changed at any time.
 */
on('change:spore_infestation_permanent '+
   'change:spore_infestation_temporary '+
   'change:spore_infestation_max', function() {
    getParsedAttrs(['spore_infestation_permanent',
                    'spore_infestation_temporary',
                    'spore_infestation_max'],
                    [],
                    function(v) {
        var permanent = v.spore_infestation_permanent
        var temporary = v.spore_infestation_temporary
        var max       = v.spore_infestation_max

        var total    = permanent + temporary
        var free     = Math.max(0, max - total)
        var excess   = Math.max(0, total - max)
        var disabled = Math.max(0, (2*2*6) - (max + excess))
        var fill     = temporary - excess

        setAttrs({
            spore_infestation: total,
            spore_infestation_fill: fill,
            spore_infestation_free: free,
            spore_infestation_excess: excess,
            spore_infestation_disabled: disabled
        })
    })
})

/**
 * Calculate flesh wound limit.
 *
 * See KatharSys p. 94 "Flesh wounds".
 */
on('change:body change:toughness', function() {
    getParsedAttrs(['body', 'toughness', 'flesh_wounds'], [], function(v) {
        var maxFleshWounds = 2*(v.body+v.toughness)
        setAttrs({flesh_wounds: Math.min(v.flesh_wounds, maxFleshWounds),
                  flesh_wounds_max: maxFleshWounds})
    })
})

/**
 * Calculate trauma limit.
 *
 * See KatharSys p. 94 "Trauma".
 */
on('change:body change:psyche', function() {
    getParsedAttrs(['body', 'psyche', 'trauma'], [], function(v) {
        var maxTrauma = v.body+v.psyche
        setAttrs({trauma: Math.min(v.trauma, maxTrauma),
                  trauma_max: maxTrauma})
    })
})

/**
 * Carry flesh wounds over to the trauma bar if the first one is full.
 *
 * This is handy when adding damage via the token interface.
 */
on('change:flesh_wounds', function() {
    getParsedAttrs(['flesh_wounds',
                    'flesh_wounds_max',
                    'trauma'], [], function(v) {
        if(v.flesh_wounds > v.flesh_wounds_max) {
            setAttrs({flesh_wounds: v.flesh_wounds_max,
                      trauma: v.trauma + (v.flesh_wounds - v.flesh_wounds_max)})
        }
    })
})


// --- ENCUMBRANCE ---

/**
 * Calculate the penalty for carrying too much stuff.
 *
 * See KatharSys, p. 103 "Encumbrance"
 */
calculateAttribute('encumbrance_penalty',
                   ['encumbrance', 'encumbrance_max'],
                   [],
                   v => Math.max(0, v.encumbrance - v.encumbrance_max))

/**
 * Calculate maximum *carryable* encumbrance.
 *
 * See KatharSys, p. 103 "Encumbrance"
 */
calculateAttribute('encumbrance_max',
                   ['body', 'force'],
                   [],
                   v => v.body + v.force)

/**
 * Calculate total carried encumbrance.
 *
 * To do this the encumbrance of each *carried* item is summed up.
 */
var updateTotalEncumbrance = function() {
    getSectionIDs('weapon', function(weaponIds) {
        getSectionIDs('armor', function(armorIds) {
            getSectionIDs('equipment', function(equipmentIds) {
                var sectionIdLists = new Map([
                    ['weapon', weaponIds],
                    ['armor', armorIds],
                    ['equipment', equipmentIds]
                ])
                var encumbranceAttributes = getManySectionAttributes('encumbrance', sectionIdLists)
                var locationAttributes    = getManySectionAttributes('location',    sectionIdLists)

                var parsedAttributes = encumbranceAttributes.concat(
                    ['stowed_is_away'])

                getParsedAttrs(parsedAttributes, locationAttributes, function(values) {
                    var stowedIsAway = values.stowed_is_away === 1

                    var totalEncumbrance = 0
                    locationAttributes.forEach(function(locationAttribute, index) {
                        var encumbranceAttribute = encumbranceAttributes[index]
                        var encumbrance = values[encumbranceAttribute]
                        var location = values[locationAttribute]
                        if(stowedIsAway) {
                            if(location === 'at hand')
                                totalEncumbrance += encumbrance
                        } else {
                            if(location !== 'away')
                                totalEncumbrance += encumbrance
                        }
                    })

                    console.log('DEGENESIS', 'encumbrance')
                    setAttrs({encumbrance: totalEncumbrance})
                })
            })
        })
    })
}

on('remove:repeating_weapon '+
   'change:repeating_weapon:weapon_encumbrance '+
   'change:repeating_weapon:weapon_location '+
   'remove:repeating_armor '+
   'change:repeating_armor:armor_encumbrance '+
   'change:repeating_armor:armor_location '+
   'remove:repeating_equipment '+
   'change:repeating_equipment:equipment_encumbrance '+
   'change:repeating_equipment:equipment_location '+
   'change:stowed_is_away',
   updateTotalEncumbrance)


// --- WEAPON SKILL ---

var weaponRowIdPattern = /^repeating_weapon_([^_]+)/

var updateWeaponSkill = function(rowId) {
    var rowPrefix = 'repeating_weapon_'+rowId+'_'

    var skillAttribute = rowPrefix+'weapon_skill'
    getAttrs([skillAttribute], function(v) {
        var skill = v[skillAttribute]
        var attribute = getCoreAttributeBySkill(skill)

        var newValues = {}
        newValues[rowPrefix+'weapon_attribute'] = attribute
        newValues[rowPrefix+'weapon_skill_notes'] = '@{'+skill+'_effect_notes}'
        newValues[rowPrefix+'weapon_attribute_notes'] = '@{'+attribute+'_effect_notes}'
        newValues[rowPrefix+'weapon_skill_expression'] =
            '@{'+skill+'}@{'+skill+'_effect_modifiers}'
        newValues[rowPrefix+'weapon_attribute_expression'] =
            '@{'+attribute+'}@{'+attribute+'_effect_modifiers}'

        getParsedAttrs([attribute,
                        attribute+'_effect_modifiers',
                        skill,
                        skill+'_effect_modifiers'], [], function(v) {
            newValues[rowPrefix+'weapon_attribute_preview'] =
                v[attribute] +
                getConstantPartOfEffectModifier(v[attribute+'_effect_modifiers'])
            newValues[rowPrefix+'weapon_skill_preview'] =
                v[skill] +
                getConstantPartOfEffectModifier(v[skill+'_effect_modifiers'])
            setAttrs(newValues)
        })
    })
}

on('change:repeating_weapon:weapon_skill', function(e) {
    var rowId = weaponRowIdPattern.exec(e.sourceAttribute)[1]
    updateWeaponSkill(rowId)
})

on(characterAttributeAndSkillList.map(name => 'change:'+name).join(' '), function() {
    getSectionIDs('weapon', function(rowIds) {
        rowIds.forEach(updateWeaponSkill)
    })
})


// --- WEAPON DAMAGE ---

/**
 * Recalculate damage of a specific weapon.  (Specified by its row id.)
 *
 * Weapon damage depends on:
 * - its base damage (KatharSys, p. 103 "Damage")
 * - its force bonus (KatharSys, p. 156 "Use of force")
 *   - adds a fraction of BOD+Force to the base damage
 *   - the result is rounded up
 */
var updateWeaponDamagePreview = function(rowId) {
    var rowPrefix = 'repeating_weapon_'+rowId+'_'
    var baseDamageAttribute  = rowPrefix+'weapon_damage_base'
    var forceFactorAttribute = rowPrefix+'weapon_damage_force_factor'
    var damageModifiersAttribute = 'damage_modifier_effect_modifiers'
    getParsedAttrs(['body',
                    'force',
                    baseDamageAttribute],
                   [forceFactorAttribute,
                    damageModifiersAttribute],
                   function(v) {
        var baseDamage  = v[baseDamageAttribute]
        var forceFactor = toFloat(v[forceFactorAttribute])
        var damage = baseDamage +
                     Math.ceil((v.body+v.force) * forceFactor) +
                     getConstantPartOfEffectModifier(v[damageModifiersAttribute])
        var values = {}
        values[rowPrefix+'weapon_damage_preview'] = damage
        setAttrs(values)
    })
}

on('change:body '+
   'change:force '+
   'change:damage_modifier_effect_modifiers', function() {
    getSectionIDs('weapon', function(rowIds) {
        rowIds.forEach(updateWeaponDamagePreview)
    })
})

on('change:repeating_weapon:weapon_damage_base '+
   'change:repeating_weapon:weapon_damage_force_factor', function(e) {
    var rowId = weaponRowIdPattern.exec(e.sourceAttribute)[1]
    updateWeaponDamagePreview(rowId)
})


// --- WEAPON ATTACK & ACTIVE DEFENSE ---

/**
 * Recalculate attack and active defense stats of a specific weapon.
 * (Specified by its row id.)
 *
 * An action number is calculated for each distance class and for the active
 * defense.
 *
 * As melee weapons can't be used for ranged combat, they get zero values
 * for their "far shot" and "extreme shot" action numbers.
 *
 * As ranged weapons can't be used for active defense, they get a zero value
 * there.
 *
 * See KatharSys p. 103 "Handling" and "Distance"
 */
var updateWeaponAttack = function(rowId) {
    var rowPrefix = 'repeating_weapon_'+rowId+'_'

    var attackModifierAttribute    = 'attack_modifier'
    var attackModifierEffectModifiersAttribute = 'attack_modifier_effect_modifiers'
    var activeDefenseModifierAttribute = 'active_defense_modifier'
    var activeDefenseModifierEffectModifiersAttribute = 'active_defense_modifier_effect_modifiers'

    var typeAttribute              = rowPrefix+'weapon_type'
    var attributeAttribute         = rowPrefix+'weapon_attribute'
    var skillAttribute             = rowPrefix+'weapon_skill'
    var handlingAttribute          = rowPrefix+'weapon_handling'

    var effectiveDistanceAttribute = rowPrefix+'weapon_distance_effective'
    var farDistanceAttribute       = rowPrefix+'weapon_distance_far'

    var effectiveAttackPreviewAttribute   = rowPrefix+'weapon_attack_effective_preview'
    var farAttackPreviewAttribute         = rowPrefix+'weapon_attack_far_preview'
    var extremeAttackPreviewAttribute     = rowPrefix+'weapon_attack_extreme_preview'
    var activeDefensePreviewAttribute     = rowPrefix+'weapon_active_defense_preview'

    getParsedAttrs([attackModifierAttribute,
                    activeDefenseModifierAttribute,
                    handlingAttribute,
                    effectiveDistanceAttribute,
                    farDistanceAttribute], // parsed attributes
                   [attackModifierEffectModifiersAttribute,
                    activeDefenseModifierEffectModifiersAttribute,
                    typeAttribute,
                    attributeAttribute,
                    skillAttribute], // raw attributes
                   function(v) {
        var attackModifier    = v[attackModifierAttribute]
        var attackModifierEffectModifiers = v[attackModifierEffectModifiersAttribute]
        var activeDefenseModifier = v[activeDefenseModifierAttribute]
        var activeDefenseModifierEffectModifiers = v[activeDefenseModifierEffectModifiersAttribute]
        var type              = v[typeAttribute]
        var attribute         = v[attributeAttribute]
        var skill             = v[skillAttribute]
        var handling          = v[handlingAttribute]
        var effectiveDistance = v[effectiveDistanceAttribute]
        var farDistance       = v[farDistanceAttribute]

        var complete = function(skillPreview) {
            var effectiveAttackPreview =
                attackModifier +
                getConstantPartOfEffectModifier(attackModifierEffectModifiers) +
                skillPreview +
                handling

            var newValues = {}
            newValues[effectiveAttackPreviewAttribute] = Math.max(0, effectiveAttackPreview)
            switch(type)
            {
                case 'melee':
                    // Melee weapons can't be used for ranged combat:
                    newValues[farAttackPreviewAttribute]     = 0
                    newValues[extremeAttackPreviewAttribute] = 0

                    var activeDefensePreview =
                        activeDefenseModifier +
                        getConstantPartOfEffectModifier(activeDefenseModifierEffectModifiers) +
                        skillPreview +
                        handling
                    newValues[activeDefensePreviewAttribute] = Math.max(0, activeDefensePreview)
                    break

                case 'ranged':
                    // Penalties for far and extreme shot are defined in KatharSys p. 103.:
                    newValues[farAttackPreviewAttribute]     = Math.max(0, effectiveAttackPreview-4)
                    newValues[extremeAttackPreviewAttribute] = Math.max(0, effectiveAttackPreview-8)

                    // Ranged weapons can't be used for active defense:
                    newValues[activeDefensePreviewAttribute] = 0
                    break
            }
            setAttrs(newValues)
        }

        var skillAttributes;
        if(skill !== '') {
            getParsedAttrs([attribute,
                            skill],
                           [attribute+'_effect_modifiers',
                            skill+'_effect_modifiers'],
                           function(values) {
                complete(
                    values[attribute] +
                    values[skill] +
                    getConstantPartOfEffectModifier(values[attribute+'_effect_modifiers']) +
                    getConstantPartOfEffectModifier(values[skill+'_effect_modifiers']))
            })
        }
        else {
            complete(0)
        }
    })
}

on('change:repeating_weapon:weapon_type '+
   'change:repeating_weapon:weapon_attribute '+
   'change:repeating_weapon:weapon_skill '+
   'change:repeating_weapon:weapon_handling '+
   'change:repeating_weapon:weapon_distance_effective '+
   'change:repeating_weapon:weapon_distance_far', function(e) {
    var rowId = weaponRowIdPattern.exec(e.sourceAttribute)[1]
    updateWeaponAttack(rowId)
})

var attackChangeEvents = ['change:attack_modifier',
                          'change:attack_modifier_effect_modifiers',
                          'change:active_defense_modifier',
                          'change:active_defense_modifier_effect_modifiers']
characterAttributeAndSkillList.forEach(
    name => attackChangeEvents.push('change:'+name))
on(attackChangeEvents.join(' '), function(e) {
    getSectionIDs('weapon', function(rowIds) {
        rowIds.forEach(updateWeaponAttack)
    })
})


// --- NATURAL WEAPONS ---

var weaponDefaultProperties = {
    edit: 0,
    distance_effective: 1,
    encumbrance: 0,
    tech: 1,
    slots: 1,
    slots_max: 0,
    value: 0
}

/**
 * Create a new weapon section.
 *
 * `properties` is an object which describes the weapon:
 * - `name`, `skill`, `handling`, `distance_effective`, `distance_far`, ...
 *
 * All new attributes are stored in the `values` object.
 */
var createWeapon = function(values, properties) {
    var rowId = generateRowID()
    var rowPrefix = 'repeating_weapon_'+rowId+'_'
    for(let [key, value] of Object.entries(weaponDefaultProperties)) {
        values[rowPrefix+'weapon_'+key] = value
    }
    for(let [key, value] of Object.entries(properties)) {
        values[rowPrefix+'weapon_'+key] = value
    }
    return rowId
}

on('clicked:add_natural_weapons', function() {
    var values = {}
    createWeapon(values, {
        name: getTranslationByKey('weapon-bite'),
        attribute: 'body',
        skill: 'melee',
        handling: -3,
        damage_base: 0,
        damage_force_factor: '0.333'
    })
    createWeapon(values, {
        name: getTranslationByKey('weapon-kick'),
        attribute: 'body',
        skill: 'melee',
        handling: 1,
        damage_base: 0,
        damage_force_factor: '0.5',
        description: getTranslationByKey('weapon-quality-dazed')
    })
    createWeapon(values, {
        name: getTranslationByKey('weapon-blow'),
        attribute: 'body',
        skill: 'melee',
        handling: 2,
        damage_base: 0,
        damage_force_factor: '0.333',
        description: getTranslationByKey('weapon-quality-dazed')+
                     ', '+
                     getTranslationByKey('weapon-quality-smooth-running')+' (2T)'
    })
    setAttrs(values)
})



// --- ARMOR & SHIELD ---

/**
 * To simplify the user interface shield and armor are handled in the same
 * repeating section.
 *
 * The type attribute is used to classify entries as shield or armor and
 * the location attribute defines whether they are equipped or not.
 *
 * Armor provides damage reduction (called armor rating in KatharSys).
 * See KatharSys p. 104 "Armor rating".
 * `total_armor_damage_reduction` stores the total of reduction of all equipped armor.
 *
 * Shields provide a bonus to active and passive defense and a
 * penalty to weapon attacks.
 * See KatharSys p. "Tunnel shield" and p. 163 "Shields".
 * The `shield_*` attributes store these values.
 */
on('remove:repeating_armor '+
   'change:repeating_armor:armor_location '+
   'change:repeating_armor:armor_type '+
   'change:repeating_armor:armor_damage_reduction '+
   'change:repeating_armor:armor_active_defense '+
   'change:repeating_armor:armor_passive_defense '+
   'change:repeating_armor:armor_attack_modifier', function() {

    getSectionIDs('armor', function(ids) {
        var rawAttributes = [];
        (['location',
          'type']).forEach(function(postfix) {
            rawAttributes = rawAttributes.concat(getSectionAttributes('armor', postfix, ids))
        })

        var parsedAttributes = [];
        (['damage_reduction',
          'active_defense',
          'passive_defense',
          'attack_modifier']).forEach(function(postfix) {
            parsedAttributes = parsedAttributes.concat(getSectionAttributes('armor', postfix, ids))
        })

        getParsedAttrs(parsedAttributes, rawAttributes, function(v) {
            var totalDamageReduction = 0
            var totalActiveDefense   = 0
            var totalPassiveDefense  = 0
            var totalAttackModifier  = 0

            ids.forEach(function(id) {
                var location = v[sectionAttribute('armor', 'location', id)]
                if(location !== 'at hand')
                    return

                var type = v[sectionAttribute('armor', 'type', id)]
                switch(type) {
                    case 'armor':
                        totalDamageReduction += v[sectionAttribute('armor', 'damage_reduction', id)]
                        break

                    case 'shield':
                        totalActiveDefense  += v[sectionAttribute('armor', 'active_defense',  id)]
                        totalPassiveDefense += v[sectionAttribute('armor', 'passive_defense', id)]
                        totalAttackModifier += v[sectionAttribute('armor', 'attack_modifier', id)]
                        break
                }
            })

            setAttrs({total_armor_damage_reduction: totalDamageReduction,
                      total_shield_active_defense:  totalActiveDefense,
                      total_shield_passive_defense: totalPassiveDefense,
                      total_shield_attack_modifier: totalAttackModifier})
        })
    })
})

///**
// * Reset unused attributes
// */
//var armorRowIdPattern = /^repeating_armor_([^_]+)/
//on('change:repeating_armor:armor_type', function(e) {
//    var rowId = armorRowIdPattern.exec(e.sourceAttribute)[1]
//    var type = e.newValue
//    var newValues = {}
//    switch(type) {
//        case 'armor':
//            newValues[sectionAttribute('armor', 'active_defense',  id)] = ''
//            newValues[sectionAttribute('armor', 'passive_defense', id)] = ''
//            newValues[sectionAttribute('armor', 'attack_modifier', id)] = ''
//            break
//
//        case 'shield':
//            newValues[sectionAttribute('armor', 'damage_reduction', id)] = ''
//            break
//    }
//    setAttrs(newValues, {silent: true})
//})


// --- EFFECTS ---

// Terminology:
//
// attribute: An attribute affected by an effect value.
// values: ???
// value list: ???
// aggregate: ???

var effectAttributeCount = 6 // See html/events.html
var effectRowIdPattern = /^repeating_effect_([^_]+)/
var effectAttributeIndexPattern = /effect_attribute_([^_]+)_[^_]+$/

var otherEffectTargets = ['initiative',
                          'dodge',
                          'speed',
                          'armor',
                          'action_modifier',
                          'attack_modifier',
                          'damage_modifier',
                          'active_defense_modifier',
                          'passive_defense',
                          'mental_defense']

var addAttributeText = function(aggregate, element, concatenator) {
    if(aggregate === '')
        return element
    else
        return aggregate+concatenator+element
}

var removeAttributeText = function(aggregate, element, concatenator) {
    var elementStart = aggregate.indexOf(element)
    if(elementStart === -1)
        return aggregate
    var elementEnd = elementStart + element.length

    var hasPredecessor = elementStart !== 0
    var hasSuccessor   = elementEnd   !== aggregate.length

    var cutStart = elementStart
    var cutEnd   = elementEnd

    if(hasPredecessor)
        cutStart -= concatenator.length
    if(hasSuccessor && !hasPredecessor)
        cutEnd += concatenator.length

    return aggregate.substring(0, cutStart)+
           aggregate.substring(cutEnd)
}

var encodeModifier = function(modifier, effectOrigin) {
    return '+('+modifier+')' // TODO: Escape/trim problematic parts!
}
var addAttributeModifier    = (aggregate, modifier, effectOrigin) => addAttributeText(
    aggregate, encodeModifier(modifier, effectOrigin), '')
var removeAttributeModifier = (aggregate, modifier, effectOrigin) => removeAttributeText(
    aggregate, encodeModifier(modifier, effectOrigin), '')

var encodeNote = function(note, effectOrigin) {
    return '**'+effectOrigin+':**\n'+note+'\n\n' // TODO: Escape/trim problematic parts!
}
var addAttributeNote    = (aggregate, note, effectOrigin) => addAttributeText(
    aggregate, encodeNote(note, effectOrigin), '')
var removeAttributeNote = (aggregate, note, effectOrigin) => removeAttributeText(
    aggregate, encodeNote(note, effectOrigin), '')

var effectValueTypes = [{valuePostfix: 'modifier',
                         aggregatePostfix: 'modifiers',
                         //aggregateEncoder: v => (v === '') ? '' : '+'+v,
                         aggregateEncoder: v => v,
                         add: addAttributeModifier,
                         remove: removeAttributeModifier},
                        {valuePostfix: 'note',
                         aggregatePostfix: 'notes',
                         aggregateEncoder: v => v,
                         add: addAttributeNote,
                         remove: removeAttributeNote}]

/**
 * Maps all 
 */
var gatherEffectValues = function(rowIds, values, valueType) {
    var valueLists = new Map()
    rowIds.forEach(function(rowId) {
        var effectOrigin = values[sectionAttribute('effect', 'origin', rowId)]
        var effectState  = values[sectionAttribute('effect', 'state', rowId)]
        var isActive = effectState === '1'
        var rowPrefix = sectionAttribute('effect', 'attribute_', rowId)
        for(var i = 1; i <= effectAttributeCount; i++) {
            var attributeName = values[rowPrefix+i+'_name']
            if(attributeName === undefined ||
               attributeName === '')
                continue // ignore empty attribute names
            var valueName = rowPrefix+i+'_'+valueType.valuePostfix
            var value = values[valueName]
            if(value === undefined ||
               value === '')
                continue
            var aggregateName = attributeName+'_effect_'+valueType.aggregatePostfix
            var list = valueLists.get(aggregateName)
            if(list === undefined) {
                list = []
                valueLists.set(aggregateName, list)
            }
            if(isActive)
                list.push({value: value, effectOrigin: effectOrigin})
        }
    })
    return valueLists
}

/**
 * Generates a map of all affected attributes with their modifiers.
 */
var getEffectModifiers = function(rowId, values) {
    var rowPrefix = sectionAttribute('effect', 'attribute_', rowId)
    var modifiers = new Map()
    for(var i = 1; i <= effectAttributeCount; i++) {
        var name     = values[rowPrefix+i+'_name']
        var modifier = values[rowPrefix+i+'_modifier']
        if(name !== '') // ignore empty attribute names
            modifiers.set(name, (modifiers.get(name) | 0) + modifier)
    }
    return modifiers
}

var getTotalEffectModifiers = function(rowIds, values) {
    var modifiers = new Map()
    rowIds.forEach(function(rowId) {
        var rowPrefix = sectionAttribute('effect', 'attribute_', rowId)
        for(var i = 1; i <= effectAttributeCount; i++) {
            var name     = values[rowPrefix+i+'_name']
            var modifier = values[rowPrefix+i+'_modifier']
            if(name !== '') // ignore empty attribute names
                continue;
            var type = getAttributeType(name)
            if(type === 'number') {
                var targetName = name+effectTotalPostfix
                modifiers.set(targetName, (modifiers.get(targetName) | 0) + modifier)
            } else {
                var targetName = name
                var text = modifiers.get(targetName)
                if(text) {
                    text = text + '\n' + modifier
                } else {
                    text = modifier
                }
                modifiers.set(targetName, text)
            }
        }
    })
    return modifiers
}

var updateEffectTotals = function(rowId, effectValues, modifierFactor) {
    var modifiers = getEffectModifiers(rowId, effectValues)
    var totalAttributes = Array.from(modifiers.keys()).map(attribute => attribute+effectTotalPostfix)
    getParsedAttrs(totalAttributes, [], function(totalValues) {
        var newValues = {}
        modifiers.forEach(function(modifier, attribute) {
            var totalAttribute = attribute+effectTotalPostfix
            newValues[totalAttribute] = totalValues[totalAttribute] +
                                        modifier * modifierFactor
        })
        setAttrs(newValues)
    })
}

///**
// * Substract effect attribute values from respective totals.
// */
//on('remove:repeating_effect', function(e) {
//    var rowId = effectRowIdPattern.exec(e.sourceAttribute)[1]
//    var stateAttribute = sectionAttribute('effect', 'state', rowId)
//    getAttrs([stateAttribute], [], function(values) {
//        var state = values[stateAttribute]
//        if(state !== '1') // ignore if effect is not active
//            return
//        var rowPrefix = sectionAttribute('effect', 'attribute_', rowId)
//        var effectValues = {}
//        for(var i = 1; i <= effectAttributeCount; i++) {
//            var nameAttribute     = rowPrefix+i+'_name'
//            var modifierAttribute = rowPrefix+i+'_modifier'
//            effectValues[nameAttribute]     =       e.removedInfo[nameAttribute]
//            effectValues[modifierAttribute] = toInt(e.removedInfo[modifierAttribute])
//        }
//        updateEffectTotals(rowId, effectValues, -1)
//    })
//})
//
///**
// * Add or substract attribute values from respective totals.
// */
//on('change:repeating_effect:effect_state', function(e) {
//    if(e.previousValue === e.newValue)
//        return
//    var modifierFactor = (e.newValue === '1') ? 1 : -1
//    var rowId = effectRowIdPattern.exec(e.sourceAttribute)[1]
//    var rawAttributes = []
//    var parsedAttributes = []
//    var rowPrefix = sectionAttribute('effect', 'attribute_', rowId)
//    for(var i = 1; i <= effectAttributeCount; i++) {
//        rawAttributes.push(rowPrefix+i+'_name')
//        parsedAttributes.push(rowPrefix+i+'_modifier')
//    }
//    getParsedAttrs(parsedAttributes, rawAttributes, function(effectValues) {
//        updateEffectTotals(rowId, effectValues, modifierFactor)
//    })
//})
//
//var effectNameChangeEvents = []
//var effectModifierChangeEvents = []
//for(var i = 1; i <= effectAttributeCount; i++) {
//    effectNameChangeEvents.push('change:repeating_effect:effect_attribute_'+i+'_name')
//    effectModifierChangeEvents.push('change:repeating_effect:effect_attribute_'+i+'_modifier')
//}
//
///**
// * An effects attribute name has been changed: Substract the modifier from the
// * old total (if any) and add it to the new total (if any).
// */
//on(effectNameChangeEvents.join(' '), function(e) {
//    if(e.previousValue === e.newValue)
//        return
//    var rowId = effectRowIdPattern.exec(e.sourceAttribute)[1]
//    var attributeIndex = toInt(effectAttributeIndexPattern.exec(e.sourceAttribute)[1])
//    var stateAttribute = sectionAttribute('effect', 'state', rowId)
//    var modifierAttribute = sectionAttribute('effect',
//                                             'attribute_'+attributeIndex+'_modifier',
//                                             rowId)
//    var parsedAttributes = [modifierAttribute]
//    var oldTotalAttribute = undefined
//    if(e.previousValue !== '') {
//        oldTotalAttribute = e.previousValue + effectTotalPostfix
//        parsedAttributes.push(oldTotalAttribute)
//    }
//    var newTotalAttribute = undefined
//    if(e.newValue !== '') {
//        newTotalAttribute = e.newValue + effectTotalPostfix
//        parsedAttributes.push(newTotalAttribute)
//    }
//    getParsedAttrs(parsedAttributes, [stateAttribute], function(v) {
//        var state = v[stateAttribute]
//        if(state !== '1') // ignore if effect is not active
//            return
//        var modifier = v[modifierAttribute]
//        var newValues = {}
//        if(oldTotalAttribute) {
//            var oldTotal = v[oldTotalAttribute]
//            newValues[oldTotalAttribute] = oldTotal - modifier
//        }
//        if(newTotalAttribute) {
//            var newTotal = v[newTotalAttribute]
//            newValues[newTotalAttribute] = newTotal + modifier
//        }
//        setAttrs(newValues)
//    })
//})
//
///**
// * An effects attribute modifier has been changed: Add the difference to the total.
// */
//on(effectModifierChangeEvents.join(' '), function(e) {
//    if(e.previousValue === e.newValue)
//        return
//    var rowId = effectRowIdPattern.exec(e.sourceAttribute)[1]
//    var attributeIndex = toInt(effectAttributeIndexPattern.exec(e.sourceAttribute)[1])
//    var stateAttribute = sectionAttribute('effect', 'state', rowId)
//    var nameAttribute = sectionAttribute('effect',
//                                         'attribute_'+attributeIndex+'_name',
//                                         rowId)
//    getAttrs([stateAttribute, nameAttribute], function(values) {
//        var state = values[stateAttribute]
//        if(state !== '1') // ignore if effect is not active
//            return
//        var name = v[nameAttribute]
//        if(name === '') // ignore if attribute name is empty
//            return
//        var totalAttribute = name+effectTotalPostfix
//        getParsedAttrs([totalAttribute], [], function(v) {
//            var total = v[totalAttribute]
//            var newValues = {}
//            var modifierDifference = toInt(e.newValue) - toInt(e.previousValue)
//            newValues[totalAttribute] = total + modifierDifference
//            setAttrs(newValues)
//        })
//    })
//})

var effectChangeEvents = ['remove:repeating_effect',
                          'change:repeating_effect:effect_origin',
                          'change:repeating_effect:effect_state']
for(var i = 1; i <= effectAttributeCount; i++) {
    effectChangeEvents.push('change:repeating_effect:effect_attribute_'+i+'_name')
    effectValueTypes.forEach(function(valueType) {
        effectChangeEvents.push('change:repeating_effect:effect_attribute_'+i+'_'+valueType.valuePostfix)
    })
}
on(effectChangeEvents.join(' '), function(e) {
    var newAggregateValues = {}

    if(e.removedInfo !== undefined) {
        var id = effectRowIdPattern.exec(e.sourceAttribute)[1]
        effectValueTypes.forEach(function(valueType) {
            var valueLists = gatherEffectValues([id], e.removedInfo, valueType)
            valueLists.forEach(
                (valueList, aggregateName) => newAggregateValues[aggregateName] = '')
        })
    }

    getSectionIDs('effect', function(ids) {
        var effectRowPrefixes = getSectionAttributes('effect', '', ids)
        var attributeNames = []
        effectRowPrefixes.forEach(function(rowPrefix) {
            attributeNames.push(rowPrefix+'origin')
            attributeNames.push(rowPrefix+'state')
            for(var i = 1; i <= effectAttributeCount; i++) {
                attributeNames.push(rowPrefix+'attribute_'+i+'_name')
                effectValueTypes.forEach(function(valueType) {
                    attributeNames.push(rowPrefix+'attribute_'+i+'_'+valueType.valuePostfix)
                })
            }
        })

        getAttrs(attributeNames, function(attributeValues) {
            effectValueTypes.forEach(function(valueType) {
                var valueLists = gatherEffectValues(ids, attributeValues, valueType)
                var reducer = function(aggregate, valueDesc) {
                    return valueType.add(aggregate,
                                         valueDesc.value,
                                         valueDesc.effectOrigin)
                }
                valueLists.forEach(function(valueList, aggregateName) {
                    var aggregateValue = valueList.reduce(reducer, '')
                    aggregateValue = valueType.aggregateEncoder(aggregateValue)
                    newAggregateValues[aggregateName] = aggregateValue
                })
            })
            setAttrs(newAggregateValues)
        })
    })
})


// --- ACTIVE, PASSIVE AND MENTAL DEFENSE ---

/**
 * See KatharSys, p. 100 "combat skills and their counterparts".
 */
calculateAttribute('mental_defense_preview',
                   ['psyche',
                    'willpower',
                    'faith',
                    'action_modifier'],
                   ['psyche_effect_modifiers',
                    'willpower_effect_modifiers',
                    'faith_effect_modifiers',
                    'mental_defense_effect_modifiers',
                    'action_modifier_effect_modifiers'],
                   v => v.psyche +
                        getConstantPartOfEffectModifier(v.psyche_effect_modifiers) +
                        v.willpower +
                        getConstantPartOfEffectModifier(v.willpower_effect_modifiers) +
                        v.faith +
                        getConstantPartOfEffectModifier(v.faith_effect_modifiers) +
                        v.action_modifier +
                        getConstantPartOfEffectModifier(v.action_modifier_effect_modifiers)+
                        getConstantPartOfEffectModifier(v.mental_defense_effect_modifiers))
calculateEffectModifierPreview('mental_defense')

/**
 * See KatharSys, p. 106 "Passive".
 */
calculateAttribute('passive_defense',
                   ['active', 'in_motion',
                    'cover', 'total_shield_passive_defense'],
                   ['passive_defense_effect_modifiers'],
                   v => 1 +
                        v.active +
                        v.in_motion +
                        v.cover +
                        v.total_shield_passive_defense +
                        getConstantPartOfEffectModifier(v.passive_defense_effect_modifiers))
calculateEffectModifierPreview('passive_defense')

/**
 * Active defense by dodging the attack.
 *
 * See KatharSys, p. 102 "Active defense".
 */
calculateAttribute('dodge_preview',
                   ['agility',
                    'mobility',
                    'active_defense_modifier'],
                   ['agility_effect_modifiers',
                    'mobility_effect_modifiers',
                    'active_defense_modifier_effect_modifiers',
                    'action_modifier_effect_modifiers',
                    'dodge_effect_modifiers'],
                   v => Math.max(0, v.agility +
                                    getConstantPartOfEffectModifier(v.agility_effect_modifiers) +
                                    v.mobility +
                                    getConstantPartOfEffectModifier(v.mobility_effect_modifiers) +
                                    v.active_defense_modifier +
                                    getConstantPartOfEffectModifier(v.active_defense_modifier_effect_modifiers) +
                                    getConstantPartOfEffectModifier(v.action_modifier_effect_modifiers) +
                                    getConstantPartOfEffectModifier(v.dodge_effect_modifiers)))


// --- TRANSLATION ATTRIBUTES ---

/**
 * Store translations needed by roll queries in attributes.
 *
 * (Because roll queries can't access the translation system otherwise.)
 */
var setTranslationAttributes = function() {
    var translationKeys = ['whisper-question',
                           'whisper-question-no',
                           'whisper-question-yes',
                           'custom-modifier-question']
    var values = {}
    translationKeys.forEach(function(key) {
        var translation = getTranslationByKey(key)
        if(translation === false)
            translation = ''
        var attributeName = 'translation_'+key.replace(/-/g, '_')
        values[attributeName] = translation
    })
    setAttrs(values)
}
on('sheet:opened', function() {
    getAttrs(['sheet_version'], function(v) {
        if(isValid(v.sheet_version))
            setTranslationAttributes()
    })
})


// --- SHEET INITIALIZATION

var setDefaultValues = function(values) {
    values['sheet_version'] = SHEET_VERSION
    var setEffectValues = function(name) {
        values[name+'_effect_modifiers'] = ''
        values[name+'_effect_notes']    = ''
    }
    characterAttributes.forEach(function(skills, attribute) {
        values[attribute] = 1
        setEffectValues(attribute)
        values[attribute+'_preview'] = 0
        skills.forEach(function(skill) {
            values[skill] = 0
            setEffectValues(skill)
            values[skill+'_preview'] = 0
        })
    })
    otherEffectTargets.forEach(function(name) {
        setEffectValues(name)
    })
    values['spore_infestation_permanent'] = 0
    values['spore_infestation_temporary'] = 0
    values['encumbrance'] = 0
    values['encumbrance_max'] = 0
    values['encumbrance_penalty'] = 0
    values['total_armor_damage_reduction'] = 0
    values['total_shield_active_defense']  = 0
    values['total_shield_attack_modifier'] = 0
    values['total_shield_passive_defense'] = 0
    values['stowed_is_away'] = 0
    values['in_motion'] = 0
    values['active'] = 0
    values['cover'] = 0
    values['spent_ego'] = 0
}

on('clicked:initialize_player', function() {
    var values = {}
    setDefaultValues(values)
    setAttrs(values)
})

on('clicked:initialize_npc', function() {
    var values = {}
    setDefaultValues(values)
    setAttrs(values)
})


// --- SHEET UPGRADE ---

var upgradeScripts = []

var addUpgradeScript = function(targetVersion, callback) {
    if(upgradeScripts.length === targetVersion-1)
        upgradeScripts.push(callback)
    else
        throw new Error('Invalid upgrade script order')
}

on('sheet:opened', function() {
    getAttrs(['sheet_version'], function(v) {
        if(!isValid(v.sheet_version))
            return

        var currentVersion = toInt(v.sheet_version)
        if(currentVersion === SHEET_VERSION)
            return

        for(; currentVersion < SHEET_VERSION; currentVersion++) {
            console.log('DEGENESIS', 'Upgrading sheet from '+currentVersion+' to '+(currentVersion+1)+' ...')
            upgradeScripts[currentVersion]()
        }
        console.log('DEGENESIS', 'Upgrade complete')
        setAttrs({sheet_version: SHEET_VERSION})
    })
})

addUpgradeScript(1, function() {
    // Rename 'holstered' to 'at hand':

    getSectionIDs('weapon', function(weaponIds) {
        getSectionIDs('armor', function(armorIds) {
            getSectionIDs('equipment', function(equipmentIds) {
                var sectionIdLists = new Map([
                    ['weapon', weaponIds],
                    ['armor', armorIds],
                    ['equipment', equipmentIds]
                ])
                var locationAttributes = getManySectionAttributes('location', sectionIdLists)

                getAttrs(locationAttributes, function(values) {
                    var newValues = {}
                    locationAttributes.forEach(function(locationAttribute) {
                        var location = values[locationAttribute]
                        if(location === 'holstered')
                            newValues[locationAttribute] = 'at hand'
                    })

                    setAttrs(newValues, {silent: true})
                })
            })
        })
    })
})

addUpgradeScript(2, function() {
    // Rename weight to encumbrance:
    getSectionIDs('weapon', function(weaponIds) {
        getSectionIDs('armor', function(armorIds) {
            getSectionIDs('equipment', function(equipmentIds) {
                var sectionIdLists = new Map([
                    ['weapon', weaponIds],
                    ['armor', armorIds],
                    ['equipment', equipmentIds]
                ])
                var weightAttributes      = getManySectionAttributes('weight',      sectionIdLists)
                var encumbranceAttributes = getManySectionAttributes('encumbrance', sectionIdLists)

                getParsedAttrs(weightAttributes, [], function(values) {
                    var newValues = {}
                    weightAttributes.forEach(function(weightAttribute, index) {
                        var encumbranceAttribute = encumbranceAttributes[index]
                        newValues[encumbranceAttribute] = values[weightAttribute]
                        newValues[weightAttribute]      = ''
                    })

                    setAttrs(newValues, {silent: true}, updateTotalEncumbrance)
                })
            })
        })
    })
})

addUpgradeScript(3, function() {
    // Rename _effect_modifier to _effect_modifiers:
    var values = []
    var setEffectValues = function(name) {
        values[name+'_effect_modifiers'] = ''
    }
    characterAttributes.forEach(function(skills, attribute) {
        setEffectValues(attribute)
        skills.forEach(function(skill) {
            setEffectValues(skill)
        })
    })
    otherEffectTargets.forEach(function(name) {
        setEffectValues(name)
    })
    setAttrs(values)
})
