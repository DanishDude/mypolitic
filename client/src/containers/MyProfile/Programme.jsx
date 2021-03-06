import React, { useState } from 'react';

import AddButton from './AddButton';
import EditButton from './EditButton';
import EditProgramme from './EditProgramme';
import ProfilePlaceholder from './ProfilePlaceholder';
import './Container.scss';
import './Programme.scss';

const Programme = (props) => {
    const { hasProfile, isAdmin, politicianProfile, profileOwner } = props;
    const [modalShow, setModalShow] = useState(false);
    const [programme, setProgramme] = useState(undefined);

    const altStyle = {
        margin: '-5px -5px 0 0',
        height: '35px',
        width: '35px',
        'border-radius': '18px',
    };

    return (
        <div className="Container Programme">
            {(hasProfile && profileOwner) || isAdmin ? <AddButton add={() => setModalShow(true)} /> : ''}
            <EditProgramme
                isAdmin={isAdmin}
                onHide={() => {
                    setModalShow(false);
                    setProgramme(undefined);
                }}
                programmeItem={programme}
                show={modalShow}
            />

            <h3 className="main-title">Programme</h3>

            {politicianProfile.programme &&
            politicianProfile.programme.length > 0 &&
            Array.isArray(politicianProfile.programme) ? (
                <ul>
                    {politicianProfile.programme.map((prog) => (
                        <li key={prog._id}>
                            {profileOwner || isAdmin ? (
                                <EditButton
                                    altStyle={altStyle}
                                    edit={() => {
                                        setModalShow(true);
                                        setProgramme(prog);
                                    }}
                                />
                            ) : (
                                ''
                            )}
                            <div key={prog._id} className="programme">
                                <h5 className="title">
                                    {prog.category === 'custom' ? prog.customCategory : prog.category}
                                </h5>
                                <div className="text">{prog.description}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <ProfilePlaceholder placeholder="Ajoutez votre programme" edit={() => setModalShow(true)} />
            )}
        </div>
    );
};

export default Programme;
