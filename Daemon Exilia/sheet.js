// Version update for new or modified attributes
on("sheet:opened", function() {
    getAttrs([
        "version", "sheettype", "nome-personagem", "FE-imagem", "FÉ-base",
        "FÉ-adicional-1", "FÉ-total", "Fé-display", "PV_ATUAL-display",
        "PM_ATUAL-display", "Fé_ATUAL-display", "RD-display"
    ], function(v) {
        const version = parseFloat(v.version) || 0;
        let attrs = {};

        // Compatibilidade com versões antigas (v < 1)
        if (version < 1) {
            if (v.sheettype !== "mortal1") {
                attrs["game_line"] = getGameLine(v.sheettype);
                attrs["edition"] = getEdition(v.sheettype);
            }
            attrs["version"] = 1;
        }

        // Migração para versão 1.1
        if (version < 1.1) {
            if (v["nome-personagem"]) attrs["character_name"] = v["nome-personagem"];
            if (v["FE-imagem"]) attrs["Confinada-imagem"] = v["FE-imagem"];
            if (v["FÉ-base"]) attrs["Confinado-1"] = v["FÉ-base"];
            if (v["FÉ-adicional-1"]) attrs["Confinado-2"] = v["FÉ-adicional-1"];
            if (v["FÉ-total"]) attrs["Confinado-total"] = v["FÉ-total"];
            if (v["Fé-display"]) attrs["RD-display"] = v["Fé-display"];
            if (v["PV_ATUAL-display"]) attrs["PV_Atual-display"] = v["PV_ATUAL-display"];
            if (v["PM_ATUAL-display"]) attrs["PM_Atual-display"] = v["PM_ATUAL-display"];
            if (v["Fé_ATUAL-display"]) attrs["RM-display"] = v["Fé_ATUAL-display"];
            if (v["RD-display"]) attrs["Confinada-display"] = v["RD-display"];

            attrs["version"] = 1.1;
        }

        // Aplicar alterações
        if (Object.keys(attrs).length) {
            setAttrs(attrs);
        }
    });
});
