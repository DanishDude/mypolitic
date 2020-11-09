import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';

import { 
  fetchDeleteUnregisteredTeamMember,
  fetchUpdatePoliticianProfile,
  fetchUpdateUnregisteredTeam
} from '../../actions/politicianProfile';
import SelectMemberType from './SelectMemberType';
import './AddNewTeamMember.scss';
import AddRegisteredMember from './AddRegisteredMember';
import AddUnregisteredMember from './AddUnregisteredMember';
import TeamMember from './TeamMember';

const AddNewTeamMember = props => {
  const { onHide, politicianProfile, member} = props;
  const dispatch = useDispatch();
  const { form, user } = useSelector(state => state);
  const [selected, setSelected] = useState(member ? true : false);
  const [isRegistered, setIsRegistered] = useState(member ? member._id ? false : true : undefined);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (member && member.user) {
      setSelected(true);
      setIsRegistered(true);
      setShowDelete(true);
    } else if (member && !member.user) {
      setSelected(true);
      setIsRegistered(false);
      setShowDelete(true);
    } else {
      setSelected(false);
      setIsRegistered(undefined);
      setShowDelete(false);
    };
  }, [member]);
  

  const handleSubmit = e => {
    e.preventDefault();
    const { values } = form.editProfile;
    
    if (isRegistered) {
      values.team = values.team
        ? [ ...values.team, values.newMemberEmail ]
        : [values.newMemberEmail];

      delete values.newMemberEmail;
      dispatch(fetchUpdatePoliticianProfile(values, user.token));

    } else if (isRegistered === false) {
      let newMember = {};

      const fields = {
        _id: 'memberId',
        firstname: 'memberFirstname',
        lastname: 'memberlastname',
        party: 'memberparty',
        photo: 'memberPhoto'
      };

      for (const [key, value] of Object.entries(fields)) {
        if (values[value]) {
          newMember[key] = values[value];
          delete values[value];
        }
      };

      dispatch(fetchUpdateUnregisteredTeam(newMember, user.token, politicianProfile._id));
    };
      
    setSelected(false);
    setIsRegistered(undefined);
    onHide();
  };

  const handleDelete = e => {
    e.preventDefault();
    const { values } = form.editProfile;

    if (isRegistered) {
      values.team = values.team.filter(teamMember => {
        return member._id !== teamMember._id;
      });
      dispatch(fetchUpdatePoliticianProfile(values, user.token));

    } else if (isRegistered === false) {
      dispatch(fetchDeleteUnregisteredTeamMember(politicianProfile._id, member._id, user.token));
    };

    setSelected(false);
    setIsRegistered(undefined);
    onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="AddNewTeamMember"
    >
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {member ? 'Editer' : 'Ajouter un(e)'} colistier
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {!selected
            ? <SelectMemberType setIsRegistered={setIsRegistered} setSelected={setSelected} />
            : isRegistered
              ? member 
                ? <div className="edit-member">
                    <TeamMember member={member} />
                  </div>
                : <AddRegisteredMember member={member}/>  // TODO replace with search politician profile
              : <AddUnregisteredMember member={member} profileId={politicianProfile._id} />}
        </Modal.Body>
        
        <Modal.Footer>
            {selected
              ? <div className="back-save-btns">
                  {!member ? 
                    <Button className="back-btn" variant="light" onClick={() => setSelected(false)}>
                      retour
                    </Button> :
                    ''}
                  {showDelete ?
                    <Button className="delete-btn" variant="outline-danger" onClick={handleDelete}>
                      Supprimer
                    </Button> :
                    ''}
                  {!member || !member.user ?
                    <Button className="save-btn" onClick={handleSubmit}>
                      Sauvegarder
                    </Button> :
                    ''}
                </div>
              : ''}
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddNewTeamMember;
