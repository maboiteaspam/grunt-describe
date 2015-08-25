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
var minimist = require('minimist')
var grunt = require('grunt')
var gruntDescribe = require('grunt-describe')

var pkg = require('./package.json')

grunt.initConfig([...]);

if (minimist.describe) {
    gruntDescribe(grunt, pkg, minimist.describe)
} else {
    grunt.registerTask('default', [...])
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
