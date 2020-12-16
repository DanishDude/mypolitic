import React from 'react';
import SearchPolitician from '../../components/common/search/SearchPolitician';
import './Header.scss';

const Header = () => {
    return (
        <div className="Header">
            <div className="search-politician">
                <h1>Recherchez votre politicien</h1>
                <SearchPolitician />
            </div>
        </div>
    );
};

export default Header;
