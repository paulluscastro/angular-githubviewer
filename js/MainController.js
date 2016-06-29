(function(){
  'use strict';

  var MainController = function($scope, $interval, $location) {
    var decrementCountdown = function(){
      $scope.countdown -= 1;
      if ($scope.countdown < 1) {
        $scope.search($scope.username);
      }
    }

    var countdownInterval = null;
    var startCountdown = function() {
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    }

    $scope.search = function(username){
      if (countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }
      $location.path('/user/' + username)
    }

    // Defining breadcrumbs
    $scope.steps = [{
      link: '#/main',
      text: 'Search',
      class: 'active'
    }];

    $scope.username = 'angular';
    $scope.countdown = 5;
    // startCountdown();
  };

  var app = angular.module("githubViewer");
  app.controller('MainController', ['$scope', '$interval', '$location', MainController]);
})();
