const { handleError } = require('./error');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
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
};

module.exports = new uploadFile();
