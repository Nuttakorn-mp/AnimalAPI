const { ObjectId } = require('bson');
const Mongoose = require('mongoose');
// const AnimalTag = require("./animalTag");

const { Schema } = Mongoose;
// const ObjectId = Schema.ObjectId;

const AnimalSchema = new Schema({
  animal_name: String,
  tag: {
    type: Object,
    img: String,
  },
  boneId: ObjectId,
  data: {
    type: Array,
  },

});

const Animal = Mongoose.model('Animal', AnimalSchema);

module.exports = Animal;
