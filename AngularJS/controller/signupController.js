(function () {
    'use strict';

    angular
        .module('employeeManagementApp')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$location', '$scope', 'SignUpService'];

    function SignUpController($location, $scope, SignUpService) {

        $scope.register = function () {
            if ($scope.info.password != $scope.info.confirmPassword) {
                $scope.checkPassword = true;
            }
            else {
                // UNDONE: JS code conventions
                $scope.checkPassword = false;
                SignUpService.register($scope.info).then(function (response) {
                    $location.path('/');
                });
            }
        }
    }
})();
