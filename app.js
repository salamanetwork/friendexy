const express = require("express");
const path = require("path");
const dn = require('date-time');
const bp = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const { check, validationResult } = require('express-validator/check');
const flash = require('express-flash-notification');
const session = require('express-session');

const db = require('knex')({
  client: 'pg',
  version: '10.4',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : 'postgres',
    database : 'friendexy'
  }
});

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bp.urlencoded({extended: true}));
app.use(bp.json());

app.use(session({
  name: 'friendexyNodeJS',
  secret: 'friendexyNodeJS',
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    expires: new Date('Monday, 18 January 2028')
  },
}));

app.use(flash(app));

app.set("views", "./public/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {

  db.select("*").table("member_info").then(rows => {
    res.render("pages/index", {
      rows: rows
    });
  });
});

app.listen(3000, console.log("SERVER RUNNING ON PORT: 3000 ON TIME: " + dn()));
