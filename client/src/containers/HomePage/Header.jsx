import React from 'react';
import SearchPolitician from '../../components/common/search/SearchPolitician';
import slogan from '../../assets/logoSlogan.png';
import './Header.scss';

const Header = () => {
    return (
        <div className="Header">
            <img src={slogan} alt="slogan" />
            <div className="search-politician">
                <h1>Recherchez votre politicien</h1>
                <SearchPolitician />
            </div>
        </div>
    );
};

export default Header;
