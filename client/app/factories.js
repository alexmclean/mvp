angular.module('quicksport.factories', [])

.factory('Teams', function ($http, $location){
  var selectedTeam = {};
  var getTeams = function(cb){
    return $http({
      method: 'GET',
      url: 'api/teams'
    }).then(function (resp){
      cb(resp.data);
    });
  };

  var navToTeam = function(team){
    selectedTeam['selected'] = team;
    $location.path('/team');
  };

  var postTeam = function (team) {
    console.log("poster", team);
    return $http({
      method: 'POST',
      url: '/api/teams',
      data: {teamName: team.teamName, sport: team.sport}
    }).then(function (resp) {
      return resp.data;
    });
  };

  var addTeammate = function (team, player) {
    return $http({
      method: 'POST',
      url: '/api/players',
      data: {team: team, player: player}
    }).then(function (resp){
      return resp.data;
    });
  };

  var updatePaymentStatus = function (team, playerIndex) {
    return $http({
      method: 'POST',
      url: '/api/players/update',
      data: {team: team, playerIndex: playerIndex}
    }).then(function (resp){
      return resp.data;
    });
  };

  var addGame = function (team, gameTime){
    var endTime = new Date(gameTime.getTime()+ 3600000);
    var event = {
      'summary': 'Game for '+ team.teamName,
      //'location': '800 Howard St., San Francisco, CA 94103',
      //'description': '',
      'start': {
        'dateTime': gameTime
      },
      'end': {
        'dateTime': endTime
      },
      /* if we want to email the other members of your team
      'attendees': [
        {'email': 'lpage@example.com'},
        {'email': 'sbrin@example.com'}
      ]
      */
    };
    var CLIENT_ID = '34060817271-5kbksejp5a09ioivdi5as3f7gf5ct9hi.apps.googleusercontent.com';
    //Client secret: RyLtlbTafI4RsAAIa9P9D9Gn
    var SCOPES = ["https://www.googleapis.com/auth/calendar"];

    //Check if current user has authorized this application.
    function checkAuth() {
      gapi.auth.authorize(
        {
          'client_id': CLIENT_ID,
          'scope': SCOPES.join(' '),
          'immediate': true
        }, loadCalendarApi);
    };
    //load Google Calendar API
    function loadCalendarApi() {
        gapi.client.load('calendar', 'v3', sendEvent);
    };
    //Create and send event to Google Calendar with our client ID
    var sendEvent = function (){
      var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
      });
      request.execute(function(event) {
        console.log('Event created: ', event);
      });
    };

    gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES, immediate: false}, loadCalendarApi);
  };

  return {
    getTeams: getTeams,
    postTeam: postTeam,
    selectedTeam: selectedTeam,
    navToTeam:navToTeam,
    addTeammate: addTeammate,
    updatePaymentStatus: updatePaymentStatus,
    addGame: addGame
  };
});