(function() {
    'use strict';

    angular
        .module('<%= scriptAppName %>').filter('<%= classedName %>', <%= classedName %>Filter);
    ////////////////////

    function <%= classedName %>() {
        return function (input) {
            return input ? '\u2713' : '\u2718';
    };
}
})();
