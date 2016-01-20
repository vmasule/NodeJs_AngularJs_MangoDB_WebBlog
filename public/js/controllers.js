'use strict';

/* Controllers */

angular.module('blogApp.controllers', ['ngSanitize']).
  controller('PostController', function ($scope, $http) {

    console.log("Inside controller");
    $http({
      method: 'GET',
      url: '/getPosts'
    }).
    success(function (data, status, headers, config) {
      console.log(data);
      $scope.posts = data;
      //$scope.$apply();
    }).
    error(function (data, status, headers, config) {
      $scope.posts = 'Error!';
    });

  });
