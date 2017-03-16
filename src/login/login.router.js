import express from 'express';
import {Strategy as LocalStrategy} from 'passport-local';
 

export default({ passport })=>{

 // Create our Express router
  const router = express.Router();
  // Create a new route with the prefix /
  let loginRouter = router.route('/');


  loginRouter.get(function(req, res){
    res.render('login');
  });



  passport.use(new LocalStrategy(
  function(username, password, done) {
      //Aca va la lógica que consulta en la base de datos
    let user="agustin";

    return done(null, user);}
    )
    ); 

    passport.serializeUser(function(user, done) {
    done(null, user);
    });

    passport.deserializeUser(function(user, done) {
    done(null, user);
    });



  loginRouter.post(passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
console.log("Estoy por redireccionar");
console.log(req.session);
    res.redirect('/profile');
  });


   return router;

}