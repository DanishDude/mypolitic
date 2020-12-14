import React from 'react';
import SearchPolitician from '../../components/common/search/SearchPolitician';
import './Header.scss';

const Header = () => {
    return (
        <div className="Header">
            <h1 className="search-title">Recherchez votre politicien</h1>
            <div className="search-politician">
                <SearchPolitician />
            </div>
        </div>
    );
};

export default Header;
