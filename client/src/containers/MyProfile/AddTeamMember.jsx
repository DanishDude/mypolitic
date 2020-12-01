import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUpdatePoliticianProfile } from '../../actions/politicianProfile';
import { clearPoliticianSearchResults } from '../../actions/politicians';
import ListCard from '../../components/common/ListCard';
import NonClicableCard from '../../components/common/NonClicableCard';
import SearchPolitician from '../SearchPolitician/SearchPolitician';
import './AddTeamMember.scss';


const AddTeamMember = props => {
  const { onHide } = props;
  const { politicianProfile } = useSelector(state => state.politicianProfile);
  const { searchResults } = useSelector(state => state.politicians);
  const { token } = useSelector(state => state.user);
  const [member, setMember] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearPoliticianSearchResults());
  }, [dispatch]);
  
  const clearMember = () => setMember(undefined);

  const closeModal = () => {
    clearMember();
    onHide();
  }

  const addTeamMember = () => {
    politicianProfile.team.push(member._id);
    dispatch(fetchUpdatePoliticianProfile(politicianProfile, token));
    closeModal();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="AddTeamMember"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ajouter un(e) colistier
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {member
          ? <NonClicableCard profile={member} />
          : <div>
              <SearchPolitician />
              {searchResults.length ?
                <ul className="search-results">
                  {searchResults.map(politcian => {
                    return (
                      <li key={politcian._id}>
                        <ListCard
                          select={() => setMember(politcian)}
                          profile={politcian}
                        />
                      </li>
                  )})}
                </ul> : ''}
            </div>}
      </Modal.Body>

      <Modal.Footer>
        {member ?
          <div>
            <Button color="default" onClick={() => clearMember()}>Retour</Button>
            <Button color="primary" onClick={() => addTeamMember()}>Ajuter</Button>
          </div> :
          <div>
            <Button color="default" onClick={() => closeModal()}>Fermer</Button>
          </div>}
      </Modal.Footer>
    </Modal>
  );
};

export default AddTeamMember;
