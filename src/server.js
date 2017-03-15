import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import mysql from 'mysql';

var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : '1234',
  database : 'sampledb'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
  // mock para crear admin - 1234
  connection.query("INSERT IGNORE INTO usuarios (usuario, password) VALUES ('admin', '1234')",
    function (error) {
        if (!!error) {
          console.log("Hubo un error al hacer la consulta");
        } else {
          console.log("La consulta fue exitosa.");
        }
  });
});


var app = express();
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '10mb'
}));

app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
