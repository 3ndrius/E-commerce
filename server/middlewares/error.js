const dotenv = require("dotenv");
dotenv.config();

module.exports = (error, req, res, next) => {
  // Sets HTTP status code
  if (process.env.NODE_ENV === "development") {
    res.status(error.status || 500);

    res.json({
      success: false,
      status: error.status || 500,
      message: error.message,
      stack: error.stack,
    });
  }
  if (process.env.NODE_ENV === "production") {
    if (error.name == "CastError") {
      const message = `Resource not found. Invalid: ${error.path}`;
      error = new Error(message);
      error.status = 400;
    }
    if (error.name == "ValidationError") {
      const message = Object.values(error.errors).map((value) => value.message);
      error = new Error(message);
      error.status = 400;
    }
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};
