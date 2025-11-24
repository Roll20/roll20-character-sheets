/*jshint esversion: 6 */
'use strict';
import _ from 'underscore';
import TAS from './TheAaronSheet.js';
import * as ExExp from './ExExp';
TAS.config({
 logging: {
   info: process.env.NODE_ENV !== 'production',
   debug: process.env.NODE_ENV !== 'production'
 }
});
if (process.env.NODE_ENV !== 'production') {
  TAS.debugMode();
}
/********************* SWUTILS  (sheetworker utils) **********************************
 * These general utilities are for sheetworker use, they have no dependency on pathfinder rules or
 * the pathfinder sheet or constants
 * except for evaluateAndSetNumber which appends "_error" to a field name and sets it if an error is encountered
 *
 * In addition this provides wrapper / interface to ExExp which we kept mostly as-is so that if
 * the ExtendedExpressions author made updates we could drop it in
 *
 ********************************************************************************/

/** Wrapper to setAttrs, prints out if NaN is ever set as a debugging tool
 * @param {Map} a first param sent to setAttrs
 * @param {Map} b second param sent to setAttrs
 * @param {function} c third param sent to setAttrs
 */
export function setWrapper(a,b,c){
	var bad=false;
	_.each(a,function(v,k){
	 	if (v!=='' && !v && (isNaN(v) || v === undefined)){
			a[k]="";
	 		TAS.warn("#####################################","Setting NaN or undefined for attribute: "+k+" resetting to '' ","#####################################");
	 		bad=true;
	 	}
	});
	setAttrs(a,b,c);
}
/** wrapper for getAttrs
 * @param {[string]} a first param to getAttrs
 * @param {function} cb second param to getAttrs
 */
export var getWrapper = TAS.callback(function callGetAttrs(a,cb){
	getAttrs(a,function(vals){
		cb(vals);
	});
});
/** wrapper for getTranslationByKey, if error encountered returns string passed in
 * @param {string} str
 */
export function getTranslated (str){
	var tempstr='';
	try{
		if(str){
			tempstr=getTranslationByKey(str);
			if(!tempstr){
				tempstr =str[0].toUpperCase()+str.slice(1);
			}
		}
	} catch(e){
		TAS.error("getTranslationByKey error translating: "+str,e);
		tempstr=str[0].toUpperCase()+str.slice(1);
	} finally {
		return tempstr;
	}
}

/** Determines if string can be evaluated to a number
 * ensures:  no macro calls, dropdowns, or keep highest/lowest more than 1
 * allows: floor, abs, kh1, kl1,  ceil, round, max, min
 * you must call this AFTER calling findAndReplaceFields so all variables are replaced with numbers
 *@param {string} preeval string to examine
 *@returns {boolean} true if string will evaluate to a number.
 */
function validNumericStr(preeval) {
	var anyIllegal = preeval.match(/\||\?|&|\{|\}|k[h,l][^1]/);
	if (anyIllegal) {
		return false;
	}
	anyIllegal = preeval.replace(/floor|ceil|round|abs|max|min|kh1|kl1/g, '');
	anyIllegal = anyIllegal.match(/[a-zA-Z]/);
	if (anyIllegal) {
		return false;
	}
	return true;
}
/** searches a string for any @{attribute} and replaces with values of those attributes
 * passes result to the callback
 * if error encountered then passes null
 * recursive: if replace str also has @{attribute} references then call this function again
 * @param {string} stringToSearch = string containing one or more @{fieldname}
 * @param {function(string)} callback when done passes resulting string to callback
 */
