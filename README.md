slush-angular-gulp [![GitHub version](https://badge.fury.io/gh/reflexdemon%2Fslush-angular-gulp.png)](http://badge.fury.io/gh/reflexdemon%2Fslush-angular-gulp) [![npm version](https://badge.fury.io/js/slush-angular-gulp.png)](http://badge.fury.io/js/slush-angular-gulp)  
==============

> A [slush](http://slushjs.github.io) generator for AngularJS using the [Google Angular App Structure Recommendations](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub)

![Slush Angular Gulp](https://github.com/reflexdemon/slush-angular-gulp/raw/master/templates/app/src/app/assets/slush-angular-gulp.png "Slush Angular Gulp")

[reflexdemon.github.io/slush-angular-gulp](http://reflexdemon.github.io/slush-angular-gulp)

# Introduction

All, would like to tell you this generator is build with inspiration from the below projects.

1. [slush-angular](https://www.npmjs.com/package/slush-angular)
2. [angular-styleguide](https://github.com/johnpapa/angular-styleguide)
3. [Yomen generator-angular](https://github.com/yeoman/generator-angular)

Moreover, this is just a first step towards integration of all the goodies of the above mentioned projects and expect more on future releases.

## Installation

Install `slush-angular-gulp` globally:

```bash
npm install -g slush-angular-gulp
```

You'll also need to have `bower`, `slush` and `gulp` installed globally for a smooth installation

```bash
npm install -g bower gulp slush
```

### Bower dependency

Here is the list of dependencies that are pre selected.

1. Angular 1.4
2. Bootstrap 

### CSS Preprocessor

`LESS`, `Stylus`, and `Sass` to use as the CSS Preprocessor for your project.

*Note* All `_*.styl`, `_*.less`, or `_*.scss` files will be considered "partials" and must be imported in another stylesheet file (without a leading "_") to be compiled.

### Project structure

You will also have the option to generate a simple Todo list app in your project as well, to be used as a live example of how to structure your app.

The project structure with the Todo list example included will look like this:

```
my-angular-app/
├── .bowerrc
├── .csslintrc
├── .editorconfig
├── .gitignore
├── .jshintrc
├── bower.json
├── gulpfile.js                             # See "Gulpfile" below
├── karma.conf.js
├── README.md
├── package.json
└── src
    └── app
        ├── app.js                          # Main app module and configuration
        ├── app.styl/less/scss              # Main app stylesheet
        ├── index.html                      # The index.html / app layout template
        ├── assets                          # A folder meant for images and such...
        │   └── .gitkeep
        ├── styles
        │   └── _base.styl/less/scss        # A stylesheet partial with base styles
        └── todo
            ├── todo-controller.js          # The todo controller
            ├── todo-controller.spec.js     # Karma test for the todo controller
            ├── todo.html                   # The todo list template
            ├── todo.js                     # The todo module
            └── todo.styl/less/scss         # Todo module specific styles
```
## Generators

Available generators:

* [angular-gulp](#app) (aka [angular-gulp:app](#app))
* [angular-gulp:controller](#controller)
* [angular-gulp:module](#module)
* [angular-gulp:directive](#directive)
* [angular-gulp:filter](#filter)
* [angular-gulp:route](#route)
* [angular-gulp:service](#service)
* [angular-gulp:provider](#provider)
* [angular-gulp:factory](#factory)
* [angular-gulp:value](#value)
* [angular-gulp:constant](#constant)
* [angular-gulp:decorator](#decorator)
* [angular-gulp:view](#view)

### App

Sets up a new AngularJS app, generating all the boilerplate you need to get started. The app generator also optionally installs Bootstrap and additional AngularJS modules, such as angular-resource (installed by default).

Create a new folder for your project:

```bash
mkdir my-angular-app
```

Run the generator from within the new folder:

```bash
cd my-angular-app

slush angular-gulp
```
or

```bash
cd my-angular-app

slush angular-gulp:app
```

You will now be prompted to give your new AngularJS app a name, which will be dasherized and used in its `bower.json` and `package.json` respectively. The chosen name will be camelized and used as the main angular module as well, inside `src/app/app.js`.



### Controller
Generates a controller in `src/app/<module>`.

Syntax:

```bash
slush angular-gulp:controller <ctrl-Name>
```

Example:

```bash
slush angular-gulp:controller login
```

```log
[06:23:46] Starting 'angular-gulp:controller'...
? What is the name of your controller? login
? What is your AngularJS module name? home
? Do you want to include unit testing? Yes
[06:23:56] [conflict] Creating login-controller.spec.js
[06:23:56] [conflict] Creating login-controller.js
[06:23:56] Finished 'angular-gulp:controller' after 10 s
[slush] Scaffolding done
```

Produces `src/app/home/login-controller.js`:
```javascript
(function() {
    'use strict';


    /**
     * @ngdoc function
     * @name myAngular.home.controller:LoginCtrl
     * @description
     * # LoginCtrl
     * Controller of the myAngular.home
     * @ngInject
     */
    function LoginCtrl() {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    }

    angular
        .module('myAngular.home')
        .controller('LoginCtrl', LoginCtrl);

})();

```
and
Produce `src/app/home/login-controller.spec.js`
```javascript
'use strict';
/**
 * Simple test class for LoginCtrl on myAngular.home
 */
describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('myAngular.home'));

  var LoginCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    LoginCtrl = $controller('LoginCtrl', {
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LoginCtrl.awesomeThings.length).toBe(3);
  });
});

```

### Module
Generates a module in `src/app/<module>`.

Syntax:

```bash
slush angular-gulp:module <module-Name>
```

Example:

```bash
slush angular-gulp:module user
```

```log
[06:29:05] Starting 'angular-gulp:module'...
? What is the name of your module? user
[06:29:15] [conflict] Creating user-module.js
[06:29:15] Finished 'angular-gulp:module' after 9.54 s
[slush] Scaffolding done
```

Produces `src/app/user/user-module.js`:
```javascript
/**
 * Creates and initilizes the module user
 */

(function() {
        'use strict';

        angular.module('myAngular.user', [], moduleConfiguration);

        /* @ngInject */
        function moduleConfiguration() {
            //TODO Have any module specific configurator here
        });
}

})();

```

### Directive
Generates a directive in `src/app/<module>`.

Syntax:

```bash
slush angular-gulp:directive <directive-Name>
```

Example:

```bash
slush angular-gulp:directive awesome-thing
```

```log
[08:08:05] Starting 'angular-gulp:directive'...
? What is the name of your directive? awesome-thing
? What is your AngularJS module name? user
? Replace awesome-thing-directive.js? replace
[08:08:11] [conflict] Overwriting awesome-thing-directive.js
[08:08:11] Finished 'angular-gulp:directive' after 5.68 s
[slush] Scaffolding done
```

Produces `src/app/user/awesome-thing-directive.js`:
```javascript

/**
 * @desc Please provide useful information regarding the directive with a proper example
 * @example <div awesome-thing></div>
 */
(function() {
    angular
        .module('myAngular.user')
        .directive('awesomeThing', awesomeThing );

    function awesomeThing () {
        /* implementation details */
    }

})();


```

### Filter
Generates a filter in `src/app/<module>`.

Syntax:

```bash
slush angular-gulp:filter <filter-Name>
```

Example:

```bash
slush angular-gulp:filter checkmark
```

```log
[08:35:16] Starting 'angular-gulp:filter'...
? What is the name of your filter? checkmark
? What is your AngularJS module name? home
? Do you want to include unit testing? Yes
[08:35:32] [conflict] Creating checkmark-filter.spec.js
[08:35:32] [conflict] Creating checkmark-filter.js
[08:35:32] Finished 'angular-gulp:filter' after 15 s
[slush] Scaffolding done
```

Produces `src/app/home/checkmark-filter.js`:
```javascript
(function() {
    'use strict';

    angular.module('myAngular.home').filter('checkmark', function() {
        return function(input) {
            return input ? '\u2713' : '\u2718';
        };
    });
})();
```

and 

Produces `src/app/home/checkmark-filter.spec.js`:
```javascript
'use strict';

describe('filter', function() {

  beforeEach(module('myAngular.home'));

  describe('checkmark', function() {

    it('should convert boolean values to unicode checkmark or cross',
        inject(function(checkmarkFilter) {
      expect(checkmarkFilter(true)).toBe('\u2713');
      expect(checkmarkFilter(false)).toBe('\u2718');
    }));
  });
});


```


### Route
Generates a route in `src/app/<module>`.

Syntax:

```bash
slush angular-gulp:route <route-Name>
```

Example:

```bash
slush angular-gulp:route user
```

```log
[09:55:24] Starting 'angular-gulp:route'...
? What is the name of your route? user
? What is your AngularJS module name? user
? Replace user-route.js? replace
[09:55:34] [conflict] Overwriting user-route.js
[09:55:34] Finished 'angular-gulp:route' after 9.49 s
[slush] Scaffolding done
```

Produces `src/app/home/user-route.js`:
```javascript
(function() {
    'use strict';

    angular
        .module('myAngular.user')
        .config( userRoute);


    /* @ngInject */
    function userRoute($routeProvider) {
        $routeProvider
            .when('/user', { //Default
                controller: 'UserCtrl',
                templateUrl: 'user/user.html'
            });

    }

})();
```
### Service
Generates a service in `src/app/<module>`.

Syntax:

```bash
slush angular-gulp:service <service-Name>
```

Example:

```bash
slush angular-gulp:service session
```

```log
[13:28:05] Starting 'angular-gulp:service'...
? What is the name of your service? session
? What is your AngularJS module name? home
[13:28:13] [conflict] Creating session-service.js
[13:28:13] Finished 'angular-gulp:service' after 8.21 s
[slush] Scaffolding done
```

Produces `src/app/home/session-service.js`:
```javascript
(function() {
    'use strict';

    angular
        .module('myAngular.home')
        .service('sessionService',  sessionService);


    /* @ngInject */
    function sessionService() {
        var someValue = '';
        var service = {
            save: save,
            someValue: someValue,
            validate: validate
        };
        return service;

        ////////////

        function save() {
            /* */
        };

        function validate() {
            /* */
        };
    }

})();

```

### Factory
Generates a factory in `src/app/<module>`.

Syntax:

```bash
slush angular-gulp:factory <factory-Name>
```

Example:

```bash
slush angular-gulp:factory session
```

```log
[13:28:05] Starting 'angular-gulp:factory'...
? What is the name of your factory? session
? What is your AngularJS module name? home
[13:28:13] [conflict] Creating session-factory.js
[13:28:13] Finished 'angular-gulp:factory' after 8.21 s
[slush] Scaffolding done
```

Produces `src/app/home/session-factory.js`:
```javascript
(function() {
    'use strict';

    angular
        .module('myAngular.home')
        .factory('sessionFactory',  sessionFactory);


    /* @ngInject */
    function sessionFactory() {
        var someValue = '';
        var factory = {
            save: save,
            someValue: someValue,
            validate: validate
        };
        return factory;

        ////////////

        function save() {
            /* */
        };

        function validate() {
            /* */
        };
    }

})();

```

### Provider
Generates a provider in `src/app/<module>`.

Syntax:

```bash
slush angular-gulp:provider <provider-Name>
```

Example:

```bash
slush angular-gulp:provider game
```

```log
[14:16:32] Starting 'angular-gulp:provider'...
? What is the name of your provider? game
? What is your AngularJS module name? user
[14:16:47] [conflict] Creating game-provider.js
[14:16:48] Finished 'angular-gulp:provider' after 16 s
[slush] Scaffolding done
```

Produces `src/app/home/game-provider.js`:

```javascript
(function() {
    'use strict';

angular
  .module('myAngular.user')
        .provider('game',  gameProvider);

    /* @ngInject */
    function gameProvider() {
        var someValue = '';
        var provider = {
            save: save,
            someValue: someValue,
            validate: validate
        };
        return provider;

        ////////////

        function save() {
            /* */
        }

        function validate() {
            /* */
        }
    }
})();

```

### Constant
Generates a constant in `src/app/<module>`.

Syntax:

```bash
slush angular-gulp:constant <constant-Name>
```

Example:

```bash
slush angular-gulp:constant apiKey
```

```log
[14:59:07] Starting 'angular-gulp:constant'...
? What is the name of your constant? appKey
? What is your AngularJS module name? customer
[14:59:13] [conflict] Creating appKey-constant.js
[14:59:13] Finished 'angular-gulp:constant' after 5.56 s
[slush] Scaffolding done
```

Produces `src/app/customer/appKey-constant.js`:

```javascript
(function() {
    'use strict';

    angular
        .module('myAngular.customer')
        .constant('appKey',  'appKey');


})();


```
### Value
Generates a value in `src/app/<module>`.

Syntax:

```bash
slush angular-gulp:value <value-Name>
```

Example:

```bash
slush angular-gulp:value api_key
```

```log
[14:43:35] Starting 'angular-gulp:value'...
? What is the name of your value? api_key
? What is your AngularJS module name? heat
[14:43:43] [conflict] Creating api_key-value.js
[14:43:43] Finished 'angular-gulp:value' after 7.41 s
[slush] Scaffolding done
```

Produces `src/app/heat/api_key-value.js`:

```javascript
(function() {
    'use strict';

    var apiKeyValue = {};

    angular
        .module('myAngular.heat')
        .value('apiKey',  apiKeyValue);


})();


```

### Decorator
Generates a decorator in `src/app/<module>`.

Syntax:

```bash
slush angular-gulp:decorator <decorator-Name>
```

Example:

```bash
slush angular-gulp:decorator exception
```

```log
[15:12:54] Starting 'angular-gulp:decorator'...
? What is the name of your decorator? exception
? What is your AngularJS module name? customer
[15:13:08] [conflict] Creating exception-decorator.js
[15:13:08] Finished 'angular-gulp:decorator' after 14 s
[slush] Scaffolding done
```

Produces `src/app/customer/exception-decorator.js`:

```javascript

(function () {
    'use strict'

    angular
        .module('myAngular.customer')
    .config(exceptionConfig);

/* @ngInject */
function exceptionConfig($provide) {
    $provide.decorator('$exceptionHandler', extendexceptionHandler);
}

/* @ngInject */
function extendexceptionHandler($delegate) {
    return function(exception, cause) {
        $delegate(exception, cause);
        var data = {
            exception: exception
        };
    };
}

})();


```

### View
Generates a view in `src/app/<module>`.

Syntax:

```bash
slush angular-gulp:view <view-Name>
```

Example:

```bash
slush angular-gulp:view user
```

```log
[15:25:00] Starting 'angular-gulp:view'...
? What is the name of your view? user
? What is your AngularJS module name? user
[15:25:27] [conflict] Creating user-view.html
[15:25:27] Finished 'angular-gulp:view' after 27 s
[slush] Scaffolding done
```

Produces `src/app/user/user-view.html`:

```html
<p>This is the user' view</p>
```




### Gulpfile

#### Development

To start developing in your new generated project run:

```bash
gulp serve
```

Then head to `http://localhost:3000` in your browser.

The `serve` tasks starts a static file server, which serves your AngularJS application, and a watch task which watches your files for changes and lints, builds and injects them into your index.html accordingly.

#### Tests

To run tests run:

```bash
gulp test
```

#### Production ready build - a.k.a. dist

To make the app ready for deploy to production run:

```bash
gulp dist
```

Now you have a `./dist` folder with all your scripts and stylesheets concatenated and minified, also third party libraries installed with bower will be concatenated and minified into `vendors.min.js` and `vendors.min.css` respectively.

## Changelog

TODO

## License

MIT
