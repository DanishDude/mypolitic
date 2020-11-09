import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Help from './containers/Help/Help';
import Home from './containers/HomePage/Home';
import AboutUs from './containers/AboutUs/AboutUs';
import MyPoliticians from './containers/MyPoliticiansPage/MyPoliticians';
import MyProfile from './containers/MyProfile/MyProfile';
import Politician from './containers/Politician/Politician';
import PrivateRoute from './containers/ConnectUser/PrivateRoute';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/a-propos-de-nous' component={AboutUs} />
        <Route path='/aide' component={Help} />
        <Route path='/mes-politiciens' component={MyPoliticians} />
        <Route path='/politicien/:_id' component={Politician} />
        <PrivateRoute path='/mon-profil' component={MyProfile} />
      </Switch>
    </div>
  );
};

export default App;
