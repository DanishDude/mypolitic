import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUpdatePoliticianProfile } from '../../actions/politicianProfile';
import NonClicableCard from '../../components/common/cards/NonClicableCard';

const DeleteTeamMember = (props) => {
    const { isAdmin, onHide, member } = props;
    const { politician } = useSelector((state) => state.politicians);
    const { politicianProfile } = useSelector((state) => state.politicianProfile);
    const { token } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(undefined);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAdmin) {
            setProfile(politician);
        } else {
            setProfile(politicianProfile);
        }
        return () => setProfile(undefined);
    }, [isAdmin, politician, politicianProfile]);

    const deleteTeamMember = () => {
        profile.team = profile.team.filter((id) => id !== member._id);
        dispatch(fetchUpdatePoliticianProfile(profile, token, isAdmin));
        onHide();
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="DeleteTeamMember"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Confirmation de la suppression</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    <NonClicableCard profile={member} />
                </div>
            </Modal.Body>

            <Modal.Footer>
                <div>
                    <Button color="default" onClick={() => onHide()}>
                        Annuler
                    </Button>
                    <Button color="secondary" onClick={() => deleteTeamMember()}>
                        Supprimer
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteTeamMember;
