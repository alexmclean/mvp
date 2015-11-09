angular.module('quicksport.teams', [])


.controller('TeamsController', function ($scope, $location, $state) {
  $scope.data = [{teamname: "Blackhawks", sport: "Lacrosse", members: ["Alice", "Sam", "Josh"]}, 
                {teamname:"Cougars", sport:"Soccer", members: ["Aex", "Brad", "Sally"]}];

  $scope.makeTeam = function(){
    console.log("making team");
    $location.path('/teamBuilder');
  };
});