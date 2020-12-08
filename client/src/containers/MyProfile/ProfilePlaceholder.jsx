import React from 'react';
import './ProfilePlaceholder.scss';

const ProfilePlaceholder = (props) => {
    const { placeholder } = props;
    return (
        <div className="ProfilePlaceholder">
            <h2>{placeholder}</h2>
        </div>
    );
};

export default ProfilePlaceholder;
