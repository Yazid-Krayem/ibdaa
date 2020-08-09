const express = require("express");
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ibdaa',
  port:8080
});

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});

app.get("/ibdaa",(req,res) => {
    connection.query('SELECT * from questions ', (err, rows) => {
        if(err) throw err;
        console.log('The data from users table are: \n', rows);
        connection.end();
    });
});

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});