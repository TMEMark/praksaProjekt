const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const sql = require("mysql");

const db = sql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "company"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/api/insert", (req, res) => {

    const departmentName = req.body.departmentName
    const departmentLocation = req.body.departmentLocation

    const sqlInsert = "INSERT INTO department (departmentName, departmentLocation) VALUES (?,?);";
    db.query(sqlInsert, [departmentName, departmentLocation] ,(err, result) => {console.log(err);
    
    });
});

app.listen(3001, () => {
    console.log("running on port 3001")
});