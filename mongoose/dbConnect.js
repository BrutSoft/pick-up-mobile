'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect(process.env.MONGODB_URI);
var db = _mongoose2.default.connection;

console.log('MONGODB_URI: ', process.env.MONGODB_URI);
console.log('PORT: ', 3000);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('And we\'re in!!!');
});

exports.default = db;
