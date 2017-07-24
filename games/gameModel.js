'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userSchema = require('../users/userSchema');

var _userSchema2 = _interopRequireDefault(_userSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gameSchema = _mongoose2.default.Schema({
  sport: 'string',
  startTime: { type: Date },
  minPlayers: 'Number',
  playRequests: 'Number',
  locCenter: {
    latitude: 'Number',
    longitude: 'Number'
  },
  smsNums: [_userSchema2.default]
});

var Game = _mongoose2.default.model('Game', gameSchema);

exports.default = Game;