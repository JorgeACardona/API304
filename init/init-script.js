db.createCollection('app_users', {capped: false });

db.app_users.insert([
    {
        "username": "Maria Lucia",
        "password": "1234"
    },
    {
        "username": "Jorge Andres",
        "password": "1234" 
    }
]);