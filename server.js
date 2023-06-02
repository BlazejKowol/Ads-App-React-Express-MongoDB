const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adsRoutes = require('./routes/ads.routes');
const usersRoutes = require('./routes/users.routes');

// start express server
const app = express();

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})

// add middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// add routes 
app.use('/api', adsRoutes);
app.use('/api', usersRoutes);