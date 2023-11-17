const { MongoClient, ObjectId } = require(`mongodb`);
const { hashPass } = require("../helpers/bcrypt");

const uri_development = `mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1`
let uri_production = process.env.DATABASE_URL

const client = new MongoClient(uri_production)

async function run() {
    try {
      const database = client.db(`service-user`);
      const users = database.collection('users');

      const data = require(`../data/user.json`).map((user) => {
        user.password = hashPass(user.password)
        return user
      })
      const response = await users.insertMany(data)
      console.log(response)
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);

async function undo() {
    try {
        const database = client.db(`database_development`);
        const users = database.collection('users');

        const response = await users.drop()
        console.log(response)
      } finally {
        await client.close();
      }

    }
    // undo().catch(console.dir)

