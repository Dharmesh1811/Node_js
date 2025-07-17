const express = require('express');
const bodyParser = require('body-parser');
const con = require('./db_connect');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ dest: './uploads/' });

const app = express();
app.use(bodyParser.json());

// show

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';

    con.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ status: "error", message: "Failed to fetch users" });
        }

        const genderMap = { 1: "Male", 2: "Female", 3: "Custom" };

        const users = results.map(user => ({
            ...user,
            gender: genderMap[user.gender] || "Unknown"
        }));

        res.json({ status: "success", data: users });
    });
});

// Sign-up API
app.post('/signup', upload.none(), (req, res) => {
    const { firstName, surname, birthDate, phoneNumber, gender, password } = req.body;
    const sql = 'INSERT INTO users (firstName, surname, birthDate, phoneNumber, gender, password) VALUES (?, ?, ?, ?, ?, ?)';
    con.query(sql, [firstName, surname, birthDate, phoneNumber, gender, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ status: "error", message: "Failed to register" });
        } else {
            res.json({ status: "success", userId: result.insertId });
        }
    });
});

// Login API
app.post('/login', upload.none(), (req, res) => {
    const { phoneNumber, password } = req.body;

    if(phoneNumber == ""  && password == ""){
        res.status(500).json({ status: "error", message: "phone number and password need to login" });
        return
    }
    const sql = 'SELECT * FROM users WHERE phoneNumber = ? AND password = ?';
    con.query(sql, [phoneNumber, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ status: "error", message: "Login failed" });
        } else if (result.length > 0) {
            res.json({ status: "success", user: result[0] });
        } else {
            userExsit = `SELECT * FROM users Where phoneNumber = ${phoneNumber}`
            con.query(userExsit, (err, result) => {
                console.log(result)
                if (err) {
                    console.error(err);
                    res.status(500).json({ status: "error", message: "Login failed" });
                } else if (result.length > 0) {
                   res.status(401).json({ status: "error", msg :"wrong password" });
                }else{
                    res.status(401).json({ status: "error", message: "Invalid credentials" });
                }
            })

            
        }
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));