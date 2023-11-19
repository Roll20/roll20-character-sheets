module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      task0: {
        src: 'html/index.html',
        dest: 'm&m.html',
      },
    },
    useminPrepare: {
      html: 'html/index.html',
      options: {
        dest: '/',
      },
    },
    usemin: {
      html: ['/index.html'],
    },
    watch: {
      css: {
        files: ['css/*.css', 'css/**/*.css'],
        tasks: 'build_css',
      },
      html: {
        files: ['html/*.html', 'js/**/*.js'],
        tasks: ['build_html'],
      },
    },
    concat: {
      css: {
        files: [
          {
            dest: 'm&m.css',
            src: ['css/fonts/fonts.css', 'css/*.css', 'css/rolltemplates/*.css'],
          },
        ],
      },
      js: {
        files: [
          {
            dest: 'html/8_sheetworkers.js',
            src: ['js/listeners/*.js', 'js/rollers/*.js', 'js/sheet_updaters/*.js', 'js/tables/*.js', 'js/utils/*.js'],
          },
        ],
      },
      html: {
        files: [
          {
            dest: 'm&m.html',
            src: [
              'html/1_character-sheet.html',
              'html/2_skill-roll-modal.html',
              'html/3_duel-of-wits-modal.html',
              'html/4_combat-modal.html',
              'html/5_hidden-inputs.html',
              'html/6_roll_templates.html',
              'html/7_script-wrapper-top.html',
              'html/8_sheetworkers.js',
              'html/9_script-wrapper-bottom.html',
            ],
          },
        ],
      },
    },
    cssmin: {
      target: {
        files: [
          {
            dest: 'm&m.css',
            src: 'm&m.css',
          },
        ],
      },
    },
    uglify: {
      target: {
        files: {
          'html/8_sheetworkers.js': 'html/8_sheetworkers.js',
        },
      },
    },
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
      },
      target: {
        files: [
          {
            dest: 'm&m.html',
            src: 'm&m.html',
          },
        ],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('build_html', ['concat:js', 'uglify', 'concat:html', 'htmlmin']);
  grunt.registerTask('build_css', ['concat:css']);
};
