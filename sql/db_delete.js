let mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "student"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
    let sql = "DELETE FROM student_info WHERE name = 'vanraj'";  
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("delete sucessfully");
  });
});