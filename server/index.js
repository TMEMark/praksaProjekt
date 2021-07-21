// Izrada express servera
const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host:'localhost',
    user: 'root',
    password: 'password',
    database: 'company',
})

app.get('/', (req,res) => {
    res.send("hello world");
});

//Server na portu 3001
app.listen(3001, () => {
    console.log("running on port 3001");
});