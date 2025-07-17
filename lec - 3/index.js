const express = require('express')
const path = require('path')
const app = express()
const port = 3000


app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/static/card.html', express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/home', (req, res) => {
  res.send('<h2>home World!</h2>')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
