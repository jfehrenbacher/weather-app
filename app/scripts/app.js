'use strict';

/**
 * @ngdoc overview
 * @name weatherAppApp
 * @description
 * # weatherAppApp
 *
 * Main module of the application.
 */
var myApp = angular
  .module('weatherAppApp', [
    'firebase',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngStorage', // added to enable localStorage feature
    'ngTouch'
  ])
  .constant('FIREBASE_URL', 'https://weatherappangreg.firebaseio.com/');

  myApp.run(['$rootScope', '$location',
    function($rootScope, $location) {
      $rootScope.$on('$routeChangeError', 
        function(event, next, previous, error) {
          if(error='AUTH_REQUIRED') {
            $rootScope.message = 'Sorry, you must log in to access that page';
            $location.path('/login');
          }//AUTH REQUIRED
        });//event info
    }]);//run

  myApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'RegistrationController'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegistrationController'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: {
          currentAuth: function(Authentication) {
            return Authentication.requireAuth();
          }//current Auth
        }//resolve
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/current/:cityID', {
        templateUrl: 'views/current.html',
        controller: 'CurrentCtrl',
        controllerAs: 'current'
      })
      .when('/forecast/:cityID', {
        templateUrl: 'views/forecast.html',
        controller: 'ForecastCtrl',
        controllerAs: 'forecast'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

