import React from 'react';
import './ProfilePlaceholder.scss';

const ProfilePlaceholder = (props) => {
    const { edit, placeholder } = props;
    return (
        <div className="ProfilePlaceholder" onClick={edit}>
            <h2>{placeholder}</h2>
        </div>
    );
};

export default ProfilePlaceholder;
