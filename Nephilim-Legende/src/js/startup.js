
on("sheet:opened change:degreMetamorphe change:KaDominant", function()
{
    getAttrs(["degreMetamorphe", "KaDominant"], function(values)
    {
        var KAD = values["KaDominant"];
        var degre = parseInt(values["degreMetamorphe"], 10)||0;

        if(KAD == "Feu")
        {
            setAttrs({
                KADFeu: degre,
                KADTerre: 0,
                KADAir: 0,
                KADLune: 0,
                KADEau: 0
            });
        }

        if(KAD == "Terre")
        {
            setAttrs({
                KADFeu: 0,
                KADTerre: degre,
                KADAir: 0,
                KADLune: 0,
                KADEau: 0
            });
        }

        if(KAD == "Air")
        {
            setAttrs({
                KADFeu: 0,
                KADTerre: 0,
                KADAir: degre,
                KADLune: 0,
                KADEau: 0
            });
        }

        if(KAD == "Lune")
        {
            setAttrs({
                KADFeu: 0,
                KADTerre: 0,
                KADAir: 0,
                KADLune: degre,
                KADEau: 0
            });
        }

        if(KAD == "Eau")
        {
            setAttrs({
                KADFeu: 0,
                KADTerre: 0,
                KADAir: 0,
                KADLune: 0,
                KADEau: degre
            });
        }
    });
});

on("sheet:opened", function() {
    getAttrs(["version"], function(value)
    {
        var version = value["version"];

        if(version < 2)
        {
            getSectionIDs("repeating_epoques-incarnation", function(idarray)
            {
                _.each(idarray,function(id)
                {
                    getAttrs(["repeating_epoques-incarnation_"+id+"_epoque", "repeating_epoques-incarnation_"+id+"_vecus-passe1", "repeating_epoques-incarnation_"+id+"_degres_vecu_passe1", "repeating_epoques-incarnation_"+id+"_vecus-passe2", "repeating_epoques-incarnation_"+id+"_degres_vecu_passe2"], function (v)
                    {
                        var epoque = v["repeating_epoques-incarnation_"+id+"_epoque"];
                        var vecus1 = v["repeating_epoques-incarnation_"+id+"_vecus-passe1"];
                        var vecus2 = v["repeating_epoques-incarnation_"+id+"_vecus-passe2"];
                        var vecusD1 = v["repeating_epoques-incarnation_"+id+"_degres_vecu_passe1"];
                        var vecusD2 = v["repeating_epoques-incarnation_"+id+"_degres_vecu_passe2"];

                        setAttrs({
                            ["repeating_epoques-incarnation_"+id+"_vecu"]: vecus1,
                            ["repeating_epoques-incarnation_"+id+"_degres_vecu_passe"]: vecusD1
                        });

                        console.log(epoque);
                        console.log(vecus1);
                        console.log(vecusD1);
                        console.log(vecus2);
                        console.log(vecusD2);

                        var newrowid = generateRowID();
                        var newrowattrs = {};
                        newrowattrs["repeating_epoques-incarnation_" + newrowid + "_epoque"] = epoque;
                        newrowattrs["repeating_epoques-incarnation_" + newrowid + "_vecu"] = vecus2;
                        newrowattrs["repeating_epoques-incarnation_" + newrowid + "_degres_vecu_passe"] = vecusD2;
                        setAttrs(newrowattrs);
                    });

                });
            });

            getSectionIDs("repeating_quetes-eso", function(idarray)
            {
                _.each(idarray,function(id)
                {
                    getAttrs(["repeating_quetes-eso_"+id+"_quete_eso"], function (v)
                    {
                        var quete = v["repeating_quetes-eso_"+id+"_quete_eso"];
                        var result;

                        if(quete == "0")
                            result = "";
                        else if(quete == "arcadia")
                            result = "Arcadia";
                        else if(quete == "arcane-xxi")
                            result = "Arcane XXI";
                        else if(quete == "arche-alliance")
                            result = "Arche d'Alliance";
                        else if(quete == "atalante-fugitive")
                            result = "Atalante Fugitive";
                        else if(quete == "champs-polemoka")
                            result = "Champ Polemoka fugitive";
                        else if(quete == "cite-vertiges")
                            result = "Cité des Vertiges";
                        else if(quete == "exode-sideral")
                            result = "Exode sidéral";
                        else if(quete == "hyperborée")
                            result = "Hyperborée";
                        else if(quete == "jerusalem-celest")
                            result = "Jérusalem Céleste";
                        else if(quete == "sentier-or")
                            result = "Le Sentier d'Or";
                        else if(quete == "porte-noire")
                            result = "Porte Noire";
                        else if(quete == "graal")
                            result = "Quête du Graal";
                        else if(quete == "rex-mundi")
                            result = "Rex Mundi";
                        else if(quete == "table-emeraude")
                            result = "Table d'Émeraude";
                        else if(quete == "toison-or")
                            result = "Toison d'Or";
                        else if(quete == "tresor-templiers")
                            result = "Trésor des Templiers";

                        setAttrs({
                            ["repeating_quetes-eso_"+id+"_quete_eso"]: result
                        });
                    });

                });
            });

            getSectionIDs("repeating_savoir-eso", function(idarray)
            {
                _.each(idarray,function(id)
                {
                    getAttrs(["repeating_savoir-eso_"+id+"_savoir_eso"], function (v)
                    {
                        var savoir = v["repeating_savoir-eso_"+id+"_savoir_eso"];
                        var result;

                        if(savoir == "0")
                            result = "";
                        else if(savoir == "666")
                            result = "666";
                        else if(savoir == "akasha")
                            result = "Akasha";
                        else if(savoir == "ar-kaim")
                            result = "Ar-Kaim";
                        else if(savoir == "arcanes-majeur")
                            result = "Arcanes Majeurs";
                        else if(savoir == "bohemiens")
                            result = "Bohémiens";
                        else if(savoir == "champs-magiques")
                            result = "Champs Magiques";
                        else if(savoir == "cousins")
                            result = "Cousins";
                        else if(savoir == "drakaon")
                            result = "Drakaon";
                        else if(savoir == "effets-dragons")
                            result = "Effets-Dragons";
                        else if(savoir == "histoire-invisible")
                            result = "Histoire Invisible";
                        else if(savoir == "kaim")
                            result = "Kaim";
                        else if(savoir == "lune-noire")
                            result = "Lune Noire";
                        else if(savoir == "mystères")
                            result = "Mystères";
                        else if(savoir == "nephilim")
                            result = "Nephilim";
                        else if(savoir == "orichalque")
                            result = "Orichalque";
                        else if(savoir == "révélation")
                            result = "Révélation";
                        else if(savoir == "rose-croix")
                            result = "Rose+Croix";
                        else if(savoir == "sciences-occultes")
                            result = "Sciences Occultes";
                        else if(savoir == "selenim")
                            result = "Selenim";
                        else if(savoir == "synarchie")
                            result = "Synarchie";
                        else if(savoir == "templiers")
                            result = "Templiers";

                        setAttrs({
                            ["repeating_savoir-eso_"+id+"_savoir_eso"]: result
                        });
                    });

                });
            });

            setAttrs({
                ["version"]: "2"
            });
        }
    });
});

