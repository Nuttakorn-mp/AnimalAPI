const Image = require('./imageController');
const Animal = require('../model/animal');
const AnimalBone = require('../model/animalbone');
const Bone = require('./bone');

exports.getAnimalName = (req, res) => {
  Animal.find({}, (err, result) => {
    if (err) { res.status(500).send(err); }
    res.status(200).json(result);
  });
};

exports.getAnimalNameById = (req, res) => { // default web
  // console.log(req.params.animalId);

  const promiseResult = Bone.getAnimalNameById(req.params.animalId);
  promiseResult.then((result) => {
    // console.log(result)
    const { boneId } = result;
    // console.log(typeof boneId);
    // res.status(200).json(boneId);
    AnimalBone.findById(boneId, (err, aaa) => {
      if (err) { res.status(500).send(err); }
      res.status(200).json(aaa);
    });
  });
};

exports.getAnimalNameById_mobile = (req, res) => {
  // console.log(req.params.animalId);

  const promiseResult = Bone.getAnimalNameById(req.params.animalId);
  promiseResult.then((result) => {
    const { boneId } = result;
    webFormat = AnimalBone.findById(boneId).lean();
    webFormat.then((resultFormWeb) => {
      const { animal } = resultFormWeb;
      const { data } = resultFormWeb;
      const mobileFormat = [{}];
      // let temp=[];
      const temp2 = [];
      // let name;
      const imgList = animal.completeImagePath;
      // console.log(data)
      // console.log("------------------------")
      // console.log("------------------------")
      // console.log("------------------------")
      // console.log(imgList);
      // console.log(data.length)
      for (let i = 0; i < imgList.length; i++) {
        if (imgList[i] == data[i].imageName) {
          mobileFormat[0][imgList[i]] = {};
          for (let j = 0; j < data[i].coordinator.length; j++) {
            // console.log(mobileFormat[0][imgList[i]])
            mobileFormat[0][imgList[i]][j] = data[i].coordinator[j];
          }
        } else { // ยังไม่ได้ทำกรณีที่ลำดับไม่ตรงกัน
          // console.log(i+" "+name+" != "+data[i].imageName);
        }
      }

      temp2.push({ 0: animal });
      mobileFormat[0].animal = temp2[0];
      // console.log(mobileFormat)
      // console.log(mobileFormat[0].animal)
      // console.log("------------------------")
      // console.log(imgList.length)

      res.status(200).json(mobileFormat);
    });
  });// End promiseResult
  // res.status(200).json({msg: "hello"});
};

// รอแก้Formatข้อมูลให้ถูกต้อง
exports.newAnimal = (req, res, next) => {
  const animal_1 = new Animal({
    animal_name: req.body.animal_name,
    tag: req.body.tag,
  });
  animal_1.save().then((result) => {
    console.log(result);
    res.status(200).json(result);
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ message: err });
  });
};

exports.updateTagToAnimal = (req, res) => {
  const { data } = req.body;
  let newCoordinator = [];
  const newData = [];
  // console.log(req.body)

  // console.log(req.params)
  // console.log(data)
  // console.log(data[0].imageName)
  // console.log(data[0].coordinator[0])
  // console.log(data[0].coordinator[0].flag)
  console.log('');
  console.log('------- data from client -------');
  console.log(`animalId : ${req.body.animalId}`);
  console.log(`boneId : ${req.body.boneId}`);
  for (let i = 0; i < data.length; i++) {
    if (data[i].coordinator.length == 0 || data[i].coordinator.length == null) {
      console.log(`${i}    ${data[i].imageName}`);
      newData.push({
        imageURL: data[i].imageURL,
        _id: data[i]._id,
        imageName: data[i].imageName,
        coordinator: newCoordinator,
      });
      newCoordinator = [];
    } else {
      console.log('');
      console.log(data[i].imageName);
      data[i].coordinator.forEach((element) => {
        console.log(`    ${element.title} flag ${element.flag}`);
        if (element.flag != 3) {
          delete element.flag;
          newCoordinator.push(element);
        }
      });
      // ให้เพิ่มรูปอื่นนอกจากรูปที่มีการแก้ไข เข้าไปด้วย
      newData.push({
        imageURL: data[i].imageURL,
        _id: data[i]._id,
        imageName: data[i].imageName,
        coordinator: newCoordinator,
      });
      newCoordinator = [];
    }
  }
  // เพิ่ม animalId กับ boneId
  const lastData = {
    animalId: req.body.animalId,
    boneId: req.body.boneId,
    data: newData,
  };
  // lastData.push({"data": newData})

  // unit test
  // let testUpdate={
  //     "data":[{
  //         "imageURL": "http://localhost:4000/img/animals/img-1622604623581.jpg",
  //         "_id": "60b6fe505f064f2cd4b44e73",
  //         "imageName": "img-1622604623581.jpg",
  //         "coordinator": [{
  //             "_id": "60b9fa6ffea107048ca10f66",
  //             "title": "testUpdate",
  //             "flag": 2
  //         }]
  //     }]
  // }
  // console.log(lastData)
  // console.log(lastData.boneId)
  // console.log(lastData.animalId)

  // ส่วนนี้หา animal bone id เพื่อเอาไปอัพเดท tag
  // let promiseResult = Bone.getAnimalNameById(req.params.animalId)
  // promiseResult.then((result)=>{
  //     let boneId = result.boneId;

  AnimalBone.findOneAndUpdate(
    { _id: lastData.boneId },
    lastData,
    // testUpdate,
    { new: true },
    (err, result) => {
      if (err) { res.status(500).send(err); }
      res.status(200).json(result);
    },
  );
  // })

  // res.status(200).json("hello");

  // ส่วนนี้หา animal bone id เพื่อเอาไปอัพเดท tag
  // let promiseResult = Bone.getAnimalNameById(req.params.animalId)
  // promiseResult.then((result)=>{
  //     let boneId = result.boneId;

  //     AnimalBone.findOneAndUpdate(
  //         {_id : boneId},
  //         newData,
  //         {new : true},
  //         (err, result)=>{
  //             if(err){res.status(500).send(err);}
  //             res.status(200).json(result);
  //         }
  //     );

  // AnimalBone.findById(boneId, (err, aaa) =>{
  //     if(err){res.status(500).send(err);}
  //     res.status(200).json(aaa);
  // })

  // })

  // Animal.findOneAndUpdate(
  //     {_id : req.params.animalId},
  //     req.body,
  //     {new : true},
  //     (err, result)=>{
  //         if(err){res.status(500).send(err);}
  //         res.status(200).json(result);
  //     }
  // );
};

exports.deleteAnimal = (req, res) => {
  Animal.remove({ _id: req.params.animalId }, (err, result) => {
    if (err) { res.status(500).send(err); }
    res.status(200).json('Animal successfully deleted');
  });
};

exports.image = async (req, res) => {
  try {
    // let {folderName, fileName} = req.params
    const result = await Image.getImage(req.params);
    res.status(200).sendFile(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

function getName(name) {
  return name;
}
