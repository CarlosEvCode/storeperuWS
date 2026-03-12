const express = require('express'); //Framework
const mysql = require('mysql2'); // Acceso BD
const bodyParser = require('body-parser'); //Interactuar con JSON

const app = express();
app.use(bodyParser.json());

//Configuracion de acceso - .env
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'storeperu',
});

//Aperturar la conexion
db.connect((err) => {
	if (err) throw err;
	console.log('Conectado a la DB de storeperu');
});

//Iniciar el servidor
const PORT = 3000;

///* SERVICIOS WEB */
//VERBO = ACCION = INTENCION
//GET   :Leer
//POST  :Crear
//PUT   :Actualizar todo
//PATCH :Actualizacion parcial
//DELETE:Eliminar

//req (requiere, requerimiento)
//res (response,respuesta)
app.post('/productos', (req, res) => {
	//Y los datos que queremos guardar? - DESERIALIZACION
	const {id_marca, descripcion, precio, stock, garantia} = req.body;
	//? = comodin, evita ataques por SQLinjection
	const sql =
		'INSERT INTO productos (id_marca,descripcion,precio,stock,garantia) VALUES (?,?,?,?,?)';

	db.query(
		sql,
		[id_marca, descripcion, precio, stock, garantia],
		(err, results) => {
			if (err)
				return res.status(500).send({
					success: false,
					message: 'No se concretó el registro',
				});

			//Qué hacemos cuando logramos registrar?
			res.send({
				success: true,
				message: 'Nuevo producto registrada',
				id: results.insertId,
			});
		}
	);
});
app.get('/productos', (req, res) => {
	const sql = 'SELECT * FROM productos LIMIT 10';
	db.query(sql, (err, results) => {
		if (err) return res.status(500).send({message: 'Error acceso a datos'});
		res.json(results);
	});
	/* res.send({'proceso': 'GET'}) */
});
// Actualizar producto por ID
app.put('/productos/:id', (req, res) => {
	const {id} = req.params;
	const {id_marca, descripcion, precio, stock, garantia} = req.body;
	const sql = `UPDATE productos SET id_marca=?, descripcion=?, precio=?, stock=?, garantia=? WHERE id=?`;
	db.query(
		sql,
		[id_marca, descripcion, precio, stock, garantia, id],
		(err, results) => {
			if (err) {
				return res.status(500).send({
					success: false,
					message: 'No se concretó la actualización',
					data: err,
				});
			}
			return res.send({
				success: true,
				message: 'Producto actualizado',
			});
		}
	);
});

// Eliminar producto por ID
app.delete('/productos/:id', (req, res) => {
	const {id} = req.params;
	const sql = 'DELETE FROM productos WHERE id = ?';
	db.query(sql, [id], (err, results) => {
		if (err) {
			return res.status(500).send({
				success: false,
				message: 'No se puede eliminar el producto',
			});
		}
		if (results.affectedRows == 0) {
			return res.status(404).send({
				success: false,
				message: 'No existe el producto',
			});
		}
		return res.send({
			success: true,
			message: 'Producto eliminado correctamente',
		});
	});
});

app.post('/marcas', (req, res) => {
	//Y los datos que queremos guardar? - DESERIALIZACION
	const {nombreM} = req.body;
	//? = comodin, evita ataques por SQLinjection
	const sql = 'INSERT INTO marcas (nombreM) VALUES (?)';

	db.query(sql, [nombreM], (err, results) => {
		if (err)
			return res.status(500).send({
				success: false,
				message: 'No se concretó el registro',
			});

		//Qué hacemos cuando logramos registrar?
		res.send({
			success: true,
			message: 'Nuevo producto registrada',
			id: results.insertId,
		});
	});
});
app.get('/marcas', (req, res) => {
	const sql = 'SELECT * FROM marcas';

	db.query(sql, (err, results) => {
		if (err) {
			return res.status(500).send({
				success: false,
				message: 'Error al obtener marcas',
			});
		}

		res.json(results);
	});
});

app.listen(PORT, () => {
	console.log('Servidor iniciado correctamente en http://localhost:3000');
});
