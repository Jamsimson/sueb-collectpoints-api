#!/usr/bin/env node
const mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient;

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require('dotenv').config()

// url mongodb
const url = process.env.MONGO_URL


app.use(bodyParser.json());
// parses incoming requests with JSON payloads
app.use(express.json());
// parses incoming requests with urlencoded payloads
// extended: true - parsing the URL-encoded data with the querystring library
app.use(express.urlencoded({extended: true}));

// MongoDB connection
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected...'))
//     .catch(err => console.log(err));
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  async function run() {
    try {
      await client.connect();
      const globalAndUS = client.db('covid19').collection("global_and_us");
      const cursor = globalAndUS.find({ country: "France" }).sort(["date", -1]).limit(2);
      await cursor.forEach(console.dir);
    } finally {
      await client.close();
    }
  }
  
  run().catch(console.dir);

// port _000
app.listen(3000, () =>{
    console.log(`Server is run on port 3000`);
})

/**
 * Routes.
 */
const userRouter = require("./src/routes/users")


app.use('/api/v1',userRouter)

module.exports = app;
