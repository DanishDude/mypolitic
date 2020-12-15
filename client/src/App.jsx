import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutUs from './containers/AboutUs/AboutUs';
import Contact from './containers/Contact/Contact';
import Home from './containers/HomePage/Home';
import MyPoliticians from './containers/MyPoliticiansPage/MyPoliticians';
import MyProfile from './containers/MyProfile/MyProfile';
import NavBar from './components/NavBar';
import Politician from './containers/Politician/Politician';
import PrivateRoute from './containers/ConnectUser/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';
import './App.scss';

function App() {
    const privateRoutes = ['/mon-profil'];
    return (
        <div className="App">
            <NavBar privateRoutes={privateRoutes} />
            <ScrollToTop />
            <Switch>
                <Route path="/politiciens" component={MyPoliticians} />
                <PrivateRoute path="/mon-profil" component={MyProfile} />
                <Route exact path="/" component={Home} />
                <Route path="/a-propos-de-nous" component={AboutUs} />
                <Route path="/contact" component={Contact} />
                <Route path="/politicien/:_id" component={Politician} />
            </Switch>
        </div>
    );
}

export default App;
