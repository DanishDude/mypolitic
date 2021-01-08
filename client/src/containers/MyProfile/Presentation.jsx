import React, { useState, Fragment } from 'react';

import AddButton from './AddButton';
import EditButton from './EditButton';
import EditPresentation from './EditPresentation';
import ProfilePlaceholder from './ProfilePlaceholder';
import './Container.scss';
import './Presentation.scss';

const Presentation = (props) => {
    const { hasProfile, isAdmin, politicianProfile, profileOwner } = props;
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="Container Presentation">
            {(hasProfile && profileOwner) || isAdmin ? (
                <Fragment>
                    {politicianProfile && politicianProfile.presentation ? (
                        <EditButton edit={() => setModalShow(true)} />
                    ) : (
                        <AddButton add={() => setModalShow(true)} />
                    )}
                </Fragment>
            ) : (
                ''
            )}

            <EditPresentation
                onHide={() => setModalShow(false)}
                isAdmin={isAdmin}
                profile={politicianProfile}
                show={modalShow}
            />

            <h3 className="title">Présentation</h3>
            <div className="text">
                {politicianProfile.presentation ? (
                    <p>{politicianProfile.presentation}</p>
                ) : (
                    <ProfilePlaceholder placeholder="Présentez votre profil" edit={() => setModalShow(true)} />
                )}
            </div>
        </div>
    );
};

export default Presentation;
