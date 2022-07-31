// SHEET-WORKERS
//Tab toggle
const buttonlist = ["character","edit"];
buttonlist.forEach(button => {
    on(`clicked:${button}`, function() {
        setAttrs({
            sheetTab: button
        });
    });
});

// Button Click: Remove a survival point
on("clicked:survivalSub", () => {
    getAttrs(["survival"], function(values) {
        setAttrs({ survival: Math.max(0, parseInt(values.survival)-1) });
    });
});

// Button Click: Add a survival point
on("clicked:survivalAdd", () => {
    getAttrs(["survival"], function(values) {
        setAttrs({ survival: parseInt(values.survival)+1 });
    });
});

// Button Click: Remove a target point
on("clicked:targetSub", () => {
    getAttrs(["target"], function(values) {
        setAttrs({ target: Math.max(0, parseInt(values.target)-1) });
    });
});

// Button Click: Add a target point
on("clicked:targetAdd", () => {
    getAttrs(["target"], function(values) {
        setAttrs({ target: parseInt(values.target)+1 });
    });
});
