import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUpdatePoliticianProfile } from '../../actions/politicianProfile';
import { clearPoliticianSearchResults } from '../../actions/politicians';
import ListCard from '../../components/common/cards/ListCard';
import NonClicableCard from '../../components/common/cards/NonClicableCard';
import SearchPolitician from '../../components/common/search/SearchPolitician';
import './AddTeamMember.scss';

const AddTeamMember = (props) => {
    const { isAdmin, onHide } = props;
    const { politicianProfile } = useSelector((state) => state.politicianProfile);
    const { politician, searchResults } = useSelector((state) => state.politicians);
    const { token } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(undefined);
    const [member, setMember] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearPoliticianSearchResults());
        if (isAdmin) {
            setProfile(politician);
        } else {
            setProfile(politicianProfile);
        }
        return () => setProfile(undefined);
    }, [dispatch, isAdmin, politician, politicianProfile]);

    const clearMember = () => setMember(null);

    const closeModal = () => {
        clearMember();
        onHide();
    };

    const addTeamMember = () => {
        profile.team.push(member._id);
        dispatch(fetchUpdatePoliticianProfile(profile, token, isAdmin));
        closeModal();
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered className="AddTeamMember">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Ajouter un(e) colistier</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {member ? (
                    <NonClicableCard profile={member} />
                ) : (
                    <div>
                        <SearchPolitician />
                        {searchResults.length ? (
                            <ul className="search-results">
                                {searchResults.map((p) => {
                                    return (
                                        <li key={p._id}>
                                            <ListCard select={() => setMember(p)} profile={p} />
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            ''
                        )}
                    </div>
                )}
            </Modal.Body>

            <Modal.Footer>
                {member ? (
                    <div>
                        <Button color="default" onClick={() => clearMember()}>
                            Retour
                        </Button>
                        <Button color="primary" onClick={() => addTeamMember()}>
                            Ajuter
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button color="default" onClick={() => closeModal()}>
                            Fermer
                        </Button>
                    </div>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default AddTeamMember;
