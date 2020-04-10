on('ready', ()=>{
    const processInlinerolls = (msg,f=(a)=>a) => {
        if(_.has(msg,'inlinerolls')){
            return _.chain(msg.inlinerolls)
                .reduce(function(m,v,k){
                    let ti=_.reduce(v.results.rolls,function(m2,v2){
                        if(_.has(v2,'table')){
                            m2.push(_.reduce(v2.results,function(m3,v3){
                                m3.push(v3.tableItem.name);
                                return m3;
                            },[]).join(', '));
                        }
                        return m2;
                    },[]).join(', ');
                    m['$[['+k+']]']= (ti.length && ti) || v.results.total || 0;
                    return m;
                },{})
                .reduce(function(m,v,k){
                    return m.replace(k,f(v));
                },msg.content)
                .value();
        } else {
            return msg.content;
        }
    };

    const inlineRollIfNumeric = (v)=>{
        if(parseFloat(v)==v){
            return `[[${v}]]`;
        }
        return v;	  		 
    };

    on('chat:message', (msg) => {

        if ( 'api' === msg.type && /^!broll/i.test(msg.content) ) {


            let who = getObj('player',msg.playerid).get('_displayname');
																														 
            let msgTxt = processInlinerolls(msg,inlineRollIfNumeric);
            
            let msgWho = msg.who;
            let msgFormula = msgTxt.replace(/^!broll\s*/,'');

            if(_.has(msg,'rolltemplate')) {
                sendChat(msgWho,`/w gm &{template:${msg.rolltemplate}} ${msgTxt}`);
                sendChat(msgWho, `&{template:coc-dice-roll} {{name=**Jet Caché}} {{diceroll=Envoyé au Gardien (MJ)}}`);
																							 
            } else {
                sendChat(msgWho, `/gmroll ${msgFormula}`);
                sendChat(msgWho, `&{template:coc-dice-roll} {{name=**Jet Caché**}} {{diceroll=Envoyé au Gardien (MJ)}} (${msgFormula})`);
            }
        }
    });
});
