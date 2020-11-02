const { handleError } = require('./error');
const user = require('./user');
const validate = require('./validate');
const Politician = require('../models/politician');

class PoliticianProfile {
  async createOne(userId, data) {
    const newProfile = new Politician({user: userId, ...data});
    newProfile.save(err => {
      if (err) {
        if (err.errmsg) {
          console.log(err.errmsg);
        } else {
          console.log(err);
        }
      }
    });

    const cleanNewProfile = validate.removeEmptyArrayValues(newProfile);
    return cleanNewProfile;
  };

  async getOneById(_id) {
    const profile = await Politician.findById(_id, (err, politician) => {
      if (err) {
        console.error(err);
        return 'no profile';
      } else {
        return politician;
      }
    });
    
    const cleanProfile = validate.removeEmptyArrayValues(profile);
    return cleanProfile;
  };

  async getOneByUserId(user) {
    const profile = await Politician.findOne({ user }, (err) => {
      if (err) {
        console.error(err);
      }
    });

    const cleanProfile = profile ? validate.removeEmptyArrayValues(profile) : profile;
    return cleanProfile;
  };

  async getManyByUserId(users) {
    const profiles = await Politician.find({'user': {$in : users}}, err => {
      if (err) console.log(err);
    }).select(['_id', 'user', 'firstname', 'lastname', 'profilePhoto', 'party']);
    
    return profiles;
  };

  async modifyOne(profile, data) {
    const toParse = ['programme', 'team', 'unregisteredTeam'];

    for (const [key, value] of Object.entries(data)) {
      if (key === 'team') {
        let team = JSON.parse(value);
        let updatedTeam = [];

        for (let i=0; i < team.length; i++) {
          if (typeof team[i] === 'string') {
            const memberUser = await user.getOneByEmail(team[i]);
            if (memberUser
              && profile.user !== memberUser._id
              && memberUser.userType === 'politician') {
              updatedTeam.push(memberUser._id);
            }
          } else {
            updatedTeam.push(team[i].user);
          };
        };
        
        profile[key] = updatedTeam;
       
      } else if (toParse.includes(key)) {
        profile[key] = JSON.parse(value);
      } else {
        profile[key] = value;
      }
    };

    await profile.save(err => {
      if (err) {
        if (err.errmsg) {
          console.log(err.errmsg);
        } else {
          console.log(err);
        }
      }
    });

    const cleanProfile = validate.removeEmptyArrayValues(profile);
    return cleanProfile;
  };

  async addUnregisteredTeamMember(profile, member) {
    profile.unregisteredTeam = profile.unregisteredTeam
      ? [ ...profile.unregisteredTeam, member ]
      : [member];

    await profile.save(err => {
      if (err) {
        if (err.errmsg) {
          console.log(err.errmsg);
        } else {
          console.log(err);
        }
      }
    });

    const cleanProfile = validate.removeEmptyArrayValues(profile);
    return cleanProfile;
  }

  async updateUnregisteredTeamMember(profile, updatedMember) {
    profile.unregisteredTeam = [ ...profile.unregisteredTeam.filter(member => {
      return member._id.toString() !== updatedMember._id;
    }), updatedMember ];

    await profile.save(err => {
      if (err) {
        if (err.errmsg) {
          console.log(err.errmsg);
        } else {
          console.log(err);
        }
      }
    });

    const cleanProfile = validate.removeEmptyArrayValues(profile);
    return cleanProfile;
  }

  async deleteUnregisteredTeamMember(profile, memberId) {
    profile.unregisteredTeam = profile.unregisteredTeam.filter(member => {
      return member._id.toString() !== memberId;
    });

    await profile.save(err => {
      if (err) {
        if (err.errmsg) {
          console.log(err.errmsg);
        } else {
          console.log(err);
        }
      }
    });

    const cleanProfile = validate.removeEmptyArrayValues(profile);
    return cleanProfile;
  }

  async deleteOne(_id) {
    return await Politician.findOneAndDelete(_id);
  };

  async search(name = null, city = null) {
    const regexName = new RegExp(validate.escapeRegex(name), 'gi');
    const regexCity = new RegExp(validate.escapeRegex(city), 'gi');

    const profiles = await Politician.find(
      {$and: [
        name ? {$or: [{firstname: regexName}, {lastname: regexName}]} : {},
        city ? {city: regexCity} : {}]
      },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    ).select(['_id', 'user', 'firstname', 'lastname', 'city', 'party', 'profilePhoto']);

    if (profiles && profiles.length > 0) {
      return profiles.map(profile => validate.removeEmptyArrayValues(profile));
    } else {
      return 'no profiles found for this query';
    }
  };
};

module.exports = new PoliticianProfile();
