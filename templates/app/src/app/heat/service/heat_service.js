(function() {
        'use strict';
        angular
            .module('<%= modulename %>.heat').service('heatService', HeatService);

        /* @ngInject */
        function HeatService($http) {

            //RESTful webservice base URL
            var urlBase = '/services';

            var service = {
                toFahrenheit: toFahrenheit,
                toCelsius: toCelsius

            };
            return service;

            ///////////////////

            /**
             * Convert from fahrenheit to celsius
             * @param  Number celsius
             * @return Heat model
             */
            function toFahrenheit(celsius) {
                return $http.get(urlBase + '/c2f/' + celsius);
            }
            /**
             * Convert from celsius to fahrenheit
             * @param  Number fahrenheit
             * @return Heat model
             */
            function toCelsius(fahrenheit) {
                return $http.get(urlBase + '/f2c/' + fahrenheit);
            }
        }
    }
)();
