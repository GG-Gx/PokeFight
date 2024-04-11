const express = require('express');
const cors = require('cors');
const router = require('./routes/routes.js');
const dotenv = require('dotenv');
require('dotenv').config();


const app = express();


const PORT = 3000;



app.use(cors());


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to the Pokemon API!');
});

app.use('/api', router);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


