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
  let sql ="INSERT INTO student_info (id,name,rno,age,course) VALUES ('null','trupal','1','25','developer')"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("insert sucessfully");
  });
});