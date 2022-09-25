// const { MongoClient } = require('mongodb');

const mongoose = require('mongoose');

const uri = 'mongodb+srv://dbMuseum:admin@testdb.oijde.mongodb.net/499?retryWrites=true&w=majority';
const connectDB = async () => {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('db can connect！');
};

module.exports = connectDB;

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     //const collection = client.db("test").collection("devices");

//     const collection = client.db("499").collection("museum");
//     console.log("can connect！")
//     console.log();
//     // perform actions on the collection object
//     client.close();
// });
