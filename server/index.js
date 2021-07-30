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


app.post("/api/insertDep", (req, res) => {

    const departmentName = req.body.departmentName
    const departmentLocation = req.body.departmentLocation

    const sqlInsert = "INSERT INTO department (departmentName, departmentLocation) VALUES (?,?);";
    db.query(sqlInsert, [departmentName, departmentLocation] ,(err, result) => {console.log(result);
    
    });
});

app.get("/api/getDep", (req, res) => {
    const sqlSelect = "SELECT * FROM department";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.put("/api/updateDep", (req, res) => {
    const id = req.body.departmentNo
    const name = req.body.departmentName
    const location = req.body.departmentLocation
    const sqlUpdate  = "UPDATE department SET departmentName = ?, departmentLocation = ? WHERE departmentNo = ?";
    db.query(sqlUpdate, [name,location,id], (err, result) => {
        if (err) console.log(err);
    })
})

app.delete("/api/deleteDep/:departmentNo", (req, res) => {
    const id = req.params.departmentNo
    const sqlDelete = "DELETE FROM department WHERE departmentNo = ?";
    db.query(sqlDelete, id, (err, result) => {
        if (err) console.log(err);
    })
})




app.post("/api/insertEmp", (req, res) => {

    const employeeName = req.body.employeeName
    const salary = req.body.salary
    const departmentNo = req.body.departmentNo

    const sqlInsert = "INSERT INTO employee (employeename, salary, departmentNo) VALUES (?,?,?);";
    db.query(sqlInsert, [employeeName, salary, departmentNo] ,(err, result) => {console.log(result);
    
    });
});

app.get("/api/getEmp", (req, res) => {
    const sqlSelect = "SELECT * FROM employee";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.put("/api/updateEmp", (req, res) => {
    const id = req.body.departmentNo
    const name = req.body.departmentName
    const location = req.body.departmentLocation
    const sqlUpdate  = "UPDATE department SET departmentName = ?, departmentLocation = ? WHERE departmentNo = ?";
    db.query(sqlUpdate, [name,location,id], (err, result) => {
        if (err) console.log(err);
    })
})

app.delete("/api/deleteEmp/:employeeNo", (req, res) => {
    const id = req.params.employeeNo
    const sqlDelete = "DELETE FROM employee WHERE departmentNo = ?";
    db.query(sqlDelete, id, (err, result) => {
        if (err) console.log(err);
    })
})

app.listen(3001, () => {
    console.log("running on port 3001")
});