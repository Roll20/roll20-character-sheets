	// ==============================
// === TABLES XP ===============
// ==============================
const xpSkillTable = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const xpBaseCosts = [0, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 90, 100];

// ==============================
// === 1. COMPÉTENCES COMMUNES =
// ==============================
const commonSkills = {
  armessimples: "arm", camouflage: "nin", cac: "tai", esquive: "tai",
  gensou: "gen", henge: "nin", kawarimi: "gen", mental: "esp",
  parade: "arm", physique: "cor", survie: "nin", vigilance: "nin"
};

for (const skill in commonSkills) {
  const baseAttr = commonSkills[skill];
  on(`change:scmp_${skill} change:${baseAttr} sheet:opened`, () => {
    getAttrs([`scmp_${skill}`, baseAttr], values => {
      const base = parseInt(values[baseAttr]) || 0;
      const mod = parseInt(values[`scmp_${skill}`]) || 0;
      setAttrs({ [`stcmp_${skill}`]: base + mod });
    });
  });
}

// =========================================
// === 2. XP DES CARACTÉRISTIQUES (base) ===
// =========================================
const baseAttrs = ['cor', 'esp', 'arm', 'tai', 'nin', 'gen', 'lign'];

baseAttrs.forEach(attr => {
  on(`change:${attr}`, () => {
    getAttrs([attr], values => {
      let score = parseInt(values[attr]) || 1;
      score = Math.min(score, xpBaseCosts.length - 1);
      const cost = xpBaseCosts.slice(1, score).reduce((a, b) => a + b, 0);
      setAttrs({ [`xp_${attr}`]: cost });
    });
  });
});

// ===========================================
// === 3. CALCUL DU CHAKRA TOTAL & RESTANT ===
// ===========================================
on("change:cor change:esp change:chakra_colossal change:chakra_endurci change:chakra_imperieux sheet:opened", () => {
  getAttrs(["cor", "esp", "chakra_colossal", "chakra_endurci", "chakra_imperieux", "chakra_restant"], values => {
    const toInt = v => parseInt(v) || 0;

    const totalChakra =
      (toInt(values.cor) * 50) +
      (toInt(values.esp) * 50) +
      (toInt(values.chakra_colossal) * 100) +
      (toInt(values.chakra_endurci) * 50) +
      (toInt(values.chakra_imperieux) * 50);

    const actuel = parseInt(values.chakra_restant);
    const restant = isNaN(actuel) || actuel === 0 ? totalChakra : actuel;

    setAttrs({
      chakra: totalChakra,
      chakra_restant: restant
    });
  });
});

// ===============================
// === 4. STATS SECONDAIRES =====
// ===============================
on("change:cor change:esp change:arm change:tai change:nin change:gen change:chakra change:chakra_endurci change:chakra_imperieux change:chakra_fulgurant change:stcmp_physique sheet:opened", () => {
  getAttrs([
    "cor", "esp", "arm", "tai", "nin", "gen", "chakra", "chakra_endurci",
    "chakra_imperieux", "chakra_fulgurant", "stcmp_physique"
  ], values => {
    const toInt = v => parseInt(values[v]) || 0;

    const cor = toInt("cor");
    const esp = toInt("esp");
    const arm = toInt("arm");
    const tai = toInt("tai");

    const controle = cor + esp;
    let spe = 1;
    if (controle >= 5 && controle <= 9) spe = 2;
    else if (controle >= 10 && controle <= 13) spe = 4;
    else if (controle >= 14 && controle <= 19) spe = 6;
    else if (controle >= 20) spe = 9;

    const initiative = toInt("stcmp_physique") + (toInt("chakra_fulgurant") * 2);
    const vigueur = cor + 2 + toInt("chakra_endurci");
    const caractere = esp + 2 + toInt("chakra_imperieux");
    const regen = Math.floor(toInt("chakra") * (spe * 0.01));
    const interceptions_arm = Math.floor(arm / 2);
    const interceptions_tai = Math.floor(tai / 2);

    setAttrs({
      controle,
      specialisation_chakra: spe,
      initiative,
      vigueur,
      caractere,
      regen,
      interceptions_arm,
      interceptions_tai
    });
  });
});
on("change:cor change:esp change:chakra_colossal change:chakra_endurci change:chakra_imperieux change:bonus_chakra sheet:opened", () => {
  getAttrs(["cor", "esp", "chakra_colossal", "chakra_endurci", "chakra_imperieux", "chakra_restant", "bonus_chakra"], values => {
    const toInt = v => parseInt(v) || 0;

    const totalChakra =
      (toInt(values.cor) * 50) +
      (toInt(values.esp) * 50) +
      (toInt(values.chakra_colossal) * 100) +
      (toInt(values.chakra_endurci) * 50) +
      (toInt(values.chakra_imperieux) * 50) +
      toInt(values.bonus_chakra); // Bonus manuel

    const actuel = parseInt(values.chakra_restant);
    const restant = isNaN(actuel) || actuel === 0 ? totalChakra : actuel;

    setAttrs({
      chakra: totalChakra,
      chakra_restant: restant
    });
  });
});

