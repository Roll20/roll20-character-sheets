"use strict";

/* eslint-disable no-restricted-syntax */

/* eslint-disable guard-for-in */

/* eslint-disable object-shorthand */

/* eslint-disable camelcase */

/* eslint-disable max-len */

/* eslint-disable default-case */

/* eslint-disable prefer-destructuring */

/* eslint-disable no-use-before-define */

/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
on('change:armure', function _callee(newArmure) {
  var armureName, dArmureModif, dArmureActuel, listAttrs, attrs, warmaster150, warmaster250, armureActuel, energieActuel, armureModif, energieModif, cdfModif, armurePJMax, energiePJMax, cdfPJMax, totalArmure, totalEnergie, totalCdf, sTete, sBG, sTorse, sJG, sBD, sJD, newAttrs;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          armureName = newArmure.newValue;
          dArmureModif = listDonneesArmures.map(function (a) {
            return "".concat(armureName, "-").concat(a, "-modif");
          });
          dArmureActuel = listDonneesArmures.map(function (a) {
            return "".concat(armureName, "-").concat(a, "-actuel");
          });
          listAttrs = ['warmaster150PG', 'warmaster250PG'];
          listAttrs = listAttrs.concat(dArmureModif, dArmureActuel);
          _context.next = 7;
          return regeneratorRuntime.awrap(getAttrsAsync(listAttrs));

        case 7:
          attrs = _context.sent;
          warmaster150 = +attrs.warmaster150PG;
          warmaster250 = +attrs.warmaster250PG;
          armureActuel = +attrs["".concat(armureName, "-armure-actuel")] || 0;
          energieActuel = +attrs["".concat(armureName, "-energie-actuel")] || 0;
          armureModif = +attrs["".concat(armureName, "-armure-modif")] || 0;
          energieModif = +attrs["".concat(armureName, "-energie-modif")] || 0;
          cdfModif = +attrs["".concat(armureName, "-cdf-modif")] || 0;
          armurePJMax = +dataArmure[armureName].armureMax || 0;
          energiePJMax = +dataArmure[armureName].energieMax || 0;
          cdfPJMax = +dataArmure[armureName].cdfMax || 0;
          totalArmure = 0;
          totalEnergie = 0;
          totalCdf = 0;
          totalArmure = armurePJMax + armureModif;
          totalCdf = cdfPJMax + cdfModif;
          if (armureName === 'warmaster') totalEnergie = energiePJMax + warmaster150 + warmaster250 + energieModif;else {
            totalEnergie = energiePJMax + energieModif;
          }
          sTete = 0;
          sBG = 0;
          sTorse = 0;
          sJG = 0;
          sBD = 0;
          sJD = 0;
          _context.t0 = armureName;
          _context.next = _context.t0 === 'barbarian' ? 33 : _context.t0 === 'bard' ? 40 : _context.t0 === 'berserk' ? 47 : _context.t0 === 'druid' ? 54 : _context.t0 === 'monk' ? 61 : _context.t0 === 'necromancer' ? 68 : _context.t0 === 'paladin' ? 75 : _context.t0 === 'priest' ? 82 : _context.t0 === 'psion' ? 89 : _context.t0 === 'ranger' ? 96 : _context.t0 === 'rogue' ? 103 : _context.t0 === 'shaman' ? 110 : _context.t0 === 'sorcerer' ? 117 : _context.t0 === 'warlock' ? 124 : _context.t0 === 'warmaster' ? 131 : _context.t0 === 'warrior' ? 138 : _context.t0 === 'wizard' ? 145 : 152;
          break;

        case 33:
          sTete = 5;
          sBG = 5;
          sTorse = 8;
          sJG = 5;
          sBD = 5;
          sJD = 5;
          return _context.abrupt("break", 152);

        case 40:
          sTete = 5;
          sBG = 5;
          sTorse = 8;
          sJG = 5;
          sBD = 5;
          sJD = 5;
          return _context.abrupt("break", 152);

        case 47:
          sTete = 6;
          sBG = 6;
          sTorse = 10;
          sJG = 6;
          sBD = 6;
          sJD = 6;
          return _context.abrupt("break", 152);

        case 54:
          sTete = 5;
          sBG = 5;
          sTorse = 8;
          sJG = 5;
          sBD = 5;
          sJD = 5;
          return _context.abrupt("break", 152);

        case 61:
          sTete = 7;
          sBG = 8;
          sTorse = 10;
          sJG = 6;
          sBD = 8;
          sJD = 6;
          return _context.abrupt("break", 152);

        case 68:
          sTete = 12;
          sBG = 12;
          sTorse = 12;
          sJG = 12;
          sBD = 12;
          sJD = 12;
          return _context.abrupt("break", 152);

        case 75:
          sTete = 7;
          sBG = 7;
          sTorse = 10;
          sJG = 7;
          sBD = 7;
          sJD = 7;
          return _context.abrupt("break", 152);

        case 82:
          sTete = 5;
          sBG = 5;
          sTorse = 8;
          sJG = 5;
          sBD = 5;
          sJD = 5;
          return _context.abrupt("break", 152);

        case 89:
          sTete = 7;
          sBG = 10;
          sTorse = 12;
          sJG = 7;
          sBD = 10;
          sJD = 7;
          return _context.abrupt("break", 152);

        case 96:
          sTete = 4;
          sBG = 4;
          sTorse = 6;
          sJG = 4;
          sBD = 4;
          sJD = 4;
          return _context.abrupt("break", 152);

        case 103:
          sTete = 5;
          sBG = 5;
          sTorse = 8;
          sJG = 5;
          sBD = 5;
          sJD = 5;
          return _context.abrupt("break", 152);

        case 110:
          sTete = 5;
          sBG = 5;
          sTorse = 8;
          sJG = 5;
          sBD = 5;
          sJD = 5;
          return _context.abrupt("break", 152);

        case 117:
          sTete = 7;
          sBG = 8;
          sTorse = 10;
          sJG = 6;
          sBD = 8;
          sJD = 6;
          return _context.abrupt("break", 152);

        case 124:
          sTete = 5;
          sBG = 8;
          sTorse = 8;
          sJG = 5;
          sBD = 8;
          sJD = 5;
          return _context.abrupt("break", 152);

        case 131:
          sTete = 5;
          sBG = 5;
          sTorse = 8;
          sJG = 5;
          sBD = 5;
          sJD = 5;
          return _context.abrupt("break", 152);

        case 138:
          sTete = 7;
          sBG = 10;
          sTorse = 12;
          sJG = 7;
          sBD = 10;
          sJD = 7;
          return _context.abrupt("break", 152);

        case 145:
          sTete = 5;
          sBG = 5;
          sTorse = 8;
          sJG = 5;
          sBD = 5;
          sJD = 5;
          return _context.abrupt("break", 152);

        case 152:
          newAttrs = {
            armurePJ: armureActuel,
            armurePJ_max: totalArmure,
            armurePJModif: armureModif,
            energiePJ: energieActuel,
            energiePJ_max: totalEnergie,
            energiePJModif: energieModif,
            cdfPJ: totalCdf,
            cdfPJ_max: totalCdf,
            cdfPJModif: cdfModif,
            barbarianGoliath: 0,
            berserkIlluminationBeaconA: 0,
            berserkIlluminationTorchA: 0,
            berserkIlluminationProjectorA: 0,
            berserkIlluminationLighthouseA: 0,
            berserkIlluminationLanternA: 0,
            berserkRageA: 0,
            shamanNbreTotem: 0,
            shamanAscension: 0,
            sorcererMMVolNuee: 0,
            sorcererMMPhase: 0,
            sorcererMMEtirement: 0,
            sorcererMMCorpMetal: 0,
            sorcererMMCorpFluide: 0,
            sorcererMMPMGuerre: 0,
            sorcererMM250PG: 0,
            warlockForward: 0,
            warlockRecord: 0,
            warlockRewind: 0,
            warmasterImpFPersonnel: 0,
            warmasterImpGPersonnel: 0,
            warriorSoldierA: 0,
            warriorHunterA: 0,
            warriorScholarA: 0,
            warriorHeraldA: 0,
            warriorScoutA: 0,
            MALShamanNbreTotem: 0,
            MALWarriorSoldierA: 0,
            MALWarriorHunterA: 0,
            MALWarriorScholarA: 0,
            MALWarriorHeraldA: 0,
            MALWarriorScoutA: 0,
            MALWarmasterImpFPersonnel: 0,
            MALWarmasterImpGPersonnel: 0,
            MALRogueGhost: 0,
            rogueGhost: 0,
            MALBarbarianGoliath: 0,
            slotTeteMax: sTete,
            slotTorseMax: sTorse,
            slotJGMax: sJG,
            slotJDMax: sJD,
            slotBGMax: sBG,
            slotBDMax: sBD
          };
          _context.next = 155;
          return regeneratorRuntime.awrap(setAttrsAsync(newAttrs));

        case 155:
        case "end":
          return _context.stop();
      }
    }
  });
});
on('change:fichePNJ', function _callee2(newSheet) {
  var sheet, update;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          sheet = +newSheet.newValue;
          update = {};

          if (sheet === 0 || sheet === 1 || sheet === 2 || sheet === 3) {
            update.tab = 'dossier';
            update.armure = 'sans';
          }

          if (sheet === 4) {
            update.tab = 'vehicule';
            update.armure = 'sans';
          }

          _context2.next = 6;
          return regeneratorRuntime.awrap(setAttrsAsync(update));

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var listDonneesArmures = ['armure', 'energie', 'cdf'];
listDonneesArmures.forEach(function (data) {
  on("change:".concat(data, "pj sheet:opened"), function _callee3() {
    var attrs, armure, nValue;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(getAttrsAsync(["".concat(data, "PJ"), 'armure']));

          case 2:
            attrs = _context3.sent;
            armure = attrs.armure;
            nValue = {};
            nValue["".concat(armure, "-").concat(data, "-actuel")] = +attrs["".concat(data, "PJ")];
            _context3.next = 8;
            return regeneratorRuntime.awrap(setAttrsAsync(nValue));

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  on("change:".concat(data, "pjmodif sheet:opened"), function _callee4() {
    var attrs, armure, nValue;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(getAttrsAsync(["".concat(data, "PJModif"), 'armure']));

          case 2:
            attrs = _context4.sent;
            armure = attrs.armure;
            nValue = {};
            nValue["".concat(armure, "-").concat(data, "-modif")] = +attrs["".concat(data, "PJModif")];
            _context4.next = 8;
            return regeneratorRuntime.awrap(setAttrsAsync(nValue));

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
}); // ARMURE

on('change:armurePJModif', function _callee5() {
  var attrs, armure, modif, armureValue;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['armurePJModif', 'armure']));

        case 2:
          attrs = _context5.sent;
          armure = attrs.armure;
          modif = +attrs.armurePJModif;
          armureValue = +dataArmure[armure].armureMax + modif;
          _context5.next = 8;
          return regeneratorRuntime.awrap(setAttrsAsync({
            armurePJ_max: armureValue
          }));

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
}); // ENERGIE

on('change:energiePJModif change:warmaster150PG change:warmaster250PG', function _callee6() {
  var attrs, armure, warmaster150, warmaster250, modif, energie;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['armure', 'warmaster150PG', 'warmaster250PG', 'energiePJModif']));

        case 2:
          attrs = _context6.sent;
          armure = attrs.armure;
          warmaster150 = +attrs.warmaster150PG;
          warmaster250 = +attrs.warmaster250PG;
          modif = +attrs.energiePJModif;
          energie = 0;
          if (armure === 'warmaster') energie = +dataArmure[armure].energieMax + warmaster150 + warmaster250 + modif;else energie = +dataArmure[armure].energieMax + modif;
          _context6.next = 11;
          return regeneratorRuntime.awrap(setAttrsAsync({
            energiePJ_max: energie
          }));

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  });
}); // CDF

on('change:cdfPJModif change:barbarianGoliath change:MALBarbarianGoliath change:warmasterImpFPersonnel change:warmasterImpForce change:MALWarmasterImpFPersonnel change:MALWarmasterImpForce change:sorcererMMCorpMetal change:sorcerer150PG change:sorcererMM250PG', function _callee7() {
  var attrs, armure, armureL, max, modif, goliath, goliathMAL, corpMetal, CM150PG, CM250PG, warmasterForce, warmasterForcePers, warmasterForceMAL, warmasterForcePersMAL, total;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['armure', 'armureLegende', 'cdfPJModif', 'barbarianGoliath', 'MALBarbarianGoliath', 'sorcererMMCorpMetal', 'sorcerer150PG', 'sorcererMM250PG', 'warmasterImpFPersonnel', 'warmasterImpForce', 'MALWarmasterImpFPersonnel', 'MALWarmasterImpForce']));

        case 2:
          attrs = _context7.sent;
          armure = attrs.armure;
          armureL = attrs.armureLegende;
          max = +dataArmure[armure].cdfMax;
          modif = +attrs.cdfPJModif;
          goliath = +attrs.barbarianGoliath;
          goliathMAL = +attrs.MALBarbarianGoliath;
          corpMetal = attrs.sorcererMMCorpMetal;
          CM150PG = attrs.sorcerer150PG;
          CM250PG = attrs.sorcererMM250PG;
          warmasterForce = attrs.warmasterImpForce;
          warmasterForcePers = +attrs.warmasterImpFPersonnel;
          warmasterForceMAL = attrs.MALWarmasterImpForce;
          warmasterForcePersMAL = +attrs.MALWarmasterImpFPersonnel;
          total = max + modif;
          _context7.t0 = armure;
          _context7.next = _context7.t0 === 'barbarian' ? 20 : _context7.t0 === 'sorcerer' ? 22 : _context7.t0 === 'warmaster' ? 24 : 26;
          break;

        case 20:
          total += goliath;
          return _context7.abrupt("break", 26);

        case 22:
          if (corpMetal !== 0 || CM250PG !== 0) {
            total += 2;
            if (CM150PG !== 0) total += 2;
          }

          return _context7.abrupt("break", 26);

        case 24:
          if (warmasterForce === 'on' && warmasterForcePers !== 0) total += warmasterForcePers;
          return _context7.abrupt("break", 26);

        case 26:
          _context7.t1 = armureL;
          _context7.next = _context7.t1 === 'barbarian' ? 29 : _context7.t1 === 'warmaster' ? 31 : 33;
          break;

        case 29:
          total += goliathMAL;
          return _context7.abrupt("break", 33);

        case 31:
          if (warmasterForceMAL === 'on' && warmasterForcePersMAL !== 0) {
            total += warmasterForcePersMAL;
          }

          return _context7.abrupt("break", 33);

        case 33:
          _context7.next = 35;
          return regeneratorRuntime.awrap(setAttrsAsync({
            cdfPJ: total,
            cdfPJ_max: total
          }));

        case 35:
        case "end":
          return _context7.stop();
      }
    }
  });
}); // ESPOIR

on('change:espoirModif change:fichePNJ change:armure change:berserk250PG', function _callee8() {
  var attrs, fiche, armure, modif, berserk250PG, max, bonus, newAttrs;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['armure', 'espoirModif', 'fichePNJ', 'berserk250PG']));

        case 2:
          attrs = _context8.sent;
          fiche = +attrs.fichePNJ;

          if (!(fiche !== 0)) {
            _context8.next = 6;
            break;
          }

          return _context8.abrupt("return");

        case 6:
          armure = attrs.Armure;
          modif = +attrs.espoirModif;
          berserk250PG = attrs.berserk250PG;
          max = 50;
          bonus = 0;
          newAttrs = {};
          _context8.t0 = armure;
          _context8.next = _context8.t0 === 'berserk' ? 15 : _context8.t0 === 'necromancer' ? 17 : 19;
          break;

        case 15:
          if (berserk250PG === 'on') {
            bonus = 25;
          } else {
            bonus = 15;
          }

          return _context8.abrupt("break", 19);

        case 17:
          max = 10;
          return _context8.abrupt("break", 19);

        case 19:
          newAttrs.espoir_max = max + modif + bonus;
          _context8.next = 22;
          return regeneratorRuntime.awrap(setAttrsAsync(newAttrs));

        case 22:
        case "end":
          return _context8.stop();
      }
    }
  });
}); // EGIDE

on('change:fichePNJ change:armure change:berserkNiveaux change:berserkRageN1Egide change:berserkRageN2Egide change:berserkRageN3Egide', function _callee9() {
  var attrs, fiche, armure, rage, N1, N2, N3, egide;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['armure', 'fichePNJ', 'berserkNiveaux', 'berserkRageN1Egide', 'berserkRageN2Egide', 'berserkRageN3Egide']));

        case 2:
          attrs = _context9.sent;
          fiche = +attrs.fichePNJ;

          if (!(fiche !== 0)) {
            _context9.next = 6;
            break;
          }

          return _context9.abrupt("return");

        case 6:
          armure = attrs.armure;
          rage = +attrs.berserkNiveaux;
          N1 = +attrs.berserkRageN1Egide;
          N2 = +attrs.berserkRageN2Egide;
          N3 = +attrs.berserkRageN3Egide;
          egide = 0;

          if (!(armure === 'berserk')) {
            _context9.next = 22;
            break;
          }

          _context9.t0 = rage;
          _context9.next = _context9.t0 === 1 ? 16 : _context9.t0 === 2 ? 18 : _context9.t0 === 3 ? 20 : 22;
          break;

        case 16:
          egide += N1;
          return _context9.abrupt("break", 22);

        case 18:
          egide += N2;
          return _context9.abrupt("break", 22);

        case 20:
          egide += N3;
          return _context9.abrupt("break", 22);

        case 22:
          _context9.next = 24;
          return regeneratorRuntime.awrap(setAttrsAsync({
            egideBonus: egide
          }));

        case 24:
        case "end":
          return _context9.stop();
      }
    }
  });
}); // DEFENSE

