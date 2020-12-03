import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMyPoliticianProfile } from '../../actions/politicianProfile';
import Presentation from './Presentation';
import Profile from './Profile';
import Programme from './Programme';
import Team from './Team';
import './MyProfile.scss';

const MyProfile = () => {
  const { user, token } = useSelector((state) => state.user);
  const { error, politicianProfile } = useSelector((state) => state.politicianProfile); // TODO handle loading
  const [profileOwner, setProfileOwner] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const dispatch = useDispatch();
  const faded = hasProfile ? '' : 'faded';

  useEffect(() => dispatch(fetchMyPoliticianProfile(token)), [dispatch, token]);

  useEffect(() => {
    if (
      (user.userType === 'politician' && error === `Politician Profile not found for user ${user._id}`) ||
      user._id === politicianProfile.user
    ) {
      setProfileOwner(true);
    }

    if (politicianProfile._id) {
      setHasProfile(true);
    }
  }, [error, politicianProfile, token, user]);

  return (
    <div className="MyProfile">
      {politicianProfile ? (
        <Fragment>
          <Profile politicianProfile={politicianProfile} profileOwner={profileOwner} />
          <div className={faded}>
            <Presentation politicianProfile={politicianProfile} profileOwner={profileOwner} />
          </div>
          <div className={faded}>
            <Programme politicianProfile={politicianProfile} profileOwner={profileOwner} />
          </div>
          <div className={faded}>
            <Team politicianProfile={politicianProfile} profileOwner={profileOwner} />
          </div>
        </Fragment>
      ) : (
        ''
      )}
    </div>
  );
};

export default MyProfile;
