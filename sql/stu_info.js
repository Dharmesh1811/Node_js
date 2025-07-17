const con  = require("./db_connect");

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  let sql = `CREATE TABLE student_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    rno VARCHAR(20),
    age INT,
    course VARCHAR(100)
  );`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