on('change:fichePNJ change:armure change:armureLegende change:defense change:defBM change:bonusDefense change:defenseODBonus change:defenseModifPerso change:barbarianDef change:berserkRageA change:berserkNiveaux change:berserkRageN1DR change:berserkRageN2DR change:berserkRageN3DR change:sorcererMMCorpFluide change:sorcerer150PG change:sorcererMM250PG change:warmasterImpEPersonnel change:warmasterImpEsquive change:MALWarmasterImpEPersonnel change:MALWarmasterImpEsquive change:MALBarbarianDef change:MasquePNJAE change:MasquePNJAEMaj change:defensePNJ change:MADDjinnNanobrumeActive', function _callee10() {
  var attrs, fiche, basePJ, basePNJ, modifStyle, modifAutre, modifPJ, modifOD, armure, armureL, goliath, MALGoliath, berserkRage, berserkNiveau, berserkRageN1, berserkRageN2, berserkRageN3, sorcererCorpFluide, sorcerer150PG, sorcerer250PG, sorcererMM250PG, warmasterEsquive, warmasterEsquiveP, MALWarmasterEsquive, MALWarmasterEsquiveP, masqueAE, masqueAEMaj, mechaArmureNanoBrume, base, modif, modifS, totalMecha, total;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['defense', 'defensePNJ', 'defBM', 'bonusDefense', 'defenseModifPerso', 'defenseODBonus', 'fichePNJ', 'armure', 'armureLegende', 'barbarianDef', 'MALBarbarianDef', 'berserkRageA', 'berserkNiveaux', 'berserkRageN1DR', 'berserkRageN2DR', 'berserkRageN3DR', 'sorcererMMCorpFluide', 'sorcerer150PG', 'sorcerer250PG', 'sorcererMM250PG', 'warmasterImpEsquive', 'warmasterImpEPersonnel', 'MALWarmasterImpEsquive', 'MALWarmasterImpEPersonnel', 'MasquePNJAE', 'MasquePNJAEMaj', 'MADDjinnNanobrumeActive']));

        case 2:
          attrs = _context10.sent;
          fiche = +attrs.fichePNJ;
          basePJ = +attrs.defense;
          basePNJ = +attrs.defensePNJ;
          modifStyle = parseInt(attrs.defBM, 10) || 0;
          modifAutre = parseInt(attrs.bonusDefense, 10) || 0;
          modifPJ = +attrs.defenseModifPerso;
          modifOD = parseInt(attrs.defenseODBonus, 10) || 0;
          armure = attrs.armure;
          armureL = attrs.armureLegende;
          goliath = +attrs.barbarianDef;
          MALGoliath = +attrs.MALBarbarianDef;
          berserkRage = attrs.berserkRageA;
          berserkNiveau = attrs.berserkNiveaux;
          berserkRageN1 = +attrs.berserkRageN1DR;
          berserkRageN2 = +attrs.berserkRageN2DR;
          berserkRageN3 = +attrs.berserkRageN3DR;
          sorcererCorpFluide = attrs.sorcererMMCorpFluide;
          sorcerer150PG = +attrs.sorcerer150PG;
          sorcerer250PG = attrs.sorcerer250PG;
          sorcererMM250PG = +attrs.sorcererMM250PG;
          warmasterEsquive = attrs.warmasterImpEsquive;
          warmasterEsquiveP = +attrs.warmasterImpEPersonnel;
          MALWarmasterEsquive = attrs.MALWarmasterImpEsquive;
          MALWarmasterEsquiveP = +attrs.MALWarmasterImpEPersonnel;
          masqueAE = +attrs.MasquePNJAE;
          masqueAEMaj = +attrs.MasquePNJAEMaj;
          mechaArmureNanoBrume = attrs.MADDjinnNanobrumeActive;
          base = 0;
          modif = 0;
          modifS = 0;
          totalMecha = 0;
          total = 0;
          _context10.t0 = fiche;
          _context10.next = _context10.t0 === 0 ? 38 : _context10.t0 === 1 ? 56 : _context10.t0 === 2 ? 56 : _context10.t0 === 3 ? 60 : 64;
          break;

        case 38:
          base += basePJ;
          modifS += modifPJ;
          totalMecha = basePJ + modifAutre + modifOD;
          _context10.t1 = armure;
          _context10.next = _context10.t1 === 'sans' ? 44 : _context10.t1 === 'guardian' ? 44 : 46;
          break;

        case 44:
          modif = modifStyle + modifAutre;
          return _context10.abrupt("break", 48);

        case 46:
          modif = modifStyle + modifAutre + modifOD;
          return _context10.abrupt("break", 48);

        case 48:
          if (armure === 'barbarian') {
            modif -= goliath;
          }

          if (armure === 'berserk' && berserkRage === 'on') {
            if (berserkNiveau === 1) {
              modif -= berserkRageN1;
            } else if (berserkNiveau === 2) {
              modif -= berserkRageN2;
            } else if (berserkNiveau === 3) {
              modif -= berserkRageN3;
            }
          }

          if (armure === 'sorcerer') {
            if (sorcerer250PG === 'on') {
              if (sorcererMM250PG === 1) {
                modif += 2;

                if (sorcerer150PG !== 0) {
                  modif += 1;
                }
              }
            } else if (sorcererCorpFluide !== '0') {
              modif += 2;

              if (sorcerer150PG !== 0) {
                modif += 1;
              }
            }
          }

          if (armure === 'warmaster' && warmasterEsquive !== '0' && warmasterEsquiveP !== 0) {
            modif += 2;
          }

          if (armureL === 'warmaster' && MALWarmasterEsquive !== '0' && MALWarmasterEsquiveP !== 0) {
            modif += 2;
          }

          if (armureL === 'barbarian') {
            modif -= MALGoliath;
          }

          if (mechaArmureNanoBrume === 1) {
            totalMecha += 3;
          }

          return _context10.abrupt("break", 64);

        case 56:
          base += basePNJ;
          modifS += modifPJ;
          modif += modifAutre + masqueAE + masqueAEMaj;
          return _context10.abrupt("break", 64);

        case 60:
          base += basePNJ;
          modifS += modifPJ;
          modif += masqueAE + masqueAEMaj;
          return _context10.abrupt("break", 64);

        case 64:
          total += Math.max(base + modif + modifS, 0);
          _context10.next = 67;
          return regeneratorRuntime.awrap(setAttrsAsync({
            defenseModif: modif,
            defenseTotal: total,
            mechaArmureDefense: totalMecha
          }));

        case 67:
        case "end":
          return _context10.stop();
      }
    }
  });
}); // REACTION

on('change:fichePNJ change:armure change:armureLegende change:reaction change:rctBM change:bonusReaction change:reactionODBonus change:reactionModifPerso change:barbarianRea change:berserkNiveaux change:berserkRageN1DR change:berserkRageN2DR change:berserkRageN3DR change:paladinWatchtower change:sorcererMMCorpFluide change:sorcerer150PG change:sorcererMM250PG change:warmasterImpEPersonnel change:warmasterImpEsquive change:MALWarmasterImpEsquive change:MALWarmasterImpEPersonnel change:MALBarbarianRea change:MachinePNJAE change:MachinePNJAEMaj change:reactionPNJ change:MADDjinnNanobrumeActive', function _callee11() {
  var attrs, fiche, basePJ, basePNJ, modifStyle, modifAutre, modifPJ, modifOD, armure, armureL, goliath, MALGoliath, berserkRage, berserkNiveau, berserkRageN1, berserkRageN2, berserkRageN3, paladinWatchtower, sorcererCorpFluide, sorcerer150PG, sorcerer250PG, sorcererMM250PG, warmasterEsquive, warmasterEsquiveP, MALWarmasterEsquive, MALWarmasterEsquiveP, machineAE, machineAEMaj, mechaArmureNanoBrume, base, modif, modifS, totalMecha, total, temp;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['reaction', 'reactionPNJ', 'rctBM', 'bonusReaction', 'reactionModifPerso', 'reactionODBonus', 'fichePNJ', 'armure', 'armureLegende', 'barbarianRea', 'MALBarbarianRea', 'berserkRageA', 'berserkNiveaux', 'berserkRageN1DR', 'berserkRageN2DR', 'berserkRageN3DR', 'paladinWatchtower', 'sorcererMMCorpFluide', 'sorcerer150PG', 'sorcerer250PG', 'sorcererMM250PG', 'warmasterImpEsquive', 'warmasterImpEPersonnel', 'MALWarmasterImpEsquive', 'MALWarmasterImpEPersonnel', 'MachinePNJAE', 'MachinePNJAEMaj', 'MADDjinnNanobrumeActive']));

        case 2:
          attrs = _context11.sent;
          fiche = +attrs.fichePNJ;
          basePJ = +attrs.reaction;
          basePNJ = +attrs.reactionPNJ;
          modifStyle = parseInt(attrs.rctBM, 10) || 0;
          modifAutre = parseInt(attrs.bonusReaction, 10) || 0;
          modifPJ = +attrs.reactionModifPerso;
          modifOD = parseInt(attrs.reactionODBonus, 10) || 0;
          armure = attrs.armure;
          armureL = attrs.armureLegende;
          goliath = +attrs.barbarianRea;
          MALGoliath = +attrs.MALBarbarianRea;
          berserkRage = attrs.berserkRageA;
          berserkNiveau = attrs.berserkNiveaux;
          berserkRageN1 = +attrs.berserkRageN1DR;
          berserkRageN2 = +attrs.berserkRageN2DR;
          berserkRageN3 = +attrs.berserkRageN3DR;
          paladinWatchtower = attrs.paladinWatchtower;
          sorcererCorpFluide = attrs.sorcererMMCorpFluide;
          sorcerer150PG = +attrs.sorcerer150PG;
          sorcerer250PG = attrs.sorcerer250PG;
          sorcererMM250PG = +attrs.sorcererMM250PG;
          warmasterEsquive = attrs.warmasterImpEsquive;
          warmasterEsquiveP = +attrs.warmasterImpEPersonnel;
          MALWarmasterEsquive = attrs.MALWarmasterImpEsquive;
          MALWarmasterEsquiveP = +attrs.MALWarmasterImpEPersonnel;
          machineAE = +attrs.MachinePNJAE;
          machineAEMaj = +attrs.MachinePNJAEMaj;
          mechaArmureNanoBrume = attrs.MADDjinnNanobrumeActive;
          base = 0;
          modif = 0;
          modifS = 0;
          totalMecha = 0;
          total = 0;
          _context11.t0 = fiche;
          _context11.next = _context11.t0 === 0 ? 39 : _context11.t0 === 1 ? 58 : _context11.t0 === 2 ? 58 : _context11.t0 === 3 ? 62 : 66;
          break;

        case 39:
          base += basePJ;
          modifS += modifPJ;
          totalMecha += basePJ + modifAutre + modifOD;
          _context11.t1 = armure;
          _context11.next = _context11.t1 === 'sans' ? 45 : _context11.t1 === 'guardian' ? 45 : 47;
          break;

        case 45:
          modif = modifStyle + modifAutre;
          return _context11.abrupt("break", 49);

        case 47:
          modif = modifStyle + modifAutre + modifOD;
          return _context11.abrupt("break", 49);

        case 49:
          if (armure === 'barbarian') {
            modif -= goliath;
          }

          if (armure === 'berserk' && berserkRage === 'on') {
            if (berserkNiveau === 1) {
              modif -= berserkRageN1;
            } else if (berserkNiveau === 2) {
              modif -= berserkRageN2;
            } else if (berserkNiveau === 3) {
              modif -= berserkRageN3;
            }
          }

          if (armure === 'sorcerer') {
            if (sorcerer250PG === 'on') {
              if (sorcererMM250PG === 1) {
                modif += 2;

                if (sorcerer150PG !== 0) {
                  modif += 1;
                }
              }
            } else if (sorcererCorpFluide !== '0') {
              modif += 2;

              if (sorcerer150PG !== 0) {
                modif += 1;
              }
            }
          }

          if (armure === 'warmaster' && warmasterEsquive !== '0' && warmasterEsquiveP !== 0) {
            modif += 2;
          }

          if (armureL === 'warmaster' && MALWarmasterEsquive !== '0' && MALWarmasterEsquiveP !== 0) {
            modif += 2;
          }

          if (armureL === 'barbarian') {
            modif -= MALGoliath;
          }

          if (armure === 'paladin' && paladinWatchtower === 'Activé') {
            temp = base + modif + modifS;
            modif -= Math.ceil(temp / 2);
          }

          if (mechaArmureNanoBrume === 1) {
            totalMecha += 3;
          }

          return _context11.abrupt("break", 66);

        case 58:
          base += basePNJ;
          modifS += modifPJ;
          modif += modifAutre + machineAE + machineAEMaj;
          return _context11.abrupt("break", 66);

        case 62:
          base += basePNJ;
          modifS += modifPJ;
          modif += machineAE + machineAEMaj;
          return _context11.abrupt("break", 66);

        case 66:
          total += Math.max(base + modif + modifS, 0);
          _context11.next = 69;
          return regeneratorRuntime.awrap(setAttrsAsync({
            reactionModif: modif,
            reactionTotal: total,
            mechaArmureReaction: totalMecha
          }));

        case 69:
        case "end":
          return _context11.stop();
      }
    }
  });
}); // RESILIENCE

on('clicked:calculResilienceFinal', function _callee12() {
  var attrs, type, armure, sante, total;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['listeTypePNJ', 'armurePNJ_max', 'santePNJ_max']));

        case 2:
          attrs = _context12.sent;
          type = +attrs.listeTypePNJ;
          armure = +attrs.armurePNJ_max;
          sante = +attrs.santePNJ_max;
          total = 0;
          _context12.t0 = type;
          _context12.next = _context12.t0 === 1 ? 10 : _context12.t0 === 2 ? 12 : _context12.t0 === 3 ? 14 : _context12.t0 === 4 ? 16 : _context12.t0 === 5 ? 18 : _context12.t0 === 6 ? 20 : 22;
          break;

        case 10:
          if (sante > 0) {
            total = Math.floor(sante / 10);
          } else {
            total = Math.floor(armure / 10);
          }

          return _context12.abrupt("break", 22);

        case 12:
          if (sante > 0) {
            total = Math.floor(sante / 10) * 2;
          } else {
            total = Math.floor(armure / 10) * 2;
          }

          return _context12.abrupt("break", 22);

        case 14:
          if (sante > 0) {
            total = Math.floor(sante / 10) * 3;
          } else {
            total = Math.floor(armure / 10) * 3;
          }

          return _context12.abrupt("break", 22);

        case 16:
          if (sante > 0) {
            total = Math.floor(sante / 30);
          } else {
            total = Math.floor(armure / 30);
          }

          return _context12.abrupt("break", 22);

        case 18:
          if (sante > 0) {
            total = Math.floor(sante / 20);
          } else {
            total = Math.floor(armure / 20);
          }

          return _context12.abrupt("break", 22);

        case 20:
          if (sante > 0) {
            total = Math.floor(sante / 10);
          } else {
            total = Math.floor(armure / 10);
          }

          return _context12.abrupt("break", 22);

        case 22:
          _context12.next = 24;
          return regeneratorRuntime.awrap(setAttrsAsync({
            popup: 0,
            resilience: total,
            resilience_max: total
          }));

        case 24:
        case "end":
          return _context12.stop();
      }
    }
  });
});
on('clicked:calculerResilience', function _callee13() {
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return regeneratorRuntime.awrap(setAttrsAsync({
            popup: 2
          }));

        case 2:
        case "end":
          return _context13.stop();
      }
    }
  });
});
on('change:berserk350PG', function _callee14() {
  var attrs, state, dgts, violence, beacon, egide;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['berserk350PG']));

        case 2:
          attrs = _context14.sent;
          state = attrs.berserk350PG;
          dgts = '2D6';
          violence = '2D6';
          beacon = "2 ".concat(getTranslationByKey('reussites-automatiques'));
          egide = '2';

          if (state === 'on') {
            dgts = '4D6';
            violence = '4D6';
            beacon = "4 ".concat(getTranslationByKey('reussites-automatiques'));
            egide = '4';
          }

          _context14.next = 11;
          return regeneratorRuntime.awrap(setAttrsAsync({
            berserkIlluminationBlazeDgts: dgts,
            berserkIlluminationBlazeViolence: violence,
            berserkIlluminationBeaconBonus: beacon,
            berserkIlluminationTorchEgide: egide
          }));

        case 11:
        case "end":
          return _context14.stop();
      }
    }
  });
}); // BARBARIAN

on('change:barbarianNoMDefense change:barbarianGoliath', function _callee15() {
  var attrs, goliath, PG200, defense, reaction, dgts;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['barbarianGoliath', 'barbarianNoMDefense']));

        case 2:
          attrs = _context15.sent;
          goliath = +attrs.barbarianGoliath;
          PG200 = attrs.barbarianNoMDefense;
          defense = 0;
          reaction = goliath * 2;
          dgts = "".concat(goliath, "D6");

          if (PG200 === '0') {
            defense = goliath;
          }

          _context15.next = 11;
          return regeneratorRuntime.awrap(setAttrsAsync({
            barbarianDef: defense,
            barbarianRea: reaction,
            barbarianDegat: dgts
          }));

        case 11:
        case "end":
          return _context15.stop();
      }
    }
  });
}); // SHAMAN

on('change:shamanAscensionEnergie', function _callee16() {
  var attrs, ascension, energie;
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['shamanAscension', 'shamanAscensionEnergie']));

        case 2:
          attrs = _context16.sent;
          ascension = +attrs.shamanAscension;
          energie = +attrs.shamanAscensionEnergie;

          if (!(ascension === 1)) {
            _context16.next = 8;
            break;
          }

          _context16.next = 8;
          return regeneratorRuntime.awrap(setAttrsAsync({
            energieAscension_max: energie
          }));

        case 8:
        case "end":
          return _context16.stop();
      }
    }
  });
});
on('change:armurePJModif', function _callee17() {
  var attrs, base, modif;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['armurePJModif']));

        case 2:
          attrs = _context17.sent;
          base = 60;
          modif = +attrs.armurePJModif;
          _context17.next = 7;
          return regeneratorRuntime.awrap(setAttrsAsync({
            armureAscension_max: base + modif
          }));

        case 7:
        case "end":
          return _context17.stop();
      }
    }
  });
});
on('change:cdfPJAscensionModif', function _callee18() {
  var attrs, base, modif, total;
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['cdfPJAscensionModif']));

        case 2:
          attrs = _context18.sent;
          base = 10;
          modif = +attrs.cdfPJAscensionModif;
          total = base + modif;
          _context18.next = 8;
          return regeneratorRuntime.awrap(setAttrsAsync({
            cdfAscension: total,
            cdfAscension_max: total
          }));

        case 8:
        case "end":
          return _context18.stop();
      }
    }
  });
});
on('change:shamanNbreTotem', function _callee19() {
  var attrs, shaman150PG, totem;
  return regeneratorRuntime.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['shaman150PG', 'shamanNbreTotem']));

        case 2:
          attrs = _context19.sent;
          shaman150PG = +attrs.shaman150PG;
          totem = +attrs.shamanNbreTotem;

          if (!(totem === 3 && shaman150PG === 0)) {
            _context19.next = 8;
            break;
          }

          _context19.next = 8;
          return regeneratorRuntime.awrap(setAttrsAsync({
            shamanNbreTotem: 2
          }));

        case 8:
        case "end":
          return _context19.stop();
      }
    }
  });
}); // GESTION DES ASPECTS ET CARACTERISTIQUES
// Chair

on('change:deplacement change:force change:endurance change:santeModif change:santeODBonus', function _callee20() {
  var attrs, fiche, chair, deplacement, force, endurance, modif, OD, total;
  return regeneratorRuntime.async(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['fichePNJ', 'chair', 'deplacement', 'force', 'endurance', 'santeModif', 'santeODBonus']));

        case 2:
          attrs = _context20.sent;
          fiche = +attrs.fichePNJ;

          if (!(fiche !== 0)) {
            _context20.next = 6;
            break;
          }

          return _context20.abrupt("return");

        case 6:
          chair = +attrs.chair;
          deplacement = +attrs.deplacement;
          force = +attrs.force;
          endurance = +attrs.endurance;
          modif = +attrs.santeModif;
          OD = +attrs.santeODBonus;
          maxCar('deplacement', deplacement, chair);
          maxCar('force', force, chair);
          maxCar('endurance', endurance, chair);
          total = 10 + Math.max(deplacement, force, endurance) * 6 + modif + OD;
          _context20.next = 18;
          return regeneratorRuntime.awrap(setAttrsAsync({
            santepj_max: total
          }));

        case 18:
        case "end":
          return _context20.stop();
      }
    }
  });
}); // Bête

on('change:fichePNJ change:armure change:hargne change:combat change:instinct change:calODHar change:calODCom change:calODIns', function _callee21() {
  var attrs, fiche, armure, aspect, car1, car2, car3, OD1, OD2, OD3, total;
  return regeneratorRuntime.async(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['fichePNJ', 'armure', 'bete', 'hargne', 'combat', 'instinct', 'calODHar', 'calODCom', 'calODIns']));

        case 2:
          attrs = _context21.sent;
          fiche = +attrs.fichePNJ;

          if (!(fiche !== 0)) {
            _context21.next = 6;
            break;
          }

          return _context21.abrupt("return");

        case 6:
          armure = +attrs.armure;
          aspect = +attrs.bete;
          car1 = +attrs.hargne;
          car2 = +attrs.combat;
          car3 = +attrs.instinct;
          OD1 = +attrs.calODHar;
          OD2 = +attrs.calODCom;
          OD3 = +attrs.calODIns;
          maxCar('hargne', car1, aspect);
          maxCar('combat', car2, aspect);
          maxCar('instinct', car3, aspect);
          total = 0;
          _context21.t0 = armure;
          _context21.next = _context21.t0 === 'sans' ? 21 : _context21.t0 === 'guardian' ? 21 : 23;
          break;

        case 21:
          total = Math.max(car1, car2, car3);
          return _context21.abrupt("break", 25);

        case 23:
          total = Math.max(car1 + OD1, car2 + OD2, car3 + OD3);
          return _context21.abrupt("break", 25);

        case 25:
          _context21.next = 27;
          return regeneratorRuntime.awrap(setAttrsAsync({
            defense: total
          }));

        case 27:
        case "end":
          return _context21.stop();
      }
    }
  });
}); // Machine

