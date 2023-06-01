var express = require('express');
var router = express.Router();
var multer = require('multer')
require('dotenv').config()
const path = require("path");
const { resizeImage } = require('../controllers/images.controllers');
const storage = multer.memoryStorage();
const uploads = multer({storage})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', uploads.single('image'), async (req, res) => {
  let image_url = await resizeImage({file: req.file})
  res.status(200).json({image_url: image_url?.image_url})
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