export function findAndReplaceFields(stringToSearch, callback) {
	var fieldnames ;
	if (typeof callback !== "function") {
		TAS.error("findAndReplaceFields called with no callback function");
		return;
	}
	if (!stringToSearch) {
		TAS.warn("findAndReplaceFields called with no string, return null");
		callback(null);
		return;
	}
	try {
		stringToSearch = stringToSearch.split("selected|").join("");
		stringToSearch = stringToSearch.split("target|").join("");
		stringToSearch = stringToSearch.replace(/\|max\}/g,'_max}');
		fieldnames = stringToSearch.match(/\@\{[^}]+\}/g);
		if (!fieldnames) {
			callback(stringToSearch);
			return;
		}
		fieldnames=fieldnames.sort();
		fieldnames = _.uniq(fieldnames,true);
		fieldnames = _.map(fieldnames,function(field){
			return field.slice(2,-1);
		});
		getAttrs(fieldnames, function (values) {
			var evalstr = stringToSearch, innermatches=null,initialsplit;
			try {
				_.each(fieldnames,function(field){
					//evalstr = evalstr.replace(  new RegExp(escapeForRegExp('@{'+field+'}'),'g'), values[field]);
					initialsplit = evalstr.split('@{'+field+'}');
					evalstr = initialsplit.join(values[field]);
				});
				innermatches=evalstr.match(/\@\{[^}]+\}/g);
			} catch (err2) {
				TAS.error("SWUtils.findAndReplaceFields err2", err2);
				evalstr = null;
			} finally {
				//if more matches then call recursively
				if (innermatches) {
					findAndReplaceFields(evalstr,callback);
				} else {
					callback(evalstr);
				}
			}
		});
	} catch (err) {
		TAS.error("SWUtils.findAndReplaceFields", err);
		callback(null);
	}
}
/** Replaces kl1 and kh1 with min and max. This ensures users can use kl1 and kh1
 * @example replaces {x,y}kh1 with min(x,y)
 * @param {string} str the string to search
 * @returns {string} the resultant string after performing the replace
 */
