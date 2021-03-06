const app = require("./app");
const dotenv = require("dotenv");
//const cors = require("cors");
const logger = require("morgan");
var cloudinary = require('cloudinary').v2;
// handle uncaught exeption
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("Somethig wrong due uncaughtException");
  process.exit(1);
});

 const cookieParser = require('cookie-parser');

// Configuration
app.use(logger("dev"));
//app.use(cors()); // app.use(cors({origin: "http://localhost:3000", credentials: true}));

// database import
dotenv.config();
require("./config/database");

// cloudinary config 
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
})

// server running
const server = app.listen(process.env.APP_PORT, function () {
  console.log(
    `%%%%%%%====== Server Listening on ${process.env.APP_PORT} and ${process.env.NODE_ENV} =======%%%%%%%%`
  );
});

// handle uncaughtd promise rejection
process.on("unhandledRejection", (error) => {
  console.log(`Error ${error.message}`);
  console.log("Something went wrong due unhandleRejection");
  server.close(() => {
    process.exit(1);
  });
});
