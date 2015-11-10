var myApp = angular.module('myApp', [ 
  'quicksport.teams', 
  'quicksport.factories', 
  'quicksport.teambuilder',
  'quicksport.teampage',
  'ui.router']);

myApp.config(function ($stateProvider) {
  $stateProvider
    .state('/home', {
      url:'/home',
      templateUrl: 'home.html'
    })
    .state('/', {
      url: '/home',
      templateUrl: 'home.html'
    })
    .state('/teams', {
      url: '/teams',
      templateUrl: 'teams.html',
      controller: 'TeamsController'
    })
    .state('/teamBuilder', {
      url:'/teamBuilder',
      templateUrl: 'teamBuilder.html',
      controller: 'TeamBuildController'
    })
    .state('/team', {
      url:'/team',
      templateUrl: 'team.html',
      controller: 'TeamPageController'
    });
  });