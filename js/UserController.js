(function(){
  'use strict';

  var UserController = function($scope, githubService, $routeParams){

    var onUserComplete = function(data){
      $scope.user = data;
      $scope.error = null;

      githubService.getRepositories($scope.user)
        .then(onReposComplete, onError);
    };

    var onReposComplete = function(data){
      $scope.repositories = data;
      $scope.error = null;
    };

    var onError = function(response) {
      $scope.user = null;
      $scope.repositories = null;
      $scope.error = "Not found.";
    }

    $scope.align = function(column){
      debugger;
      $scope.repoSortOrder = $scope.repoSortOrder == '+' + column ? '-' + column : '+' + column;
    }

    $scope.username = $routeParams.username;
    $scope.repoSortOrder = '-stargazers_count';
    githubService.getUser($scope.username).then(onUserComplete, onError);

    // Defining breadcrumbs
    $scope.steps = [{
      link: '#/main',
      text: 'Search',
      class: ''
    },
    {
      link: '#/user/' + $scope.username,
      text: $scope.username,
      class: 'active'
    }];
  }

  var app = angular.module("githubViewer");
  app.controller('UserController', ['$scope', 'githubService', '$routeParams', UserController]);
})();
