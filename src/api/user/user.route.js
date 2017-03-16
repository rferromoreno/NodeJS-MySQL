import express from 'express';

export default ({ connection }) => {

  // Create our Express router
  const router = express.Router();

  // Create a new route with the prefix /
  let usersRoute = router.route('/');
  // Create endpoint / for GET
  usersRoute.get(function (req, res) {
      connection.query('SELECT id, usuario from usuarios', function(err, rows, fields) {
        if (!err) {
          res.json(rows);
        } else {
          res.send(err);
        }
      });
  });

  // Create endpoint /:_id for GET
  usersRoute = router.route('/:_id');
  usersRoute.get(function (req, res) {
      // ojo con la INYECCION SQL
      let consulta = `SELECT id, usuario FROM usuarios WHERE id=${req.params._id}`;
      console.log(consulta);
      connection.query(consulta, function(err, rows, fields) {
        if (!err) {
          res.json(rows);
        } else {
          res.send(err);
        }
      });
  });

    // Create endpoint /add {user:"pepito", pass:"12345"} for POST
  usersRoute = router.route('/add');
  usersRoute.post(function (req, res) {
      // ojo con la INYECCION SQL
      let consulta = `INSERT INTO usuarios (usuario, password) VALUES('${req.body.user}','${req.body.pass}');`;
      console.log(consulta);
      connection.query(consulta, function(err, rows, fields) {
        if (!err) {
          res.json(rows);
        } else {
          res.send(err);
        }
      });
  });

    // Create endpoint /delete {id:123} for POST
  usersRoute = router.route('/delete');
  usersRoute.post(function (req, res) {
      // ojo con la INYECCION SQL
      let consulta = `DELETE FROM usuarios WHERE id=${req.body.id};`;
      console.log(consulta);
      connection.query(consulta, function(err, rows, fields) {
        if (!err) {
          res.json(rows);
        } else {
          res.send(err);
        }
      });
  });




  return router;
}