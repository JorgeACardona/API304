const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(express.json());

const url = 'mongodb://root:secret@localhost:27017';
const dbName = 'users';

app.get('/api/app_users', (req, res) => {
  console.log('Recibida una solicitud GET en /api/app_users');
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      res.status(500).json({ message: 'Error de servidor' });
      return;
    } else {
      console.error('Conectado a Mongo', err);
    }

    const db = client.db(dbName);
    const app_usersCollection = db.collection('app_users');

    app_usersCollection.find({}).toArray((err, app_users) => {
      if (err) {
        console.error('Error al realizar la consulta:', err);
        res.status(500).json({ message: 'Error de servidor' });
        return;
      }

      res.status(200).json(app_users);
      console.log(app_users);
    });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      res.status(500).json({ message: 'Error de servidor' });
      return;
    }

    const db = client.db(dbName);
    const app_usersCollection = db.collection('usuarios');

    app_usersCollection.findOne({ username: username, password: password }, (err, user) => {
      if (err) {
        console.error('Error al realizar la consulta:', err);
        res.status(500).json({ message: 'Error de servidor' });
        return;
      }

      if (!user) {
        res.status(401).json({ message: 'Credenciales inválidas' });
        return;
      }

      // Configura el encabezado de la respuesta para indicar JSON
      res.setHeader('Content-Type', 'application/json');

      // Envía la respuesta como un objeto JSON
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
