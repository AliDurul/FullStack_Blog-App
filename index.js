"use strict";
/* ExpressJS Start */
const express = require("express");
const path = require('node:path')
const app = express();
/* ------------------------------------------------------------------------- */
/* ENV */ // Required Modules
require("dotenv").config();
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 8000;
/* ------------------------------------------------------------------------- */
require("express-async-errors");
/* ------------------------------------------------------------------------- */
// DB Connection
require("./src/configs/dbConnection")();
/* ------------------------------------------------------------------------- */

// MIDDLEWARES:
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/dist'))) // Static Files
app.use(require('cors')())
app.use(require("./src/middlewares/findSearchSortPage"));
app.use(require('./src/middlewares/authentication'))


// Home Path
app.all("/api/v1", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to Blog App server!!",
  });
});

// app.use(require('./src/middlewares/loger'))
/* ------------------------------------------------------------------------- */
// ROUTES:
app.use('/api/v1', require("./src/routes"));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'))  
})
/* ------------------------------------------------------------------------- */
// errorHandler:
app.use(require("./src/middlewares/errorHandler"));
/* ------------------------------------------------------------------------- */
// DEVELOPER SIDE PORT SYSTEM
app.listen(PORT, () => console.log(`Running on http://${HOST}:${PORT}`));
