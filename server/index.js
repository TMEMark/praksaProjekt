const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const sql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cookieParser = require("cookie-parser");
const session = require("express-session");

const db = sql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "company",
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "boni",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.post("/register", (req, res) => {
  const loginUserName = req.body.loginUserName;
  const loginPassword = req.body.loginPassword;

  bcrypt.hash(loginPassword, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO login (loginUserName, loginPassword ) VALUES(?,?)",
      [loginUserName, loginPassword],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.get("/logout", (req, res) => {
  if (req.session.user) {
    res.clearCookie("userId");
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const loginUserName = req.body.loginUserName;
  const loginPassword = req.body.loginPassword;

  db.query(
    "SELECT * FROM login WHERE username = ?;",
    loginUserName,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        bcrypt.compare(
          loginPassword,
          result[0].loginPassword,
          (error, response) => {
            if (response) {
              req.session.user = result;
              console.log(req.session.user);
              res.send(result);
            } else {
              res.send({ message: "Wrong username/password combination!" });
            }
          }
        );
      } else {
        res.send({ message: "User does not exist!" });
      }
    }
  );
});

app.post("/api/insertDep", (req, res) => {
  const departmentName = req.body.departmentName;
  const departmentLocation = req.body.departmentLocation;

  const sqlInsert =
    "INSERT INTO department (departmentName, departmentLocation) VALUES (?,?);";
  db.query(sqlInsert, [departmentName, departmentLocation], (err, result) => {
    console.log(result);
  });
});

app.get("/api/getDep", (req, res) => {
  const sqlSelect = "SELECT * FROM department";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.put("/api/updateDep", (req, res) => {
  const id = req.body.departmentNo;
  const name = req.body.departmentName;
  const location = req.body.departmentLocation;
  const sqlUpdate =
    "UPDATE department SET departmentName = ?, departmentLocation = ? WHERE departmentNo = ?";
  db.query(sqlUpdate, [name, location, id], (err, result) => {
    if (err) console.log(err);
  });
});

app.delete("/api/deleteDep/:departmentNo", (req, res) => {
  const id = req.params.departmentNo;
  const sqlDelete = "DELETE FROM department WHERE departmentNo = ?";
  db.query(sqlDelete, id, (err, result) => {
    if (err) console.log(err);
  });
});

app.post("/api/insertEmp", (req, res) => {
  const employeeName = req.body.employeeName;
  const salary = req.body.salary;
  const departmentNo = req.body.departmentNo;

  const sqlInsert =
    "INSERT INTO employee (employeename, salary, departmentNo) VALUES (?,?,?);";
  db.query(sqlInsert, [employeeName, salary, departmentNo], (err, result) => {
    console.log(result);
  });
});

app.get("/api/getEmp", (req, res) => {
  const sqlSelect = "SELECT * FROM employee";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.put("/api/updateEmp", (req, res) => {
  const id = req.body.departmentNo;
  const name = req.body.departmentName;
  const location = req.body.departmentLocation;
  const sqlUpdate =
    "UPDATE department SET departmentName = ?, departmentLocation = ? WHERE departmentNo = ?";
  db.query(sqlUpdate, [name, location, id], (err, result) => {
    if (err) console.log(err);
  });
});

app.delete("/api/deleteEmp/:employeeNo", (req, res) => {
  const id = req.params.employeeNo;
  const sqlDelete = "DELETE FROM employee WHERE departmentNo = ?";
  db.query(sqlDelete, id, (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
