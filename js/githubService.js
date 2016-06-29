(function(){
  'use strict';

  var githubService = function($http){

    var getUser = function(username){
      return $http.get('https://api.github.com/users/' + username)
        .then(function(response){
          return response.data;
        });
    }

    var getRepositories = function(user){
      return $http.get(user.repos_url)
        .then(function(response){
          return response.data;
        });
    }

    var getContributors = function(repository){
      return $http.get(repository.contributors_url)
        .then(function(response){
          return response.data;
        });
    }

    return {
      getUser: getUser,
      getRepositories: getRepositories,
      getContributors: getContributors
    };
  }

  var app = angular.module("githubViewer");
  app.factory("githubService", githubService);

})();
