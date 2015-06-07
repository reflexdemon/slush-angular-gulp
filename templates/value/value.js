(function() {
    'use strict';

    angular
        .module('<%= scriptAppName %>')
        .value('<%= classedName %>',  <%= classedName %>Value);


    var <%= classedName %>Value = {};


})();
