(function() {
    'use strict';

    angular.module('<%= modulename %>', [
        'ngRoute',
        <% if (answers.example.settings.todo) %>'<%= modulename %>.todo', <% } %>
        <% if (answers.example.settings.heat) %>'<%= modulename %>.heat' <% } %>
    ]);
})();
