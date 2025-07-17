                            // Express Router middelware ................ 



const express = require('express')
const path = require('path')
const router = express.Router()
const app = express()
const port = 3000


// app.use('/static', express.static(path.join(__dirname, 'public')));
// app.use('/static/card.html', express.static(path.join(__dirname, 'public')));



app.use(express.static('public'))
let publicPath = path.join(__dirname, 'public');

router.get('/user', (req, res) => {
  res.sendFile(`${publicPath}/`)
});


router.get('/user/about', (req, res) => {
  console.log(req.query.age)

  if(req.query.age > 18){
    res.sendFile(`${publicPath}/About.html`)
  }
  else{
    res.sendFile(`${publicPath}/`)
  }
  
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

app.use('/', router)

