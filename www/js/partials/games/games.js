angular.module('games', ['ionic', 'pickUpMobile.services'])
  .controller('GamesController', function ($scope, sharedProps) {
    $scope.pluralPlayers = false;
    $scope.enoughPlayers = false;
    $scope.getGameTime = function() {
      $scope.game = {};
      $scope.game = sharedProps.get();
      $scope.game.gameTime = moment($scope.game.startTime).format('LLLL');
      $scope.pluralPlayers = $scope.game.playRequests > 1 ? true : false;
      $scope.enoughPlayers = $scope.game.playRequests >= $scope.game.minPlayers;
    };
  });
