angular.module('quicksport.teampage', [])


.controller('TeamPageController', function ($scope, $location, Teams){
  $scope.team = Teams.selectedTeam['selected'];
  $scope.addPlayer = function (player){
    var playerObj = {name: player.name, email: player.email, paid: false};
    Teams.addTeammate($scope.team, playerObj);
    $scope.team.members.push(playerObj);
    $scope.member.name = '';
    $scope.member.email = '';
  };
  $scope.updatePayment = function (ind) {
    $scope.team.members[ind].paid = !$scope.team.members[ind].paid;
    Teams.updatePaymentStatus($scope.team, ind);
  };

  $scope.addGame = function (game) {
    console.log(game);
    var hour = game.time.getHours();
    var minutes = game.time.getMinutes();
    game.date.setHours(hour);
    game.date.setMinutes(minutes);
    Teams.addGame($scope.team, game.date);
  };
});