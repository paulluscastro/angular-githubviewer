(function(){
  'use strict';

  var RepositoryController = function($scope, githubService, $routeParams){

    var onUserComplete = function(data){
      $scope.user = data;
      $scope.repositories = null;
      $scope.contributors = null;
      $scope.error = null;

      githubService.getRepositories($scope.user)
        .then(onRepositoriesComplete, onError);
    };

    var onRepositoriesComplete = function(data){
      $scope.repositories = data;
      $scope.contributors = null;
      $scope.error = null;

      for(var i = 0; i < $scope.repositories.length; i++)
        if ($scope.repositories[i].name == $scope.repositoryName)
          $scope.repository = $scope.repositories[i];

      githubService.getContributors($scope.repository)
        .then(onContributorsComplete, onError);
    };

    var onContributorsComplete = function(data){
      $scope.error = null;
      $scope.contributors = data;
    };

    var onError = function(response) {
      $scope.user = null;
      $scope.repositories = null;
      $scope.repository = null;
      $scope.contributors = null;
      $scope.error = "Not found";
    }

    $scope.username = $routeParams.username;
    $scope.repositoryName = $routeParams.repository;
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
      class: ''
    },
    {
      link: '#/repository/' + $scope.username + '/' + $scope.repositoryName,
      text: $scope.repositoryName,
      class: 'active'
    }];

    $('.materialboxed').materialbox();
  }

  var app = angular.module("githubViewer");
  app.controller('RepositoryController', ['$scope', 'githubService', '$routeParams', RepositoryController]);
})();
