(function () {
    'use strict'

    angular
        .module('<%= scriptAppName %>')
        .config(<%= classedName %>Config);

    /* @ngInject */
    function <%= classedName %>Config($provide) {
        $provide.decorator('$<%= classedName %>Handler', extend<%= classedName %>Handler);
    }

    /* @ngInject */
    function extend<%= classedName %>Handler($delegate) {
        return function(<%= classedName %>, cause) {
            $delegate(<%= classedName %>, cause);
            var data = {
                <%= classedName %>: <%= classedName %>
            };
        };
    }

})();
