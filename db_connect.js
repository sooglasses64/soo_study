const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'yourusername',
  password: 'yourpassword',
  database: 'yourdatabase'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
  connection.query('SELECT * FROM yourtable', (err, results, fields) => {
    if (err) throw err;
    console.log(results);
    connection.end();
  });
});
