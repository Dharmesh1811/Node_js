const con = require("./db_connect");

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  let sql = `CREATE TABLE u_profile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    workExperience VARCHAR(255), -- e.g., "2 years in IT", "Fresher"
    university VARCHAR(255),
    secondarySchool VARCHAR(255),
    city VARCHAR(100),
    phoneNumber VARCHAR(20)
  );`;
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});