// const mongoose = require('mongoose');
var { ObjectId } = require('mongodb');
const multer = require("multer");
const upload = multer();
const express = require('express')
const main = require('./mongodb.js')
const app = express()
const port = 3000


app.get('/show', async (req, res) => {

    let db = await main()
    const collection = db.collection('classones');

    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);

    res.send(findResult)
})

// add data 

app.post('/add', upload.none(), async (req, res) => {
    try {
        const { name, contact_no, email, r_no } = req.body;
        console.log(req.body)
        if (!name || !contact_no || !email || !r_no) {
            return res.status(400).send({ error: 'Name and Post are required fields' });
        }

        const obj = { name, contact_no, email, r_no };
        console.log('Form Data:', obj);

        let db = await main()
        let collection = db.collection('classones');

        const result = await collection.insertOne(obj);
        res.status(201).send(result);
    } catch (err) {
        console.error('Insert error:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
