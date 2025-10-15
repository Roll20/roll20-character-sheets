
on("change:repeating_mag-sort:mag-sort-ka change:repeating_mag-sort:mag-sort-degre change:repeating_mag-sort:mag-sort-cercle change:kaeau change:kafeu change:katerre change:kaair change:kalune change:mag-basse-degre change:mag-haute-degre change:mag-secret-degre change:KADFeu change:KADEau change:KADTerre change:KADAir change:KADLune change:malusMag sheet:opened", function()
{
    getSectionIDs("repeating_mag-sort", function(idarray)
    {
        _.each(idarray,function(id)
        {
            getAttrs([
            "repeating_mag-sort_"+id+"_mag-sort-ka", "repeating_mag-sort_"+id+"_mag-sort-degre", "repeating_mag-sort_"+id+"_mag-sort-cercle",
            "kaeau", "kafeu", "katerre", "kaair", "kalune", "KADFeu", "KADEau", "KADTerre", "KADAir", "KADLune",
            "mag-basse-degre", "mag-haute-degre", "mag-secret-degre", "malusMag"
            ], function(values) {

                var KADF = parseInt(values["KADFeu"], 10)||0;
                var KADE = parseInt(values["KADEau"], 10)||0;
                var KADT = parseInt(values["KADTerre"], 10)||0;
                var KADA = parseInt(values["KADAir"], 10)||0;
                var KADL = parseInt(values["KADLune"], 10)||0;

                var malusMag = parseInt(values["malusMag"], 10)||0;

                var ka_element = values["repeating_mag-sort_"+id+"_mag-sort-ka"];
                var ka_element_value = parseInt(values[ka_element], 10)||0;

                var mag_voie = values["repeating_mag-sort_"+id+"_mag-sort-cercle"];
                var mag_voie_value = parseInt(values[mag_voie], 10)||0;

                var degre = parseInt(values["repeating_mag-sort_"+id+"_mag-sort-degre"], 10)||0;

                var metamorphose = 0;

                if(ka_element == "kaair")
                    metamorphose = KADA;

                if(ka_element == "kafeu")
                    metamorphose = KADF;

                if(ka_element == "kaeau")
                    metamorphose = KADE;

                if(ka_element == "katerre")
                    metamorphose = KADT;

                if(ka_element == "kalune")
                    metamorphose = KADL;

                var total = (ka_element_value + mag_voie_value + metamorphose - malusMag) - degre;

                setAttrs({
                    ["repeating_mag-sort_"+id+"_mag-sort-current"]: total
                });
            });
        });
    });

});

on("change:repeating_kabb-invoc:kabb-invoc-ka change:repeating_kabb-invoc:kabb-invoc-sephira change:kaeau change:kafeu change:katerre change:kaair change:kalune change:malkut change:yesod change:hod change:netzah change:tiphereth change:chesed change:geburah change:binah change:hokmah change:kheter change:ordonnanceBonus change:KADFeu change:KADEau change:KADTerre change:KADAir change:KADLune change:malusMag sheet:opened", function()
{
    getSectionIDs("repeating_kabb-invoc", function(idarray)
    {
        console.log("Metamorphose");
        _.each(idarray,function(id)
        {
            getAttrs([
            "repeating_kabb-invoc_"+id+"_kabb-invoc-ka", "repeating_kabb-invoc_"+id+"_kabb-invoc-sephira",
            "kaeau", "kafeu", "katerre", "kaair", "kalune", "KADFeu", "KADEau", "KADTerre", "KADAir", "KADLune",
            "malkut", "yesod", "hod", "netzah", "tiphereth", "chesed", "geburah", "binah", "hokmah", "kheter", "ordonnanceBonus", "malusMag"
            ], function(values) {

                var KADF = parseInt(values["KADFeu"], 10)||0;
                var KADE = parseInt(values["KADEau"], 10)||0;
                var KADT = parseInt(values["KADTerre"], 10)||0;
                var KADA = parseInt(values["KADAir"], 10)||0;
                var KADL = parseInt(values["KADLune"], 10)||0;

                var malusMag = parseInt(values["malusMag"], 10)||0;

                var ka_element = values["repeating_kabb-invoc_"+id+"_kabb-invoc-ka"];
                var ka_element_value = parseInt(values[ka_element], 10)||0;

                var kabb_sephira = values["repeating_kabb-invoc_"+id+"_kabb-invoc-sephira"];
                var kabb_sephira_value = parseInt(values[kabb_sephira], 10)||0;

                var ordonnance = parseInt(values["ordonnanceBonus"], 10)||0;

                var metamorphose = 0;

                if(ka_element == "kaair")
                    metamorphose = KADA;

                if(ka_element == "kafeu")
                    metamorphose = KADF;

                if(ka_element == "kaeau")
                    metamorphose = KADE;

                if(ka_element == "katerre")
                    metamorphose = KADT;

                if(ka_element == "kalune")
                    metamorphose = KADL;

                console.log("Metamorphose : "+metamorphose);

                var total = (ka_element_value + kabb_sephira_value + ordonnance + metamorphose - malusMag);

                setAttrs({
                    ["repeating_kabb-invoc_"+id+"_kabb-invoc-current"]: total
                });
            });
        });
    });
});

