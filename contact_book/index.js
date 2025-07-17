// import {createReqire} from "module"; 
// const require = createReqire(import.meta.url)

var { ObjectId } = require('mongodb');
const multer = require("multer");
// import multer from 'multer'

const upload = multer();
const express = require('express')
const main = require('./mongodb.js')
const app = express()
const port = 3000


app.get('/show', async (req, res) => {

    let db = await main()
    const collection = db.collection('contact');

    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);

    res.send(findResult)
})


app.post('/add', upload.none(), async (req, res) => {
    try {
        const { first_name, surname, phone_number, email, note } = req.body;
        console.log(req.body)
        if (!first_name || !surname || !phone_number || !email || !note) {
            return res.status(400).send({ error: 'Name and Post are required fields' });
        }

        const obj = { first_name, surname, phone_number, email, note };
        console.log('Form Data:', obj);

        let db = await main()
        let collection = db.collection('contact');

        const result = await collection.insertOne(obj);
        res.status(201).send(result);
    } catch (err) {
        console.error('Insert error:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
})


// update data -----------------------------------


app.put('/update', upload.none(), async (req, res) => {
    try {
        const { first_name, surname, phone_number, email, note, id } = req.body;
        console.log(req.body);


        const filter = { _id: new ObjectId(id) };
        const updateDoc = { $set: { id, first_name, surname, phone_number, email, note } };

        let db = await main()
        let collection = db.collection('contact');

        const result = await collection.updateOne(filter, updateDoc);

        if (result.matchedCount === 0) {
            return res.status(404).send({ error: 'Document not found' });
        }

        res.status(200).send({
            message: 'Document updated successfully', result
        });
    } catch (err) {
        console.error('Update error:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


//delete data ---------------------------------

app.delete('/delete', upload.none(), async (req, res) => {
    try {
        const { id, first_name, surname, phone_number, email, note } = req.body;
        console.log(req.body);

        let db = await main()
        let collection = db.collection('contact');


        const filter = { _id: new ObjectId(id) };
        const Delete = { $set: { id, first_name, surname, phone_number, email, note } };
        const result = await collection.deleteOne(filter, Delete);

        
        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'Document not found' });
        }

        res.status(200).send({
            message: 'Document deleted successfully', result
        });
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
