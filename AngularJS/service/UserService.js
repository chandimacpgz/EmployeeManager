(function () {
    'use strict';
    app.factory('UserService', UserService);
    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};
        //service.createUser = createUser;
        service.getUsers = getUsers;
        service.deleteEmployee = deleteEmployee;
        service.updateUser = updateUser;
        service.updateRole = updateRole;
        service.getUser = getUser;
        return service;

        function getUsers() {
            return $http.get(webApi + 'api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function deleteEmployee(id) {
            return $http.delete(webApi + 'api/users/' + id).then(handleSuccess, handleError('Error deleting User'));
        }

        function getUser(id) {
            return $http.get(webApi + 'api/users/' + id).then(handleSuccess, handleError('Error getting Single User'));
        }

        function updateUser(user) {
            return $http({
                url: webApi + 'api/users/' + user.id,
                method: "PUT",
                data: user,
                headers: { 'Content-Type': 'application/json' }
            }).then(handleSuccess, handleError('Error Creating single user'));
        }

        function updateRole(user) {
            return $http({
                url: webApi + 'api/users/role',
                method: "POST",
                data: user,
                headers: { 'Content-Type': 'application/json' }
            }).then(handleSuccess, handleError('Error updating role'));
        }

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



