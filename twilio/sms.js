'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _twilio = require('twilio');

var _twilio2 = _interopRequireDefault(_twilio);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = (0, _twilio2.default)(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
var sms = {
  sendScheduledGame: function sendScheduledGame(_ref) {
    var smsNum = _ref.smsNum;
    var gameLoc = _ref.gameLoc;
    var gameTime = _ref.gameTime;
    var sport = _ref.sport;

    var message = 'we\'re playing ' + sport + ' @ ' + gameLoc + ' for ' + (0, _moment2.default)(gameTime).format('llll') + '. You in?';
    console.log('sending message: ', message);

    // real text
    return new Promise(function (resolve, reject) {
      client.sendMessage({
        to: smsNum,
        from: process.env.TWILIO_NUM,
        body: message,
      }, function (err, resp) {
        if (err) {
          console.error('Error sending SMS: ', err);
          reject(err);
        } else {
          console.log(resp);
          resolve(resp);
        }
      });
    });

    //test
    // return new Promise((resolve, reject) => {
    //   resolve('message sent!');
    // });
  },

};

exports.default = sms;
