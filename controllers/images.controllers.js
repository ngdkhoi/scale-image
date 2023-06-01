require('dotenv').config();
const sharp = require('sharp')
const fs = require('fs')
const tmp = require('tmp');

const resizeImage = async ({file = null, width = 190, height = 120}) => {
  if (file == null) {
    return {image_url: null}
  }
  fs.access('./images/uploads', (err) => {
    if (err){
      fs.mkdirSync('./images/uploads')
    }
  })
  const image = sharp(file.buffer)
  const metadata = await image.metadata()
  const tmpobj = tmp.fileSync();
  console.log('File: ', tmpobj.name);
  await sharp(file.buffer)
    .resize({width: width, height: height, fit: 'inside'})
    .toFile(tmpobj.name + file.originalname, (err, info) => {
      console.log(info);
    })
console.log();
  return {image_url: `${process.env.HOST}/${file.originalname}`}
}

module.exports = {
  resizeImage
}