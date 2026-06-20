
/**
 * Makes some initializations !
 */
on('sheet:opened', ev => {
    // inits half skills for claw group
    updateHalfSkill('athletisme')
    updateHalfSkill('autorite')
    updateHalfSkill('bagarre')
    updateHalfSkill('equitation')
    updateHalfSkill('volonte')
    updateHalfSkill('sk_griffe')
    // inits half skills for blow group
    updateHalfSkill('creation')
    updateHalfSkill('debrouille')
    updateHalfSkill('duperie')
    updateHalfSkill('furtivite')
    updateHalfSkill('vigilance')
    updateHalfSkill('sk_souffle')
    // inits half skills for claw group
    updateHalfSkill('intrigue')
    updateHalfSkill('negoce')
    updateHalfSkill('persuasion')
    updateHalfSkill('seduction')
    updateHalfSkill('strategie')
    updateHalfSkill('sk_sang')
    // inits half skills for claw group
    updateHalfSkill('erudition')
    updateHalfSkill('investigation')
    updateHalfSkill('medecine')
    updateHalfSkill('technique')
    updateHalfSkill('tir')
    updateHalfSkill('sk_ecaille')

    setCursedArcana('arcane1')
    setCursedArcana('arcane2')

    // Here make the version magic
    setAttrs({
        'version': 1.0
    })
})