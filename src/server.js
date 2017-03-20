import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import userRouter from './api/user/user.route';
import loginRouter from './login/login.router';
import passport from 'passport';
import {Strategy} from 'passport-local';
import expressSessions from 'express-session';
import Sequelize from 'sequelize';
import UserModel from './api/user/user.model';



/* This is Sequelize*/
 console.log(User);

var sequelize = new Sequelize('sampledb', 'root', '1234', {
  host: 'localhost' ,
  port: 3306 , 
  dialect: 'mysql' 
});

let User=UserModel(sequelize,Sequelize);


User
  .create({ usuario: 'John Doe', password: '1234' })
  .then(function(user) {
    console.log(user.get('usuario')); 
    console.log(user.get('password')); 
  })




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
  /*
  connection.query("INSERT IGNORE INTO usuarios (usuario, password) VALUES ('admin', '1234')",
    function (error) {
    	if (!!error) {
        console.log("Hubo un error al hacer la consulta");
    	} else {
        console.log("La consulta fue exitosa.");
      }
  });  */
});

var app = express();

// Configure view engine to render EJS templates.
 
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '10mb'
}));

app.use(bodyParser.json());

//Sessions config
app.use(expressSessions({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

// Register all our routes with /api
app.use('/api/users', userRouter({ connection }));

app.use('/login', loginRouter({ connection }));

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile');
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
