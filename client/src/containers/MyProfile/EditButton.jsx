import React from 'react';
import './EditButton.scss';
import editIcon from '../../assets/edit.svg';

const EditButton = (props) => {
    const { altStyle, edit } = props;
    return (
        <div className="EditButton" style={altStyle} onClick={() => edit()}>
            <img src={editIcon} alt="" />
        </div>
    );
};

export default EditButton;
