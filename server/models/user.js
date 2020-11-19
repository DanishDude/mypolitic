const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    match:[/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'is invalid'],
  },
  password: {type: String, required: true, select: false},
  userType: {
    type: String,
    enum: ['politician', 'assistant', 'citizen', 'admin', 'superadmin'],
    required: true
  },
  likes: [{type: Schema.Types.ObjectId, ref: 'Politician', unique: true, default: undefined}]
});

userSchema.pre('save', function (next) {
  const user = this;
  
  if (user.isModified('password') || user.isNew) {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  } else {
    return next();
  };
});

userSchema.methods.comparePassword = function (pw, cb) {
  bcrypt.compare(pw, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
