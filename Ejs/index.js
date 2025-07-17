const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();
const port = 4000;


app.get('/', (req, res) => {

    res.render('home' , { name: 'Akashdeep' });

});

const server = app.listen(4000, function () {
    console.log('listening to port 4000')
});