const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://root:secret@localhost:27017/users';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      return;
    }
    console.log('Conexión exitosa a la base de datos');
  
    const db = client.db(); 

    const usuariosCollection = db.collection('users');
    
    
    usuariosCollection.findOne({ username: 'username', password: 'password' }, (err, username) => {
      if (err) {
        console.error('Error al realizar la consulta:', err);
        return;
      }
    
      if (!username) {
        console.log('Credenciales inválidas');
        return;
      }
    
      console.log('Inicio de sesión exitoso');
      
    });
    
  });