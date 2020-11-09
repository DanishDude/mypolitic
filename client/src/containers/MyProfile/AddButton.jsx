import React from 'react';
import './AddButton.scss';
import plusIcon from '../../assets/plus.svg';

const AddButton = (props) => {
  const { altStyle, add } = props
  return (
    <div className="AddButton" style={altStyle} onClick={() => add()}>
      <img src={plusIcon} alt=""/>
    </div>
  );
};

export default AddButton;
