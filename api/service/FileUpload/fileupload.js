const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');



aws.config.update({
  secretAccessKey: 'UYJHQFgonJlR69DRtE/eqeqoVUsQBkj1eWf++g+P',
  accessKeyId: 'AKIAYBOFUBG37PSOVAML',
  region: 'ap-south-1'
});

const s3 = new aws.S3();

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'|| file.mimetype ==='image/jpg') {
//       cb(null, true)
//   } else {
//       cb(new Error('Invalid Mime Type, only JPEG ,JPG and PNG'), false);
//   }
// }
const upload = multer({
 // fileFilter,
  storage: multerS3({
    s3,
    bucket: 'smarthomeautomation',
    acl: 'public-read',
    storageClass: 'REDUCED_REDUNDANCY',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    filename: function (req, file, cb) {

      cb(null, file.fieldname + '-' + Date.now());
    }
  })
})

module.exports = upload;
