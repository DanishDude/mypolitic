const { Router } = require('express');

const router = Router();
const passportManager = require('../services/passport');
const politicianProfile = require('../services/politician');
const uploadFile = require('../services/upload');

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
      
      const teamInfo = await politicianProfile.getManyByUserId(profile.team);
      if (teamInfo.length > 0) profile['_doc'].team = teamInfo;
      
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

router.route('/:profileId')
  .get(async (req, res, next) => {
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

  router.post('/:profileId/unregisteredTeam',
    passportManager.authenticate,
    uploadFile.unregisteredMemberPhoto,
    async (req, res, next) => {
    try {
      const { profileId } = req.params;
      const { _id, userType } = req.user;

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
          req.body.photo = req.file.path;
        }

        const modifiedProfile = await politicianProfile.addUnregisteredTeamMember(profile, req.body);
        
        return res.status(200).send({
          success: true,
          msg: `Modified unregistered team for profile with _id ${modifiedProfile._id}`,
          modifiedProfile
        });
      }
    } catch (err) {
      next(err)
    }
  });

  router.route('/:profileId/unregisteredTeam/:memberId')
    .put(passportManager.authenticate, uploadFile.unregisteredMemberPhoto, async (req, res, next) => {
      try {
        const { profileId, memberId } = req.params;
        const { _id, userType } = req.user;

        if (userType !== 'politician') {
          return res.status(403).send({
            success: false,
            msg: `not allowed for userType ${userType}`
          });
        };

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
          
        } else if (!profile.unregisteredTeam || !profile.unregisteredTeam
          .map(member => member._id.toString())
          .includes(memberId.toString())) {
            
            return res.status(400).send({
              success: false,
              msg:  `Unregistered member not found with _id ${memberId}`
            });
            
        } else {
          if (req.file) {
            req.body.photo = req.file.path;
            memberPhoto = profile.unregisteredTeam.filter(member => member._id.toString() === memberId.toString())[0].photo;
            if (memberPhoto) {
              uploadFile.deleteCloudinaryResource(memberPhoto);
            }
          }
      
          const modifiedProfile = await politicianProfile
            .updateUnregisteredTeamMember(profile, { ...req.body, _id: memberId });
          
          return res.status(200).send({
            success: true,
            msg: `Modified unregistered team for profile with _id ${modifiedProfile._id}`,
            modifiedProfile
          });
        }

      } catch(err) {
        next(err);
      }
    })
    .delete(passportManager.authenticate, async (req, res, next) => {   // TODO if (member.photo) => delete photo from server
      try {
        const { profileId, memberId } = req.params;
        const { _id, userType } = req.user;

        if (userType !== 'politician') {
          return res.status(403).send({
            success: false,
            msg: `not allowed for userType ${userType}`
          });
        };

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
          
        } else if (!profile.unregisteredTeam
          || !profile.unregisteredTeam
          .map(member => member._id.toString())
          .includes(memberId.toString())) {
            
            return res.status(400).send({
              success: false,
              msg:  `Unregistered member not found with _id ${memberId}`
            });
            
        } else {
          memberPhoto = profile.unregisteredTeam
            .filter(member => member._id.toString() === memberId.toString())[0].photo;
          if (memberPhoto) {
            uploadFile.deleteCloudinaryResource(memberPhoto);
          }
          
          const modifiedProfile = await politicianProfile.deleteUnregisteredTeamMember(profile, memberId);
          return res.status(200).send({
            success: true,
            msg: `Modified unregistered team for profile with _id ${modifiedProfile._id}`,
            modifiedProfile
          });
        }
      } catch(err) {
        next(err);
      }
    });

module.exports = router;
