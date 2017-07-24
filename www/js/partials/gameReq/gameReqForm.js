// timeslot constructor
var now = Math.min(moment().get('hour'), 23);
var rangeStart = Math.max(now, 17);
var timeSlots;
if (rangeStart !== 23) {
  timeSlots = _.range(rangeStart, 23).map(function (hour) {
    return {
      id: hour.toString(),
      hour: hour,
      name: moment(hour, 'hh').format('h:mma')
    };
  });
} else {
  timeSlots = [{
    id: '0',
    hour: null,
    name: 'No more available times. Try again tomorrow!'
  }]
}

angular.module('gameReqForm', ['ionic', 'pickUpMobile.services'])
.controller('TimeSelectController', function($scope, $location, GameReq, sharedProps) {
    var gameReq = {};
    $scope.findingLocation = false;

    $scope.requestGame = function() {
      console.log('requesting Game');
      $scope.findingLocation = true;
      helpers.getLocation()
      .then(function(response) {

        var loc = response.loc.split(',');
        gameReq.location = {
          latitude: +loc[0],
          longitude: +loc[1],
        };
        gameReq.time = helpers.createGameTime($scope.data.selectedOption.hour);
        gameReq.smsNum = $scope.smsNum;
        gameReq.sport = $scope.sportInput;
        console.log(gameReq);

        GameReq.requestGame(gameReq)
          .then(function (game) {
            sharedProps.set(game);
            $location.path('/games');
          })
          .catch(function (error) {
            console.error('error requesting game ', error);
          });
      }).catch(function(error){
        console.error(error);
      });
    };


    $scope.data = {
      model: null,
      availableOptions: timeSlots,
      selectedOption: timeSlots[0]
    };
  });
