import React, { useEffect, useState } from 'react';

import AddButton from './AddButton';
import EditButton from './EditButton';
import TeamMember from './TeamMember';
import './Container.scss';
import './Team.scss';
import AddNewTeamMember from './AddNewTeamMember';

const Team = props => {
  const { politicianProfile, profileOwner } = props;
  const { team, unregisteredTeam } = politicianProfile;
  const [modalShow, setModalShow] = useState(false);
  const [hasTeam, setHasTeam] = useState(false);
  const [hasUnregisteredTeam, setHasUnregisteredTeam] = useState(false);
  const [editMember, setEditMember] = useState(null);

  useEffect(() => {
    if (!team && !Array.isArray(team)) {
      setHasTeam(false);
    } else if (team.length === 0) {
      setHasTeam(false);
    } else {
      setHasTeam(true);
    };
    
    if (!unregisteredTeam && !Array.isArray(unregisteredTeam)) {
      setHasUnregisteredTeam(false)
    } else if (unregisteredTeam.length === 0) {
      setHasUnregisteredTeam(false);
    } else {
      setHasUnregisteredTeam(true);
    };
  }, [team, unregisteredTeam]);
  
  return (
    <div className="Container Team">
      {profileOwner ? <AddButton add={() => setModalShow(true)} /> : ''}

      <AddNewTeamMember
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setEditMember(null)}}
        politicianProfile={politicianProfile}
        member={editMember}
      />
      <h3 className="main-title">Colistiers</h3>

      <ul className="members">
        {/* TODO TeamMember OnClick => go to profile */}
        {hasTeam
          ? team.map(member =>
              <li key={member._id}>

                {profileOwner
                ? <EditButton 
                    altStyle={{ 'margin-top': '-8px' }}
                    edit={() => {
                      setEditMember(member);
                      setModalShow(true);
                    }} />
                : ''}

                <TeamMember member={member} />
              </li>)
          : ''}
        
        {hasUnregisteredTeam
          ? unregisteredTeam.map(member =>
              <li key={member._id}>

                {profileOwner
                ? <EditButton 
                    altStyle={{ 'margin-top': '-8px' }}
                    edit={() => {
                      setEditMember(member);
                      setModalShow(true);
                    }} />
                : ''}

                <TeamMember member={member} profileId={politicianProfile._id} />
              </li>)
          : ''}

        {!hasTeam && !hasUnregisteredTeam ? <p style={{'color': 'red'}}>No Team Members</p> : ''}
      </ul>
    </div>
  );
};

export default Team;
