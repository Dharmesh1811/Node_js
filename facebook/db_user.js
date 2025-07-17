const con  = require("./db_connect");

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  let sql = `CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100),
    surname VARCHAR(100),
    birthDate VARCHAR(10),
    phoneNumber VARCHAR(20) UNIQUE,
    gender INT, -- 1 = Male, 2 = Female, 3 = Custom
    password VARCHAR(255)
);`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});