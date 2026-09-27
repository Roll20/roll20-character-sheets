
/**
 * Says «hello» and then changes character's name
 * @param {event} ev 
 */
const editCharName = (ev) => {
    getAttrs(['charname', 'player'], v => {
        let display = v.player + ' - ' + v.charname;
        setAttrs({
            character_name: display,
            killhim_action: `%{${display}|killhim-action}`
        })
    })
}

on('change:charname change:player', ev => {
    editCharName(ev)
})
