import {
    test,
    expect
} from '@jest/globals'
import {
    calculateSkillLevel,
    getSkill,
    getSkillDisplayName
} from '../src/skills'

// Get normal or tiered skill
test('should get basic tiered skill', () => {
    expect(getSkill('computers', 3, true)).toStrictEqual({
        "linkedAttributes": ["intelligence_link", ],
        "targetNumber": 8,
        "complexity": "CB",
        "subSkills": false,
        "displayName": {
            "computers": "Computers",
        },
    })
})

test('should get advanced tiered skill', () => {
    expect(getSkill('martial', 4, true)).toStrictEqual({
        "linkedAttributes": ["reflex_link", "dexterity_link", ],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "martial_arts": "Martial Arts",
        },
    })
})

test('should get normal skill', () => {
    expect(getSkill('leadership', 7, false)).toStrictEqual({
        "linkedAttributes": ["will_link", "charisma_link", ],
        "targetNumber": 8,
        "complexity": "SA",
        "subSkills": false,
        "displayName": {
            "leadership": "Leadership",
        },
    })
})

// Get skill display name
test('should get subkill with forward slash for skill with specific subskill', () => {
    expect(
            getSkillDisplayName({
                    "linkedAttributes": ["intelligence_link", "charisma_link", ],
                    "targetNumber": 8,
                    "complexity": "SA",
                    "subSkills": true,
                    "displayName": {
                        "language": "Language",
                    },
                },
                "language",
                "Japanese"
            )
        )
        .toBe("Language/Japanese")
})

test('should include specialization in skill name', () => {
    expect(
            getSkillDisplayName({
                    "linkedAttributes": ["dexterity_link", "intelligence_link", ],
                    "targetNumber": 8,
                    "complexity": "SA",
                    "subSkills": false,
                    "displayName": {
                        "forgery": "Forgery",
                    },
                },
                "forgery",
                "Government Documents"
            )
        )
        .toBe("Forgery (Government Documents)")
})

test('should return skill display name', () => {
    expect(
            getSkillDisplayName({
                    "linkedAttributes": ["intelligence_link", ],
                    "targetNumber": 7,
                    "complexity": "SB",
                    "subSkills": false,
                    "displayName": {
                        "navigation_air": "Navigation/Air",
                        "navigation_ground": "Navigation/Ground",
                        "navigation_kf_jump": "Navigation/K-F Jump",
                        "navigation_sea": "Navigation/Sea",
                        "navigation_space": "Navigation/Space",
                    },
                },
                "navigation_sea",
                undefined
            )
        )
        .toBe("Navigation/Sea")
    expect(
            getSkillDisplayName({
                    "linkedAttributes": ["strength_link", ],
                    "targetNumber": 7,
                    "complexity": "SB",
                    "subSkills": false,
                    "displayName": {
                        "swimming": "Swimming",
                    },
                },
                "swimming",
                ""
            )
        )
        .toBe("Swimming")
})

// Calculate skill level
test('should be skill level of -1', () => {
    // normal
    expect(calculateSkillLevel(19, 0)).toBe(-1)

    // slow learner
    expect(calculateSkillLevel(23, 1)).toBe(-1)

    // fast learner
    expect(calculateSkillLevel(15, -1)).toBe(-1)
})

test('should be skill level of 0', () => {
    // normal
    expect(calculateSkillLevel(20, 0)).toBe(0)
    expect(calculateSkillLevel(29, 0)).toBe(0)

    // slow learner
    expect(calculateSkillLevel(24, 1)).toBe(0)
    expect(calculateSkillLevel(35, 1)).toBe(0)

    // fast learner
    expect(calculateSkillLevel(16, -1)).toBe(0)
    expect(calculateSkillLevel(23, -1)).toBe(0)
})

test('should be skill level of 1', () => {
    // normal
    expect(calculateSkillLevel(30, 0)).toBe(1)
    expect(calculateSkillLevel(49, 0)).toBe(1)

    // slow learner
    expect(calculateSkillLevel(36, 1)).toBe(1)
    expect(calculateSkillLevel(59, 1)).toBe(1)

    // fast learner
    expect(calculateSkillLevel(24, -1)).toBe(1)
    expect(calculateSkillLevel(39, -1)).toBe(1)
})

