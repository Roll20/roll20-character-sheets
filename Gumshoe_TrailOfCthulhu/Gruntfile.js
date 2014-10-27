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
            src: 'sheet.html', dest: 'Gumshoe_TrailOfCthulhu.html'
        }
  }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-include-replace');

  // Default task.
  grunt.registerTask('default', [
       'less:development',
       'includereplace:development',
  ]);

  grunt.registerTask('build', [
       'less:production',
       'includereplace:production',
  ]);


};
