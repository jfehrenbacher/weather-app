'use strict';

/**
 * @ngdoc function
 * @name weatherAppApp.controller:CurrentCtrl
 * @description
 * # CurrentCtrl
 * Controller of the weatherAppApp
 */
angular.module('weatherAppApp')
  .controller('CurrentCtrl', function ($scope, $routeParams, current, $localStorage) {
    $scope.saveCity = function(city){
    var cityData = {
        'name': city.name,
        'id': city.id
    };
    if (!$localStorage.savedCities){
        $localStorage.savedCities = [cityData];
    } else {
        // We have already saved some cities. 
        // Check to make sure we haven't already saved the current city.
        var save = true; // Initialize the save decision variable.
        // Use this loop to check if we've already saved the city.
        for (var i=0; i < $localStorage.savedCities.length; i++){
            if ($localStorage.savedCities[i].id == cityData.id) {
                // This is a duplicate, so don't save (variable set to false).
                save = false;
            }
        }
        if (save===true){
            $localStorage.savedCities.push(cityData);
            $scope.citySaved = {
            	'success': true
            };
        } else {
            console.log('city already saved');
            $scope.citySaved = {
            	'duplicate':true
            };
        }
    }
};

    $scope.cityID = $routeParams.cityID;

    $scope.currentWeather = current.query({
        cityID: $routeParams.cityID
    });

  });
