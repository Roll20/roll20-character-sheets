
/**
 * Updates half-skills on change
 */
on('change:athletisme change:autorite change:bagarre change:equitation change:volonte change:sk_griffe change:creation change:debrouille change:duperie change:furtivite change:vigilance change:sk_souffle change:intrigue change:negoce change:persuasion change:seduction change:strategie change:sk_sang change:erudition change:investigation change:medecine change:technique change:tir change:sk_ecaille', ev => {
    updateHalfSkill(ev.sourceAttribute)
})