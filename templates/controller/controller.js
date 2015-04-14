(function() {
    'use strict';

    angular
        .module('<%= scriptAppName %>')
        .controller('<%= classedName %>Ctrl', <%= classedName %>Ctrl);
    //////////////////////

    /**
     * @ngdoc function
     * @name <%= scriptAppName %>.controller:<%= classedName %>Ctrl
     * @description
     * # <%= classedName %>Ctrl
     * Controller of the <%= scriptAppName %>
     * @ngInject
     */
    function <%= classedName %>Ctrl() {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    }

})();
