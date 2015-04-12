(function() {
    'use strict';

    angular
        .module('<%= scriptAppName %>')
        .config( <%= classedName %>Route);


    /* @ngInject */
    function <%= classedName %>Route($routeProvider) {
        $routeProvider
            .when('/<%= module %>', { //Default
                controller: '<%= classedModule %>Ctrl',
                templateUrl: '<%= module %>/<%= module %>.html'
            });

    }

})();
