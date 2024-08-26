const traitUses = ["trait1_uses", "trait2_uses", "trait3_uses", "trait4_uses"];
const traitChecks = ["trait1_checks", "trait2_checks", "trait3_checks", "trait4_checks"];

const abilityPasses = abilities.map(a => a + "_pass");
const abilityFails = abilities.map(a => a + "_fail");

const skillPasses = skills.map(s => s + "_pass");
const skillFails = skills.map(s => s + "_fail");
const skillBl = skills.map(s => s + "_bl");

const customSkillPasses = [];
const customSkillFails = [];
const customSkillBl = [];

for (let i = 1; i <= 5; i++) {
  customSkillPasses.push("skill" + i + "_pass");
  customSkillFails.push("skill" + i + "_fail");
  customSkillBl.push("skill" + i + "_bl");
}

const allListeners = [].concat(...traitUses, ...traitChecks, ...abilityPasses, ...abilityFails, ...skillPasses, ...skillFails, ...skillBl, ...customSkillPasses, ...customSkillFails, ...customSkillBl)

allListeners.forEach(function (value) {
  on(`clicked:${value}`, function (event) {
    console.log(`clicked:${value}`);
    setAttrs({
      [value]: event.htmlAttributes.value
    });
  });
});
