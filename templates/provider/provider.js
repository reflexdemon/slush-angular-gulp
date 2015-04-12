(function() {
    'use strict';

angular
  .module('<%= scriptAppName %>')
        .provider('<%= classedName %>',  <%= classedName %>Provider);

    /* @ngInject */
    function <%= classedName %>Provider() {
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