on("change:repeating_alch-form:alch-form-art change:repeating_alch-form:alch-form-ka-1 change:repeating_alch-form:alch-form-ka-2 change:repeating_alch-form:alch-form-subs change:repeating_alch-form:alch-form-degre change:repeating_alch-form:alch-oeuvre-noir change:repeating_alch-form:alch-oeuvre-blanc change:repeating_alch-form:alch-oeuvre-rouge change:kaeau change:kafeu change:katerre change:kaair change:kalune change:alch-athanor-kafeu change:alch-athanor-kaeau change:alch-athanor-katerre change:alch-athanor-kalune change:alch-athanor-kaair change:alch-aludel-kafeu change:alch-aludel-kaeau change:alch-aludel-katerre change:alch-aludel-kalune change:alch-aludel-kaair change:alch-alambic-kafeu change:alch-alambic-kaeau change:alch-alambic-katerre change:alch-alambic-kalune change:alch-alambic-kaair change:alch-cornue-kafeu change:alch-cornue-kaeau change:alch-cornue-katerre change:alch-cornue-kalune change:alch-cornue-kaair change:alch-creuset-kafeu change:alch-creuset-kaeau change:alch-creuset-katerre change:alch-creuset-kalune change:alch-creuset-kaair change:alch-oeuvre-noir change:alch-oeuvre-blanc change:alch-oeuvre-rouge sheet:opened", function()
{
    getSectionIDs("repeating_alch-form", function(idarray)
    {
        _.each(idarray,function(id)
        {
            getAttrs([
            "repeating_alch-form_"+id+"_alch-form-art", "repeating_alch-form_"+id+"_alch-form-ka-1", "repeating_alch-form_"+id+"_alch-form-ka-2", "repeating_alch-form_"+id+"_alch-form-subs", "repeating_alch-form_"+id+"_alch-form-degre",
            "kaeau", "kafeu", "katerre", "kaair", "kalune",
            "alch-oeuvre-noir", "alch-oeuvre-blanc", "alch-oeuvre-rouge",
            "alch-athanor-kafeu", "alch-athanor-kaeau", "alch-athanor-katerre", "alch-athanor-kalune", "alch-athanor-kaair",
            "alch-aludel-kafeu", "alch-aludel-kaeau", "alch-aludel-katerre", "alch-aludel-kalune", "alch-aludel-kaair",
            "alch-alambic-kafeu", "alch-alambic-kaeau", "alch-alambic-katerre", "alch-alambic-kalune", "alch-alambic-kaair",
            "alch-cornue-kafeu", "alch-cornue-kaeau", "alch-cornue-katerre", "alch-cornue-kalune", "alch-cornue-kaair",
            "alch-creuset-kafeu", "alch-creuset-kaeau", "alch-creuset-katerre", "alch-creuset-kalune", "alch-creuset-kaair"
            ], function(values)
            {

                // On récupère la valeur de la substance qui correspondt à l'id du construct
                var construct = values["repeating_alch-form_"+id+"_alch-form-subs"];
                var ka_element1 = values["repeating_alch-form_"+id+"_alch-form-ka-1"];
                var ka_element2 = values["repeating_alch-form_"+id+"_alch-form-ka-2"];

                // On construit l'id du ka concerné du construct sous la forme : "contruct-kaelement". Cela permet de récupérer la bonne valeur
                var ka_element_value1 = parseInt(values[construct + "-" + ka_element1], 10)||0;
                var ka_element_value2 = parseInt(values[construct + "-" + ka_element2], 10)||0;

                var alch_oeuvre = values["repeating_alch-form_"+id+"_alch-form-art"];
                var alch_oeuvre_value = parseInt(values[alch_oeuvre], 10)||0;
                var degre = parseInt(values["repeating_alch-form_"+id+"_alch-form-degre"], 10)||0;

                var totalKa = 0;

                if(alch_oeuvre == "alch-oeuvre-blanc")
                {
                    if(ka_element1 != "0" && ka_element2 != "0")
                        totalKa = Math.min(ka_element_value1, ka_element_value2);
                    else if(ka_element1 == "0" && ka_element2 != "0")
                        totalKa = ka_element_value2;
                    else if(ka_element1 != "0" && ka_element2 == "0")
                        totalKa = ka_element_value1;
                }
                else
                    totalKa = ka_element_value1 + ka_element_value2;

                var total = (totalKa + alch_oeuvre_value) - degre;

                setAttrs({
                    ["repeating_alch-form_"+id+"_alch-form-current"]: total
                });


            });
        });
    });
});

on("remove:repeating_kabb-ord change:repeating_kabb-ord change:repeating_kabb-ord:kabb-ord-respect sheet:opened", function()
{

    var total = 0;

    setAttrs({
        ordonnanceBonus: 0
    });

    getSectionIDs("repeating_kabb-ord", function(idarray)
    {
        _.each(idarray,function(id)
        {
            getAttrs([
            "repeating_kabb-ord_"+id+"_kabb-ord-respect"
            ], function(values)
            {
                var ordonnanceR = values["repeating_kabb-ord_"+id+"_kabb-ord-respect"];

                if(ordonnanceR != "on")
                    total += 1;

                setAttrs({
                    ordonnanceBonus: total
                });
            });
        });
    });


});

