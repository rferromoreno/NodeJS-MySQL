'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connection = _mysql2.default.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '1234',
  database: 'sampledb'
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
  // mock para crear admin - 1234
  connection.query("INSERT IGNORE INTO usuarios (usuario, password) VALUES ('admin', '1234')", function (error) {
    if (!!error) {
      console.log("Hubo un error al hacer la consulta");
    } else {
      console.log("La consulta fue exitosa");
    }
  });
});

var app = (0, _express2.default)();
app.use(_bodyParser2.default.urlencoded({
  extended: true,
  limit: '10mb'
}));

app.use(_bodyParser2.default.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});