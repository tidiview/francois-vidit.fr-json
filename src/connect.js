const { MongoClient } = require("mongodb");
require('dotenv').config();

async function main() {

  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const pass = process.env.DB_PASS;
  
  const uri = "mongodb+srv://" + user + ":" + pass + "@" + host + "/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";

  const client = new MongoClient(uri);

    try {
      // Connect to the MongoDB cluster
      await client.connect();
      console.log("Connected correctly to server");

      // Make the appropriate DB calls
      await listDatabases(client);

    } catch (e) {
      console.error(e);
    }
    finally {
      // Close the connection to the MongoDB cluster
      await client.close();
    }

}

main().catch(console.error);

/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 */
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};