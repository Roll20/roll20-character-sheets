// Github Steve Day:
// Github The Aaron:    https://github.com/shdwjk/Roll20API/blob/master/ZombieDice/ZombieDice.js
// By:                  The Aaron, Arcane Scriptomancer, Steve Day
// Update:              Steve Day: Updated graphics to show dice and show who rolled the dice
// Contact:             https://app.roll20.net/users/104025/the-aaron

var ZombieDice = ZombieDice || (function() {
    'use strict';

    var version = 0.4,

    getDiceCounts = function(msg,idx) {
        return ( msg.inlinerolls
            && msg.inlinerolls[idx]
            && msg.inlinerolls[idx].results
            && msg.inlinerolls[idx].results.rolls[0]
            && msg.inlinerolls[idx].results.rolls[0].results
            && (_.reduce(_.map(msg.inlinerolls[idx].results.rolls[0].results, function(r){
                return r.v;
            }).sort()  || [], function(m,r){
                m[r]=(m[r]||0)+1;
                return m;
            },{})));
    },

    getDiceArray = function(c) {
        return _.reduce(c,function(m,v,k){
            _.times(v,function(){m.push(k);});
            return m;
        },[]);
    },
    
    replaceArray = function(array, find, replace) {
        var replaceString = array;
        var regex; 
        for (var i = 0; i < find.length; i++) {
            regex = new RegExp(find[i], "g");
            replaceString = replaceString.replace(regex, replace[i]);
        }
        return replaceString;
    },
    
    useDiceFont = function(d_array, pos_neg) {
        
        //log(d_array);
        
        var find = ['1','2','3','4','5','6'];
        
        if (pos_neg == 'positive') {
            var replace = ['a','b','c','d','e','f'];  
        } else {
            var replace = ['A','B','C','D','E','F']; 
        }
        
        var d_string = replaceArray(d_array.join(' '), find, replace);
        
        return d_string;
    },
    
    handleInput = function(msg) {
        
        //log(msg);
        
        var args,
            w=false,
            t,
            p,pp,
            n,np,
            c={},
            s
            ;
        
        
        if (msg.type !== "api") {
            return;
        }
       

        args = msg.content.split(/\s+/);
        switch(args[0]) {
            case '!wzd':
                w=true;
                /* break; */ // Intentional drop through
            case '!zd':

                t = parseInt(args[1],10);
                p = getDiceCounts(msg,0);
                n = getDiceCounts(msg,1);

                pp = _.clone(p);
                np = _.clone(n);

                _.reduce(np,function(m,r,k,l){
                    var ps = m[k] || 0;
                    m[k] = Math.max(ps-r,0);
                    l[k] = Math.max(r-ps,0);
                    c[k] = ps-m[k];

                    if(!l[k]) {
                        delete l[k];
                    }
                    if(!m[k]) {
                        delete m[k];
                    }
                    if(!c[k]) {
                        delete c[k];
                    }
                    return m;
                },pp);

                p=getDiceArray(p);
                n=getDiceArray(n);
                pp=getDiceArray(pp);
                np=getDiceArray(np);
                c=getDiceArray(c);
               

                s = _.filter(pp,function(v){
                    return v<=t;
                });

                sendChat( msg.who , (w ? '/w gm ' : '/direct ')
                    +'<div>'
                        +'<div style="font-size:30px; color:#999; font-family: dicefontd6; line-height:30px">' //'Positive['+p.length+']: '
                            +'<span style="color:#444">'+ useDiceFont(pp,'positive') + '</span>'
                            +( (pp.length && c.length) ? ' | ' : '')
                            +( c.length ? ('<strike style=""><span>'+ useDiceFont(c,'positive') +'</span></strike>') : '' )
                        +'</div>'
                        + (n.length ? ('<div style="font-size:30px; color:#999; font-family: dicefontd6; line-height:30px">' //'Negative['+n.length+']: '
                            +'<span style="color:#be0101;">'+ useDiceFont(np,'negative') + '</span>'
                            +( (np.length && c.length) ? ' | ' : '')
                            + (c.length ? ('<strike style=""><span>'+ useDiceFont(c,'negative') +'</span></strike>') : '' )
                        +'</div>') : '')
                        +'<div>'
                            +'<div style="color:#fff; font-size:18px; margin-right:1px; text-align:center; padding-top:5px; height:40px; width:50px; float:left; background: #999"><div>'+t+'</div><div style="font-size:10px;">VS</div></div>'
                            +'<div style="color:#fff; font-size:18px; margin-right:1px; text-align:center; padding-top:'+(s.length ? '5px' : '15px' )+'; height:'+(s.length ? '40px' : '30px' )+'; width:50px; float:left; background: '+(s.length ? '#74951b' : '#be0101' )+ '">'+ (s.length ? '<div>'+s.length+'</div><div style="font-size:10px;">Success</div>' : '<div>Fail</div>') +'</div>'
                            +'<div style="color:#fff; font-size:18px; margin-right:1px; text-align:center; padding-top:5px; height:40px; width:50px; float:left; background: #be0101"><div>'+np.length+'</div><div style="font-size:10px;">Stress</div></div>'
                            +'<div style="clear: both"></div>'
                        +'</div>'
                    +'</div>');
                
                break;
        }
    },

    registerEventHandlers = function() {
        on('chat:message', handleInput);
    };

    return {
        RegisterEventHandlers: registerEventHandlers
    };
    
}());

on('ready',function() {
    'use strict';

    ZombieDice.RegisterEventHandlers();
});