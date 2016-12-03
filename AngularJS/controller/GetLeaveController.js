(function () {
    'use strict';

    angular
        .module('employeeManagementApp')
        .controller('GetLeaveController', GetLeaveController);

    GetLeaveController.$inject = ['$location', 'LeaveService', '$scope', 'AuthenticateService', 'jwtHelper'];

    function GetLeaveController($location, LeaveService, $scope, AuthenticateService, jwtHelper) {
        var check = AuthenticateService.checkToken();
        var tokenPayload = jwtHelper.decodeToken(check);

        LeaveService.getLeaves().then(function (state) {
            var user = tokenPayload.uid;
            var filteredData = state.data.filter(function (el) {
                return el.user.id == user;
            });
            // UNDONE: Incorrect variable name
            $scope.SingleUserLeaves = { //name decide
                dataSource: filteredData,
                sortable: true,
                pageable: {
                    refresh: true,
                    pageSizes: 5,
                    buttonCount: 2
                },
                columns: [{
                    field: "reason",
                    title: "Reason",
                    width: "120px"
                }, {
                    field: "startPeriod",
                    title: "Start Period",
                    width: "120px"
                }, {
                    field: "endPeriod",
                    title: "End Period",
                    width: "120px"
                }, {
                    field: "status",
                    title: "Status",
                    width: "120px"
                }]
            };
        });

        $scope.addLeave = function () {
            var leave = {};
            leave = $scope.info;
            leave.userID = tokenPayload.uid;
            leave.status = "Pending";
            LeaveService.addLeave(leave).then(function (state) {
                $scope.result = state.data;
                $location.path('/employeeLeaves');
            });
        }
    }
})();
