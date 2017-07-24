'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _phone2 = require('phone');

var _phone3 = _interopRequireDefault(_phone2);

var _geolib = require('geolib');

var _geolib2 = _interopRequireDefault(_geolib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var helpers = {
  createGameTime: function createGameTime(reqTime) {
    // works for TODAY
    var gameTime = new Date((0, _moment2.default)().get('year'), (0, _moment2.default)().get('month'), (0, _moment2.default)().get('date'), parseInt(reqTime));
    return gameTime;
  },
  // using === instead of >= to avoid multiple texts
  // put texted flag on each player
  hasEnoughPlayers: function hasEnoughPlayers(game) {
    return game.playRequests === game.minPlayers;
  },

  includesPlayer: function includesPlayer(game, smsNum) {
    return game.smsNums.reduce(function (included, smsObj) {
      smsNum = helpers.phone(smsNum);
      return smsObj.smsNum === smsNum || included;
    }, false);
  },

  forEachPlayer: function forEachPlayer(game, cb) {
    game.smsNums.forEach(function (smsObj) {
      cb(smsObj.smsNum);
    });
  },

  phone: function phone(num) {
    return (0, _phone3.default)(num)[0];
  },

  isInRange: function isInRange(location, center, radius) {
    return _geolib2.default.getDistance(location, center) < radius;
  },

  getNewCenterLoc: function getNewCenterLoc(smsNums) {
    var locations = smsNums.map(function (smsNum) {
      return smsNum.location;
    });
    return _geolib2.default.getCenter(locations);
  },

  minPlayers: {
    soccer: 6,
    basketball: 6,
    baseball: 18,
    football: 10
  }

};

exports.default = helpers;