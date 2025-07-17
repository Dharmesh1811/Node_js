const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'empolyee';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('salary');

  const insertResult = await collection.insertOne({
    _id:"11" ,
    name:"trupal",
    post:"staff manager", 
    salary: "50000"
  });
  console.log('Inserted documents =>', insertResult);




  // let result = await collection.updateOne({
  //   _id: "11"
  //   }, {
  //     $set: {
  //       name: "dharmesh",
  //     }
  // })


  // let result = await collection.deleteOne({
  //   _id: "11"
  // });
  // console.log("hello", result);


  // the following code examples can be pasted here...

  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);
//   return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());