
const mysql = require('mysql');
const express = require("express");

app = express();

let connection = mysql.createConnection({
    host: 'database-1.cluster-cvfd3nzqnme3.us-west-2.rds.amazonaws.com',
    user: 'admin',
    password: 'administrator',
    database: 'mydb'
});
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  
app.get("/",(req,res) => {
    connection.query('SELECT * from news', (err, rows) => {
        if(err) throw err;
        console.log('The data from news table are: \n', rows);
        //connection.end();
        res.send(JSON.parse(JSON.stringify(rows)));
    });
});

app.listen(3030, () => {
    console.log('Server is running at port 3030');
});

