# Attributes

## Core character attributes and skills

|Name|Type|Notes|
|:---|:---|:----|
|`body`|int||
|||
|`athletics`|int||
|`brawl`|int||
|`force`|int||
|`melee`|int||
|`stamina`|int||
|`toughness`|int||
|||
|`agility`|int||
|||
|`crafting`|int||
|`dexterity`|int||
|`navigation`|int||
|`mobility`|int||
|`projectiles`|int||
|`stealth`|int||
|||
|`charisma`|int||
|||
|`arts`|int||
|`conduct`|int||
|`expression`|int||
|`leadership`|int||
|`negotiation`|int||
|`seduction`|int||
|||
|`intellect`|int||
|||
|`artifact_lore`|int||
|`engineering`|int||
|`focus`|int||
|`legends`|int||
|`medicine`|int||
|`science`|int||
|||
|`psyche`|int||
|||
|`cunning`|int||
|`deception`|int||
|`domination`|int||
|`faith`|int||
|`reaction`|int||
|`willpower`|int||
|||
|`instinct`|int||
|||
|`empathy`|int||
|`orienteering`|int||
|`perception`|int||
|`primal`|int||
|`survival`|int||
|`taming`|int||


Derived attributes:

|Name|Type|Notes|
|:---|:---|:----|
|`problem_solving_approach`|string|Either `focus` or `primal`. Updated when the user changes their focus or primal skill.|
|`mental_strength_source`|string|Either `willpower` or `faith`. Updated when the user changes their willpower or faith skill.|


## Character background

|Name|Type|Notes|
|:---|:---|:----|
|`character_name`|string|Roll20 links this with the journals character name.|
|`concept`|string||
|`image`|string|Optional URL pointing to an character image|
|`culture`|string||
|`cult`|string||
|`rank`|string||
|`experience`|int|Unspent experience points|
|`drafts`|int|Chroniclers’ Drafts|
|`dinars`|int||


## Character origins

|Name|Type|Notes|
|:---|:---|:----|
|`allies`|int||
|`authority`|int||
|`network`|int||
|`renown`|int||
|`resources`|int||
|`secrets`|int||


## Chracter health

|Name|Type|Notes|
|:---|:---|:----|
|`ego`|int|Remaining ego points|
|`ego_max`|int|Calculated from `2*(intellect + focus)` or `2*(instinct + primal)` - depending on the `problem_solving_approach`.|
|`spore_infestation`|int|Sum of permanent and temporary infestation: `spore_infestation_permanent + spore_infestation_temporary`|
|`spore_infestation_max`|int|Calculated from `2*(psyche + willpower)` or `2*(psyche + faith)` - depending on the `mental_strength_source`.|
|`spore_infestation_permanent`|int||
|`spore_infestation_temporary`|int||
|`spore_infestation_excess`|int|Infestation points beyond the maximum.|
|`spore_infestation_fill`|int|Internal|
|`spore_infestation_free`|int|Internal|
|`spore_infestation_disabled`|int|Internal|
|`flesh_wounds`|int||
|`flesh_wounds_max`|int|Calculated from `2*(body + toughness)`.|
|`trauma`|int||
|`trauma_max`|int|Calculated from `body + psyche`.|


## General equipment properties

This applies to all kinds of equipment: `weapon`, `armor` and `equipment`.

|Name|Type|Notes|
|:---|:---|:----|
|`*_name`|string||
|`*_description`|string||
|`*_location`|string|Either `at hand`, `stowed` or `away`.|
|`*_encumbrance`|int||
|`*_value`|float|Trade value in drafts or dinars.|
|`*_tech`|int||
|`*_slots`|int||
|`*_slots_max`|int||


## Weapon properties

