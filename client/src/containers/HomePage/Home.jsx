import React, { useEffect } from 'react';
import DiscoverFeatures from './DiscoverFeatures';
import Header from './Header';
import HowItWorks from './HowItWorks';
import slogan from '../../assets/logoSlogan.png';
import './Home.scss';

const Home = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="Home">
            <Header />
            <div>
                <img src={slogan} alt="slogan" />
            </div>
            <DiscoverFeatures />
            <HowItWorks />
        </div>
    );
};

export default Home;
