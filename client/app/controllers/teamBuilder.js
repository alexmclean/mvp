angular.module('quicksport.teambuilder', [])


.controller('TeamBuildController', function ($scope, Teams) {
  $scope.sports = ['Soccer', 'Football', 'Ultimate Frisbee', 'Dodgeball', 'Softball'];
  $scope.postTeam = function (){
    Teams.postTeam("Tigers");
  };

});