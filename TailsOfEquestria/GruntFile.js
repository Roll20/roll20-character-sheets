module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      dist: {
        src: ['js/worker.js']
      },
      options: {
        esversion: 6,
        globals: {
          '_': true,
          'generateRowID': true,
          'getAttrs': true,
          'getSectionIDs': true,
          'on': true,
          'setAttrs': true
        },
        strict: true,
        sub: true,
        undef: true
      }
    },
    less: {
      default: {
        files: {
          'sheet.css': 'less/index.less'
        }
      }
    },
    pug: {
      default: {
        files: {
          'sheet.html': 'pug/index.pug'
        },
        options: {
          pretty: true
        }
      }
    },
    'string-replace': {
      css: {
        files: {
          'sheet.css': 'sheet.css'
        },
        options: {
          replacements: [
            {
              pattern: /,\n/g,
              replacement: ', '
            },
            {
              pattern: /\.((?!charsheet)[^ .\n]+)(?=.+\{)/g,
              replacement: function(match, p1) {
                if(p1 === 'itemcontrol' || p1 === 'repcontainer' || p1 === 'repcontrol' || p1 === 'repitem')
                  return '.' + p1;
                else
                  return '.sheet-' + p1;
              }
            },
            {
              pattern: /#([^ .\n]+)(?=.+\{)/g,
              replacement: function(match, p1) {
                return `#sheet-${p1}`;
              }
            }
          ]
        }
      },
      html: {
        files: {
          'sheet.html': 'sheet.html'
        },
        options: {
          replacements: [
            {
              pattern: /SCRIPT_VERSION/g,
              replacement: '1.6'
            }
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask('default', ['jshint', 'less', 'pug', 'string-replace:css', 'string-replace:html']);
};
