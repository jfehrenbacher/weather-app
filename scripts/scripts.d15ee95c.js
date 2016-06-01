"use strict";var myApp=angular.module("weatherAppApp",["firebase","ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngStorage","ngTouch"]).constant("FIREBASE_URL","https://weatherappangreg.firebaseio.com/");myApp.config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/login.html",controller:"RegistrationController"}).when("/register",{templateUrl:"views/register.html",controller:"RegistrationController"}).when("/main",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/current/:cityID",{templateUrl:"views/current.html",controller:"CurrentCtrl",controllerAs:"current"}).when("/forecast/:cityID",{templateUrl:"views/forecast.html",controller:"ForecastCtrl",controllerAs:"forecast"}).otherwise({redirectTo:"/"})}]),angular.module("weatherAppApp").controller("MainCtrl",["$scope","citysearch","$localStorage",function(a,b,c){a.citiesFound=b.find(),a.storage=c,a.findCities=function(){a.citiesFound=b.find({query:a.location}),a.searchQuery=a.location}}]),angular.module("weatherAppApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("weatherAppApp").factory("current",["$resource",function(a){return a("http://api.openweathermap.org/data/2.5/weather?id=:cityID&units=imperial&APPID=48ae397ccdbe14b61f783e22917e1be8",{},{query:{method:"GET",params:{cityID:"4717560"},isArray:!1}})}]),angular.module("weatherAppApp").factory("citysearch",["$resource",function(a){return a("http://api.openweathermap.org/data/2.5/find?q=:query&type=like&mode=json&APPID=48ae397ccdbe14b61f783e22917e1be8",{},{find:{method:"GET",params:{query:"seattle"},isArray:!1}})}]),angular.module("weatherAppApp").controller("CurrentCtrl",["$scope","$routeParams","current","$localStorage",function(a,b,c,d){a.saveCity=function(b){var c={name:b.name,id:b.id};if(d.savedCities){for(var e=!0,f=0;f<d.savedCities.length;f++)d.savedCities[f].id==c.id&&(e=!1);e===!0?(d.savedCities.push(c),a.citySaved={success:!0}):(console.log("city already saved"),a.citySaved={duplicate:!0})}else d.savedCities=[c]},a.cityID=b.cityID,a.currentWeather=c.query({cityID:b.cityID})}]),angular.module("weatherAppApp").factory("forecast",["$resource",function(a){return a("http://api.openweathermap.org/data/2.5/forecast/daily?id=:cityID&cnt=16&units=imperial&APPID=48ae397ccdbe14b61f783e22917e1be8",{},{query:{method:"GET",params:{cityID:"4717560"},isArray:!1}})}]),angular.module("weatherAppApp").controller("ForecastCtrl",["$scope","$routeParams","forecast",function(a,b,c){a.cityID=b.cityID,a.forecastData=c.query({cityID:b.cityID})}]),myApp.controller("RegistrationController",["$scope","$firebaseAuth","FIREBASE_URL",function(a,b,c){var d=new Firebase(c),e=b(d);a.login=function(){a.message="Welcome, "+a.user.email},a.register=function(){e.$createUser({email:a.user.email,password:a.user.password}).then(function(b){a.message="Hi, "+a.user.firstname+"! Thanks for registering!"})["catch"](function(b){a.message=b.message})}}]),angular.module("weatherAppApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/current.html",'<h1>Current Weather for {{currentWeather.name}}</h1> <dl> <dt>Currently</dt> <dd>{{currentWeather.weather[0].main}}</dd> <dd>{{currentWeather.weather[0].description}}</dd> <dt>Temperature</dt> <dd>{{currentWeather.main.temp}} &deg;F</dd> <dt>Wind</dt> <dd>{{currentWeather.wind.speed}} mph at {{currentWeather.wind.deg}} &deg;</dd> <dt>Clouds</dt> <dd>{{currentWeather.clouds.all}}%</dd> </dl> <p><a ng-href="/#/forecast/{{cityID}}" class="btn btn-lg btn-primary">View 16-day Forecast</a></p> <p><button class="btn btn-sm btn-primary" ng-click="saveCity(currentWeather)">Save City</button></p> <div ng-messages="citySaved"> <p class="city-saved-alert bg-success text-success" ng-message="success"> {{currentWeather.name}} has been saved to your list of cities. </p> <p class="city-saved-alert bg-warning text-warning" ng-message="duplicate"> {{currentWeather.name}} has already been saved to your list of cities. </p> </div>'),a.put("views/forecast.html",'<h1>16-day Forecast for {{forecastData.city.name}} {{forecastData.city.country}}</h1> <dl ng-repeat="prediction in forecastData.list" class="weather-forecast"> <dt>Forecast for {{weather.dt*1000 | date:\'MMM dd, yyy\'}}</dt> <dd>{{prediction.weather[0].main}}</dd> <dd>{{prediction.weather[0].description}}</dd> <dt>Temperature</dt> <dd>Min: {{prediction.temp.min}} &deg;F Max: {{prediction.temp.max}} &deg;F</dd> </dl> <p><a ng-href="/#/current/{{cityID}}" class="btn btn-lg btn-primary">View Current Weather</a></p>'),a.put("views/login.html",'<section class="card login"> <form name="myform" ng-submit="login()" novalidate> <div class="textintro"> <h1>Hi there!</h1> <p>Log-in to access weather stuff</p> <p class="message" ng-show="message">{{ user }}</p> </div> <fieldset> <input type="email" name="email" placeholder="Email" ng-model="user.email" ng-required="true"> <p class="error validationerror" ng-show="myform.email.$invalid && myform.\n			 email.$touched"> Must be a valid email</p> <input type="password" name="password" placeholder="Password" ng-model="user.password" ng-required="true"> <p class="error validationerror" ng-show="myform.password.$invalid && myform.\n			 password.$touched"> Password is required</p> </fieldset> <button type="submit" class="btn" ng-disabled="myform.$invalid">Login</button> <p>or<a href="#/register">Register</a></p><p> </p></form> </section>'),a.put("views/main.html",'<div ng-app class="jumbotron" ng-controller="MainCtrl"> <h1>Select Your City</h1> <p class="lead"> <div ng-init="location=\'Seattle\'"> <p> <label for="location">Location: <input type="text" name="location" ng-model="location"> </label> </p> <p> <button class="btn btn-lg btn-primary" ng-click="findCities()">Find City</button> </p> </div> <div ng-if="searchQuery"> <p class="lead">{{citiesFound.count}} cities found matching the query: {{searchQuery}}.</p> <dl ng-repeat="city in citiesFound.list"> <dt>{{city.name}}, {{city.sys.country}}</dt> <dd>{{city.weather[0].main}} - {{city.weather[0].description}}</dd> <dt>Temperature</dt> <dd>{{city.main.temp}} &deg;F</dd> <dd><a ng-href="#/current/{{city.id}}" class="btn btn-lg btn-primary">View Weather</a></dd> </dl> <div ng-if="storage.savedCities"> <h2>Saved Cities</h2> <ul class="saved-cities-list"> <li ng-repeat="city in storage.savedCities"> <a ng-href="#/current/{{city.id}}" class="btn btn-lg btn-primary">{{city.name}}</a> </li></ul></div> </div></p> </div>'),a.put("views/register.html",'<section class="card register"> <form name="myform" ng-submit="register()" novalidate> <div class="textintro"> <h1>Register</h1> <p>To access site features</p> <p class="message" ng-show="message">{{ message }}</p> </div> <fieldset> <input type="text" name="firstname" placeholder="First Name" ng-model="user.firstname" ng-required="true"> <p class="error validationerror" ng-show="myform.firstname.$invalid && myform.\n			 firstname.$touched"> First name required</p> <input type="text" name="lastname" placeholder="Last Name" ng-model="user.lastname" ng-required="true"> <p class="error validationerror" ng-show="myform.lastname.$invalid && myform.\n			 lastname.$touched"> Last name required</p> <input type="email" name="email" placeholder="Email" ng-model="user.email" ng-required="true"> <p class="error validationerror" ng-show="myform.email.$invalid && myform.\n			 email.$touched"> Must be a valid email</p> <input type="password" name="password" placeholder="Password" ng-model="user.password" ng-required="true"> <p class="error validationerror" ng-show="myform.password.$invalid && myform.\n			 password.$touched"> Password is required</p> </fieldset> <button type="submit" class="btn" ng-disabled="myform.$invalid">Register</button> <p>or <a href="#/login">Login</a>,</p> </form> </section>')}]);