/**
 * cssTypeData configuration
 * @type {cssTypeData}
 */
module.exports.cssTypeData =  {
    'less': {
        plugin: 'gulp-less',
        pluginVersion: '^1.2.3',
        pipeCommand: 'g.less()',
        extension: 'less'
    },
    'sass': {
        plugin: 'gulp-sass',
        pluginVersion: '^0.7.1',
        pipeCommand: 'g.sass()',
        extension: 'scss'
    },
    'styl': {
        plugin: 'gulp-stylus',
        pluginVersion: '^1.0.2',
        pipeCommand: 'g.stylus({use: [require(\'nib\')()]})',
        extension: 'styl',
        extraDependencies: {
            'nib': '^1.0.2'
        }
    }
};

/**
 * Proposes the names based on the path/package.json file.
 * @return {String} name
 */
module.exports.getNameProposal =  function() {
    var path = require('path');
    try {
        return require(path.join(process.cwd(), 'package.json')).name;
    } catch (e) {
        return path.basename(process.cwd());
    }
};

/**
 * Organize quize.
 * @return {String} name
 */
module.exports.getDefaultOption =  function(args, index) {
    if (args && args[index]) {
        return args[index];
    } else {
        return null;
    }
};

/**
 * Get Modules proposal
 * @return {list} dir
 */
module.exports.getModuleProposal =  function(appDir) {
    var modules = [];
    var componentsDir = appDir + '/components';
    var exclude = ['assets', 'styles', 'app.js', 'app.less', 'index.html', 'favicon.ico'];
    var fs = require('fs'),
    _ = require('lodash');

    if (fs.existsSync(componentsDir)) {
      modules = _.xor(fs.readdirSync(componentsDir), exclude);
    }

    return modules;
};

/**
 * Get global Options
 * command line options
 *  --appdir Default Application location
 *  --base is the base for the application
 *  Note: if both are padssed then it will search on base + appdir
 * @return {Object} name
 */
module.exports.getGlobalOptions =  function() {
    var argv = require('yargs').argv;

    return {
      appDir : argv.appdir || 'src/app',
      base : argv.base || './'
    };
};
