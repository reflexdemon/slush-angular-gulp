(function() {
    'use strict';

    angular.module('<%= scriptAppName %>').filter('<%= classedName %>', function() {
        return function(input) {
            return input ? '\u2713' : '\u2718';
        };
    });
})();
