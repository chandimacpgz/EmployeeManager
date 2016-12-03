// UNDONE: Share controller
(function () {
    'use strict';

    angular
        .module('employeeManagementApp')
        .controller('UserController', UserController);

    UserController.$inject = ['$location', '$scope', 'UserService', '$routeParams', 'DepartmentService'];

    function UserController($location, $scope, UserService, $routeParams, DepartmentService) {

        UserService.getUsers().then(function (state) {
            $scope.date = new Date();
            $scope.allusers = state.data;
        });

        DepartmentService.getDepartment().then(function (state) {
            $scope.departments = state;
        });

        $scope.deleteEmployee = function (id) {
            UserService.deleteEmployee(id).then(function (state) {
                $scope.result = state.data;
                $location.path('/');
            });
        }

        UserService.getUser($routeParams.id).then(function (state) {
            $scope.user = state.data;
        });

        $scope.updateUser = function () {
            var user = $scope.user;
            user.id = $routeParams.id;
            UserService.updateUser(user).then(function (state) {
                $scope.result = state.data;
                $location.path('/');
            });
        }

        $scope.changeRole = function () {
            UserService.updateRole($scope.user).then(function (state) {
                $scope.result = state.data;
                $location.path('/Role');
            });
        }
    }
})();
