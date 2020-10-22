const helperFunctions = (() => {

    const extractRepeatingId = (attribute, section) => {
        const prefix = `repeating_${section}`;

        return attribute.substring(0, (prefix.length+21));
    };

    const extractRepeatingIdExact = (attribute, section) => {
        const prefix = `repeating_${section}`;

        return attribute.substring(prefix.length, (prefix.length+21));
    };

    const getSectionIDsOrdered = (section_name, callback) => {
        getAttrs([`_reporder_repeating_${section_name}`], values => {
            getSectionIDs(`repeating_${section_name}`, id_array => {
                const reporder_array = (values[`_reporder_repeating_${section_name}`]) ? values[`_reporder_repeating_${section_name}`].toLowerCase().split(',') : [];
                const ids = [...new Set(reporder_array.filter(id => reporder_array.includes(id)).concat(id_array))];

                callback(ids);
            });
        });
    };

    const capitalizeString = (string) => {
        return string.split(" ").map(word => `${word.substring(0,1).toUpperCase()}${word.substring(1,word.length)}`).join(" ");
    }

    const parseJSON = (json) => {
        let result = {};
  
        try {
          result = JSON.parse(json);
        } catch (error) {
          result = json;
        }
  
        return result;
    }

    const aggregateRepeatingIDs = (repeating_sections, callback, aggregate) => {
        
        const section = repeating_sections.shift();

        if (section) {
            aggregate = aggregate || {};

            getSectionIDs(`repeating_${section}`, ids => {
                
                aggregate[section] = ids

                if (repeating_sections.length === 0) {
                    callback(aggregate);
                } else {
                    aggregateRepeatingIDs(repeating_sections, callback, aggregate);
                }
            });
        } else {
            callback(aggregate);
        }
    }

    return {
        extractRepeatingId: extractRepeatingId,
        extractRepeatingIdExact: extractRepeatingIdExact,
        getSectionIDsOrdered: getSectionIDsOrdered,
        capitalizeString: capitalizeString,
        parseJSON: parseJSON, 
        aggregateRepeatingIDs:aggregateRepeatingIDs,
    }

})();