import React from 'react';
import { Field, reduxForm } from 'redux-form';
import './Login.scss';

const validate = values => {
  const errors = {};
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!values.email) {
    errors.email = 'Obligatoire';
  } else if (!regex.test(String(values.email).toLowerCase())) {
    errors.email = 'Email invalide';
  };

  if (!values.password) {
    errors.password = 'Obligatoire';
  };

  return errors;
};

const renderField = ({ input, placeholder, type, meta: { touched, error } }) => (
  <div>
    <input {...input} placeholder={placeholder} type={type} />
    <div className="error-line">
      {touched && (error && <span className="error">{error}</span>)}
    </div>
  </div>
);

let Login = props => {
  const { loginError } = props;

  return (
    <div className="Login">
      <div className="content">

        {loginError === 'Email and/or password are incorrect'
          && <span className="login-error">Mot de passe invalide</span>}
        {loginError === 'User not found'
          && <span className="login-error">E-mail introuvable</span>}
        {!loginError && <span className="no-login-error"></span>}

        <div className="item">
          <Field name="email" component={renderField} type="email"  placeholder="Email" />
        </div>
        <div className="item">
          <Field name="password" component={renderField} type="password" placeholder="Mot de passe" />
        </div>
        
      </div>
    </div>
  );
};

export default Login = reduxForm({
  form: 'login',
  validate
})(Login);