on('change:fichePNJ change:armure change:tir change:savoir change:technique change:calODTir change:calODSav change:calODTec', function _callee22() {
  var attrs, fiche, armure, aspect, car1, car2, car3, OD1, OD2, OD3, total;
  return regeneratorRuntime.async(function _callee22$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['fichePNJ', 'armure', 'machine', 'tir', 'savoir', 'technique', 'calODTir', 'calODSav', 'calODTec']));

        case 2:
          attrs = _context22.sent;
          fiche = +attrs.fichePNJ;

          if (!(fiche !== 0)) {
            _context22.next = 6;
            break;
          }

          return _context22.abrupt("return");

        case 6:
          armure = +attrs.armure;
          aspect = +attrs.machine;
          car1 = +attrs.tir;
          car2 = +attrs.savoir;
          car3 = +attrs.technique;
          OD1 = +attrs.calODTir;
          OD2 = +attrs.calODSav;
          OD3 = +attrs.calODTec;
          maxCar('tir', car1, aspect);
          maxCar('savoir', car2, aspect);
          maxCar('technique', car3, aspect);
          total = 0;
          _context22.t0 = armure;
          _context22.next = _context22.t0 === 'sans' ? 21 : _context22.t0 === 'guardian' ? 21 : 23;
          break;

        case 21:
          total = Math.max(car1, car2, car3);
          return _context22.abrupt("break", 25);

        case 23:
          total = Math.max(car1 + OD1, car2 + OD2, car3 + OD3);
          return _context22.abrupt("break", 25);

        case 25:
          _context22.next = 27;
          return regeneratorRuntime.awrap(setAttrsAsync({
            reaction: total
          }));

        case 27:
        case "end":
          return _context22.stop();
      }
    }
  });
}); // Dame

