angular.module('quicksport.teambuilder', [])


.controller('TeamBuildController', function ($scope, Teams) {
  $scope.sports = ['Soccer', 'Football', 'Ultimate Frisbee', 'Dodgeball', 'Softball', 'Tennis'];
  $scope.postTeam = function (team){
    console.log(team);
    Teams.postTeam(team);
  };

});