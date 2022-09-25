const Mongoose = require('mongoose');
const { ObjectId } = require('bson');
// const AnimalTag = require("./animalTag");

const { Schema } = Mongoose;
// const ObjectId = Schema.ObjectId;

const AnimalBondSchema = new Schema({
  // animal_id : ObjectId,
  animal_name: String,
  // tag: {
  //     type :Object,
  //     name :String
  // }
  data: {
    type: Object,
    img: String,
  },
  boneId: ObjectId,

});

const AnimalBone = Mongoose.model('AnimalBone', AnimalBondSchema);

module.exports = AnimalBone;
