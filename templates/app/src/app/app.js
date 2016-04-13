(function() {
    'use strict';
    //This is the basic entry point of the applicaion
    angular.module('<%= modulename %>', [
        'ngRoute'<%if (!cleanConfig) { %>, 'ngResource' <% } %> <% if (exampleSettings['todo'] == 'todo') { %>,
        '<%= modulename %>.todo'<% } %><% if (exampleSettings['heat'] == 'heat') { %>,
        '<%= modulename %>.heat'<% } %>
    ]);

})();
