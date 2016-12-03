(function () {
    'use strict';
    angular
        .module('employeeManagementApp')
        .controller('DepartmentController', DepartmentController);
    DepartmentController.$inject = ['$location', '$scope', 'DepartmentService', '$routeParams'];
    function DepartmentController($location, $scope, DepartmentService, $routeParams) {
        // NOTE: Be aware about code tabs for given line. Unwanted tabs uglifies the code
        // UNDONE: Keep constant naming for varibles. Ex: dept or department
        DepartmentService.getDepartment().then(function (state) {
            $scope.allDepartment = state;
            // QUESTION: Explain meaning of the variable name
            //$scope.departments = {
            //    dataSource: state,
            //    sortable: true,
            //    pageable: {
            //        refresh: true,
            //        pageSizes: 5,
            //        buttonCount: 2
            //    },
            //    columns: [{
            //        field: "name",
            //        title: "Department Name",
            //        width: "120px"
            //    }, {
            //        field: "location",
            //        title: "Department Location",
            //        width: "120px"
            //    },
            //    {
            //        field: "id",
            //        title:"Edit",
            //        template: "<a href='index.html/editDepartment/'#:id#'>Edit</a>",
            //        width:"50px"
            //    },
            //    {
            //        field: "id",
            //        title: "Edit",
            //        template: "<md-button class='md-raised md-warn' ng-click='deleteDepartment(id)'>Delete</md-button>",
            //        width: "50px"
            //    }]
            //};
        });
        $scope.addDepartment = function () {
            DepartmentService.addDepartment($scope.department).then(function (state) {
                $scope.result = state.data;
                $location.path('/departments');
            });
        }
        // UNDONE: Incorrect method name
        $scope.deleteDepartment = function (departmentId) {
            DepartmentService.deleteDepartment(departmentId).then(function (state) {
                $scope.result = state;
                $location.path('/');
            });
        }
        DepartmentService.getSingleDepartment($routeParams.id).then(function (state) {
            $scope.department = state;
        });
        // UNDONE: Incorrect method name
        $scope.editDepartment = function () {
            var department = $scope.department;
            department.id = $routeParams.id;
            DepartmentService.editDepartment(department).then(function (state) {
                $scope.result = state;
                $location.path('/');
            });
        }
    }
})();