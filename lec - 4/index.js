                                // Express, static file path  ..............


      
const express = require('express')
const path = require('path')
const app = express()
const port = 400


// app.use('/static', express.static(path.join(__dirname, 'public')));
// app.use('/static/card.html', express.static(path.join(__dirname, 'public')));


app.use(express.static('public'))
let publicPath = path.join(__dirname, 'public');

app.get('/user', (req, res) => {
  res.sendFile(`${publicPath}/`)
});

app.get('/user/home', (req, res) => {
  res.sendFile(`${publicPath}/home.html`)
});
app.get('/user/about', (req, res) => {
  res.sendFile(`${publicPath}/About.html`)
});
app.get('/user/contact', (req, res) => {
  res.sendFile(`${publicPath}/contact.html`)
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
