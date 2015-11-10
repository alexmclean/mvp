angular.module('quicksport.teams', [])


.controller('TeamsController', function ($scope, $location, $state, Teams) {

  Teams.getTeams(function (data){
    $scope.data = data;
  });

  $scope.navToTeamPage = function (ind){
    Teams.navToTeam($scope.data[ind]);
  };

  $scope.makeTeam = function(){
    console.log("making team");
    $location.path('/teamBuilder');
  };
});