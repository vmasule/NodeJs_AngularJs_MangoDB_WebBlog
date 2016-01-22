'use strict';

/* Controllers */

angular.module('blogApp.controllers', ['ngSanitize']).
  controller('PostController', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/getPosts'
    }).
    success(function (data, status, headers, config) {
      console.log(data);
      $scope.posts = data;
    }).
    error(function (data, status, headers, config) {
      $scope.posts = 'Error!';
    });

  });
