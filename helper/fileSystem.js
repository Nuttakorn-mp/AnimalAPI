const fs = require('fs');

exports.removeFile = (filePath) => {
  try {
    checkFileIsExist(filePath).then((result) => {
      if (result) {
        if (checkFileIsExist) {
          fs.unlink(filePath, (err) => {
            if (err) throw err;
            console.log('remove file complete');
          });
        }
      }
    }).catch((err) => { throw err; });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.checkFileIsExist = async (filePath) => {
  if (!filePath) {
    return false;
  }

  let isExist = false;
  if (fs.existsSync(filePath)) {
    isExist = true;
  }
  return isExist;
};

exports.createFolder = async (filePath) => {
  if (filePath) {
    if (!await checkFileIsExist(filePath)) {
      await fs.mkdirSync(filePath);
    }
  }
};
