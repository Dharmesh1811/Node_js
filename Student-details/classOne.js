const mongoose = require('mongoose');
const express = require('express')
const app = express()
const port = 3000


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/student_details');

}

const salarySchema = new mongoose.Schema({
    name: String,
    contact_no: Number,
    email: String,
    r_no: Number,
});
const classone = mongoose.model('classone', salarySchema);


const createSalary = async () => {

  // data default add
  let data = classone({name:"ramesh",contact_no:"1234567890", email:"abc12@gmail.com", r_no:"1"});
  let result =  await data.save()
  console.log(result)
}

createSalary();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
