const versioning = version => {
  	console.log(`%c Shadowrun 5th Edition versioning, ${version}`, "color: darkblue; font-weight:bold");

    switch(true) {
        case version < 1.35:
          onepointthreefive()
          setAttrs({version: 1.35}, () => versioning(1.35))
          break;
        case version < 1.41:
          onepointfour()
          setAttrs({version: 1.41}, () => versioning(1.41))
          break;
        case version < 4.0:
          fourpointzero()
          setAttrs({version: 4.0}, () => versioning(4.0))
          break;
        case version < 4.1:
          fourpointone()
          setAttrs({version: 4.1}, () => versioning(4.1))
          break;
        case version < 4.11:
          fourpointone()
          fourpointoneone()
          setAttrs({version: 4.11}, () => versioning(4.11))
          break;
        case version < 4.15:
          fourpointonefive()
          setAttrs({version: 4.15}, () => versioning(4.15))
          break;
        default:
            console.log(`%c Shadowrun 5th Edition is update to date. Version ${version}`, "color: green; font-weight:bold");
    }
};

const fourpointonefive = () => {
  updateDerivedAttribute('defense')
  updateAttributes(sheetAttributes.initiative_mod, 'initiative_mod')
  updateAstralInitiative()

  sheetAttributes.repeatingSkills.forEach(skill => {
    getSectionIDs(skill, idarray => {
      let attributes = []
      idarray.forEach(id => attributes.push(`repeating_${skill}_${id}_limit`))

      getAttrs(attributes, values => {
        let update = {}
        for (let [key, value] of Object.entries(values)) {
          const repRowID = processingFunctions.getReprowid(key)
          if (value.includes('limit')) {
            const translationKey = processingFunctions.sliceAttr(value)
            update[`${repRowID}_display_limit`] = getTranslationByKey(translationKey)
          } else {
            update[`${repRowID}_display_limit`] = ' '
          }
        }
        processingFunctions.setAttributes(update) 
      })
    })
  })
}

const fourpointoneone = () => {
  getSectionIDs('forms', idarray => {
    let attributes = [];
    let update = {};

    idarray.forEach(id => attributes.push(`repeating_forms_${id}_spec`))

    getAttrs(attributes, value => {
      idarray.forEach(id => update[`repeating_forms_${id}_specialization`] = value[`repeating_forms_${id}_spec`])
      setAttrs(update);
    });
  });
}

const fourpointone = () => {
  getAttrs(["initiative_modifier", "initiative_temp", "initiative_temp_flag"], value => {
    setAttrs({
      initiative_mod_modifier: value.initiative_modifier,
      initiative_mod_temp: value.initiative_temp,
      initiative_mod_temp_flag: value.initiative_mod_temp_flag
    })
  })

  getSectionIDs('range', idarray => {
    let attributes = [];
    let update = {};
    idarray.forEach(id => attributes.push(`repeating_range_${id}_spec`))
    getAttrs(attributes, value => {
      idarray.forEach(id => update[`repeating_range_${id}_specialization`] = value[`repeating_range_${id}_spec`])
      setAttrs(update);
    });
  });

  getSectionIDs('melee', idarray => {
    let attributes = [];
    let update = {};
    idarray.forEach(id => attributes.push(`repeating_melee_${id}_spec`))
    getAttrs(attributes, value => {
      idarray.forEach(id => update[`repeating_melee_${id}_specialization`] = value[`repeating_melee_${id}_spec`])
      setAttrs(update);
    });
  });

  getSectionIDs("active", idarray => {
    let attributes = [];
    let update = {};
    idarray.forEach(id => attributes.push(`repeating_active_${id}_skill`))
    getAttrs(attributes, value => {
        idarray.forEach(id => update[`repeating_active_${id}_display_skill`] = value[`repeating_active_${id}_skill`])
       setAttrs(update);
    });
  });
}

const fourpointzero = () => {
    const attributes = ['physical', 'physical_damage', 'stun', 'stun_damage', 'sheet_type', 'matrix_con'];
    getAttrs(attributes, value => {
        let update = {};
        update["physical"] = value.physical_damage || 0;
        update["stun"] = value.stun_damage || 0;
        update["matrix"] = value.matrix_con || 0;

        setAttrs(update);
    });

    getSectionIDs("ritual", idarray => {
        let ritualAttributes = [];
        let update = {};

        idarray.forEach(id => {
            ritualAttributes.push(`repeating_ritual_${id}_spec`);
        });

        getAttrs(ritualAttributes, value => {
            idarray.forEach(id => {
                update[`repeating_ritual_${id}_specialization`] = value[`repeating_ritual_${id}_spec`]
            }); 

           setAttrs(update);
        });
    });
};

const onepointfour = () => {
    const toggles = [`wound_toggle`, `edge_toggle`, `modifier_toggle`];
    getAttrs(toggles, (v) => {
        let set = {};
        toggles.forEach(attr => {
            const name = attr.split("_")[0], value = v[`${attr}`].toString();
            value != "0" || !value.includes(name) ? set[`${attr}`] = 0 : false;
        });
        setAttrs(set);
    });
};

const onepointthreefive = () => {
    getAttrs(["sheet_type"], (v) => {
        if (v.sheet_type === "goon") {
            setAttrs({
                ["sheet_type"]: "grunt" 
            });
        }
    });  
};
