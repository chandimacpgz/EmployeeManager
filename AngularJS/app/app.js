// TODO: Move app.js to root.
// TODO: Remove unwanted extra lines from code. 
// NOTE: Always fix document formatting after change of code View->Advaced->Format Document
// UNDONE: Incorrect application name. Should be app/leaveApp/etc..
var app = angular.module('employeeManagementApp', [
  'ngRoute', 'ngMaterial', 'kendo.directives', 'LocalStorageModule', 'angular-jwt', 'angular-loading-bar'
]);

var authorizationServer = 'http://empauth.azurewebsites.net/';
var webApi = 'http://emp.azurewebsites.net/';

app.constant('ngAuthSettings', {
    apiServiceBaseUri: authorizationServer,
    clientId: '099153c2625149bc8ecb3e85e03f0022'
});

app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
      //common
      $routeProvider.
        when('/', {
            templateUrl: 'views/common/Login.html',
            controller: 'LoginController'
        }).
        when('/dashboard/:id', {
            templateUrl: 'views/common/MainDashBoard.html',
            controller: 'DashboardController'
        }).
        //user
        when('/employees', {
            templateUrl: 'views/Employees/Users.html',
            controller: 'UserController'
        }).
        when('/editEmployee/:id', {
            templateUrl: 'views/Employees/EditEmployee.html',
            controller: 'UserController'
        }).
        //signup
        when('/Registration', {
            templateUrl: 'views/Employees/Registration.html',
            controller: 'SignUpController'
        }).
        when('/newviewer', {
            templateUrl: 'views/employees/NewViewer.html',
            controller: 'NewViewerController'
        }).
        //department
        when('/addDepartment', {
            templateUrl: 'views/Departments/AddDepartment.html',
            controller: 'DepartmentController'
        }).
        when('/departments', {
            templateUrl: 'views/Departments/GetDepartment.html',
            controller: 'DepartmentController'
        }).
        when('/editDepartment/:id', {
            templateUrl: 'views/Departments/EditDepartment.html',
            controller: 'DepartmentController'
        }).
        //leave
        when('/leaveHomePage', {
            templateUrl: 'views/Leaves/LeaveHomepage.html',
            controller: 'LeaveDashBoardController'
        }).
        when('/employeeLeaves', {
            templateUrl: 'views/Leaves/GetLeave.html',
            controller: 'GetLeaveController'
        }).
        when('/addLeave', {
            templateUrl: 'views/Leaves/AddLeave.html',
            controller: 'GetLeaveController'
        }).
        when('/leaveRequests', {
            templateUrl: 'views/Leaves/AcceptLeaves.html',
            controller: 'LeaveRequestController'
        }).
          // UNDONE: Incorrect use of controllers
        when('/Role', {
            templateUrl: 'views/Employees/Role.html',
            controller: 'UserController'
        }).
          // UNDONE: Incorrect naming of url and document
        when('/ChangeRole/:id', {
            templateUrl: 'views/Employees/ChangeRole.html',
            controller: 'UserController'
        }).
        otherwise({
            redirectTo: '/'
        });
  }]);

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('indigo', {
          'default': '400', // by default use shade 400 from the pink palette for primary intentions
          'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
          'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
          'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
      })
      // If you specify less than all of the keys, it will inherit from the
      // default shades
      .accentPalette('purple', {
          'default': '200' // use shade 200 for default, and keep all other shades the same
      });
});

app.run(['AuthenticateService', '$http', '$rootScope', '$location', function (AuthenticateService, $http, $rootScope, $location) {
    var token = AuthenticateService.getToken();
    if (token != false) {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
    // QUESTION: Explain the meaning and requirement of this variable.
    $rootScope.sign = true;
    $rootScope.signout = function () {
        //$http.defaults.headers.common['Authorization'] = '';
        AuthenticateService.signout();
        $rootScope.sign = true;
        $location.path('/');
    }
}]);




