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
      if (politicianProfile.likes > 0) {
        politicianProfile.likes = politicianProfile.likes - 1;
      }
      user.likes = user.likes.filter((likeId) => likeId.toString() != politicianProfile._id.toString());
    } else {
      politicianProfile.likes = politicianProfile.likes + 1;
      user.likes.push(politicianProfile._id);
    }

    politicianProfile.save();
    user.save();
    return liked;
  };
}

module.exports = new UserClass();
