const express = require("express")
const path = require("path")
const app = express()
const errors = require("./middlewares/error")
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
// const CLIENT_BUILD_PATH = path.join(__dirname, "../client/build")

// app.use(express.static(CLIENT_BUILD_PATH))
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
// app.get("/", function (req, res) {
//   res.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"))
// })

// routes imports
const products = require("./src/routes/product")
const user = require("./src/routes/user")
const order = require("./src/routes/order")
const payment = require("./src/routes/payment")
// define routes
app.use("/api/v1", products)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", payment)
app.use(errors)

module.exports = app
