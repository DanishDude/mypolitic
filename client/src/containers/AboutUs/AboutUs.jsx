import React from 'react';

const AboutUs = () => {
  return (
    <div className="AboutUs">
      <h1>About Us Page</h1>
      <h3>{ process.env.REACT_APP_API_SERVER }</h3>
    </div>
  );
};

export default AboutUs;
