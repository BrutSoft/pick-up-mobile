// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var pickUpMobile = angular.module('pickUpMobile', ['ionic', 'ui.router', 'gameReqForm', 'games', 'login', 'register', 'pickUpMobile.services'])

//http://blog.ionic.io/handling-cors-issues-in-ionic/
.constant('ApiEndpoint', {
  url: 'https://pick-up-app.herokuapp.com'
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('gameReq', {
      url: '/index',
      templateUrl: 'templates/gameReqForm.html',
      controller: 'TimeSelectController'
    })
    .state('games', {
      url: '/games',
      templateUrl: 'templates/games.html',
      controller: 'GamesController'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'registerController'
    });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/index');



});

pickUpMobile.run(function ($rootScope, $location, $state, AuthService, sharedProps) {
  $rootScope.$on('$stateChangeStart',
    function (event, next, current) {
if (next.url !== '/register' && AuthService.isLoggedIn() === false) {
      $location.path('/login');
      sharedProps.set('login');
    }
  });
});
