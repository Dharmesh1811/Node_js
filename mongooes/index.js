const mongoose = require('mongoose');
const express = require('express')
const app = express()
const port = 3000


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/empolyee');

}

const salarySchema = new mongoose.Schema({
    name: String,
    salary: Number,
});
const person = mongoose.model('person', salarySchema);


const createSalary = async () => {

  // data default add
  let data = person({name:"ramesh",salary:"10000"});
  let result =  await data.save()
  console.log(result)
}

createSalary();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
