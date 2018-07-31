const express = require("express");
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'postgres',
    database : 'friendexy'
  }
});

const app = express();

app.get("/", (req, res) => {

  res.send("hello");
});

app.listen(3000);
