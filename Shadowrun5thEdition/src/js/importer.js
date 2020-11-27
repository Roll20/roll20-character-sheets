
	//IMPORTERS
	const importHeroLab = (character) => {
		console.log(`%c HERO LAB IMPORTER:`, "color: purple; font-weight:bold");
	};

	const importChummer = (character) => {
		//Match Chummer JSON keys with their sheet attribute. 
		//Chummer name is the key, Roll20 sheet atribute is the value.
		const jsonKeys = {
			"name": "name"
			,"adept": "flag_special"
			,"age" : "age"
			,"alias": "character_name"
			,"armor": "armor"
			,"calculatednotoriety": "notoriety"
			,"calculatedpublicawareness": "public_awareness"
			,"calculatedstreetcred": "street_cred"
			,"cmoverflow": "overflow"
			,"composure" : "composure"
			,"height": "height"
			,"initdice": "initiative_dice"
			,"initvalue": "initiative_mod"
			,"judgeintentions" : "judge_intentions"
			,"karma": "karma" 
			,"liftandcarry": "lift_carry"
			,"limitmental": "mental_limit"
			,"limitphysical": "physical_limit"
			,"limitsocial": "social_limit"
			,"magician": "flag_special"
			,"memory": "memory"
			,"nuyen":"primary_nuyen"
			,"physicalcm": "physical_max"
			,"playername": "player_name"
			,"sex": "sex"
			,"stuncm": "stun_max"
			,"technomancer": "flag_special"
			,"totaless": "essence"
			,"totalkarma": "total_karma"
			,"weight": "weight"
			,"indirectdefenseresist": "defense"
		};

		const attributeKeys = {
			"BOD": "body"
			,"AGI": "agility"
			,"REA": "reaction"
			,"STR": "strength"
			,"CHA": "charisma"
			,"INT": "intuition"
			,"LOG": "logic"
			,"WIL": "willpower"
			,"EDG": "edge"
			,"MAG": "magic"
			,"RES": "resonance"
		};

		const processChummer = new Promise((resolve, reject) => {
			const sortedKeys = alphabatizeKeys(jsonKeys);
			let setText = {
				"error": "",
				"results": "",
				"ignored": ""
			};
			let update = {};

			//MATRIX
			const setCyberdeck = (cyberdeck) => {
				update["cyberdeck"]     = cyberdeck.name;
				update["device_rating"] = cyberdeck.devicerating;
				update["attribute_1"]   = cyberdeck.attack;
				update["attribute_2"]   = cyberdeck.sleaze;
				update["attribute_3"]   = cyberdeck.dataprocessing;
				update["attribute_4"]   = cyberdeck.firewall;
				update["matrix"]   = 0;
			}

			// PROCESS TOP LEVEL KEYS
			Object.keys(sortedKeys).forEach((key) => {
				try {
					const charSheetAttr = jsonKeys[key];
					const chummerValue = character[key];
					if ((key === "adept" || key === "magician" || key === "technomancer")) {
			            if (chummerValue.toUpperCase() === "TRUE") {
			              update[`${charSheetAttr}`] = (key === "technomancer") ? "resonance" : "magic";
			            } else if (!update.hasOwnProperty(`${charSheetAttr}`)) { // if we don't have the property set already otherwise keys get overriden
			              update[`${charSheetAttr}`] = "mundane";
			            };
					} else if (key === "totaless") {
						const essence = chummerValue.includes(",") ? chummerValue.replace(",", ".") : chummerValue;
						update[`${charSheetAttr}`] = parseFloat(essence) || 6;
					} else if (chummerValue && chummerValue != null) {
						update[`${charSheetAttr}`] = chummerValue;
					} else {
						setText["error"] += addFeedback(charSheetAttr, chummerValue);
					};

					const textUpdate = (update[`${charSheetAttr}`]) ? "results" : "ignored";
					const feedbackText = addFeedback(jsonKeys[key].replace("_"," "), update[`${charSheetAttr}`]);
					(setText[`results`].includes(feedbackText) || setText[`ignored`].includes(feedbackText)) ? false : setText[`${textUpdate}`] += feedbackText;
				} catch (error) {
					setText["error"] += addFeedback(JSON.stringify(key), error);
				};
			});

			// PROCESS METATYPE
			try {
				update[`metatype`] = character.metatype;
				if (character.metavariant) {
					update[`metatype`] += ` (${character.metavariant})`
				}
			} catch (error) {
				setText["error"] += addFeedback(JSON.stringify(character.metatype), error);
			};

			// PROCESS ATTRIBUTES
			const attributes = character.attributes[1].attribute;
			let attributeTotals = { 
				"essence": update["essence"] 
			}; // USED FOR LIMITS BELOW
			attributes.forEach(object => {
				try {
					const charSheetAttr = attributeKeys[object.name];
					if (charSheetAttr === "edge") {
						update[`${charSheetAttr}`] = object.base;
					} else {
						update[`${charSheetAttr}_base`] = object.base;
					    update[`${charSheetAttr}_modifier`] = object.total - object.base;
					};

					// USED FOR LIMITS BELOW
					attributeTotals[`${charSheetAttr}`] = parseInt(object.total) || 0;
				} catch (error) {
					setText["error"] += addFeedback(JSON.stringify(object), error);
				};
			});

			//PROCESS LIMITS
			const limitKeys = {
				"limitmental": "mental_limit"
				,"limitphysical": "physical_limit"
				,"limitsocial": "social_limit"
			};

			Object.keys(limitKeys).forEach((key) => {
				//CALCULATE THE BASE FOR LIMIT
				const limitCalculate = (attrsArray) => {
					return Math.ceil(((attrsArray[0] + attrsArray[1] + (attrsArray[2] * 2))/3))
				};

				try {
					let attrs = [];
					if (key === "limitmental") {
						attrs.push(attributeTotals["intuition"], attributeTotals["willpower"], attributeTotals["logic"]);
					} else if (key === "limitphysical") {
						attrs.push(attributeTotals["body"], attributeTotals["reaction"], attributeTotals["strength"]);
					} else {
						attrs.push(attributeTotals["essence"], attributeTotals["willpower"], attributeTotals["charisma"]);
					}; 

					//SET LIMIT MODIFIER EQUAL TO THE TOTAL IN CHUMMER - THE CALCULATED BASE LIMIT
					update[`${limitKeys[key]}_modifier`] = parseInt(character[key]) - limitCalculate(attrs);
				} catch (error) {
					setText["error"] += addFeedback(JSON.stringify(`${key}`), error);
				};
			}); 

			// LOOP THROUGHT QUALITIES
			if (character.qualities != null && character.qualities.quality != null) {
				const qualitiesList = getArray(character.qualities.quality);
				qualitiesList.forEach(quality => {
					try {
						const id = generateRowID();
						update[`repeating_quality_${id}_flag`] = "display";
						update[`repeating_quality_${id}_quality`] = quality.name;
						update[`repeating_quality_${id}_type`] = quality.qualitytype == "Positive" ? "P" : "N";
					} catch (error) {
						setText["error"] += addFeedback(JSON.stringify(quality), error);
					};
				});
			}

			// LOOP THROUGH SKILLS & GENERATE REPEATING FIELDS
			if (character.skills != null && character.skills.skill != null) {
				const skillsList = getArray(character.skills.skill);
				skillsList.forEach((skill) => {
					try {
						const rating = parseInt(skill.rating) || 0;
						if (rating > 0) {
							const id = generateRowID();
							const type = 
								(skill.knowledge.toUpperCase() === "TRUE" && skill.islanguage.toUpperCase() === "TRUE") ? "language" : 
								(skill.knowledge.toUpperCase() === "TRUE") ? "knowledge" : 
								"active";
							const exotic = skill.exotic.toUpperCase();
							const section = `repeating_${type}_${id}`
							// Exotic Weapons need their name in Specialization

							update[`${section}_flag`] = "display";
							update[`${section}_skill`] = 
								(skill.name === "Exotic Melee Weapon") ? "Exotic Melee" : 
								(skill.name === "Exotic Ranged Weapon") ? "Exotic Range" : 
								skill.name;
							update[`${section}_display`] = 
								(skill.name === "Exotic Melee Weapon") ? "Exotic Melee" : 
								(skill.name === "Exotic Ranged Weapon") ? "Exotic Range" : 
								skill.name;
							update[`${section}_rating`] = skill.rating;
							update[`${section}_rating_modifier`] = skill.ratingmod;

              				const skilltotal = parseInt(skill.rating) + parseInt(skill.ratingmod);
							update[`${section}_dicepool`] = skilltotal;

							//ACTIVE SKILLS HAVE THEIR TOTAL SAVED IN A HIDDEN ATTRIBUTE
							if (type === "active") {
								update[skill.name.toLowerCase().replace(/ /g, "")] = skilltotal;
							};

							//This needs to be verified with multiple specialization
							if (skill.skillspecialization && skill.skillspecialization != null) {
								const chummerSpecialization = skill.skillspecialization.skillspecialization.name;
								const specialization = (chummerSpecialization.includes("[")) ? chummerSpecialization.slice(1, -1) : chummerSpecialization;
								update[`${section}_specialization`] = specialization;
							} else if (exotic === "TRUE") {
								update[`${section}_specialization`] = skill.spec;
							};

							//CREATE THE DISPLAYS FOR SKILLS
							if (update[`${section}_specialization`]) {
								update[`${section}_display_specialization`] = `(${update[`${section}_specialization`]})`;
							};

							//DISPLAY FOR RTG
							update[`${section}_display_rating`] = (skill.ratingmod != 0) ? `${skill.rating} (${skilltotal})` : `${skill.rating}`;

							const attribute = skill.attribute;
							update[`${section}_attribute`] = `@{${attributeKeys[attribute]}}`;
							update[`${section}_display_attribute`] = attributeKeys[attribute];

							update[`${section}_limit`] = 
								(attribute === "AGI" || attribute === "BOD" || attribute ===  "STR" || attribute ===  "REA") ? `@{physical_limit}` : 
								(attribute === "WIL" || attribute ===  "LOG" || attribute ===  "INT") ? `@{mental_limit}` : 
								(attribute === "CHA") ? `@{social_limit}` : "none";
						};
					} catch (error) {
						setText["error"] += addFeedback(JSON.stringify(skill), error);
					};
				});
			}

			//MOVEMENT
			try {
				const movement = character.movementwalk.split(",")[0].split("/");
				update[`walk`] = movement[0];
				update[`run`] = movement[1];
			} catch (error) {
				setText["error"] += addFeedback("movement", error);
			};

			//MARTIAL ARTS
			if (character.martialarts != null && character.martialarts.martialart != null) {
				const martialartsList = getArray(character.martialarts.martialart);
				martialartsList.forEach((art) => {
					const techniqueList = getArray(art.martialarttechniques.martialarttechnique);
					techniqueList.forEach((tech) => {
						try {
							const id = generateRowID();
							update[`repeating_martial_${id}_flag`] = "display";
							update[`repeating_martial_${id}_technique`] = tech.name;
							update[`repeating_martial_${id}_style`] = art.name;
						} catch (error) {
							setText["error"] += addFeedback(JSON.stringify(art), error);
						};
					});
				});
			};

			//WEAPON KEYS
			const weaponKeys = {
				"name": "weapon"
				,"damage": "damage"
				,"ap": "ap"
				,"dicepool": "dicepool"
				,"skill": "skill"
				,"reach": "reach"
				,"rc": "recoil"
				,"mode": "mode_options"
				,"accuracy": "acc"
			};

			//WEAPONS
			if (character.weapons != null && character.weapons.weapon != null) {
				const weaponsList = getArray(character.weapons.weapon);
				weaponsList.forEach((weapon) => {
					try {
						const id = generateRowID();
				      	const section = (weapon.type.toUpperCase() === "MELEE") ? `repeating_melee_${id}` : `repeating_range_${id}`;
				      	const npcWeapon = `repeating_weapon_${id}`;

				      	const category = weapon.category.toUpperCase();
				      	Object.keys(weaponKeys).forEach((key) => {
				      		if (weapon[`${key}`] && weapon[`${key}`] != null) {
				      			update[`${section}_${weaponKeys[key]}`] = 
				      				(key != "damage" && weapon[`${key}`].includes("(")) ? getValInParen(weapon[`${key}`]) :
				      				(key === "skill") ? `@{${weapon[`${key}`].toLowerCase().replace(" ", "")}}` :
				      				weapon[`${key}`];
				      		} else if (key === "skill" && category.includes("EXOTIC")) {
				      			update[`${section}_skill`] = 0;
				      		};
						});

				      	//EXOTIC WEAPONS NEED SPECIAL HANDLING
				      	if (category.includes("EXOTIC")) {
				      		update[`${section}_dicepool_modifier`] = weapon.dicepool;
				      	};

						//RANGED WEAPONS NEED CLIP & RANGES
						if (weapon.type.toUpperCase() === "RANGED") {
					        if (weapon.clips != null && weapon.clips.clip != null) {
					          const clips = Array.isArray(weapon.clips.clip) ? weapon.clips.clip : [ weapon.clips.clip ];
					          update[`${section}_ammo`] = clips[0].count;
					        } else if (weapon.name.includes("Grenade")) {
					        	const gearsList = getArray(character.gears.gear);
					        	gearsList.forEach((gear) => {
					        		if (weapon.name === gear.name) {
					        			update[`${section}_ammo`] = gear.qty || 1;
					        		};
					        	});
					        } else if (weapon.ammo) {
					        	 update[`${section}_ammo`] = weapon.ammo;
					        };

					        //RANGE
							const rangeList = weapon.ranges;
							let range = "";
							Object.keys(rangeList).forEach((key) => {
								if (key != "name" && rangeList[key] != null) {
									const rangeNumber = rangeList[key].split("-")[1];
									range += (key === "short") ? `${rangeNumber}` : `/${rangeNumber}`;
								};
							});
							update[`${section}_range`] = range;
				      	};

				      	//ACCESSORIES
				      	if (weapon.accessories) {
					      	let accessories = "";
					      	const accessoriesList = getArray(weapon.accessories.accessory);
					      	accessoriesList.forEach((accessory) => {
					      		accessories += `${accessory["name"]}, `
					      	});

					      	update[`${section}_notes`] = accessories;
				      	};

				      	// TOGGLE THE SETTINGS OFF
				      	update[`${section}_flag`] =  "display";
					} catch (error) {
						setText["error"] += addFeedback(JSON.stringify(weapon), error);
					};
				});
			}

			//ARMOR
			if (character.armors != null && character.armors.armor != null) {
				const armorsList = getArray(character.armors.armor);
				armorsList.forEach((armor) => {
					try {
						const id = generateRowID();
						if (armor.category != "Clothing") {
							const section = `repeating_armor_${id}`;
							let armorMods = "";
							let armorGear = "";

							// ARMOR NAME
							update[`${section}_name`] =  armor.name;

							// ARMOR sometimes has a bonus
							update[`${section}_rating`] = (armor.armor.includes("/+")) ? armor.armor.split("/+")[0] : armor.armor;

							// ARMOR MODS
							if (armor.armormods && armor.armormods != null) {
								const modsList = getArray(armor.armormods.armormod);
								modsList.forEach((modification) => {
									armorMods += `${modification.name}, `;

									if (modification.name === "Nonconductivity") {
										update[`${section}_electrical_modifier`] = modification.rating;
									} else if (modification.name === "Thermal Damping" || modification === "Insulation") {
										update[`${section}_cold_modifier`] = modification.rating;
									} else if (modification.name === "Radiation Shielding") {
										update[`${section}_radiation_modifier`] = modification.rating;
									} else if (modification.name === "Chemical Protection") {
										update[`${section}_acid_modifier`] = modification.rating;
									} else if (modification.name === "Fire Resistance") {
										update[`${section}_fire_modifier`] = modification.rating;
									};
								});
							};

							// ARMOR GEAR
							if (armor.gears && armor.gears != null) {
								const gearList = getArray(armor.gears.gear);
								gearList.forEach((gear) => {
									if (gear.children) {
										const childrenList = getArray(gear.children.gear);
										childrenList.forEach((child) => {
											armorGear += `${gear.name} (${child.name}), `;
										});
									} else {
										armorGear += `${gear.name}, `;
									};
								});
							};

							// HIDE SETTINGS
							update[`${section}_flag`] =  "display";

							update[`${section}_notes`] =  
								(armorMods && armorGear) ? `Modification: ${armorMods} Gear: ${armorGear}` :
								(armorMods) ? `Modification: ${armorMods}` :
								(armorGear) ? `Gear: ${armorGear}` : "";
						} else {
							// Chummer puts Clothing in with armor
							const section = `repeating_items_${id}`;
							update[`${section}_item`] =  armor.name;
							update[`${section}_flag`] =  "display";
						};
					} catch (error) {
						setText["error"] += addFeedback(JSON.stringify(armor), error);
					}
				});
			}

			//AUGMENTATIONS
			if (character.cyberwares != null && character.cyberwares.cyberware != null) {
				const cyberwaresList = getArray(character.cyberwares.cyberware);
				cyberwaresList.forEach((ware) => {
					const id = generateRowID();
					try {
						const section = `repeating_augementations_${id}`;
						update[`${section}_flag`] = "display";
						update[`${section}_augmentation`] = ware.name;
						update[`${section}_rating`]       = ware.rating;
						update[`${section}_essence`]      = ware.ess;
						update[`${section}_notes`]        = `Grade: ${ware.grade}`;

						if (ware.gears != null && ware.gears.gear != null) {
							const wareGearList = getArray(ware.gears.gear);
							wareGearList.forEach((gear) => {
								if (gear.category.toLowerCase().includes("cyberdeck")) {
									setCyberdeck(gear);
								}
							});
						}
					} catch (error) {
					  setText["error"] += addFeedback(JSON.stringify(ware.name), error);
					}
				});
			};

			// GEAR
			if (character.gears != null && character.gears.gear != null) {
				const gearsList = getArray(character.gears.gear);
				gearsList.forEach((gear) => {
					const id = generateRowID();
					try {
						if (gear.name.toLowerCase() === "fake sin") {
							const section = `repeating_lifestyle_${id}`;
							update[`${section}_name`] = `${gear.extra} (rating ${gear.rating})`;
							update[`${section}_lifestyle`] = (gear.location != null) ? `${gear.location},` : "";
							update[`${section}_flag`] = "display";

							update[`${section}_licenses`] = "";
							if (gear.children && gear.children.gear != null) {
								const childrenList = getArray(gear.children.gear);
								childrenList.forEach((child) => {
									update[`${section}_licenses`] += `${child.extra} (rating ${child.rating}), `;
								});
							}
						} else if (gear.category.toLowerCase().includes("cyberdeck")) {
							setCyberdeck(gear);
						} else if (gear.category.toLowerCase().includes("programs")) {
							const section = `repeating_programs_${id}`;
							update[`${section}_program`] = gear.name;
							update[`${section}_flag`] = "display";
						} else {
							const section = `repeating_items_${id}`;
							let gearNotes = "";
							update[`${section}_item`] = gear.name;
							update[`${section}_flag`] = "display";
							update[`${section}_rating`] = (gear.rating >  0) ? gear.rating : "";

							//NAME
							update[`${section}_item`] += (gear.name.includes("Ammo:")) ? ` (${gear.extra}) ` : "";
							update[`${section}_item`] += (gear.qty > 1) ?` x${gear.qty}` : "";

							//NOTES
							gearNotes += (gear.location != null) ? `Location: ${gear.location},` : "";
							gearNotes += (gear.qty != null) ? ` Qty: ${gear.qty},` : "";
							gearNotes += (gear.extra != null) ? ` Extra: ${gear.extra},` : "";

							if (gear.children && gear.children != null) {
								const childrenList = getArray(gear.children.gear);
									childrenList.forEach((child) => {
										gearNotes += `${child.name}, `;
								});
							};

							update[`${section}_notes`] = gearNotes;
						}
					} catch (error) {
						setText["error"] += addFeedback(JSON.stringify(gear.name), error);
					};
				});
			};

			//SPELL KEYS
			const spellKeys = {
				"category": "category"
				,"name": "name"
				,"range": "range"
			};

			// SPELLS
			if (character.spells != null && character.spells.spell != null) {
				const spellsList = getArray(character.spells.spell);
				spellsList.forEach((spell) => {
					try {
						const id = generateRowID();
						const type = (spell.alchemy.toUpperCase() === "TRUE") ? "preps" : "spell";
						const section = `repeating_${type}_${id}`;

						Object.keys(spellKeys).forEach((key) => {
				      		if (spell[`${key}`] && spell[`${key}`] != null) {
				      			update[`${section}_${spellKeys[key]}`] = spell[`${key}`];
				      		};
						});

						// FLAG
						update[`${section}_flag`] = "display";

						// TYPE
						update[`${section}_type`] = (spell.type === "P") ? "Physical" : "Mana";

						// DRAIN
						update[`${section}_drain`] = spell.dv.replace("F", "");

						// SET COMBAT TYPE
						if (spell.category.toUpperCase() === "COMBAT") {
							const combatType = spell.descriptors.toUpperCase();
							update[`${section}_combat_type`] = 
								(combatType.includes("DIRECT")) ? "Direct, Force " :
								(combatType.includes("INDIRECT")) ? "Indirect, Force ?{Force|}, AP -" :
								"Force ";
							update[`${section}_damage`] = spell.damage;
						}

						// DURATION
						const duration = spell.duration.toUpperCase();
						update[`${section}_duration`] = 
							(duration === "S") ? "Sustained" : 
							(duration === "I") ? "Instant" : 
							(duration === "P") ? "Permanent" :
							"Special";

						// NOTES
						if (spell.descriptors != null) {
				            update[`${section}_notes`] = spell.descriptors;
				         }
					} catch (error) {
						setText["error"] += addFeedback(JSON.stringify(spell.name), error);
					}
				});
			}

			// POWERS
			if (character.powers != null && character.powers.power != null) {
				const powersList = getArray(character.powers.power);
				powersList.forEach((power) => {
					try {
						const id = generateRowID();
						const section = `repeating_powers_${id}`;

						update[`${section}_name`] = (power.fullname != null) ? power.fullname : power.name;
						update[`${section}_rating`] = power.rating;

						 if (power.totalpoints != null) {
						 	update[`${section}_notes`] = `Total Points: ${power.totalpoints}.`;
						 }
					} catch (error) {
						setText["error"] += addFeedback(JSON.stringify(power.name), error);
					}
				});
			}

			// LIFESTYLES
			if (character.lifestyles != null && character.lifestyles.lifestyle != null) {
				const lifestyleList = getArray(character.lifestyles.lifestyle);
				lifestyleList.forEach((lifestyle) => {
					try {
						const id = generateRowID();
						const section = `repeating_lifestyle_${id}`;

						update[`${section}_name`] = lifestyle.name;
						update[`${section}_flag`] = "display";

						if (lifestyle.qualities != null && lifestyle.qualities.quality) {
							const lqualitiesList = getArray(lifestyle.qualities.quality);
							let lifestyleQualities = "";
							lqualitiesList.forEach((quality) => {
								try {
									lifestyleQualities += (quality.fullname != null) ? quality.fullname : quality.name;
								} catch (error) {
									setText["error"] += addFeedback(JSON.stringify(quality.name), error);
								}
							});

							update[`${section}_lifestyle`] = lifestyleQualities;
						}
					} catch (error) {
						setText["error"] += addFeedback(JSON.stringify(lifestyle.name), error);
					}
				});
			}

			// CONTACTS
			if (character.contacts != null && character.contacts.contact != null) {
				const contactList = getArray(character.contacts.contact);
				contactList.forEach((contact) => {
					try {
						const id = generateRowID();
						const section = `repeating_contacts_${id}`;
						let contactNotes = "";

					    update[`${section}_name`] = (contact.role != null) ? `${contact.name} (${contact.role})` : `${contact.name}`;
					    update[`${section}_loyalty`] = contact.loyalty;
					    update[`${section}_connection`] = contact.connection;
					    update[`${section}_flag`] = "display";

					    ["metatype", "sex", "age", "preferredpayment", "hobbiesvice", "personallife"].forEach((detail) => {
					    	if (contact[`${detail}`] != null) {
					    		contactNotes += `${contact[`${detail}`]}. `
					    	}
					    });

					    update[`${section}_notes`] = contactNotes;

					} catch (error) {
						setText["error"] += addFeedback(JSON.stringify(contact.name), error);
					}
				});
			}

			// VEHICLE KEYS
			const vehicleKeys = {
				"handling": "handling_base"
				,"accel": "acceleration_base"
				,"speed": "speed_base"
				,"body": "body_base"
				,"armor": "armor_base"
				,"sensor": "sensor_base"
				,"pilot": "pilot_base"
			};

			// VEHICLES
			if (character.vehicles != null && character.vehicles.vehicle != null) {
				const vehicleList = getArray(character.vehicles.vehicle);
				vehicleList.forEach(vehicle => {
					try {
						const id = generateRowID();
						const section = `repeating_vehicle_${id}`;
						let vehicleNotes = "";

						update[`${section}_name`] = vehicle.name;
						update[`${section}_flag`] = "display";

						for (const [chummerKey, roll20Attr] of Object.entries(vehicleKeys)) {
							if (vehicle[`${chummerKey}`] && vehicle[`${chummerKey}`] != null) {
								update[`${section}_${roll20Attr}`] = checkForModifiedAttribute(vehicle[`${chummerKey}`])
							}
						}

						["attack", "sleaze", "dataprocessing", "firewall", "devicerating"].forEach((matrixAttr) => {
							vehicleNotes += 
								matrixAttr === "devicerating" ? `Device Rating (${vehicle[`${matrixAttr}`]}) ` : 
								matrixAttr === "firewall" ? `${vehicle[`${matrixAttr}`]} ` : 
								`${vehicle[`${matrixAttr}`]}/`;
						}); 

						if (vehicle.mods != null && vehicle.mods.mod != null) {
							const vehicleModsList = getArray(vehicle.mods.mod);
							vehicleNotes += "Mods: "
							vehicleModsList.forEach(mod => {
								vehicleNotes += mod.fullname != null ? `${mod.fullname}, ` : `${mod.name}, `;
							});
						}
				
						if (vehicle.gears != null && vehicle.gears.gear != null) {
							const vehicleGearList = getArray(vehicle.gears.gear);
							vehicleNotes += "Gear: "
							vehicleGearList.forEach(gear => {
								if (gear.children != null && gear.children.gear != null) {
									const vehicleChildrenList = getArray(gear.children.gear);
									let vehicleChildrenNotes = "";
									vehicleChildrenList.forEach(child => vehicleChildrenNotes += `${child.name}, `);
									vehicleNotes += `${gear.name} (${vehicleChildrenNotes}), `;
								} else {
									vehicleNotes += `${gear.name}, `;
								};
							});
						} 
				
						update[`${section}_notes`] = vehicleNotes;
					} catch (error) {
						setText["error"] += addFeedback(JSON.stringify(vehicle.name), error);
					}
				});
			}

			//COMPLEX FORMS
			if (character.complexforms != null && character.complexforms.complexform != null) {
				const complexFormsList = getArray(character.complexforms.complexform);
				complexFormsList.forEach(chummerForm => {
					try {
						const section = `repeating_forms_${generateRowID()}`;
						const convertAbbreviation = duration => {
							switch(duration) {
								case "E":
									return "extended"
									break;
								case "I":
									return "instant"
									break;
								case "P":
									return "permanent"
									break;
								case "S":
									return "sustained"
									break;
								default:
									return "other"
							}
						}

						const splitFade = value => value.includes('L+') || value.includes('L-') ? value.slice(1) : value

						update[`${section}_name`] = chummerForm.name
						update[`${section}_target`] = chummerForm.target.toLowerCase()
						update[`${section}_duration`] = convertAbbreviation(chummerForm.duration)
						update[`${section}_fade`] = splitFade(chummerForm.fv)
						update[`${section}_flag`] = "display";

					} catch (error)  {
						setText["error"] += addFeedback(JSON.stringify(form.name), error);
					}
				})
			}

			setCharmancerText(setText);
			resolve(update);
		}).then((update) => {
			let setText = {
				"hidden": ""
			};

			//GENERATE INPUTS TO SAVE THE DATA
			Object.keys(update).forEach((key) => {
				const label = (key.includes("_")) ? key.replace("_", " ") : key;
				const input = `<label><div>${label}</div><input type="text" name="comp_${key}" value="${update[key]}" /></label>`;
				setText[`hidden`] += (setText[`hidden`].includes(input)) ? "" : input;

				const feedbackLabel = 
					(key.includes("repeating")) ? key.split("_")[3] : 
					(key.includes("_")) ? key.replace("_", " ") : key;
				(feedbackLabel === "flag" || feedbackLabel === "display") ? false : setText["results"] += addFeedback(feedbackLabel, update[key]);
			});

			setAttrs(update);

			return setText;
		}).then((result) => {
			setCharmancerText(result);
		});
	};

	// APPLY Changes
	on("mancerfinish:apply", () => {
		const mancerData = getCharmancerData();
		const mancerValues = mancerData["importer"].values;

		Object.keys(mancerValues).forEach((key) => {
			if (key == "builder" || key == "jsonData" || key == "hidden") {
				delete mancerValues[key];
			};
		});

    	clean();
		setAttrs(mancerValues, () => {
			deleteCharmancerData(["importer"]);
			finishCharactermancer();
		});
	}); 
