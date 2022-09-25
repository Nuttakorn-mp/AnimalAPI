import express from 'express';
import getImage from '../routes/image.controller';

const route = express.Router();

route.get('/:folderName/:fileName', async (req, res) => {
  try {
    const { folderName, fileName } = req.params;
    const result = await getImage(req.params);
    res.status(200).sendFile(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default route;
