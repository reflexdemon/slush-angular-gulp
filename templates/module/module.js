/**
 * Creates and initilizes the module <%= module %>
 */

(function() {
    'use strict';

    <% if (config.indexOf('config')>-1){ %>
    angular
        .module('<%= scriptAppName %>', []);
    <% } else { %>
    angular
        .module('<%= scriptAppName %>', [], moduleConfiguration);

    /* @ngInject */
    function moduleConfiguration() {
        //TODO Have any module specific configurator here
    }
    <% } %>
})();