on("change:cor change:esp change:chakra_colossal change:chakra_endurci change:chakra_imperieux change:bonus_chakra sheet:opened", () => {
  getAttrs(["cor", "esp", "chakra_colossal", "chakra_endurci", "chakra_imperieux", "chakra_restant", "bonus_chakra"], values => {
    const toInt = v => parseInt(v) || 0;

    const totalChakra =
      (toInt(values.cor) * 50) +
      (toInt(values.esp) * 50) +
      (toInt(values.chakra_colossal) * 100) +
      (toInt(values.chakra_endurci) * 50) +
      (toInt(values.chakra_imperieux) * 50) +
      toInt(values.bonus_chakra); // Bonus manuel

    const actuel = parseInt(values.chakra_restant);
    const restant = isNaN(actuel) || actuel === 0 ? totalChakra : actuel;

    setAttrs({
      chakra: totalChakra,
      chakra_restant: restant
    });
  });
});

on("change:cor change:esp change:arm change:tai change:nin change:gen change:chakra change:chakra_endurci change:chakra_imperieux change:chakra_fulgurant change:stcmp_physique change:bonus_vigueur change:bonus_caractere sheet:opened", () => {
  getAttrs([
    "cor", "esp", "arm", "tai", "nin", "gen", "chakra", "chakra_endurci",
    "chakra_imperieux", "chakra_fulgurant", "stcmp_physique",
    "bonus_vigueur", "bonus_caractere"
  ], values => {
    const toInt = v => parseInt(values[v]) || 0;

    const cor = toInt("cor");
    const esp = toInt("esp");
    const arm = toInt("arm");
    const tai = toInt("tai");

    const controle = cor + esp;
    let spe = 1;
    if (controle >= 5 && controle <= 9) spe = 2;
    else if (controle >= 10 && controle <= 13) spe = 4;
    else if (controle >= 14 && controle <= 19) spe = 6;
    else if (controle >= 20) spe = 9;

    const initiative = toInt("stcmp_physique") + (toInt("chakra_fulgurant") * 2);
    const vigueur = cor + 2 + toInt("chakra_endurci") + toInt("bonus_vigueur");
    const caractere = esp + 2 + toInt("chakra_imperieux") + toInt("bonus_caractere");
    const regen = Math.floor(toInt("chakra") * (spe * 0.01));
    const interceptions_arm = Math.floor(arm / 2);
    const interceptions_tai = Math.floor(tai / 2);

    setAttrs({
      controle,
      specialisation_chakra: spe,
      initiative,
      vigueur,
      caractere,
      regen,
      interceptions_arm,
      interceptions_tai
    });
  });
});

// ===============================
// === 5. DÉGÂTS ================
// ===============================
on("change:cor change:arm change:tai change:gen change:nin change:chakra_acere change:chakra_explosif change:bonus_degats_gen change:bonus_degats_nin change:degats_tai_bonus change:degats_arm_bonus sheet:opened", () => {
  getAttrs([
    "cor", "arm", "tai", "gen", "nin",
    "chakra_acere", "chakra_explosif",
    "bonus_degats_gen", "bonus_degats_nin",
    "degats_tai_bonus", "degats_arm_bonus"
  ], values => {
    const toInt = v => parseInt(values[v]) || 0;

    const baseArm = toInt("cor") + toInt("arm") + (toInt("chakra_acere") * 2);
    const baseTai = toInt("cor") + toInt("tai") + (toInt("chakra_explosif") * 2);
    const baseGen = toInt("gen") + 1;
    const baseNin = toInt("nin") + 1;

    setAttrs({
      degats_arm_base: baseArm,
      degats_tai_base: baseTai,
      degats_gen_base: baseGen,
      degats_nin_base: baseNin,
      degats_arm: baseArm + toInt("degats_arm_bonus"),
      degats_tai: baseTai + toInt("degats_tai_bonus"),
      degats_gen: baseGen + toInt("bonus_degats_gen"),
      degats_nin: baseNin + toInt("bonus_degats_nin")
    });
  });
});

// ============================================
// === 6. XP COMPÉTENCES COMMUNES ============
// ============================================
Object.keys(commonSkills).forEach(skill => {
  on(`change:scmp_${skill}`, () => {
    getAttrs([`scmp_${skill}`], values => {
      const score = Math.min(parseInt(values[`scmp_${skill}`]) || 1, xpSkillTable.length);
      const xp = xpSkillTable.slice(1, score).reduce((a, b) => a + b, 0);
      setAttrs({ [`xp_scmp_${skill}`]: xp });
    });
  });
});

