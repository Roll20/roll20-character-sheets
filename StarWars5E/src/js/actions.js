on("clicked:adv_advantage", () =>{
    setAttrs({"advantagetoggle":"{{query=1}} {{advantage=1}} {{r2=[[@{d20}"});
});

on("clicked:adv_normal", () =>{
    setAttrs({"advantagetoggle":"{{query=1}} {{normal=1}} {{r2=[[0d20"});

});

on("clicked:adv_disadvantage", () =>{
    setAttrs({"advantagetoggle":"{{query=1}} {{disadvantage=1}} {{r2=[[@{d20}"});

});

on("clicked:wtype_public", () =>{
    setAttrs({"whispertoggle":""});
});

on("clicked:wtype_whisper", () =>{
    setAttrs({"whispertoggle":"/w gm"});
});

on("clicked:tab_core", () => {
    setAttrs({"tab":"core"});
});

on("clicked:tab_bio", () => {
    setAttrs({"tab":"bio"});
});

on("clicked:tab_powers", () => {
    setAttrs({"tab":"powers"});
});

on("clicked:tab_options", () => {
    setAttrs({"tab":"options"});
});

on("clicked:ship_tab_options", () => {
    setAttrs({"ship_tab":"ship-options"});
});

on("clicked:ship_tab_core", () => {
    setAttrs({"ship_tab":"ship-core"});
});

on("clicked:ship_tab_mods", () => {
    setAttrs({"ship_tab":"ship-mods"});
});

on("clicked:ship_tab_cargo", () => {
    setAttrs({"ship_tab":"ship-cargo"});
});

on("clicked:ship_tab_suites", () => {
    setAttrs({"ship_tab":"ship-suites"});
});