import express from 'express';
//import passport from 'passport';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import userRouter from './api/user/user.route';
import loginRouter from './login/login.router';
import passport from 'passport';
import {Strategy} from 'passport-local';


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

// Configure view engine to render EJS templates.
 
app.set('view engine', 'ejs');


app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.urlencoded({
  extended: true,
  limit: '10mb'
}));

app.use(bodyParser.json());

// Register all our routes with /api
app.use('/api/users', userRouter({ connection }));

app.use('/login', loginRouter({passport}));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    console.log("llegue a profile");
    res.render('profile');
  });




app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
