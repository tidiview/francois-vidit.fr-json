const polka = require('polka');
const { json } = require('body-parser');
const { PORT=3000 } = process.env;
const send = require('@polka/send-type');
const posts = require('./posts');
const { MongoClient, ObjectId, ObjectID } = require("mongodb");
require('dotenv').config()
/* const fetch = require('node-fetch'); */

// Mongodb credentials
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;

const url = "mongodb+srv://" + user + ":" + pass + "@" + host + "/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";

const payloadMitsue = {
  "name": { "first": "光江", "last": "Vidit" }
}
 
// The database to use
/* const dbName = "test";

// The collection to use
const collectionName = "people";

const client = new MongoClient(url);

const ObjectIDMitsue = "6011866c24ede92c7022867d";

const init = async () => {
  
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection "people"
    const col = db.collection(collectionName);

    // Insert a document
    // const myDoc = await col.insertOne(payloadMitsue);

    // Delete a document
    const myDoc = await col.deleteOne({_id: ObjectID(ObjectIDMitsue)});

    // Print to the console
    console.log(myDoc);

  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

init(); */

polka()
  .use(json())
  .get('/', async (req, res) => {
    let connexion = await new MongoClient(url).connect()
    // connexion to db "test" collection "people"
    let data = await connexion.db("test").collection("people").find().toArray().catch(err => {
      send(res, 404);
    });
      console.log(data)
      // send(res, code, data, headers)
      // res: ServerReponse | code: Number | data: String | headers: Object
      send(res, 200, data, { 'Content-Type': 'application/json; charset=UTF-8', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache' });
  })

  /* .post('/', (req, res) => {
		res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache' });
		let json = JSON.stringify(req.body);
		res.end(json);
  }) */
  
  .post('/', (req, res) => {
    let json = JSON.stringify(req.body);

    // The database to use
    const dbName = "test";
    // The collection to use
    const collectionName = "people";
    // The credentials to use (see above)
    const client = new MongoClient(url);
    // The document ID to delete (sent to the server)
    const ObjectIDMitsue = "6011907fb6490003a0bbb1d8";

    const init = async () => {
      try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        // Use the collection "people"
        const col = db.collection(collectionName);
        // Insert json as a document
        const myDoc = await col.insertOne(JSON.parse(json));
        // Delete document with ID = ObjectIDMitsue
        /* const myDoc = await col.deleteOne({_id: ObjectID(ObjectIDMitsue)}); */
        // Print to the console of the operation
        console.log(myDoc);
      } catch (err) {
        console.log(err.stack);
      } finally {
        await client.close();
      }
    }
    init();

		res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache' });
    res.end(json)
  })
    
  .use("posts", posts)
  .listen(PORT, err => {
    if (err) throw err;
    console.log( `> Running on localhost:${PORT}` );
  });