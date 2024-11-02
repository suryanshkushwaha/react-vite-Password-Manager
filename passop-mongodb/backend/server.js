const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb')
const bodyparser = require('body-parser')
const cors = require('cors')
dotenv.config()

const app = express()
const port = process.env.PORT || 3000
app.use(bodyparser.json())
app.use(cors())

const url = process.env.MONGO_URI
const client = new MongoClient(url);

const dbName = 'PassOP-Manager';

client.connect();
console.log('Connected successfully to server');

app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password)
  res.send({ success: true, result: findResult })
})

app.put('/', async (req, res) => {
  const { id, website, username, password } = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');

  const result = await collection.updateOne(
    { id: id },
    { $set: { website, username, password } }
  );

  res.send({ success: true, result });
})


app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password)
  res.send({ success: true, result: findResult })
})

app.delete('/deleteAll', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');

  const result = await collection.deleteMany({});

  res.send({ success: true, result });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
