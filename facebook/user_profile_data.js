const express = require('express');
const bodyParser = require('body-parser');
const con = require('./db_connect');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ dest: './uploads/' });
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());


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

//  user_profile

app.post('/add-profile', upload.none(), (req, res) => {

  const { workExperience, university, secondarySchool, city, phoneNumber } = req.body;
  const sql = `
    INSERT INTO u_profile (workExperience, university, secondarySchool, city, phoneNumber) 
    VALUES (?, ?, ?, ?, ?)
  `;

  con.query(sql, [workExperience, university, secondarySchool, city, phoneNumber], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).send("Error inserting data");
    }
    res.send("Profile added successfully!");
  });

});

// update profile

app.post('/update-profile', upload.none(), (req, res) => {
  const { id, workExperience, university, secondarySchool, city, phoneNumber } = req.body;

  const sql = `
    UPDATE u_profile 
    SET workExperience = ?, university = ?, secondarySchool = ?, city = ?, phoneNumber = ?
    WHERE id = ?
  `;
  con.query(sql, [workExperience, university, secondarySchool, city, phoneNumber, id], (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).send("Error updating profile");
    }
    res.send("Profile updated successfully!");
  });
});


// delete 
app.delete('/delete-profile', upload.none(), (req, res) => {
  const user_id = req.body.pid; // DELETE method માટે body માંથી લેવાયું છે

  if (!user_id) {
    return res.status(400).json({ msg: "User ID (pid) is required" });
  }

  const deleteProfileQuery = `
    DELETE FROM u_profile
    WHERE user_id = ?;
  `;

  con.query(deleteProfileQuery, [user_id], (err, profileResult) => {
    if (err) {
      console.error("Profile delete error:", err);
      return res.status(500).send("Error deleting profile data");
    }

    const deleteUserQuery = `
      DELETE FROM users
      WHERE id = ?;
    `;

    con.query(deleteUserQuery, [user_id], (err, userResult) => {
      if (err) {
        console.error("User delete error:", err);
        return res.status(500).send("Error deleting user data");
      }

      res.status(200).json({
        msg: "success",
        deleted: {
          profileRows: profileResult.affectedRows,
          userRows: userResult.affectedRows
        }
      });
    });
  });
});



//view-profile 

app.get('/view-profile', upload.none(), (req, res) => {
  const  user_id  = req.query.pid;
   console.log(user_id)
  const profileQuery = `
    SELECT * FROM u_profile
    WHERE user_id = ?;
  `;

  con.query(profileQuery, [user_id], (err, profileResult) => {
    if (err) {
      console.error("Profile query error:", err);
      return res.status(500).send("Error retrieving profile data");
    }

    const userQuery = `
      SELECT * FROM users
      WHERE id = ?;
    `;

    con.query(userQuery, [user_id], (err, userResult) => {
      if (err) {
        console.error("User query error:", err);
        return res.status(500).send("Error retrieving user data");
      }

      res.status(200).json({
        msg: "success",
        data: {
          user: userResult[0] || null,
          profile: profileResult[0] || null
        }
      });
    });
  });
});

// user

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




app.listen(3000, () => console.log('Server running on port 3000'));