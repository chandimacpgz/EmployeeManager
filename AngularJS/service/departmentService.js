(function () {
    'use strict';
    app.factory('DepartmentService', DepartmentService);
    DepartmentService.$inject = ['$http', '$routeParams'];

    function DepartmentService($http, $routeParams) {
        var service = {};

        service.addDepartment = addDepartment;
        service.getDepartment = getDepartment;
        service.deleteDepartment = deleteDepartment;
        service.editDepartment = editDepartment;
        service.getSingleDepartment = getSingleDepartment;
        return service;

        function addDepartment(department) {
            return $http({
                method: 'POST',
                url: webApi + 'api/departments',
                data: department,
                headers: { 'Content-Type': 'application/json' }
            }).then(handleSuccess, handleError('Error in creating department'));
        }

        function getDepartment() {
            return $http.get(webApi + 'api/Departments/').then(handleSuccess, handleError('Error getting all department'));
        }

        function deleteDepartment(id) {
            return $http.delete(webApi + 'api/Departments/' + id).then(handleSuccess, handleError('Error deleting this department'));
        }

        function getSingleDepartment(id) {
            return $http.get(webApi + 'api/departments/' + id).then(handleSuccess, handleError('Error getting Single Department'));
        }

        function editDepartment(department) {
            return $http({
                url: webApi + 'api/Departments/' + department.id,
                method: "PUT",
                data: department,
                headers: { 'Content-Type': 'application/json' }
            }).then(handleSuccess, handleError('Error in editing this department'));

        }
        // custom functions
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