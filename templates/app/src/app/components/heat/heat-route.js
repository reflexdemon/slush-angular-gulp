(function() {
    'use strict';

    angular
        .module('<%= modulename %>.heat')
        .config(configure);


    /* @ngInject */
    function configure($routeProvider) {
        //Heat module
        $routeProvider
            .when('/heat', {
                controller: 'HeatCtrl',
                templateUrl: '/components/view/heat.html',
                controllerAs: 'vm'
            });
    }

})();
