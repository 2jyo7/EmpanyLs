const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();

const port = process.env.PORT || 2100;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//MYSQL CONNECTION CONFIG
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
});

//Checking for DB connection
db.getConnection((err, connection) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected successfully');
    }

    app.listen(port, () => {
        console.log(`Server listening on ${port}`);
    });
});

//home route of API
app.get("/", (req, res) => {
    res.send("Welcome to the employee API");
});

//fetching lists of employees
app.get("/empList", (req, res) => {
    const getSql = "SELECT * FROM empClass";
    db.query(getSql, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(results);
        }
    });
});

//fetching lists of employees By Id
app.get("/empList/:id", (req, res) => {
    const { id } = req.params;
    const getSqlById = "SELECT * FROM empClass WHERE id = ?";
    db.query(getSqlById, [ id ], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(results);
        }
    });
});

//adding employees to the list
app.post("/addEmpList", (req, res) => {
    const { id, name, position, salary } = req.body;
    const postSql = "INSERT INTO empClass (id, name, position, salary) VALUES (?, ?, ?, ?)";
    db.query(postSql, [id, name, position, salary], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(results);
        }
    });
});

//updating the employee in the list
app.put("/updateEmpList/:id", (req, res) => {
    const { id } = req.params;
    const { name, position, salary } = req.body;
    const putSql = "UPDATE empClass SET name = ?, position = ?, salary = ? WHERE id = ?";
    db.query(putSql, [name, position, salary, id], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(results);
        }
    });
});

//deleting the particular employee with the given id
app.delete("/deleteEmpList/:id", (req, res) => {
    const { id } = req.params;
    const deleteSql = "DELETE FROM empClass WHERE id = ?";
    db.query(deleteSql, [id], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(results);
        }
    });
});
