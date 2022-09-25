// const AnimalBone = require('../model/animalbone');
const Animal = require('../model/animal');

exports.getAnimalNameById = async (id) => {
  try {
    return await Animal.findOne({ _id: id }).populate('boneId').lean();
    // , (err, result) => {
    //     if (err) { res.status(500).send(err); }

    //     res.status(200).json(result);
    // };
  } catch (error) {
    // throw error
    print(error);
  }
};
