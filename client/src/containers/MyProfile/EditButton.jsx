import React from 'react';
import './EditButton.scss';

const EditButton = (props) => {
  const { altStyle, edit } = props
  return (
    <div className="EditButton" style={altStyle} onClick={() => edit()}>
      <img src="edit.svg" alt=""/>
    </div>
  );
};

export default EditButton;
