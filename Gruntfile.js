
var minimist = require('minimist')(process.argv.slice(2));
var pkg = require('./package.json')
var gruntDescribe = require('./index.js')

module.exports = function (grunt){

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    run: {
      descriptions: {
        'default': 'task default description',
        'some': 'task some description',
        'some2': 'task some2 description',
        'some3': 'task some3 description'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.registerTask('default', [])
  grunt.registerTask('some', function ()  {

  });
  grunt.registerTask('some2', ['some']);
  grunt.registerTask('some3', ['some2']);


  if (minimist.describe) {
    return gruntDescribe(grunt, pkg, minimist.describe)
  }
}