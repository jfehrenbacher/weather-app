myApp.controller('RegistrationController', 
	['$scope', 'Authentication',
	function($scope, Authentication) {

	$scope.login = function() {
		Authentication.login($scope.user)
	}; // login


	$scope.register = function() {
		Authentication.register($scope.user);
	}; // register
}]); // Controller




/* angular.module('weatherAppApp')
  .controller('RegistrationController', function ($scope, $routeParams, current, $localStorage) {
    $scope.message = "Welcome to my App";
}; */