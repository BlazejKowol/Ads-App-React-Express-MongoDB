const express = require('express');
const cors = require('cors');
const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose');
const path = require('path');

// start express
const app = express();

// add db connection
const NODE_ENV = process.env.NODE_ENV;
let dbUrl = '';

if(NODE_ENV === 'production') dbUrl = `mongodb+srv://user1:${process.env.DB_PASS}@cluster1.7cvqbd6.mongodb.net/adsAppDB`;
else if(NODE_ENV === 'test') dbUrl = 'mongodb://localhost:27017/adsAppDBtest';
else dbUrl = 'mongodb://localhost:27017/adsAppDB';


mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
    
db.once('open', () => {
    console.log('Connected to the database');
  });

db.on('error', err => console.log('Error ' + err));

// add middleware
if(process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'bk10',
  store: MongoStore.create({
    mongoUrl: dbUrl,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    collectionName: 'sessions',
    cookie: {
      secure: process.env.NODE_ENV == 'production',
    }
  }),
  resave: false,
  saveUninitialized: false,
}))

// add routes 
app.use('/api', adsRoutes);
app.use('/auth', authRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

// start server
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})

server.prependListener("request", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
});
