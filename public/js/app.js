'use strict';

// Declare app level module which depends on filters, and services

angular.module('blogApp', [
  'blogApp.controllers'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/viewPosts', {
      templateUrl: 'partials/postTemplate.html',
      controller: 'PostController'
    }).otherwise({
      redirectTo: '/viewPosts'
    });
    
  $locationProvider.html5Mode(true);
});
