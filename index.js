const polka = require('polka');
const send = require('@polka/send-type');
const { PORT=3000 } = process.env;
const people = require('./people');
const { MongoClient } = require("mongodb");
require('dotenv').config()
/* const { json } = require('body-parser'); */
/* const fetch = require('node-fetch'); */

// Mongodb credentials
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;

const url = "mongodb+srv://" + user + ":" + pass + "@" + host + "/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";

polka()
  .use(json())
  /* .get('/', reply) */
  .get('/', async (req, res) => {
    let connect = await new MongoClient(url).connect()
    let data = await connect.db("test").collection("people").find().toArray().catch(err => {
      send(res, 404);
    });
      console.log(data)
      // send(res, code, data, headers)
      // res: ServerReponse | code: Number | data: String | headers: Object
      send(res, 200, data, { 'Content-Type': 'application/json; charset=UTF-8', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache' });
  })
  .use("people", people)
  .listen(PORT, err => {
    if (err) throw err;
    console.log(`> Running on localhost:${PORT}`);
});