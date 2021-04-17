import {
    calculateAbilityScore,
    calculateLinkedAttributeValue
} from '../src/attributes'
import {
    test,
    expect
} from '@jest/globals'

// Calculate attribute linked value tests
test('attribute with value greater than 10 should have linked value of one third, rounded down', () => {
    expect(calculateLinkedAttributeValue(17)).toBe(5)
})

test('attribute with value less than 1 should have linked value of -4', () => {
    expect(calculateLinkedAttributeValue(0)).toBe(-4)
    expect(calculateLinkedAttributeValue(-7)).toBe(-4)
})

test('attribute with value of 1 should have linked value of -2', () => {
    expect(calculateLinkedAttributeValue(1)).toBe(-2)
})

test('attribute with value of 2 or 3 should have linked value of -1', () => {
    expect(calculateLinkedAttributeValue(2)).toBe(-1)
    expect(calculateLinkedAttributeValue(3)).toBe(-1)
})

test('attribute with value of 4 - 6 should have linked value of 0', () => {
    expect(calculateLinkedAttributeValue(4)).toBe(0)
    expect(calculateLinkedAttributeValue(5)).toBe(0)
    expect(calculateLinkedAttributeValue(6)).toBe(0)
})

test('attribute with value of 7 - 9 should have linked value of 1', () => {
    expect(calculateLinkedAttributeValue(7)).toBe(1)
    expect(calculateLinkedAttributeValue(8)).toBe(1)
    expect(calculateLinkedAttributeValue(9)).toBe(1)
})

test('attribute with value of 10 should have linked value of 2', () => {
    expect(calculateLinkedAttributeValue(10)).toBe(2)
})

// Calculate ability score tests
test('should return undefined if attribute value is not number', () => {
    expect(calculateAbilityScore({ newValue: "potato", })).toBe(undefined)
    expect(calculateAbilityScore({})).toBe(undefined)
    expect(calculateAbilityScore({ newValue: [], })).toBe(undefined)
    expect(calculateAbilityScore({ newValue: {}, })).toBe(undefined)
    expect(calculateAbilityScore({ newValue: () => {}, })).toBe(undefined)
})

test('should calculate attribute value and linked attribute value for each attribute type, or return error for unknown attribute type', () => {
    // strength
    expect(calculateAbilityScore({ sourceAttribute: "strength_xp", newValue: 200, })).toStrictEqual({
        name: "strength",
        value: 2,
        linkName: "strength_link",
        linkValue: -1,
    })

    // body
    expect(calculateAbilityScore({ sourceAttribute: "body_xp", newValue: 200, })).toStrictEqual({
        name: "body",
        value: 2,
        linkName: "body_link",
        linkValue: -1,
    })

    // reflex
    expect(calculateAbilityScore({ sourceAttribute: "reflex_xp", newValue: 200, })).toStrictEqual({
        name: "reflex",
        value: 2,
        linkName: "reflex_link",
        linkValue: -1,
    })

    // dexterity
    expect(calculateAbilityScore({ sourceAttribute: "dexterity_xp", newValue: 200, })).toStrictEqual({
        name: "dexterity",
        value: 2,
        linkName: "dexterity_link",
        linkValue: -1,
    })

    // intelligence
    expect(calculateAbilityScore({ sourceAttribute: "intelligence_xp", newValue: 200, })).toStrictEqual({
        name: "intelligence",
        value: 2,
        linkName: "intelligence_link",
        linkValue: -1,
    })

    // will
    expect(calculateAbilityScore({ sourceAttribute: "will_xp", newValue: 200, })).toStrictEqual({
        name: "will",
        value: 2,
        linkName: "will_link",
        linkValue: -1,
    })

    // charisma
    expect(calculateAbilityScore({ sourceAttribute: "charisma_xp", newValue: 200, })).toStrictEqual({
        name: "charisma",
        value: 2,
        linkName: "charisma_link",
        linkValue: -1,
    })

    // edge
    expect(calculateAbilityScore({ sourceAttribute: "edge_xp", newValue: 200, })).toStrictEqual({
        name: "edge",
        value: 2,
        linkName: "edge_link",
        linkValue: -1,
    })

    // unknown
    expect(calculateAbilityScore({ sourceAttribute: "psychic_xp", newValue: 200, })).toBe(undefined)
})