'use strict';

/**
 * @ngdoc service
 * @name weatherAppApp.citysearch
 * @description
 * # citysearch
 * Factory in the weatherAppApp.
 */
angular.module('weatherAppApp')
  .factory('citysearch', function ($resource) {
    // Service logic
    // ...

    // Public API here
    return $resource('http://api.openweathermap.org/data/2.5/find?q=:query&type=like&mode=json&APPID=48ae397ccdbe14b61f783e22917e1be8', {}, {
      find: {
        method:'GET',
        params:{
          query: 'seattle'
        },
        isArray:false
      }
    });
  });