on("change:kafeu change:kalune sheet:opened", function()
{
    getAttrs([
    "kafeu", "kalune"
    ], function(values)
    {

        var kaFeu = parseInt(values["kafeu"], 10)||0;
        var kaLune = parseInt(values["kalune"], 10)||0;
        var bonusDom = 0;
        var voile = 0;

        if(kaFeu >= 5 && kaFeu < 10)
            bonusDom = 1;
        else if(kaFeu >= 10)
            bonusDom = 2;

        if(kaLune >= 5 && kaLune < 10)
            voile = 1;
        else if(kaLune >= 10)
            voile = 2;


        setAttrs({
            ["bonus-dom"]: bonusDom,
            ["voile"]: voile
        });
    });
});

on("change:cons-min change:cons-ser change:cons-gra change:cons-mag-min change:cons-mag-ser change:cons-mag-gra sheet:opened", function()
{
    getAttrs([
    "cons-min", "cons-ser", "cons-gra",
    "cons-mag-min", "cons-mag-ser", "cons-mag-gra"
    ], function(values)
    {
        const phyM = values["cons-min"];
        const phyS = values["cons-ser"];
        const phyG = values["cons-gra"];

        const magM = values["cons-mag-min"];
        const magS = values["cons-mag-ser"];
        const magG = values["cons-mag-gra"];

        var totalPhy = 0;
        var totalMag = 0;

        if(phyM == "on")
            totalPhy += 2;
        if(phyS == "on")
            totalPhy += 4;
        if(phyG == "on")
            totalPhy += 6;

        if(magM == "on")
            totalMag += 2;
        if(magS == "on")
            totalMag += 4;
        if(magG == "on")
            totalMag += 6;

        setAttrs({
            ["malusMag"]: totalMag,
            ["malusPhy"]: totalPhy
        });
    });
});