|Name|Type|Notes|
|:---|:---|:----|
|`weapon_type`|string|`melee` or `ranged`|
|`weapon_skill`|string|Character skill used to wield this weapon.|
|`weapon_attribute`|string|Automatically deduced from `weapon_skill`.|
|`weapon_attribute_expression`|string|Internal|
|`weapon_attribute_notes`|string|Internal|
|`weapon_skill_expression`|string|Internal|
|`weapon_skill_notes`|string|Internal|
|`weapon_handling`|int||
|`weapon_distance_effective`|int|Effective attack distance|
|`weapon_distance_far`|int|"Far shot" distance|
|`weapon_attack_effective_preview`|int|(Effective attack) Dice pool for attacks. Calculated from `attack_modifier + weapon_skill + weapon_handling`.|
|`weapon_attack_far_preview`|int|Calculated: `weapon_attack_preview - 4` if ranged, zero otherwise.|
|`weapon_attack_extreme_preview`|int|Calculated: `weapon_attack_preview - 8` if ranged, zero otherwise.|
|`weapon_active_defense_preview`|int|Calculated from `active_defense_modifier + weapon_skill + weapon_handling` if melee, zero otherwise.|
|`weapon_damage_base`|int||
|`weapon_damage_force_factor`|float||
|`weapon_damage`|int|Calculated from `weapon_damage_base + ceil(weapon_damage_force_factor*(body + force))`.|
|`weapon_ammunition`|int||
|`weapon_ammunition_max`|int||
|`weapon_ammunition_type`|string||


## Armor and shield properties

|Name|Type|Notes|
|:---|:---|:----|
|`armor_type`|string|`armor` or `shield`|
|`armor_damage_reduction`|int|Applies only to armor.|
|`armor_active_defense`|int|Applies only to shields.|
|`armor_passive_defense`|int|Applies only to shields.|
|`armor_attack_modifier`|int|Applies only to shields.|


Derived global attributes:

|Name|Type|Notes|
|:---|:---|:----|
|`total_armor_damage_reduction`|int|Sum of all equipped armor damage reduction (`armor_damage_reduction`).|
|`total_shield_active_defense`|int|Sum of all equipped shields *active* defense (`shield_active_defense`).|
|`total_shield_passive_defense`|int|Sum of all equipped shields *passive* defense (`shield_active_defense`).|
|`total_shield_attack_modifier`|int|Sum of all equipped shields attack modifier (`shield_attack_modifier`).|


## Encumbrance

|Name|Type|Notes|
|:---|:---|:----|
|`encumbrance`|int|Sum of all equipment encumbrance. Affected by `stowed_is_away` and the equipment location.|
|`encumbrance_max`|int|Calculated from `body + force`.|
|`encumbrance_penalty`|int|Encumbrance points beyond the maximum.|
|`stowed_is_away`|bool|(1 means true) Affects how encumbrance is calculated.|


## Combat specific

|Name|Type|Notes|
|:---|:---|:----|
|`initiative`|int|Calculated from `psyche + reaction + spent_ego`.|
|`speed`|int|Calculated from `body + athletics`.|
|`in_motion`|bool|(1 is true) Affects `action_modifier` and `passive_defense`.|
|`active`|bool|(1 is true) "Active and on my feet" Affects `passive_defense`.|
|`cover`|int|Affects `passive_defense`.|
|`spent_ego`|int|Amount of ego points the user is spending in their turn. Affects the `action_modifier`.|
|`action_modifier`|int|Calculated from `-(trauma + encumbrance_penalty + in_motion*2) + spent_ego`.|
|`attack_modifier`|int|Calculated from `action_modifier + total_shield_attack_modifier`.|
|`active_defense_modifier`|int|Calculated from `action_modifier + total_shield_active_defense`.|
|`passive_defense`|int|Calculated from `active + in_motion + cover + total_shield_passive_defense`|
|`dodge`|int|Dice pool for dodging attacks.  It's calculated from `agility + mobility + active_defense_modifier`.|


## Effect properties

|Name|Type|Notes|
|:---|:---|:----|
|`effect_origin`|string||
|`effect_condition`|string||
|`effect_state`|bool||
|`effect_attribute_*_name`|string||
|`effect_attribute_*_modifier`|int||
|`effect_attribute_*_query`|string||
|`effect_attribute_*_note`|string||


|Name|Type|Notes|
|:---|:---|:----|
|`*_effect_modifier`|int||
|`*_effect_queries`|string||
|`*_effect_notes`|string||


## Other

|Name|Type|Notes|
|:---|:---|:----|
|`sheet_version`|int|Used for version upgrades.|
|`whisper_roll_prefix`|string||
|`custom_modifier_query`|string||
|`translation_*`|string|Sometimes these are needed to display translated text.|
