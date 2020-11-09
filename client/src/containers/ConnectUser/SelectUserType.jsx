import React from 'react';
import './SelectUserType.scss';

const SelectUserType = (props) => {
  const { setUserType } = props;
  return(
    <div className="SelectUserType">
      <div className="select">
        <button onClick={() => setUserType('citizen')}>
          Citoyen(ne)
        </button>
        <button onClick={() => setUserType('politician')}>
          Politicien(ne)
        </button>
      </div>
    </div>
  );
};

export default SelectUserType;
