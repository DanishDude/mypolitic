import React from 'react';
import { Field, reduxForm } from 'redux-form';

import './AddRegisteredMember.scss';

const validate = values => {
  const errors = {};
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!values.email) {
    errors.email = 'Obligatoire';
  } else if (!regex.test(String(values.email).toLowerCase())) {
    errors.email = 'Email invalide';
  };

  return errors;
}

const renderField = ({ input, placeholder, type, meta: { touched, error } }) => (
  <div className="field">
    <input {...input} placeholder={placeholder} type={type} />
    <div className="error-line">
      {touched && (error && <span className="error">{error}</span>)}
    </div>
  </div>
);

let AddRegisteredMember = props => {
  return (
    <div className="AddRegisteredMember">
      <h6>Entrez leur email attaché à leur profil MyPolitic</h6>
      <Field name="_id" component="input" type="hidden" />
      <Field name="newMemberEmail" component={renderField} type="email" />
    </div>
  );
};

export default AddRegisteredMember = reduxForm({
  form: 'editProfile',
  validate
})(AddRegisteredMember);
