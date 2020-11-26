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
      user.likes = user.likes.filter(likeId => likeId.toString() != politicianProfile._id.toString());
    } else {
      user.likes.push(politicianProfile._id);
    }

    user.save();
    return liked;
  };

  async followPolitician(user, politicianProfile) {
    const followed = await user.follows.includes(politicianProfile._id.toString());
      
    if (followed) {
      user.follows = user.follows.filter(followId => followId.toString() != politicianProfile._id.toString());
    } else {
      user.follows.push(politicianProfile._id);
    }

    user.save();
    return followed;
  };
}

module.exports = new UserClass();
