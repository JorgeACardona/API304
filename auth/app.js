

document.getElementById('loginButton').addEventListener('click', function(event) {
    event.preventDefault();
  
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    const MongoClient = require('mongodb').MongoClient;

    const url = 'mongodb://root:secret@localhost:27017/users';
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  
    client.connect((err) => {
      if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
      }
  
      const db = client.db();
      const usuariosCollection = db.collection('usuarios');
  
      usuariosCollection.findOne({ username: username, password: password }, (err, user) => {
        if (err) {
          console.error('Error al realizar la consulta:', err);
          return;
        }
  
        if (!user) {
          console.log('Credenciales inválidas');
          return;
        }
  
        console.log('Inicio de sesión exitoso');
  
        
      });
    });
  });
  