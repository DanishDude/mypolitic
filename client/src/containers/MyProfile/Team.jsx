import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import AddButton from './AddButton';
import SimpleCard from '../../components/common/SimpleCard';
import AddTeamMember from './AddTeamMember';
import DeleteTeamMember from './DeleteTeamMember';
import ProfilePlaceholder from './ProfilePlaceholder';
import './Container.scss';
import './Team.scss';

const Team = (props) => {
    const { profileOwner } = props;
    const [modalShow, setModalShow] = useState(false);
    const [modalShowDelete, setModalShowDelete] = useState(false);
    const [deleteMember, setDeleteMember] = useState(null);
    const myTeam = useSelector((state) => state.politicianProfile.teamInfo);
    const anotherTeam = useSelector((state) => state.politicians.politician.teamInfo);
    const teamInfo = profileOwner ? [...myTeam] : [...anotherTeam];

    return (
        <div className="Container Team">
            {profileOwner ? <AddButton add={() => setModalShow(true)} /> : ''}
            <AddTeamMember show={modalShow} onHide={() => setModalShow(false)} />
            <DeleteTeamMember show={modalShowDelete} onHide={() => setModalShowDelete(false)} member={deleteMember} />
            <h3 className="main-title">Colistiers</h3>

            {teamInfo.length ? (
                <ul className="members">
                    {teamInfo.map((member) => {
                        return (
                            <li key={member._id}>
                                {profileOwner ? (
                                    <HighlightOffIcon
                                        color="error"
                                        className="delete"
                                        onClick={() => {
                                            setDeleteMember(member);
                                            setModalShowDelete(true);
                                        }}
                                    />
                                ) : (
                                    ''
                                )}
                                <SimpleCard profile={member} />
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <ProfilePlaceholder placeholder="Ajouter vous Colistiers" />
            )}
        </div>
    );
};

export default Team;
