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
    let sql = "UPDATE student_info SET name = 'skim' WHERE name = 'trupal'";  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("update sucessfully");
  });
});