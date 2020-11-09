import React, { Fragment, useEffect, useState } from 'react';
import facebook from 'super-tiny-icons/images/svg/facebook.svg';
import instagram from 'super-tiny-icons/images/svg/instagram.svg';
import linkedin from 'super-tiny-icons/images/svg/linkedin.svg';
import youtube from 'super-tiny-icons/images/svg/youtube.svg';

import EditButton from './EditButton';
import ProfileEdit from './EditProfile';
import { urlApi } from '../../constant';
import placeholder from '../../assets/profile_picture_placeholder.jpg';
import './Profile.scss';

const Profile = props => {
  const { politicianProfile, profileOwner } = props;
  const [modalShow, setModalShow] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(placeholder);
  const [age, setAge] = useState('');

  useEffect(() => {               // TODO if (already has profilePhoto) setProfilePhoto not invoked after user edit profile
    if (politicianProfile.profilePhoto) {
      setProfilePhoto(`${urlApi}/politician/${politicianProfile._id}/profilePhoto`);
    };

    if (politicianProfile.dateOfBirth) {
      setAge(getAge(politicianProfile.dateOfBirth));
    };
    
  }, [politicianProfile]);

  const getAge = birthDate => {
    return Math.floor((new Date() - new Date(birthDate.substring(0, 10)).getTime()) / 3.15576e+10);
  }

  return (
    <div className="Container Profile">
      {politicianProfile
        ? <Fragment>
        <div className="bg-image"></div>
          <img className="avatar" src={profilePhoto} alt="" />
          
          {profileOwner
          ? <div className="edit-btn">
              <EditButton edit={() => setModalShow(true)}/>
              <ProfileEdit onHide={() => setModalShow(false)} show={modalShow} />
            </div> : ''}

          <div className="profile">
            <h2>
              {`${politicianProfile && politicianProfile.firstname
                ? politicianProfile.firstname : 'Prénom'} 
                ${politicianProfile && politicianProfile.lastname
                ? politicianProfile.lastname : 'Nom'}`}
            </h2>
            <h5>{politicianProfile.city}</h5>
            <h5>{politicianProfile.party}</h5>
            <h5>{politicianProfile.profession}</h5>
            <h5>{age !== '' ? `${age} ans` : ''}</h5>
          </div>

          <div className="contact">
            {politicianProfile.facebook
            ? <a href={politicianProfile.facebook} target="_blank" rel="noreferrer">
                <img className="icon" src={facebook} alt=""/>
              </a> :''
            }
            {politicianProfile.instagram
            ? <a href={politicianProfile.instagram} target="_blank" rel="noreferrer">
                <img className="icon" src={instagram} alt=""/>
              </a> : ''
            }
            {politicianProfile.linkedin
            ? <a href={politicianProfile.linkedin} target="_blank" rel="noreferrer">
                <img className="icon" src={linkedin} alt=""/>
              </a> : ''
            }
            {politicianProfile.youtube
            ? <a href={politicianProfile.youtube} target="_blank" rel="noreferrer">
                <img className="icon" src={youtube} alt=""/>
              </a> : ''
            }
          </div></Fragment>
        : <p style={{'coler': 'red'}}>No profile</p>}
    </div>
  )
};

export default Profile;