on('change:aura change:parole change:sf', function _callee23() {
  var attrs, fiche, aspect, car1, car2, car3;
  return regeneratorRuntime.async(function _callee23$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _context23.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['fichePNJ', 'dame', 'aura', 'parole', 'sf']));

        case 2:
          attrs = _context23.sent;
          fiche = +attrs.fichePNJ;

          if (!(fiche !== 0)) {
            _context23.next = 6;
            break;
          }

          return _context23.abrupt("return");

        case 6:
          aspect = +attrs.dame;
          car1 = +attrs.aura;
          car2 = +attrs.parole;
          car3 = +attrs.sf;
          maxCar('aura', car1, aspect);
          maxCar('parole', car2, aspect);
          maxCar('sf', car3, aspect);

        case 13:
        case "end":
          return _context23.stop();
      }
    }
  });
});
on('change:fichePNJ change:armure change:discretion change:dexterite change:perception change:calODDis change:calODPer change:calODDex change:initiativeODBonus', function _callee24() {
  var attrs, fiche, armure, aspect, car1, car2, car3, OD1, OD2, OD3, bonus, total;
  return regeneratorRuntime.async(function _callee24$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          _context24.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['fichePNJ', 'armure', 'masque', 'discretion', 'dexterite', 'perception', 'calODDis', 'calODPer', 'calODDex', 'initiativeODBonus']));

        case 2:
          attrs = _context24.sent;
          fiche = +attrs.fichePNJ;

          if (!(fiche !== 0)) {
            _context24.next = 6;
            break;
          }

          return _context24.abrupt("return");

        case 6:
          armure = +attrs.armure;
          aspect = +attrs.masque;
          car1 = +attrs.discretion;
          car2 = +attrs.dexterite;
          car3 = +attrs.perception;
          OD1 = +attrs.calODDis;
          OD2 = +attrs.calODDex;
          OD3 = +attrs.calODPer;
          bonus = +attrs.initiativeODBonus;
          maxCar('discretion', car1, aspect);
          maxCar('dexterite', car2, aspect);
          maxCar('perception', car3, aspect);
          total = 0;
          _context24.t0 = armure;
          _context24.next = _context24.t0 === 'sans' ? 22 : _context24.t0 === 'guardian' ? 22 : 24;
          break;

        case 22:
          total = Math.max(car1, car2, car3);
          return _context24.abrupt("break", 26);

        case 24:
          total = Math.max(car1 + OD1, car2 + OD2, car3 + OD3) + bonus;
          return _context24.abrupt("break", 26);

        case 26:
          _context24.next = 28;
          return regeneratorRuntime.awrap(setAttrsAsync({
            bonusInitiative: total
          }));

        case 28:
        case "end":
          return _context24.stop();
      }
    }
  });
});
on('change:sorcerer250PG', function _callee25() {
  var attrs, PG250;
  return regeneratorRuntime.async(function _callee25$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          _context25.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['sorcerer250PG']));

        case 2:
          attrs = _context25.sent;
          PG250 = attrs.sorcerer250PG;

          if (!(PG250 === 'on')) {
            _context25.next = 9;
            break;
          }

          _context25.next = 7;
          return regeneratorRuntime.awrap(setAttrsAsync({
            sorcererMMVolNuee: 0,
            sorcererMMPhase: 0,
            sorcererMMEtirement: 0,
            sorcererMMCorpMetal: 0,
            sorcererMMCorpFluide: 0,
            sorcererMMPMGuerre: 0
          }));

        case 7:
          _context25.next = 11;
          break;

        case 9:
          _context25.next = 11;
          return regeneratorRuntime.awrap(setAttrsAsync({
            sorcererMM250PG: 0
          }));

        case 11:
        case "end":
          return _context25.stop();
      }
    }
  });
});
on('change:monk150PG change:monk250PG sheet:opened', function _callee26() {
  var attrs, PG150, PG250, vagueDgts, salveDgts, rayonDgts, rayonViolence, vagueEffets, salveEffets, rayonEffets;
  return regeneratorRuntime.async(function _callee26$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          _context26.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['monk150PG', 'monk250PG']));

        case 2:
          attrs = _context26.sent;
          PG150 = +attrs.monk150PG;
          PG250 = +attrs.monk250PG;
          vagueDgts = 3;
          salveDgts = 3;
          rayonDgts = 4;
          rayonViolence = 2;
          vagueEffets = "".concat(i18n_parasitage, " 2 / ").concat(i18n_dispersion, " 3 / ").concat(i18n_destructeur, " / ").concat(i18n_choc, " 2");
          salveEffets = "".concat(i18n_ultraviolence, " / ").concat(i18n_meurtrier, " / ").concat(i18n_dispersion, " 3 / ").concat(i18n_parasitage, " 1");
          rayonEffets = "".concat(i18n_parasitage, " 1 / ").concat(i18n_perceArmure, " 40");

          if (PG150 === 2) {
            vagueDgts += 2;
            salveDgts += 2;
            rayonDgts += 2;
            rayonViolence += 2;
          }

          if (PG250 === 1) {
            vagueDgts += 2;
            salveDgts += 2;
            rayonDgts += 2;
            rayonViolence += 2;
            vagueEffets = "".concat(i18n_parasitage, " 4 / ").concat(i18n_dispersion, " 3 / ").concat(i18n_destructeur, " / ").concat(i18n_choc, " 2");
            salveEffets = "".concat(i18n_ultraviolence, " / ").concat(i18n_meurtrier, " / ").concat(i18n_dispersion, " 6 / ").concat(i18n_parasitage, " 1");
            rayonEffets = "".concat(i18n_parasitage, " 1 / ").concat(i18n_ignoreArmure);
          }

          _context26.next = 16;
          return regeneratorRuntime.awrap(setAttrsAsync({
            monkVagueDegat: "".concat(vagueDgts, "D6"),
            monkSalveDegat: "".concat(salveDgts, "D6"),
            monkRayonDegat: "".concat(rayonDgts, "D6"),
            monkRayonViolence: "".concat(rayonViolence, "D6"),
            monkVagueEffets: vagueEffets,
            monkSalveEffets: salveEffets,
            monkRayonEffets: rayonEffets
          }));

        case 16:
        case "end":
          return _context26.stop();
      }
    }
  });
});
on('change:priest200PG', function _callee27() {
  var attrs, PG200, contactDice, distanceDice, contactBonus, distanceBonus;
  return regeneratorRuntime.async(function _callee27$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          _context27.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['priest200PG']));

        case 2:
          attrs = _context27.sent;
          PG200 = +attrs.priest200PG;
          contactDice = 3;
          distanceDice = 2;
          contactBonus = 6;
          distanceBonus = 6;

          if (PG200 === 'on') {
            contactDice += 1;
            distanceDice += 1;
            contactBonus += 6;
            distanceBonus += 6;
          }

          _context27.next = 11;
          return regeneratorRuntime.awrap(setAttrsAsync({
            priestMechanicContact: "".concat(contactDice, "D6+").concat(contactBonus),
            priestMechanicDistance: "".concat(distanceDice, "D6+").concat(distanceBonus)
          }));

        case 11:
        case "end":
          return _context27.stop();
      }
    }
  });
});
on('change:psion200PG', function _callee28() {
  var attrs, PG200, malusAction, malusAutres;
  return regeneratorRuntime.async(function _callee28$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          _context28.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['psion200PG']));

        case 2:
          attrs = _context28.sent;
          PG200 = +attrs.psion200PG;
          malusAction = 2;
          malusAutres = 2;

          if (PG200 === 'on') {
            malusAction += 1;
            malusAutres += 1;
          }

          _context28.next = 9;
          return regeneratorRuntime.awrap(setAttrsAsync({
            psionMalusA: "".concat(malusAction, "D"),
            psionMalus: malusAutres
          }));

        case 9:
        case "end":
          return _context28.stop();
      }
    }
  });
});
on('change:wizard150PG sheet:opened', function _callee29() {
  var attrs, PG200, portee;
  return regeneratorRuntime.async(function _callee29$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          _context29.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['wizard150PG']));

        case 2:
          attrs = _context29.sent;
          PG200 = +attrs.wizard150PG;
          portee = i18n_porteeCourte;

          if (PG200 === 'on') {
            portee = i18n_porteeMoyenne;
          }

          _context29.next = 8;
          return regeneratorRuntime.awrap(setAttrsAsync({
            wizardBPortee: portee
          }));

        case 8:
        case "end":
          return _context29.stop();
      }
    }
  });
});
on('change:wizard250PG sheet:opened', function _callee30() {
  var attrs, PG250, portee;
  return regeneratorRuntime.async(function _callee30$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          _context30.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['wizard250PG']));

        case 2:
          attrs = _context30.sent;
          PG250 = +attrs.wizard250PG;
          portee = i18n_porteeCourte;

          if (PG250 === 'on') {
            portee = i18n_porteeMoyenne;
          }

          _context30.next = 8;
          return regeneratorRuntime.awrap(setAttrsAsync({
            wizardOPortee: portee
          }));

        case 8:
        case "end":
          return _context30.stop();
      }
    }
  });
});
on('change:styleCombat', function _callee31() {
  var attrs, Style, agressif, akimbo, ambidextre, couvert, defensif, pilonnage, puissant, suppressionD, suppressionV, rctBM, defBM, description;
  return regeneratorRuntime.async(function _callee31$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          _context31.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['styleCombat']));

        case 2:
          attrs = _context31.sent;
          Style = attrs.styleCombat;
          agressif = '0';
          akimbo = '0';
          ambidextre = '0';
          couvert = '0';
          defensif = '0';
          pilonnage = '0';
          puissant = '0';
          suppressionD = 0;
          suppressionV = 0;
          rctBM = '';
          defBM = '';
          description = '';
          _context31.t0 = Style;
          _context31.next = _context31.t0 === 'couvert' ? 19 : _context31.t0 === 'agressif' ? 23 : _context31.t0 === 'akimbo' ? 28 : _context31.t0 === 'ambidextre' ? 31 : _context31.t0 === 'defensif' ? 34 : _context31.t0 === 'precis' ? 38 : _context31.t0 === 'pilonnage' ? 40 : _context31.t0 === 'puissant' ? 43 : _context31.t0 === 'suppression' ? 48 : 50;
          break;

        case 19:
          couvert = '-3';
          rctBM = '+2';
          description = getTranslationByKey('bonus-style-couvert');
          return _context31.abrupt("break", 50);

        case 23:
          agressif = '+3';
          rctBM = '-2';
          defBM = '-2';
          description = getTranslationByKey('bonus-style-agressif');
          return _context31.abrupt("break", 50);

        case 28:
          akimbo = '-3';
          description = getTranslationByKey('bonus-style-akimbo');
          return _context31.abrupt("break", 50);

        case 31:
          ambidextre = '-3';
          description = getTranslationByKey('bonus-style-ambidextre');
          return _context31.abrupt("break", 50);

        case 34:
          defensif = '-3';
          defBM = '+2';
          description = getTranslationByKey('bonus-style-defensif');
          return _context31.abrupt("break", 50);

        case 38:
          description = getTranslationByKey('bonus-style-precis');
          return _context31.abrupt("break", 50);

        case 40:
          pilonnage = '-2';
          description = getTranslationByKey('bonus-style-pilonnage');
          return _context31.abrupt("break", 50);

        case 43:
          puissant = '@{stylePuissantBonus}';
          rctBM = '-2';
          defBM = '-2';
          description = getTranslationByKey('bonus-style-puissant');
          return _context31.abrupt("break", 50);

        case 48:
          description = getTranslationByKey('bonus-style-suppression');
          return _context31.abrupt("break", 50);

        case 50:
          _context31.next = 52;
          return regeneratorRuntime.awrap(setAttrsAsync({
            atkAgressif: agressif,
            atkAkimbo: akimbo,
            atkAmbidextre: ambidextre,
            atkCouvert: couvert,
            atkDefensif: defensif,
            atkPilonnage: pilonnage,
            atkPuissant: puissant,
            styleSuppressionD: suppressionD,
            styleSuppressionV: suppressionV,
            rctBM: rctBM,
            defBM: defBM,
            styleCombatDescr: description
          }));

        case 52:
        case "end":
          return _context31.stop();
      }
    }
  });
});
on('change:repeating_modules remove:repeating_modules', function () {
  TAS.repeatingSimpleSum('modules', 'moduleSlotTete', 'slotsOccupeTete');
  TAS.repeatingSimpleSum('modules', 'moduleSlotTorse', 'slotsOccupeTorse');
  TAS.repeatingSimpleSum('modules', 'moduleSlotBG', 'slotsOccupeBG');
  TAS.repeatingSimpleSum('modules', 'moduleSlotBD', 'slotsOccupeBD');
  TAS.repeatingSimpleSum('modules', 'moduleSlotJG', 'slotsOccupeJG');
  TAS.repeatingSimpleSum('modules', 'moduleSlotJD', 'slotsOccupeJD');
});
on('change:repeating_modulesDCLion remove:repeating_modulesDCLion', function () {
  TAS.repeatingSimpleSum('modulesDCLion', 'moduleSlotDCLTete', 'slotsUDCLTeteTot');
  TAS.repeatingSimpleSum('modulesDCLion', 'moduleSlotDCLTorse', 'slotsUDCLTorseTot');
  TAS.repeatingSimpleSum('modulesDCLion', 'moduleSlotDCLBG', 'slotsUDCLBGTot');
  TAS.repeatingSimpleSum('modulesDCLion', 'moduleSlotDCLBD', 'slotsUDCLBDTot');
  TAS.repeatingSimpleSum('modulesDCLion', 'moduleSlotDCLJG', 'slotsUDCLJGTot');
  TAS.repeatingSimpleSum('modulesDCLion', 'moduleSlotDCLJD', 'slotsUDCLJDTot');
});
on('change:slotsOccupeTete change:slotsOccupeTorse change:slotsOccupeBG change:slotsOccupeBD change:slotsOccupeJG change:slotsOccupeJD', function _callee32() {
  var attrs, TeO, TeM, ToO, ToM, BGO, BGM, BDO, BDM, JGO, JGM, JDO, JDM, totalTe, totalTo, totalBG, totalBD, totalJG, totalJD, msg;
  return regeneratorRuntime.async(function _callee32$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          _context32.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['slotsOccupeTete', 'slotTeteMax', 'slotsOccupeTorse', 'slotTorseMax', 'slotsOccupeBG', 'slotBGMax', 'slotsOccupeBD', 'slotBDMax', 'slotsOccupeJG', 'slotJGMax', 'slotsOccupeJD', 'slotJDMax']));

        case 2:
          attrs = _context32.sent;
          TeO = parseInt(attrs.slotsOccupeTete, 10) || 0;
          TeM = parseInt(attrs.slotTeteMax, 10) || 0;
          ToO = parseInt(attrs.slotsOccupeTorse, 10) || 0;
          ToM = parseInt(attrs.slotTorseMax, 10) || 0;
          BGO = parseInt(attrs.slotsOccupeBG, 10) || 0;
          BGM = parseInt(attrs.slotBGMax, 10) || 0;
          BDO = parseInt(attrs.slotsOccupeBD, 10) || 0;
          BDM = parseInt(attrs.slotBDMax, 10) || 0;
          JGO = parseInt(attrs.slotsOccupeJG, 10) || 0;
          JGM = parseInt(attrs.slotJGMax, 10) || 0;
          JDO = parseInt(attrs.slotsOccupeJD, 10) || 0;
          JDM = parseInt(attrs.slotJDMax, 10) || 0;
          totalTe = TeM - TeO;
          totalTo = ToM - ToO;
          totalBG = BGM - BGO;
          totalBD = BDM - BDO;
          totalJG = JGM - JGO;
          totalJD = JDM - JDO;
          msg = '';
          PI.msgSlot = 0;

          if (PI.msgEnergie === 1) {
            msg += 'Erreur. Energie Indisponible. ';
          }

          if (totalTe < 0) {
            msg += 'Erreur. ';

            if (PI.msgSlot === 0) {
              PI.msgSlot = 1;
              msg += "Capacité de l'Armure dépassée. ";
            }

            msg += 'Trop de slots occupé au niveau de la tête. ';
          }

          if (totalTo < 0) {
            msg += 'Erreur. ';

            if (PI.msgSlot === 0) {
              PI.msgSlot = 1;
              msg += "Capacité de l'Armure dépassée. ";
            }

            msg += 'Trop de slots occupé au niveau du torse. ';
          }

          if (totalBG < 0) {
            msg += 'Erreur. ';

            if (PI.msgSlot === 0) {
              PI.msgSlot = 1;
              msg += "Capacité de l'Armure dépassée. ";
            }

            msg += 'Trop de slots occupé au niveau du bras gauche. ';
          }

          if (totalBD < 0) {
            msg += 'Erreur. ';

            if (PI.msgSlot === 0) {
              PI.msgSlot = 1;
              msg += "Capacité de l'Armure dépassée. ";
            }

            msg += 'Trop de slots occupé au niveau du bras droit. ';
          }

          if (totalJG < 0) {
            msg += 'Erreur. ';

            if (PI.msgSlot === 0) {
              PI.msgSlot = 1;
              msg += "Capacité de l'Armure dépassée. ";
            }

            msg += 'Trop de slots occupé au niveau de la jambe gauche. ';
          }

          if (totalJD < 0) {
            msg += 'Erreur. ';

            if (PI.msgSlot === 0) {
              PI.msgSlot = 1;
              msg += "Capacité de l'Armure dépassée. ";
            }

            msg += 'Trop de slots occupé au niveau de la jambe droite. ';
          }

          if (msg !== '') {
            setPanneauInformation(msg, true, true);
          } else {
            resetPanneauInformation();
          }

        case 31:
        case "end":
          return _context32.stop();
      }
    }
  });
});
on('change:slotsUDCLTeteTot change:slotsUDCLTorseTot change:slotsUDCLBGTot change:slotsUDCLBDTot change:slotsUDCLJGTot change:slotsUDCLJDTot', function _callee33() {
  var attrs, TeO, TeM, ToO, ToM, BGO, BGM, BDO, BDM, JGO, JGM, JDO, JDM, totalTe, totalTo, totalBG, totalBD, totalJG, totalJD, msg;
  return regeneratorRuntime.async(function _callee33$(_context33) {
    while (1) {
      switch (_context33.prev = _context33.next) {
        case 0:
          _context33.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['slotsUDCLTeteTot', 'slotsDCLTeteMax', 'slotsUDCLTorseTot', 'slotsDCLTorseMax', 'slotsUDCLBGTot', 'slotsDCLBGMax', 'slotsUDCLBDTot', 'slotsDCLBDMax', 'slotsUDCLJGTot', 'slotsDCLJGMax', 'slotsUDCLJDTot', 'slotsDCLJDMax']));

        case 2:
          attrs = _context33.sent;
          TeO = parseInt(attrs.slotsUDCLTeteTot, 10) || 0;
          TeM = parseInt(attrs.slotsDCLTeteMax, 10) || 0;
          ToO = parseInt(attrs.slotsUDCLTorseTot, 10) || 0;
          ToM = parseInt(attrs.slotsDCLTorseMax, 10) || 0;
          BGO = parseInt(attrs.slotsUDCLBGTot, 10) || 0;
          BGM = parseInt(attrs.slotsDCLBGMax, 10) || 0;
          BDO = parseInt(attrs.slotsUDCLBDTot, 10) || 0;
          BDM = parseInt(attrs.slotsDCLBDMax, 10) || 0;
          JGO = parseInt(attrs.slotsUDCLJGTot, 10) || 0;
          JGM = parseInt(attrs.slotsDCLJGMax, 10) || 0;
          JDO = parseInt(attrs.slotsUDCLJDTot, 10) || 0;
          JDM = parseInt(attrs.slotsDCLJDMax, 10) || 0;
          totalTe = TeM - TeO;
          totalTo = ToM - ToO;
          totalBG = BGM - BGO;
          totalBD = BDM - BDO;
          totalJG = JGM - JGO;
          totalJD = JDM - JDO;
          msg = '';
          PI.msgSlot = 0;

          if (PI.msgEnergie === 1) {
            msg += 'Erreur. Energie Indisponible. ';
          }

          if (totalTe < 0) {
            msg += 'Erreur. ';

            if (PI.msgSlot === 0) {
              PI.msgSlot = 1;
              msg += 'Capacité du Compagnon dépassée. ';
            }

            msg += 'Trop de slots occupé au niveau de la tête. ';
          }

          if (totalTo < 0) {
            msg += 'Erreur. ';

            if (PI.msgSlot === 0) {
              PI.msgSlot = 1;
              msg += 'Capacité du Compagnon dépassée. ';
            }

            msg += 'Trop de slots occupé au niveau du torse. ';
          }

          if (totalBG < 0) {
            msg += 'Erreur. ';

            if (PI.msgSlot === 0) {
              PI.msgSlot = 1;
              msg += 'Capacité du Compagnon dépassée. ';
            }

            msg += 'Trop de slots occupé au niveau du bras gauche. ';
          }

          if (totalBD < 0) {
            msg += 'Erreur. ';

            if (PI.msgSlot === 0) {
              PI.msgSlot = 1;
              msg += 'Capacité du Compagnon dépassée. ';
            }

            msg += 'Trop de slots occupé au niveau du bras droit. ';
          }

          if (totalJG < 0) {
            msg += 'Erreur. ';

            if (PI.msgSlot === 0) {
              PI.msgSlot = 1;
              msg += 'Capacité du Compagnon dépassée. ';
            }

            msg += 'Trop de slots occupé au niveau de la jambe gauche. ';
          }

          if (totalJD < 0) {
            msg += 'Erreur. ';

            if (PI.msgSlot === 0) {
              PI.msgSlot = 1;
              msg += 'Capacité du Compagnon dépassée. ';
            }

            msg += 'Trop de slots occupé au niveau de la jambe droite. ';
          }

          if (msg !== '') {
            setPanneauInformation(msg, true, true);
          } else {
            resetPanneauInformation();
          }

        case 31:
        case "end":
          return _context33.stop();
      }
    }
  });
});
on('change:repeating_equipDefensif:porte change:repeating_equipDefensif:defenseBonus change:repeating_equipDefensif:reactionBonus', function _callee34(eventInfo) {
  var attrs, id, equipe, defense, reaction, update;
  return regeneratorRuntime.async(function _callee34$(_context34) {
    while (1) {
      switch (_context34.prev = _context34.next) {
        case 0:
          _context34.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['repeating_equipDefensif_defenseBonus', 'repeating_equipDefensif_reactionBonus', 'repeating_equipDefensif_porte']));

        case 2:
          attrs = _context34.sent;
          id = eventInfo.sourceAttribute.split('_')[2];
          equipe = +attrs.repeating_equipDefensif_porte;
          defense = 0;
          reaction = 0;

          if (equipe === 1) {
            defense = +attrs.repeating_equipDefensif_defenseBonus;
            reaction = +attrs.repeating_equipDefensif_reactionBonus;
          }

          update = {};
          update["repeating_equipDefensif_".concat(id, "_defLigne")] = defense;
          update["repeating_equipDefensif_".concat(id, "_reaLigne")] = reaction;
          _context34.next = 13;
          return regeneratorRuntime.awrap(setAttrsAsync(update));

        case 13:
        case "end":
          return _context34.stop();
      }
    }
  });
});
on('change:repeating_equipDefensif:reaLigne remove:repeating_equipDefensif:reaLigne', function () {
  TAS.repeatingSimpleSum('equipDefensif', 'reaLigne', 'bonusReaction');
});
on('change:repeating_equipDefensif:defLigne remove:repeating_equipDefensif:defLigne', function () {
  TAS.repeatingSimpleSum('equipDefensif', 'defLigne', 'bonusDefense');
});
on('change:calODEnd change:armure', function _callee35() {
  var attrs, armure, OD, bonus;
  return regeneratorRuntime.async(function _callee35$(_context35) {
    while (1) {
      switch (_context35.prev = _context35.next) {
        case 0:
          _context35.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['armure', 'calODEnd']));

        case 2:
          attrs = _context35.sent;
          armure = attrs.armure;
          OD = +attrs.calODEnd;
          bonus = 6;

          if (armure === 'sans' || armure === 'guardian' || OD < 3) {
            bonus = 0;
          }

          _context35.next = 9;
          return regeneratorRuntime.awrap(setAttrsAsync({
            santeODBonus: bonus
          }));

        case 9:
        case "end":
          return _context35.stop();
      }
    }
  });
});
on('change:calODCom change:armure', function _callee36() {
  var attrs, armure, OD, bonus, bonusAkimbo, bonusAmbidextrie;
  return regeneratorRuntime.async(function _callee36$(_context36) {
    while (1) {
      switch (_context36.prev = _context36.next) {
        case 0:
          _context36.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['armure', 'calODCom']));

        case 2:
          attrs = _context36.sent;
          armure = attrs.armure;
          OD = +attrs.calODCom;
          bonus = 0;
          bonusAkimbo = 0;
          bonusAmbidextrie = 0;

          if (!(armure === 'sans' || armure === 'guardian')) {
            _context36.next = 14;
            break;
          }

          bonus = 0;
          bonusAkimbo = 0;
          bonusAmbidextrie = 0;
          _context36.next = 33;
          break;

        case 14:
          _context36.t0 = OD;
          _context36.next = _context36.t0 === 2 ? 17 : _context36.t0 === 3 ? 21 : _context36.t0 === 4 ? 25 : _context36.t0 === 5 ? 25 : 29;
          break;

        case 17:
          bonus = 2;
          bonusAkimbo = 0;
          bonusAmbidextrie = 0;
          return _context36.abrupt("break", 33);

        case 21:
          bonus = 2;
          bonusAkimbo = 2;
          bonusAmbidextrie = 0;
          return _context36.abrupt("break", 33);

        case 25:
          bonus = 2;
          bonusAkimbo = 2;
          bonusAmbidextrie = 2;
          return _context36.abrupt("break", 33);

        case 29:
          bonus = 0;
          bonusAkimbo = 0;
          bonusAmbidextrie = 0;
          return _context36.abrupt("break", 33);

        case 33:
          _context36.next = 35;
          return regeneratorRuntime.awrap(setAttrsAsync({
            reactionODBonus: bonus,
            akimboContactODBonus: bonusAkimbo,
            ambidextrieContactODBonus: bonusAmbidextrie
          }));

        case 35:
        case "end":
          return _context36.stop();
      }
    }
  });
});
on('change:calODIns change:armure', function _callee37() {
  var attrs, armure, OD, bonus;
  return regeneratorRuntime.async(function _callee37$(_context37) {
    while (1) {
      switch (_context37.prev = _context37.next) {
        case 0:
          _context37.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['armure', 'calODIns']));

        case 2:
          attrs = _context37.sent;
          armure = attrs.armure;
          OD = +attrs.calODIns;
          bonus = 3 * OD;

          if (armure === 'sans' || armure === 'guardian' || OD < 3) {
            bonus = 0;
          }

          _context37.next = 9;
          return regeneratorRuntime.awrap(setAttrsAsync({
            initiativeODBonus: bonus
          }));

        case 9:
        case "end":
          return _context37.stop();
      }
    }
  });
});
on('change:calODTir change:armure', function _callee38() {
  var attrs, armure, OD, bonusAkimbo, bonusAmbidextrie;
  return regeneratorRuntime.async(function _callee38$(_context38) {
    while (1) {
      switch (_context38.prev = _context38.next) {
        case 0:
          _context38.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['armure', 'calODTir']));

        case 2:
          attrs = _context38.sent;
          armure = attrs.armure;
          OD = +attrs.calODTir;
          bonusAkimbo = 0;
          bonusAmbidextrie = 0;

          if (!(armure === 'sans' || armure === 'guardian')) {
            _context38.next = 12;
            break;
          }

          bonusAkimbo = 0;
          bonusAmbidextrie = 0;
          _context38.next = 24;
          break;

        case 12:
          _context38.t0 = OD;
          _context38.next = _context38.t0 === 3 ? 15 : _context38.t0 === 4 ? 18 : _context38.t0 === 5 ? 18 : 21;
          break;

        case 15:
          bonusAkimbo = 2;
          bonusAmbidextrie = 0;
          return _context38.abrupt("break", 24);

        case 18:
          bonusAkimbo = 2;
          bonusAmbidextrie = 2;
          return _context38.abrupt("break", 24);

        case 21:
          bonusAkimbo = 0;
          bonusAmbidextrie = 0;
          return _context38.abrupt("break", 24);

        case 24:
          _context38.next = 26;
          return regeneratorRuntime.awrap(setAttrsAsync({
            akimboDistanceODBonus: bonusAkimbo,
            ambidextrieDistanceODBonus: bonusAmbidextrie
          }));

        case 26:
        case "end":
          return _context38.stop();
      }
    }
  });
});
on('change:calODAur change:aura change:armure', function _callee39() {
  var attrs, armure, OD, carac, bonus;
  return regeneratorRuntime.async(function _callee39$(_context39) {
    while (1) {
      switch (_context39.prev = _context39.next) {
        case 0:
          _context39.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['armure', 'calODAur', 'aura']));

        case 2:
          attrs = _context39.sent;
          armure = attrs.armure;
          OD = +attrs.calODAur;
          carac = +attrs.aura;
          bonus = carac;

          if (armure === 'sans' || armure === 'guardian' || OD < 5) {
            bonus = 0;
          }

          _context39.next = 10;
          return regeneratorRuntime.awrap(setAttrsAsync({
            defenseODBonus: bonus
          }));

        case 10:
        case "end":
          return _context39.stop();
      }
    }
  });
});
on('change:calODDis change:armure', function _callee40() {
  var attrs, armure, OD, bonus;
  return regeneratorRuntime.async(function _callee40$(_context40) {
    while (1) {
      switch (_context40.prev = _context40.next) {
        case 0:
          _context40.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['armure', 'calODDis']));

        case 2:
          attrs = _context40.sent;
          armure = attrs.armure;
          OD = +attrs.calODDis;
          bonus = '';

          if (armure === 'sans' || armure === 'guardian' || OD < 3) {
            bonus = '';
          } else if (OD === 4) {
            bonus = '{{ODDiscretion=[[@{discretion}]]}}';
          } else if (OD === 5) {
            bonus = '{{ODDiscretion=[[@{discretion}+@{calODDis}]]}}';
          }

          _context40.next = 9;
          return regeneratorRuntime.awrap(setAttrsAsync({
            discretionDegatsBonus: bonus
          }));

        case 9:
        case "end":
          return _context40.stop();
      }
    }
  });
});
on('change:warriorSoldierA change:warrior250PG change:deplOD change:forOD change:endOD', function _callee41() {
  var attrs, PG250, mode, OD1, OD2, OD3, bonus, update;
  return regeneratorRuntime.async(function _callee41$(_context41) {
    while (1) {
      switch (_context41.prev = _context41.next) {
        case 0:
          _context41.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['warriorSoldierA', 'warrior250PG', 'deplOD', 'forOD', 'endOD']));

        case 2:
          attrs = _context41.sent;
          PG250 = +attrs.warrior250PG;
          mode = +attrs.warriorSoldierA;
          OD1 = +attrs.deplOD;
          OD2 = +attrs.forOD;
          OD3 = +attrs.endOD;
          bonus = 0;
          update = {};

          if (mode !== 0) {
            bonus += 1;
            bonus += PG250;
            update.warriorHunterA = 0;
            update.warriorScholarA = 0;
            update.warriorHeraldA = 0;
            update.warriorScoutA = 0;
          }

          update.calODDep = OD1 + bonus;
          update.calODFor = OD2 + bonus;
          update.calODEnd = OD3 + bonus;
          _context41.next = 16;
          return regeneratorRuntime.awrap(setAttrsAsync(update));

        case 16:
        case "end":
          return _context41.stop();
      }
    }
  });
});
on('change:warriorHunterA change:warrior250PG change:hargneOD change:combOD change:instOD', function _callee42() {
  var attrs, PG250, mode, OD1, OD2, OD3, bonus, update;
  return regeneratorRuntime.async(function _callee42$(_context42) {
    while (1) {
      switch (_context42.prev = _context42.next) {
        case 0:
          _context42.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['warriorHunterA', 'warrior250PG', 'hargneOD', 'combOD', 'instOD']));

        case 2:
          attrs = _context42.sent;
          PG250 = +attrs.warrior250PG;
          mode = +attrs.warriorHunterA;
          OD1 = +attrs.hargneOD;
          OD2 = +attrs.combOD;
          OD3 = +attrs.instOD;
          bonus = 0;
          update = {};

          if (mode !== 0) {
            bonus += 1;
            bonus += PG250;
            update.warriorSoldierA = 0;
            update.warriorScholarA = 0;
            update.warriorHeraldA = 0;
            update.warriorScoutA = 0;
          }

          update.calODHar = OD1 + bonus;
          update.calODCom = OD2 + bonus;
          update.calODIns = OD3 + bonus;
          _context42.next = 16;
          return regeneratorRuntime.awrap(setAttrsAsync(update));

        case 16:
        case "end":
          return _context42.stop();
      }
    }
  });
});
on('change:warriorScholarA change:warrior250PG change:tirOD change:savoirOD change:technOD', function _callee43() {
  var attrs, PG250, mode, OD1, OD2, OD3, bonus, update;
  return regeneratorRuntime.async(function _callee43$(_context43) {
    while (1) {
      switch (_context43.prev = _context43.next) {
        case 0:
          _context43.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['warriorScholarA', 'warrior250PG', 'tirOD', 'savoirOD', 'technOD']));

        case 2:
          attrs = _context43.sent;
          PG250 = +attrs.warrior250PG;
          mode = +attrs.warriorScholarA;
          OD1 = +attrs.tirOD;
          OD2 = +attrs.savoirOD;
          OD3 = +attrs.technOD;
          bonus = 0;
          update = {};

          if (mode !== 0) {
            bonus += 1;
            bonus += PG250;
            update.warriorSoldierA = 0;
            update.warriorHunterA = 0;
            update.warriorHeraldA = 0;
            update.warriorScoutA = 0;
          }

          update.calODTir = OD1 + bonus;
          update.calODSav = OD2 + bonus;
          update.calODTec = OD3 + bonus;
          _context43.next = 16;
          return regeneratorRuntime.awrap(setAttrsAsync(update));

        case 16:
        case "end":
          return _context43.stop();
      }
    }
  });
});
on('change:warriorHeraldA change:warrior250PG change:auraOD change:paroleOD change:sfOD', function _callee44() {
  var attrs, PG250, mode, OD1, OD2, OD3, bonus, update;
  return regeneratorRuntime.async(function _callee44$(_context44) {
    while (1) {
      switch (_context44.prev = _context44.next) {
        case 0:
          _context44.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['warriorHeraldA', 'warrior250PG', 'auraOD', 'paroleOD', 'sfOD']));

        case 2:
          attrs = _context44.sent;
          PG250 = +attrs.warrior250PG;
          mode = +attrs.warriorHeraldA;
          OD1 = +attrs.auraOD;
          OD2 = +attrs.paroleOD;
          OD3 = +attrs.sfOD;
          bonus = 0;
          update = {};

          if (mode !== 0) {
            bonus += 1;
            bonus += PG250;
            update.warriorSoldierA = 0;
            update.warriorHunterA = 0;
            update.warriorScholarA = 0;
            update.warriorScoutA = 0;
          }

          update.calODAur = OD1 + bonus;
          update.calODPar = OD2 + bonus;
          update.calODSFR = OD3 + bonus;
          _context44.next = 16;
          return regeneratorRuntime.awrap(setAttrsAsync(update));

        case 16:
        case "end":
          return _context44.stop();
      }
    }
  });
});
on('change:warriorScoutA change:warrior250PG change:discrOD change:percOD change:dextOD', function _callee45() {
  var attrs, PG250, mode, OD1, OD2, OD3, bonus, update;
  return regeneratorRuntime.async(function _callee45$(_context45) {
    while (1) {
      switch (_context45.prev = _context45.next) {
        case 0:
          _context45.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['warriorScoutA', 'warrior250PG', 'discrOD', 'percOD', 'dextOD']));

        case 2:
          attrs = _context45.sent;
          PG250 = +attrs.warrior250PG;
          mode = +attrs.warriorScoutA;
          OD1 = +attrs.discrOD;
          OD2 = +attrs.percOD;
          OD3 = +attrs.dextOD;
          bonus = 0;
          update = {};

          if (mode !== 0) {
            bonus += 1;
            bonus += PG250;
            update.warriorSoldierA = 0;
            update.warriorHunterA = 0;
            update.warriorScholarA = 0;
            update.warriorHeraldA = 0;
          }

          update.calODDis = OD1 + bonus;
          update.calODPer = OD2 + bonus;
          update.calODDex = OD3 + bonus;
          _context45.next = 16;
          return regeneratorRuntime.awrap(setAttrsAsync(update));

        case 16:
        case "end":
          return _context45.stop();
      }
    }
  });
});
on('change:druidWolfConfiguration', function _callee46() {
  var attrs, mode, PE;
  return regeneratorRuntime.async(function _callee46$(_context46) {
    while (1) {
      switch (_context46.prev = _context46.next) {
        case 0:
          _context46.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['druidWolfConfiguration']));

        case 2:
          attrs = _context46.sent;
          mode = attrs.druidWolfConfiguration;
          PE = 0;

          if (mode === 'Labor' || mode === 'Medic' || mode === 'Recon') {
            PE = 1;
          }

          if (mode === 'Tech' || mode === 'Fighter') {
            PE = 2;
          }

          _context46.next = 9;
          return regeneratorRuntime.awrap(setAttrsAsync({
            druidWolfConfigurationPE: PE
          }));

        case 9:
        case "end":
          return _context46.stop();
      }
    }
  });
}); // META-ARMURE DE LEGENDE

