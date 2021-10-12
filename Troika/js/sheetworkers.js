// When the skill changes we need to update the SkillRollTotal
on('change:skill', (e) => {
    getAttrs(["skillRollModifier"], (v) => {
        const skillRollModifier = (v.skillRollModifier === undefined) ? 0 : v.skillRollModifier;
        const newValue = (e.newValue === undefined) ? 0 : e.newValue;
        setAttrs({ skillRollTotal: Number(skillRollModifier) + Number(newValue) });
    });
});

// When the skillRollModifier changes we need to update the SkillRollTotal
on('change:skillRollModifier', (e) => {
    getAttrs(["skill"], (v) => {
        const skill = (v.skill === undefined) ? 0 : v.skill;
        const newValue = (e.newValue === undefined) ? 0 : e.newValue;
        setAttrs({ skillRollTotal: Number(skill) + Number(newValue) });
    });
});

// When the skillRollTotal changes Update the Adv Skill Rows
on('change:skillRollTotal', (e) => {
    getSectionIDs('repeating_skills', rowids => {
        const newValue = (e.newValue === undefined) ? 0 : e.newValue;
        const output = {};
        rowids.forEach(id => output[`repeating_skills_${id}_skillValue`] = Number(newValue));
        setAttrs(output);
    });
});

// When skills repeating row skillRank changes update the Total
on("change:repeating_skills:skillRank", (e) => {
    getAttrs(["repeating_skills_skillValue", "skillRollTotal"], (v) => {
        const skillRollTotal = (v.skillRollTotal === undefined) ? 0 : v.skillRollTotal;
        const newValue = (e.newValue === undefined) ? 0 : e.newValue;
        const output = {};
        output["repeating_skills_skillValue"] = Number(skillRollTotal);
        output["repeating_skills_skillTotal"] = Number(skillRollTotal) + Number(newValue);
        setAttrs(output);
    })
});

// When skills repeating row skillValue changes update the Total
on("change:repeating_skills:skillValue", (e) => {
    getAttrs(["repeating_skills_skillRank"], (v) => {
        const skillRank = (v.repeating_skills_skillRank === undefined) ? 0 : v.repeating_skills_skillRank;
        const newValue = (e.newValue === undefined) ? 0 : e.newValue;
        const output = {};
        output["repeating_skills_skillTotal"] = Number(skillRank) + Number(newValue);
        setAttrs(output);
    })
});

// Button Click: Add/Remove Skill
on("clicked:addSkill", () => {
    getAttrs(["skill"], (v) => {
        setAttrs({ skill: Number(v.skill)+1 });
    });
});
on("clicked:subSkill", () => {
    getAttrs(["skill"], (v) => {
        setAttrs({ skill: Math.max(0, Number(v.skill)-1) });
    });
});
// Button Click: Add/Remove Skill Modifier
on("clicked:addSkillRoll", () => {
    getAttrs(["skillRollModifier"], (v) => {
        setAttrs({ skillRollModifier: Number(v.skillRollModifier)+1 });
    });
});
on("clicked:subSkillRoll", () => {
    getAttrs(["skillRollModifier"], (v) => {
        setAttrs({ skillRollModifier: Number(v.skillRollModifier)-1 });
    });
});
// Button Click: Add/Remove Damage Modifier
on("clicked:addDamageRoll", () => {
    getAttrs(["damageRollModifier"], (v) => {
        const damageRollModifier = (v.damageRollModifier === undefined) ? 0 : v.damageRollModifier;
        setAttrs({ damageRollModifier: Number(damageRollModifier)+1 });
    });
});
on("clicked:subDamageRoll", () => {
    getAttrs(["damageRollModifier"], (v) => {
        const damageRollModifier = (v.damageRollModifier === undefined) ? 0 : v.damageRollModifier;
        setAttrs({ damageRollModifier: Number(damageRollModifier)-1 });
    });
});
// Button Click: Add/Remove Stamina
on("clicked:addStamina", () => {
    getAttrs(["stamina", "staminaCurrent"], (v) => {
        setAttrs({ staminaCurrent: Math.min(Number(v.staminaCurrent)+1, Number(v.stamina)) });
    });
});
on("clicked:subStamina", () => {
    getAttrs(["stamina", "staminaCurrent"], (v) => {
        setAttrs({ staminaCurrent: Math.max(0, Number(v.staminaCurrent)-1) });
    });
});
// Button Click: Add/Remove Luck
on("clicked:addLuck", () => {
    getAttrs(["luck", "luckCurrent"], (v) => {
        setAttrs({ luckCurrent: Math.min(Number(v.luckCurrent)+1, Number(v.luck)) });
    });
});
on("clicked:subLuck", () => {
    getAttrs(["luck", "luckCurrent"], (v) => {
        setAttrs({ luckCurrent: Math.max(0, Number(v.luckCurrent)-1) });
    });
});

// Button Click: Inventory Move Up Down
let buttonList = [];
for (let idx = 1; idx <= 12; idx++) {
    buttonList.push(`inventory${idx}`);
    on(`clicked:inventoryDown${idx}`, () => {
        getAttrs(buttonList, (e) => {
            const currentIdx = idx;
            const copyToIdx = currentIdx+1;
            const invCurrent = "inventory"+currentIdx;
            const InvTo = "inventory"+copyToIdx;
            const objAttrs = {[invCurrent]: e[InvTo], [InvTo]: e[invCurrent]}
            setAttrs(objAttrs);
        });
    });
    on(`clicked:inventoryUp${idx}`, () => {
        getAttrs(buttonList, (e) => {
            const currentIdx = idx;
            const copyToIdx = currentIdx-1;
            const invCurrent = "inventory"+currentIdx;
            const InvTo = "inventory"+copyToIdx;
            const objAttrs = {[invCurrent]: e[InvTo], [InvTo]: e[invCurrent]}
            setAttrs(objAttrs);
        });
    });
}