test('should be skill level of 2', () => {
    // normal
    expect(calculateSkillLevel(50, 0)).toBe(2)
    expect(calculateSkillLevel(79, 0)).toBe(2)

    // slow learner
    expect(calculateSkillLevel(60, 1)).toBe(2)
    expect(calculateSkillLevel(95, 1)).toBe(2)

    // fast learner
    expect(calculateSkillLevel(40, -1)).toBe(2)
    expect(calculateSkillLevel(63, -1)).toBe(2)
})

test('should be skill level of 3', () => {
    // normal
    expect(calculateSkillLevel(80, 0)).toBe(3)
    expect(calculateSkillLevel(119, 0)).toBe(3)

    // slow learner
    expect(calculateSkillLevel(96, 1)).toBe(3)
    expect(calculateSkillLevel(143, 1)).toBe(3)

    // fast learner
    expect(calculateSkillLevel(64, -1)).toBe(3)
    expect(calculateSkillLevel(95, -1)).toBe(3)
})

test('should be skill level of 4', () => {
    // normal
    expect(calculateSkillLevel(120, 0)).toBe(4)
    expect(calculateSkillLevel(169, 0)).toBe(4)

    // slow learner
    expect(calculateSkillLevel(144, 1)).toBe(4)
    expect(calculateSkillLevel(203, 1)).toBe(4)

    // fast learner
    expect(calculateSkillLevel(96, -1)).toBe(4)
    expect(calculateSkillLevel(135, -1)).toBe(4)
})

test('should be skill level of 5', () => {
    // normal
    expect(calculateSkillLevel(170, 0)).toBe(5)
    expect(calculateSkillLevel(229, 0)).toBe(5)

    // slow learner
    expect(calculateSkillLevel(204, 1)).toBe(5)
    expect(calculateSkillLevel(275, 1)).toBe(5)

    // fast learner
    expect(calculateSkillLevel(136, -1)).toBe(5)
    expect(calculateSkillLevel(183, -1)).toBe(5)
})

test('should be skill level of 6', () => {
    // normal
    expect(calculateSkillLevel(230, 0)).toBe(6)
    expect(calculateSkillLevel(299, 0)).toBe(6)

    // slow learner
    expect(calculateSkillLevel(276, 1)).toBe(6)
    expect(calculateSkillLevel(359, 1)).toBe(6)

    // fast learner
    expect(calculateSkillLevel(184, -1)).toBe(6)
    expect(calculateSkillLevel(239, -1)).toBe(6)
})

test('should be skill level of 7', () => {
    // normal
    expect(calculateSkillLevel(300, 0)).toBe(7)
    expect(calculateSkillLevel(379, 0)).toBe(7)

    // slow learner
    expect(calculateSkillLevel(360, 1)).toBe(7)
    expect(calculateSkillLevel(455, 1)).toBe(7)

    // fast learner
    expect(calculateSkillLevel(240, -1)).toBe(7)
    expect(calculateSkillLevel(303, -1)).toBe(7)
})

test('should be skill level of 8', () => {
    // normal
    expect(calculateSkillLevel(380, 0)).toBe(8)
    expect(calculateSkillLevel(469, 0)).toBe(8)

    // slow learner
    expect(calculateSkillLevel(456, 1)).toBe(8)
    expect(calculateSkillLevel(563, 1)).toBe(8)

    // fast learner
    expect(calculateSkillLevel(304, -1)).toBe(8)
    expect(calculateSkillLevel(375, -1)).toBe(8)
})

test('should be skill level of 9', () => {
    // normal
    expect(calculateSkillLevel(470, 0)).toBe(9)
    expect(calculateSkillLevel(569, 0)).toBe(9)

    // slow learner
    expect(calculateSkillLevel(564, 1)).toBe(9)
    expect(calculateSkillLevel(683, 1)).toBe(9)

    // fast learner
    expect(calculateSkillLevel(376, -1)).toBe(9)
    expect(calculateSkillLevel(455, -1)).toBe(9)
})

test('should be skill level of 10', () => {
    // normal
    expect(calculateSkillLevel(570, 0)).toBe(10)

    // slow learner
    expect(calculateSkillLevel(684, 1)).toBe(10)

    // fast learner
    expect(calculateSkillLevel(456, -1)).toBe(10)
})