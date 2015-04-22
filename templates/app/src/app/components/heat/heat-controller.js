/**
 * Controller
 */
(function() {
    'use strict';
    //Defenition
    angular
        .module('<%= modulename %>.heat').controller('HeatCtrl', HeatCtrl);

    // HeatCtrl.$inject = ['$scope', 'HeatService'];

    /**
     * [HeatCtrl description]
     * @ngInject
     */
    function HeatCtrl($scope, heatService) {
        /*jshint validthis: true */
        var vm = this;
        vm.f2c = f2c;
        vm.c2f = c2f;
        init();


        /**
         * Inits the ctrl.
         */
        function init() {
            $scope.defaultValue = {
                celsius: 0.0,
                fahrenheit: 0.0
            };
            $scope.testOptions = {
                min: -273,
                step: 1,
                max: 273,
                value: 0,
                tooltip: 'show'
            };
            $scope.heat = $scope.defaultValue;
        }

        function f2c() {
            heatService.toCelsius($scope.heat.fahrenheit).success(function(heat) {
                $scope.heat = heat;
            }).error(function(error) {
                $scope.messsage = error;
                $scope.heat = $scope.defaultValue;
            });
        }

        function c2f() {
            heatService.toFahrenheit($scope.heat.celsius).success(function(heat) {
                $scope.heat = heat;
            }).error(function(error) {
                $scope.messsage = error;
                $scope.heat = $scope.defaultValue;
            });
        }

    }
})();
