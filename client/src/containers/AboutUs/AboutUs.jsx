import React from 'react';
import DiscoverFeatures from '../HomePage/DiscoverFeatures';
import HowItWorks from '../HomePage/HowItWorks';
import image from '../../assets/landscape.jpg';
import './AboutUs.scss';

const AboutUs = () => {
    return (
        <div className="AboutUs">
            <div className="header">
                <img src={image} alt="landscape" />
                <h1>Engagez-vous avec les politiciens autour de vous</h1>
            </div>
            <DiscoverFeatures />
            <HowItWorks />
        </div>
    );
};

export default AboutUs;
