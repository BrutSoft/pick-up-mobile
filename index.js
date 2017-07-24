'use strict';

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var port = process.env.PORT || 1337;

_server2.default.listen(port, function () {
  console.log('pickUp listening on porttttt: ' + port + '!');
});