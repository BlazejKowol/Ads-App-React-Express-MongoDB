const express = require('express');
const cors = require('cors');
const adsRoutes = require('./routes/ads.routes');
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose');

// start express
const app = express();

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

// add middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({secret: 'bk10', store: MongoStore.create(db), resave: false, saveUninitialized: false }));

// add routes 
app.use('/api', adsRoutes);
app.use('/api', usersRoutes);
app.use('/auth', authRoutes);

// start server
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})
