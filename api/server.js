const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const db = require('../database/dbConfig');
const session = require('express-session'); // 1. added this 
const knexSessionStore = require('connect-session-knex')(session);
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

// knexSessionStore(session);

const server = express();

const sessionConfig = {
  name: "monkey",
  secret: "keep it a secret, keep it sale!",
  cookie: {
    // maxAge is the length/life if a session
    maxAge: 1 * 24 * 60 * 60 * 1000, // in milliseconds (ms) - this would be a day (24 hours)
    secure: false, // only set cookies over https. Server will not send back a cookie over http.
    // while in development, this could be set to false. When deployed, should be TRUE
  },
  // can the user access the cookie from us jusing document.cookie. should be true 99% of the time
  httpOnly: true,
  // both the below should be false. 
  // do you create a new cookie everytime a session is saved?
  resave: false,
  saveUninitialized: false, // GDPR laws against setting cookies automatically
 
  store: new knexSessionStore({
    knex: db,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60,
  })
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig)); // 2. added this 



server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
