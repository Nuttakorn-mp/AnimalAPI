module.exports = function (app) {
  const todoList = require('./controller');

  app
    .route('/getAnimalName')
    .get(todoList.getAnimalName);

  app
    .route('/getAnimalName/:animalId')
    .get(todoList.getAnimalNameById)
    .put(todoList.updateTagToAnimal);

  app
    .route('/getAnimalName/mobile/:animalId')
    .get(todoList.getAnimalNameById_mobile);

  app
    .route('/img/:folderName/:fileName')
    .get(todoList.image);
};
