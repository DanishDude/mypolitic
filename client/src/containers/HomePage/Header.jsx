import React from 'react';
import SearchPolitician from './SearchPolitician';
import './Header.scss';

const Header = () => {
  return (
    <div className="Header">
      <h1 className="search-title">Recherchez votre politicien</h1>
      <SearchPolitician />
    </div>
  );
};

export default Header;
