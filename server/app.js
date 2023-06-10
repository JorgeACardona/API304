document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe automáticamente

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Crea un objeto con los datos del usuario
  var data = {
    username: username,
    password: password
  };

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      console.log(result); 
      if (result.message === 'Inicio de sesión exitoso') {
        
        window.location.href = 'login.html';
      } else {
        console.log('Credenciales inválidas');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
