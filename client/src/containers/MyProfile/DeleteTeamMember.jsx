import React, { useEffect, useState } from 'react';
import { Button, CardActions } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUpdatePoliticianProfile } from '../../actions/politicianProfile';
import { clearPoliticianSearchResults } from '../../actions/politicians';
import ListCard from '../../components/common/ListCard';
import NonClicableCard from '../../components/common/NonClicableCard';
import SearchPolitician from '../SearchPolitician/SearchPolitician';


const DeleteTeamMember = props => {
  const { onHide, member } = props;
  const { politicianProfile } = useSelector(state => state.politicianProfile);
  const { token } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const closeModal = () => onHide();

  const deleteTeamMember = () => {
    console.log(member._id);
    console.log('before: ', politicianProfile.team);
    politicianProfile.team = politicianProfile.team.filter(id => id !== member._id);
    console.log('after: ', politicianProfile.team);
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
        <Modal.Title id="contained-modal-title-vcenter">
            Confirmation de la suppression
          </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <div>

        <NonClicableCard profile={member} />
        </div>
      </Modal.Body>

      <Modal.Footer>
          <div>
            <Button color="default" onClick={() => closeModal()}>Annuler</Button>
            <Button color="secondary" onClick={() => deleteTeamMember()}>Supprimer</Button>
          </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTeamMember;