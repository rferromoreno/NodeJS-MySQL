import express from 'express';
import encryptPass from '../../helpers/encryptPass.helper';

let SQLconnection;

export default ({ connection }) => {
	SQLconnection = connection;
	// Create our Express router
	const router = express.Router();

	// Create a new route with the prefix /
	let usersRoute = router.route('/');

	// Create endpoint / for GET
	usersRoute.get(getUsers);

	// Create endpoint /:_id for GET
	usersRoute = router.route('/:_id');
	usersRoute.get(getUserByID);

	// Create endpoint /add {user:"pepito", pass:"12345"} for POST
	usersRoute = router.route('/add');
	usersRoute.post(addUser);

	// Create endpoint /delete {id:123} for POST
	usersRoute = router.route('/delete');
	usersRoute.post(deleteUser);

	return router;
};

function getUsers(req, res) {
	let query = 'SELECT id, usuario from usuarios';
	SQLconnection.query(query, (err, rows, fields) => {
		if (err) { 
			res.send(err);
		}
		res.json(rows);        
	});
}

function getUserByID(req, res) {
	//La libreria 'mysql' escapa los datos internamente en sentencias preparadas
	let query = 'SELECT id, usuario FROM usuarios WHERE id = ?';
	
	SQLconnection.query(query, [req.params._id], (err, rows, fields) => {
		if (err) {
			res.send(err);
		}
		res.json(rows); 
	});
}

function addUser(req, res) {
	let hashedPass = encryptPass(req.body.pass);
	let consulta = 'INSERT INTO usuarios (usuario, password) VALUES( ? , ? );';

	SQLconnection.query(consulta, [req.body.user, hashedPass], (err, rows, fields) => {
		if (err) {
			res.send(err);
		}
		res.json(rows); 
	});
}

function deleteUser(req, res) {
	let consulta = `DELETE FROM usuarios WHERE id = ?;`;

	SQLconnection.query(consulta, [req.params._id], (err, rows, fields) => {
		if (err) {
			res.send(err);
		}
		res.json(rows);
	});
}