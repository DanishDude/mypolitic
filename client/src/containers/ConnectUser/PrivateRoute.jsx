import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginRequired } from '../../actions/user';

const PrivateRoute = ({ component: Component, token, user, ...propsRoute }) => (
  
  <Route
    {...propsRoute}
    render={props => (
      (token !=='' && user !== {})
        ? <Component {...props} />
        : <Redirect 
            to={{
              path: props.history.goBack(),
              state: { from: props.location, msg: 'login required' }
            }}
          />
    )}
  />
);

const mstp = state => {
  return {
    token: state.user.token,
    user: state.user.user,
    error: state.user.error
  };
};

const mdtp = dispatch => bindActionCreators({ loginRequired }, dispatch);

export default connect(mstp, mdtp)(PrivateRoute);
