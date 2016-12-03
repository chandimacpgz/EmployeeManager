(function () {
    'use strict';
    angular
        .module('employeeManagementApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', '$location', '$routeParams', 'AuthenticateService', '$rootScope'];
    function DashboardController($scope, $location, $routeParams, AuthenticateService, $rootScope) {
        // disableling functionalites for different type of users 
        $rootScope.sign = false;
        var data = $routeParams.id;

        var eedit = document.getElementById('eedit');
        var eview = document.getElementById('eview');
        var dadd = document.getElementById('dadd');
        var dedit = document.getElementById('dedit');
        var dview = document.getElementById('dview');
        var croll = document.getElementById('croll');

        // NOTE: Use triple equal operator. Read http://www.impressivewebs.com/why-use-triple-equals-javascipt/.
        if (2 === data) {
            dadd.style.display = 'none';
        } else if (3 === data) {
            dadd.style.display = 'none';
            eedit.style.display = 'none';
            dedit.style.display = 'none';
            croll.style.display = 'none';
        }
        //end code 
        $scope.users = function () {
            $location.path('/employees');
        }
        $scope.addDepartment = function () {
            $location.path('/addDepartment');
        }
        $scope.viewDepartments = function () {
            $location.path('/departments');
        }
        $scope.editUser = function () {
            $location.path('/editEmployee');
        }
        $scope.editDepartment = function () {
            $location.path('/editDepartment');
        }
        $scope.LeaveHandle = function () {
            $location.path('/leaveHomePage');
        }
        $scope.Role = function () {
            $location.path('/Role');
        }
        $scope.getLeave = function () {
            $location.path('/employeeLeaves');
        }
        $scope.addLeave = function () {
            $location.path('/addLeave');
        }
        $scope.acceptLeave = function () {
            $location.path('/leaveRequests');
        }
    }
})();
