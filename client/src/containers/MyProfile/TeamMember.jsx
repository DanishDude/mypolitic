import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { urlApi } from '../../constant';
import './TeamMember.scss';

const TeamMember = props => {
  const { member, profileId } = props;
  const [imageSrc, setImageSrc] = useState('profile_picture_placeholder.jpg');
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    if (member && member.profilePhoto) {
      setImageSrc(`${urlApi}/politician/${member._id}/profilePhoto`)
    } else if (member && member.photo) {
      setImageSrc(`${urlApi}/politician/${profileId}/unregisteredTeam/${member._id}/photo`)
    };

    if (member.user) {
      setHasProfile(true);
    }
  }, [member, profileId]);

  return (
    <div className="TeamMember">
      <div className="bg-image"></div>
      <img src={imageSrc} alt="" />
      <h5 className="name">{`${member.firstname} ${member.lastname}`}</h5>
      <h6>{member.party}</h6>
      {hasProfile ?
        <Link to={`/politicien/${member._id}`}>
          <span className="see profile">Voir Profile</span>
        </Link> : ''}
    </div>
  );
};

export default TeamMember;
