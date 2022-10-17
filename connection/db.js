const mongoose = require('mongoose');

const uri = 'mongodb+srv://dbMuseum:admin@testdb.oijde.mongodb.net/499?retryWrites=true&w=majority';
const connectDB = async () => {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('db connect！');
};

module.exports = connectDB;

