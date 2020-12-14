import React from 'react';
import DiscoverFeatures from '../HomePage/DiscoverFeatures';
import HowItWorks from '../HomePage/HowItWorks';
import image from '../../assets/paris.jpg';
import './AboutUs.scss';

const AboutUs = () => {
    return (
        <div className="AboutUs">
            <img src={image} alt="landscape" />
            <DiscoverFeatures />
            <HowItWorks />
        </div>
    );
};

export default AboutUs;
