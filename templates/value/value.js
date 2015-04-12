(function() {
    'use strict';

    var <%= classedName %>Value = {};

    angular
        .module('<%= scriptAppName %>')
        .value('<%= classedName %>',  <%= classedName %>Value);


})();
