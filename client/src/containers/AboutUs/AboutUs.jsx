import React from 'react';
import DiscoverFeatures from '../HomePage/DiscoverFeatures';
import HowItWorks from '../HomePage/HowItWorks';
import image from '../../assets/landscape.jpg';
import './AboutUs.scss';

const AboutUs = () => {
    return (
        <div className="AboutUs">
            <div className="header">
                <img className="bg-image" src={image} alt="landscape" />
                <h1>LA POLITIQUE N'ATTENDS QUE VOUS</h1>
            </div>
            <DiscoverFeatures />
            <HowItWorks />
        </div>
    );
};

export default AboutUs;
