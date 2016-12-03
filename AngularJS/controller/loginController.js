(function () {
    'use strict';

    angular
        .module('employeeManagementApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$scope', 'AuthenticateService', '$rootScope', 'ngAuthSettings', 'jwtHelper'];

    function LoginController($location, $scope, AuthenticateService, $rootScope, ngAuthSettings, jwtHelper) {

        //check token availability
        var check = AuthenticateService.checkToken();

        if (check != null) {
            var tokenPayload = jwtHelper.decodeToken(check);
            if (tokenPayload.role == "Admin") {
                $location.path('/dashboard/1');//redirect to dashboard
            }
            else if (tokenPayload.role == "Manager") {
                $location.path('/dashboard/2');//redirect to dashboard
            }
            else if (tokenPayload.role == "Viewer") {
                $location.path('/dashboard/3');//redirect to dashboard
            }
        }
        else {
            $location.path('/'); //redirect to loginpage
        }

        //login and get the token
        $scope.login = function () {
            AuthenticateService.login($scope.logindata).then(function (response) {
                var Dtoken = jwtHelper.decodeToken(response.access_token);
                var userID = Dtoken.uid;
                var checkID;
                AuthenticateService.checkUser(userID).then(function (res) {
                    checkID = res.data;
                    if (checkID != null) {
                        var check = AuthenticateService.checkToken();
                        $rootScope.user = res.data;
                        if (check != null) {
                            var tokenPayload = jwtHelper.decodeToken(check);
                            if (tokenPayload.role == "Admin") {
                                $location.path('/dashboard/1');//redirect to dashboard
                            }
                            else if (tokenPayload.role == "Manager") {
                                $location.path('/dashboard/2');//redirect to dashboard
                            }
                            else if (tokenPayload.role == "Viewer") {
                                $location.path('/dashboard/3');//redirect to dashboard
                            }
                        }
                    }
                    else
                        $location.path('/newviewer');
                });
            },
            function (err) {
                $scope.message = err.error_description;
            });
        };
        //signup routing
        $scope.signUp = function () {
            $location.path('/Registration');
        }
    }
})();