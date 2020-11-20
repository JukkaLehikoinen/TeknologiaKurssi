//lähtee käyntiin node index.js  ||  npm start
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cors())

const fs = require('fs');

let tieto = "";
let kayttaja = require('./kayttaja.json')

app.get('/kayttaja', (req, res) => {
  if (tieto === "") {
    res.json(kayttaja)
  } else {
    res.json(tieto)
  }
})

app.post('/kayttaja', function (req, res) {
  tieto = req.body
  res.json(tieto);
  let data = JSON.stringify(tieto);
  fs.writeFileSync('kayttaja.json', data);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Nyt kuunnellaan porttia ${PORT}`)
})