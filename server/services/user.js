const User = require('../models/user');

class UserClass {
  async getOneByEmail(email) {
    const user = await  User.findOne({email});

    if (user) {
      return user;
    } else {
      return `user not found with email ${email}`;
    };
  };
};

module.exports = new UserClass();
