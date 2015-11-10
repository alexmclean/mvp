angular.module('quicksport.teampage', [])


.controller('TeamPageController', function ($scope, Teams){
  $scope.team = Teams.selectedTeam['selected'];
});