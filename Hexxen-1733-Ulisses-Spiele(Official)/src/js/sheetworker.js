
    const logEvents = true;

    // map character sheet terms to compendium terms
    const categoryMap = {
        'motivation': 'motivation',
        'roles': 'role',
        'professions': 'profession',
        'equipment': 'item',
        'armorsets': 'clothing-set',
        'hunterpowers': 'hunter-ability',
        'powers': 'hunter-ability',
        'effects': 'effect'
    }
    const repeatingSections = [
        'roles', 'professions', 'equipment', 'armorsets', 'hunterpowers', 'powers', 'effects', 
        'npcattacks', 'npcpowers', 'npc-narrative-abilities'
    ];

    // map compendium terms to character sheet terms
    // - for attributes
    const ATTRIBUTE_KEYS = {
        'str': 'attribute_strength',
        'ath': 'attribute_athletic',
        'dex': 'attribute_dexterity',
        'per': 'attribute_senses', // perception
        'kno': 'attribute_knowledge',
        'wil': 'attribute_willpower'
    };
    // - for general and weapon skills
    const SKILL_KEYS = {
        'acrobatics': 'skill_acrobatics',
        'awareness': 'skill_alertness',
        'detection': 'skill_perception',
        'first-aid': 'skill_firstaid',
        'sleight-of-hand': 'skill_sleightofhand',
        'mental-fortitude': 'skill_mentalpower',
        'craft': 'skill_crafting',
        'stealth': 'skill_stealth',
        'country-and-people': 'skill_countryandpeople',
        'feat-of-strength': 'skill_flexing',
        'oratory': 'skill_rhetoric',
        'reflexes': 'skill_reflexes',
        'riding': 'skill_riding',
        'resilience': 'skill_insensibility',
        'education': 'skill_fieldsofknowledge',
        'witchcraft': 'skill_witchcraft',
        'brawl': 'weapon_punch',
        'dagger-and-knives': 'weapon_dagger',
        'fencing-weapons': 'weapon_fencing',
        'swords': 'weapon_swords',
        'sabers': 'weapon_scimitar',
        'impact-weapons': 'weapon_impact',
        'polearms': 'weapon_polearm',
        'lances': 'weapon_lance',
        'slings': 'weapon_sling',
        'pistols': 'weapon_pistol',
        'crossbows': 'weapon_crossbow',
        'muskets': 'weapon_musket',
        'dodge': 'weapon_dodge',
        'shield-proficiency': 'weapon_shield'
    }
    // - for expansion abilities
    const EXPANSION_EFFECT_KEYS = { 
        'base': 'baseeffect', 
        'journeyman': 'apprenticeeffect', 
        'adept': 'experteffect', 
        'master': 'mastereffect'
    };

    const NPC_STRATEGY_KEYS = {
        'guileless': 'npc_strategy_simple',
        'offensive': 'npc_strategy_offensive',
        'mighty-offensive': 'npc_strategy_mighty_offensive',
        'protective': 'npc_strategy_protective',
        'defensive': 'npc_strategy_defensive',
        'allrounder': 'npc_strategy_allrounder',
        'mighty-allrounder': 'npc_strategy_mighty_allrounder'
    }
    
    // - for compendium lookups
    const COMPENDIUM_CATEGORY_KEYS = {
        'motivation': { 'de': 'Motivationen' },
        'role': { 'de': 'Rollen' },
        'profession': { 'de': 'Professionen' },
        'item': { 'de': 'Gegenstände' },
        'hunter-ability': { 'de': 'Jägerkräfte' },
        'npc-ability':  { 'de': 'NSC Kräfte' }
    }

    const ARMOR_VALUES = {
        'light': 1,
        'medium': 2,
        'heavy': 3
    }

    /**
     * Roll20 API helpers
     */
    const rh = {};

    rh.clearAttrs = (keys, updates) => {
        if (!Array.isArray(keys)) {
            console.error('keys is not an array');
            return;
        }
        // It's not possible to delete attributes form sheetworkers!
        // Setting them to an empty string is the closest thing possible.
        const attrs = keys.reduce((ret, val) => {
            ret[val] = '';
            return ret;
        }, updates ?? {});
        // don't save the attributes if an updates object has been passed
        // IMPORTANT: This will create a change:<name> event!
        if (updates === undefined) setAttrs(attrs);
    };

    rh.sendChatMessage = (msg) => {
        startRoll(msg, (results) => finishRoll(results.rollId, {}));
    }

    rh.sendChatCard = (data) => {
        // FIXME: ignorieren falls kein name, keine description?
        const query = Object.keys(data).reduce((out, key) => {
            out.push(`{{${key}=${data[key] ?? ''}}}`);
            return out;
        }, []).join(' ');
        console.log(data, query);
        startRoll(`&{template:abilitycard} ${query}`, (result) => {
            finishRoll(result.rollId, {});
        });
    }


    /**
     * Compendium drag&drop helpers
     */
    const dh = {};
    dh.triggerName = 'drop-data';
    dh.dropKeys = Object.freeze(['drop-data', 'drop-name', 'drop-uniquename', 'drop-content', 'drop-category']);
    dh.dropHandler = {};

    dh.clearDropFields = (updates) => {
        rh.clearAttrs(dh.dropKeys, updates);
    };

    dh.processDropAttr = (data, updates, compendiumName, sheetName=compendiumName, fallback='') => {
        const attrData = data[`data-${compendiumName}`];
        console.log(compendiumName, attrData);
        updates[sheetName] = attrData ?? fallback;
    };

    dh.parseJSON = (json) => {
        let out = undefined;
        if (json) {
            out = JSON.parse(json);
        }
        return out;
    };

    dh.convertCompendiumData = (data) => {
        Object.keys(data).forEach((key) => {
            if (key.startsWith('data-')) {
                // FIXME try nur temporär bis Beispieldaten konvertiert
                try {
                    data[key] = dh.parseJSON(data[key]);
                }
                catch {
                    console.log('bogus compendium data');
                }
            }
        });
        return data;
    }

    dh.getQualifiedName = (name, category, lang) => {
        const cat = COMPENDIUM_CATEGORY_KEYS[category]?.[lang];
        return cat ? `${cat}:${name}` : name;
    }

    dh.prepareLookup = (lookups, data, compendiumName, category=compendiumName, handler) => {
        const attrData = data[`data-${compendiumName}`];
        const lang = data['data-lang'] || 'de';
        console.log(`prepare ${compendiumName}`, attrData);
        if (typeof attrData === 'string') {
            const name = attrData;
            lookups.push({
                name, qname: dh.getQualifiedName(name, category, lang), 
                category, handler, extras: null
            });
        }
        else if (Array.isArray(attrData)) {
            attrData.forEach(a => {
                if (typeof a === 'string') {
                    const name = a;
                    lookups.push({
                        name, qname: dh.getQualifiedName(name, category, lang), 
                        category, handler, extras: null
                    });
                }
                else if (a?.name) {
                    const name = a.name;
                    lookups.push({
                        name, qname: dh.getQualifiedName(name, category, lang), 
                        category, handler, extras: a
                    });
                }
                else {
                    console.warn(`bad ${compendiumName} data`, a);
                }
            });
        }
        else {
            console.warn(`bad ${compendiumName} data`);
        }
    };

    dh.processLookups = (lookups, data, updates, callback) => {
        console.log('lookups', lookups);
        const pageNames = lookups.map(l => {
            return l.name;
        });
        getCompendiumPage(pageNames, (pages) => {
            console.log('compendium pages', pages);
            lookups.forEach(l => {
                const p = pages.find(p => l.name === p.name) ?? { data: {} };
                p.data = dh.convertCompendiumData(p.data);
                p.data['Name'] = p.name;
                if (p?.id) {
                    p.data['Content'] = p.content?.trim();
                }
                else {
                    p.data['Content'] = getTranslationByKey("entry_not_found");
                }
                // inject extra data portions from hunter data
                if (l.extras) {
                    p.data['__extras'] = l.extras;
                }
                const defaultHandler = dh.dropHandler[l.category];
                if (l.hander) {
                    l.handler(p.data, updates, defaultHandler); // it's up to the handler whether it calls the defaultHandler or not
                }
                else if (defaultHandler) {
                    defaultHandler(p.data, updates);
                }
                else {
                    console.warn(`no handler for category ${l.category}`);
                    console.log('handler', dh.dropHandler);
                }
            });
            callback(updates);
        });
    };

    dh.handleCompendiumDrop = (event) => {
        if (logEvents) console.log('handle CompendiumDrop', event);
        // filter events caused by clearing the drop attributes
        if (event.sourceType === 'sheetworker' && event.newValue === undefined) {
            if (logEvents) console.log('skipping event caused by clearing the drop attributes');
            return;
        }

        getAttrs(dh.dropKeys, (attrs) => {
            if (logEvents) console.log('drop attributes', attrs);
            const drop = attrs['drop-data'];
            // avoid processing empty string
            if (!drop) {
                console.warn('bad attributes data');
                dh.clearDropFields();
                return;
            }
            let data;
            try {
                data = JSON.parse(drop) ?? {};
                data = dh.convertCompendiumData(data);
                if (logEvents) console.log('drop data', data);
            }
            catch (error) {
                // TODO Fehlermeldung im Charakterbogen
                console.error('Failed to process drop data!');
                console.error(error);
                return;
            }

            data['Name'] = attrs['drop-name'];
            data['UniqueName'] = attrs['drop-uniquename'];
            data['Content'] = attrs['drop-content']?.trim();
            
            // update object for collecting all modifications
            const updates = {}; 
            // do something with data
            const category = data['data-category'];
            const handler = dh.dropHandler[category];
            if (handler) {
                handler(data, updates, dh._finishCompendiumDrop); // maybe async
            }
            else {
                console.log(`unknown category: ${category}`);
                dh.clearDropFields();
                return;
            }
            // no more code here as handler might be async (in case of a monster drop)
        });
    };
    dh._finishCompendiumDrop = (updates) => {
        // append entries for clearing the drop fields to updates object
        dh.clearDropFields(updates);
        // apply changes (incl. drop field clearing)
        if (logEvents) console.log('updates', updates);
        setAttrs(updates);
    };

    dh.handleMotivationDrop = (data, updates, callback) => {
        console.log('handle motivation', data);
        updates['motivation_name'] = data['Name'];
        updates['motivation_perk'] = data['data-perk'] ?? '';
        // updates['motivation_upkeep'] = data['data-upkeep'] ?? 0;
        // FIXME coups und ideen
        callback?.(updates);
    };
    dh.dropHandler['motivation'] = dh.handleMotivationDrop;
    
    dh.handleRoleDrop = (data, updates, callback) => {
        console.log('handle role', data);
        const rowId = generateRowID();
        console.warn('tbd.');
        // FIXME mapping oder auf Eingabefeld umbauen
        // const prefix = `repeating_hunterpowers_${rowId}`;
        // updates[`${prefix}_name`] = 'neue JK';
        // updates[`${prefix}_description`] = 'neue JK Beschreibung';
        callback?.(updates);
    };
    dh.dropHandler['role'] = dh.handleRoleDrop;

    dh.handleProfessionDrop = (data, updates, callback) => {
        console.log('handle profession', data);
        // TODO auf repeating umbauen
        // TODO mehrere Professionen (aktuell wird überschrieben)
        updates['profession'] = data['Name'];
        callback?.(updates);
    };
    dh.dropHandler['profession'] = dh.handleProfessionDrop;

    dh.handleHunterAbilityDrop = (data, updates, callback) => {
        console.log('handle hunter-ability', data);
        // redirect expansion abilities
        if (data['data-ability-type'] === 'expansion') {
            console.log('redirect to expansion-ability handler');
            dh.handleExpansionAbility(data, updates, callback);
            return;
        }

        const rowId = generateRowID();
        const prefix = `repeating_hunterpowers_${rowId}`;
        updates[`${prefix}_name`] = data['Name'];
        updates[`${prefix}_description`] = data['Content'];
        updates[`${prefix}_details-flag`] = 0;
        // FIXME coups und ideen
        callback?.(updates);
    };
    dh.dropHandler['hunter-ability'] = dh.handleHunterAbilityDrop;

    dh.handleExpansionAbility = (data, updates, callback) => {
        console.log('handle expansion-ability', data);
        const rowId = generateRowID();
        const prefix = `repeating_powers_${rowId}`;
        updates[`${prefix}_name`] = data['Name'];
        // updates[`${prefix}_description`] = data['Content']; // kein Feld im Bogen
        updates[`${prefix}_details-flag`] = 0;
        const effects = data['data-effects'];
        const keycount = { 'journeyman': 0, 'adept': 0, 'master': 0 }
        effects.forEach(e => {
            const key = e['effect-type'];
            if (keycount[key] !== undefined) keycount[key]++;
            const effectkey = EXPANSION_EFFECT_KEYS[key] + (keycount[key] || '');
            updates[`${prefix}_${effectkey}`] = e['name'];
            updates[`${prefix}_${effectkey}_description`] = e['desc'];
            updates[`${prefix}_${effectkey}_active`] = 0;
            // FIXME coups und ideen
            
            // when added due to hunter drop, check for extras
            // check if effect is activated
            if (data['__extras']?.['effects']?.includes?.(e['name'])) {
                updates[`${prefix}_${effectkey}_active`] = 1;
            }
        });
        callback?.(updates);
    };

    dh.handleItemDrop = (data, updates, callback) => {
        console.log('handle item', data);
        // redirect clothing sets
        if (data['data-item-type'] === 'clothing-set') {
            console.log('redirect to clothing-set handler');
            dh.handleClothingSet(data, updates, callback);
            return;
        }

        const rowId = generateRowID();
        const prefix = `repeating_equipment_${rowId}`;
        updates[`${prefix}_name`] = data['Name'];
        updates[`${prefix}_description`] = data['Content'];
        updates[`${prefix}_quantity`] = 1;
        updates[`${prefix}_details-flag`] = 0;
        // FIXME coups und ideen

        // when added due to hunter drop, check for extras
        // check for quantity
        if (data['__extras']?.['quantity']) {
            updates[`${prefix}_quantity`] = data['__extras']['quantity'];
        }
        if (data['__extras']?.['description']) {
            updates[`${prefix}_description`] = data['__extras']['description'];
        }
        // FIXME coups und ideen aus hunter extra Daten

        // extras according to item type
        if (data['data-item-type'] === 'weapon') {
            console.log('Waffe');
            if (data['data-skill']) {
                updates[`${prefix}_active`] = 1;
                updates[`${SKILL_KEYS[data['data-skill']]}_active`] = 1;
            }
        }
        else if (data['data-item-type'] === 'armor') {
            console.log('Rüstung');
            if (data['data-armor-type']) {
                const armor = ARMOR_VALUES[data['data-armor-type']] || 1;
                updates[`${prefix}_active`] = 1;
                updates['armor'] = armor;
            }
        }
        callback?.(updates);
    };
    dh.dropHandler['item'] = dh.handleItemDrop;

    dh.handleClothingSet = (data, updates, callback) => {
        console.log('handle clothing set', data);
        const rowId = generateRowID();
        const prefix = `repeating_armorsets_${rowId}`;
        updates[`${prefix}_name`] = data['Name'];
        updates[`${prefix}_description`] = data['Content'];
        updates[`${prefix}_details-flag`] = 0;
        // FIXME coups und ideen

        // when added due to hunter drop, check for extras
        // check if equipped
        if (data['__extras']?.['equipped'] === true) {
            updates[`${prefix}_active`] = 1;
        }
    callback?.(updates);
    };
    // dh.dropHandler['clothing-set'] = dh.handleClothingSet;

    /*
     * Monster category handlers
     */

    /**
     * Handler function for "hunter" drops.
     * 
     * @param {Object} data Compendium attributes data object
     * @param {Object} updates Object (map) that receives all made changes.
     * @param {Function} [callback] Optional callback function
     */
    dh.handleHunterDrop = (data, updates, callback) => {
        console.log('handle hunter', data);
        const lookups = [];
        let attrData; // attr is a character sheet attribute in general not a special attribute

        // finish drop without tutorial or editmode active
        sh.disableTutorial(updates, 'hunter');
        
        // character type (can be used to identify hunter drop)
        updates['npc'] = 0;
        // level (rank)
        dh.processDropAttr(data, updates, 'level', 'rank', 1);
        // attributes
        attrData = data['data-attributes'];
        console.log('attributes', attrData);
        if (Array.isArray(attrData)) {
            attrData.forEach(a => {
                const key = ATTRIBUTE_KEYS[a.key];
                if (key) updates[key] = a.value;
                else console.warn(`unknown attribute key "${a.key}"`); // TODO Fehlermeldung
            });
        }
        else {
            console.warn('bad attributes data');
        }
        // abilities
        attrData = data['data-skills'];
        console.log('skills', attrData);
        if (Array.isArray(attrData)) {
            attrData.forEach(a => {
                const key = SKILL_KEYS[a.key];
                if (key) updates[key] = a.value;
                else console.warn(`unknown skill key "${a.key}"`); // TODO Fehlermeldung
            });
        }
        else {
            console.warn('bad skill data');
        }
        // corruption
        dh.processDropAttr(data, updates, 'corruption', 'corruption', 0);
        // starting money (wealth) and upkeep
        dh.processDropAttr(data, updates, 'starting-money', 'wealth', 0);
        dh.processDropAttr(data, updates, 'upkeep', 'upkeep', 50); // TODO Konstante definieren

        // roles
        dh.prepareLookup(lookups, data, 'roles', 'role');
        // professions
        dh.prepareLookup(lookups, data, 'professions', 'profession');
        // motivation
        dh.prepareLookup(lookups, data, 'motivation');
        // hunter-abilities
        dh.prepareLookup(lookups, data, 'hunter-abilities', 'hunter-ability');
        dh.prepareLookup(lookups, data, 'items','item');
        
        // process lookups (incl. extra data)
        // this is asynchronious, pass finalizing callback
        dh.processLookups(lookups, data, updates, callback);
        // no more code after this point! lookup is async!
    };
    dh.dropHandler['hunter'] = dh.handleHunterDrop;

    /**
     * Handler function for "npc" drops.
     * 
     * @param {Object} data Compendium attributes data object
     * @param {Object} updates Object (map) that receives all made changes.
     * @param {Function} [callback] Optional callback function
     */
     dh.handleNpcDrop = (data, updates, callback) => {
        console.log('handle npc', data);
        const lookups = [];
        let attrData; // attr is a character sheet attribute in general not a special attribute

        // finish drop without tutorial or editmode active
        sh.disableTutorial(updates, 'npc');
        
        // character type (can be used to identify hunter drop)
        updates['npc'] = 1;
        // npc subtype (npc_type_leader, npc_type_gang)
        attrData = data['data-npc-class'] ?? 'mob';
        const isLeader = attrData === 'leader';
        attrData = isLeader ? 'npc_type_leader' : 'npc_type_gang';
        updates['npc_type'] = attrData;
        // unnatural
        attrData = data['data-unnatural'] ?? false;
        attrData = attrData === true ? 1 : 0;
        updates['unnatural'] = attrData;
        // level (rank)
        dh.processDropAttr(data, updates, 'level', 'rank', 1);
        // attributes (leader only)
        if (isLeader) {
            attrData = data['data-attributes'];
            console.log('attributes', attrData);
            if (Array.isArray(attrData)) {
                attrData.forEach(a => {
                    const key = ATTRIBUTE_KEYS[a.key];
                    if (key) updates[key] = a.value;
                    else console.warn(`unknown attribute key "${a.key}"`); // TODO Fehlermeldung
                });
            }
            else {
                console.warn('bad attributes data');
            }
        }
        // LEP + Formel
        attrData = data['data-hp'] || 0;
        if (attrData) {
            updates['npc_hitpoints'] = attrData;
        }
        attrData = data['data-hp-formula'];
        if (attrData) {
            updates['npc_hitpoints_formula'] = attrData;
        }
        // FIXME ini (berechnet?)
        // dh.processDropAttr(data, updates, 'ini', 'ini', 0);
        // armor
        dh.processDropAttr(data, updates, 'armor-value', 'armor', 0);
        // strategy
        attrData = data['data-strategy'] ?? 'guileless';
        if (attrData) {
            updates['npc_strategy'] = NPC_STRATEGY_KEYS[attrData];
        }
        // FIXME attacks
        // narrative
        attrData = data['data-narrative-abilities'];
        if (attrData) {
            attrData = attrData.join?.(', ');
            updates['npc_narrative_ability'] = attrData;
        }
        // loot
        dh.processDropAttr(data, updates, 'loot', 'loot', '');


        // FIXME npc abilities
        dh.prepareLookup(lookups, data, 'npc-abilities','npc-ability');
        
        // process lookups (incl. extra data)
        // this is asynchronious, pass finalizing callback
        dh.processLookups(lookups, data, updates, callback);
        
        // no more code after this point! lookup is async!

        // TODO im sheet
        // TODO widernatürlich
        // TODO erzählkräfte (npc_narrative_ability)
        // TODO beute
    };
    dh.dropHandler['npc'] = dh.handleNpcDrop;


    /**
     *  character sheet helper
     */
    const sh = {};

    /**
     * Helper function that makes all changes required to disable the tutorial.
     * The changes are written into updates object and not directly stored in DB.
     * 
     * @param {Object} updates Object (map) that receives all made changes.
     * @param {String} [characterType="hunter"] (optional) Character sheet type.
     */
    sh.disableTutorial = (updates, characterType='hunter') => {
        // TODO auch direkte Ausführung ermöglichen (siehe clearDropFields)
        updates['tutorial_step'] = 5;
        updates['tutorial_done'] = 1;
        updates['editmode'] = 0;
        updates['sheetTab'] = characterType === 'npc' ? 'npc' : 'character';
    };
    
    


    on('clicked:motivation_chat clicked:repeating_hunterpowers:chat', (event) => {
        if (logEvents) console.log(event);
        // find out which button was clicked
        let prefix = event.triggerName.match(/^clicked:(.*)_chat$/)?.[1] ?? ''; // should be "repeating_<cat>_<id>", a non-repeating category or ''
        if (prefix.startsWith('repeating_')) prefix = prefix.substring(0, prefix.lastIndexOf('_')); // remove <id> from repeating categories
        // derive category
        let category = prefix.startsWith('repeating_') ? prefix.substring(prefix.indexOf('_') + 1) : prefix;
        category = categoryMap[category] ?? category;
        // prepare keys to query the required values
        const keys = { name: `${prefix}_name`, desc: `${prefix}_description` };
        if (prefix === 'motivation') keys.desc = `${prefix}_perk`;
        // read values
        getAttrs(keys, (values) => {
            const name = values[keys.name];
            const desc = values[keys.desc];
            const type = getTranslationByKey(category) || category; 
            const comp = name; // `Jägerkräfte:${name}`; // TODO: uniquename
            rh.sendChatCard({ name, desc, type, comp });
        });
    });

    const buttonlist = ["character","combat","npc","configuration"];
    buttonlist.forEach(button => {
        on(`clicked:${button}`, function() {
            getAttrs(["npc"], function(values) {
                var npc = parseInt(values["npc"],10)||0;
                if(button === "npc")
                    npc = 1;
                else if(button === "character")
                    npc = 0;
                setAttrs({
                    sheetTab: button,
                    npc: npc
                });
            });
        });
    });
    const convertbuttonlist = ["converttopc","converttonpc"];
    convertbuttonlist.forEach(button => {
        on(`clicked:${button}`, function() {
            getAttrs(["npc"], function(values) {
                var npc = 0;
                if(button === "converttonpc")
                    npc = 1;
                else if(button === "converttopc")
                    npc = 0;
                setAttrs({
                    sheetTab: "configuration",
                    npc: npc
                });
            });
        });
    });

    on(`clicked:toggleeditmode`, function() {
        getAttrs(["editmode"], function(values) {
            var editmode = parseInt(values["editmode"],10)||0;

            setAttrs({
                editmode: editmode == 1 ? 0 : 1
            });
        });
    });
    on(`clicked:toggletutorial`, function() {

        setAttrs({
            tutorial_step: 5,
            tutorial_done: 1,
            sheetTab: "character",
            editmode: 1
        });
    });
    on(`clicked:nexttutorial`, function() {
        getAttrs(["tutorial_step"], function(values) {
            var tutorial_step = parseInt(values["tutorial_step"],10)||0;
            tutorial_step = tutorial_step + 1;
            var tutorial_done = tutorial_step >= 5 ? 1 : 0;
            var editmode = tutorial_done ? 1 : 0
            setAttrs({
                tutorial_step: tutorial_step,
                tutorial_done: tutorial_done,
                sheetTab: "character",
                editmode: editmode
            });
        });
    });
    on(`clicked:resettutorial`, function() {
        setAttrs({
            tutorial_step: 0,
            tutorial_done: 0,
            sheetTab: "character",
            editmode: 0
        });
    });

    const resourcebuttonlist = [
        "addcoup","remcoup",
        "addidea","remidea",
        "addblessing","remblessing",
        "addrage","remrage",
        "addambition","remambition",
        "addhex","remhex",
        "addquintessence","remquintessence"
    ];
    resourcebuttonlist.forEach(button => {
        on(`clicked:${button}`, function(event) {
            if (logEvents) console.log("add/remove resource:", event);
            const action = button.substr(0,3);
            const ressource = button.substr(3);
            getAttrs([ressource], function(values) {
                let resourceValue = parseInt(values[ressource],10)||0;
                if(action == "add")
                    resourceValue = resourceValue + 1;
                else if(action == "rem")
                    resourceValue = resourceValue -1;
                resourceValue =  Math.min(Math.max(resourceValue, 0), 20);

                const update = {};
                update[ressource] = resourceValue;
                setAttrs(update);
            });
        });
    });

    on("change:blessing change:rage", (event) => {
        if (logEvents) console.log("change resource:", event);
        
        // blessing vs. rage (Hjd p.102)
        getAttrs(['blessing','rage'], (values) => {
            const blessing = parseInt(values.blessing) || 0;
            const rage = parseInt(values.rage) || 0;
            if(blessing > 0 && rage > 0)
            {
                const update = {};
                if(blessing > rage) {
                    update["blessing"] = blessing - rage;
                    update["rage"] = 0;
                }
                else {
                    update["rage"] = rage - blessing;
                    update["blessing"] = 0;
                }
                setAttrs(update);
            }
        });
    });
    
    on("change:janus change:hexxen change:rollvaluename", () =>{
        getAttrs(["janus", "hexxen", "rollvaluename"], function(values) {
            let janusValue = parseInt(values["janus"],10)||0;
            let attributeValue = parseInt(values["hexxen"],10)||0;
            let rollvaluename = values["hexxen"];
            let query = "&{template:check} {{name=@{character_name}}}";
            if(rollvaluename)
            {
                query = query + " {{attr=@{rollvaluename}}}";
                query = query + " {{attr_val="+attributeValue+"}}";
            }
            var i;
            for (i = 1; i <= attributeValue; i++) {
                query = query + " {{hexxen"+i+"=[[d6cs>5]]}}";
            }
            if(janusValue > 0)
            {
                for (i = 1; i <= janusValue; i++) {
                    query = query + " {{janus"+i+"=[[d6cs>4cf]]}}";
                }
            }
            else if(janusValue < 0)
            {
                for (i = -1; i >= janusValue; i--) {
                    query = query + " {{janus"+i+"=[[d6cs>4cf]]}}";
                }
            }
            setAttrs({                            
                rollquery: query
            });
        });
    });

    on(`clicked:resetroll`, function(value) {
        setAttrs({
            hexxen: 0,
            janus: 0,
            rollvaluename: '',
            rollattribute: '',
            rollmodifiers: ''
        });
    });


    on("clicked:repeating_npcattacks:rollnpcattack", function(eventInfo) {
        
        const rowid = eventInfo.sourceAttribute.split('_')[2];
        getAttrs([`repeating_npcattacks_${rowid}_name`, `repeating_npcattacks_${rowid}_attribute`, `repeating_npcattacks_${rowid}_attackvalue`], function(attack) {

           

            let valuename =  attack[`repeating_npcattacks_${rowid}_name`];
            let baseattributename = attack[`repeating_npcattacks_${rowid}_attribute`]; 
            let v = parseInt( attack[`repeating_npcattacks_${rowid}_attackvalue`],10)||0;
            var modstring = "";

            setAttrs({
                hexxen: v,
                janus: 0,
                rollvaluename: valuename,
                rollattribute: baseattributename,
                rollmodifiers: modstring
            });  
          
        });
    });

   
    const checklist = [
    'attribute_strength',
     'attribute_athletic',
      'attribute_dexterity',
       'attribute_senses',
        'attribute_knowledge',
        'attribute_willpower',
     'skill_acrobatics',
        'skill_alertness',
        'skill_perception',
        'skill_firstaid',
        'skill_sleightofhand',
        'skill_mentalpower',
        'skill_crafting',
        'skill_stealth',
        'skill_countryandpeople',
        'skill_rhetoric',
        'skill_flexing',
        'skill_reflexes',
        'skill_riding',
        'skill_insensibility',
        'skill_fieldsofknowledge',
        'skill_witchcraft',
        'weapon_punch',
        'weapon_dagger',
        'weapon_fencing',
        'weapon_swords',
        'weapon_scimitar',
        'weapon_scimitar_mounted',
        'weapon_impact',
        'weapon_polearm',
        'weapon_polearm_vsmounted',
        'weapon_lance',
        'weapon_lance_mounted',
        'weapon_sling',
        'weapon_pistol',
        'weapon_crossbow',
        'weapon_musket',
        'weapon_dodge',
        'weapon_shield',
        'parry_weapon_punch',
        'parry_weapon_dagger',
        'parry_weapon_fencing',
        'parry_weapon_swords',
        'parry_weapon_scimitar',
        'parry_weapon_scimitar_mounted',
        'parry_weapon_impact',
        'parry_weapon_polearm',
        'parry_weapon_polearm_vsmounted',
        'parry_weapon_lance',
        'parry_weapon_lance_mounted',
        'parry_weapon_sling',
        'parry_weapon_pistol',
        'parry_weapon_crossbow',
        'parry_weapon_musket',
        'parry_weapon_dodge',
        'parry_weapon_shield'];
        checklist.forEach(checkaction => {
        on(`clicked:${checkaction}`, function() {
                
            var mounted = false;
            var vsmounted = false;
            var checkname = checkaction;
            if(checkname.endsWith("_mounted"))
            {
                checkname = checkname.substring(0, checkname.length - "_mounted".length);
                mounted = true;
            }
            if(checkname.endsWith("_vsmounted"))
            {
                checkname = checkname.substring(0, checkname.length - "_vsmounted".length);
                vsmounted = true;
            }
            let valuename = "???";
            let baseattributename = "???"; 
            var checkmax = checkname+"_max";
            if(checkname.startsWith('attribute_'))
            {
                baseattributename = checkname;
                checkmax = checkname;
                valuename = getTranslationByKey(checkname);
            }
           else if(checkname.startsWith('parry_'))
           {
            var checkmax = checkname.replace("parry_", "")+"_max";
            baseattributename = skills[checkname.replace("parry_", "")].att; ;
               valuename = getTranslationByKey(checkname.replace("parry_", ""));
               valuename = valuename + " ("+getTranslationByKey('parry');
               if (mounted)
                    valuename = valuename + ", "+getTranslationByKey("mounted");
                if (vsmounted)
                    valuename = valuename + ", "+getTranslationByKey("vs_mounted");
                valuename = valuename + ")"
                valuename = valuename + " ["+getTranslationByKey(baseattributename+"_short")+"]";
           }
          else
            {               
                baseattributename = skills[checkname].att; 
                valuename = getTranslationByKey(checkname);
                if (mounted)
                    valuename = valuename + " ("+getTranslationByKey("mounted")+")";
                if (vsmounted)
                    valuename = valuename + " ("+getTranslationByKey("vs_mounted")+")";
                valuename = valuename + " ["+getTranslationByKey(baseattributename+"_short")+"]";
            }
            
            
            var checkmod = checkname+"_mod";
            var checkmoddesc = checkname+"_mod_desc";
            console.log(valuename);
            console.log(baseattributename);
            console.log(checkmax);
            console.log(checkmod);
            console.log(checkmoddesc);

            getAttrs([checkmax, checkmod, checkmoddesc], function(values) {
                let v = parseInt(values[checkmax],10)||0;
                var modstring = values[checkmoddesc]||"";
                var janus = parseInt(values[checkmod],10)||0;

                setAttrs({
                    hexxen: v,
                    janus: janus,
                    rollvaluename: valuename,
                    rollattribute: baseattributename,
                    rollmodifiers: modstring
                });
            });
        });
    });

    const parrylist = [
        'parry_weapon_punch',
        'parry_weapon_dagger',
        'parry_weapon_fencing',
        'parry_weapon_swords',
        'parry_weapon_scimitar',
        'parry_weapon_impact',
        'parry_weapon_polearm',
        'parry_weapon_lance',
        'parry_weapon_sling',
        'parry_weapon_pistol',
        'parry_weapon_crossbow',
        'parry_weapon_musket',
        'parry_weapon_dodge',
        'parry_weapon_shield'];

   

    on("change:attribute_athletic change:coup_mod", function() {
        getAttrs(["attribute_athletic", "coup_mod"], function(values) {
            var ath = parseInt(values.attribute_athletic,10)||0;
            var coup_mod = parseInt(values.coup_mod,10)||0;
            var coup = ath + coup_mod;
            setAttrs({                            
                coup_max: coup
            });
          });
    });
    on("change:attribute_knowledge change:idea_mod", function() {
        getAttrs(["attribute_knowledge", "idea_mod"], function(values) {
            var kno = parseInt(values.attribute_knowledge,10)||0;
            var idea_mod = parseInt(values.idea_mod,10)||0;
            var idea = kno + idea_mod;
            setAttrs({                            
                idea_max: idea
            });
          });
    });
    on("change:armor change:paralysisdamage", function() {
        getAttrs(["armor", "paralysisdamage", "ap"], function(values) {
            var armor = parseInt(values.armor,10)||0;
            var paralysisdamage = parseInt(values.paralysisdamage,10)||0;
            var ap_max = Math.max(0, 6 - armor - paralysisdamage);
            var ap = parseInt(values.ap,10)||0;
            var ap = Math.min(ap, ap_max);
            setAttrs({     
                ap: ap,                       
                ap_max: ap_max
            });
          });
    });
    on("change:ap", function() {
        getAttrs(["ap", "ap_max"], function(values) {
            let ap = parseInt(values.ap,10)||0;
            let ap_max = parseInt(values.ap_max,10)||0;
            if(ap > ap_max)
            {
                setAttrs({                            
                    ap: ap_max
                });
            }
          });
    });
    on("change:attribute_strength change:attribute_willpower change:skill_insensibility change:hitpoints_mod", function() {
        getAttrs(["attribute_strength", "attribute_willpower", "skill_insensibility","hitpoints_mod" ], function(values) {
            let str = parseInt(values.attribute_strength,10)||0;
            let wil = parseInt(values.attribute_willpower,10)||0;
            let ins = parseInt(values.skill_insensibility, 10)||0;
            let hp_mod = parseInt(values.hitpoints_mod, 10)||0;
            let hp = str + wil + 7 + ins + hp_mod;
            setAttrs({                            
                hitpoints_max: hp
            });
          });
    });
    on("change:attribute_senses change:attribute_dexterity change:skill_reflexes change:ini_mod", function() {
        getAttrs(["attribute_senses", "attribute_dexterity", "skill_reflexes", "ini_mod"], function(values) {
            let sen = parseInt(values.attribute_senses,10)||0;
            let dex = parseInt(values.attribute_dexterity,10)||0;
            // TODO reflexes und ini_mod sind SC Werte! Bei NSC nicht berücksichtigen
            let reflexes = parseInt(values.skill_reflexes,10)||0;
            let ini_mod = parseInt(values.ini_mod, 10)||0;
            let ini = sen + dex + reflexes + ini_mod;
            setAttrs({                            
                ini: ini
            });
          });
    });

    on("clicked:addeffect", () => {
        var newrowid = generateRowID();
        var itemfields = {};
        itemfields["repeating_effects_" + newrowid + "_name"] = "Effect name";
        itemfields["repeating_effects_" + newrowid + "_source"] = "effect source";
        itemfields["repeating_effects_" + newrowid + "_target"] = "hitpoints";
        itemfields["repeating_effects_" + newrowid + "_bonus"] = "1";
        setAttrs(itemfields);
    });

    on("change:malusdamage change:malusdamage_conditions", () => {
        rebuildMods();
    });

    on("change:motivation_name change:motivation_target change:motivation_bonus", function(){
        rebuildMods();
    });
    on("change:repeating_equipment change:repeating_armorsets change:repeating_effects change:repeating_powers change:repeating_hunterpowers", function(){
        rebuildMods();
    });
    on("remove:repeating_equipment remove:repeating_armorsets remove:repeating_effects remove:repeating_powers remove:repeating_hunterpowers", function(eventInfo){   
        rebuildMods();
    });

    var rebuildMods = function() {
        console.log("rebuild mods");
        var mods = {};
        clearMods(mods);
        crawlInfluences(mods, function(mods) {
            crawlSingleEffect("motivation", mods, function(mods) {
                crawlEffects("repeating_equipment", mods, function(mods) {
                    crawlEffects("repeating_armorsets", mods, function(mods) {
                        crawlEffects("repeating_powers", mods, function(mods) {
                            crawlEffects("repeating_hunterpowers", mods, function(mods) {
                                crawlEffects("repeating_effects", mods, function(mods) {
                                    finishRebuildMods(mods);
                                });
                            });
                        });
                    });
                });
            });
        });

    };

    var crawlEffects = function(fieldsetname, mods, callback) {
        var itemfields = [];
        getSectionIDs(fieldsetname, function(idarray) {

            _.each(idarray, function(currentID, i) {
                itemfields.push(fieldsetname+"_" + currentID + "_name");
                itemfields.push(fieldsetname+"_" + currentID + "_target");
                itemfields.push(fieldsetname+"_" + currentID + "_bonus");
            });
            getAttrs(itemfields, function(v) {
                _.each(idarray, function(currentID) {
                    
                    var target = v[fieldsetname+"_" + currentID + "_target"];
                    var modname = v[fieldsetname+"_" + currentID + "_name"];
                    var bonus = parseInt(v[fieldsetname+"_" + currentID + "_bonus"],10);
                    addToMods(modname, target, bonus, mods);
                        
                });
                callback(mods);
                
            });
         });
    }

    var crawlSingleEffect = function(prefix, mods, callback) {
        var itemfields = [];
        itemfields.push(prefix+"_name");
        itemfields.push(prefix+"_target");
        itemfields.push(prefix+"_bonus");
        
        getAttrs(itemfields, function(v) {
            
            var target = v[prefix + "_target"];
            var modname = v[prefix + "_name"];
            var bonus = parseInt(v[prefix + "_bonus"],10);
            addToMods(modname, target, bonus, mods);
            callback(mods);
            
        });

    }
    var crawlInfluences = function(mods, callback) {
        
        getAttrs(["malusdamage", "malusdamage_conditions"], function(values) {
            let malus = parseInt(values.malusdamage,10)||0;
            var modname = values.malusdamage_conditions;
            var target = "mod_checks_all";
            if(malus > 0)
            {
                var bonus = malus * -1;
                addToMods(modname, target, bonus, mods);
            }
            callback(mods);
          });


    }


    var finishRebuildMods = function(mods) {
        console.log("Finish rebuild mods");
        applyParryToWeapons(mods);
        applySpecialMod(mods, "mod_checks_all", checklist);
        applySpecialMod(mods, "mod_parry_all", parrylist);       
        console.log(mods);

        var update = createUpdateListFromMods(mods);
        console.log(update);
        setAttrs(update);
    };
    var applySpecialMod = function(mods, specialModName, specialList) {
        if (mods.hasOwnProperty(specialModName)) {
            _.each(specialList, function (item) {
                _.each(mods[specialModName], function (mod) {
                    addToMods(mod.modname, item, mod.bonus, mods);
                });
    
            });
        }
    };

    var applyParryToWeapons = function(mods) {
        _.each(parrylist, function (parryitem) {
            var weaponname = parryitem.replace("parry_", "");
            if(mods.hasOwnProperty(weaponname))
            {
                _.each(mods[weaponname], function (weaponmod) {
                    addToMods(weaponmod.modname, parryitem, weaponmod.bonus, mods);
                });
            }
        });       
    };
    var clearMods = function(mods) {
        _.each(checklist, function (checkitem) {
            mods[checkitem] = [];
        });
        mods["hitpoints"] = [];
        mods["ini"] = [];
        mods["mod_parry_all"] = [];
        mods["mod_checks_all"] = [];
        mods["idea"] = [];
        mods["coup"] = [];
    };
    var addToMods = function(modname, target, bonus, mods) {
        if(!mods.hasOwnProperty(target))
            mods[target] = [];

        mods[target].push({modname: modname, bonus: bonus});
    };
    var createUpdateListFromMods = function(mods){
        var update = {};
        Object.entries(mods).forEach(([target,v]) => {
            var modnames = [];
            var bonus_sum = 0;
            _.each(v, function(mod){
                var bonus = mod.bonus;
                if(bonus != 0 && !isNaN(bonus))
                {
                    bonus_sum += bonus;
                    var bonusstring = bonus.toString();
                    if(bonus > 0)
                        bonusstring = "+"+bonusstring;
                    modnames.push(mod.modname + " "+bonusstring);
                }
            });                  

            update[target+"_mod"] = bonus_sum;
            update[target+"_mod_desc"] = modnames.join(", ")||"";
        });
        return update;
    };

    const skills = {
        'skill_acrobatics':{att: 'attribute_athletic'},
        'skill_alertness':{att: 'attribute_senses'},
        'skill_perception':{att: 'attribute_senses'},
        'skill_firstaid':{att: 'attribute_knowledge'},
        'skill_sleightofhand':{att: 'attribute_dexterity'},
        'skill_mentalpower':{att: 'attribute_willpower'},
        'skill_crafting':{att: 'attribute_dexterity'},
        'skill_stealth':{att: 'attribute_athletic'},
        'skill_countryandpeople':{att: 'attribute_knowledge'},
        'skill_rhetoric':{att: 'attribute_willpower'},
        'skill_flexing':{att: 'attribute_strength'},
        'skill_reflexes':{att: 'attribute_senses'},
        'skill_riding':{att: 'attribute_athletic'},
        'skill_insensibility':{att: 'attribute_strength'},
        'skill_fieldsofknowledge':{att: 'attribute_knowledge'},
        'skill_witchcraft':{att: 'attribute_knowledge'},

        'weapon_punch':{att: 'attribute_athletic'},
        'weapon_dagger':{att: 'attribute_dexterity'},
        'weapon_fencing':{att: 'attribute_athletic'},
        'weapon_swords' :{att: 'attribute_strength'},
        'weapon_scimitar' :{att: 'attribute_strength'},
        'weapon_impact' :{att: 'attribute_strength'},
        'weapon_polearm' :{att: 'attribute_strength'},
        'weapon_lance' :{att: 'attribute_strength'},
        'weapon_sling' :{att: 'attribute_dexterity'},
        'weapon_pistol' :{att: 'attribute_senses'},
        'weapon_crossbow' :{att: 'attribute_senses'},
        'weapon_musket' :{att: 'attribute_senses'},
        'weapon_dodge' :{att: 'attribute_athletic'},
        'weapon_shield' :{att: 'attribute_strength'},
    };
    Object.keys(skills).forEach(skill => {  
        let attributeName = skills[skill].att;   
        on(`change:${skill} change:${attributeName}`, () => {
            getAttrs([skill, attributeName], function(values) {
                let skillValue = parseInt(values[skill],10)||0;
                let attributeValue = parseInt(values[attributeName],10)||0;
                let v = skillValue + attributeValue;
                setAttrs({                            
                    [`${skill}_max`]: v
                });
            });
        });
    });

    on("sheet:opened", function(eventInfo){
        getAttrs(["armor", "weapon_punch_active", "weapon_dodge_active", "tutorial_step"], function(values) {
            console.log("sheet:opened");
            var armor = parseInt(values.armor) || 1;
            var ap_max = 6 - armor;
            var ap = ap_max;
            var weapon_punch_active = parseInt(values.weapon_punch_active) || 1;
            var weapon_dodge_active = parseInt(values.weapon_dodge_active) || 1;
            var tutorial_step = parseInt(values.tutorial_step) || 0;
            
            setAttrs({
                armor, ap, ap_max,
                weapon_punch_active: weapon_punch_active,
                weapon_dodge_active: weapon_dodge_active,
                tutorial_step: tutorial_step
            });
        });
    });

    on('sheet:compendium-drop', (event) => {
        console.log(event);
    });

    on(`change:${dh.triggerName}`, dh.handleCompendiumDrop);
    


