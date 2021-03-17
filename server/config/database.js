const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// mongoose options
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex:true,
  poolSize: 10,
  bufferMaxEntries: 0,
};

// mongodb environment variables
const { MONGO_HOSTNAME, MONGO_DB, MONGO_PORT, MONGO_REMOTE_USER, MONGO_REMOTE_PASS, MONGO_DB_NAME, NODE_ENV } = process.env;

const dbConnectionURL = {
  'REMOTE': NODE_ENV === 'production' ? `mongodb+srv://${MONGO_REMOTE_USER}:${MONGO_REMOTE_PASS}@cluster0.sqazr.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority` :
  `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`,
  // mongodb+srv://dbUser:<password>@cluster0.7bkd7.mongodb.net/<dbname>?retryWrites=true&w=majority
  //mongodb+srv://remoteAdmin:<password>@cluster0.sqazr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
  //'mongodb://mongo:27017/myDB';
};
mongoose.connect(dbConnectionURL.REMOTE, options);
const db = mongoose.connection;
db.once("open", () => {
  // we're connected !
  console.log(
    "###### ======== Mongodb Connection Successful ========= ########"
  );
});
