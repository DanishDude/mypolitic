import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { urlApi } from '../../constant';
import placeholder from '../../assets/profile_picture_placeholder.jpg';
import './TeamMember.scss';

const TeamMember = props => {
  const { member, profileId } = props;
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    if (member && member.profilePhoto) {
      fetch(`${urlApi}/politician/${member._id}/profilePhoto`)
        .then(res => {
          if (res.ok) {
            setImageSrc(`${urlApi}/politician/${member._id}/profilePhoto`);
          } else {
            setImageSrc(placeholder);
          }
        })
        .catch(err => console.log(err));
    } else if (member && member.photo) {
      fetch(`${urlApi}/politician/${profileId}/unregisteredTeam/${member._id}/photo`)
        .then(res => {
          if (res.ok) {
            setImageSrc(`${urlApi}/politician/${profileId}/unregisteredTeam/${member._id}/photo`);
          } else {
            setImageSrc(placeholder);
          }
        })
        .catch(err => console.log(err));
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