// ==============================================
// === 7. XP DES COMPÉTENCES SPÉCIFIQUES (REP) ===
// ==============================================
on("change:repeating_cmpspe:scmps change:repeating_cmpspe:nom_cmps", function (eventInfo) {
  const rowId = eventInfo.sourceAttribute.split("_")[2];
  getAttrs([`repeating_cmpspe_${rowId}_nom_cmps`, `repeating_cmpspe_${rowId}_scmps`], function (values) {
    const attrBase = values[`repeating_cmpspe_${rowId}_nom_cmps`];
    const mod = parseInt(values[`repeating_cmpspe_${rowId}_scmps`]) || 0;

    getAttrs([attrBase], function (baseValues) {
      const base = parseInt(baseValues[attrBase]) || 0;
      const total = base + mod;
      const xp = mod > 1 ? xpSkillTable.slice(1, mod).reduce((a, b) => a + b, 0) : 0;


      setAttrs({
        [`repeating_cmpspe_${rowId}_stcmps`]: total,
        [`repeating_cmpspe_${rowId}_xp_cmps`]: xp
      });
    });
  });
});

// =========================================
// === 8. XP TOTALE UTILISÉE & RESTANTE ====
// =========================================
function calculateTotalXP() {
  getSectionIDs("repeating_cmpspe", ids => {
    const attrs = ["xp_total", ...baseAttrs.map(a => `xp_${a}`), ...Object.keys(commonSkills).map(s => `xp_scmp_${s}`)];
    ids.forEach(id => attrs.push(`repeating_cmpspe_${id}_xp_cmps`));

    getAttrs(attrs, values => {
      let totalXP = 0;

      baseAttrs.forEach(attr => totalXP += parseInt(values[`xp_${attr}`]) || 0);
      Object.keys(commonSkills).forEach(skill => totalXP += parseInt(values[`xp_scmp_${skill}`]) || 0);
      ids.forEach(id => totalXP += parseInt(values[`repeating_cmpspe_${id}_xp_cmps`]) || 0);

      const total = parseInt(values.xp_total) || 0;
      setAttrs({
        xp_utilisee: totalXP,
        xp_restante: total - totalXP
      });
    });
  });
}
on("change:xp_total sheet:opened", calculateTotalXP);
baseAttrs.forEach(attr => on(`change:xp_${attr}`, calculateTotalXP));
Object.keys(commonSkills).forEach(skill => on(`change:xp_scmp_${skill}`, calculateTotalXP));
on("change:repeating_cmpspe:xp_cmps", calculateTotalXP);

// ===============================
// === LOGO DU VILLAGE ======
// ===============================

on("change:village sheet:opened", () => {
	getAttrs(["village"], values => {
	  const logoURL = values.village || "";
	  setAttrs({ village_logo: logoURL });
	});
  });



// =====================================
// === 10. VALIDATION SPÉ CHAKRA =======
// =====================================
on("change:chakra_acere change:chakra_colossal change:chakra_endurci change:chakra_explosif change:chakra_fulgurant change:chakra_hereditaire change:chakra_imperieux change:chakra_inepuisable change:chakra_puissant change:chakra_remanent change:specialisation_chakra", () => {
  const chakraAttrs = [
    "chakra_acere", "chakra_colossal", "chakra_endurci", "chakra_explosif",
    "chakra_fulgurant", "chakra_hereditaire", "chakra_imperieux", "chakra_inepuisable",
    "chakra_puissant", "chakra_remanent", "specialisation_chakra"
  ];

  getAttrs(chakraAttrs, values => {
    const toInt = v => parseInt(values[v]) || 0;

    const total =
      toInt("chakra_acere") + toInt("chakra_colossal") + toInt("chakra_endurci") +
      toInt("chakra_explosif") + toInt("chakra_fulgurant") + toInt("chakra_hereditaire") +
      toInt("chakra_imperieux") + toInt("chakra_inepuisable") +
      toInt("chakra_puissant") + toInt("chakra_remanent");

    const max = toInt("specialisation_chakra");

    setAttrs({ chakra_specialisation_total: total });

    if (total > max) {
      setTimeout(() => {
        alert(`⚠️ Vous avez dépassé la limite de spécialisations (${max}). Veuillez ajuster vos points.`);
      }, 50);
    }

    const fields = chakraAttrs.slice(0, -1); // sans specialisation_chakra
    fields.forEach(name => {
      const input = document.querySelector(`input[name="attr_${name}"]`);
      if (input) {
        input.classList.toggle("over-limit", total > max);
      }
    });
  });
});
			  
on("change:prenom", () => {
	getAttrs(["prenom"], values => {
	  const nom = values.prenom || "";
	  setAttrs({ character_name: nom });
	});
  });	  
