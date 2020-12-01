import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import AddButton from './AddButton';
import SimpleCard from '../../components/common/SimpleCard';
import AddTeamMember from './AddTeamMember';
import DeleteTeamMember from './DeleteTeamMember';
import './Container.scss';
import './Team.scss';

const Team = props => {
  const { politicianProfile, profileOwner } = props;
  const { team } = politicianProfile;
  const { teamInfo } = useSelector(state => state.politicianProfile);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const [hasTeam, setHasTeam] = useState(false);
  const [deleteMember, setDeleteMember] = useState(undefined);

  useEffect(() => {
    if (!team && !Array.isArray(team)) {
      setHasTeam(false);
    } else if (!team.length || !teamInfo.length) {
      setHasTeam(false);
    } else {
      setHasTeam(true);
    };
  }, [team, teamInfo]);
  
  return (
    <div className="Container Team">
      {profileOwner ? <AddButton add={() => setModalShow(true)} /> : ''}
      <AddTeamMember
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <DeleteTeamMember
        show={modalShowDelete}
        onHide={() => setModalShowDelete(false)}
        member={deleteMember}
      />
      <h3 className="main-title">Colistiers</h3>

      <ul className="members">
        {hasTeam
          ? teamInfo.map(member =>
              <li key={member._id}>
                {profileOwner
                  ?  <HighlightOffIcon
                      color="error"
                      className="delete"
                      onClick={() => {
                        setDeleteMember(member);
                        setModalShowDelete(true);
                      }}
                    />
                  : ''}
                <SimpleCard profile={member} />
              </li>)
          : ''}

        {!hasTeam ? <p style={{'color': 'red'}}>No Team Members</p> : ''}
      </ul>
    </div>
  );
};

export default Team;
