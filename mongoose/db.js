'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _gameModel = require('../games/gameModel');

var _gameModel2 = _interopRequireDefault(_gameModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = {
  saveGame: function saveGame(game) {
    return new Promise(function (resolve, reject) {
      game.save(function (err, game) {
        if (err) return reject(err);
        resolve(game);
      });
    });
  },

  getGame: function getGame(game) {
    return new Promise(function (resolve, reject) {
      _gameModel2.default.findOne({
        sport: game.sport,
        startTime: game.startTime,
      }, function (err, game) {
        if (err) return reject(err);
        resolve(game);
      });
    });
  },
};

exports.default = db;
