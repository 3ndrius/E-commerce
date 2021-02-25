const express = require("express")
const path = require("path")
const app = express()
const errors = require("./middlewares/error")
const cookieParser = require('cookie-parser')

const CLIENT_BUILD_PATH = path.join(__dirname, "../client/build")

app.use(express.static(CLIENT_BUILD_PATH))
app.use(express.json())
app.use(cookieParser())

app.get("/", function (req, res) {
  res.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"))
})

// routes imports
const products = require("./src/routes/product")
const user = require("./src/routes/user")

// define routes
app.use("/api/v1", products)
app.use("/api/v1", user)
app.use(errors)

module.exports = app
