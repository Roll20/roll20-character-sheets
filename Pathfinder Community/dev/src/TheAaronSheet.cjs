/* ---- BEGIN: TheAaronSheet.js ---- */
// Github:   https://github.com/shdwjk/TheAaronSheet/blob/master/TheAaronSheet.js
// By:       The Aaron, Arcane Scriptomancer
// Contact:  https://app.roll20.net/users/104025/the-aaron

var TAS = TAS || (function(){
    'use strict';

    var version = '0.2.5',
        lastUpdate = 1504710542,

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
		queuedUpdates = {}, //< Used for delaying saves till the last moment.

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
            /* eslint-disable no-console */
            console.log(
                '%c '+label+': %c '+message + ' ',
                'background-color: '+lBGColor+';color: '+lTxtColor+'; font-weight:bold;',
                'background-color: '+mBGColor+';color: '+mTxtColor+';'
            ); 
            /* eslint-enable no-console */
        };
        return function(){
            if('TAS'===key || config.logging[key]){
                /* eslint-disable no-console */
               dataLogger(coloredLoggerFunction,function(m){console.log(m);},_.toArray(arguments)); 
                /* eslint-enable no-console */
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
    
    isDebugMode = function(){
        return config.debugMode;
    },

    debugMode = function(){
        config.logging.debug=true;
        config.debugMode = true;
    },

    getCallstack = function(){
        var e = new Error('dummy'),
            stack = _.map(_.rest(e.stack.replace(/^[^(]+?[\n$]/gm, '')
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
                    "var start,end;"+
                    "TASlog('Entering: '+(cb.name||'(anonymous function)'));"+
                    "start=_.now();"+
                    "cb.apply(ctx||{},arguments);"+
                    "end=_.now();"+
                    "TASlog('Exiting: '+(cb.name||'(anonymous function)')+' :: '+(end-start)+'ms elapsed');"+
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
			writable: false,
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

    /* eslint-disable no-console */
	console.log('%c•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸  The Aaron Sheet  v'+version+'  ¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•','background: linear-gradient(to right,green,white,white,green); color:black;text-shadow: 0 0 8px white;');
	console.log('%c•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸  Last update: '+(new Date(lastUpdate*1000))+'  ¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•','background: linear-gradient(to right,green,white,white,green); color:black;text-shadow: 0 0 8px white;');
    /* eslint-enable no-console */


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
        isDebugMode: isDebugMode,
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

