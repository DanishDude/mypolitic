import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import AddButton from './AddButton';
import SimpleCard from '../../components/common/cards/SimpleCard';
import AddTeamMember from './AddTeamMember';
import DeleteTeamMember from './DeleteTeamMember';
import ProfilePlaceholder from './ProfilePlaceholder';
import './Container.scss';
import './Team.scss';

const Team = (props) => {
    const { hasProfile, isAdmin, profileOwner } = props;
    const [modalShow, setModalShow] = useState(false);
    const [modalShowDelete, setModalShowDelete] = useState(false);
    const [deleteMember, setDeleteMember] = useState(null);
    const myTeam = useSelector((state) => state.politicianProfile.teamInfo);
    const anotherTeam = useSelector((state) => state.politicians.politician.teamInfo);
    const teamInfo = profileOwner ? [...myTeam] : [...anotherTeam];

    return (
        <div className="Container Team">
            {(hasProfile && profileOwner) || isAdmin ? <AddButton add={() => setModalShow(true)} /> : ''}
            <AddTeamMember show={modalShow} onHide={() => setModalShow(false)} isAdmin={isAdmin} />
            <DeleteTeamMember
                isAdmin={isAdmin}
                show={modalShowDelete}
                onHide={() => setModalShowDelete(false)}
                member={deleteMember}
            />
            <h3 className="main-title">Colistiers</h3>

            {teamInfo.length ? (
                <ul className="members">
                    {teamInfo.map((member) => {
                        return (
                            <li key={member._id}>
                                {isAdmin || profileOwner ? (
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
                <ProfilePlaceholder placeholder="Ajouter vous Colistiers" edit={() => setModalShow(true)} />
            )}
        </div>
    );
};

export default Team;
