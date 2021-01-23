const polka = require('polka');
const { json } = require('body-parser');
const { PORT=4000 } = process.env;

polka()
  .use(json())
  .get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json', 'x-content-type-options': 'nosniff', 'cache-control': 'no-cache', 'content-type': 'utf-8' });
    let json = JSON.stringify(req.body);
    res.end(json);
  })
  .listen(PORT, err => {
    if (err) throw err;
    console.log(`> Running on localhost:${PORT}`);
});

const { MongoClient } = require("mongodb");
require('dotenv').config()

// Replace the following with your Atlas connection string

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;

const url = "mongodb+srv://" + user + ":" + pass + "@" + host + "/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url);

// The database to use
const dbName = "test";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection "people"
    const col = db.collection("people");

    // Find one document
    const myDoc = await col.find().toArray();
    // Print to the console
    console.log(myDoc);

    } catch (err) {
      console.log(err.stack);
  }

  finally {
    await client.close();
  }
}

run().catch(console.dir); 