on('change:armureLegende', function (eventInfo) {
  var mal = eventInfo.newValue;

  switch (mal) {
    case 'warrior':
      setAttrs({
        popup: 3
      });
      break;

    case 'priest':
      setAttrs({
        popup: 4
      });
      break;

    case 'warmaster':
      setAttrs({
        popup: 5
      });
      break;

    case 'psion':
      setAttrs({
        popup: 6
      });
      break;

    case 'warlock':
      setAttrs({
        popup: 7
      });
      break;

    case 'druid':
      setAttrs({
        popup: 8
      });
      break;
  }
});
on('clicked:selectionMALWarrior', function _callee47() {
  var attrs, choix;
  return regeneratorRuntime.async(function _callee47$(_context47) {
    while (1) {
      switch (_context47.prev = _context47.next) {
        case 0:
          _context47.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['listeTypeMALWarrior']));

        case 2:
          attrs = _context47.sent;
          choix = parseInt(attrs.listeTypeMALWarrior, 10) || 0;
          _context47.next = 6;
          return regeneratorRuntime.awrap(setAttrsAsync({
            malwarriortype: choix,
            popup: 0
          }));

        case 6:
        case "end":
          return _context47.stop();
      }
    }
  });
});
on('clicked:selectionMALPriest', function _callee48() {
  var attrs, choix;
  return regeneratorRuntime.async(function _callee48$(_context48) {
    while (1) {
      switch (_context48.prev = _context48.next) {
        case 0:
          _context48.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['listeTypeMALPriest']));

        case 2:
          attrs = _context48.sent;
          choix = parseInt(attrs.listeTypeMALPriest, 10) || 0;
          _context48.next = 6;
          return regeneratorRuntime.awrap(setAttrsAsync({
            malpriestmode: choix,
            popup: 0
          }));

        case 6:
        case "end":
          return _context48.stop();
      }
    }
  });
});
on('clicked:selectionMALWarmaster', function _callee49() {
  var attrs, choix, popup;
  return regeneratorRuntime.async(function _callee49$(_context49) {
    while (1) {
      switch (_context49.prev = _context49.next) {
        case 0:
          _context49.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['listeTypeMALWarmaster']));

        case 2:
          attrs = _context49.sent;
          choix = parseInt(attrs.listeTypeMALWarmaster, 10) || 0;
          popup = 0;

          if (choix === 1) {
            popup = 9;
          }

          _context49.next = 8;
          return regeneratorRuntime.awrap(setAttrsAsync({
            malwarmastermode: choix,
            popup: popup
          }));

        case 8:
        case "end":
          return _context49.stop();
      }
    }
  });
});
on('clicked:selectionMALWarmasterWarlord', function _callee50() {
  var attrs, choix;
  return regeneratorRuntime.async(function _callee50$(_context50) {
    while (1) {
      switch (_context50.prev = _context50.next) {
        case 0:
          _context50.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['listeTypeMALWarmasterWarlord']));

        case 2:
          attrs = _context50.sent;
          choix = parseInt(attrs.listeTypeMALWarmasterWarlord, 10) || 0;
          _context50.next = 6;
          return regeneratorRuntime.awrap(setAttrsAsync({
            malwarmasterwarlord: choix,
            popup: 0
          }));

        case 6:
        case "end":
          return _context50.stop();
      }
    }
  });
});
on('clicked:selectionMALPsion', function _callee51() {
  var attrs, choix;
  return regeneratorRuntime.async(function _callee51$(_context51) {
    while (1) {
      switch (_context51.prev = _context51.next) {
        case 0:
          _context51.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['listeModeMALPsion']));

        case 2:
          attrs = _context51.sent;
          choix = parseInt(attrs.listeModeMALPsion, 10) || 0;
          _context51.next = 6;
          return regeneratorRuntime.awrap(setAttrsAsync({
            malpsionmode: choix,
            popup: 0
          }));

        case 6:
        case "end":
          return _context51.stop();
      }
    }
  });
});
on('clicked:selectionMALWarlock', function _callee52() {
  var attrs, choix;
  return regeneratorRuntime.async(function _callee52$(_context52) {
    while (1) {
      switch (_context52.prev = _context52.next) {
        case 0:
          _context52.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['listeModeMALWarlock']));

        case 2:
          attrs = _context52.sent;
          choix = parseInt(attrs.listeModeMALWarlock, 10) || 0;
          _context52.next = 6;
          return regeneratorRuntime.awrap(setAttrsAsync({
            malwarlockmode: choix,
            popup: 0
          }));

        case 6:
        case "end":
          return _context52.stop();
      }
    }
  });
});
on('clicked:selectionMALDruid', function _callee53() {
  var attrs, choix;
  return regeneratorRuntime.async(function _callee53$(_context53) {
    while (1) {
      switch (_context53.prev = _context53.next) {
        case 0:
          _context53.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['listeModeMALDruid']));

        case 2:
          attrs = _context53.sent;
          choix = parseInt(attrs.listeModeMALDruid, 10) || 0;
          _context53.next = 6;
          return regeneratorRuntime.awrap(setAttrsAsync({
            maldruidmod: choix,
            popup: 0
          }));

        case 6:
        case "end":
          return _context53.stop();
      }
    }
  });
});
on('change:repeating_modulesMALDCLion remove:repeating_modulesMALDCLion', function () {
  TAS.repeatingSimpleSum('modulesMALDCLion', 'moduleSlotMALDCLTete', 'slotsMALUDCLTeteTot');
  TAS.repeatingSimpleSum('modulesMALDCLion', 'moduleSlotMALDCLTorse', 'slotsMALUDCLTorseTot');
  TAS.repeatingSimpleSum('modulesMALDCLion', 'moduleSlotMALDCLBG', 'slotsMALUDCLBGTot');
  TAS.repeatingSimpleSum('modulesMALDCLion', 'moduleSlotMALDCLBD', 'slotsMALUDCLBDTot');
  TAS.repeatingSimpleSum('modulesMALDCLion', 'moduleSlotMALDCLJG', 'slotsMALUDCLJGTot');
  TAS.repeatingSimpleSum('modulesMALDCLion', 'moduleSlotMALDCLJD', 'slotsMALUDCLJDTot');
});
on('change:slotsMALUDCLTeteTot change:slotsMALUDCLTorseTot change:slotsMALUDCLBGTot change:slotsMALUDCLBDTot change:slotsMALUDCLJGTot change:slotsMALUDCLJDTot', function _callee54() {
  var attrs, TeO, TeM, ToO, ToM, BGO, BGM, BDO, BDM, JGO, JGM, JDO, JDM, totalTe, totalTo, totalBG, totalBD, totalJG, totalJD, msg;
  return regeneratorRuntime.async(function _callee54$(_context54) {
    while (1) {
      switch (_context54.prev = _context54.next) {
        case 0:
          _context54.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['slotsMALUDCLTeteTot', 'slotsMALDCLTeteMax', 'slotsMALUDCLTorseTot', 'slotsMALDCLTorseMax', 'slotsMALUDCLBGTot', 'slotsMALDCLBGMax', 'slotsMALUDCLBDTot', 'slotsMALDCLBDMax', 'slotsMALUDCLJGTot', 'slotsMALDCLJGMax', 'slotsMALUDCLJDTot', 'slotsMALDCLJDMax']));

        case 2:
          attrs = _context54.sent;
          TeO = parseInt(attrs.slotsMALUDCLTeteTot, 10) || 0;
          TeM = parseInt(attrs.slotsMALDCLTeteMax, 10) || 0;
          ToO = parseInt(attrs.slotsMALUDCLTorseTot, 10) || 0;
          ToM = parseInt(attrs.slotsMALDCLTorseMax, 10) || 0;
          BGO = parseInt(attrs.slotsMALUDCLBGTot, 10) || 0;
          BGM = parseInt(attrs.slotsMALDCLBGMax, 10) || 0;
          BDO = parseInt(attrs.slotsMALUDCLBDTot, 10) || 0;
          BDM = parseInt(attrs.slotsMALDCLBDMax, 10) || 0;
          JGO = parseInt(attrs.slotsMALUDCLJGTot, 10) || 0;
          JGM = parseInt(attrs.slotsMALDCLJGMax, 10) || 0;
          JDO = parseInt(attrs.slotsMALUDCLJDTot, 10) || 0;
          JDM = parseInt(attrs.slotsMALDCLJDMax, 10) || 0;
          totalTe = TeM - TeO;
          totalTo = ToM - ToO;
          totalBG = BGM - BGO;
          totalBD = BDM - BDO;
          totalJG = JGM - JGO;
          totalJD = JDM - JDO;
          msg = '';
          PI.msgSlot = 0;

          if (PI.msgEnergie === 1) {
            msg += 'Erreur. Energie Indisponible. ';
          }

          if (totalTe < 0) {
            msg += 'Erreur. ';

            if (PI.msgSlot === 0) {
              PI.msgSlot = 1;
              msg += 'Capacité du Compagnon dépassée. ';
            }

            msg += 'Trop de slots occupé au niveau de la tête. ';
          }

          if (totalTo < 0) {
            msg += 'Erreur. ';

            if (PI.msgSlot === 0) {
              PI.msgSlot = 1;
              msg += 'Capacité du Compagnon dépassée. ';
            }

            msg += 'Trop de slots occupé au niveau du torse. ';
          }

          if (totalBG < 0) {
            msg += 'Erreur. ';

            if (PI.msgSlot === 0) {
              PI.msgSlot = 1;
              msg += 'Capacité du Compagnon dépassée. ';
            }

            msg += 'Trop de slots occupé au niveau du bras gauche. ';
          }

          if (totalBD < 0) {
            msg += 'Erreur. ';

            if (PI.msgSlot === 0) {
              PI.msgSlot = 1;
              msg += 'Capacité du Compagnon dépassée. ';
            }

            msg += 'Trop de slots occupé au niveau du bras droit. ';
          }

          if (totalJG < 0) {
            msg += 'Erreur. ';

            if (PI.msgSlot === 0) {
              PI.msgSlot = 1;
              msg += 'Capacité du Compagnon dépassée. ';
            }

            msg += 'Trop de slots occupé au niveau de la jambe gauche. ';
          }

          if (totalJD < 0) {
            msg += 'Erreur. ';

            if (PI.msgSlot === 0) {
              PI.msgSlot = 1;
              msg += 'Capacité du Compagnon dépassée. ';
            }

            msg += 'Trop de slots occupé au niveau de la jambe droite. ';
          }

          if (msg !== '') {
            setPanneauInformation(msg, true, true);
          } else {
            resetPanneauInformation();
          }

        case 31:
        case "end":
          return _context54.stop();
      }
    }
  });
});
on('clicked:repeating_modulesmaldclion:pemdlion', function _callee55() {
  var attrs, PEM, PE, total;
  return regeneratorRuntime.async(function _callee55$(_context55) {
    while (1) {
      switch (_context55.prev = _context55.next) {
        case 0:
          _context55.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['repeating_modules_moduleEnergieMALDCLion', 'MALDruidLionPEAct']));

        case 2:
          attrs = _context55.sent;
          PEM = parseInt(attrs.repeating_modules_moduleEnergieMALDCLion, 10) || 0;
          PE = parseInt(attrs.MALDruidLionPEAct, 10) || 0;
          total = PE - PEM;

          if (total < 0) {
            setPanneauInformation('Erreur. Energie Indisponible.', false, false, true);
            PI.msgEnergie = 1;
          } else {
            setAttrs({
              MALDruidLionPEAct: total
            });
          }

        case 7:
        case "end":
          return _context55.stop();
      }
    }
  });
});
on('change:MALWarriorSoldierA change:deplOD change:forOD change:endOD', function _callee56() {
  var attrs, mode, OD1, OD2, OD3, bonus, update;
  return regeneratorRuntime.async(function _callee56$(_context56) {
    while (1) {
      switch (_context56.prev = _context56.next) {
        case 0:
          _context56.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['MALWarriorSoldierA', 'deplOD', 'forOD', 'endOD']));

        case 2:
          attrs = _context56.sent;
          mode = +attrs.MALWarriorSoldierA;
          OD1 = +attrs.deplOD;
          OD2 = +attrs.forOD;
          OD3 = +attrs.endOD;
          bonus = 0;
          update = {};

          if (mode !== 0) {
            bonus += 1;
          }

          update.calODDep = OD1 + bonus;
          update.calODFor = OD2 + bonus;
          update.calODEnd = OD3 + bonus;
          _context56.next = 15;
          return regeneratorRuntime.awrap(setAttrsAsync(update));

        case 15:
        case "end":
          return _context56.stop();
      }
    }
  });
});
on('change:MALWarriorHunterA change:hargneOD change:combOD change:instOD', function _callee57() {
  var attrs, mode, OD1, OD2, OD3, bonus, update;
  return regeneratorRuntime.async(function _callee57$(_context57) {
    while (1) {
      switch (_context57.prev = _context57.next) {
        case 0:
          _context57.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['MALWarriorHunterA', 'hargneOD', 'combOD', 'instOD']));

        case 2:
          attrs = _context57.sent;
          mode = +attrs.MALWarriorHunterA;
          OD1 = +attrs.hargneOD;
          OD2 = +attrs.combOD;
          OD3 = +attrs.instOD;
          bonus = 0;
          update = {};

          if (mode !== 0) {
            bonus += 1;
          }

          update.calODHar = OD1 + bonus;
          update.calODCom = OD2 + bonus;
          update.calODIns = OD3 + bonus;
          _context57.next = 15;
          return regeneratorRuntime.awrap(setAttrsAsync(update));

        case 15:
        case "end":
          return _context57.stop();
      }
    }
  });
});
on('change:MALWarriorScholarA change:tirOD change:savoirOD change:technOD', function _callee58() {
  var attrs, mode, OD1, OD2, OD3, bonus, update;
  return regeneratorRuntime.async(function _callee58$(_context58) {
    while (1) {
      switch (_context58.prev = _context58.next) {
        case 0:
          _context58.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['MALWarriorScholarA', 'tirOD', 'savoirOD', 'technOD']));

        case 2:
          attrs = _context58.sent;
          mode = +attrs.MALWarriorScholarA;
          OD1 = +attrs.tirOD;
          OD2 = +attrs.savoirOD;
          OD3 = +attrs.technOD;
          bonus = 0;
          update = {};

          if (mode !== 0) {
            bonus += 1;
          }

          update.calODTir = OD1 + bonus;
          update.calODSav = OD2 + bonus;
          update.calODTec = OD3 + bonus;
          _context58.next = 15;
          return regeneratorRuntime.awrap(setAttrsAsync(update));

        case 15:
        case "end":
          return _context58.stop();
      }
    }
  });
});
on('change:MALWarriorHeraldA change:auraOD change:paroleOD change:sfOD', function _callee59() {
  var attrs, mode, OD1, OD2, OD3, bonus, update;
  return regeneratorRuntime.async(function _callee59$(_context59) {
    while (1) {
      switch (_context59.prev = _context59.next) {
        case 0:
          _context59.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['MALWarriorHeraldA', 'auraOD', 'paroleOD', 'sfOD']));

        case 2:
          attrs = _context59.sent;
          mode = +attrs.MALWarriorHeraldA;
          OD1 = +attrs.auraOD;
          OD2 = +attrs.paroleOD;
          OD3 = +attrs.sfOD;
          bonus = 0;
          update = {};

          if (mode !== 0) {
            bonus += 1;
          }

          update.calODAur = OD1 + bonus;
          update.calODPar = OD2 + bonus;
          update.calODSFR = OD3 + bonus;
          _context59.next = 15;
          return regeneratorRuntime.awrap(setAttrsAsync(update));

        case 15:
        case "end":
          return _context59.stop();
      }
    }
  });
});
on('change:MALWarriorScoutA change:discrOD change:percOD change:dextOD', function _callee60() {
  var attrs, mode, OD1, OD2, OD3, bonus, update;
  return regeneratorRuntime.async(function _callee60$(_context60) {
    while (1) {
      switch (_context60.prev = _context60.next) {
        case 0:
          _context60.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['MALWarriorScoutA', 'discrOD', 'percOD', 'dextOD']));

        case 2:
          attrs = _context60.sent;
          mode = +attrs.MALWarriorScoutA;
          OD1 = +attrs.discrOD;
          OD2 = +attrs.percOD;
          OD3 = +attrs.dextOD;
          bonus = 0;
          update = {};

          if (mode !== 0) {
            bonus += 1;
          }

          update.calODDis = OD1 + bonus;
          update.calODPer = OD2 + bonus;
          update.calODDex = OD3 + bonus;
          _context60.next = 15;
          return regeneratorRuntime.awrap(setAttrsAsync(update));

        case 15:
        case "end":
          return _context60.stop();
      }
    }
  });
});
on('change:MALBarbarianGoliath', function _callee61() {
  var attrs, goliath, defense, reaction, dgts;
  return regeneratorRuntime.async(function _callee61$(_context61) {
    while (1) {
      switch (_context61.prev = _context61.next) {
        case 0:
          _context61.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['MALBarbarianGoliath']));

        case 2:
          attrs = _context61.sent;
          goliath = +attrs.MALBarbarianGoliath;
          defense = goliath;
          reaction = goliath * 2;
          dgts = "".concat(goliath, "D6");
          _context61.next = 9;
          return regeneratorRuntime.awrap(setAttrsAsync({
            MALBarbarianDef: defense,
            MALBarbarianRea: reaction,
            MALBarbarianDegat: dgts
          }));

        case 9:
        case "end":
          return _context61.stop();
      }
    }
  });
});
on('change:MALDruidWolfConfiguration', function _callee62() {
  var attrs, mode, PE;
  return regeneratorRuntime.async(function _callee62$(_context62) {
    while (1) {
      switch (_context62.prev = _context62.next) {
        case 0:
          _context62.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['MALDruidWolfConfiguration']));

        case 2:
          attrs = _context62.sent;
          mode = attrs.MALDruidWolfConfiguration;
          PE = 0;

          if (mode === 'Labor' || mode === 'Medic' || mode === 'Recon') {
            PE = 1;
          }

          if (mode === 'Tech' || mode === 'Fighter') {
            PE = 2;
          }

          _context62.next = 9;
          return regeneratorRuntime.awrap(setAttrsAsync({
            MAJDruidWolfConfigurationPE: PE
          }));

        case 9:
        case "end":
          return _context62.stop();
      }
    }
  });
});
on('change:tabArmureLegende', function (eventInfo) {
  var mal = eventInfo.newValue;

  if (mal === '0') {
    setAttrs({
      armureLegende: 'sans'
    });
  }
}); // FIN META-ARMURE DE LEGENDE

