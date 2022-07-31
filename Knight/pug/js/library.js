/* eslint-disable no-global-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* ---- BEGIN: TheAaronSheet.js ---- */
// Github:   https://github.com/shdwjk/TheAaronSheet/blob/master/TheAaronSheet.js
// By:       The Aaron, Arcane Scriptomancer
// Contact:  https://app.roll20.net/users/104025/the-aaron

var TAS = TAS || (function(){
'use strict';

var version = '0.2.4',
    lastUpdate = 1457098091,

    loggingSettings = {
        debug: {
            key:     'debug',
            title:   'DEBUG',
            color: {
                bgLabel: '#7732A2',
                label:   '#F2EF40',
                bgText:  '#FFFEB7',
                text:    '#7732A2'
            }
        },
        error: {
            key:     'error',
            title:   'Error',
            color: {
                bgLabel: '#C11713',
                label:   'white',
                bgText:  '#C11713',
                text:    'white'
            }
        },
        warn: {
            key:     'warn',
            title:   'Warning',
            color: {
                bgLabel: '#F29140',
                label:   'white',
                bgText:  '#FFD8B7',
                text:    'black'
            }
        },
        info: {
            key:     'info',
            title:   'Info',
            color: {
                bgLabel: '#413FA9',
                label:   'white',
                bgText:  '#B3B2EB',
                text:    'black'
            }
        },
        notice: {
            key:     'notice',
            title:   'Notice',
            color: {
                bgLabel: '#33C133',
                label:   'white',
                bgText:  '#ADF1AD',
                text:    'black'
            }
        },
        log: {
            key:     'log',
            title:   'Log',
            color: {
                bgLabel: '#f2f240',
                label:   'black',
                bgText:  '#ffff90',
                text:    'black'
            }
        },
        callstack: {
            key:     'TAS',
            title:   'function',
            color: {
                bgLabel: '#413FA9',
                label:   'white',
                bgText:  '#B3B2EB',
                text:    'black'
            }
        },
        callstack_async: {
            key:     'TAS',
            title:   'ASYNC CALL',
            color: {
                bgLabel: '#413FA9',
                label:   'white',
                bgText:  '#413FA9',
                text:    'white'
            }
        },
        TAS: {
            key:     'TAS',
            title:   'TAS',
            color: {
                bgLabel: 'grey',
                label:   'black;background:linear-gradient(#304352,#d7d2cc,#d7d2cc,#d7d2cc,#304352)',
                bgText:  'grey',
                text:    'black;background:linear-gradient(#304352,#d7d2cc,#d7d2cc,#d7d2cc,#304352)'
            }
        }
    },


    config = {
        debugMode: false,
        logging: {
            log: true,
            notice: true,
            info: true,
            warn: true,
            error: true,
            debug: false
        }
    },

    callstackRegistry = [],
    queuedUpdates = {}, //< Used for delaying saves till the last momment.

complexType = function(o){
    switch(typeof o){
        case 'string':
            return 'string';
        case 'boolean':
            return 'boolean';
        case 'number':
            return (_.isNaN(o) ? 'NaN' : (o.toString().match(/\./) ? 'decimal' : 'integer'));
        case 'function':
            return 'function: '+(o.name ? o.name+'()' : '(anonymous)');
        case 'object':
            return (_.isArray(o) ? 'array' : (_.isArguments(o) ? 'arguments' : ( _.isNull(o) ? 'null' : 'object')));
        default:
            return typeof o;
    }
},

dataLogger = function(primaryLogger,secondaryLogger,data){
    _.each(data,function(m){
        var type = complexType(m);
        switch(type){
            case 'string':
                primaryLogger(m);
                break;
            case 'undefined':
            case 'null':
            case 'NaN':
                primaryLogger('['+type+']');
                break;
            case 'number':
            case 'not a number':
            case 'integer':
            case 'decimal':
            case 'boolean':
                primaryLogger('['+type+']: '+m);
                break;
            default:
                primaryLogger('['+type+']:=========================================');
                secondaryLogger(m);
                primaryLogger('=========================================================');
                break;
        }
    });
},


colorLog = function(options){
    var coloredLoggerFunction,
        key = options.key,
        label = options.title || 'TAS',
        lBGColor = (options.color && options.color.bgLabel) || 'blue',
        lTxtColor = (options.color && options.color.label) || 'white',
        mBGColor = (options.color && options.color.bgText) || 'blue',
        mTxtColor = (options.color && options.color.text) || 'white';

    coloredLoggerFunction = function(message){
        console.log(
            '%c '+label+': %c '+message + ' ',
            'background-color: '+lBGColor+';color: '+lTxtColor+'; font-weight:bold;',
            'background-color: '+mBGColor+';color: '+mTxtColor+';'
        ); 
    };
    return function(){
        if('TAS'===key || config.logging[key]){
            dataLogger(coloredLoggerFunction,function(m){console.log(m);},_.toArray(arguments)); 
        }
    };
},

logDebug  = colorLog(loggingSettings.debug),
logError  = colorLog(loggingSettings.error),
logWarn   = colorLog(loggingSettings.warn),
logInfo   = colorLog(loggingSettings.info),
logNotice = colorLog(loggingSettings.notice),
logLog    = colorLog(loggingSettings.log),
log       = colorLog(loggingSettings.TAS),
logCS     = colorLog(loggingSettings.callstack),
logCSA    = colorLog(loggingSettings.callstack_async),

registerCallstack = function(callstack,label){
    var idx=_.findIndex(callstackRegistry,function(o){
        return (_.difference(o.stack,callstack).length === _.difference(callstack,o.stack).length) &&
            _.difference(o.stack,callstack).length === 0 &&
            o.label === label;
    });
    if(-1 === idx){
        idx=callstackRegistry.length;
        callstackRegistry.push({
            stack: callstack,
            label: label
        });
    }
    return idx;
},

setConfigOption = function(options){
    var newconf =_.defaults(options,config);
    newconf.logging=_.defaults(
        (options && options.logging)||{},
        config.logging
    );
    config=newconf;
},

debugMode = function(){
    config.logging.debug=true;
    config.debugMode = true;
},

getCallstack = function(){
    var e = new Error('dummy'),
        // eslint-disable-next-line no-useless-escape
        stack = _.map(_.rest(e.stack.replace(/^[^\(]+?[\n$]/gm, '')
        .replace(/^\s+at\s+/gm, '')
        .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
        .split('\n')),function(l){
            return l.replace(/\s+.*$/,'');
        });
    return stack;
},
logCallstackSub = function(cs){
    var matches, csa;
    _.find(cs,function(line){
        matches = line.match(/TAS_CALLSTACK_(\d+)/);
        if(matches){
            csa=callstackRegistry[matches[1]];
            logCSA( '===================='+(csa.label ? '> '+csa.label+' <' : '')+'====================');
            logCallstackSub(csa.stack);
            return true;
        } 
        logCS(line);
        return false;
    });
},
logCallstack = function(){
    var cs;
    if(config.debugMode){
        cs = getCallstack();
        cs.shift();
        log('==============================> CALLSTACK <==============================');
        logCallstackSub(cs);
        log('=========================================================================');
    }
},


wrapCallback = function (label, callback, context){
    var callstack;
    if('function' === typeof label){
        context=callback;
        callback=label;
        label=undefined;
    }
    if(!config.debugMode){
        return (function(cb,ctx){
            return function(){
                cb.apply(ctx||{},arguments);
            };
        }(callback,context));
    }
    
    callstack = getCallstack();
    callstack.shift();
    
    return (function(cb,ctx,cs,lbl){
        var ctxref=registerCallstack(cs,lbl);

        /*jshint -W054 */
        return new Function('cb','ctx','TASlog',
            "return function TAS_CALLSTACK_"+ctxref+"(){"+
                "TASlog('Entering: '+(cb.name||'(anonymous function)'));"+
                "cb.apply(ctx||{},arguments);"+
                "TASlog('Exiting: '+(cb.name||'(anonymous function)'));"+
            "};")(cb,ctx,log);
        /*jshint +W054 */
    }(callback,context,callstack,label));
},


prepareUpdate = function( attribute, value ){
    queuedUpdates[attribute]=value;
},

applyQueuedUpdates = function() {
    setAttrs(queuedUpdates);
    queuedUpdates = {};
},

namesFromArgs = function(args,base){
    return _.chain(args)
        .reduce(function(memo,attr){
            if('string' === typeof attr) {
                memo.push(attr);
            } else if(_.isArray(args) || _.isArguments(args)){
                memo = namesFromArgs(attr,memo);
            }
            return memo;
        },(_.isArray(base) && base) || [])
        .uniq()
        .value();
},

addId = function(obj,value){
    Object.defineProperty(obj,'id',{
        value: value,
        writeable: false,
        enumerable: false
    });
},

addProp = function(obj,prop,value,fullname){
    (function(){
        var pname=(_.contains(['S','F','I','D'],prop) ? '_'+prop : prop),
            full_pname = fullname || prop,
            pvalue=value;

        _.each(['S','I','F'],function(p){
            if( !_.has(obj,p)){
                Object.defineProperty(obj, p, {
                    value: {},
                    enumerable: false,
                    readonly: true
                });
            }
        });
        if( !_.has(obj,'D')){
            Object.defineProperty(obj, 'D', {
                value: _.reduce(_.range(10),function(m,d){
                        Object.defineProperty(m, d, {
                            value: {},
                            enumerable: true,
                            readonly: true
                        });
                        return m;
                    },{}),
                enumerable: false,
                readonly: true
            });
        }


        // Raw value
        Object.defineProperty(obj, pname, {
            enumerable: true,
            set: function(v){
                if(v!==pvalue) {
                    pvalue=v;
                    prepareUpdate(full_pname,v);
                }
            },
            get: function(){
                return pvalue;
            }
        });
        
        // string value
        Object.defineProperty(obj.S, pname, {
            enumerable: true,
            set: function(v){
                var val=v.toString();
                if(val !== pvalue) {
                    pvalue=val;
                    prepareUpdate(full_pname,val);
                }
            },
            get: function(){
                return pvalue.toString();
            }
        });

        // int value
        Object.defineProperty(obj.I, pname, {
            enumerable: true,
            set: function(v){
                var val=parseInt(v,10) || 0;
                if(val !== pvalue){
                    pvalue=val;
                    prepareUpdate(full_pname,val);
                }
            },
            get: function(){
                return parseInt(pvalue,10) || 0;
            }
        });

        // float value
        Object.defineProperty(obj.F, pname, {
            enumerable: true,
            set: function(v){
                var val=parseFloat(v) || 0;
                if(val !== pvalue) {
                    pvalue=val;
                    prepareUpdate(full_pname,val);
                }
            },
            get: function(){
                return parseFloat(pvalue) || 0;
            }
        });
        _.each(_.range(10),function(d){
            Object.defineProperty(obj.D[d], pname, {
                enumerable: true,
                set: function(v){
                    var val=(parseFloat(v) || 0).toFixed(d);
                    if(val !== pvalue){
                        pvalue=val;
                        prepareUpdate(full_pname,val);
                    }
                },
                get: function(){
                    return (parseFloat(pvalue) || 0).toFixed(d);
                }
            });
        });

    }());
},

repeating = function( section ) {
    return (function(s){
        var sectionName = s,
            attrNames = [],
            fieldNames = [],
            operations = [],
            after = [],
        
        repAttrs = function TAS_Repeating_Attrs(){
            attrNames = namesFromArgs(arguments,attrNames);
            return this;
        },
        repFields = function TAS_Repeating_Fields(){
            fieldNames = namesFromArgs(arguments,fieldNames);
            return this;
        },
        repReduce = function TAS_Repeating_Reduce(func, initial, final, context) { 
            operations.push({
                type: 'reduce',
                func: (func && _.isFunction(func) && func) || _.noop,
                memo: (_.isUndefined(initial) && 0) || initial,
                final: (final && _.isFunction(final) && final) || _.noop,
                context: context || {}
            });
            return this;
        },
        repMap = function TAS_Repeating_Map(func, final, context) {
            operations.push({
                type: 'map',
                func: (func && _.isFunction(func) && func) || _.noop,
                final: (final && _.isFunction(final) && final) || _.noop,
                context: context || {}
            });
            return this;
        },
        repEach = function TAS_Repeating_Each(func, final, context) {
            operations.push({
                type: 'each',
                func: (func && _.isFunction(func) && func) || _.noop,
                final: (final && _.isFunction(final) && final) || _.noop,
                context: context || {}
            });
            return this;
        },
        repTap = function TAS_Repeating_Tap(final, context) {
            operations.push({
                type: 'tap',
                final: (final && _.isFunction(final) && final) || _.noop,
                context: context || {}
            });
            return this;
        },
        repAfter = function TAS_Repeating_After(callback,context) {
            after.push({
                callback: (callback && _.isFunction(callback) && callback) || _.noop,
                context: context || {}
            });
            return this;
        },
        repExecute = function TAS_Repeating_Execute(callback,context){
            var rowSet = {},
                attrSet = {},
                fieldIds = [],
                fullFieldNames = [];

            repAfter(callback,context);

            // call each operation per row.
            // call each operation's final
            getSectionIDs("repeating_"+sectionName,function(ids){
                fieldIds = ids;
                fullFieldNames = _.reduce(fieldIds,function(memo,id){
                    return memo.concat(_.map(fieldNames,function(name){
                        return 'repeating_'+sectionName+'_'+id+'_'+name;  
                    }));
                },[]);
                getAttrs( _.uniq(attrNames.concat(fullFieldNames)), function(values){
                    _.each(attrNames,function(aname){
                        if(values.hasOwnProperty(aname)){
                            addProp(attrSet,aname,values[aname]);
                        }
                    });

                    rowSet = _.reduce(fieldIds,function(memo,id){
                        var r={};
                        addId(r,id);
                        _.each(fieldNames,function(name){
                            var fn = 'repeating_'+sectionName+'_'+id+'_'+name;  
                            addProp(r,name,values[fn],fn);
                        });

                        memo[id]=r;

                        return memo;
                    },{});

                    _.each(operations,function(op){
                        var res;
                        switch(op.type){
                            case 'tap':
                                _.bind(op.final,op.context,rowSet,attrSet)();
                                break;

                            case 'each':
                                _.each(rowSet,function(r){
                                    _.bind(op.func,op.context,r,attrSet,r.id,rowSet)();
                                });
                                _.bind(op.final,op.context,rowSet,attrSet)();
                                break;

                            case 'map':
                                res = _.map(rowSet,function(r){
                                    return _.bind(op.func,op.context,r,attrSet,r.id,rowSet)();
                                });
                                _.bind(op.final,op.context,res,rowSet,attrSet)();
                                break;

                            case 'reduce':
                                res = op.memo;
                                _.each(rowSet,function(r){
                                    res = _.bind(op.func,op.context,res,r,attrSet,r.id,rowSet)();
                                });
                                _.bind(op.final,op.context,res,rowSet,attrSet)();
                                break;
                        }
                    });

                    // finalize attrs
                    applyQueuedUpdates();
                    _.each(after,function(op){
                        _.bind(op.callback,op.context)();
                    });
                });
            });
        };
            
        return {
            attrs: repAttrs,
            attr: repAttrs,

            column: repFields,
            columns: repFields,
            field: repFields,
            fields: repFields,

            reduce: repReduce,
            inject: repReduce,
            foldl: repReduce,

            map: repMap,
            collect: repMap,

            each: repEach,
            forEach: repEach,

            tap: repTap,
            'do': repTap,

            after: repAfter,
            last: repAfter,
            done: repAfter,

            execute: repExecute,
            go: repExecute,
            run: repExecute
        };
    }(section));
},


repeatingSimpleSum = function(section, field, destination){
    repeating(section)
        .attr(destination)
        .field(field)
        .reduce(function(m,r){
            return m + (r.F[field]);
        },0,function(t,r,a){
            a.S[destination]=t;
        })
        .execute();
};

console.log('%c•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸  The Aaron Sheet  v'+version+'  ¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•','background: linear-gradient(to right,green,white,white,green); color:black;text-shadow: 0 0 8px white;');
console.log('%c•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸  Last update: '+(new Date(lastUpdate*1000))+'  ¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•','background: linear-gradient(to right,green,white,white,green); color:black;text-shadow: 0 0 8px white;');


return {
    /* Repeating Sections */
    repeatingSimpleSum: repeatingSimpleSum,
    repeating: repeating,

    /* Configuration */
    config: setConfigOption,

    /* Debugging */
    callback: wrapCallback,
    callstack: logCallstack,
    debugMode: debugMode,
    _fn: wrapCallback,

    /* Logging */
    debug: logDebug,
    error: logError,
    warn: logWarn,
    info: logInfo,
    notice: logNotice,
    log: logLog
};
}());

/* ---- END: TheAaronSheet.js ---- */


const i18n_deplacement = getTranslationByKey("deplacement"),
    i18n_force = getTranslationByKey("force"),
    i18n_endurance = getTranslationByKey("endurance"),
    i18n_hargne = getTranslationByKey("hargne"),
    i18n_combat = getTranslationByKey("combat"),
    i18n_instinct = getTranslationByKey("instinct"),
    i18n_tir = getTranslationByKey("tir"),
    i18n_savoir = getTranslationByKey("savoir"),
    i18n_technique = getTranslationByKey("technique"),
    i18n_aura = getTranslationByKey("aura"),
    i18n_parole = getTranslationByKey("parole"),
    i18n_sangFroid = getTranslationByKey("sang-froid"),
    i18n_discretion = getTranslationByKey("discretion"),
    i18n_dexterite = getTranslationByKey("dexterite"),
    i18n_perception = getTranslationByKey("perception"),
    i18n_chair = getTranslationByKey("chair"),
    i18n_bete = getTranslationByKey("bete"),
    i18n_machine = getTranslationByKey("machine"),
    i18n_dame = getTranslationByKey("dame"),
    i18n_masque = getTranslationByKey("masque"),
    i18n_od = getTranslationByKey("od"),
    i18n_exploit = getTranslationByKey("exploit"),
    i18n_couteauService = getTranslationByKey("couteau-de-service"),
    i18n_marteauEpieuC = getTranslationByKey("marteau-epieu-contact"),
    i18n_pistoletService = getTranslationByKey("pistolet-de-service"),
    i18n_marteauEpieuD = getTranslationByKey("marteau-epieu-distance"),
    i18n_coupPoing = getTranslationByKey("coup-poing-pied"),
    i18n_energieRetiree = getTranslationByKey("energie-retiree"),
    i18n_espoirRetire = getTranslationByKey("espoir-retire"),
    i18n_pasEnergie = getTranslationByKey("pas-assez-energie"),
    i18n_plusEnergie = getTranslationByKey("panne-energie"),
    i18n_pasEspoir = getTranslationByKey("pas-assez-espoir"),
    i18n_plusEspoir = getTranslationByKey("panne-espoir"),
    i18n_typeSoldier = getTranslationByKey("warrior-type-soldier"),
    i18n_typeHunter = getTranslationByKey("warrior-type-hunter"),
    i18n_typeScholar = getTranslationByKey("warrior-type-scholar"),
    i18n_typeHerald = getTranslationByKey("warrior-type-herald"),
    i18n_typeScout = getTranslationByKey("warrior-type-scout"),
    i18n_ghost = getTranslationByKey("mode-ghost"),
    i18n_ghostActive = getTranslationByKey("mode-ghost-active"),
    i18n_changelingActive = getTranslationByKey("mode-changeling-active"),
    i18n_impregnation = getTranslationByKey("shaman-impregnation"),
    i18n_portee = getTranslationByKey("portee"),
    i18n_chocAutomatique = getTranslationByKey("choc-automatique-si-chair"),     
    i18n_tour = getTranslationByKey("tour"),
    i18n_tours = getTranslationByKey("tours"),
    i18n_affecteAnatheme = getTranslationByKey("wizard-affecte-uniquement-anatheme"),
    i18n_style = getTranslationByKey("style"),
    i18n_standard = getTranslationByKey("standard"),
    i18n_couvert = getTranslationByKey("couvert"),
    i18n_agressif = getTranslationByKey("agressif"),
    i18n_akimbo = getTranslationByKey("akimbo"),
    i18n_ambidextre = getTranslationByKey("ambidextre"),
    i18n_ambidextrie = getTranslationByKey("ambidextrie"),
    i18n_defensif = getTranslationByKey("defensif"),
    i18n_pilonnage = getTranslationByKey("pilonnage"),
    i18n_puissant = getTranslationByKey("puissant"),
    i18n_suppression = getTranslationByKey("suppression"),
    i18n_precis = getTranslationByKey("precis"),   
    i18n_anatheme = getTranslationByKey("anatheme"),    
    i18n_antiAnatheme = getTranslationByKey("anti-anatheme"),    
    i18n_antiAnathemeCondition = getTranslationByKey("anti-anatheme-condition"),
    i18n_antiVehicule = getTranslationByKey("anti-vehicule"),
    i18n_artillerie = getTranslationByKey("artillerie"),
    i18n_artillerieCondition = getTranslationByKey("artillerie-condition"),
    i18n_assistanceAttaque = getTranslationByKey("assistance-attaque"),
    i18n_assistanceAttaqueCondition = getTranslationByKey("assistance-attaque-condition"),
    i18n_assassin = getTranslationByKey("assassin"),
    i18n_barrage = getTranslationByKey("barrage"),
    i18n_cadence = getTranslationByKey("cadence"),
    i18n_chargeur = getTranslationByKey("chargeur"),
    i18n_choc = getTranslationByKey("choc"),
    i18n_chocCondition = getTranslationByKey("choc-condition"),
    i18n_degatsContinus = getTranslationByKey("degats-continus"),
    i18n_defense = getTranslationByKey("defense"),
    i18n_deuxMains = getTranslationByKey("deux-mains"),
    i18n_demoralisant = getTranslationByKey("demoralisant"),
    i18n_demoralisantCondition = getTranslationByKey("demoralisant-condition"),
    i18n_designation = getTranslationByKey("designation"),
    i18n_destructeur = getTranslationByKey("destructeur"),
    i18n_destructeurCondition = getTranslationByKey("destructeur-condition"),
    i18n_dispersion = getTranslationByKey("dispersion"),
    i18n_enChaine = getTranslationByKey("en-chaine"),
    i18n_enChaineCondition = getTranslationByKey("en-chaine-condition"),
    i18n_esperance = getTranslationByKey("esperance"),
    i18n_esperanceConditionD = getTranslationByKey("esperance-conditionD"),
    i18n_esperanceConditionV = getTranslationByKey("esperance-conditionV"),
    i18n_fureur = getTranslationByKey("fureur"),
    i18n_fureurCondition = getTranslationByKey("fureur-condition"),
    i18n_ignoreArmure = getTranslationByKey("ignore-armure"),
    i18n_ignoreCDF = getTranslationByKey("ignore-champ-de-force"),
    i18n_jAkimbo = getTranslationByKey("jumele-akimbo"),
    i18n_jAmbidextrie = getTranslationByKey("jumele-ambidextrie"),
    i18n_leste = getTranslationByKey("leste"),
    i18n_lourd = getTranslationByKey("lourd"),
    i18n_lumiere = getTranslationByKey("lumiere"),
    i18n_meurtrier = getTranslationByKey("meurtrier"),
    i18n_meurtrierCondition = getTranslationByKey("meurtrier-condition"),
    i18n_obliteration = getTranslationByKey("obliteration"),
    i18n_obliterationCondition = getTranslationByKey("obliteration-condition"),
    i18n_orfevrerie = getTranslationByKey("orfevrerie"),
    i18n_parasitage = getTranslationByKey("parasitage"),
    i18n_parasitageCondition = getTranslationByKey("parasitage-condition"),
    i18n_perceArmure = getTranslationByKey("perce-armure"),
    i18n_penetrant = getTranslationByKey("penetrant"),
    i18n_precision = getTranslationByKey("precision"),
    i18n_reaction = getTranslationByKey("reaction"),
    i18n_silencieux = getTranslationByKey("silencieux"),
    i18n_soumission = getTranslationByKey("soumission"),
    i18n_soumissionCondition = getTranslationByKey("soumission-condition"),
    i18n_tenebricide = getTranslationByKey("tenebricide"),
    i18n_tenebricideConditionD = getTranslationByKey("tenebricide-conditionD"),
    i18n_tenebricideConditionV = getTranslationByKey("tenebricide-conditionV"),
    i18n_tirRafale = getTranslationByKey("tir-rafale"),
    i18n_tirRafaleCondition = getTranslationByKey("tir-rafale-condition"),
    i18n_tirSecurite = getTranslationByKey("tir-securite"),
    i18n_canonLong = getTranslationByKey("canon-long"),
    i18n_canonLongCondition = getTranslationByKey("canon-long-condition"),
    i18n_canonRaccourci = getTranslationByKey("canon-raccourci"),
    i18n_canonRaccourciCondition = getTranslationByKey("canon-raccourci-condition"),
    i18n_chambreDouble = getTranslationByKey("chambre-double"),
    i18n_interfaceGuidage = getTranslationByKey("interface-guidage"),
    i18n_jumelage = getTranslationByKey("jumelage"),
    i18n_lunetteIntelligente = getTranslationByKey("lunette-intelligente"),
    i18n_lunetteIntelligenteCondition = getTranslationByKey("lunette-intelligente-condition"),
    i18n_munitionsHyperVelocite = getTranslationByKey("munitions-hyper-velocite"),
    i18n_munitionsIEMParasitage = getTranslationByKey("munitions-iem-parasitage"),
    i18n_munitionsNonLetales = getTranslationByKey("munitions-non-letales"),
    i18n_munitionsSubsoniques = getTranslationByKey("munitions-subsoniques"),
    i18n_protectionArme = getTranslationByKey("protection-d'arme"),
    i18n_revetementOmega = getTranslationByKey("revetement-omega"),
    i18n_systemeRefroidissement = getTranslationByKey("systeme-refroidissement"),
    i18n_ultraviolence = getTranslationByKey("ultraviolence"),
    i18n_ultraviolenceCondition = getTranslationByKey("ultraviolence-condition"),
    i18n_attaqueSurpriseCondition = getTranslationByKey("attaque-surprise-condition"),
    i18n_structureElementAlpha = getTranslationByKey("structure-element-alpha"),
    i18n_agressive = getTranslationByKey("agressive"),
    i18n_assassine = getTranslationByKey("assassine"),
    i18n_barbelee = getTranslationByKey("barbelee"),
    i18n_connectee = getTranslationByKey("connectee"),
    i18n_electrifiee = getTranslationByKey("electrifiee"),
    i18n_indestructible = getTranslationByKey("indestructible"),
    i18n_jumelle = getTranslationByKey("jumelle"),
    i18n_lumineuse = getTranslationByKey("lumineuse"),
    i18n_massive = getTranslationByKey("massive"),
    i18n_protectrice = getTranslationByKey("protectrice"),
    i18n_soeur = getTranslationByKey("soeur"),
    i18n_sournoise = getTranslationByKey("sournoise"),
    i18n_arabesques = getTranslationByKey("arabesques-iridescentes"),
    i18n_armeAzurine = getTranslationByKey("arme-azurine"),
    i18n_armeAzurineCondition = getTranslationByKey("arme-azurine-condition"),
    i18n_armeRougeSang = getTranslationByKey("arme-rouge-sang"),
    i18n_armeRougeSangCondition = getTranslationByKey("arme-rouge-sang-condition"),
    i18n_armureGravee = getTranslationByKey("armure-gravee"),
    i18n_blasonChevalier = getTranslationByKey("blason-chevalier"),
    i18n_bouclierGrave = getTranslationByKey("bouclier-grave"),
    i18n_cheneSculpte = getTranslationByKey("chene-sculpte"),
    i18n_cheneSculpteCondition = getTranslationByKey("chene-sculpte-condition"),
    i18n_chromee = getTranslationByKey("chromee"),
    i18n_codeKnight = getTranslationByKey("code-knight-grave"),
    i18n_craneRieur = getTranslationByKey("crane-rieur-grave"),
    i18n_fauconPlumesL = getTranslationByKey("faucon-plumes"),
    i18n_griffuresGravees = getTranslationByKey("griffures-gravees"),
    i18n_griffuresGraveesCondition = getTranslationByKey("griffures-gravees-condition"),
    i18n_masqueBrise = getTranslationByKey("masque-brise-sculpte"),
    i18n_masqueBriseCondition = getTranslationByKey("masque-brise-sculpte-condition"),
    i18n_rouagesCasses = getTranslationByKey("rouages-casses"),
    i18n_rouagesCassesCondition = getTranslationByKey("rouages-casses-graves-condition"),
    i18n_odDiscretion = getTranslationByKey("bonus-od-discretion"),
    i18n_inclus = getTranslationByKey("inclus"),
    i18n_contreCoupsDechirureT = getTranslationByKey("contrecoups-dechirure"),
    i18n_contreCoupsDechirureV = getTranslationByKey("contrecoups-dechirure-description"),
    i18n_contreCoupsDisparitionT = getTranslationByKey("contrecoups-disparition"),
    i18n_contreCoupsDisparitionV = getTranslationByKey("contrecoups-disparition-description"),
    i18n_contreCoupsIncidentT = getTranslationByKey("contrecoups-incident"),
    i18n_contreCoupsIncidentV1 = getTranslationByKey("contrecoups-incident-description-1"),
    i18n_contreCoupsIncidentV2 = getTranslationByKey("contrecoups-incident-description-2"),
    i18n_contreCoupsSiphonT = getTranslationByKey("contrecoups-siphon"),
    i18n_contreCoupsSiphonV1 = getTranslationByKey("contrecoups-siphon-description-1"),
    i18n_contreCoupsSiphonV2 = getTranslationByKey("contrecoups-siphon-description-2"),
    i18n_contreCoupsSursautT = getTranslationByKey("contrecoups-sursaut"),
    i18n_contreCoupsSursautV1 = getTranslationByKey("contrecoups-sursaut-description-1"),
    i18n_contreCoupsSursautV2 = getTranslationByKey("contrecoups-sursaut-description-2"),
    i18n_contreCoupsFragmentationT = getTranslationByKey("contrecoups-fragmentation"),
    i18n_contreCoupsFragmentationV1 = getTranslationByKey("contrecoups-fragmentation-description-1"),
    i18n_contreCoupsFragmentationV2 = getTranslationByKey("contrecoups-fragmentation-description-2"),
    i18n_contreCoupsDesorientationT = getTranslationByKey("contrecoups-desorientation"),
    i18n_contreCoupsDesorientationV1 = getTranslationByKey("contrecoups-desorientation-description-1"),
    i18n_contreCoupsDesorientationV2 = getTranslationByKey("contrecoups-desorientation-description-2"),
    i18n_contreCoupsDesagregationT = getTranslationByKey("contrecoups-desagregation"),
    i18n_contreCoupsDesagregationV1 = getTranslationByKey("contrecoups-desagregation-description-1"),
    i18n_contreCoupsDesagregationV2 = getTranslationByKey("contrecoups-desagregation-description-2"),
    i18n_contreCoupsDefaillanceT = getTranslationByKey("contrecoups-defaillance"),
    i18n_contreCoupsDefaillanceV1 = getTranslationByKey("contrecoups-defaillance-description-1"),
    i18n_contreCoupsDefaillanceV2 = getTranslationByKey("contrecoups-defaillance-description-2"),
    i18n_surVehicule = getTranslationByKey("sur-vehicule"),
    i18n_resilienceRepare = getTranslationByKey("resilience-repare"),
    i18n_blindageRepare = getTranslationByKey("blindage-repare"),
    i18n_briserResilience = getTranslationByKey("briser-resilience"),
    i18n_poingsSoniques = getTranslationByKey("poings-soniques-effets"),
    i18n_lameCinetique = getTranslationByKey("lames-cinetiques-geantes-effets"),
    i18n_attaquesOmbres = getTranslationByKey("capacite-fan-made-Attaque-dans-les-ombres"),
    i18n_porteeMoyenne = getTranslationByKey("portee-moyenne"),
    i18n_porteeCourte = getTranslationByKey("portee-courte"),
    i18n_devasterAnatheme = getTranslationByKey("devaster-anatheme"),
    i18n_bourreauTenebres = getTranslationByKey("bourreau-tenebres"),
    i18n_equilibrerBalance = getTranslationByKey("equilibrer-balance")
    ;

function maxCar(carac, score, aspect)
{
    if(score > aspect)
    {
        setAttrs({
            [carac]: aspect
        });
    }
}

function totalADruid(attrs, aspect) {
    let base = +attrs[`${aspect}Base`];
    let evol = +attrs[`${aspect}Evol`];

    return base+evol;
}

function totalAspect(attrs, aspect) {
    let min = +attrs[`${aspect}PNJAE`];
    let maj = +attrs[`${aspect}PNJAEMaj`];

    return min+maj;
}

function setPanneauInformation(texte, reset = false, slot = false, energie = false)
{	
    getAttrs(["panneauInformation", "nomIA", "fichePNJ"], function(value)
    {
        const TFiche = value["fichePNJ"];
        const PI = value["panneauInformation"];
        var IA = value["nomIA"];
        
        if(TFiche == 1)
            IA = "ALERTE : ";
        
        if(PI == "" || reset == true)
        {
            if(IA == "" && TFiche == 0)
            {
                setAttrs({
                    panneauInformation: "IA : "+texte+" "
                });
            }
            else
            {
                setAttrs({
                    panneauInformation: IA+" : "+texte+" "
                });
            }
        }
        else
        {
            setAttrs({
                panneauInformation: PI+texte+" "
            });
        }
    });
    
    if(reset == true && slot == false)
        PI["msgSlot"] = 0;
    
    if(slot == true)
        PI["msgSlot"] = 1;
        
    if(energie == true)
        PI["msgEnergie"] = 1;
}

function resetPanneauInformation()
{
    
    setAttrs({
        panneauInformation: ""
    });
        
    PI["msgSlot"] = 0;
    
    PI["msgEnergie"] = 0;
}

function setActiveCharacterId(charId){
    var oldAcid=getActiveCharacterId();
    var ev = new CustomEvent("message");
    ev.data={"id":"0", "type":"setActiveCharacter", "data":charId};
    self.dispatchEvent(ev); 
    return oldAcid;
}

var _sIn=setInterval;
setInterval=function(callback, timeout){
    var acid=getActiveCharacterId();
    _sIn(
        function(){
            var prevAcid=setActiveCharacterId(acid);
            callback();
            setActiveCharacterId(prevAcid);
        }
    ,timeout);
}

var _sto=setTimeout
setTimeout=function(callback, timeout){
    var acid=getActiveCharacterId();
    _sto(
        function(){
            var prevAcid=setActiveCharacterId(acid);
            callback();
            setActiveCharacterId(prevAcid);
        }
    ,timeout);
}

function getAttrsAsync(props){
    var acid=getActiveCharacterId(); //save the current activeCharacterID in case it has changed when the promise runs 
    var prevAcid=null;               //local variable defined here, because it needs to be shared across the promise callbacks defined below
    return new Promise((resolve,reject)=>{
            prevAcid=setActiveCharacterId(acid);  //in case the activeCharacterId has changed, restore it to what we were expecting and save the current value to restore later
            try{
                getAttrs(props,(values)=>{  resolve(values); }); 
            }
            catch{ reject(); }
    }).finally(()=>{
        setActiveCharacterId(prevAcid); //restore activeCharcterId to what it was when the promise first ran
    });
}

//use the same pattern for each of the following...
function setAttrsAsync(propObj, options){
    var acid=getActiveCharacterId(); 
    var prevAcid=null;               
    return new Promise((resolve,reject)=>{
            prevAcid=setActiveCharacterId(acid);  
            try{
                setAttrs(propObj,options,(values)=>{ resolve(values); });
            }
            catch{ reject(); }
    }).finally(()=>{
        setActiveCharacterId(prevAcid); 
    });
}

function getSectionIDsAsync(sectionName){
    var acid=getActiveCharacterId(); 
    var prevAcid=null;               
    return new Promise((resolve,reject)=>{
            prevAcid=setActiveCharacterId(acid);  
            try{
                getSectionIDs(sectionName,(values)=>{ resolve(values); });
            }
            catch{ reject(); }
    }).finally(()=>{
        setActiveCharacterId(prevAcid); 
    });
}

function getSingleAttrAsync(prop){ 
    var acid=getActiveCharacterId(); 
    var prevAcid=null;               
    return new Promise((resolve,reject)=>{
            prevAcid=setActiveCharacterId(acid);  
            try{
                getAttrs([prop],(values)=>{  resolve(values[prop]); }); 
            }
            catch{ reject(); }
    }).finally(()=>{
        setActiveCharacterId(prevAcid); 
    });
}

function isApplied(e) {
    let result = false;

    if(e != "0")
        result = e;

    return result;
}

var PI = {
    "msgSlot":0,
    "msgEnergie":0
};

const listeArmure = ["Guardian", "Barbarian", "Bard", "Berserk", "Druid", "Monk", "Necromancer", "Paladin", "Priest", "Psion", "Ranger", "Rogue", "Shaman", "Sorcerer", "Warlock","Warmaster", "Warrior", "Wizard"];

const dataArmure = {
    "sans":{
        armureMax:0,
        energieMax:0,
        cdfMax:0
    },
    "guardian":{
        armureMax:5,
        energieMax:0,
        cdfMax:5
    },
    "barbarian":{
        armureMax:60,
        energieMax:60,
        cdfMax:12,
    },
    "bard":{
        armureMax:40,
        energieMax:80,
        cdfMax:12
    },
    "berserk":{
        armureMax:60,
        energieMax:0,
        egide:6,
        cdfMax:8,
    },
    "druid":{
        armureMax:50,
        energieMax:80,
        cdfMax:12,
    },
    "monk":{
        armureMax:60,
        energieMax:50,
        cdfMax:14
    },
    "necromancer":{
        armureMax:80,
        energieMax:100,
        cdfMax:12
    },
    "paladin":{
        armureMax:120,
        energieMax:20,
        cdfMax:8
    },
    "priest":{
        armureMax:70,
        energieMax:60,
        cdfMax:10
    },
    "psion":{
        armureMax:50,
        energieMax:60,
        cdfMax:14
    },
    "ranger":{
        armureMax:50,
        energieMax:70,
        cdfMax:12
    },
    "rogue":{
        armureMax:50,
        energieMax:70,
        cdfMax:12
    },
    "shaman":{
        armureMax:60,
        energieMax:80,
        cdfMax:10
    },
    "sorcerer":{
        armureMax:60,
        energieMax:80,
        cdfMax:14
    },
    "warlock":{
        armureMax:60,
        energieMax:60,
        cdfMax:8
    },
    "warmaster":{
        armureMax:90,
        energieMax:50,
        cdfMax:8
    },
    "warrior":{
        armureMax:100,
        energieMax:40,
        cdfMax:8
    },		
    "wizard":{
        armureMax:40,
        energieMax:80,
        cdfMax:14
    }
};

const CaracNom = {
    "deplacement":i18n_deplacement,
    "force":i18n_force,
    "endurance":i18n_endurance,
    "hargne":i18n_hargne,
    "combat":i18n_combat,
    "instinct":i18n_instinct,
    "tir":i18n_tir,
    "savoir":i18n_savoir,
    "technique":i18n_technique,
    "aura":i18n_aura,
    "parole":i18n_parole,
    "sf":i18n_sangFroid,
    "discretion":i18n_discretion,
    "dexterite":i18n_dexterite,
    "perception":i18n_perception,
};

const ODValue = {
    "deplacement":"calODDep",
    "force":"calODFor",
    "endurance":"calODEnd",
    "hargne":"calODHar",
    "combat":"calODCom",
    "instinct":"calODIns",
    "tir":"calODTir",
    "savoir":"calODSav",
    "technique":"calODTec",
    "aura":"calODAur",
    "parole":"calODPar",
    "sf":"calODSFR",
    "discretion":"calODDis",
    "dexterite":"calODDex",
    "perception":"calODPer",
};

const aspectCompanionsDruid = {
    "druidLionChair":i18n_chair,
    "druidLionBete":i18n_bete,
    "druidLionMachine":i18n_machine,
    "druidLionDame":i18n_dame,
    "druidLionMasque":i18n_masque,
    "MALDruidLionChair":i18n_chair,
    "MALDruidLionBete":i18n_bete,
    "MALDruidLionMachine":i18n_machine,
    "MALDruidLionDame":i18n_dame,
    "MALDruidLionMasque":i18n_masque,
    "druidWolfChair":i18n_chair,
    "druidWolfBete":i18n_bete,
    "druidWolfMachine":i18n_machine,
    "druidWolfDame":i18n_dame,
    "druidWolfMasque":i18n_masque,
    "MALDruidWolfChair":i18n_chair,
    "MALDruidWolfBete":i18n_bete,
    "MALDruidWolfMachine":i18n_machine,
    "MALDruidWolfDame":i18n_dame,
    "MALDruidWolfMasque":i18n_masque,
    "druidCrowChair":i18n_chair,
    "druidCrowBete":i18n_bete,
    "druidCrowMachine":i18n_machine,
    "druidCrowDame":i18n_dame,
    "druidCrowMasque":i18n_masque,
    "MALDruidCrowChair":i18n_chair,
    "MALDruidCrowBete":i18n_bete,
    "MALDruidCrowMachine":i18n_machine,
    "MALDruidCrowDame":i18n_dame,
    "MALDruidCrowMasque":i18n_masque
};

const AspectNom = {
    "Chair":i18n_chair,
    "Bete":i18n_bete,
    "Machine":i18n_machine,
    "Dame":i18n_dame,
    "Masque":i18n_masque,
};

const AEValue = {
    "Chair_Min":"ChairPNJAE",
    "Chair_Maj":"ChairPNJAEMaj",
    "Bete_Min":"BetePNJAE",
    "Bete_Maj":"BetePNJAEMaj",
    "Machine_Min":"MachinePNJAE",
    "Machine_Maj":"MachinePNJAEMaj",
    "Dame_Min":"DamePNJAE",
    "Dame_Maj":"DamePNJAEMaj",
    "Masque_Min":"MasquePNJAE",
    "Masque_Maj":"MasquePNJAEMaj",
};

const listBase = [
    `armure`,
    `armureLegende`,
    `jetModifDes`,
    `bonusCarac`,
];

const listArmure = [
    `barbarianGoliath`,
    `bardChangeling`,
    `rogueGhost`,
    `shamanNbreTotem`,
    `caracteristiqueTotem1`,
    `caracteristiqueTotem2`,
    `caracteristiqueTotem3`,
    `warriorSoldierA`,
    `warriorHunterA`,
    `warriorHeraldA`,
    `warriorScholarA`,
    `warriorScoutA`,
    `warrior250PG`,
];

const listArmureLegende = [
    `MALBarbarianGoliath`,
    `MALBardChangeling`,
    `MALRogueGhost`,
    `MALShamanNbreTotem`,
    `MALCaracteristiqueTotem1`,
    `MALCaracteristiqueTotem2`,
    `MALWarriorSoldierA`,
    `MALWarriorHunterA`,
    `MALWarriorHeraldA`,
    `MALWarriorScholarA`,
    `MALWarriorScoutA`,
];

const listStyle = [
    `styleCombat`,
    `atkCouvert`,
    `atkAgressif`,
    `atkAkimbo`,
    `atkAmbidextre`,
    `atkDefensif`,
    `atkPilonnage`,
    `stylePuissantType`,
    `stylePuissantBonus`,
    `styleSuppressionD`,
    `styleSuppressionV`,
];

async function getCarac(hasBonus, C1, C2, C3, C4, CO1 = false) {
    let tC1 = isApplied(C1);
    let tC2 = isApplied(C2);
    let tC3 = isApplied(C3);
    let tC4 = isApplied(C4);
    let tCO1 = false;

    if(CO1)
        tCO1 = isApplied(CO1);

    let listCaracs = [];

    let result = {};

    let tC1Nom = "0"
    let tC2Nom = "0"
    let tC3Nom = "0"
    let tC4Nom = "0"
    let tCO1Nom = "0"

    if(tC1) {
        tC1Nom = String(tC1).slice(2, -1);
        result["C1"] = true;
        result["C1Brut"] = tC1Nom;
        result["C1Nom"] = CaracNom[tC1Nom];

        listCaracs.push(tC1Nom);
        listCaracs.push(ODValue[tC1Nom]);
    } else
    result["C1"] = false;

    if(tC2) {
        tC2Nom = String(tC2).slice(2, -1);
        result["C2"] = true;
        result["C2Brut"] = tC2Nom;
        result["C2Nom"] = CaracNom[tC2Nom];

        listCaracs.push(tC2Nom);
        listCaracs.push(ODValue[tC2Nom]);
    } else
    result["C2"] = false;

    if(hasBonus == 1 || hasBonus == 2) {
        if(tC3) {
            tC3Nom = String(tC3).slice(2, -1);
            result["C3"] = true;
            result["C3Brut"] = tC3Nom;
            result["C3Nom"] = CaracNom[tC3Nom];
    
            listCaracs.push(tC3Nom);
            listCaracs.push(ODValue[tC3Nom]);
        } else
        result["C3"] = false;

        if(hasBonus == 2) {
            if(tC4) {
                tC4Nom = String(tC4).slice(2, -1);
                result["C4"] = true;
                result["C4Brut"] = tC4Nom;
                result["C4Nom"] = CaracNom[tC4Nom];
        
                listCaracs.push(tC4Nom);
                listCaracs.push(ODValue[tC4Nom]);
            } else
            result["C4"] = false;
        } else
        result["C4"] = false;
    } else {
        result["C3"] = false;
        result["C4"] = false;
    }

    if(tCO1) {
        tCO1Nom = String(tCO1).slice(2, -1);
        result["CO1"] = true;
        result["CO1Brut"] = tCO1Nom;
        result["CO1Nom"] = CaracNom[tCO1Nom];

        listCaracs.push(tCO1Nom);
        listCaracs.push(ODValue[tCO1Nom]);
    }

    let attrsCarac = await getAttrsAsync(listCaracs);

    if(tC1) {
        result["C1Base"] = +attrsCarac[tC1Nom];
        result["C1OD"] = +attrsCarac[ODValue[tC1Nom]];
    }

    if(tC2) {
        result["C2Base"] = +attrsCarac[tC2Nom];
        result["C2OD"] = +attrsCarac[ODValue[tC2Nom]];
    }

    if(hasBonus == 1 || hasBonus == 2) {
        if(tC3) {
            result["C3Base"] = +attrsCarac[tC3Nom];
            result["C3OD"] = +attrsCarac[ODValue[tC3Nom]];
        }

        if(hasBonus == 2) {
            if(tC4) {
                result["C4Base"] = +attrsCarac[tC4Nom];
                result["C4OD"] = +attrsCarac[ODValue[tC4Nom]];
            }
        }
    }

    if(tCO1) {
        result["CO1Base"] = +attrsCarac[tCO1Nom];
        result["CO1OD"] = +attrsCarac[ODValue[tCO1Nom]];
    }

    return result;
}

//Versioning 
on("sheet:opened",function()
{
    getAttrs(["version"], function(v)
    {
        const version = parseInt(v["version"], 10)||0;
        
        if(version < 15)
        {
            getAttrs(["MAJSheetworker", "MonkMAJ", "MAJ", "PsionMAJ", "OD_MAJ", "PNJAEMAJ", "PNJPFMAJ", "WarriorOD_MAJ", "WarriorOD_MAJ_2", "PJINSMAJ", "MAJV15LDB_1", "MAJV15LDB_2", "MAJV15LDB_3", "DruidLionBF"], function(value)
            {
                const MAJSW = parseInt(value["MAJSheetworker"], 10)||0;
                const MAJMO = parseInt(value["MonkMAJ"], 10)||0;
                const MAJSA = parseInt(value["MAJ"], 10)||0;
                const MAJPS = parseInt(value["PsionMAJ"], 10)||0;
                const MAJOD = parseInt(value["OD_MAJ"], 10)||0;
                const MAJAE = parseInt(value["PNJAEMAJ"], 10)||0;
                const MAJPF = parseInt(value["PNJPFMAJ"], 10)||0;
                const MAJW1 = parseInt(value["WarriorOD_MAJ"], 10)||0;
                const MAJW2 = parseInt(value["WarriorOD_MAJ_2"], 10)||0;
                const MAJNS = parseInt(value["PJINSMAJ"], 10)||0;
                const MAJL1 = parseInt(value["MAJV15LDB_1"], 10)||0;
                const MAJL2 = parseInt(value["MAJV15LDB_2"], 10)||0;
                const MAJL3 = parseInt(value["MAJV15LDB_3"], 10)||0;
                const MAJBF = parseInt(value["DruidLionBF"], 10)||0;
                
                var versioning = 0;
                
                if(MAJSW == 1 || version > 0)
                    versioning += 1;
                else
                {
                    listeArmure.forEach(function (nom)
                    {
                        var nCorrection = nom;
                        var nMin = nom.toLowerCase();
                            
                        if(nCorrection == "Druid")
                        {
                            nCorrection = "Drui";
                        }

                        getAttrs(["armure"+nCorrection, "armure"+nCorrection+"Modif", "energie"+nCorrection, "energie"+nCorrection+"Modif", "cdf"+nCorrection+"Modif"], function(value)
                        {
                            var vArmure = parseInt(value["armure"+nCorrection], 10)||0;
                            var vArmureMax = parseInt(armure[nMin]["armureMax"], 10)||0;
                            var vArmureModif = parseInt(value["armure"+nCorrection+"Modif"], 10)||0;
                            
                            var vEnergie = parseInt(value["energie"+nCorrection], 10)||0;
                            var vEnergieMax = parseInt(armure[nMin]["energieMax"], 10)||0;
                            var vEnergieModif = parseInt(value["energie"+nCorrection+"Modif"], 10)||0;
                            
                            var vCdfModif = parseInt(value["cdf"+nCorrection+"Modif"], 10)||0;
                            
                            dataArmure[nMin]["armure"] = vArmure;
                            dataArmure[nMin]["armureModif"] = vArmureModif;
                            
                            dataArmure[nMin]["energie"] = vEnergie;
                            dataArmure[nMin]["energieModif"] = vEnergieModif;
                            
                            dataArmure[nMin]["cdfModif"] = vCdfModif;
                        });
                    });
                    
                    getAttrs(["armure", "barbarianGoliath", "sorcererMMCorpMetal", "sorcerer150PG", "sorcererMM250PG", "warmaster150PG", "warmaster250PG", "warmasterImpFPersonnel"], function(value)
                    {
                        const actuel = value["armure"];
                        const goliath = parseInt(value["barbarianGoliath"], 10)||0;
                        const CorpMetal = value["sorcererMMCorpMetal"];
                        const CM150PG = value["sorcerer150PG"];
                        const CM250PG = value["sorcererMM250PG"];
                        const WIPers = value["warmasterImpFPersonnel"];
                        const W150PG = value["warmaster150PG"];
                        const W250PG = value["warmaster250PG"];

                        const armModif = dataArmure[actuel]["armureModif"];
                        const eneModif = dataArmure[actuel]["energieModif"];
                        const cdfModif = dataArmure[actuel]["cdfModif"];
                        
                        var totalEnergie = dataArmure[actuel]["energieMax"]+eneModif;
                        
                        var bonusCDF = 0;
                        
                        if(actuel == "barbarian")
                            bonusCDF += goliath;
                                                
                        if(actuel == "sorcerer")
                        {
                            if(CorpMetal != 0 || CM250PG != 0)
                            {
                                bonusCDF += 2;
                                
                                if(CM150PG != 0)
                                    bonusCDF += 2;
                            }
                        }
                        
                        if(actuel == "warmaster")
                        {
                            if(WIPers != 0)
                                bonusCDF += 2;
                        
                            if(W150PG != 0)
                                totalEnergie = dataArmure[actuel]["energieMax150"]+eneModif;
                                
                            if(W250PG != 0)
                                totalEnergie = dataArmure[actuel]["energieMax250"]+eneModif;
                        }
                        
                        setAttrs({
                            armurePJ:armure[actuel]["armure"],
                            armurePJ_max:armure[actuel]["armureMax"]+armModif,
                            armurePJModif:armure[actuel]["armureModif"],
                            energiePJ:armure[actuel]["energie"],
                            energiePJ_max:totalEnergie,
                            energiePJModif:armure[actuel]["energieModif"],
                            cdfPJ:armure[actuel]["cdf"]+cdfModif+bonusCDF,
                            cdfPJ_max:armure[actuel]["cdfMax"]+cdfModif+bonusCDF,
                            cdfPJModif:armure[actuel]["cdfModif"]
                        });
                    });
                
                    versioning += 1;
                }
                
                if(MAJMO == 1 || version > 1)
                    versioning += 1;
                else
                {
                    getAttrs(["monk150PG", "monk250PG"], function(value)
                    {
                        var M150 = value.monk150PG;
                        var M250 = value.monk250PG;
                        
                        if(M150 == 2)
                        {
                            setAttrs({
                                monkSalveDegat: "5D6",
                                monkVagueDegat: "5D6",
                                monkRayonDegat: "6D6",
                                monkRayonViolence: "4D6"
                            });
                        }
                        else
                        {
                            setAttrs({
                                monkSalveDegat: "3D6",
                                monkVagueDegat: "3D6",
                                monkRayonDegat: "4D6",
                                monkRayonViolence: "2D6"
                            });
                        }
                        
                        if(M250 == 1)
                        {
                            setAttrs({
                                monkSalveEffets: "Parasitage 1 / Dispersion 6 / Ultraviolence / Destructeur",
                                monkVagueEffets: "Parasitage 4 / Dispersion 3 / Choc 2",
                                monkRayonEffets: "Parasitage 1 / Ignore Armure"
                            });
                        }
                        else
                        {
                            setAttrs({
                                monkSalveEffets: "Parasitage 1 / Dispersion 3 / Ultraviolence / Destructeur",
                                monkVagueEffets: "Parasitage 2 / Dispersion 3 / Choc 2",
                                monkRayonEffets: "Parasitage 1 / Perce Armure 40"
                            });
                        }
                    });
                
                    versioning += 1;
                }
                
                if(MAJSA == 1 || version > 2)
                    versioning += 1;
                else
                {
                    getAttrs(["sante"], function(value)
                    {
                        setAttrs({
                                santepj: value.sante,
                                santePNJ: value.sante
                        });
                    });
                
                    versioning += 1;
                }
                
                if(MAJPS == 1 || version > 3)
                    versioning += 1;
                else
                {
                    getAttrs(["psion200PG"], function(value)
                    {
                        if(value.psion200PG == "on")
                        {
                            setAttrs({
                                    psionMalusA: "3D",
                                    psionMalus: 3
                            });
                        }
                        else
                        {
                            setAttrs({
                                    psionMalusA: "2D",
                                    psionMalus: 2
                            });
                        }
                    });
                
                    versioning += 1;
                }
                
                if(MAJOD == 1 || version > 4)
                    versioning += 1;
                else
                {
                    getAttrs(["armure", "deplOD", "forOD", "endOD", "hargneOD", "combOD", "instOD", "tirOD", "savoirOD", "technOD", "auraOD", "paroleOD", "sfOD", "discrOD", "percOD", "dextOD", "warriorSoldierA", "warriorHunterA", "warriorScholarA", "warriorHeraldA", "warriorScoutA", "warrior250PG"], function(value) 
                    {
                        var armure = value.armure;

                        var ODDep = Number(value.deplOD);
                        var ODFor = Number(value.forOD);
                        var ODEnd = Number(value.endOD);
                        
                        var ODHar = Number(value.hargneOD);
                        var ODCom = Number(value.combOD);
                        var ODIns = Number(value.instOD);
                        
                        var ODTir = Number(value.tirOD);
                        var ODSav = Number(value.savoirOD);
                        var ODTec = Number(value.technOD);
                        
                        var ODAur = Number(value.auraOD);
                        var ODPar = Number(value.paroleOD);
                        var ODSFR = Number(value.sfOD);
                        
                        var ODDis = Number(value.discrOD);
                        var ODPer = Number(value.percOD);
                        var ODDex = Number(value.dextOD);
                        
                        var WEvol = Number(value.warrior250PG);
                        
                        var SolBonus = value.warriorSoldierA;
                        var HunBonus = value.warriorHunterA;
                        var SchBonus = value.warriorScholarA;
                        var HerBonus = value.warriorHeraldA;
                        var ScoBonus = value.warriorScoutA;
                                    
                        var sumSol = 0;
                        var sumHun = 0;
                        var sumSch = 0;
                        var sumHer = 0;
                        var sumSco = 0;
                        
                        if(armure == "warrior")
                        {
                            if(SolBonus != 0)
                                sumSol = 1+WEvol;
                            if(HunBonus != 0)
                                sumHun = 1+WEvol;
                            if(SchBonus != 0)
                                sumSch = 1+WEvol;
                            if(HerBonus != 0)
                                sumHer = 1+WEvol;
                            if(ScoBonus != 0)
                                sumSco = 1+WEvol;
                        }
                        
                        var totDep = ODDep+sumSol;
                        var totFor = ODFor+sumSol;
                        var totEnd = ODEnd+sumSol;
                        
                        var totHar = ODHar+sumHun;
                        var totCom = ODCom+sumHun;
                        var totIns = ODIns+sumHun;
                        
                        var totTir = ODTir+sumSch;
                        var totSav = ODSav+sumSch;
                        var totTec = ODTec+sumSch;
                        
                        var totAur = ODAur+sumHer;
                        var totPar = ODPar+sumHer;
                        var totSFR = ODSFR+sumHer;
                        
                        var totDis = ODDis+sumSco;
                        var totPer = ODPer+sumSco;
                        var totDex = ODDex+sumSco;

                        setAttrs({
                                calODDep: ODDep,
                                calODFor: totFor,
                                calODEnd: totEnd,
                                calODHar: totHar,
                                calODCom: totCom,
                                calODIns: totIns,
                                calODTir: totTir,
                                calODSav: totSav,
                                calODTec: totTec,
                                calODAur: totAur,
                                calODPar: totPar,
                                calODSFR: totSFR,
                                calODDis: totDis,
                                calODPer: totPer,
                                calODDex: totDex
                        });
                    });
                
                    versioning += 1;
                }
                
                if(MAJAE == 1 || version > 5)
                    versioning += 1;
                else
                {
                    getAttrs(["chairPNJAE"], function(value)
                    {
                        var PNJAE = value.chairPNJAE;
                        
                        if(PNJAE > 5)
                        {
                            setAttrs({
                                    chairPNJAE: 0,
                                    chairPNJAEMaj: PNJAE
                            });
                        }
                        
                    });
                    
                    getAttrs(["betePNJAE"], function(value)
                    {
                        var PNJAE = value.betePNJAE;
                        
                        if(PNJAE > 5)
                        {
                            setAttrs({
                                    betePNJAE: 0,
                                    betePNJAEMaj: PNJAE
                            });
                        }
                        
                    });
                    
                    getAttrs(["machinePNJAE"], function(value)
                    {
                        var PNJAE = value.machinePNJAE;
                        
                        if(PNJAE > 5)
                        {
                            setAttrs({
                                    machinePNJAE: 0,
                                    machinePNJAEMaj: PNJAE
                            });
                        }
                        
                    });
                    
                    getAttrs(["damePNJAE"], function(value)
                    {
                        var PNJAE = value.damePNJAE;
                        
                        if(PNJAE > 5)
                        {
                            setAttrs({
                                    damePNJAE: 0,
                                    damePNJAEMaj: PNJAE
                            });
                        }
                        
                    });
                    
                    getAttrs(["masquePNJAE"], function(value)
                    {
                        var PNJAE = value.masquePNJAE;
                        
                        if(PNJAE > 5)
                        {
                            setAttrs({
                                    masquePNJAE: 0,
                                    masquePNJAEMaj: PNJAE
                            });
                        }
                        
                    });
                
                    versioning += 1;
                }
                
                if(MAJPF == 1 || version > 6)
                    versioning += 1;
                else
                {
                    getAttrs(["motivationMajeure"], function(value)
                    {
                        var PJMM = value.motivationMajeure;

                        setAttrs({
                                ptsFaibles: PJMM
                        });
                        
                    });
                
                    versioning += 1;
                }
                
                if(MAJW1 == 1 || version > 7)
                    versioning += 1;
                else
                {
                    getSectionIDs("repeating_armeDist", function(idarray) 
                    { //Get oldSectionID
                        var setOrf={};
                        var setPre={};
                        _.each(idarray, function(currentID, i) 
                        {
                            getAttrs(['repeating_armeDist_' + currentID + '_orfevrerie'], function(v) 
                            {
                                if(v['repeating_armeDist_' + currentID + '_orfevrerie'] == "{{orfevrerie=[[@{dexterite}+@{dextOD}]]}}")
                                {
                                    setOrf['repeating_armeDist_' + currentID + '_orfevrerie'] = "{{orfevrerie=[[@{dexterite}+@{dextOD}]]}} {{orfevrerieWarrior=[[@{dexterite}+@{dextOD}+@{warriorScoutA}]]}}";
                                    setAttrs(setOrf); //Update
                                }
                            });
                            
                            getAttrs(['repeating_armeDist_' + currentID + '_precision'], function(v) 
                            {
                                if(v['repeating_armeDist_' + currentID + '_precision'] == "{{precision=[[@{tir}+@{tirOD}]]}}")
                                {
                                    setPre['repeating_armeDist_' + currentID + '_precision'] = "{{precision=[[@{tir}+@{tirOD}]]}} {{precisionWarrior=[[@{tir}+@{tirOD}+@{warriorScholarA}]]}}";
                                    setAttrs(setPre); //Update
                                }
                            });
                        });
                    });
                    
                    getSectionIDs("repeating_armeCaC", function(idarray) 
                    { 
                        //Get oldSectionID
                        var setOrf={};
                        var setPre={};
                        _.each(idarray, function(currentID, i) 
                        {
                            getAttrs(['repeating_armeCaC_' + currentID + '_orfevrerie'], function(v) 
                            {
                                if(v['repeating_armeCaC_' + currentID + '_orfevrerie'] == "{{orfevrerie=[[@{dexterite}+@{dextOD}]]}}")
                                {
                                    setOrf['repeating_armeCaC_' + currentID + '_orfevrerie'] = "{{orfevrerie=[[@{dexterite}+@{dextOD}]]}} {{orfevrerieWarrior=[[@{dexterite}+@{dextOD}+@{warriorScoutA}]]}}";
                                    setAttrs(setOrf); //Update
                                }
                            });
                            
                            getAttrs(['repeating_armeCaC_' + currentID + '_precision'], function(v) 
                            {
                                if(v['repeating_armeCaC_' + currentID + '_precision'] == "{{precision=[[@{tir}+@{tirOD}]]}}")
                                {
                                    setPre['repeating_armeCaC_' + currentID + '_precision'] = "{{precision=[[@{tir}+@{tirOD}]]}} {{precisionWarrior=[[@{tir}+@{tirOD}+@{warriorScholarA}]]}}";
                                    setAttrs(setPre); //Update
                                }
                            });
                            
                            getAttrs(['repeating_armeCaC_' + currentID + '_sournoise'], function(v) 
                            {
                                if(v['repeating_armeCaC_' + currentID + '_sournoise'] == "{{orfevrerie=[[@{dexterite}+@{dextOD}]]}} {{ASSournoiseL=Sournoise (Orfevrerie)}}")
                                {
                                    setPre['repeating_armeCaC_' + currentID + '_sournoise'] = "{{orfevrerie=[[@{dexterite}+@{dextOD}]]}} {{orfevrerieWarrior=[[@{dexterite}+@{dextOD}+@{warriorScoutA}]]}} {{ASSournoiseL=Sournoise (Orfevrerie)}}";
                                    setAttrs(setPre); //Update
                                }
                            });
                            
                            getAttrs(['repeating_armeCaC_' + currentID + '_surmesure'], function(v) 
                            {
                                if(v['repeating_armeCaC_' + currentID + '_surmesure'] == "{{ASSurMesureD=[[@{combat}+@{combOD}]]}} {{ASSurMesureWOD=[[@{combat}]]}} {{ASSurMesureL=Sur Mesure}}")
                                {
                                    setPre['repeating_armeCaC_' + currentID + '_surmesure'] = "{{ASSurMesureD=[[@{combat}+@{combOD}]]}} {{ASSurMesureDWarrior=[[@{combat}+@{combOD}+@{warriorHunterA}]]}} {{ASSurMesureWOD=[[@{combat}]]}} {{ASSurMesureL=Sur Mesure}}";
                                    setAttrs(setPre); //Update
                                }
                            });
                        });
                    });
                
                    versioning += 1;
                }
                
                if(MAJW2 == 1 || version > 8)
                    versioning += 1;
                else
                {
                    getAttrs(["discrOD", "dextOD", "percOD", "armure", "warriorScoutA", "warrior250PG"], function(values)
                    {
                        var armure = values.armure;
                        var mode = values.warriorScoutA;
                        var W250PG = values.warrior250PG;
                        var nBonus = 0;
                                
                        if(armure == "warrior")
                        {
                            if(mode != "0")
                            {
                                nBonus += 1;
                                if(W250PG != "0")
                                {
                                    nBonus += 1;
                                }
                            }
                        }
                        
                        setAttrs({
                                calODDis: Number(values.discrOD)+nBonus,
                                calODDex: Number(values.dextOD)+nBonus,
                                calODPer: Number(values.percOD)+nBonus
                            });
                    });
                    
                    getAttrs(["auraOD", "paroleOD", "sfOD", "armure", "warriorHeraldA", "warrior250PG"], function(values)
                    {
                        var armure = values.armure;
                        var mode = values.warriorHeraldA;
                        var W250PG = values.warrior250PG;
                        var nBonus = 0;
                                
                        if(armure == "warrior")
                        {
                            if(mode != "0")
                            {
                                nBonus += 1;
                                
                                if(W250PG != "0")
                                {
                                    nBonus += 1;
                                }
                            }
                        }
                        
                        setAttrs({
                                calODAur: Number(values.auraOD)+nBonus,
                                calODPar: Number(values.paroleOD)+nBonus,
                                calODSFR: Number(values.sfOD)+nBonus
                            });
                    });
                    
                    getAttrs(["tirOD", "savoirOD", "technOD", "armure", "warriorScholarA", "warrior250PG"], function(values)
                    {
                        var armure = values.armure;
                        var mode = values.warriorScholarA;
                        var W250PG = values.warrior250PG;
                        var nBonus = 0;
                                
                        if(armure == "warrior")
                        {
                            if(mode != "0")
                            {
                                nBonus += 1;
                                if(W250PG != "0")
                                {
                                    nBonus += 1;
                                }
                            }
                        }
                        
                        setAttrs({
                                calODTir: Number(values.tirOD)+nBonus,
                                calODSav: Number(values.savoirOD)+nBonus,
                                calODTec: Number(values.technOD)+nBonus
                            });
                    });
                    
                    getAttrs(["hargneOD", "combOD", "instOD", "armure", "warriorHunterA", "warrior250PG"], function(values)
                    {
                        var armure = values.armure;
                        var mode = values.warriorHunterA;
                        var W250PG = values.warrior250PG;
                        var nBonus = 0;
                                
                        if(armure == "warrior")
                        {
                            if(mode != "0")
                            {
                                nBonus += 1;
                                if(W250PG != "0")
                                {
                                    nBonus += 1;
                                }
                            }
                        }
                        
                        setAttrs({
                                calODHar: Number(values.hargneOD)+nBonus,
                                calODCom: Number(values.combOD)+nBonus,
                                calODIns: Number(values.instOD)+nBonus
                            });
                    });
                            
                    getAttrs(["deplOD", "forOD", "endOD", "armure", "warriorSoldierA", "warrior250PG"], function(values)
                    {
                        var armure = values.armure;
                        var mode = values.warriorSoldierA;
                        var W250PG = values.warrior250PG;
                        var nBonus = 0;
                                
                        if(armure == "warrior")
                        {
                            if(mode != "0")
                            {
                                nBonus += 1;
                                if(W250PG != "0")
                                {
                                    nBonus += 1;
                                }
                            }
                        }
                        
                        setAttrs({
                                calODDep: Number(values.deplOD)+nBonus,
                                calODFor: Number(values.forOD)+nBonus,
                                calODEnd: Number(values.endOD)+nBonus
                            });
                    });
                
                    versioning += 1;
                }
                
                if(MAJNS == 1 || version > 9)
                    versioning += 1;
                else
                {
                    getAttrs(["calODIns"], function(value)
                    {
                        var PJINS = value.calODIns;

                        if(PJINS >= 3)
                        {
                            setAttrs({
                                    initiativeODBonus:(3*PJINS)
                            });
                        }
                        else
                        {
                            setAttrs({
                                    initiativeODBonus:0
                            });
                        }
                    });
                
                    versioning += 1;
                }
                
                if(MAJL1 == 1 || version > 10)
                    versioning += 1;
                else
                {
                    getSectionIDs("repeating_armeAutre", function (ids) 
                    {
                        _.each(ids,function(id) 
                        {
                            getAttrs(["repeating_armeAutre_"+id+"_chambreDouble"], function (v) 
                            {
                                var CD = v["repeating_armeAutre_"+id+"_chambreDouble"];
                                
                                if(CD == "?{Chambre Double|Cadence, 1|Dégâts, 2|Violence, 3}")
                                {
                                    setAttrs({["repeating_armeAutre_"+id+"_chambreDouble"]: "[[?{Plusieurs cibles ?|Oui, 3.5|Non, 0.5}]]"});
                                }
                                
                            });
                        });
                    });
                    
                    getSectionIDs("repeating_armeDist", function (ids) 
                    {
                        _.each(ids,function(id) 
                        {
                            getAttrs(["repeating_armeDist_"+id+"_chambreDouble"], function (v) 
                            {
                                var CD = v["repeating_armeDist_"+id+"_chambreDouble"];
                                
                                if(CD == "?{Chambre Double|Cadence, 1|Dégâts, 2|Violence, 3}")
                                {
                                    setAttrs({["repeating_armeDist_"+id+"_chambreDouble"]: "[[?{Plusieurs cibles ?|Oui, 3.5|Non, 0.5}]]"});
                                }
                            });
                        });
                    });
                    
                    getSectionIDs("repeating_armeDruidLion", function (ids) 
                    {
                        _.each(ids,function(id) 
                        {
                            getAttrs(["repeating_armeDruidLion_"+id+"_chambreDouble"], function (v) 
                            {
                                var CD = v["repeating_armeDruidLion_"+id+"_chambreDouble"];
                                
                                if(CD == "?{Chambre Double|Cadence, 1|Dégâts, 2|Violence, 3}")
                                {
                                    setAttrs({["repeating_armeDruidLion_"+id+"_chambreDouble"]: "[[?{Plusieurs cibles ?|Oui, 3.5|Non, 0.5}]]"});
                                }
                            });
                        });
                    });
                
                    versioning += 1;
                }
                
                if(MAJL2 == 1 || version > 11)
                    versioning += 1;
                else
                {
                    getSectionIDs("repeating_armeAutre", function (ids) 
                    {
                        _.each(ids,function(id) 
                        {
                            getAttrs([
                            "repeating_armeAutre_"+id+"_interfaceGuidage", 
                            "repeating_armeAutre_"+id+"_tirSecurite", 
                            "repeating_armeAutre_"+id+"_akimbo",
                            "repeating_armeAutre_"+id+"_ambidextrie"], function (v) 
                            {
                                var IG = v["repeating_armeAutre_"+id+"_interfaceGuidage"];
                                var TS = v["repeating_armeAutre_"+id+"_tirSecurite"];
                                var Ak = v["repeating_armeAutre_"+id+"_akimbo"];
                                var Am = v["repeating_armeAutre_"+id+"_ambidextrie"];
                                
                                if(IG == "{{Interface de guidage (Tir en Sécurité)}}")
                                {
                                    setAttrs({["repeating_armeAutre_"+id+"_interfaceGuidage"]: "3"});
                                }
                                
                                if(TS == "{{tirSecurite=[[{3d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}")
                                {
                                    setAttrs({["repeating_armeAutre_"+id+"_tirSecurite"]: "3"});
                                }

                                if(Ak == "{{effetAkimbo=[[{2d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}")
                                {
                                    setAttrs({["repeating_armeAutre_"+id+"_akimbo"]: "2"});
                                }
                                
                                if(Am == "{{effetAmbidextrie=[[{2d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}")
                                {
                                    setAttrs({["repeating_armeAutre_"+id+"_ambidextrie"]: "2"});
                                }
                            });
                            
                        });
                    });
                    
                    getSectionIDs("repeating_armeDist", function (ids) 
                    {
                        _.each(ids,function(id) 
                        {
                            getAttrs([
                            "repeating_armeDist_"+id+"_interfaceGuidage",
                            "repeating_armeDist_"+id+"_tirSecurite",
                            "repeating_armeDist_"+id+"_akimbo",
                            "repeating_armeDist_"+id+"_ambidextrie"], function (v) 
                            {
                                var IG = v["repeating_armeDist_"+id+"_interfaceGuidage"];
                                var TS = v["repeating_armeDist_"+id+"_tirSecurite"];
                                var Ak = v["repeating_armeDist_"+id+"_akimbo"];
                                var Am = v["repeating_armeDist_"+id+"_ambidextrie"];
                                
                                if(IG == "{{Interface de guidage (Tir en Sécurité)}}")
                                {
                                    setAttrs({["repeating_armeDist_"+id+"_interfaceGuidage"]: "3"});
                                }
                                
                                if(TS == "{{tirSecurite=[[{3d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}")
                                {
                                    setAttrs({["repeating_armeDist_"+id+"_tirSecurite"]: "3"});
                                }
                                
                                if(Ak == "{{effetAkimbo=[[{2d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}")
                                {
                                    setAttrs({["repeating_armeDist_"+id+"_akimbo"]: "2"});
                                }
                                
                                if(Am == "{{effetAmbidextrie=[[{2d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}")
                                {
                                    setAttrs({["repeating_armeDist_"+id+"_ambidextrie"]: "2"});
                                }
                            });
                        });
                    });
                    
                    getSectionIDs("repeating_armeCaC", function (ids) 
                    {
                        _.each(ids,function(id) 
                        {						
                            getAttrs([
                            "repeating_armeCaC_"+id+"_tirSecurite",
                            "repeating_armeCaC_"+id+"_akimbo",
                            "repeating_armeCaC_"+id+"_ambidextrie",
                            "repeating_armeCaC_"+id+"_jumelle",
                            "repeating_armeCaC_"+id+"_soeur",
                            "repeating_armeCaC_"+id+"_protectrice"], function (v) 
                            {
                                var TS = v["repeating_armeCaC_"+id+"_tirSecurite"];
                                var Ak = v["repeating_armeCaC_"+id+"_akimbo"];
                                var Am = v["repeating_armeCaC_"+id+"_ambidextrie"];
                                var Ju = v["repeating_armeCaC_"+id+"_jumelle"];
                                var So = v["repeating_armeCaC_"+id+"_soeur"];
                                var Pr = v["repeating_armeCaC_"+id+"_protectrice"];
                                
                                if(Ak == "{{effetAkimbo=[[{2d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}")
                                {
                                    setAttrs({["repeating_armeCaC_"+id+"_akimbo"]: "2"});
                                }

                                if(Am == "{{effetAmbidextrie=[[{2d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}")
                                {
                                    setAttrs({["repeating_armeCaC_"+id+"_ambidextrie"]: "2"});
                                }
                                
                                if(TS == "{{tirSecurite=[[{3d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}")
                                {
                                    setAttrs({["repeating_armeCaC_"+id+"_tirSecurite"]: "3"});
                                }
                                
                                if(Ju == "{{effetAkimbo=[[{2d6cs2cs4cs6cf1cf3cf5s%2}=0]]}} {{ASJumelleL=Jumelle (Jumelée - Akimbo)}}")
                                {
                                    setAttrs({["repeating_armeCaC_"+id+"_jumelle"]: "2"});
                                }
                                
                                if(So == "{{effetAmbidextrie=[[{2d6cs2cs4cs6cf1cf3cf5s%2}=0]]}} {{ASSoeurL=Soeur (Jumelée - Ambidextrie)}}")
                                {
                                    setAttrs({["repeating_armeCaC_"+id+"_soeur"]: "2"});
                                }
                                
                                if(Pr == "{{ASProtectrice=[[{2d6cs2cs4cs6cf1cf3cf5s%2}=0]]}} {{ASProtectriceL=Protectrice}}")
                                {
                                    setAttrs({["repeating_armeCaC_"+id+"_protectrice"]: "2"});
                                }
                                
                            });
                        });
                    });
                    
                    getSectionIDs("repeating_armeDruidLion", function (ids) 
                    {
                        _.each(ids,function(id) 
                        {
                            getAttrs([
                            "repeating_armeDruidLion_"+id+"_interfaceGuidage",
                            "repeating_armeDruidLion_"+id+"_tirSecurite",
                            "repeating_armeDruidLion_"+id+"_akimbo",
                            "repeating_armeDruidLion_"+id+"_ambidextrie"], function (v) 
                            {
                                var IG = v["repeating_armeDruidLion_"+id+"_interfaceGuidage"];
                                var TS = v["repeating_armeDruidLion_"+id+"_tirSecurite"];
                                var Ak = v["repeating_armeDruidLion_"+id+"_akimbo"];
                                var Am = v["repeating_armeDruidLion_"+id+"_ambidextrie"];
                                
                                if(IG == "{{Interface de guidage (Tir en Sécurité)}}")
                                {
                                    setAttrs({["repeating_armeDruidLion_"+id+"_interfaceGuidage"]: "3"});
                                }

                                if(TS == "{{tirSecurite=[[{3d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}")
                                {
                                    setAttrs({["repeating_armeDruidLion_"+id+"_tirSecurite"]: "3"});
                                }

                                if(Ak == "{{effetAkimbo=[[{2d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}")
                                {
                                    setAttrs({["repeating_armeDruidLion_"+id+"_akimbo"]: "2"});
                                }

                                if(Am == "{{effetAmbidextrie=[[{2d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}")
                                {
                                    setAttrs({["repeating_armeDruidLion_"+id+"_ambidextrie"]: "2"});
                                }
                            });
                        });
                    });
                
                    versioning += 1;
                }
                
                if(MAJL3 == 1 || version > 12)
                    versioning += 1;
                else
                {
                    getAttrs(["warmaster250PG"], function(value)
                    {
                        var PJWM = value.warmaster250PG;

                        if(PJWM == "on")
                        {
                            setAttrs({
                                    warmaster250PG:10
                            });
                        }
                        
                    });
                
                    versioning += 1;
                }
                
                if(MAJBF == 1 || version > 13)
                    versioning += 1;
                else
                {
                    getSectionIDs("repeating_armeDruidLion", function (ids) 
                    {
                        _.each(ids,function(id) 
                        {
                            getAttrs(["repeating_armeDruidLion_"+id+"_leste"], function (v) 
                            {
                                var LL = v["repeating_armeDruidLion_"+id+"_leste"];
                                
                                if(LL == "{{leste=[[@{force}]]}}")
                                {
                                    setAttrs({["repeating_armeDruidLion_"+id+"_leste"]: "{{leste=[[@{druidLionChairTot}]]}}"});
                                }
                            });
                            
                        });
                    });
            
                    versioning += 1;
                }
            
                var newSheet = 0;
            
                getSectionIDs("repeating_slotsTete", function(idarray1) 
                {
                    if(idarray1.length == 0)
                        newSheet += 1;
                        
                    getSectionIDs("repeating_slotsTorse", function(idarray2) 
                    {
                        if(idarray2.length == 0)
                            newSheet += 1;
                            
                        getSectionIDs("repeating_slotsBG", function(idarray3) 
                        {
                            if(idarray3.length == 0)
                                newSheet += 1;
                                
                            getSectionIDs("repeating_slotsBD", function(idarray4) 
                            {
                                if(idarray4.length == 0)
                                    newSheet += 1;
                                    
                                getSectionIDs("repeating_slotsJG", function(idarray5) 
                                {
                                    if(idarray5.length == 0)
                                        newSheet += 1;
                                        
                                    getSectionIDs("repeating_slotsJD", function(idarray6) 
                                    {
                                        if(idarray6.length == 0)
                                            newSheet += 1;
                                        
                                        getSectionIDs("repeating_slotsDCLTete", function(idarray7) 
                                        {
                                            if(idarray7.length == 0)
                                            newSheet += 1;
                                            
                                            getSectionIDs("repeating_slotsDCLTorse", function(idarray8) 
                                            {		
                                                if(idarray8.length == 0)
                                                newSheet += 1;
                                                
                                                getSectionIDs("repeating_slotsDCLBG", function(idarray9) 
                                                {		
                                                    if(idarray9.length == 0)
                                                    newSheet += 1;
                                                    
                                                    getSectionIDs("repeating_slotsDCLBD", function(idarray10) 
                                                    {		
                                                        if(idarray10.length == 0)
                                                        newSheet += 1;
                                                        
                                                        getSectionIDs("repeating_slotsDCLJG", function(idarray11) 
                                                        {		
                                                            if(idarray11.length == 0)
                                                            newSheet += 1;
                                                            
                                                            getSectionIDs("repeating_slotsDCLJD", function(idarray12) 
                                                            {		
                                                                if(idarray12.length == 0)
                                                                newSheet += 1;
                                                                
                                                                if(newSheet == 12)
                                                                {
                                                                    versioning += 1;
                                                                }
                                                                
                                                                setAttrs({
                                                                    version: versioning
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
    
        if(version < 16)
        {
            setAttrs({["pSDistPortee"]: "^{portee-moyenne}"});
            setAttrs({["mEDistPortee"]: "^{portee-courte}"});
            setAttrs({["pSCaCPortee"]: "^{portee-contact}"});
            setAttrs({["mECaCPortee"]: "^{portee-contact}"});
            setAttrs({["druidLionBasePortee"]: "^{portee-contact}"});
            
            var majDistance = ["repeating_armeDruidLion", "repeating_armeCaC", "repeating_armeDist", "repeating_armeAutre", "repeating_armeDistVehicule"];

            _.each(majDistance,function(listDistance) 
            {
                getSectionIDs(listDistance, function(idarray) 
                {
                    _.each(idarray,function(id) 
                    {
                        getAttrs([listDistance+"_"+id+"_armeCaCPortee", listDistance+"_"+id+"_armeDistPortee", listDistance+"_"+id+"_armeAutrePortee", listDistance+"_"+id+"_porteeDruidLion", listDistance+"_"+id+"_"+"barrage", listDistance+"_"+id+"_"+"chargeur", listDistance+"_"+id+"_"+"choc", listDistance+"_"+id+"_"+"defense", listDistance+"_"+id+"_"+"degatContinue", listDistance+"_"+id+"_"+"dispersion", listDistance+"_"+id+"_"+"lumiere", listDistance+"_"+id+"_"+"perceArmure", listDistance+"_"+id+"_"+"parasitage", listDistance+"_"+id+"_"+"penetrant", listDistance+"_"+id+"_"+"reaction", listDistance+"_"+id+"_"+"jumelage", listDistance+"_"+id+"_"+"lourd"], function (v) 
                        {
                            var barrage = v[listDistance+"_"+id+"_"+"barrage"];
                            var chargeur = v[listDistance+"_"+id+"_"+"chargeur"];
                            var choc = v[listDistance+"_"+id+"_"+"choc"];
                            var defense = v[listDistance+"_"+id+"_"+"defense"];
                            var degatContinue = v[listDistance+"_"+id+"_"+"degatContinue"];
                            var dispersion = v[listDistance+"_"+id+"_"+"dispersion"];
                            var lumiere = v[listDistance+"_"+id+"_"+"lumiere"];
                            var parasitage = v[listDistance+"_"+id+"_"+"parasitage"];
                            var pa = v[listDistance+"_"+id+"_"+"perceArmure"];
                            var penetrant = v[listDistance+"_"+id+"_"+"penetrant"];
                            var reaction = v[listDistance+"_"+id+"_"+"reaction"];
                            var jumelage = v[listDistance+"_"+id+"_"+"jumelage"];
                            var lourd = v[listDistance+"_"+id+"_"+"lourd"];
                            
                            if(barrage == "{{barrage=Barrage @{barrageValue}}} ")
                                setAttrs({[listDistance+"_"+id+"_"+"barrage"]: "{{barrage=^{barrage} @{barrageValue}}} "});
                                
                            if(chargeur == "{{chargeur=Chargeur @{chargeurValue}}} ")
                                setAttrs({[listDistance+"_"+id+"_"+"chargeur"]: "{{chargeur=^{chargeur} @{chargeurValue}}} "});
                                
                            if(choc == "{{choc=Choc @{chocValue}}}")
                                setAttrs({[listDistance+"_"+id+"_"+"choc"]: "{{choc=^{choc} @{chocValue}}}"});
                                
                            if(defense == "{{defense=Défense @{defenseValue}}}")
                                setAttrs({[listDistance+"_"+id+"_"+"defense"]: "{{defense=^{defense} @{defenseValue}}}"});
                                
                            if(degatContinue == "{{degatContinus=Dégâts Continus @{degatContinueValue} ([[1D6]] ^{tours})}}")
                                setAttrs({[listDistance+"_"+id+"_"+"degatContinue"]: "{{degatContinus=^{degats-continus} @{degatContinueValue} ([[1D6]] ^{tours})}}"});
                                
                            if(dispersion == "{{dispersion=Dispersion @{dispersionValue}}} ")
                                setAttrs({[listDistance+"_"+id+"_"+"dispersion"]: "{{dispersion=^{dispersion} @{dispersionValue}}} "});
                                
                            if(lumiere == "{{lumiere=Lumière @{lumiereValue}}}")
                                setAttrs({[listDistance+"_"+id+"_"+"lumiere"]: "{{lumiere=^{lumiere} @{lumiereValue}}}"});
                                
                            if(parasitage == "{{parasitage=Parasitage @{parasitageValue}}}")
                                setAttrs({[listDistance+"_"+id+"_"+"parasitage"]: "{{parasitage=^{parasitage} @{parasitageValue}}}"});
                                
                            if(penetrant == "{{penetrant=Pénétrant @{penetrantValue}}}")
                                setAttrs({[listDistance+"_"+id+"_"+"penetrant"]: "{{penetrant=^{penetrant} @{penetrantValue}}}"});
                                
                            if(pa == "{{perceArmure=Perce Armure @{perceArmureValue}}}")
                                setAttrs({[listDistance+"_"+id+"_"+"perceArmure"]: "{{perceArmure=^{perce-armure} @{perceArmureValue}}}"});
                                
                            if(reaction == "{{reaction=Réaction @{reactionValue}}}")
                                setAttrs({[listDistance+"_"+id+"_"+"reaction"]: "{{reaction=^{reaction} @{reactionValue}}}"});
                                
                            if(jumelage == "{{jumelage=Jumelage (@{jumelageValue})}}")
                                setAttrs({[listDistance+"_"+id+"_"+"jumelage"]: "{{jumelage=^{jumelage} (@{jumelageValue})}}"});
                                
                            if(lourd == "{{lourd=Lourd}}")
                                setAttrs({[listDistance+"_"+id+"_"+"lourd"]: "1"});
                                
                            var porteeAutre = v[listDistance+"_"+id+"_armeAutrePortee"];
                            
                            if(porteeAutre == "Contact")
                            {
                                setAttrs({[listDistance+"_"+id+"_armeAutrePortee"]: "^{portee-contact}"});
                            }
                            
                            if(porteeAutre == "Courte")
                            {
                                setAttrs({[listDistance+"_"+id+"_armeAutrePortee"]: "^{portee-courte}"});
                            }
                            
                            if(porteeAutre == "Moyenne")
                            {
                                setAttrs({[listDistance+"_"+id+"_armeAutrePortee"]: "^{portee-moyenne}"});
                            }
                            
                            if(porteeAutre == "Longue")
                            {
                                setAttrs({[listDistance+"_"+id+"_armeAutrePortee"]: "^{portee-longue}"});
                            }
                            
                            if(porteeAutre == "Lointaine")
                            {
                                setAttrs({[listDistance+"_"+id+"_armeAutrePortee"]: "^{portee-lointaine}"});
                            }	
                            
                            var porteeCaC = v[listDistance+"_"+id+"_armeCaCPortee"];
                            
                            if(porteeCaC == "Contact")
                            {
                                setAttrs({[listDistance+"_"+id+"_armeCaCPortee"]: "^{portee-contact}"});
                            }
                            
                            if(porteeCaC == "Courte")
                            {
                                setAttrs({[listDistance+"_"+id+"_armeCaCPortee"]: "^{portee-courte}"});
                            }
                            
                            if(porteeCaC == "Moyenne")
                            {
                                setAttrs({[listDistance+"_"+id+"_armeCaCPortee"]: "^{portee-moyenne}"});
                            }
                            
                            if(porteeCaC == "Longue")
                            {
                                setAttrs({[listDistance+"_"+id+"_armeCaCPortee"]: "^{portee-longue}"});
                            }
                            
                            if(porteeCaC == "Lointaine")
                            {
                                setAttrs({[listDistance+"_"+id+"_armeCaCPortee"]: "^{portee-lointaine}"});
                            }
                            
                            var portee = v[listDistance+"_"+id+"_armeDistPortee"];
                            
                            if(portee == "Contact")
                            {
                                setAttrs({[listDistance+"_"+id+"_armeDistPortee"]: "^{portee-contact}"});
                            }
                            
                            if(portee == "Courte")
                            {
                                setAttrs({[listDistance+"_"+id+"_armeDistPortee"]: "^{portee-courte}"});
                            }
                            
                            if(portee == "Moyenne")
                            {
                                setAttrs({[listDistance+"_"+id+"_armeDistPortee"]: "^{portee-moyenne}"});
                            }
                            
                            if(portee == "Longue")
                            {
                                setAttrs({[listDistance+"_"+id+"_armeDistPortee"]: "^{portee-longue}"});
                            }
                            
                            if(portee == "Lointaine")
                            {
                                setAttrs({[listDistance+"_"+id+"_armeDistPortee"]: "^{portee-lointaine}"});
                            }
                            
                            var pDruid = v[listDistance+"_"+id+"_porteeDruidLion"];
                            
                            if(pDruid == "Contact")
                            {
                                setAttrs({[listDistance+"_"+id+"_porteeDruidLion"]: "^{portee-contact}"});
                            }
                            
                            if(pDruid == "Courte")
                            {
                                setAttrs({[listDistance+"_"+id+"_porteeDruidLion"]: "^{portee-courte}"});
                            }
                            
                            if(pDruid == "Moyenne")
                            {
                                setAttrs({[listDistance+"_"+id+"_porteeDruidLion"]: "^{portee-moyenne}"});
                            }
                            
                            if(pDruid == "Longue")
                            {
                                setAttrs({[listDistance+"_"+id+"_porteeDruidLion"]: "^{portee-longue}"});
                            }
                            
                            if(pDruid == "Lointaine")
                            {
                                setAttrs({[listDistance+"_"+id+"_porteeDruidLion"]: "^{portee-lointaine}"});
                            }
                        });
                        
                    });
                });
            });
            
            var majSimple = ["pS", "pSC", "mE","mEC"];
            
            _.each(majSimple,function(listDistanceSimple) 
            {
                getAttrs([listDistanceSimple+"barrage", listDistanceSimple+"chargeur", listDistanceSimple+"choc", listDistanceSimple+"defense", listDistanceSimple+"degatContinue", listDistanceSimple+"dispersion", listDistanceSimple+"lumiere", listDistanceSimple+"parasitage", listDistanceSimple+"penetrant", listDistanceSimple+"perceArmure", listDistanceSimple+"reaction", listDistanceSimple+"jumelage", listDistanceSimple+"lourd"], function (v) 
                {													
                    var barrage = v[listDistanceSimple+"barrage"];
                    var chargeur = v[listDistanceSimple+"chargeur"];
                    var choc = v[listDistanceSimple+"choc"];
                    var defense = v[listDistanceSimple+"defense"];
                    var degatContinue = v[listDistanceSimple+"degatContinue"];
                    var dispersion = v[listDistanceSimple+"dispersion"];
                    var lumiere = v[listDistanceSimple+"lumiere"];
                    var parasitage = v[listDistanceSimple+"parasitage"];
                    var penetrant = v[listDistanceSimple+"penetrant"];
                    var pa = v[listDistanceSimple+"perceArmure"];
                    var reaction = v[listDistanceSimple+"reaction"];
                    var jumelage = v[listDistanceSimple+"jumelage"];
                    var lourd = v[listDistanceSimple+"lourd"];
                    
                    if(barrage == "{{barrage=Barrage @{"+listDistanceSimple+"barrageValue}}} ")
                        setAttrs({[listDistanceSimple+"barrage"]: "{{barrage=^{barrage} @{"+listDistanceSimple+"barrageValue}}} "});
                        
                    if(chargeur == "{{chargeur=Chargeur @{"+listDistanceSimple+"chargeurValue}}} ")
                        setAttrs({[listDistanceSimple+"chargeur"]: "{{chargeur=^{chargeur} @{"+listDistanceSimple+"chargeurValue}}} "});
                        
                    if(choc == "{{choc=Choc @{"+listDistanceSimple+"chocValue}}}")
                        setAttrs({[listDistanceSimple+"choc"]: "{{choc=^{choc} @{"+listDistanceSimple+"chocValue}}}"});
                        
                    if(defense == "{{defense=Défense @{"+listDistanceSimple+"defenseValue}}}")
                        setAttrs({[listDistanceSimple+"defense"]: "{{defense=^{defense} @{"+listDistanceSimple+"defenseValue}}}"});
                        
                    if(degatContinue == "{{degatContinus=Dégâts Continus @{"+listDistanceSimple+"degatContinueValue} ([[1D6]] Tours)}}")
                        setAttrs({[listDistanceSimple+"degatContinue"]: "{{degatContinus=^{degats-continus} @{"+listDistanceSimple+"degatContinueValue} ([[1D6]] ^{tours})}}"});
                        
                    if(dispersion == "{{dispersion=Dispersion @{"+listDistanceSimple+"dispersionValue}}} ")
                        setAttrs({[listDistanceSimple+"dispersion"]: "{{dispersion=^{dispersion} @{"+listDistanceSimple+"dispersionValue}}} "});
                        
                    if(lumiere == "{{lumiere=Lumière @{"+listDistanceSimple+"lumiereValue}}}")
                        setAttrs({[listDistanceSimple+"lumiere"]: "{{lumiere=^{lumiere} @{"+listDistanceSimple+"lumiereValue}}}"});
                        
                    if(parasitage == "{{parasitage=Parasitage @{"+listDistanceSimple+"parasitageValue}}}")
                        setAttrs({[listDistanceSimple+"parasitage"]: "{{parasitage=^{parasitage} @{"+listDistanceSimple+"parasitageValue}}}"});
                        
                    if(penetrant == "{{penetrant=Pénétrant @{"+listDistanceSimple+"penetrantValue}}}")
                        setAttrs({[listDistanceSimple+"penetrant"]: "{{penetrant=^{penetrant} @{"+listDistanceSimple+"penetrantValue}}}"});
                        
                    if(pa == "{{perceArmure=Perce Armure @{"+listDistanceSimple+"perceArmureValue}}}")
                        setAttrs({[listDistanceSimple+"perceArmure"]: "{{perceArmure=^{perce-armure} @{"+listDistanceSimple+"perceArmureValue}}}"});
                        
                    if(reaction == "{{reaction=Réaction @{"+listDistanceSimple+"reactionValue}}}")
                        setAttrs({[listDistanceSimple+"reaction"]: "{{reaction=^{reaction} @{"+listDistanceSimple+"reactionValue}}}"});
                        
                    if(jumelage == "{{jumelage=Jumelage (@{"+listDistanceSimple+"jumelageValue})}}")
                        setAttrs({[listDistanceSimple+"jumelage"]: "{{jumelage=^{jumelage} (@{"+listDistanceSimple+"jumelageValue})}}"});
                        
                    if(lourd == "{{lourd=Lourd}}")
                        setAttrs({[listDistanceSimple+"lourd"]: "1"});
                });
            });
        
            getAttrs(["rangerArmePortee", "rangerChoc", "rangerDegatContinue", "rangerPerceArmure", "rangerDispersion", "rangerLumiere", "rangerPenetrant", "rangerPerceArmure60", "rangerPenetrant10", "rangerPenetrant10", "ranger50PG3"], function (v) 
            {							
                var rangerChoc = v["rangerChoc"];
                var degatsContinus = v["rangerDegatContinue"];
                var pa = v["rangerPerceArmure"];
                var dispersion = v["rangerDispersion"];
                var lumiere = v["rangerLumiere"];
                var penetrant = v["rangerPenetrant"];
                var pa60 = v["rangerPerceArmure60"];
                var penetrant10 = v["rangerPenetrant10"];
                var PG = v["ranger50PG3"];
                
                if(rangerChoc == "{{choc=Choc @{rangerChocValue}}}")
                    setAttrs({["rangerChoc"]: "{{choc=^{choc} @{rangerChocValue}}}"});
                
                if(degatsContinus == "{{degatContinus=Dégâts Continus @{rangerDegatContinueValue} ([[1D6]] ^{tours})}}")
                    setAttrs({["rangerDegatContinue"]: "{{degatContinus=^{degats-continus} @{rangerDegatContinueValue} ([[1D6]] ^{tours})}}"});
                
                if(pa == "{{perceArmure=Perce Armure @{rangerPerceArmureValue}}}")
                    setAttrs({["rangerPerceArmure"]: "{{perceArmure=^{perce-armure} @{rangerPerceArmureValue}}}"});
                    
                if(dispersion == "{{dispersion=Dispersion @{rangerDispersionValue}}}")
                    setAttrs({["rangerDispersion"]: "{{dispersion=^{dispersion} @{rangerDispersionValue}}}"});
                    
                if(lumiere == "{{lumiere=Lumière @{rangerLumiereValue}}}")
                    setAttrs({["rangerLumiere"]: "{{lumiere=^{lumiere} @{rangerLumiereValue}}}"});
                    
                if(penetrant == "{{penetrant=Pénétrant @{rangerPenetrantValue}}}")
                    setAttrs({["rangerPenetrant"]: "{{penetrant=^{penetrant} @{rangerPenetrantValue}}}"});
                    
                if(pa60 == "{{perceArmure=Perce Armure @{rangerPerceArmure60Value}}}")
                    setAttrs({["rangerPerceArmure60"]: "{{perceArmure=^{perce-armure} @{rangerPerceArmure60Value}}}"});
                    
                if(penetrant10 == "{{penetrant=Pénétrant @{rangerPenetrant10Value}}}")
                    setAttrs({["rangerPenetrant10"]: "{{penetrant=^{penetrant} @{rangerPenetrant10Value}}}"});
                    
                if(PG == "{{rangerEvol=50PG3}}")
                    setAttrs({["ranger50PG3"]: "1"});
                    
                var portee = v["rangerArmePortee"];
                    
                if(portee == "Moyenne")
                {
                    setAttrs({["rangerArmePortee"]: "^{portee-moyenne}"});
                }
                
                if(portee == "Longue")
                {
                    setAttrs({["rangerArmePortee"]: "^{portee-longue}"});
                }
                
                if(portee == "Lointaine")
                {
                    setAttrs({["rangerArmePortee"]: "^{portee-lointaine}"});
                }
            });
        
            setAttrs({["version"]: 16});
        }

        if(version < 17) {
            setAttrs({
                caracteristique1: "0",
                caracteristique2: "0",
                caracteristique3: "0",
                caracteristique4: "0",
                caracteristique1Art: "0",
                caracteristique2Art: "0",
                caracteristique3Art: "0",
                caracteristique4Art: "0",
                caracteristiqueTotem1: "0",
                caracteristiqueTotem2: "0",
                caracteristiqueTotem3: "0",
                MALCaracteristiqueTotem1: "0",
                MALCaracteristiqueTotem2: "0",
                caracteristique1Priest:"@{technique}",
                caracteristique1Psion:"@{aura}",
                aspectDruidLionBase:"druidLionChair",
                MALAspectDruidLionBase:"MALDruidLionChair",
                caracteristique1Monk: "0",
                caracteristique2Monk: "0",
                poingCaCPortee: "^{portee-contact}",
                poingCcaracteristique1Equipement: "0",
                poingCcaracteristique2Equipement: "0",
                poingCcaracteristique3Equipement: "0",
                poingCcaracteristique4Equipement: "0",
                poingMACcaracteristique1Equipement: "0",
                poingMACcaracteristique2Equipement: "0",
                poingMACcaracteristique3Equipement: "0",
                poingMACcaracteristique4Equipement: "0",
                pSCcaracteristique1Equipement: "0",
                pSCcaracteristique2Equipement: "0",
                pSCcaracteristique3Equipement: "0",
                pSCcaracteristique4Equipement: "0",
                pSCcaracteristiqueSPrecis: "0",
                mECcaracteristique1Equipement: "0",
                mECcaracteristique2Equipement: "0",
                mECcaracteristique3Equipement: "0",
                mECcaracteristique4Equipement: "0",
                mECcaracteristiqueSPrecis: "0",
                pScaracteristique1Equipement: "0",
                pScaracteristique2Equipement: "0",
                pScaracteristique3Equipement: "0",
                pScaracteristique4Equipement: "0",
                mEcaracteristique1Equipement: "0",
                mEcaracteristique2Equipement: "0",
                mEcaracteristique3Equipement: "0",
                mEcaracteristique4Equipement: "0",
                utilisationArmeAI:"&{template:combat} {{portee=^{portee-contact}}}",
                utilisationArmeAIPNJ:"&{template:combat} {{portee=^{portee-contact}}}",
                caracteristique1Grenade:"0",
                caracteristique2Grenade:"0",
                caracteristique3Grenade:"0",
                caracteristique4Grenade:"0",
                caracteristique1MA: "0",
                caracteristique2MA: "0",
                caracteristique3MA: "0",
                caracteristique4MA: "0",
                MAUtilisationArmeAI: "&{template:mechaArmure} {{special1=@{mechaArmureNom}}} {{portee=^{portee-contact}}}",
                canonMagmaCaracteristique1:"0",
                canonMagmaCaracteristique2:"0",
                canonMagmaCaracteristique3:"0",
                canonMagmaCaracteristique4:"0",
                MSurturCaracteristique1:"0",
                MSurturCaracteristique2:"0",
                MSurturCaracteristique3:"0",
                MSurturCaracteristique4:"0",
                DSouffleCaracteristique1:"0",
                DSouffleCaracteristique2:"0",
                DSouffleCaracteristique3:"0",
                DSouffleCaracteristique4:"0",
                caracteristiqueWraith1:"0",
                caracteristiqueWraith2:"0",
                caracteristiqueWraith3:"0",
                caracteristiqueWraith4:"0",
                APoingsCaracteristique1:"0",
                APoingsCaracteristique2:"0",
                APoingsCaracteristique3:"0",
                APoingsCaracteristique4:"0",
                LCGCaracteristique1:"0",
                LCGCaracteristique2:"0",
                LCGCaracteristique3:"0",
                LCGCaracteristique4:"0",
                aspectPNJ:"0",
                pSCAspectPNJ:"0",
                mECAspectPNJ:"0",
                pSAspectPNJ:"0",
                mEAspectPNJ:"0",
                aspectPNJGrenade:"0",
                version:17,
            });
        }
    });
});