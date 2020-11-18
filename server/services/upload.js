const { handleError } = require('./error');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const politicianProfile = require('../services/politician');
const multer = require('multer');
require('dotenv').config();

if (typeof (process.env.CLOUDINARY_URL) === 'undefined') {
  console.warn('!! cloudinary config is undefined !!');
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    // use_filename: true,
    // folder: 'some-folder-name',
    // format: async (req, file) => 'png', // supports promises as well
    // public_id: (req, file) => new Date().toISOString() + file.originalname
  },
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

  deleteCloudinaryResource(url) {
    return cloudinary.api.delete_resources(this.getPublicId(url));
  };

  getPublicId(url) {
    return url.split('/')[7].split('.')[0];
  }
};

module.exports = new uploadFile();
