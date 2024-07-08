#!/usr/bin/env node

const express = require('express');
const app = express();

// parses incoming requests with JSON payloads
app.use(express.json());
// parses incoming requests with urlencoded payloads
// extended: true - parsing the URL-encoded data with the querystring library
app.use(express.urlencoded({extended: true}));

// port _000
app.listen(3000, () =>{
    console.log(`Server is run on port 3000`);
})

/**
 * Routes.
 */
const userRouter = require("./routes/users")


app.use('/api/v1',userRouter)

module.exports = app;