on("sheet:opened change:repeating_savoir-eso", function()
{
    getSectionIDs("repeating_savoir-eso", function(idarray)
    {
        _.each(idarray,function(id)
        {
            getAttrs([
            "repeating_savoir-eso_"+id+"_savoir_eso"
            ], function(values)
            {
                const savoir = values["repeating_savoir-eso_"+id+"_savoir_eso"];
                var result = "";

                if(savoir == "0")
                    result = "";
                else
                    result = savoir;

                console.log(result);

                setAttrs({
                    ["repeating_savoir-eso_"+id+"_savoir_eso_perso"]: result
                });
            });
        });
    });
});

on("sheet:opened change:repeating_quetes-eso", function()
{
    getSectionIDs("repeating_quetes-eso", function(idarray)
    {
        _.each(idarray,function(id)
        {
            getAttrs([
            "repeating_quetes-eso_"+id+"_quete_eso"
            ], function(values)
            {
                const quete = values["repeating_quetes-eso_"+id+"_quete_eso"];
                var result = "";

                if(quete == "0")
                    result = "";
                else
                    result = quete;

                console.log(result);

                setAttrs({
                    ["repeating_quetes-eso_"+id+"_quete_eso_perso"]: result
                });
            });
        });
    });
});

on("sheet:opened change:repeating_metamorphose remove:repeating_metamorphose", function()
{
    getSectionIDs("repeating_metamorphose", function(idarray)
    {
        var length = idarray.length;

        getAttrs([
        "degreMetamorphe"
        ], function(values)
        {
            const meta = values["degreMetamorphe"];
            if(meta > length)
            {
                setAttrs({
                    dMeta: length,
                    degreMetamorphe:0
                });
            }

            setAttrs({
                dMeta: length
            });

            console.log("Meta : "+meta);
        });
    });
});

on("change:mag-secret-degre sheet:opened", function()
{
    getAttrs(["mag-secret-degre"], function(values) {
        let degre = parseInt(values["mag-secret-degre"],10)||0;
        let allowedLinks = 0;
        switch (degre) {
            case 2: allowedLinks = 4; break;
            case 3: allowedLinks = 5; break;
            case 4: allowedLinks = 6; break;
            case 5: allowedLinks = 8; break;
            case 6: allowedLinks = 10; break;
            case 7: allowedLinks = 12; break;
            case 8: allowedLinks = 14; break;
            case 9: allowedLinks = 16; break;
            case 10: allowedLinks = 20; break;
            default: allowedLinks = 0;
        }
        setAttrs({
            magSecretAllowedLinks: allowedLinks
        });
    });
});

on("change:repeating_maillon remove:repeating_maillon sheet:opened", function()
{
    getSectionIDs("repeating_maillon", function(idarray) {
        setAttrs({
            magSecretCurrentLinks: idarray.length
        })
    });
});

on("change:repeating_epoques-incarnation:use_mnemos1 change:repeating_epoques-incarnation:use_mnemos2 sheet:opened", function(data)
{
    console.log("Dés-activer le Mnemos")
    getSectionIDs("repeating_epoques-incarnation", function(idarray) {
        _.each(idarray, function(id) {
            getAttrs(["repeating_epoques-incarnation_"+id+"_use_mnemos1", "repeating_epoques-incarnation_"+id+"_use_mnemos2"], function(values) {
                console.log("Je suis dans la boucle !");
                let useMnemos1 = values["repeating_epoques-incarnation_"+id+"_use_mnemos1"] == 'on';
                let useMnemos2 = values["repeating_epoques-incarnation_"+id+"_use_mnemos2"] == 'on'
                console.log("Mémos 1 " + useMnemos1 + "; Mnémos 2 " + useMnemos2);

                let effectiveMnemos = "";
                effectiveMnemos += useMnemos1 ? "@{degres_mnemos1}+" : "0+";
                effectiveMnemos += useMnemos2 ? "@{degres_mnemos2}" : "0";
                console.log("Effective mnemos: " + effectiveMnemos);

                let effectiveRoll = "@{gm} &{template:base} {{name=@{character_name}}} {{vecu=@{vecu}}} {{jet=[[1d100]]}} @{approche}"
                if (useMnemos1) {
                    effectiveRoll += " {{mnemos1=@{mnemos1}}}";
                }
                if (useMnemos2) {
                    effectiveRoll += " {{mnemos2=@{mnemos2}}}";
                }
                console.log("Effective roll: " + effectiveRoll);

                setAttrs({
                    ["repeating_epoques-incarnation_"+id+"_effectiveMnemos"]: effectiveMnemos,
                    ["repeating_epoques-incarnation_"+id+"_effectiveRoll"]: effectiveRoll
                });
            });
        });
    });
});