import React from 'react';
import './AddButton.scss';

const AddButton = (props) => {
  const { altStyle, add } = props
  return (
    <div className="AddButton" style={altStyle} onClick={() => add()}>
      <img src="plus.svg" alt=""/>
    </div>
  );
};

export default AddButton;
