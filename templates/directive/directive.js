(function() {
    'use strict';

    angular
        .module('<%= scriptAppName %>')
        .directive('<%= classedName %>', <%= classedName %>);

    /* @ngInject */
    function <%= classedName %> () {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: Controller,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    /* @ngInject */
    function Controller () {

    }
})();
