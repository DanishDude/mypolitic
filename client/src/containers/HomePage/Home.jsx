import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DiscoverFeatures from './DiscoverFeatures';
import Header from './Header';
import HowItWorks from './HowItWorks';
import './Home.scss';

const Home = (props) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="Home">
      <Header />
      <DiscoverFeatures />
      <HowItWorks />
    </div>
  );
};

export default Home;
