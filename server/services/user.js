const politician = require('./politician');
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

  async likePolitician(user, politicianProfile) {
    const liked = await user.likes.includes(politicianProfile._id.toString());
      
    if (liked) {
      user.likes = user.likes.filter((likeId) => likeId.toString() != politicianProfile._id.toString());
    } else {
      user.likes.push(politicianProfile._id);
    }

    user.save();
    return liked;
  };
}

module.exports = new UserClass();
