const express = require('express');
const cors = require('cors');
const router = require('./routes/routes.js');
const dotenv = require('dotenv');
const { model } = require('mongoose');
require('dotenv').config();

const PORT = 3001;

const app = express();



app.use(cors({
  origin: '*',
  methods: '*',
}));

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to the Pokemon API!');
});

app.use('/api', router);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
