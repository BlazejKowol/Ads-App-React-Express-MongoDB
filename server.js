const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
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

// add db connection

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') dbUri = 'url to remote db';
else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/adsAppDBtest';
else dbUri = 'mongodb://localhost:27017/adsAppDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
    
db.once('open', () => {
    console.log('Connected to the database');
  });

db.on('error', err => console.log('Error ' + err));     
