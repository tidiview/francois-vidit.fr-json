const mongoose = require("mongoose");
require('dotenv').config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;

const uri = "mongodb+srv://" + user + ":" + pass + "@" + host + "/test?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser:true, 
  useUnifiedTopology:true, 
  useCreateIndex: true,
	useFindAndModify: false
})

mongoose.connection.on("error", function(error) {
  console.log(error)
})

mongoose.connection.on("open", function() {
  console.log("Connected to MongoDB database.")
})