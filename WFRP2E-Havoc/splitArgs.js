var bshields = bshields || {};
bshields.splitArgs = (function() {
    'use strict';
    
    var version = 1.1;
    
    function splitArgs(input, separator) {
        var singleQuoteOpen = false,
            doubleQuoteOpen = false,
            tokenBuffer = [],
            ret = [],
            arr = input.split(''),
            element, i, matches;
        separator = separator || /\s/g;
        
        for (i = 0; i < arr.length; i++) {
            element = arr[i];
            matches = element.match(separator);
            if (element === '\'') {
                if (!doubleQuoteOpen) {
                    singleQuoteOpen = !singleQuoteOpen;
                    continue;
                }
            } else if (element === '"') {
                if (!singleQuoteOpen) {
                    doubleQuoteOpen = !doubleQuoteOpen;
                    continue;
                }
            }
            
            if (!singleQuoteOpen && !doubleQuoteOpen) {
                if (matches) {
                    if (tokenBuffer && tokenBuffer.length > 0) {
                        ret.push(tokenBuffer.join(''));
                        tokenBuffer = [];
                    }
                } else {
                    tokenBuffer.push(element);
                }
            } else if (singleQuoteOpen || doubleQuoteOpen) {
                tokenBuffer.push(element);
            }
        }
        if (tokenBuffer && tokenBuffer.length > 0) {
            ret.push(tokenBuffer.join(''));
        }
        
        return ret;
    }
    
    return splitArgs;
}());

String.prototype.splitArgs = String.prototype.splitArgs || function(separator) {
    return bshields.splitArgs(this, separator);
};