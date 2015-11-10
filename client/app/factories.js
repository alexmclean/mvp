angular.module('quicksport.factories', [])

.factory('Teams', function ($http, $location){
  var selectedTeam = {};
  var getTeams = function(){
    return $http({
      method: 'GET',
      url: 'api/teams'
    }).then(function (resp){
      console.log("Found teams!", resp);
      return resp.data;
    });
  };

  var navToTeam = function(team){
    selectedTeam['selected'] = team;
    $location.path('/team');
  };

  var postTeam = function (team) {
    return $http({
      method: 'POST',
      url: '/api/teams',
      //TODO make this real
      data: {teamName: team}
    }).then(function (resp) {
      console.log(resp.data);
      return resp.data;
    });
  };

  return {
    getTeams: getTeams,
    postTeam: postTeam,
    selectedTeam: selectedTeam,
    navToTeam:navToTeam
  };
});