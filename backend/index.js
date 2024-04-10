const express = require('express');
const cors = require('cors');
const router = require('./routes/routes.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();

const app = express();


const PORT = 3000;

mongoose.connect(process.env.DB_API)
.then(() => {
  console.log('Database is connected!');
})
.catch(err => console.log(err));





app.use(cors());


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to the Pokemon API!');
});

app.use('/', router);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