on('change:bonusCarac', function _callee63() {
  var attrs, bonus, update;
  return regeneratorRuntime.async(function _callee63$(_context63) {
    while (1) {
      switch (_context63.prev = _context63.next) {
        case 0:
          _context63.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['bonusCarac']));

        case 2:
          attrs = _context63.sent;
          bonus = +attrs.bonusCarac;
          update = {};

          if (bonus === 1) {
            update.caracteristique4 = '';
          }

          if (bonus !== 2 && bonus !== 1) {
            update.caracteristique3 = '';
            update.caracteristique4 = '';
          }

          _context63.next = 9;
          return regeneratorRuntime.awrap(setAttrsAsync(update));

        case 9:
        case "end":
          return _context63.stop();
      }
    }
  });
});
on('clicked:capaciteUltime', function _callee64() {
  var attrs, cout, PE, total;
  return regeneratorRuntime.async(function _callee64$(_context64) {
    while (1) {
      switch (_context64.prev = _context64.next) {
        case 0:
          _context64.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['coutCapaciteUltime', 'energiePJ']));

        case 2:
          attrs = _context64.sent;
          cout = +attrs.coutCapaciteUltime;
          PE = +attrs.energiePJ;
          total = PE - cout;

          if (!(total < 0)) {
            _context64.next = 11;
            break;
          }

          setPanneauInformation('Erreur. Energie Indisponible.', false, false, true);
          PI.msgEnergie = 1;
          _context64.next = 13;
          break;

        case 11:
          _context64.next = 13;
          return regeneratorRuntime.awrap(setAttrsAsync({
            energiePJ: total
          }));

        case 13:
        case "end":
          return _context64.stop();
      }
    }
  });
});
on('change:fichePNJ change:diceInitiative change:bonusInitiativeP change:malusInitiative change:MasquePNJAEMaj', function _callee65() {
  var attrs, fiche, masque;
  return regeneratorRuntime.async(function _callee65$(_context65) {
    while (1) {
      switch (_context65.prev = _context65.next) {
        case 0:
          _context65.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['fichePNJ', 'MasquePNJAEMaj']));

        case 2:
          attrs = _context65.sent;
          fiche = +attrs.fichePNJ;
          masque = +attrs.MasquePNJAEMaj;

          if (!(fiche === 1 || fiche === 2)) {
            _context65.next = 9;
            break;
          }

          if (!(masque > 0)) {
            _context65.next = 9;
            break;
          }

          _context65.next = 9;
          return regeneratorRuntime.awrap(setAttrsAsync({
            diceInitiative: 0,
            bonusInitiativeP: 30,
            malusInitiative: 0
          }));

        case 9:
          if (!(fiche === 3)) {
            _context65.next = 12;
            break;
          }

          _context65.next = 12;
          return regeneratorRuntime.awrap(setAttrsAsync({
            diceInitiative: 0,
            bonusInitiativeP: 1,
            malusInitiative: 0
          }));

        case 12:
        case "end":
          return _context65.stop();
      }
    }
  });
});
on('clicked:resetArmure', function _callee66() {
  var attrs, armure, energie;
  return regeneratorRuntime.async(function _callee66$(_context66) {
    while (1) {
      switch (_context66.prev = _context66.next) {
        case 0:
          _context66.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['armurePJ_max', 'energiePJ_max']));

        case 2:
          attrs = _context66.sent;
          armure = attrs.armurePJ_max;
          energie = attrs.energiePJ_max;
          _context66.next = 7;
          return regeneratorRuntime.awrap(setAttrsAsync({
            armurePJ: armure,
            energiePJ: energie
          }));

        case 7:
        case "end":
          return _context66.stop();
      }
    }
  });
});
on('clicked:majV15', function () {
  getSectionIDs('repeating_slotsTete', function (idarray) {
    _.each(idarray, function (currentID, i) {
      getAttrs(["repeating_slotsTete_".concat(currentID, "_slotsUTete"), "repeating_slotsTete_".concat(currentID, "_slotsNTete"), "repeating_slotsTete_".concat(currentID, "_slotsATete"), "repeating_slotsTete_".concat(currentID, "_slotsETete"), "repeating_slotsTete_".concat(currentID, "_slotsDureeTete"), "repeating_slotsTete_".concat(currentID, "_slotsDTete")], function (v) {
        var u = v["repeating_slotsTete_".concat(currentID, "_slotsUTete")];
        var n = v["repeating_slotsTete_".concat(currentID, "_slotsNTete")];
        var a = v["repeating_slotsTete_".concat(currentID, "_slotsATete")];
        var e = v["repeating_slotsTete_".concat(currentID, "_slotsETete")];
        var duree = v["repeating_slotsTete_".concat(currentID, "_slotsDureeTete")];
        var d = v["repeating_slotsTete_".concat(currentID, "_slotsDTete")];
        var newrowid = generateRowID();
        var newrowattrs = {};
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleSlotTete")] = u;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleNom")] = n;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleActivation")] = a;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleEnergie")] = e;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleDuree")] = duree;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleDescription")] = d;
        setAttrs(newrowattrs);
      });
    });
  });
  getSectionIDs('repeating_slotsTorse', function (idarray) {
    _.each(idarray, function (currentID, i) {
      getAttrs(["repeating_slotsTorse_".concat(currentID, "_slotsUTorse"), "repeating_slotsTorse_".concat(currentID, "_slotsNTorse"), "repeating_slotsTorse_".concat(currentID, "_slotsATorse"), "repeating_slotsTorse_".concat(currentID, "_slotsETorse"), "repeating_slotsTorse_".concat(currentID, "_slotsDureeTorse"), "repeating_slotsTorse_".concat(currentID, "_slotsDTorse")], function (v) {
        var u = v["repeating_slotsTorse_".concat(currentID, "_slotsUTorse")];
        var n = v["repeating_slotsTorse_".concat(currentID, "_slotsNTorse")];
        var a = v["repeating_slotsTorse_".concat(currentID, "_slotsATorse")];
        var e = v["repeating_slotsTorse_".concat(currentID, "_slotsETorse")];
        var duree = v["repeating_slotsTorse_".concat(currentID, "_slotsDureeTorse")];
        var d = v["repeating_slotsTorse_".concat(currentID, "_slotsDTorse")];
        var newrowid = generateRowID();
        var newrowattrs = {};
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleSlotTorse")] = u;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleNom")] = n;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleActivation")] = a;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleEnergie")] = e;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleDuree")] = duree;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleDescription")] = d;
        setAttrs(newrowattrs);
      });
    });
  });
  getSectionIDs('repeating_slotsBG', function (idarray) {
    _.each(idarray, function (currentID, i) {
      getAttrs(["repeating_slotsBG_".concat(currentID, "_slotsUBG"), "repeating_slotsBG_".concat(currentID, "_slotsNBG"), "repeating_slotsBG_".concat(currentID, "_slotsABG"), "repeating_slotsBG_".concat(currentID, "_slotsEBG"), "repeating_slotsBG_".concat(currentID, "_slotsDureeBG"), "repeating_slotsBG_".concat(currentID, "_slotsDBG")], function (v) {
        var u = v["repeating_slotsBG_".concat(currentID, "_slotsUBG")];
        var n = v["repeating_slotsBG_".concat(currentID, "_slotsNBG")];
        var a = v["repeating_slotsBG_".concat(currentID, "_slotsABG")];
        var e = v["repeating_slotsBG_".concat(currentID, "_slotsEBG")];
        var duree = v["repeating_slotsBG_".concat(currentID, "_slotsDureeBG")];
        var d = v["repeating_slotsBG_".concat(currentID, "_slotsDBG")];
        var newrowid = generateRowID();
        var newrowattrs = {};
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleSlotBG")] = u;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleNom")] = n;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleActivation")] = a;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleEnergie")] = e;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleDuree")] = duree;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleDescription")] = d;
        setAttrs(newrowattrs);
      });
    });
  });
  getSectionIDs('repeating_slotsBD', function (idarray) {
    _.each(idarray, function (currentID, i) {
      getAttrs(["repeating_slotsBD_".concat(currentID, "_slotsUBD"), "repeating_slotsBD_".concat(currentID, "_slotsNBD"), "repeating_slotsBD_".concat(currentID, "_slotsABD"), "repeating_slotsBD_".concat(currentID, "_slotsEBD"), "repeating_slotsBD_".concat(currentID, "_slotsDureeBD"), "repeating_slotsBD_".concat(currentID, "_slotsDBD")], function (v) {
        var u = v["repeating_slotsBD_".concat(currentID, "_slotsUBD")];
        var n = v["repeating_slotsBD_".concat(currentID, "_slotsNBD")];
        var a = v["repeating_slotsBD_".concat(currentID, "_slotsABD")];
        var e = v["repeating_slotsBD_".concat(currentID, "_slotsEBD")];
        var duree = v["repeating_slotsBD_".concat(currentID, "_slotsDureeBD")];
        var d = v["repeating_slotsBD_".concat(currentID, "_slotsDBD")];
        var newrowid = generateRowID();
        var newrowattrs = {};
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleSlotBD")] = u;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleNom")] = n;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleActivation")] = a;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleEnergie")] = e;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleDuree")] = duree;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleDescription")] = d;
        setAttrs(newrowattrs);
      });
    });
  });
  getSectionIDs('repeating_slotsJG', function (idarray) {
    _.each(idarray, function (currentID, i) {
      getAttrs(["repeating_slotsJG_".concat(currentID, "_slotsUJG"), "repeating_slotsJG_".concat(currentID, "_slotsNJG"), "repeating_slotsJG_".concat(currentID, "_slotsAJG"), "repeating_slotsJG_".concat(currentID, "_slotsEJG"), "repeating_slotsJG_".concat(currentID, "_slotsDureeJG"), "repeating_slotsJG_".concat(currentID, "_slotsDJG")], function (v) {
        var u = v["repeating_slotsJG_".concat(currentID, "_slotsUJG")];
        var n = v["repeating_slotsJG_".concat(currentID, "_slotsNJG")];
        var a = v["repeating_slotsJG_".concat(currentID, "_slotsAJG")];
        var e = v["repeating_slotsJG_".concat(currentID, "_slotsEJG")];
        var duree = v["repeating_slotsJG_".concat(currentID, "_slotsDureeJG")];
        var d = v["repeating_slotsJG_".concat(currentID, "_slotsDJG")];
        var newrowid = generateRowID();
        var newrowattrs = {};
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleSlotJG")] = u;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleNom")] = n;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleActivation")] = a;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleEnergie")] = e;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleDuree")] = duree;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleDescription")] = d;
        setAttrs(newrowattrs);
      });
    });
  });
  getSectionIDs('repeating_slotsJD', function (idarray) {
    _.each(idarray, function (currentID, i) {
      getAttrs(["repeating_slotsJD_".concat(currentID, "_slotsUJD"), "repeating_slotsJD_".concat(currentID, "_slotsNJD"), "repeating_slotsJD_".concat(currentID, "_slotsAJD"), "repeating_slotsJD_".concat(currentID, "_slotsEJD"), "repeating_slotsJD_".concat(currentID, "_slotsDureeJD"), "repeating_slotsJD_".concat(currentID, "_slotsDJD")], function (v) {
        var u = v["repeating_slotsJD_".concat(currentID, "_slotsUJD")];
        var n = v["repeating_slotsJD_".concat(currentID, "_slotsNJD")];
        var a = v["repeating_slotsJD_".concat(currentID, "_slotsAJD")];
        var e = v["repeating_slotsJD_".concat(currentID, "_slotsEJD")];
        var duree = v["repeating_slotsJD_".concat(currentID, "_slotsDureeJD")];
        var d = v["repeating_slotsJD_".concat(currentID, "_slotsDJD")];
        var newrowid = generateRowID();
        var newrowattrs = {};
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleSlotJD")] = u;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleNom")] = n;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleActivation")] = a;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleEnergie")] = e;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleDuree")] = duree;
        newrowattrs["repeating_modules_".concat(newrowid, "_moduleDescription")] = d;
        setAttrs(newrowattrs);
      });
    });
  });
  getSectionIDs('repeating_slotsDCLTete', function (idarray) {
    _.each(idarray, function (currentID, i) {
      getAttrs(["repeating_slotsDCLTete_".concat(currentID, "_slotsUDCLTete"), "repeating_slotsDCLTete_".concat(currentID, "_slotsNDCLTete"), "repeating_slotsDCLTete_".concat(currentID, "_slotsADCLTete"), "repeating_slotsDCLTete_".concat(currentID, "_slotsEDCLTete"), "repeating_slotsDCLTete_".concat(currentID, "_slotsDDCLTete"), "repeating_slotsDCLTete_".concat(currentID, "_slotsUDCLDTete")], function (v) {
        var u = v["repeating_slotsDCLTete_".concat(currentID, "_slotsUDCLTete")];
        var n = v["repeating_slotsDCLTete_".concat(currentID, "_slotsNDCLTete")];
        var a = v["repeating_slotsDCLTete_".concat(currentID, "_slotsADCLTete")];
        var e = v["repeating_slotsDCLTete_".concat(currentID, "_slotsEDCLTete")];
        var duree = v["repeating_slotsDCLTete_".concat(currentID, "_slotsDDCLTete")];
        var d = v["repeating_slotsDCLTete_".concat(currentID, "_slotsUDCLDTete")];
        var newrowid = generateRowID();
        var newrowattrs = {};
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleSlotDCLTete")] = u;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleNomDCLion")] = n;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleActivationDCLion")] = a;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleEnergieDCLion")] = e;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleDureeDCLion")] = duree;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleDescriptionDCLion")] = d;
        setAttrs(newrowattrs);
      });
    });
  });
  getSectionIDs('repeating_slotsDCLTorse', function (idarray) {
    _.each(idarray, function (currentID, i) {
      getAttrs(["repeating_slotsDCLTorse_".concat(currentID, "_slotsUDCLTorse"), "repeating_slotsDCLTorse_".concat(currentID, "_slotsNDCLTorse"), "repeating_slotsDCLTorse_".concat(currentID, "_slotsADCLTorse"), "repeating_slotsDCLTorse_".concat(currentID, "_slotsEDCLTorse"), "repeating_slotsDCLTorse_".concat(currentID, "_slotsDDCLTorse"), "repeating_slotsDCLTorse_".concat(currentID, "_slotsUDCLDTorse")], function (v) {
        var u = v["repeating_slotsDCLTorse_".concat(currentID, "_slotsUDCLTorse")];
        var n = v["repeating_slotsDCLTorse_".concat(currentID, "_slotsNDCLTorse")];
        var a = v["repeating_slotsDCLTorse_".concat(currentID, "_slotsADCLTorse")];
        var e = v["repeating_slotsDCLTorse_".concat(currentID, "_slotsEDCLTorse")];
        var duree = v["repeating_slotsDCLTorse_".concat(currentID, "_slotsDDCLTorse")];
        var d = v["repeating_slotsDCLTorse_".concat(currentID, "_slotsUDCLDTorse")];
        var newrowid = generateRowID();
        var newrowattrs = {};
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleSlotDCLTorse")] = u;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleNomDCLion")] = n;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleActivationDCLion")] = a;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleEnergieDCLion")] = e;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleDureeDCLion")] = duree;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleDescriptionDCLion")] = d;
        setAttrs(newrowattrs);
      });
    });
  });
  getSectionIDs('repeating_slotsDCLBG', function (idarray) {
    _.each(idarray, function (currentID, i) {
      getAttrs(["repeating_slotsDCLBG_".concat(currentID, "_slotsUDCLBG"), "repeating_slotsDCLBG_".concat(currentID, "_slotsNDCLBG"), "repeating_slotsDCLBG_".concat(currentID, "_slotsADCLBG"), "repeating_slotsDCLBG_".concat(currentID, "_slotsEDCLBG"), "repeating_slotsDCLBG_".concat(currentID, "_slotsDDCLBG"), "repeating_slotsDCLBG_".concat(currentID, "_slotsUDCLDBG")], function (v) {
        var u = v["repeating_slotsDCLBG_".concat(currentID, "_slotsUDCLBG")];
        var n = v["repeating_slotsDCLBG_".concat(currentID, "_slotsNDCLBG")];
        var a = v["repeating_slotsDCLBG_".concat(currentID, "_slotsADCLBG")];
        var e = v["repeating_slotsDCLBG_".concat(currentID, "_slotsEDCLBG")];
        var duree = v["repeating_slotsDCLBG_".concat(currentID, "_slotsDDCLBG")];
        var d = v["repeating_slotsDCLBG_".concat(currentID, "_slotsUDCLDBG")];
        var newrowid = generateRowID();
        var newrowattrs = {};
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleSlotDCLBG")] = u;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleNomDCLion")] = n;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleActivationDCLion")] = a;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleEnergieDCLion")] = e;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleDureeDCLion")] = duree;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleDescriptionDCLion")] = d;
        setAttrs(newrowattrs);
      });
    });
  });
  getSectionIDs('repeating_slotsDCLBD', function (idarray) {
    _.each(idarray, function (currentID, i) {
      getAttrs(["repeating_slotsDCLBD_".concat(currentID, "_slotsUDCLBD"), "repeating_slotsDCLBD_".concat(currentID, "_slotsNDCLBD"), "repeating_slotsDCLBD_".concat(currentID, "_slotsADCLBD"), "repeating_slotsDCLBD_".concat(currentID, "_slotsEDCLBD"), "repeating_slotsDCLBD_".concat(currentID, "_slotsDDCLBD"), "repeating_slotsDCLBD_".concat(currentID, "_slotsUDCLDBD")], function (v) {
        var u = v["repeating_slotsDCLBD_".concat(currentID, "_slotsUDCLBD")];
        var n = v["repeating_slotsDCLBD_".concat(currentID, "_slotsNDCLBD")];
        var a = v["repeating_slotsDCLBD_".concat(currentID, "_slotsADCLBD")];
        var e = v["repeating_slotsDCLBD_".concat(currentID, "_slotsEDCLBD")];
        var duree = v["repeating_slotsDCLBD_".concat(currentID, "_slotsDDCLBD")];
        var d = v["repeating_slotsDCLBD_".concat(currentID, "_slotsUDCLDBD")];
        var newrowid = generateRowID();
        var newrowattrs = {};
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleSlotDCLBD")] = u;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleNomDCLion")] = n;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleActivationDCLion")] = a;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleEnergieDCLion")] = e;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleDureeDCLion")] = duree;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleDescriptionDCLion")] = d;
        setAttrs(newrowattrs);
      });
    });
  });
  getSectionIDs('repeating_slotsDCLJG', function (idarray) {
    _.each(idarray, function (currentID, i) {
      getAttrs(["repeating_slotsDCLJG_".concat(currentID, "_slotsUDCLJG"), "repeating_slotsDCLJG_".concat(currentID, "_slotsNDCLJG"), "repeating_slotsDCLJG_".concat(currentID, "_slotsADCLJG"), "repeating_slotsDCLJG_".concat(currentID, "_slotsEDCLJG"), "repeating_slotsDCLJG_".concat(currentID, "_slotsDDCLJG"), "repeating_slotsDCLJG_".concat(currentID, "_slotsUDCLDJG")], function (v) {
        var u = v["repeating_slotsDCLJG_".concat(currentID, "_slotsUDCLJG")];
        var n = v["repeating_slotsDCLJG_".concat(currentID, "_slotsNDCLJG")];
        var a = v["repeating_slotsDCLJG_".concat(currentID, "_slotsADCLJG")];
        var e = v["repeating_slotsDCLJG_".concat(currentID, "_slotsEDCLJG")];
        var duree = v["repeating_slotsDCLJG_".concat(currentID, "_slotsDDCLJG")];
        var d = v["repeating_slotsDCLJG_".concat(currentID, "_slotsUDCLDJG")];
        var newrowid = generateRowID();
        var newrowattrs = {};
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleSlotDCLJG")] = u;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleNomDCLion")] = n;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleActivationDCLion")] = a;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleEnergieDCLion")] = e;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleDureeDCLion")] = duree;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleDescriptionDCLion")] = d;
        setAttrs(newrowattrs);
      });
    });
  });
  getSectionIDs('repeating_slotsDCLJD', function (idarray) {
    _.each(idarray, function (currentID, i) {
      getAttrs(["repeating_slotsDCLJD_".concat(currentID, "_slotsUDCLJD"), "repeating_slotsDCLJD_".concat(currentID, "_slotsNDCLJD"), "repeating_slotsDCLJD_".concat(currentID, "_slotsADCLJD"), "repeating_slotsDCLJD_".concat(currentID, "_slotsEDCLJD"), "repeating_slotsDCLJD_".concat(currentID, "_slotsDDCLJD"), "repeating_slotsDCLJD_".concat(currentID, "_slotsUDCLDJD")], function (v) {
        var u = v["repeating_slotsDCLJD_".concat(currentID, "_slotsUDCLJD")];
        var n = v["repeating_slotsDCLJD_".concat(currentID, "_slotsNDCLJD")];
        var a = v["repeating_slotsDCLJD_".concat(currentID, "_slotsADCLJD")];
        var e = v["repeating_slotsDCLJD_".concat(currentID, "_slotsEDCLJD")];
        var duree = v["repeating_slotsDCLJD_".concat(currentID, "_slotsDDCLJD")];
        var d = v["repeating_slotsDCLJD_".concat(currentID, "_slotsUDCLDJD")];
        var newrowid = generateRowID();
        var newrowattrs = {};
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleSlotDCLJD")] = u;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleNomDCLion")] = n;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleActivationDCLion")] = a;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleEnergieDCLion")] = e;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleDureeDCLion")] = duree;
        newrowattrs["repeating_modulesDCLion_".concat(newrowid, "_moduleDescriptionDCLion")] = d;
        setAttrs(newrowattrs);
      });
    });
  });
  setAttrs({
    version: 15
  });
});
on('clicked:repeating_modules:pem', function _callee67() {
  var attrs, fiche, armure, espoir, cout, PE, update, total;
  return regeneratorRuntime.async(function _callee67$(_context67) {
    while (1) {
      switch (_context67.prev = _context67.next) {
        case 0:
          _context67.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['repeating_modules_moduleEnergie', 'fichePNJ', 'armure', 'espoir', 'energiePNJ', 'energiePJ']));

        case 2:
          attrs = _context67.sent;
          fiche = +attrs.fichePNJ;
          armure = attrs.armure;
          espoir = +attrs.espoir;
          cout = +attrs.repeating_modules_moduleEnergie;
          PE = 0;
          update = {};
          total = 0;

          if (fiche === 0) {
            if (armure === 'berserk') {
              PE = espoir;
            } else {
              PE = +attrs.energiePJ;
            }

            total = PE - cout;

            if (total < 0) {
              if (armure !== 'berserk') {
                setPanneauInformation('Erreur. Energie Indisponible.', false, false, true);
              } else {
                setPanneauInformation('Erreur. Espoir Indisponible.', false, false, true);
              }

              PI.msgEnergie = 1;
            } else if (armure === 'berserk') {
              update.espoir = total;
            } else {
              update.energiePJ = total;
            }
          } else if (fiche === 1) {
            PE = +attrs.energiePNJ;
            total = PE - cout;

            if (total < 0) {
              setPanneauInformation('Erreur. Energie Indisponible.', false, false, true);
              PI.msgEnergie = 1;
            } else {
              update.energiePNJ = total;
            }
          }

          _context67.next = 13;
          return regeneratorRuntime.awrap(setAttrsAsync(update));

        case 13:
        case "end":
          return _context67.stop();
      }
    }
  });
});
on('clicked:repeating_modulesdclion:pemdlion', function _callee68() {
  var attrs, PE, cout, total;
  return regeneratorRuntime.async(function _callee68$(_context68) {
    while (1) {
      switch (_context68.prev = _context68.next) {
        case 0:
          _context68.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['repeating_modules_moduleEnergieDCLion', 'druidLionPEAct']));

        case 2:
          attrs = _context68.sent;
          PE = +attrs.druidLionPEAct;
          cout = +attrs.repeating_modules_moduleEnergieDCLion;
          total = PE - cout;

          if (!(total < 0)) {
            _context68.next = 11;
            break;
          }

          setPanneauInformation('Erreur. Energie Indisponible.', false, false, true);
          PI.msgEnergie = 1;
          _context68.next = 13;
          break;

        case 11:
          _context68.next = 13;
          return regeneratorRuntime.awrap(setAttrsAsync({
            druidLionPEAct: total
          }));

        case 13:
        case "end":
          return _context68.stop();
      }
    }
  });
});
on('change:tab change:fichePNJ', function () {
  resetPanneauInformation();
}); // MECHAARMURE

