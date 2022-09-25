const path = require('path');
const checkFileIsExist = require('../helper/fileSystem');

exports.getImage = async (params) => {
  try {
    const { folderName, fileName } = params;
    let filePath = `${__dirname}/../images/${folderName}/${fileName}`;

    if (!await checkFileIsExist.checkFileIsExist(filePath)) {
      // throw 'Not has image'
      filePath = `${__dirname}/../views/images/home_1.jpg`;
    }

    console.log(filePath);
    return path.resolve(filePath);
  } catch (error) {
    console.log(error);
    return `${__dirname}/../views/images/home_1.jpg`;
    // throw error
  }
};
