import express from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import encryptPass from '../helpers/encryptPass.helper';
 
export default ({ connection }) => {
  // Create our Express router
  let router = express.Router();
  // Create a new route with the prefix /
  let loginRouter = router.route('/');

  loginRouter.get((req, res) => {
    res.render('login');
  });

  passport.use(new LocalStrategy((username, password, done) => {

    let hashedPass = encryptPass(password);
    let consulta = 'SELECT id, usuario FROM usuarios WHERE  usuario=? AND password=?;';

    connection.query(consulta, [username, hashedPass], (err, rows, fields) => {
    if (err) {
      //error
      return done(err, null); 
    }
    //todo bien tengo que ver que rows sea mayor a 0 para saber que existe el usuario y contraseña
    console.log(rows);
    
    if(rows.length) {
      console.log('Existe el usuario');
      
      return done(null,rows[0]); 
    }
   
     return done(null,null); 
  });
    
  })); 

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  loginRouter.post(
    passport.authenticate('local', { failureRedirect: '/' }),
    function(req, res) {
      console.log("Estoy por redireccionar");
      console.log(req.session);
      res.redirect('/profile');
  });

  


  
  return router;
}