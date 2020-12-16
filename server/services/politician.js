const mongoose = require('mongoose');
const { handleError } = require('./error');
const user = require('./user');
const validate = require('./validate');
const Politician = require('../models/politician');

class PoliticianProfile {
    async createOne(userId, data) {
        const profile = new Politician({ user: userId, ...data });
        profile.save((err) => {
            if (err) {
                if (err.errmsg) {
                    console.log(err.errmsg);
                } else {
                    console.log(err);
                }
            }
        });

        return profile;
    }

    async getOneById(_id) {
        const profile = await Politician.findById(_id, (err, politician) => {
            if (err) {
                console.error(err);
                return 'no profile';
            } else {
                return politician;
            }
        });

        return profile;
    }

    async getOneByUserId(user) {
        const profile = await Politician.findOne({ user }, (err) => {
            if (err) {
                console.error(err);
            }
        });

        return profile;
    }

    async getManyByUserId(users) {
        console.log('USERS: ', users);
        const profiles = await Politician.find({ user: { $in: users } }, (err) => {
            if (err) console.log(err);
        }).select(['_id', 'user', 'firstname', 'lastname', 'profilePhoto', 'party']);
        console.log('PROFILES: ', profiles);
        return profiles;
    }

    async modifyOne(profile, data) {
        const toParse = ['education', 'interviews', 'programme', 'team'];

        for (const [key, value] of Object.entries(data)) {
            if (toParse.includes(key)) {
                profile[key] = JSON.parse(value);
            } else {
                profile[key] = value;
            }
        }

        await profile.save((err) => {
            if (err) {
                if (err.errmsg) {
                    console.log(err.errmsg);
                } else {
                    console.log(err);
                }
            }
        });

        return profile;
    }

    async deleteOne(_id) {
        return await Politician.findByIdAndDelete(_id);
    }

    async search(query) {
        const acceptableQueries = ['name', 'city', 'ids'];
        let badQuery = true;
        for (let key of Object.keys(query)) {
            if (acceptableQueries.includes(key.toLowerCase())) {
                badQuery = false;
            }
        }

        if (badQuery) {
            return `Bad query. Acceptable query items are: [${acceptableQueries}]`;
        }

        const regexName = new RegExp(validate.escapeRegex(query.name), 'gi');
        const regexCity = new RegExp(validate.escapeRegex(query.city), 'gi');

        return await Politician.find(
            {
                $and: [
                    query.name ? { $or: [{ firstname: regexName }, { lastname: regexName }] } : {},
                    query.city ? { city: regexCity } : {},
                    query.ids ? { _id: { $in: query.ids.split(',').map((id) => mongoose.Types.ObjectId(id)) } } : {},
                ],
            },
            (err) => {
                if (err) {
                    console.error(err);
                }
            }
        );
    }

    async like(profile) {
        profile.likes = profile.likes + 1;
        return await profile.save();
    }

    async dislike(profile) {
        if (profile.likes > 0) {
            profile.likes = profile.likes - 1;
        }
        return await profile.save();
    }

    async follow(profile) {
        profile.followers = profile.followers + 1;
        return await profile.save();
    }

    async unfollow(profile) {
        if (profile.followers > 0) {
            profile.followers = profile.followers - 1;
        }
        return await profile.save();
    }

    async likeAndFollow(profile) {
        profile.likes = profile.likes + 1;
        profile.followers = profile.followers + 1;
        return await profile.save();
    }
}

module.exports = new PoliticianProfile();
