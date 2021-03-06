# grunt-describe
API to describe Grunt tasks configuration.



## Installation
Run the following commands to download and install the application:

```sh
$ npm i maboiteaspam/grunt-describe --save
```
__to pbe published__

## Documentation

A sample example for a regular `Gruntfile.js` should look likes this :

```js

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

```


## How to contribute

1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
