(function() {
    'use strict';
    /**
     * cssTypeData configuration
     * @type {cssTypeData}
     */
    var cssTypeData = {
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
    function getNameProposal() {
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
    function getDefaultOption(args, index) {
        if (args && args[index]) {
            return args[index];
        } else {
            return null;
        }
    };

    var runtimeMode = 'LIVE'; //Other option is 'TEST'
    function setRuntimeMode(mode) {
        runtimeMode = mode;
    };

    function getRuntimeMode() {
        return runtimeMode;
    };


    /**
     * Get Modules proposal
     * @return {list} dir
     */
    function getModuleProposal(appDir) {
        if (getRuntimeMode() === 'TEST') {
            return ['module1', 'module2'];
        }
        var modules = [];
        var componentsDir = appDir;// + '/components';
        var fs = require('fs');

        var finalList = [];
        if (fs.existsSync(componentsDir)) {
            modules = fs.readdirSync(componentsDir);
            for (var i = 0; i < modules.length; i++) {
                stats = fs.statSync(componentsDir + '/' + modules[i]);
                if (stats.isDirectory()) {
                    finalList.push(modules[i]);
                }
            }
        }

        return finalList;
    };

    /**
     * Get global Options
     * command line options
     *  --appdir Default Application location
     *  --base is the base for the application
     *  Note: if both are padssed then it will search on base + appdir
     * @return {Object} name
     */
    function getGlobalOptions() {
        var argv = require('yargs').argv;

        return {
            appDir: argv.appdir || 'src/app',
            base: argv.base || './'
        };
    };


    module.exports.cssTypeData = cssTypeData;
    module.exports.getNameProposal = getNameProposal;
    module.exports.getDefaultOption = getDefaultOption;
    module.exports.setRuntimeMode = setRuntimeMode;
    module.exports.getRuntimeMode = getRuntimeMode;
    module.exports.getModuleProposal = getModuleProposal;
    module.exports.getGlobalOptions = getGlobalOptions;

})();
