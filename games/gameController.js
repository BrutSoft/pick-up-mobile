'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sms = require('../twilio/sms');

var _sms2 = _interopRequireDefault(_sms);

var _gameModel = require('./gameModel');

var _gameModel2 = _interopRequireDefault(_gameModel);

var _db = require('../mongoose/db');

var _db2 = _interopRequireDefault(_db);

var _helpers = require('../helpers');

var _helpers2 = _interopRequireDefault(_helpers);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  addRequest: function addRequest(req, res, next) {
    var gameReq = req.body;
    console.log(gameReq);
    var smsNum = _helpers2.default.phone(gameReq.smsNum);
    if (!smsNum) {
      return res.send(400);
    }

    var newGame = new _gameModel2.default({
      sport: gameReq.sport,
      startTime: gameReq.time,
      minPlayers: _helpers2.default.minPlayers[gameReq.sport],
      playRequests: 1,
      locCenter: {
        latitude: gameReq.location.latitude,
        longitude: gameReq.location.longitude
      },
      smsNums: [{
        smsNum: smsNum,
        location: {
          latitude: gameReq.location.latitude,
          longitude: gameReq.location.longitude
        }
      }]
    });
    // check if game exists in DB
    _db2.default.getGame(newGame).then(function (foundGame) {
      if (foundGame) {
        console.log('game found ');

        if (_helpers2.default.includesPlayer(foundGame, gameReq.smsNum)) {
          console.error('game already requested.');
          return Promise.resolve(foundGame);
        }

        // if user location within radius of game center
        if (_helpers2.default.isInRange(gameReq.location, foundGame.locCenter, 10)) {

          foundGame.smsNums.push({ smsNum: gameReq.smsNum, location: gameReq.location });
          foundGame.playRequests += 1;
          // caluclate new game center
          foundGame.locCenter = _helpers2.default.getNewCenterLoc(foundGame.smsNums);
          return Promise.resolve(foundGame);
        } else {
          console.log('game not found in range. using newGame');
          return Promise.resolve(newGame);
        }
      } else {
        console.log('game not found in db. using newGame ');
        return Promise.resolve(newGame);
      }
    }).then(function (game) {
      // check if playRequest > minPlayer
      console.log('player Count: ', game.playRequests);
      if (_helpers2.default.hasEnoughPlayers(game)) {
        // search google places API for closest rec center
        _helpers2.default.getGameLoc(game.locCenter).then(function (body) {
          var data = JSON.parse(body);
          var results = data.results;
          // send to all the players
          _helpers2.default.forEachPlayer(game, function (num) {
            console.log('texting ', num);
            _sms2.default.sendScheduledGame({
              smsNum: num,
              sport: gameReq.sport,
              gameLoc: results[0].name,
              gameTime: gameReq.time
            });
          });
        }).catch(function (error) {
          console.error(error);
        });
      }
      return Promise.resolve(game);
    }).then(_db2.default.saveGame).then(function (savedGame) {
      res.status(201).json(savedGame);
    }).catch(function (err) {
      console.error('error saving game ', err);
      res.status(500).send('error requesting game');
    });
  }
};
