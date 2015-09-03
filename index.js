
// module grunt-describe by maboiteaspam

var pkg = require('./package.json');

module.exports = describeGrunt

function describeGrunt(grunt, pkg, keyword){

  var _ = require('underscore')
  var chalk = require('chalk')

  var fence = function(s, t){
    return s + t.replace(/(\n)/g, '\n'+s)
  }
  var removeFrontspace = function(t){
    return t.replace(/(\n\s*)/g, '\n')
  }
  var pwdHide = function(o, y){
    var options = JSON.parse(JSON.stringify(o || {}, null, 2))
    Object.keys(options).forEach(function(k){
      if (k.match(y) && _.isString(options[k])) {
        options[k] = '*****'
      } else if(_.isObject(options[k])) {
        options[k] = pwdHide(options[k], y)
      }
    })
    return options
  }
  var jsonFmt = function(o){
    var options = JSON.stringify(o || {}, null, 2).split('\n')
    options.shift()
    options.pop()
    return options.join('\n')
  }

  console.log('')
  console.log(chalk.bold.cyan(pkg.name.toUpperCase()))
  console.log(pkg.description)
  console.log('')

  if (keyword===true) {
    console.log('Tasks configured for this module:')
    console.log('')

    var topTask = grunt.task._tasks['default'];
    getAliasedTasks(topTask).forEach(function(name){
      var task = grunt.task._tasks[name];
      if (task) {
        var description = grunt.config.get('run.descriptions.'+name) || '';
        console.log(chalk.magenta(' - ') + chalk.white.bold(name.toUpperCase()))
        console.log(fence('   ', removeFrontspace(description)))
        console.log('')
        console.log(fence('   ', 'Alias of'))
        console.log(fence('    - ', chalk.white(getAliasedTasks(task).join('\n'))))
        console.log('')
      } else {
        // check about this case
        //console.log(name)
      }
    })
  } else {
    console.log('Tasks details for ' + chalk.white(keyword) + ':')
    console.log('')

    var found = false;

    Object.keys(grunt.task._tasks).forEach(function(name){

      var task = grunt.task._tasks[name];
      var targets = grunt.config.get(task.name);
      var cName = chalk.white.bold(name.toUpperCase());
      var shownTaskDescription = false;

      if (name.match(keyword)) {
        found = true
        var description = grunt.config.get('run.descriptions.'+name) || 'no description for this task.';

        if (targets && Object.keys(targets).length) {

          console.log(chalk.magenta(' -  ') + 'Task ' + cName)
          console.log(fence('    ', removeFrontspace(description)))

          console.log(fence('    ', 'Targets are'))
          console.log(fence('      ', chalk.white('- '+Object.keys(targets).join('\n- '))))
          console.log('')
        } else {

          var aliases = getAliasedTasks(task)

          if (aliases.length) {

            console.log(chalk.magenta(' -  ') + 'Task ' + cName)
            console.log(fence('    ', removeFrontspace(description)))

            console.log(fence('    ', 'This task is an alias of'))
            console.log(fence('      ', chalk.white('- '+aliases.join('\n- '))))
            console.log('')
          }

        }
        shownTaskDescription = true
      }

      if (targets) {
        getAliasedTasks(task).forEach(function(taskTarget){
          var task = taskTarget.replace(/(:[^:]+)$/, '')
          var target = taskTarget.replace(/^([^:]+:)/, '')
          var targetsConfig = grunt.config.get(task);
          if (target.match(keyword)) {
            found = true

            if (!shownTaskDescription) {

              console.log(chalk.magenta(' -  ') + 'Task ' + chalk.white.bold(cName));

              var description = grunt.config.get('run.descriptions.'+name) || '';
              if (description) {
                console.log(fence('    ', removeFrontspace(description)))
              }

              console.log('')
              shownTaskDescription = true
            }

            console.log('    Target ' + chalk.white.bold(taskTarget.toUpperCase()))

            var options = jsonFmt(pwdHide(targetsConfig[target], /pwd|password/))
            if (options.length) {
              console.log(fence('      ', chalk.white(options)))
            } else {
              console.log('')
              console.log(fence('    ', chalk.yellow('This target has no specific options.')))

              console.log('')
              var taskOptions = jsonFmt(pwdHide(targetsConfig, /pwd|password/))
              if (taskOptions.length) {
                console.log(fence('    ', 'However, here are ' + cName + ' Task options'))
                console.log(fence('      ', chalk.white(taskOptions)))
              } else {
                console.log(fence('    ', chalk.yellow(cName + ' Task no options.')))
              }
            }
            console.log('')
          }
        })
      }
    })

    if (!found) {
      grunt.log.error('There is not task or targets matching this search keywords !')
    }
  }
  console.log('')
}

function getAliasedTasks (task) {
  var aliasedTasks = []
  if (task.info.match(/^Alias for .*/)) {
    task.info
      .replace(/^Alias for\s+/, '')
      .replace(/\s+task[s]?[.]$/, '')
      .split(',')
      .forEach(function (aliased) {
        aliasedTasks.push(
          aliased.replace(/\s+$/, '').replace(/^\s+/, '').replace(/"/g, '')
        )
      });
  }
  return aliasedTasks
}
