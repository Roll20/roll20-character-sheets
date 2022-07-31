on("sheet:opened", eventInfo => {
    getAttrs(["sheet_version",], values => {
        if (+values["sheet_version"] < 1) {
            getAttrs(["song", "iconic", "totalluck"], values => {
                const {song, iconic, totalluck} = values || false;
                const updateAttrs = {};
                if (song && iconic && totalluck) {
                    updateAttrs["favourite_song"] = values["song"];
                    updateAttrs["iconic_item"] = values["iconic"];
                    updateAttrs["luck_max"] = values["totalluck"];
                }
                updateAttrs["sheet_version"] = "1";
                setAttrs(updateAttrs);
            })

        }
    });
});