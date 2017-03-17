import express from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
 
export default ({ db }) => {
  // Create our Express router
  let router = express.Router();
  // Create a new route with the prefix /
  let loginRouter = router.route('/');

  loginRouter.get((req, res) => {
    res.render('login');
  });

  passport.use(new LocalStrategy((username, password, done) => {
    //Aca va la lógica que consulta en la base de datos
    let user="agustin";

    return done(null, user);
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