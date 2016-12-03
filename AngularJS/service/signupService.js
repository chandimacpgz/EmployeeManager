(function () {
    'use strict';
    app.factory('SignUpService', SignUpService);
    SignUpService.$inject = ['$http'];
    function SignUpService($http) {
        var service = {};
        service.register = register;
        return service;

        function register(info) {
            return $http({
                method: 'POST',
                url: authorizationServer + 'api/users/register',
                data: info,
                headers: { 'Content-Type': 'application/json' }
            }).then(handleSuccess, handleError('Error Creating new user'));
        }

        function handleSuccess(res) {
            return res.data;
        }
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
})();