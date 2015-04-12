(function() {
    'use strict';

    angular
        .module('<%= modulename %>.todo')
        .controller('TodoCtrl', TodoCtrl);

        /* @ngInject */
        function TodoCtrl($scope, $window) {
                $scope.todos = JSON.parse($window.localStorage.getItem('todos') || '[]');
                $scope.$watch('todos', todosListner, true);

                $scope.add = function() {
                    var todo = {
                        label: $scope.label,
                        isDone: false
                    };
                    $scope.todos.push(todo);
                    $window.localStorage.setItem('todos', JSON.stringify(angular.copy($scope.todos)));
                    $scope.label = '';
                };

                $scope.check = function(ctx) {
                    ctx.isDone = !ctx.isDone;
                };

                $scope.removeChecked = function() {
                    var todos = [];
                    for (var i = $scope.todos.length - 1; i >= 0; i--) {
                      if (!$scope.todos[i].isDone) {
                        todos.push($scope.todos[i]);
                      }
                    }
                    $scope.todos = todos;
                    $window.localStorage.setItem('todos', JSON.stringify(angular.copy($scope.todos)));
                };

                function todosListner(newTodos, oldTodos) {
                    if (newTodos !== oldTodos) {
                        $window.localStorage.setItem('todos', JSON.stringify(angular.copy($scope.todos)));
                    }
                }
            }

})();
