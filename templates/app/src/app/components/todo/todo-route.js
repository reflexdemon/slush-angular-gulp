(function() {
    'use strict';

    angular
        .module('<%= modulename %>.todo')
        .config(configure);


    /* @ngInject */
    function configure($routeProvider) {
        $routeProvider
            .when('/todo', {
                controller: 'TodoCtrl',
                templateUrl: '/components/todo/todo.html'
            });
    }

})();
