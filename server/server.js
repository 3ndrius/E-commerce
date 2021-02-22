const app = require('./app')
// server.js
const dotenv = require('dotenv');
const cors = require("cors")
const logger = require("morgan")
// const cookieParser = require('cookie-parser');
// Configuration
app.use(logger("dev"))
app.use(cors()); // app.use(cors({origin: "http://localhost:3000", credentials: true}));

dotenv.config();
require("./config/database");

app.listen(process.env.APP_PORT, function () {
  console.log(`%%%%%%%====== Server Listening on ${process.env.APP_PORT} =======%%%%%%%%`);
});
