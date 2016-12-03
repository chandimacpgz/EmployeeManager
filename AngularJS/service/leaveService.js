(function () {
    'use strict';
    app.factory('LeaveService', LeaveService);
    LeaveService.$inject = ['$http', '$rootScope'];

    function LeaveService($http, $rootScope) {
        var service = {};

        service.getLeaves = getLeaves;
        service.addLeave = addLeave;
        service.acceptLeave = acceptLeave;
        service.rejectLeave = rejectLeave;
        return service;

        function getLeaves() {
            return $http.get(webApi + 'api/Leaves').then(handleSuccess, handleError('Error getting all users'));
        }

        function addLeave(leave) {
            return $http({
                url: webApi + 'api/Leaves',
                method: "POST",
                data: leave,
                headers: { 'Content-Type': 'application/json' }
            }).then(handleSuccess, handleError('Error in creating a leave'));
        }
        // UNDONE: JS code conventions
        function acceptLeave(form) {
            form.status = "Accepted";
            return $http({
                url: webApi + 'api/Leaves/' + form.id,
                method: "PUT",
                data: form,
                headers: { 'Content-Type': 'application/json' }
            }).then(handleSuccess, handleError('Error in accpeting leaves'));
        }
        // UNDONE: JS code conventions
        function rejectLeave(form) {
            form.status = "Rejected";
            return $http({
                url: webApi + 'api/Leaves/' + form.id, //error in updating a show in view
                method: "PUT",
                data: form,
                headers: { 'Content-Type': 'application/json' }
            }).then(handleSuccess, handleError('Error in accpeting leaves'));
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

