const { MongoClient } = require("mongodb");
require('dotenv').config();


// Replace the following with your Atlas connection string

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;

const url = "mongodb+srv://" + user + ":" + pass + "@" + host + "/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url);

async function run() {

    try {

        await client.connect();

        console.log("Connected correctly to server");

    } catch (err) {

        console.log(err.stack);

    }

    finally {

        await client.close();

    }

}

run().catch(console.dir);