(function () {
    'use strict';
    angular
        .module('employeeManagementApp')
        .controller('LeaveRequestController', LeaveRequestController);
    LeaveRequestController.$inject = ['$location', '$scope', 'LeaveService', '$rootScope', 'AuthenticateService', 'jwtHelper', 'UserService'];
    function LeaveRequestController($location, $scope, LeaveService, $rootScope, AuthenticateService, jwtHelper, UserService) {
        var check = AuthenticateService.checkToken();
        var tokenPayload = jwtHelper.decodeToken(check);
        // UNDONE: Incorrect method name
        LeaveService.getLeaves().then(function (state) {// UNDONE: Incorrect method name
            var user = UserService.getUser(tokenPayload.uid).then(function (response) {
                var user = response.data;
                var filteredData = [];// NOTE: Two arrays merge not needed
                state.data.filter(function (el) {
                    if (el.user.department.id == user.departmentId) {
                        if (el.status == 'Accepted') {
                            el.infoAccept = true;
                            el.infoReject = false;
                        }
                        else if (el.status == 'Rejected') {
                            el.infoAccept = false;
                            el.infoReject = true;
                        }
                        else {
                            el.infoAccept = false;
                            el.infoReject = false;
                        }
                        filteredData.push(el);
                    }
                    else {
                        el.infoAccept = true;
                        el.infoReject = true;
                        filteredData.push(el);
                    }
                });
                $scope.AllLeaves = filteredData;
            });
        });
        $scope.acceptLeave = function (form) {
            LeaveService.acceptLeave(form).then(function (state) {
                $scope.result = state;
                $location.path('/leaveHomePage');
            });
        }
        $scope.rejectLeave = function (form) {
            LeaveService.rejectLeave(form).then(function (state) {
                $scope.result = state;
                $location.path('/leaveHomePage');
            });
        }
    }
})();