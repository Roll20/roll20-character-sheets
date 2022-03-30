/**
 * This stores the name of your sheet for use in the logging functions {@link log} and {@link debug}
 * * @var
 * @type {string}
 */
docs.js['k.sheetName'] = {
	type:'string',
	description:'This stores the name of your sheet for use in the logging functions [k.log](#klog) and [k.debug](#kdebug).'
};
let sheetName = 'kScaffold Powered Sheet';
kFuncs.sheetName = sheetName;
/**
	* This stores the version of your sheet for use in the logging functions{@link log} and {@link debug}. It is also stored in the sheet_version attribute on your character sheet.
	* @var
	* @type {number}
	*/
docs.js['k.version'] = {
	type:'number',
	description:'This stores the version of your sheet for use in the logging functions [k.log](#klog) and [k.debug](#kdebug), and in the K-scaffolds sheet versioning handling. It is also stored in the sheet_version attribute on your character sheet.'
};
let version = 0;
kFuncs.version = version;
/**
	* A boolean flag that tells the script whether to enable or disable {@link debug} calls. If the version of the sheet is `0`, or an attribute named `debug_mode` is found on opening this is set to true for your entire session. Otherwise, it remains false.
	* @var
	* @type {boolean}
	*/
docs.js['k.debugMode'] = {
	type:'boolean',
	description:'A boolean flag that tells the script whether to enable or disable [k.debug](#kdebug) calls. If the version of the sheet is `0`, or an attribute named `debug_mode` is found on opening this is set to true for all sheets you open from that point on. Otherwise, it remains false.'
};
let debugMode = false;
kFuncs.debugMode = debugMode;

const kscaffoldJSVersion = 0.20;
const kscaffoldPUGVersion = 0.20;
