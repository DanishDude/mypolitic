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
    const { error, politicianProfile } = useSelector((state) => state.politicianProfile);
    const [profileOwner, setProfileOwner] = useState(false);
    const [hasProfile, setHasProfile] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMyPoliticianProfile(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (
            (user.userType === 'politician' && error === `Politician Profile not found for user ${user._id}`) ||
            user._id === politicianProfile.user
        ) {
            setProfileOwner(true);

            if (politicianProfile !== {}) {
                setHasProfile(true);
            } else {
                setHasProfile(false);
            }
        } else {
            setProfileOwner(false);
        }
    }, [user.userType, user._id, error, politicianProfile]);

    return (
        <div className="MyProfile">
            {politicianProfile ? (
                <Fragment>
                    <Profile isAdmin={false} politicianProfile={politicianProfile} profileOwner={profileOwner} />
                    <div className={hasProfile ? '' : 'faded'}>
                        <Presentation
                            isAdmin={false}
                            politicianProfile={politicianProfile}
                            profileOwner={profileOwner}
                            hasProfile={hasProfile}
                        />
                    </div>
                    <div className={hasProfile ? '' : 'faded'}>
                        <Programme
                            isAdmin={false}
                            politicianProfile={politicianProfile}
                            profileOwner={profileOwner}
                            hasProfile={hasProfile}
                        />
                    </div>
                    <div className={hasProfile ? '' : 'faded'}>
                        <Team
                            isAdmin={false}
                            politicianProfile={politicianProfile}
                            profileOwner={profileOwner}
                            hasProfile={hasProfile}
                        />
                    </div>
                </Fragment>
            ) : (
                ''
            )}
        </div>
    );
};

export default MyProfile;
