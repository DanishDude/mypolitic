const { handleError } = require('./error');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const multer = require('multer');
require('dotenv').config();

if (typeof (process.env.CLOUDINARY_URL) === 'undefined') {
  console.warn('!! cloudinary config is undefined !!');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const acceptableFileTypes = ['image/jpeg', 'image/png'];
const fileFilter = (req, file, cb) => {
  if (acceptableFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new handleError('Only .jpeg or .png files are accepted'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
  fileFilter
});

class uploadFile {
  profilePhoto(req, res, next) {
    return (upload.single('profilePhoto'))(req, res, next);
  };
  
  unregisteredMemberPhoto(req, res, next) {
    return (upload.single('photo'))(req, res, next);
  };

  async sendToCloud(filename, public_id = null) {
    return await cloudinary.uploader.upload(`public/${filename}`,
      { public_id },
      (error, result) => {
        if (error) {
          console.error(error)
          return null;
        } else if (result) {
          fs.unlink(`public/${filename}`, (err) => {
            if (err) throw new Error(err);
          });
          return result;
        }
      }
    );
  }
};

module.exports = new uploadFile();
