on("sheet:opened", eventInfo => {
    getAttrs(["sheet_version"], values => {
        if (values["sheet_version"] !== "1") {
            getAttrs(["song", "iconic", "totalluck"], values => {
                const set_attrs = {};

                set_attrs["favourite_song"] = values["song"];
                set_attrs["iconic_item"] = values["iconic"];
                set_attrs["luck_max"] = values["totalluck"];
                set_attrs["sheet_version"] = 1;

                setAttrs(set_attrs);
            })

        }
    })
});