var mechaArmure = {
  0: {
    vitesse: 0,
    manoeuvrabilite: 0,
    puissance: 0,
    senseurs: 0,
    systemes: 0,
    resilience: 0,
    blindage: 0,
    cdf: 0,
    noyaux: 0
  },
  archangel: {
    vitesse: 3,
    manoeuvrabilite: 5,
    puissance: 5,
    senseurs: 6,
    systemes: 8,
    resilience: 30,
    blindage: 70,
    cdf: 30,
    noyaux: 100
  },
  nephilim: {
    vitesse: 2,
    manoeuvrabilite: -4,
    puissance: 10,
    senseurs: 10,
    systemes: 10,
    resilience: 28,
    blindage: 120,
    cdf: 20,
    noyaux: 100
  },
  demon: {
    vitesse: 2,
    manoeuvrabilite: 4,
    puissance: 12,
    senseurs: 8,
    systemes: 4,
    resilience: 20,
    blindage: 80,
    cdf: 30,
    noyaux: 100
  }
};
on('change:mechaArmure change:mechaArmureVitesseModif change:mechaArmureManoeuvrabiliteModif change:mechaArmurePuissanceModif change:mechaArmureSenseursModif change:mechaArmureSystemesModif change:mechaArmureResilienceModif change:MANOGSTActive change:mechaArmureBlindageModif change:mechaArmureCdfModif change:mechaArmureNoyauxEnergieModif sheet:opened', function _callee69() {
  var attrs, MA, type, vitesse, manoeuvrabilite, puissance, senseurs, systemes, resilience, blindage, cdf, noyaux, vitesseM, manoeuvrabiliteM, puissanceM, senseursM, systemesM, resilienceM, blindageM, cdfM, noyauxM, MST, resilienceB, vitesseTotal, manoeuvrabiliteTotal, puissanceTotal, senseursTotal, systemesTotal, resilienceTotal, blindageTotal, cdfTotal, noyauxTotal, translation;
  return regeneratorRuntime.async(function _callee69$(_context69) {
    while (1) {
      switch (_context69.prev = _context69.next) {
        case 0:
          _context69.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['mechaArmure', 'mechaArmureVitesseModif', 'mechaArmureManoeuvrabiliteModif', 'mechaArmurePuissanceModif', 'mechaArmureSystemesModif', 'mechaArmureResilienceModif', 'MANOGSTActive', 'mechaArmureBlindageModif', 'mechaArmureCdfModif', 'mechaArmureNoyauxEnergieModif']));

        case 2:
          attrs = _context69.sent;
          MA = attrs.mechaArmure;
          type = mechaArmure[MA] || [];
          vitesse = parseInt(type.vitesse, 10) || 0;
          manoeuvrabilite = parseInt(type.manoeuvrabilite, 10) || 0;
          puissance = parseInt(type.puissance, 10) || 0;
          senseurs = parseInt(type.senseurs, 10) || 0;
          systemes = parseInt(type.systemes, 10) || 0;
          resilience = parseInt(type.resilience, 10) || 0;
          blindage = parseInt(type.blindage, 10) || 0;
          cdf = parseInt(type.cdf, 10) || 0;
          noyaux = parseInt(type.noyaux, 10) || 0;
          vitesseM = parseInt(attrs.mechaArmureVitesseModif, 10) || 0;
          manoeuvrabiliteM = parseInt(attrs.mechaArmureManoeuvrabiliteModif, 10) || 0;
          puissanceM = parseInt(attrs.mechaArmurePuissanceModif, 10) || 0;
          senseursM = parseInt(attrs.mechaArmureSenseursModif, 10) || 0;
          systemesM = parseInt(attrs.mechaArmureSystemesModif, 10) || 0;
          resilienceM = parseInt(attrs.mechaArmureResilienceModif, 10) || 0;
          blindageM = parseInt(attrs.mechaArmureBlindageModif, 10) || 0;
          cdfM = parseInt(attrs.mechaArmureCdfModif, 10) || 0;
          noyauxM = parseInt(attrs.mechaArmureNoyauxEnergieModif, 10) || 0;
          MST = parseInt(attrs.MANOGSTActive, 10) || 0;
          resilienceB = 0;

          if (MST === 1) {
            resilienceB += 10;
          }

          vitesseTotal = vitesse + vitesseM;
          manoeuvrabiliteTotal = manoeuvrabilite + manoeuvrabiliteM;
          puissanceTotal = puissance + puissanceM;
          senseursTotal = senseurs + senseursM;
          systemesTotal = systemes + systemesM;
          resilienceTotal = resilience + resilienceM + resilienceB;
          blindageTotal = blindage + blindageM;
          cdfTotal = cdf + cdfM;
          noyauxTotal = noyaux + noyauxM;

          if (!MA) {
            translation = '';
          } else {
            translation = getTranslationByKey(MA);
          }

          _context69.next = 38;
          return regeneratorRuntime.awrap(setAttrsAsync({
            mechaArmureNom: translation,
            mechaArmureVitesse: vitesseTotal,
            mechaArmureManoeuvrabilite: manoeuvrabiliteTotal,
            mechaArmurePuissance: puissanceTotal,
            mechaArmureSenseurs: senseursTotal,
            mechaArmureSystemes: systemesTotal,
            mechaArmureResilience_max: resilienceTotal,
            mechaArmureBlindage_max: blindageTotal,
            mechaArmureCdf_max: cdfTotal,
            mechaArmureNoyauxEnergie_max: noyauxTotal
          }));

        case 38:
        case "end":
          return _context69.stop();
      }
    }
  });
});
on('change:mechaArmureTypeJets change:mechaArmureManoeuvrabilite change:mechaArmurePuissance change:mechaArmureSenseurs change:mechaArmureSystemes sheet:opened', function _callee70() {
  var attrs, type, manoeuvrabilite, puissance, senseurs, systemes, update;
  return regeneratorRuntime.async(function _callee70$(_context70) {
    while (1) {
      switch (_context70.prev = _context70.next) {
        case 0:
          _context70.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['mechaArmureTypeJets', 'mechaArmureManoeuvrabilite', 'mechaArmurePuissance', 'mechaArmureSenseurs', 'mechaArmureSystemes']));

        case 2:
          attrs = _context70.sent;
          type = parseInt(attrs.mechaArmureTypeJets, 10) || 0;
          manoeuvrabilite = parseInt(attrs.mechaArmureManoeuvrabilite, 10) || 0;
          puissance = parseInt(attrs.mechaArmurePuissance, 10) || 0;
          senseurs = parseInt(attrs.mechaArmureSenseurs, 10) || 0;
          systemes = parseInt(attrs.mechaArmureSystemes, 10) || 0;
          update = {};
          _context70.t0 = type;
          _context70.next = _context70.t0 === 1 ? 12 : _context70.t0 === 2 ? 15 : _context70.t0 === 3 ? 18 : _context70.t0 === 4 ? 21 : _context70.t0 === 5 ? 24 : 27;
          break;

        case 12:
          update.mechaArmureJetBonus = manoeuvrabilite;
          update.mechaArmureJetBonusType = 'Manoeuvrabilité';
          return _context70.abrupt("break", 27);

        case 15:
          update.mechaArmureJetBonus = puissance;
          update.mechaArmureJetBonusType = 'Puissance';
          return _context70.abrupt("break", 27);

        case 18:
          update.mechaArmureJetBonus = senseurs;
          update.mechaArmureJetBonusType = 'Senseurs';
          return _context70.abrupt("break", 27);

        case 21:
          update.mechaArmureJetBonus = systemes;
          update.mechaArmureJetBonusType = 'Systèmes';
          return _context70.abrupt("break", 27);

        case 24:
          update.mechaArmureJetBonus = 0;
          update.mechaArmureJetBonusType = '';
          return _context70.abrupt("break", 27);

        case 27:
          _context70.next = 29;
          return regeneratorRuntime.awrap(setAttrsAsync(update));

        case 29:
        case "end":
          return _context70.stop();
      }
    }
  });
});
on('change:mechaArmure change:mechaArmureArchangelConfiguration change:mechaArmureNephilimConfiguration change:mechaArmureDemonConfiguration', function _callee71() {
  return regeneratorRuntime.async(function _callee71$(_context71) {
    while (1) {
      switch (_context71.prev = _context71.next) {
        case 0:
          _context71.next = 2;
          return regeneratorRuntime.awrap(setAttrsAsync({
            MADABAmritaActive: 0,
            MAAEvacuationActive: 0,
            MANOGStationActive: 0,
            MANOGInvulnerabiliteActive: 0,
            MANOGSTActive: 0,
            MADDjinnWraithActive: 0,
            MADDjinnNanobrumeActive: 0,
            MADACSoniqueActive: 0,
            MAArchangelVolActive: 0,
            MANephilimSautActive: 0,
            MANephilimEmblemActive: 0,
            MADemonSautActive: 0,
            MANephilimDronesAirainActive: 0
          }));

        case 2:
        case "end":
          return _context71.stop();
      }
    }
  });
}); // FIN MECHAARMURE
// LONGBOW

on('change:rangerArmeDegatEvol change:rangerArmeDegat change:rangerArmeViolenceEvol change:rangerArmeViolence change:rangerArmePortee change:rangerChoc change:rangerDegatContinue change:rangerDesignation change:rangerSilencieux change:rangerPerceArmure change:rangerUltraViolence change:rangerAntiVehicule change:rangerArtillerie change:rangerDispersion change:rangerLumiere change:rangerPenetrant change:rangerPerceArmure60 change:rangerAntiAnatheme change:rangerDemoralisant change:rangerEnChaine change:rangerFureur change:rangerIgnoreArmure change:rangerPenetrant10 change:ranger100PG change:ranger50PG2 sheet:opened', function _callee72() {
  var attrs, PG50, PG100, baseD, baseV, E1, E2, E3, dgts, violence, portee, eChoc, eDegatsContinus, eDesignation, eSilencieux, ePerceArmure, eUltraviolence, eAntiVehicule, eArtillerie, eDispersion, eLumiere, ePenetrant, ePerceArmure60, eAntiAnatheme, eDemoralisant, eEnChaine, eFureur, eIgnoreArmure, ePenetrant10, energie, energieDepense;
  return regeneratorRuntime.async(function _callee72$(_context72) {
    while (1) {
      switch (_context72.prev = _context72.next) {
        case 0:
          _context72.next = 2;
          return regeneratorRuntime.awrap(getAttrsAsync(['rangerArmeDegatEvol', 'rangerArmeDegat', 'rangerArmeViolenceEvol', 'rangerArmeViolence', 'rangerArmePortee', 'rangerChoc', 'rangerDegatContinue', 'rangerDesignation', 'rangerSilencieux', 'rangerPerceArmure', 'rangerUltraViolence', 'rangerAntiVehicule', 'rangerArtillerie', 'rangerDispersion', 'rangerLumiere', 'rangerPenetrant', 'rangerPerceArmure60', 'rangerAntiAnatheme', 'rangerDemoralisant', 'rangerEnChaine', 'rangerFureur', 'rangerIgnoreArmure', 'rangerPenetrant10', 'ranger100PG', 'ranger50PG2']));

        case 2:
          attrs = _context72.sent;
          PG50 = attrs.ranger50PG2;
          PG100 = attrs.ranger100PG;
          baseD = 3;
          baseV = 1;
          E1 = 2;
          E2 = 3;
          E3 = 6;
          dgts = Number(attrs.rangerArmeDegat);
          violence = Number(attrs.rangerArmeViolence);
          portee = attrs.rangerArmePortee;

          if (PG50 === 'on') {
            baseD = 5;
            baseV = 3;
            dgts = Number(attrs.rangerArmeDegatEvol);
            violence = Number(attrs.rangerArmeViolenceEvol);
          }

          if (PG100 === 'on') {
            E1 = 1;
            E2 = 1;
            E3 = 4;
          }

          eChoc = attrs.rangerChoc;
          eDegatsContinus = attrs.rangerDegatContinue;
          eDesignation = attrs.rangerDesignation;
          eSilencieux = attrs.rangerSilencieux;
          ePerceArmure = attrs.rangerPerceArmure;
          eUltraviolence = attrs.rangerUltraViolence;
          eAntiVehicule = attrs.rangerAntiVehicule;
          eArtillerie = attrs.rangerArtillerie;
          eDispersion = attrs.rangerDispersion;
          eLumiere = attrs.rangerLumiere;
          ePenetrant = attrs.rangerPenetrant;
          ePerceArmure60 = attrs.rangerPerceArmure60;
          eAntiAnatheme = attrs.rangerAntiAnatheme;
          eDemoralisant = attrs.rangerDemoralisant;
          eEnChaine = attrs.rangerEnChaine;
          eFureur = attrs.rangerFureur;
          eIgnoreArmure = attrs.rangerIgnoreArmure;
          ePenetrant10 = attrs.rangerPenetrant10;
          energie = 0;
          energie += dgts - baseD;
          energie += violence - baseV;
          _context72.t0 = portee;
          _context72.next = _context72.t0 === '^{portee-longue}' ? 39 : _context72.t0 === '^{portee-lointaine}' ? 41 : 43;
          break;

        case 39:
          energie += 1;
          return _context72.abrupt("break", 43);

        case 41:
          energie += 2;
          return _context72.abrupt("break", 43);

        case 43:
          energieDepense = 0;

          if (eChoc !== '0') {
            energieDepense += E1;
          }

          if (eSilencieux !== '0') {
            energieDepense += E1;
          }

          if (eUltraviolence !== '0') {
            energieDepense += E1;
          }

          if (eArtillerie !== '0') {
            energieDepense += E2;
          }

          if (eAntiAnatheme !== '0') {
            energieDepense += E3;
          }

          if (eDemoralisant !== '0') {
            energieDepense += E3;
          }

          if (eEnChaine !== '0') {
            energieDepense += E3;
          }

          if (eFureur !== '0') {
            energieDepense += E3;
          }

          if (eAntiVehicule !== '0') {
            energieDepense += E2;
          }

          if (eDegatsContinus !== '0') {
            energieDepense += E1;
          }

          if (eDesignation !== '0') {
            energieDepense += E1;
          }

          if (eDispersion !== '0') {
            energieDepense += E2;
          }

          if (eLumiere !== '0') {
            energieDepense += E2;
          }

          if (ePenetrant !== '0') {
            energieDepense += E2;
          }

          if (ePerceArmure !== '0') {
            energieDepense += E1;
          }

          if (ePerceArmure60 !== '0') {
            energieDepense += E2;
          }

          if (eIgnoreArmure !== '0') {
            energieDepense += E3;
          }

          if (ePenetrant10 !== '0') {
            energieDepense += E3;
          }

          energie += energieDepense;
          _context72.next = 65;
          return regeneratorRuntime.awrap(setAttrsAsync({
            longbowEnergie: "(".concat(getTranslationByKey('depense-energie-prevue'), " : ").concat(energie, ")")
          }));

        case 65:
        case "end":
          return _context72.stop();
      }
    }
  });
}); // LONGBOW
// HERAUT DE LEQUILIBRE - CHEVALIER DE LA LUMIERE

var chevalierHerauts = ['devasterAnatheme', 'bourreauTenebres', 'equilibreBalance'];
chevalierHerauts.forEach(function (button) {
  on("clicked:".concat(button), function _callee73() {
    var attrs, value, result, newValue;
    return regeneratorRuntime.async(function _callee73$(_context73) {
      while (1) {
        switch (_context73.prev = _context73.next) {
          case 0:
            _context73.next = 2;
            return regeneratorRuntime.awrap(getAttrsAsync([button]));

          case 2:
            attrs = _context73.sent;
            value = +attrs[button];
            result = {};
            newValue = 1;

            if (value === 1) {
              newValue = 0;
            }

            result[button] = newValue;
            _context73.next = 10;
            return regeneratorRuntime.awrap(setAttrsAsync(result));

          case 10:
          case "end":
            return _context73.stop();
        }
      }
    });
  });
}); // HERAUT DE LEQUILIBRE - CHEVALIER DE LA LUMIERE
// Import NPC