function convertKL1KH1toMinMax(str) {
    const minMaxConverter = {
        kl:'min',
        kh:'max'
    }
		function replaceString() {
			str = str.replace(/([^@%]|^){((?:[^{]|[%@]{)+?)}(k[hl])\d+/g, (match, p1, p2, p3) => {
				return p1 + minMaxConverter[p3] + '(' + p2 + ')';
			});
		}
    //TAS.debug("at convertKL1KH1toMinMax for "+str) ;
    if (str) {
        while (/([^@%]|^){((?:[^{]|[%@]{)+?)}(k[hl])\d+/.test(str)){
			// 			moved this function out of loop
      //      str = str.replace(/([^@%]|^){((?:[^{]|[%@]{)+?)}(k[hl])\d+/g,(match,p1,p2,p3)=>{
      //          return p1+minMaxConverter[p3]+'('+p2+')';
      //      });
				replaceString();
    TAS.log('str: '+str);
        }
    }
    return str;
}
/** Ensures every instance of begin brack has a matching end brack. ONLY counts amount of them
 * does not ensure they are nested correctly
 * @param {string} str the equation to pass in
 */
function validateMatchingParens(str){
	if ((str.match(/\(/g) || []).length !== (str.match(/\)/g) || []).length ||
		(str.match(/\{/g) || []).length !== (str.match(/\}/g) || []).length ||
		(str.match(/\[/g) || []).length !== (str.match(/\]/g) || []).length ) {
			return 0;
	}
	return 1;
}

/** Reads in the string, evaluates it to a single number, passes that number to a callback
 * if expression is blank then pass 0 back
 * If error is encountered then call errcallback
 *@param {string} exprStr A string containing a mathematical expression, possibly containing references to fields such as @{myfield}
 *@param {function(Number)} callback a function taking one parameter - always Number, could be 0 but never null or undefined
 *@param {function} errcallback function called if it cannot evaluate to a number
 */
export function evaluateExpression (exprStr, callback, errcallback) {
	var value;
	//TAS.debug("evaluateExpression: expstr:"+exprStr);
	if (typeof callback !== "function") {
		return;
	}
	if (exprStr === "" || exprStr === null || exprStr === undefined) {
		callback(0);
		return;
	}
	//quick shortcut, if the string is just a number then pass it back
	value = Number(exprStr);
	if (!isNaN(value)) {
		callback(value);
		return;
	}
	if(!validateMatchingParens(exprStr)){
		TAS.warn("evaluateExpression: Mismatched brackets, cannot evaluate:" + exprStr);
		errcallback(null);
		return;
	}
	findAndReplaceFields(exprStr, function (replacedStr) {
		var evaluated;
		//TAS.debug("search and replace of " + exprStr + " resulted in " + replacedStr);
		if (replacedStr === null || replacedStr === undefined) {
			callback(0);
			return;
		}
		try {
			//convert double square brackets to parens
			replacedStr = replacedStr.replace(/\s+/g, '').replace(/\[\[/g, "(").replace(/\]\]/g, ")");
			//delete any notes (words between brackets)
			replacedStr = replacedStr.replace(/\[[^\]]+\]/g,'');
			replacedStr = convertKL1KH1toMinMax(replacedStr);
			//TAS.debug("replacedStr is now "+replacedStr);
			if ( !validNumericStr(replacedStr)){
				TAS.warn("cannot evaluate this to number: " + exprStr +" came back with " + replacedStr);
				errcallback(null);
			}
			if (replacedStr === "" || replacedStr === null || replacedStr === undefined) {
				callback(0);
				return;
			}
			//shortcut (same as above), if end result is a number then send that back
			evaluated = Number(replacedStr);
			if (!isNaN(evaluated) && isFinite(replacedStr)) {
				callback(evaluated);
				return;
			}
			//finally try to evaluate the equation to a number
			evaluated = ExExp.handleExpression(replacedStr);
			//TAS.debug("At SWUtils evaluate expressions, it is: "+replacedStr+", which evaluates to "+ evaluated);
			if (!isNaN(evaluated)) {
				callback(evaluated);
			} else {
				TAS.warn("cannot evaluate this to number: " + exprStr +" came back with " + replacedStr);
				errcallback(null);
			}
		} catch (err3) {
			TAS.error("error trying to convert to number:" + err3);
			errcallback(null);
		}
	});
}
/** Evaluates equation in readField, set the value to writeField
 * if we cannot, then set readField_error attribute to 1 to indicate an error
 * TODO: move this to PFUtilsAsync! (because it sets error value it is a PF specific function)
 *
 * @param {string} readField= field to read containing string to parse
 * @param {string} writeField= field to write to
 * @param {number} defaultVal= optional, default to set if we cannot evaluate the field. If not supplied assume 0
 * @param {function(newval, oldval, ischanged)} callback - function(newval, oldval, ischanged)
 * @param {boolean} silently if true set new val with {silent:true}
 * @param {function(newval, oldval, ischanged)} errcallback  call if there was an error parsing string function(newval, oldval, ischanged)
 */
export function evaluateAndSetNumber(readField, writeField, defaultVal, callback, silently, errcallback) {
	var done = function (a, b, c,currError) {
		var donesetter={};
		if (currError){
			donesetter[writeField+'_error']=0;
			setAttrs(donesetter,{silent:true});
		}
		if (typeof callback === "function") {
			callback(a, b, c);
		}
	},
	errordone = function(a,b,c,currError){
		var donesetter={};
		//TAS.debug("leaving set of "+ writeField+" with old:"+b+", new:"+c+" is changed:"+ c+" and curreerror:"+currError);
		if (!currError){
			donesetter[writeField+'_error']=1;
			setAttrs(donesetter,{silent:true});
		}
		if (typeof errcallback === "function") {
			errcallback(a, b, c);
		} else if (typeof callback === "function") {
			callback(a, b, c);
		}
	};
	//TAS.debug("evaluateAndSetNumber about to get "+readField);
	getAttrs([readField, writeField, writeField+"_error"], function (v) {
		var params = {},
		trueDefault=0,
		currVal=0,
		isError=0,
		currError=0;
		try {
			//TAS.debug("evaluateAndSetNumber values are ",v);
			if (silently){params.silent=true;}
			currError= parseInt(v[writeField+"_error"],10)||0;
			trueDefault = defaultVal || 0;
			currVal = parseInt(v[writeField], 10);
			evaluateExpression(v[readField], function (value) {
				var setter={};
				//TAS.debug("evaluateExpression returned with number "+value);
				//Use double equals not triple here! triple results in incorrect falsey readings
				//changed to 2 equals and flip so value2 on left.
				if (isNaN(currVal) || value != currVal) {
					setter[writeField] = value;
					setWrapper(setter, params, function () { done(value, currVal, true,currError)});
				} else {
					done(value, currVal, false,currError);
				}
			}, function(){
				var setter={};
				//only double equals not triple! important!
				if (isNaN(currVal) || trueDefault != currVal) {
					setter[writeField] = trueDefault;
					setWrapper(setter, params, function () { errordone(trueDefault, currVal, true,currError)});
				} else {
					errordone(trueDefault,currVal,false,currError);
				}
			});
		} catch (err) {
			TAS.error("SWUtils.evaluateAndSetNumber", err);
			errordone(0,0,0,0);
		}
	});
}
/** Evaluates expression in exprStr, and adds addVal to it, then sets to writeField. This allows you to
 * evaluate an expression and add something else to it before writing.
 * Used in pathfinder sheet for buffs to custom attributes
 * @param {function} callback  when done
 * @param {boolean} silently if call setAttrs with silent:true
 * @param {string} exprStr  string to evaluate
 * @param {string} writeField field to write with evaluated result
 * @param {string|number} currVal current value of expression
 * @param {string|number} addVal value to add
 */
export function evaluateAndAdd(callback,silently,exprStr,writeField,currVal,addVal){
	var done = function(){
		if (typeof callback === "function"){
			callback();
		}
	};
	evaluateExpression(exprStr,function(newVal){
		var curr = parseInt(currVal,10)||0,
		addn = parseInt(addVal,10)||0,
		newPlus = 0,
		params={}, setter={};
		newVal = parseInt(newVal,10)||0;
		newPlus = newVal + addn;
		//TAS.debug("SWUTILS.EVALUATE AND ADD "+exprStr+" IS "+ newVal +" so add "+ addn+" to get "+newPlus);
		if(newPlus !== curr){
			setter[writeField]=newPlus;
			if(silently){
				params={silent:true};
			}
			setWrapper(setter,params,done);
		} else {
			done();
		}
	},function(){
		TAS.warn("SWUtils.evaluateAndAdd error returned evaluating "+exprStr);
		done();
	});
}
/** Calls evaluateAndAdd if you don't have the value to add yet (addVal)
 *
 * @param {function} callback
 * @param {boolean} silently
 * @param {string} readField
 * @param {string} writeField
 * @param {string} addField
 */
export function evaluateAndAddAsync(callback,silently,readField,writeField,addField){
	getAttrs([readField,writeField,addField],function(v){
		evaluateAndAdd(callback,silently,v[readField],writeField,v[writeField],v[addField]);
	});
}
/** Evaluates expression in exprStr, if different than current, add to the tot field
 * use to evaluate misc mod and quickly update what they apply to or not
 *
 * @param {function} callback  when done
 * @param {boolean} silently if rrue call setAttrs for totField with silent:true
 * @param {string} exprStr  string to evaluate
 * @param {string} writeField field to write with evaluated result SILENTLY no matter what (so we don't loop)
 * @param {string|number} currVal current value of expression
 * @param {string} totField total field to apply difference to
 * @param {string|number} totVal current total value
 */
export function evaluateAndAddToTot(callback,silently,exprStr,writeField,currVal,totField,totVal){
	var done = function(){
		if (typeof callback === "function"){
			callback();
		}
	};
	evaluateExpression(exprStr,function(newVal){
		var params={},silentSetter={},
		setter={};
		currVal = parseInt(currVal,10)||0;
		newVal = parseInt(newVal,10)||0;
		if(newVal !== currVal ){
			if(!silently){
				silentSetter[writeField]=newVal;
				setWrapper(silentSetter,{silent:true});
			} else {
				setter[writeField]=newVal;
				params={silent:true};
			}
			totVal=parseInt(totVal,10)||0;
			totVal += (newVal - currVal);
			setter[totField] = totVal;
			setWrapper(setter,params,done);
		} else {
			done();
		}
	},done);
}
/** calls evaluateAndAddToTot if you don't have the values of the 3 attributes. perfect for misc fields
 *
 * @param {function} callback
 * @param {boolean} silently
 * @param {string} readField
 * @param {string} writeField
 * @param {string} totField
 */
export function evaluateAndAddToTotAsync(callback,silently,readField,writeField,totField){
	getAttrs([readField,writeField,totField],function(v){
		evaluateAndAddToTot(callback,silently,v[readField],writeField,v[writeField],totField,v[totField]);
	});
}
/** Gets value of a dropdown. If 'dual' then 0, or if it starts with a 0 then retrun 0
 * if blank then return ''
 * otherwise return the value
 * @param {string} fieldToFind the VALUE of the dropdown attribute
 * @param {function} synchrousFindAttributeFunc optional, pass the fieldToFind to this and return the result.
 *
 */
function getDropdownSetting(fieldToFind,synchrousFindAttributeFunc){
	var foundField = "";
	//TAS.debug("finding dropdown values are ",values);
	if ( fieldToFind === "0" || fieldToFind === 0 || fieldToFind === "dual" || (fieldToFind && fieldToFind["0"] === 0)) {
		//select = none
		return 0;
	} else if (!fieldToFind ) {
		return ""
	} else {
		if(synchrousFindAttributeFunc){
			foundField = synchrousFindAttributeFunc(fieldToFind);
		} else {
			//TAS.debug("function is null so set field to "+fieldToFind);
			foundField = fieldToFind;
		}
		return foundField
	}
}
/** Reads dropdown value and passes via callback
 * determines attribute referenced, gets that attribute value, passes it to callback.
 * similar to evaluateAndSetNumber but uses a synchronus function to perform search and replace, and assumes the string is only one value not an expression.
 * necessary because some dropdowns have other text in the dropdowns, so we can't use the dropdown value exactly as is.
 * called by setDropdownValue
 * @param {string} readField the attribute name of dropdown we are looking at
 * @param {function} synchrousFindAttributeFunc reads in the value of the dropdown field, and returns the exact name of the attribute to look up (since some dropdowns have other text in value)
 * @param {function(int)} callback pass the value the dropdown selection represents
 *   exceptions: if readField is not found pass in "", if readField is 0 or starts with 0 pass in 0.
 */
export function getDropdownValue (readField, synchrousFindAttributeFunc, callback) {
	if (!readField || (callback && typeof callback !== "function") ) {
		return;
	}
	getAttrs([readField], function (values) {
		var foundField=getDropdownSetting(values[readField],synchrousFindAttributeFunc);
		if(foundField){
			getAttrs([foundField],function(v){
				var intVer = parseInt(v[foundField],10);
				if(isNaN(intVer)){
					callback(v[foundField]);
				} else {
					callback(intVer);
				}
			});
		} else {
			callback(foundField);
		}
		callback(foundField);
	});
}
/** Doesn't merely set a dropdown value but also adds that value to a total field
 *
 * @param {Number} newVal new value to set
 * @param {string} writeField the attributename representing the numeric val of the dropdown (usually dropdownname-mod)
 * @param {Number} currVal current value of writeField
 * @param {string} totField total field attributename
 * @param {Number} totVal current totField value
 * @param {function} callback optional call when done
 * @param {boolean} silently whether to call setAttr silently or not
 */
function setDropdownAndAddToTot(newVal,writeField,currVal,totField,totVal,callback,silently){
	var done = function(){
		if(typeof callback==="function"){
			callback();
		}
	},
	params={},silentSetter={},setter={};
	if(isNaN(newVal) || newVal === currVal){
		done();
	}
	if(!silently){
		silentSetter[writeField]=newVal;
		setWrapper(silentSetter,{silent:true});
	} else {
		setter[writeField]=newVal;
		params={silent:true};
	}
	totVal += (newVal - currVal);
	setter[totField] = totVal;
	setWrapper(setter,params,callback);
}
/** calls setDropdownAndAddToTot if you don't have the number values yet, gets them then calls it
*/
export function setDropdownAndAddToTotAsync(readField,writeField,totField,synchrousFindAttributeFunc,callback,silently){
	getAttrs([readField,writeField,totField],function(v){
		var foundField='',newVal=0,currVal=0,totVal=0;
		try {
			foundField = getDropdownSetting(v[readField],synchrousFindAttributeFunc);
			if(foundField){
				getAttrs([foundField],function(vi){
					var newVal=parseInt(vi[foundField],10)||0;
					setDropdownAndAddToTot(newVal,writeField,parseInt(v[writeField],10)||0,totField,parseInt(v[totField],10)||0,callback,silently);
				});
			} else {
				setDropdownAndAddToTot(foundField,writeField,parseInt(v[writeField],10)||0,totField,parseInt(v[totField],10)||0,callback,silently);
			}
		} catch (err){
			TAS.error("SWUtils.setDropdownAndAddToTot for read:"+readField+",write:"+writeField+",tot:"+totField,v,err);
			if (typeof callback==="function"){
				callback();
			}
		}
	});
}

/** Looks at a dropdown value, and sets writeField with the number to which selected option refers.
 * calls getDropdownValue
 * @example if readField = attribute_dropdown, and user selected the 'STR-mod' option, then set writeField with the value of STR-mod attribute
 * @param {string} readField the dropdown field
 * @param {string_or_Array} writeField Field to which to write the numerical value represented by readField
 * @param {function} synchrousFindAttributeFunc optional takes value of @readField and says what the lookup field is.
 *         necessary if your dropdown values have @{} around the names
 * @param {function(newval,old,changed)} callback (optional) call with what we set to writeField or not
 * @param {boolean} silently if true call setAttrs with {silent:true}
 */
export function setDropdownValue (readField, writeField, synchrousFindAttributeFunc, callback, silently) {
	var done = function (newval, currval, changed) {
		if (typeof callback === "function") {
			//TAS.notice("SWUtils.setDropdownValue returning new:"+newval+", old:"+currval+", changed:"+changed);
			callback(newval, currval, changed);
		}
	};
	getAttrs([readField],function(values){
		var foundField = '', params = {},fields=[];
		foundField = getDropdownSetting(values[readField],synchrousFindAttributeFunc);
		//TAS.debug("SWUtils.setDropdownValue from:"+readField+", to:"+writeFields+", after call to getDropdownValue returned with:"+foundField);
		if (silently) {params.silent=true;}
		fields =[writeField];
		if(foundField){
			fields.push(foundField);
		}
		//TAS.debug("SWUtils.setDropdownValue getting ",fields);
		getAttrs(fields, function (v) {
			var currValue = 0, valueOf=0, setter = {};
			if(foundField){
				valueOf = parseInt(v[foundField], 10) || 0;
			} else {
				valueOf =foundField;
			}
			currValue = parseInt(v[writeField], 10);
			//TAS.debug("setDropdownValue, v["+foundField+"]:" + v[foundField] + ", currValue:" + currValue + ", newValue:" + valueOf);
			if (currValue !== valueOf || isNaN(currValue)) {
				setter[writeField] = valueOf;
				setAttrs(setter, params, function () {
					done(valueOf, currValue, true);
				});
			} else {
				done(valueOf, currValue, false);
			}
		});
	});
}

/** getRowTotal return newvalue, currentvalue, allvalues in callback. Summed up floats and round total to int.
 * THIS IS SLOWER THAN DOING IT YOURSELF, just wrote to make things simpler.
 * @param {Array} fields array of field names to be added up, EXCEPT the first field which is ignored (at index 0) which is the total current value
 * @param {number} bonus a number that is added to the other fields.
 * @param {Array} penalties array of fieldnames whose values are to be subtracted from the total
 * @param {boolean} totalIsFloat true if we should not round the total to int.
 * @param {function(number,number)} callback call this with: new total, current total
 * @param {function} errorCallback call if error attempting to add.
 */
export function getRowTotal  (fields, bonus, penalties, totalIsFloat, callback, errorCallback) {
	var readFields;
	if (typeof callback !== "function" || typeof errorCallback !== "function") {
		return;
	}
	try {
		if (!fields || (!Array.isArray(fields)) || fields.length === 0) {
			return;
		}
		if (penalties && Array.isArray(penalties) && penalties.length > 0) {
			readFields = fields.concat(penalties);
		} else {
			readFields = fields;
		}
	} catch (err2) {
		TAS.error("SWUtils.getRowTotal catastrophic error: ", err2);
		errorCallback();
		return;
	}
	getAttrs(readFields, function (v) {
		var currValue = totalIsFloat ? parseFloat(v[fields[0]]) : parseInt(v[fields[0]], 10),
		newValue = 0,
		penalty = 0,
		i; //, setter = {}
		try {
			//remember start at 1
			for (i = 1; i < fields.length; i++) {
				newValue += parseFloat(v[fields[i]]) || 0;
			}
			if (bonus && !isNaN(parseInt(bonus, 10))) {
				newValue += parseFloat(bonus);
			}
			if (penalties) {
				for (i = 0; i < penalties.length; i++) {
					penalty += parseFloat(v[penalties[i]]) || 0;
				}
				newValue -= penalty;
			}
			if (!totalIsFloat) {
				newValue = Math.floor(newValue);
			}
			callback(newValue, currValue);
		} catch (err) {
			TAS.error("SWUtils.getRowTotal", err);
			errorCallback();
		}
	});
}
/** Adds up numbers and puts it in the first field of the fields array.
 * THIS IS SLOWER THAN DOING IT YOURSELF,
 * All numbers are added up as FLOATS, and then FLOOR is used to round the sum down
 * @param {Array} fields array of field names to be added up, EXCEPT the first field. fields[0] MUST be the total field
 * @param {number} bonus a number that is added to the other fields.
 * @param {Array} penalties array of fieldnames whose values are to be subtracted from the total
 * @param {boolean} totalIsFloat true if we should not round the total to int.
 * @param {function(number,number)} callback optional call this with two values: the new total, old total
 * @param {boolean} silently if true call setAttrs with {silent:true}
 */
export function updateRowTotal (fields, bonus, penalties, totalIsFloat, callback, silently, force) {
	var done = function () {
		if (typeof callback === "function") {
			callback();
		}
	};
	getRowTotal(fields, bonus, penalties, totalIsFloat, function (newValue, currValue) {
		var setter = {},
		params = {};
		if (force || newValue !== currValue) {
			setter[fields[0]] = newValue;
		}
		if (_.size(setter) > 0) {
			if (silently) {
				params.silent=true;
			}
			setAttrs(setter, params, done);
		} else {
			done();
		}
	}, done);
}
/** Escapes special chars for regex, so that a regex string can be turned into a RegExp object
 *@param {string} str the string to examine
 *@param {boolean} escapeSpaces if we should replace any tab or space with \s*
 *@returns {string} resultant string after search and replace
 */
export function escapeForRegExp  (str, escapeSpaces) {
	var regexEscapes = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|\~\!\@\#]/g,
	tempstr ='';
	if (str) {
		tempstr = str.replace(regexEscapes, "\\$&");
		if (escapeSpaces){
			//replace space plus multiple spaces with non escaped 0 or * space.
			tempstr = tempstr.replace(/\t+|\s+/g,'\\s*');
		}
	}
	return tempstr;
}
/** Escapes special chars for macros - to create sub queries
 * TODO: to make recursive should also escape & to &amp; for sub sub queries etc
 *@param {string} str the string to examine
 *@returns {string} resultant string after search and replace
 */
export function escapeForMacroCall  (str) {
	var macroCallEscapes = [ [/\{\{/g, '&#123;&#123;'],
		[/\}\}/g, '&#125;&#125;'],
		[/\(/g, '&#40;'],
		[/\)/g, '&#41;'],
		[/\,/g, '&#44;'],
		[/\?/g, '&#63;'],
		[/'/g, '&#39;'],
		[/"/g, '&#34;'],
		[/\=/g, '&#61;'] ];
	if (str) {
		return _.reduce(macroCallEscapes, function (currStr, pair) {
			return currStr.replace(pair[0], pair[1]);
		}, str);
	}
	return "";
}
/** Escapes '{{' for passing to a rolltemplate
 *@param {string} str the string to examine
 *@returns {string} resultant string after search and replace
 */
export function escapeForRollTemplate  (str) {
	if (!str){return str;}
	return str.replace(/\{\{/g, '&#123;&#123;');
}
/** escapes string so it can be used in API button, esp for name fields users may put links in
 * if it finds [name](link) in a string it will remove the [ and ] and the (link)
 * replaces [ and ] with escaped versions everywhere else.
 *@param {string} str the string we want to use inside a link button
 *@returns {string} safe to use new name for button
 */
export function escapeForChatLinkButton (str){
	var markdownLinkreg=/^([^\[]*?)\[([^\]]*?)\]\(([^\)]*?)\)(.*)$/,
		retstr="", matches;
	if (!str){return str;}
	matches = markdownLinkreg.exec(str);
	if(matches){
		if (matches[1]){
			retstr+=matches[1];
		}
		if(matches[2]){
			retstr += matches[2];
		}
		if (matches[4]){
			retstr += matches[4];
		}
	} else {
		retstr = str;
	}
	retstr = retstr.replace(/\[/g,'&#91;').replace(/\]/g,'&#93;');
	retstr = escapeForMacroCall(retstr);
	return retstr;
}
/** TEST FUNCTION not tested completely: to attempt to parse strings faster than using split()
 * would be used to find portions of string like 'repeating_section_id_attrname'
 * @param {*} str
 * @param {*} pat
 * @param {*} n
 */
export function nthIndex (str,pat,n){
	var i;
	for (i = 0; n > 0 && i !== -1; n -= 1) {
		i = str.indexOf(pat,  i ? (i + 1) : i);
	}
	return i;
}

/** returns id portion of a source Attribute or repeating row attribute name
 * @param {string} sourceAttribute from eventInfo object should be repeating_section_id_attributename
 * @returns {string} the id portion of string, or blank.
 */
export function getRowId  (sourceAttribute) {
	if (!sourceAttribute) { return ""; }
	var strs = sourceAttribute.split('_');
	//only 3 if is is from remove:repeating_section, 4 otherwise
	if (strs && _.size(strs) >= 3) {
		return strs[2];
	}
	return "";
}
/** Returns attribute name not including repeating_section_id_****
 * if there is no id (if called in context of event on a row) then returns string after repeating_section_
 * @param {string} source from eventInfo.sourceAttribute should be repeating_section_id_attributename
 */
export function getAttributeName  (source) {
	var itemId="", attrib="";
	if (!source) { return ""; }
	itemId = getRowId(source);
	if (itemId) {
		attrib = source.substring(source.indexOf(itemId) + itemId.length + 1, source.length);
	} else if (source.indexOf('repeating_')===0) {
		source=source.slice(10);
		if (source.indexOf('_')>0){
			attrib=source.slice(source.indexOf('_')+1);
		}
	}
	return attrib;
}
/** if !id return '', else return id_ (with underscore at end)
 * this is used so the same function can be written for loops from getIDs or direct from the event with no ID
 *@param {string} id the id of the row or blank
 *@returns {string} id_  or blank
 */
export function getRepeatingIDStr  (id) {
	var idStr = "";
	if (!(id === null || id === undefined)) {
		idStr = id + "_";
	}
	return idStr;
}
/** Append values of multiple arrays of strings together to return one NEW array of strings that is the cartesian product.
 * @example cartesianAppend(["a","b"],["c","d"], ["e","f"]);
 * // returns ["ace","acf","ade","adf","bce","bcf","bde","bdf"]
 * @example cartesianAppend(["pre_"] , ["a","b","c"], ["_post"] );
 * //returns ["pre_a_post","pre_b_post","pre_c_post"]
 * @param {[String]} [...] Arrays of strings can use multiple arrays
 * @returns {[String]} of all values in other arrays
 */
export function cartesianAppend () {
	return _.reduce(arguments, function (a, b) {
		return _.flatten(_.map(a, function (x) {
			return _.map(b, function (y) {
				return String(x) + String(y);
			});
		}), true);
	}, [[]]);
}
/** cartesian product of all arrays together returns one flattened NEW array.
 * necessary in case an array has other arrays as elements
 * @param {Array} [...] Arrays
 * @returns {Array} cartesian product of all arrays (concatenated nothing else)
 */
export function cartesianProduct  () {
	return _.reduce(arguments, function (a, b) {
		return _.flatten(_.map(a, function (x) {
			return _.map(b, function (y) {
				return x.concat([y]);
			});
		}), true);
	}, [[]]);
}
/** trimBoth removes spaces at beginning and end of string, or of each string in an array.
 * performs a deep match, so if array is of arrays, will call trim on every string.
 * if object is not an array or string, just return object.
 * therefore, non immutable objects are not cloned and array will contain links to them.
 *@param {Array or string} val string or array of strings
 *@returns {Array or string} same object type as passed in
 */
export function trimBoth (val){
	if (Array.isArray(val)){
		return _.map(val,trimBoth);
	}
	if (typeof val === 'string') {
		return val.replace(/^\s*|\s*$/g,'');
	}
	return val;
}
/** Splits string into array, based on commas (ignoring commas between parenthesis)
 * @param {string} str
 * @returns {[string]} array of items
 */
export function splitByCommaIgnoreParens(str){
	var ret=[];
	if (!str) {return [];}
	ret = str.match(/((?:[^(),]|\([^()]*\))+)/g);
	ret = trimBoth(ret);
	return _.uniq(ret);
}
/** deletes EVERY ROW of a repeating section!
 * @param {function} callback optional when done
 * @param {string} section name after repeating_
 */
export function deleteRepeating(callback,section){
	var done = _.once(function(){
		if (typeof callback === "function"){
			callback();
		}
	});
	if(!section){
		done();
		return;
	}
	//TAS.debug("SWUtils.deleteFeatures",section);
	getSectionIDs(section,function(ids){
		var prefix="repeating_"+section+"_";
		if(ids && _.size(ids)){
			ids.forEach(function(id) {
				//TAS.debug("deleting "+prefix+id);
				removeRepeatingRow(prefix+id);
			});
			done();
		} else {
			done();
		}
	});
}