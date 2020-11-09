import React from 'react';
import SignupButton from '../ConnectUser/SignupButton';
import citizens from '../../assets/citizens.jpg';
import politician from '../../assets/politician.jpg';
import './HowItWorks.scss';

const HowItWorks = () => {
  return (
    <div className="HowItWorks">
      <div className="title">
        <h2>Comment ça marche</h2>
      </div>

      <div className="content">
        <img src={citizens} alt="" />
        <div className="text-box">
          <h4>Le Citoyen</h4>
          <div className="text">
            <ul>
              <li>Recherchez un politicien ou un citoyen engagée partout en france et accedez a son 
                profile (sans inscription)
              </li>
              <li>
                Recherchez un sujet dans votre quartier, ville ou region (sans inscription)
              </li>
              <li>
                Suivez l'actualité, les idées de vos politiciens (inscription obligatoire)
              </li>
              <li>
                Exprimez vour sur une problématique dans votre quartier, ville ou region 
                (inscription obligatoire)
              </li>
            </ul>
          </div>
          <div className="signup-btn">
            <SignupButton label="Inscription"/>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="text-box">
          <h4>Le Politicien ou Citoyen Engagé</h4>
          <div className="text">
            <ul>
              <li>
                Créez votre profile en ligne rapidement et simplement
              </li>
              <li>
                Accédez à votre tableau de bord
              </li>
              <li>
                Profitez de nombreux outils de communication mis à votre disposition
              </li>
              <li>
                Découvrez et suivez les problématiques que rencontre les citoyens dans votre secteur
              </li>
            </ul>
          </div>
          <div className="signup-btn">
            <SignupButton label="Créez un compt"/>
          </div>
        </div>
        <img src={politician} alt="" />
      </div>

    </div>
  );
};

export default HowItWorks;
