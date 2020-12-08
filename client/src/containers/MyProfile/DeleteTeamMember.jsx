import React from 'react';
import { Button } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUpdatePoliticianProfile } from '../../actions/politicianProfile';
import NonClicableCard from '../../components/common/NonClicableCard';

const DeleteTeamMember = (props) => {
    const { onHide, member } = props;
    const { politicianProfile } = useSelector((state) => state.politicianProfile);
    const { token } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const closeModal = () => onHide();

    const deleteTeamMember = () => {
        politicianProfile.team = politicianProfile.team.filter((id) => id !== member._id);
        dispatch(fetchUpdatePoliticianProfile(politicianProfile, token));
        closeModal();
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
                    <Button color="default" onClick={() => closeModal()}>
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