on('clicked:importKNPCG', function () {
  getAttrs(['importKNPCG'], function (value) {
    var json = JSON.parse(value.importKNPCG);
    var aspects = json.aspects;
    var capacites = json.capacities;
    var weapons = json.weapons;
    var type = json.type.charAt(0).toUpperCase() + json.type.substr(1);
    var level = json.level.charAt(0).toUpperCase() + json.level.substr(1);
    var chair = {
      score: 0,
      majeur: 0,
      mineur: 0
    };
    var bete = {
      score: 0,
      majeur: 0,
      mineur: 0
    };
    var machine = {
      score: 0,
      majeur: 0,
      mineur: 0
    };
    var dame = {
      score: 0,
      majeur: 0,
      mineur: 0
    };
    var masque = {
      score: 0,
      majeur: 0,
      mineur: 0
    };
    var lAspects = {
      chair: chair,
      bête: bete,
      machine: machine,
      dame: dame,
      masque: masque
    };
    var health = json.health || 0;
    var armor = json.armor || 0;
    var energy = json.energy || 0;
    var shield = json.shield || 0;
    var forcefield = json.forcefield || 0;
    var defense = json.defense || 0;
    var reaction = json.reaction || 0;
    var diceInitiative = 3;
    var initiative = json.initiative || 1;
    var tabResilience = 0;
    var resilience = json.resilience || 0;
    var debordement = json.outbreak || 0;
    var weakness = json.weakness || '';

    for (var keyA in aspects) {
      var result = aspects[keyA];
      lAspects[result.name].score = result.score;

      if (result.major === true) {
        lAspects[result.name].majeur = result.exceptional;
      } else {
        lAspects[result.name].mineur = result.exceptional;
      }
    }

    getSectionIDs('repeating_capacites', function (idarray) {
      for (var i = 0; i < idarray.length; i += 1) {
        removeRepeatingRow("repeating_capacites_".concat(idarray[i]));
      }
    });

    for (var keyC in capacites) {
      var _result = capacites[keyC];
      var newrowid = generateRowID();
      var newrowattrs = {};
      newrowattrs["repeating_capacites_".concat(newrowid, "_nomCapacite")] = _result.name;
      newrowattrs["repeating_capacites_".concat(newrowid, "_descCapacite")] = _result.description;
      setAttrs(newrowattrs);
    }

    getSectionIDs('repeating_armeCaC', function (idarray) {
      for (var i = 0; i < idarray.length; i += 1) {
        removeRepeatingRow("repeating_armeCaC_".concat(idarray[i]));
      }
    });
    getSectionIDs('repeating_armedist', function (idarray) {
      for (var i = 0; i < idarray.length; i += 1) {
        removeRepeatingRow("repeating_armedist_".concat(idarray[i]));
      }
    });
    var otherWPNEffects = [];

    for (var keyW in weapons) {
      var _result2 = weapons[keyW];
      var contact = _result2.contact;
      var range = _result2.range;
      var path = '';
      var otherEffects = [];
      var effects = _result2.effects;
      var newrowidW = generateRowID();
      var newrowattrsW = {};

      if (contact === true) {
        path = 'repeating_armeCaC_';
        var raw = _result2.raw - lAspects.bête.mineur - lAspects.bête.majeur;

        if (raw < 0) {
          raw = 0;
        }

        newrowattrsW["".concat(path + newrowidW, "_ArmeCaC")] = _result2.name;
        newrowattrsW["".concat(path + newrowidW, "_armeCaCDegat")] = _result2.dices;
        newrowattrsW["".concat(path + newrowidW, "_armeCaCBDegat")] = raw;
        newrowattrsW["".concat(path + newrowidW, "_armeCaCViolence")] = _result2.violenceDices;
        newrowattrsW["".concat(path + newrowidW, "_armeCaCBDegat")] = raw;
        newrowattrsW["".concat(path + newrowidW, "_armeCaCBViolence")] = _result2.violenceRaw;
        newrowattrsW["".concat(path + newrowidW, "_armeCaCPortee")] = "^{portee-".concat(range, "}");
      } else {
        path = 'repeating_armedist_';
        newrowattrsW["".concat(path + newrowidW, "_ArmeDist")] = _result2.name;
        newrowattrsW["".concat(path + newrowidW, "_armeDistDegat")] = _result2.dices;
        newrowattrsW["".concat(path + newrowidW, "_armeDistViolence")] = _result2.violenceDices;
        newrowattrsW["".concat(path + newrowidW, "_armeDistBDegat")] = _result2.raw;
        newrowattrsW["".concat(path + newrowidW, "_armeDistBViolence")] = _result2.violenceRaw;
        newrowattrsW["".concat(path + newrowidW, "_armeDistPortee")] = "^{portee-".concat(range, "}");
      }

      for (var cle in effects) {
        var eff = effects[cle].name.split(' ');
        var length = eff.length;

        if (length > 1) {
          length -= 1;
        } else {
          length = 1;
        }

        var name = effects[cle].name.split(' ', length).join(' ').toLowerCase();
        var value2 = eff[length] || 0;

        switch (name) {
          case 'anathème':
            newrowattrsW["".concat(path + newrowidW, "_anatheme")] = '{{anatheme=Anathème}}';
            break;

          case 'anti-anathème':
            newrowattrsW["".concat(path + newrowidW, "_antiAnatheme")] = '{{antiAnathème=Anti Anathème}}';
            break;

          case 'anti-véhicule':
            newrowattrsW["".concat(path + newrowidW, "_antiVehicule")] = '{{antiVehicule=Anti Véhicule}} ';
            break;

          case 'artillerie':
            newrowattrsW["".concat(path + newrowidW, "_artillerie")] = '{{artillerie=Artillerie}}';
            break;

          case 'assassin':
            newrowattrsW["".concat(path + newrowidW, "_assassin")] = '{{assassin=[[@{assassinValue}d6]]}} ';
            newrowattrsW["".concat(path + newrowidW, "_assassinValue")] = Number(value2);
            break;

          case "assistance à l'attaque":
            newrowattrsW["".concat(path + newrowidW, "_assistanceAttaque")] = "{{assistanceAttaque=Assistance à l'attaque}}";
            break;

          case 'barrage':
            newrowattrsW["".concat(path + newrowidW, "_barrage")] = '{{barrage=^{barrage} @{barrageValue}}} ';
            newrowattrsW["".concat(path + newrowidW, "_barrageValue")] = Number(value2);
            break;

          case 'cadence':
            newrowattrsW["".concat(path + newrowidW, "_cadence")] = '[[?{Plusieurs cibles ?|Oui, 3.5|Non, 0.5}]]';
            newrowattrsW["".concat(path + newrowidW, "_cadenceValue")] = Number(value2);
            break;

          case 'chargeur':
            newrowattrsW["".concat(path + newrowidW, "_chargeur")] = '{{chargeur=^{chargeur} @{chargeurValue}}} ';
            newrowattrsW["".concat(path + newrowidW, "_chargeurValue")] = Number(value2);
            break;

          case 'choc':
            newrowattrsW["".concat(path + newrowidW, "_choc")] = '{{choc=^{choc} @{chocValue}}}';
            newrowattrsW["".concat(path + newrowidW, "_chocValue")] = Number(value2);
            break;

          case 'défense':
            newrowattrsW["".concat(path + newrowidW, "_defense")] = '{{defense=^{defense} @{defenseValue}}}';
            newrowattrsW["".concat(path + newrowidW, "_defenseValue")] = Number(value2);
            break;

          case 'dégâts continus':
            newrowattrsW["".concat(path + newrowidW, "_degatContinue")] = '{{degatContinus=^{degats-continus} @{degatContinueValue} ([[1D6]] ^{tours})}}';
            newrowattrsW["".concat(path + newrowidW, "_degatContinueValue")] = Number(value2);
            break;

          case 'deux mains':
            newrowattrsW["".concat(path + newrowidW, "_deuxMains")] = '{{deuxMains=Deux Mains}}';
            break;

          case 'démoralisant':
            newrowattrsW["".concat(path + newrowidW, "_demoralisant")] = '{{demoralisant=Démoralisant}}';
            break;

          case 'désignation':
            newrowattrsW["".concat(path + newrowidW, "_designation")] = '{{designation=Désignation}}';
            break;

          case 'destructeur':
            newrowattrsW["".concat(path + newrowidW, "_destructeur")] = '{{destructeur=[[2D6]]}}';
            break;

          case 'dispersion':
            newrowattrsW["".concat(path + newrowidW, "_dispersion")] = '{{dispersion=^{dispersion} @{dispersionValue}}} ';
            newrowattrsW["".concat(path + newrowidW, "_dispersionValue")] = Number(value2);
            break;

          case 'en chaîne':
            newrowattrsW["".concat(path + newrowidW, "_enChaine")] = '{{enChaine=En Chaîne}}';
            break;

          case 'espérance':
            newrowattrsW["".concat(path + newrowidW, "_esperance")] = '{{esperance=Espérance}}';
            break;

          case 'fureur':
            newrowattrsW["".concat(path + newrowidW, "_fureur")] = '{{fureur=[[4D6]]}}';
            break;

          case 'ignore armure':
            newrowattrsW["".concat(path + newrowidW, "_ignoreArmure")] = '{{ignoreArmure=Ignore Armure}}';
            break;

          case 'ignore champ de force':
            newrowattrsW["".concat(path + newrowidW, "_ignoreCdF")] = '{{ignoreCdF=Ignore Champs de Force}}';
            break;

          case 'jumelé (akimbo)':
            newrowattrsW["".concat(path + newrowidW, "_akimbo")] = '2';
            break;

          case 'jumelé (ambidextrie)':
            newrowattrsW["".concat(path + newrowidW, "_ambidextrie")] = '2';
            break;

          case 'lesté':
            newrowattrsW["".concat(path + newrowidW, "_lestePNJ")] = '{{leste=[[@{Chair}]]}}';
            break;

          case 'lourd':
            newrowattrsW["".concat(path + newrowidW, "_lourd")] = '1';
            break;

          case 'lumière':
            newrowattrsW["".concat(path + newrowidW, "_lumiere")] = '{{lumiere=^{lumiere} @{lumiereValue}}}';
            newrowattrsW["".concat(path + newrowidW, "_lumiereValue")] = Number(value2);
            break;

          case 'meurtrier':
            newrowattrsW["".concat(path + newrowidW, "_meurtrier")] = '{{meurtrier=[[2D6]]}}';
            break;

          case 'oblitération':
            newrowattrsW["".concat(path + newrowidW, "_obliteration")] = '{{obliteration=Oblitération}}';
            break;

          case 'orfèvrerie':
            newrowattrsW["".concat(path + newrowidW, "_orfevreriePNJ")] = '{{orfevrerie=[[ceil(@{masque}/2)]]}}';
            break;

          case 'parasitage':
            newrowattrsW["".concat(path + newrowidW, "_parasitage")] = '{{parasitage=^{parasitage} @{parasitageValue}}}';
            newrowattrsW["".concat(path + newrowidW, "_parasitageValue")] = Number(value2);
            break;

          case 'pénétrant':
            newrowattrsW["".concat(path + newrowidW, "_penetrant")] = '{{penetrant=^{penetrant} @{penetrantValue}}}';
            newrowattrsW["".concat(path + newrowidW, "_penetrantValue")] = Number(value2);
            break;

          case 'perce Armure':
            newrowattrsW["".concat(path + newrowidW, "_perceArmure")] = '{{perceArmure=^{perce-armure} @{perceArmureValue}}}';
            newrowattrsW["".concat(path + newrowidW, "_perceArmureValue")] = Number(value2);
            break;

          case 'précision':
            newrowattrsW["".concat(path + newrowidW, "_precisionPNJ")] = '{{precision=[[(ceil((@{machine})/2))]]}}';
            break;

          case 'réaction':
            newrowattrsW["".concat(path + newrowidW, "_reaction")] = '{{reaction=^{reaction} @{reactionValue}}}';
            newrowattrsW["".concat(path + newrowidW, "_reactionValue")] = Number(value2);
            break;

          case 'silencieux':
            newrowattrsW["".concat(path + newrowidW, "_silencieux")] = '{{silencieux=Silencieux}}';
            break;

          case 'soumission':
            newrowattrsW["".concat(path + newrowidW, "_soumission")] = '{{soumission=Soumission}}';
            break;

          case 'ténébricide':
            newrowattrsW["".concat(path + newrowidW, "_tenebricite")] = '{{tenebricide=Ténébricide}}';
            break;

          case 'tir en rafale':
            newrowattrsW["".concat(path + newrowidW, "_tirRafale")] = '{{tirRafale=Tir en Rafale}}';
            break;

          case 'tir en sécurité':
            newrowattrsW["".concat(path + newrowidW, "_tirSecurite")] = '3';
            break;

          case 'ultraviolence':
            newrowattrsW["".concat(path + newrowidW, "_ultraViolence")] = '{{ultraviolence=[[2D6]]}}';
            break;

          default:
            otherEffects.push(effects[cle].name);
            break;
        }
      }

      if (otherEffects.length > 0) {
        otherWPNEffects.push("".concat(_result2.name, " : ").concat(otherEffects.join(', ')));
      }

      setAttrs(newrowattrsW);
    }

    if (json.resilience > 0) {
      tabResilience = 1;
    }

    if (type === 'Bande') {
      setAttrs({
        fichePNJ: 3
      });
      diceInitiative = 0;
    }

    defense = defense - lAspects.masque.majeur - lAspects.masque.mineur;
    reaction = reaction - lAspects.machine.majeur - lAspects.machine.mineur;
    setAttrs({
      character_name: json.name,
      typePNJ: "".concat(type, " (").concat(level, ")"),
      chair: lAspects.chair.score,
      chairPNJAE: lAspects.chair.mineur,
      chairPNJAEMaj: lAspects.chair.majeur,
      bete: lAspects['bête'].score,
      betePNJAE: lAspects['bête'].mineur,
      betePNJAEMaj: lAspects['bête'].majeur,
      machine: lAspects.machine.score,
      machinePNJAE: lAspects.machine.mineur,
      machinePNJAEMaj: lAspects.machine.majeur,
      dame: lAspects.dame.score,
      damePNJAE: lAspects.dame.mineur,
      damePNJAEMaj: lAspects.dame.majeur,
      masque: lAspects.masque.score,
      masquePNJAE: lAspects.masque.mineur,
      masquePNJAEMaj: lAspects.masque.majeur,
      santePNJ: health,
      santePNJ_max: health,
      armurePNJ: armor,
      armurePNJ_max: armor,
      energiePNJ: energy,
      energiePNJ_max: energy,
      bouclierPNJ: shield,
      bouclierPNJ_max: shield,
      cdfPNJ: forcefield,
      cdfPNJ_max: forcefield,
      defensePNJ: defense,
      reactionPNJ: reaction,
      diceInitiative: diceInitiative,
      bonusInitiativeP: initiative,
      ptsFaibles: weakness,
      pnjCapaciteNotes: otherWPNEffects.join('\r\n'),
      tabResilience: tabResilience,
      resilience: resilience,
      resilience_max: resilience,
      bandeDebordement: debordement
    });
  });
}); // TRADUCTIONS

on('sheet:opened', function _callee74() {
  var bard, wizardBorealis, wizardOriflamme, MADSD, MANMJ, MAACM, MANCM, MANMS;
  return regeneratorRuntime.async(function _callee74$(_context74) {
    while (1) {
      switch (_context74.prev = _context74.next) {
        case 0:
          bard = [i18n_ignoreArmure, i18n_ignoreCDF, "".concat(i18n_dispersion, " 6"), "".concat(i18n_choc, " 1")];
          bard.sort();
          wizardBorealis = [i18n_antiAnatheme, "".concat(i18n_degatsContinus, " 3")];
          wizardBorealis.sort();
          wizardOriflamme = [i18n_antiAnatheme, "".concat(i18n_lumiere, " 2"), i18n_affecteAnatheme];
          wizardOriflamme.sort();
          MADSD = [i18n_antiVehicule, i18n_briserResilience, "".concat(i18n_parasitage, " 2")];
          MADSD.sort();
          MANMJ = [i18n_antiVehicule, i18n_antiAnatheme, i18n_demoralisant, i18n_briserResilience];
          MANMJ.sort();
          MAACM = [i18n_antiVehicule, "".concat(i18n_parasitage, " 2"), "".concat(i18n_degatsContinus, " 10"), i18n_briserResilience];
          MAACM.sort();
          MANCM = [i18n_antiVehicule, "".concat(i18n_dispersion, " 12"), i18n_antiAnatheme, i18n_briserResilience, i18n_fureur];
          MANCM.sort();
          MANMS = [i18n_antiVehicule, i18n_demoralisant, i18n_ultraviolence];
          MANMS.sort();
          _context74.next = 18;
          return regeneratorRuntime.awrap(setAttrsAsync({
            bardEffetAttSpe: bard.join(' / '),
            berserkIlluminationBlazePortee: getTranslationByKey('portee-contact'),
            berserkIlluminationBeaconPortee: getTranslationByKey('portee-contact'),
            berserkIlluminationProjectorPortee: getTranslationByKey('portee-courte'),
            berserkIlluminationLighthousePortee: getTranslationByKey('portee-courte'),
            berserkIlluminationLanternPortee: getTranslationByKey('portee-courte'),
            berserkIlluminationLanternEffets: getTranslationByKey('esperance'),
            monkVaguePortee: "".concat(getTranslationByKey('portee-contact'), " / ").concat(getTranslationByKey('portee-courte')),
            monkSalvePortee: getTranslationByKey('portee-moyenne'),
            monkRayonPortee: getTranslationByKey('portee-moyenne'),
            wizardBEffets: wizardBorealis.join(' / '),
            wizardOEffets: wizardOriflamme.join(' / '),
            MALWizardOEffets: wizardOriflamme.join(' / '),
            MALWizardOPortee: getTranslationByKey('portee-moyenne'),
            traumasInsignifiants: getTranslationByKey('traumas-insignifiants'),
            traumasLegers: getTranslationByKey('traumas-legers'),
            traumasGraves: getTranslationByKey('traumas-graves'),
            traumasLourds: getTranslationByKey('traumas-lourds'),
            MADSDPortee: getTranslationByKey('portee-contact'),
            MADSDEffetsListe: MADSD.join(' / '),
            MAAGOfferingDuree: "1D3 ".concat(getTranslationByKey('tours')),
            MAAGOfferingPortee: getTranslationByKey('portee-moyenne'),
            MAAGCurseDuree: "1 ".concat(getTranslationByKey('tour')),
            MAAGCursePortee: getTranslationByKey('portee-moyenne'),
            MAAGMiracleDuree: "2D6 ".concat(getTranslationByKey('tours')),
            MAAGMiraclePortee: getTranslationByKey('portee-contact'),
            MAAGEvacuationDuree: "1 ".concat(getTranslationByKey('tour')),
            MAAGEvacuationPortee: getTranslationByKey('zone-entiere'),
            MANOGInvulnerabilitePortee: getTranslationByKey('portee-courte'),
            MANOGInvulnerabiliteDuree: "2D6 ".concat(getTranslationByKey('tours')),
            MANOGInvulnerabiliteEffets: getTranslationByKey('invulnerabilite'),
            MANOGStationPortee: getTranslationByKey('portee-moyenne'),
            MANOGStationDuree: getTranslationByKey('sans-limite'),
            MANMJEffetsL: MANMJ.join(' / '),
            MANMJPortee: getTranslationByKey('portee-lointaine'),
            MADAPSEffets: getTranslationByKey('poings-soniques-effets'),
            MADAPSPortee: getTranslationByKey('portee-contact'),
            MADACSPortee: getTranslationByKey('portee-courte'),
            MADACSEffets: "".concat(getTranslationByKey('choc'), " 6 / ").concat(getTranslationByKey('choc'), " 4 / ").concat(getTranslationByKey('choc'), " 2"),
            MANSautPortee: getTranslationByKey('portee-longue'),
            MANSautHauteur: getTranslationByKey('portee-longue'),
            MANSautDuree: "1 ".concat(getTranslationByKey('tour')),
            MANEmblemPortee: getTranslationByKey('portee-longue'),
            MADSautPortee: getTranslationByKey('portee-longue'),
            MADSautHauteur: getTranslationByKey('portee-longue'),
            MADSautDuree: "1 ".concat(getTranslationByKey('tour')),
            MAAVagueSoinPortee: getTranslationByKey('portee-moyenne'),
            MANDronesAirainDuree: getTranslationByKey('sans-limite'),
            MANDronesAirainPortee: getTranslationByKey('portee-longue'),
            MAAMIPortee: getTranslationByKey('portee-courte'),
            MAACanonMetatronEffets: MAACM.join(' / '),
            MAACanonMetatronPortee: getTranslationByKey('portee-moyenne'),
            MANCanonMagmaEffets: MANCM.join(' / '),
            MANCanonMagmaPortee: getTranslationByKey('portee-moyenne'),
            MADLCGEffets: getTranslationByKey('lames-cinetiques-geantes-effets'),
            MAACanonNoePortée: getTranslationByKey('portee-longue'),
            MANMSEffetsListe: MANMS.join(' / '),
            MANMSurturPortee: getTranslationByKey('portee-moyenne'),
            MAATLAPortee: getTranslationByKey('portee-courte'),
            MAATLAEffets: getTranslationByKey('anti-anatheme'),
            druidLionBaseNom: getTranslationByKey('coups'),
            MALDruidLionBaseNom: getTranslationByKey('coups'),
            pSCaC: getTranslationByKey('couteau-de-service'),
            mECaC: getTranslationByKey('marteau-epieu-contact'),
            pSDist: getTranslationByKey('pistolet-de-service'),
            mEDist: getTranslationByKey('marteau-epieu-distance'),
            poingCaC: getTranslationByKey('coup-poing-pied'),
            poingMACaC: getTranslationByKey('coup-poing-pied')
          }));

        case 18:
        case "end":
          return _context74.stop();
      }
    }
  });
});
on('change:effetArmes', function (eventInfo) {
  var text = eventInfo.newValue;
  var update = {};
  update['effetArmes-description'] = getTranslationByKey(text);
  setAttrsAsync(update);
});
on('change:ameliorationArmes', function (eventInfo) {
  var text = eventInfo.newValue;
  var update = {};
  update['ameliorationArmes-description'] = getTranslationByKey(text);
  setAttrsAsync(update);
});
on('change:ameliorationOArmes', function (eventInfo) {
  var text = eventInfo.newValue;
  var update = {};
  update['ameliorationOArmes-description'] = getTranslationByKey(text);
  setAttrsAsync(update);
});