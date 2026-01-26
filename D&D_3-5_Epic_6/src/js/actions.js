const buttonlist = ["character", "journal","spells", "configuration"];

buttonlist.forEach(button => {
    on(`clicked:${button}`, function() {
        setAttrs({
            sheetTab: button
        });
    });
});
