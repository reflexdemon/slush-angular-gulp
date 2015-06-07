(function() {
    'use strict';

    angular
        .module('<%= scriptAppName %>').filter('<%= classedName %>', <%= classedName %>);

    function <%= classedName %>() {
        return <%= classedName %>Filter;
    }

    ///////////////////
    function <%= classedName %>Filter(input) {
            return input ? '\u2713' : '\u2718';
    }
})();
