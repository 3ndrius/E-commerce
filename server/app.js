const express = require('express')
const path = require("path")
const app = express()

const CLIENT_BUILD_PATH = path.join(__dirname, "../client/build")

app.use(express.static(CLIENT_BUILD_PATH))
app.use(express.json())

//app.use(cookieParser());


app.get("/", function (req, res) {
  res.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"));
});

// routes imports
const products = require('./src/routes/product')



// define routes
app.use('/api/v1', products)

module.exports = app
