import React, { useState } from 'react';

import AddButton from './AddButton';
import EditButton from './EditButton';
import EditProgramme from './EditProgramme';
import './Container.scss';
import './Programme.scss';

const Programme = props => {
  const { politicianProfile, profileOwner } = props;
  const [modalShow, setModalShow] = useState(false);
  const [programme, setProgramme ] = useState(undefined);
  
  const altStyle = {
    margin: '-5px -5px 0 0',
    height: '35px',
    width: '35px',
    'border-radius': '18px'
  };
  
  return (
    <div className="Container Programme">
      {profileOwner ? <AddButton add={() => setModalShow(true)} /> : ''}
      <EditProgramme
        programmeItem={programme}
        onHide={() => {
          setModalShow(false);
          setProgramme(undefined);
        }} 
        show={modalShow}
      />

      <h3 className="main-title">Programme</h3>

      {politicianProfile.programme 
        && politicianProfile.programme.length > 0
        && Array.isArray(politicianProfile.programme)
          ? <ul>
              {politicianProfile.programme.map(prog =>
                <li key={prog._id}>
                  {profileOwner
                    ? <EditButton
                      altStyle={altStyle}
                      edit={() => {
                        setModalShow(true);
                        setProgramme(prog)
                      }} /> : ''}
                  <div key={prog._id} className="programme">
                    <h5 className="title">
                      {prog.category === 'custom' ? prog.customCategory : prog.category}
                    </h5>
                    <div className="text">{prog.description}</div>
                  </div>
                </li>
              )}
            </ul>
          : <div style={{'color': 'red'}}>Ajoutez votre programme</div>}
    </div>
  );
};

export default Programme;
