on("change:class1_name change:class2_name change:class3_name "
    +"change:class1_lvl change:class2_lvl change:class3_lvl", () => {
    updateClassLevel();
    updateBAB();
    updateClassSaves();
});

on("change:class1_bab change:class2_bab change:class3_bab", () => {
   updateBAB();
});


on("change:class1_ref change:class2_ref change:class3_ref change:class1_vig change:class2_vig change:class3_vig"
    +" change:class1_vol change:class2_vol change:class3_vol", () => {
    updateClassSaves();
});

let updateClassLevel = () => {
    getAttrs(["class1_name","class2_name","class3_name","class1_lvl","class2_lvl","class3_lvl"], (attrs) => {
        let class1_name = attrs.class1_name;
        let class2_name = attrs.class2_name;
        let class3_name = attrs.class3_name;
        let class1_lvl = parseInt(attrs.class1_lvl) || 0;
        let class2_lvl = parseInt(attrs.class2_lvl) || 0;
        let class3_lvl = parseInt(attrs.class3_lvl) || 0;
        let class_level = "";
        if(class1_lvl){
            class_level = class1_name + " " + class1_lvl;
        }
        if(class2_lvl){
            class_level += (class_level.length? ", ":"") + class2_name+ " " +class2_lvl;
        }
        if(class3_lvl){
            class_level += (class_level.length? ", ":"") + class3_name+ " " +class3_lvl;
        }
        setAttrs({class_level:class_level});
    })
}

let updateBAB = () => {
    getAttrs(["class1_bab","class2_bab","class3_bab","class1_lvl","class2_lvl","class3_lvl"], (attrs) =>{
        let class1_bab = parseInt(attrs.class1_bab) || 0;
        let class2_bab = parseInt(attrs.class2_bab) || 0;
        let class3_bab = parseInt(attrs.class3_bab) || 0;
        let class1_lvl = parseInt(attrs.class1_lvl) || 0;
        let class2_lvl = parseInt(attrs.class2_lvl) || 0;
        let class3_lvl = parseInt(attrs.class3_lvl) || 0;
        let bab = 0;
        if(class1_lvl) bab+=class1_bab;
        if(class2_lvl) bab+=class2_bab;
        if(class3_lvl) bab+=class3_bab;
        setAttrs({bba:bab});
    });
}