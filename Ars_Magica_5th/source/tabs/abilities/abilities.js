function setSelectedShapeshift(rowID) {
    getSectionIDs("shapeshifts", (IDs) => {
        const attributeUpdates = {};
        for(var i=0; i < IDs.length; i++) {
            attributeUpdates["repeating_shapeshifts_" + IDs[i] + "_selected"] = "0";
        }
        attributeUpdates["repeating_shapeshifts_" + rowID + "_selected"] = "1";
        console.log("Setting active shapeshift to rowID=" + rowID);
        console.log("Setting attributes: \n" + JSON.stringify(attributeUpdates));
        k.setAttrs(attributeUpdates);
    });
}

function addShapeshift({ attributes, trigger }) {
    k.getAllAttrs({
        callback: (attributes, sections, casc) => {
            const newRow = k.generateRowID("repeating_shapeshifts", sections);
            console.log("Added repeating_shapeshifts row: " + newRow);
            const attributeUpdates = {};
            attributeUpdates[newRow + "_shapeshift_name"] = "New shapeshift";
            k.setAttrs(attributeUpdates, null, () => {
                const [section, rowID, attrName] = k.parseTriggerName(newRow + "_shapeshift_name");
                setSelectedShapeshift(rowID);
            });
        }
    });
}

function selectShapeshift({ attributes, trigger }) {
    const [section, rowID, attrName] = k.parseTriggerName(trigger.name);
    setSelectedShapeshift(rowID);
    
}

function removeShapeshift({ attributes, trigger }) {
    console.log("Removed repeating_shapeshifts rowId: <unknown>");
}

k.registerFuncs({ addShapeshift, selectShapeshift, removeShapeshift });
