(function() {
    'use strict';

    angular
        .module('<%= scriptAppName %>')
        .factory('<%= classedName %>Factory',  <%= classedName %>Factory);


    /* @ngInject */
    function <%= classedName %>Factory() {
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
