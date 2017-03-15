import express from 'express';
//import User from './user.model';
import mysql from 'mysql';

var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : '1234',
  database : 'sampledb'
});

// Create our Express router
const router = express.Router();

// Create a new route with the prefix /
let usersRoute = router.route('/');

// Create endpoint / for GET
usersRoute.get(function (req, res) {
  // Use the Beer model to find all users
    connection.connect();
    connection.query('SELECT * from usuarios', function(err, rows, fields) {
      if (!err) {
        res.json(rows);
      } else {
        res.send(err);
      }
    });
    connection.end();
});

// Create endpoint /:_id for GET
usersRoute = router.route('/:_id');

usersRoute.get(function (req, res) {
    connection.connect();
    let consulta = `SELECT * FROM usuarios WHERE id=${req.params._id}`;
    console.log(consulta);
    connection.query(consulta, function(err, rows, fields) {
      if (!err) {
        res.json(rows);
      } else {
        res.send(err);
      }
    });
    connection.end();
});

module.exports = router;
