var express = require('express');
var router = express.Router();
var multer = require('multer')
var sharp = require('sharp')
var fs = require('fs')
require('dotenv').config()
const path = require("path");
const storage = multer.memoryStorage();
const uploads = multer({storage})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', uploads.single('image'), async function(req, res, next) {
  fs.access('./images/uploads', (err) => {
    if (err){
      fs.mkdirSync('./images/uploads')
    }
  })
  const image = sharp(req.file.buffer)
  const metadata = await image.metadata()
  await sharp(req.file.buffer)
    .resize({width: metadata.width / 4, height: metadata.height / 4})
    .toFile('./images/uploads/' + req.file.originalname)
  
  res.json({image_url: `${process.env.HOST}/${req.file.originalname}`});
});

router.delete('/', function(req, res, next) {
  let directory = "./images/uploads/"
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
  res.json({message: "Success!"});
});

module.exports = router;
