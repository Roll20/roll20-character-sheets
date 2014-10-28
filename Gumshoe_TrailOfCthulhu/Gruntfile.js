/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    less: {
        development: {
            options: {
                paths: ["src/", paths="src/vendor"],
                banner: '<%= banner %>'
            },
            files: {
                "testbed/gumshoe_toc.css": "src/gumshoe_toc.less"
            }
        },
        production: {
            options: {
                paths: ["src/", paths="src/vendor"],
                banner: '<%= banner %>',
                cleancss: true,
                modifyVars: {
                    fonts_prefix: '"https://ramblurr.github.io/roll20-character-sheets/font/"',
                    img_prefix: '"https://ramblurr.github.io/roll20-character-sheets/img/"',
                }
            },
            files: {
                "Gumshoe_TrailOfCthulhu.css": "src/gumshoe_toc.less"
            }
        }
    },
    includereplace: {
        development: {
            options: {
                globals: {
                    'img_prefix': '../img/'
                }
            },
            files: [
                {src: '*', dest: 'testbed/', expand: true, cwd: 'src/testbed'},
            ]
        },
        production: {
            options: {
                globals: {
                    img_prefix: 'https://ramblurr.github.io/roll20-character-sheets/img/'
                }
            },
            src: 'src/sheet.html',
            dest: 'Gumshoe_TrailOfCthulhu.html'
        }
  },
  roll20: {
      development:'testbed/gumshoe_toc.css',
      production:'Gumshoe_TrailOfCthulhu.css'
  },
  watch: {
      development: {
          files: ['src/**/*less', 'src/**/*html'],
          tasks: ['default'],
          options: {
              livereload:true
          },
      },
  },
  connect: {
      server: {
          options: {
              port:9001,
              base: '.',
              livereload:35729,
          }
      }
  }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-include-replace');
  grunt.registerMultiTask('roll20', function () {
      var evil = [
          /(\bdata:\b|eval|cookie|\bwindow\b|\bparent\b|\bthis\b)/i, // suspicious javascript-type words
          /behaviou?r|expression|moz-binding|@import|@charset|(java|vb)?script|[\<]|\\\w/i,
          ///[\<>]/, // back slash, html tags,
          /[\x7f-\xff]/, // high bytes -- suspect
          /[\x00-\x08\x0B\x0C\x0E-\x1F]/, //low bytes -- suspect
          /&\#/, // bad charset
      ];
      input = grunt.file.read(this.data);
      input = input.replace(/\/\*[^\*]+\*\//g, ""); //remove all css comments
      for(var i=0; i < evil.length; i++) {
          var res = input.match(evil[i]);
          if(res) {
              grunt.log.error("Roll20 Check: Potential CSS security violation; character sheet template styling thrown out.");
              grunt.log.error(res);
              input = "";
          }
      }
      if(input!= "")
          grunt.log.ok('Roll20 CSS lint Ok!');
      else
          grunt.fail.warn("Roll 20 CSS lint failed");
  });

  // Default task.
  grunt.registerTask('default', [
       'less:development',
       'includereplace:development',
       'roll20:development'
  ]);

  grunt.registerTask('build', [
       'less:production',
       'includereplace:production',
       'roll20:production'
  ]);
  grunt.registerTask('serve', [
      'default',
      'connect:server',
      'watch'
  ]);
};
