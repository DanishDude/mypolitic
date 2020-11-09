import React from 'react';
import './SelectMemberType.scss'

const SelectMemberType = props => {
  const { setSelected, setIsRegistered } = props;
  return (
    <div className="SelectMemberType">
      <h6>Ont-ils un profil sur MyPolitic, type?</h6>
      <div className="select-btns">
        <button onClick={() => {setIsRegistered(true); setSelected(true)}}>
          Oui
        </button>
        <button onClick={() => {setIsRegistered(false); setSelected(true)}}>
          Non
        </button>
      </div>
    </div>
  );
};

export default SelectMemberType
