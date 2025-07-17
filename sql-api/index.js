const express = require('express')
const con = require("./db_con")
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
});

// show

app.get('/show', (req, res) => {
    try {
        con.connect(function (err) {
            if (err) {
                console.error("Database connection error:", err);
                return res.status(500).json({ status: "false", message: "Database connection failed." });
            }


            con.query("SELECT * FROM student_info", function (err, result, fields) {
                if (err) {
                    console.error("Database query error:", err);
                    return res.status(500).json({ status: "false", message: "Database query failed." });
                }

                res.status(200).json({ status: "true", data: result });
            });

        })
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ status: "false", message: "An unexpected error occurred." });
    }
});

// update 

app.put('/update', upload.none(), (req, res) => {
    try {
        const { id, name } = req.body;
         console.log(id,name)
        const sql = `UPDATE student_info SET name = '${name}' WHERE id = '${id}'`;
        
        con.query(sql, function (err, result) {
            if (err) {
                console.error("Database query error:", err);
                return res.status(500).json({ status: "false", message: "Database query failed." });
            }

            res.status(200).json({ status: "true", data: "Data updated successfully" });
        });

    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ status: "false", message: "An unexpected error occurred." });
    }
});

// delete

app.post('/delete', upload.none(), (req, res) => {
    try {
        const { id } = req.body;
         console.log(id)
        const sql = "DELETE FROM student_info WHERE id = ?";
        const value = [id]
        
        con.query(sql, value, function (err, result) {
            if (err) {
                console.error("Database query error:", err);
                return res.status(500).json({ status: "false", message: "Database query failed." });
            }

            res.status(200).json({ status: "true", data: "Data updated successfully" });
        });

    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ status: "false", message: "An unexpected error occurred." });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
