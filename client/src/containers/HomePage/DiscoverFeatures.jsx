import React from 'react';
import SignupButton from '../ConnectUser/SignupButton';
import './DiscoverFeatures.scss';

const DiscoverFeatures = () => {
  
  return (
    <div className="DiscoverFeatures">
      <div className="discover">
        <h2>Découvrez MyPolitic en tant que...</h2>
      </div>

      <div className="discription">

        <div className="citizen">
          <h2>Citoyen</h2>
          <ul>
            <li>
              <span className="expresive-text">Exprimez</span> vous sur une problématique dans vontre 
              ville/région
            </li>
            <li>
              <span className="expresive-text">Suivez</span> des politiciens local et regionaux 
              partout en France
            </li>
            <li>
              <span className="expresive-text">Informez</span> vous sur leur idées et programmes 
              electoral
            </li>
          </ul>
          <SignupButton label="Inscription"/>
        </div>

        <div className="politician">
          <h2>Politicien</h2>
          <ul>
            <li>
              <span className="expresive-text">Profitez</span> d'un espace en line dédié à votre passion
            </li>
            <li>
              <span className="expresive-text">Utilisez</span> des outils moderne pour votre communication
            </li>
            <li>
              <span className="expresive-text">Découvrez</span> les problématiques que rencontre les citoyens
            </li>
          </ul>
          <SignupButton label="Créez un compt" />
        </div>
      </div>
    </div>
  );
};

export default DiscoverFeatures;
