angular.module('quicksport.teams', [])


.controller('TeamsController', function ($scope, $location, $state, Teams) {
  $scope.data = [{teamname: "Blackhawks", sport: "Lacrosse", members: ["Alice", "Sam", "Josh"]}, 
                {teamname:"Cougars", sport:"Soccer", members: ["Aex", "Brad", "Sally"]}];

  $scope.teams = Teams.getTeams();
  $scope.navToTeamPage = function (ind){
    Teams.navToTeam($scope.data[ind]);
  };

  $scope.makeTeam = function(){
    console.log("making team");
    $location.path('/teamBuilder');
  };
});