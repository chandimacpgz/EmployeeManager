(function () {
    'use strict';
    app.factory('NewViewerService', NewViewerService);
    NewViewerService.$inject = ['$http'];
    function NewViewerService($http) {
        var service = {};

        service.AddViewer = AddViewer;
        return service;
        // QUESTION: Explain this
        function AddViewer(newV) {
            return $http({
                method: 'POST',
                url: 'http://emp.azurewebsites.net/api/users/newViewer',
                data: newV,
                headers: { 'Content-Type': 'application/json' }
            }).then(handleSuccess, handleError('Error viewing a new user'));
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
})();;