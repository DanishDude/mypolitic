import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavbarBrand, NavLink } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import ConnectUser from '../containers/ConnectUser/ConnectUser';
import { userLogout } from '../actions/user';
import logo from '../assets/logo_transparent.png';
import "./NavBar.scss";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn, requestLogin, user, token } = useSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [logoutShow, setLogoutShow] = useState(false);

  const toggle = () => {
    if (window.innerWidth < 992) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(false);
    };
  };

  const login = () => {
    setModalShow(true);
    toggle();
  };

  const logout = () => {
    const privateRoutes = ['/mon-profil'];
    if (privateRoutes.includes(window.location.pathname)) {
      history.push('/');
    };

    setLogoutShow(false);
    toggle();
    dispatch(userLogout());
  };

  useEffect(() => {
    if (token !== '') {
      setLogoutShow(true)
    };

    if (isLoggedIn) {
      setModalShow(false);
    }

    if (requestLogin) {
      setModalShow(true);
    }
  }, [isLoggedIn, requestLogin, token]);
  
  return (
      <Navbar className="NavBar" expand="lg" color="light" light fixed="top">
        <span className="row content">
        <NavbarBrand tag={Link} to="/" className="mr-auto">
          <img src={logo} alt="" />
          <p className="beta">BETA</p>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-2" />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto menu-list" navbar>
            <NavItem className="menu-item">
              <NavLink tag={Link} to="/mes-politiciens" onClick={toggle}>
                Mes Politiciens
              </NavLink>
            </NavItem>

            <NavItem className="menu-item">
              <NavLink tag={Link} to="/mon-profil" onClick={toggle}>
                Mon Profil
              </NavLink>
            </NavItem>

            <NavItem className="menu-item">
              <NavLink tag={Link} to="/a-propos-de-nous" onClick={toggle}>
                My Politic
              </NavLink>
            </NavItem>

            <NavItem className="menu-item">
              <NavLink tag={Link} to="/aide" onClick={toggle}>
                Aide
              </NavLink>
            </NavItem>

            {logoutShow ? 
              <button className="login" onClick={logout}>
                Déconnexion
              </button> :
              <button className="login" onClick={login}>
                Se Connecter
              </button>}
            
            <ConnectUser show={modalShow} user={user} onHide={() => setModalShow(false)} />
          </Nav>
        </Collapse>
        </span>
      </Navbar>
  );
};

export default NavBar;

