const { Router } = require('express');
const router = Router();

const passportManager = require('../services/passport');
const { follow } = require('../services/politician');
const politician = require('../services/politician');
const politicianProfile = require('../services/politician');
const uploadFile = require('../services/upload');
const user = require('../services/user');

router.route('/')
  .post(passportManager.authenticate, uploadFile.profilePhoto, async (req, res, next) => {
    try {
      const { _id, userType } = req.user;
      
      if (userType !== 'politician')
        return res.status(403).send({
          success: false,
          msg: `not allowed for userType ${userType}`
        });

      const hasProfile = await politicianProfile.getOneByUserId(_id);
      if (hasProfile) {
        return res.status(400).send({
          success: false,
          msg : `user ${_id} already has a profile with _id ${hasProfile._id}`
        });
      }

      if (req.file) {
        req.body.profilePhoto = req.file.path;
      }
      const newProfile = await politicianProfile.createOne(_id, req.body);
      
      return res.status(200).send({
        success: true,
        msg: 'New politician profile created',
        newProfile
      });
    } catch (err) {
      next(err);
    };
  })
  .get(passportManager.authenticate, async (req, res, next) => {
    try {
      const { _id, userType } = req.user;

      if (userType !== 'politician')
        return res.status(403).send({
          success: false,
          msg: `not allowed for userType ${userType}. 
          Use route "/api/${userType}" to get a profile`
        });

      const profile = await politicianProfile.getOneByUserId(_id);

      if (!profile) {
        return res.status(400).send({
          success: false,
          msg: `Politician Profile not found for user ${_id}`,
        });
      };

      return res.status(200).send({
        success: true,
        msg: `Politician Profile for user ${_id}`,
        profile
      });
    } catch (err) {
      next(err);
    }
  });

router.get('/profile', async (req, res, next) => {
  try {
    const { name, city } = req.query;
    
    if (name || city) {
      const profiles = await politicianProfile.search(name || null, city || null);
      
      res.status(200).send(profiles);
    } else {
      res.status(400).send('no query sent for "name" or "city"');
    };

  } catch(err) {
    next(err);
  };
});

router.get('/search', async (req, res, next) => {
  try {
    const profiles = await politicianProfile.search(req.query);

    if (!profiles || typeof profiles === 'string') {
      res.status(400).send({
        success: false,
        msg: profiles
      });
    }

    res.status(200).send({
      success: true,
      msg: `profiles found: ${profiles.length}`,
      profiles
    });
  } catch (err) {
    next(err);
  }
});

router.route('/:profileId').get(async (req, res, next) => {
  try {
    const { profileId } = req.params;
    const profile = await politicianProfile.getOneById(profileId);

    if (!profile) {
      return res.status(400).send({
        success: false,
        msg:  `Profile not found with _id ${profileId}`
      });
    } else {
      return res.status(200).send({
        success: true,
        msg: `Politician profile with id ${profileId}`,
        profile
      });
    }
    
  } catch(err) {
    next(err);
  }
})
.put(passportManager.authenticate, uploadFile.profilePhoto, async (req, res, next) => {
  try {
    const { _id, userType } = req.user;
    const { profileId } = req.params;

    if (userType !== 'politician')
      return res.status(403).send({
        success: false,
        msg: `not allowed for userType ${userType}`
      });

    const profile = await politicianProfile.getOneById(profileId);

    if (!profile) {
      return res.status(400).send({
        success: false,
        msg:  `Profile not found with _id ${profileId}`
      });

    } else if (profile.user.toString() !== _id.toString()) {
      return res.status(403).send({
        success: false,
        msg: `Not allowed. User ${_id} is not the owner of profile ${profileId}`
      });

    } else {
      if (req.file) {
        req.body.profilePhoto = req.file.path;

        if (profile.profilePhoto) {
          uploadFile.deleteCloudinaryResource(profile.profilePhoto);
        }
      }

      const modifiedProfile = await politicianProfile.modifyOne(profile, req.body);
      return res.status(200).send({
        success: true,
        msg: `Modified profile with _id ${modifiedProfile._id}`,
        modifiedProfile
      });
    }
  } catch (err) {
    next(err);
  };
})
.delete(passportManager.authenticate, async (req, res, next) => {
  try {
    const { profileId } = req.params;
    const { _id } = req.user;
    const profile = await politicianProfile.getOneById(profileId);

    if (!profile) {
      return res.status(400).send({
        success: false,
        msg:  `Profile not found with _id ${profileId}`
      });
    } else if (profile.user.toString() !== _id.toString()) {
      return res.status(403).send({
        success: false,
        msg: `Not allowed. User ${_id} is not the owner of profile ${profileId}`
      });
    } else {
      if (profile.profilePhoto) {
        uploadFile.deleteCloudinaryResource(profile.profilePhoto);
      }

      const result = await politicianProfile.deleteOne(profileId);
      res.status(200).send({
        success: true,
        msg: `Deleted profile with _id ${profileId}`,
        profile: result
      });
    };
  } catch (err) {
    next(err);
  };
});

router.patch('/:profileId/like', passportManager.authenticate, async (req, res, next) => {
  try {
    const { profileId } = req.params;
    let profile = await politicianProfile.getOneById(profileId);
    if (!profile) {
      res.status(400).send({ success: false, msg: `Profile ${profileId}not found` });
    }

    const liked = await user.likePolitician(req.user, profile);
    if (liked) {
      profile = await politician.dislike(profile);
    } else {
      profile = await politician.like(profile);
    }

    res.status(200).send({
      success: true,
      msg: `${liked ? 'disliked' : 'liked'} politician ${profileId}`,
      liked: !liked,
      politician: profile
    })
  } catch (err) {
    next(err);
  }
});

router.patch('/:profileId/follow', passportManager.authenticate, async (req, res, next) => {
  try {
    const { profileId } = req.params;
    let profile = await politicianProfile.getOneById(profileId);
    if (!profile) {
      res.status(400).send({ success: false, msg: `Profile ${profileId}not found` });
    }

    const followed = await user.followPolitician(req.user, profile);
    if (followed) {
      profile = await politician.unfollow(profile);
    } else {
      profile = await politician.follow(profile);
    }

    res.status(200).send({
      success: true,
      msg: `user ${followed ? 'unfollowed' : 'following'} politician ${profileId}`,
      follow: !followed,
      politician: profile
    })
  } catch (err) {
    next(err);
  }
});

module.exports = router;
