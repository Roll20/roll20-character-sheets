var pugBeautify = require('../index');
var assert = require('assert');
var fs = require('fs');
var ENC = 'utf8';
var before_file_name = './test/before/test.jade';

describe('pugBeautify', function() {
    it('should throw error when code is not a string', function() {
        assert.throws(function() {
            pugBeautify({});
        }, Error, 'it must throw error.');
    });

    it('should be ok when no option', function() {
        pugBeautify('...');
        assert.ok(true);
    });

    it('should throw error when option is not a object', function() {
        assert.throws(function() {
            pugBeautify('', '');
        }, Error, 'it must throw error.');
    });

    it('should equal when default option', function() {
        var option = {
            fill_tab: true,
            omit_div: false,
            tab_size: 4
        };
        var after_file_name = './test/after/test_true_false_4.jade';

        var before = fs.readFileSync(before_file_name,ENC);
        var after = fs.readFileSync(after_file_name,ENC);
        assert.equal(after, pugBeautify(before, option));
    });

    it('should work when fill_tab=false,omit_div=true,tab_size=2', function() {
        var option = {
            fill_tab: false,
            omit_div: true,
            tab_size: 2
        };
        var after_file_name = './test/after/test_false_true_2.jade';

        var before = fs.readFileSync(before_file_name,ENC);
        var after = fs.readFileSync(after_file_name,ENC);
        assert.equal(after, pugBeautify(before, option));
    });
});
