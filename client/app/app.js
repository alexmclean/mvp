var myApp = angular.module('myApp', [ 'quicksport.teams', 'quicksport.teambuilder','ui.router']);

myApp.config(function ($stateProvider) {
  console.log('hello');
  $stateProvider
    .state('/home', {
      url:'/home',
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
    });
  });