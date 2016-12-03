(function () {
    'use strict';
    angular
        .module('employeeManagementApp')
        .controller('NewViewerController', NewViewerController);

    NewViewerController.$inject = ['$location', '$scope', 'NewViewerService', 'AuthenticateService', 'jwtHelper' , 'DepartmentService'];

    function NewViewerController($location, $scope, NewViewerService, AuthenticateService, jwtHelper , DepartmentService) {
        $scope.AddViewer = function () {
            var check = AuthenticateService.checkToken();
            var tokenPayload = jwtHelper.decodeToken(check);
            $scope.viewer.id = tokenPayload.uid;
            NewViewerService.AddViewer($scope.viewer).then(function (state) {
                $location.path('/dashboard/3');//redirect to dashboard
            });
        }


        DepartmentService.getDepartment().then(function (state) {
            $scope.departments = state;


        });



    }
})();
