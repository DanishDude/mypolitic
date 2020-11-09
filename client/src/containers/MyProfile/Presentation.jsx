import React, { useState, Fragment } from 'react';

import AddButton from './AddButton';
import EditButton from './EditButton';
import EditPresentation from './EditPresentation';
import './Container.scss';
import './Presentation.scss';

const Presentation = props => {
  const { politicianProfile, profileOwner } = props;
  const [modalShow, setModalShow] = useState(false);
  
  return (
    <div className="Container Presentation">
      {profileOwner
        ? <Fragment>
            {politicianProfile && politicianProfile.presentation
              ? <EditButton edit={() => setModalShow(true)} />
              : <AddButton add={() => setModalShow(true)} />}
          </Fragment>
        : ''}
      

      <EditPresentation onHide={() => setModalShow(false)} show={modalShow} />
      
      <h3 className="title">Présentation</h3>
      <div className="text">
        {politicianProfile.presentation
          ? <p>{politicianProfile.presentation}</p>
          : <p className="no-presentation">Présentez votre profil</p>}
      </div>
    </div>
  );
};

export default Presentation;
