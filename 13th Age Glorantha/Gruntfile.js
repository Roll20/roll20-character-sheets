/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
  includereplace: {
        development: {
            options: {
                globals: {
                    'img_prefix': '../img',
                    'version': '<%= pkg.version %>'
                }
            },
            files: [
                {src: 'src/index.html', dest: 'testbed/index.html'},
                {src: 'src/13th_Age_Glorantha.css', dest: 'testbed/13th_Age_Glorantha.css'},
                {src: 'src/app.css', dest: 'testbed/app.css'},
                {src: 'src/base.css', dest: 'testbed/base.css'},
            ]
        },
        production: {
            options: {
                globals: {
                    img_prefix: 'https://neovatar.github.io/roll20-character-sheets/13th_Age-neovatar/img',
                    'version': '<%= pkg.version %>'
                }
            },
            files: [
                {src: 'src/13th_Age_Glorantha.html', dest: '13th_Age_Glorantha.html'},
                {src: 'src/13th_Age_Glorantha.css', dest: '13th_Age_Glorantha.css'},
                {src: 'src/sheet.json', dest: 'sheet.json'}
            ]
        }
  },
  roll20: {
      development:'testbed/13th_Age_Glorantha.css',
      production:'13th_Age_Glorantha.css'
  },
  watch: {
      development: {
          files: ['src/**/*css', 'src/**/*html'],
          tasks: ['default'],
          options: {
              livereload:35728
          },
      },
  },
  connect: {
      server: {
          options: {
              port:9001,
              base: '.',
              livereload:35728,
          }
      }
  }
  });

  // These plugins provide necessary tasks.
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
       'includereplace:development',
       'roll20:development'
  ]);
  grunt.registerTask('build', [
       'includereplace:production',
       'roll20:production'
  ]);
  grunt.registerTask('serve', [
      'default',
      'connect:server',
      'watch'
  ]);
};
