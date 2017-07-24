angular.module('pickUpMobile.services', [])

.factory('GameReq', function($http, ApiEndpoint) {
  var requestGame = function(gameReq) {
    console.log("in GameReq..", gameReq);
    console.log('ApiEndpoint', ApiEndpoint);
    return $http({
      method: 'POST',
      url: ApiEndpoint.url + '/api/games',
      data: gameReq
    })
    .then(function (resp) {
      console.log('POST response data: ', resp.data);
      return resp.data;
    })
  };
  return {
    requestGame: requestGame
  };
})
.factory('sharedProps', function(){
  var property = '';
  return {
    get: function() {
      return property;
    },
    set: function(val) {
      property = val;
    }
  };
})

.factory('AuthService',
  ['$q', '$timeout', '$http', 'ApiEndpoint',
  function ($q, $timeout, $http, ApiEndpoint) {

    // create user variable
    var user = null;

    // return available functions for use in the controllers
    return ({
      isLoggedIn: function isLoggedIn() {
        return user ? true : false;
      },
      getUserStatus: function getUserStatus() {
        return user;
      },
      login: function login(username, password) {
        var deferred = $q.defer();
        username = username.toLowerCase();

        $http.post(ApiEndpoint.url + '/login', {username: username, password: password})
          .success(function (data, status) {
            if (status === 200 && data.status){
              user = true;
              deferred.resolve();
            } else {
              user = false;
              deferred.reject();
            }
          })
          .error(function (data) {
            user = false;
            deferred.reject();
          });
        return deferred.promise;
      },
      logout: function logout() {
        var deferred = $q.defer();

        // send a get request to the server
        $http.get(ApiEndpoint.url + '/logout')
          // handle success
          .success(function (data) {
            user = false;
            deferred.resolve();
          })
          // handle error
          .error(function (data) {
            user = false;
            deferred.reject();
          });

        // return promise object
        return deferred.promise;

      },
      register: function register(username, password) {
        // create a new instance of deferred
        var deferred = $q.defer();

        //make username lowercase
        var userlow = username.toLowerCase();

        // send a post request to the server
        $http.post(ApiEndpoint.url + '/register',
          {username: userlow, password: password})
          // handle success
          .success(function (data, status) {
            if(status === 200 && data.status){
              deferred.resolve();
            } else {
              deferred.reject();
            }
          })
          // handle error
          .error(function (data) {
            console.error(data);
            deferred.reject();
          });

        // return promise object
        return deferred.promise;
      }
    });
}]);
