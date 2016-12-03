(function () {
    'use strict';
    app.factory('AuthenticateService', AuthenticateService);
    AuthenticateService.$inject = ['$http', '$rootScope', 'ngAuthSettings', '$q', 'localStorageService', 'jwtHelper', '$location'];
    function AuthenticateService($http, $rootScope, ngAuthSettings, $q, localStorageService, jwtHelper, $location) {
        var service = {};
        var serviceBase = ngAuthSettings.apiServiceBaseUri;

        service.getData = getData;
        service.setUser = setUser;
        service.login = login;
        service.checkToken = checkToken;
        service.getToken = getToken;
        service.signout = signout;
        service.checkUser = checkUser;

        return service;
        //check token availaibility
        function checkToken() {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                var token = authData.token;
                var bool = jwtHelper.isTokenExpired(token);
                if (bool) {
                    return null;
                } else
                    return token;
            } else
                return null;

        }
        function getToken() {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                var token = authData.token;
                var bool = jwtHelper.isTokenExpired(token);
                if (bool) {
                    return false;

                } else { return token; }

            } else
                return false;
        }
        //login service
        function login(loginData) {
            // encrypt password 
            var key = CryptoJS.enc.Utf8.parse('8080808080808080');
            var iv = CryptoJS.enc.Utf8.parse('8080808080808080');
            loginData.password = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(loginData.password), key,
               {
                   keySize: 128 / 8,
                   iv: iv,
                   mode: CryptoJS.mode.CBC,
                   padding: CryptoJS.pad.Pkcs7
               });
            // end encrypt
            var data = "username=" + loginData.name + "&password=" + loginData.password + "&grant_type=password&client_id=" + ngAuthSettings.clientId;
            var deffered = $q.defer();
            $http.post(serviceBase + 'oauth2/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                localStorageService.set('authorizationData', { token: response.access_token, name: loginData.name, refreshToken: "", useRefreshTokens: false, expiretime: response.expires_in });
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.access_token;
                deffered.resolve(response);
            }).error(function (err, status) {
                signout();
                deffered.reject(err);
            });
            return deffered.promise;
        };
        //signout
        function signout() {
            localStorageService.remove('authorizationData');
        }

        function checkUser(userID) {
            return $http.get(webApi + 'api/users/' + userID).then(handleSuccess, handleError('Error getting all users'));
        }

        function getData() {
            return $http.get(webApi + 'api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function setUser(user) {
            $rootScope.user = user;
            $rootScope.department = user.departments.deptId;
        }
        // UNDONE: Duplicate method on all services
        function handleSuccess(res) {
            return res;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
})();