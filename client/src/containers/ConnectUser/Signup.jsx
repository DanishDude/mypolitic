import React from 'react';
import { Field, reduxForm} from 'redux-form';
import './Signup.scss'

const validate = values => {
  const errors = {};
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!values.email) {
    errors.email = 'Obligatoire';
  } else if (!regex.test(String(values.email).toLowerCase())) {
    errors.email = 'Invalid email';
  };

  if (!values.password) {
    errors.password = 'Obligatoire';
  };

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'les mots de passe doivent correspondre'
  }

  return errors;
}

const renderField = ({ input, placeholder, type, meta: { touched, error } }) => (
  <div>
    <input {...input} placeholder={placeholder} type={type} />
    <div className="error-line">
      {touched && (error && <span className="error">{error}</span>)}
    </div>
  </div>
);

let Signup = props => {
  const { initialValues, signupError } = props;

  return (
    <div className="Signup">
      <div className="content">

        {signupError === 'Email already exists.'
          && <span className="signup-error">Email déjà enregistré</span>}
        {!signupError && <span className="no-signup-error"></span>}
        
        <div className="item">
          <Field name="email" component={renderField} type="email" placeholder="Email" />
        </div>
        <div className="item">
          <Field
            name="password"
            component={renderField}
            type="password"
            placeholder="Mot de passe"
          />
        </div>
        <div className="item">
          <Field
            name="confirmPassword"
            component={renderField}
            type="password"
            placeholder="Confirmez le mot de passe"
          />
        </div>
          <Field name="userType" component="input" type="hidden" value={initialValues} />
      </div>
    </div>
  );
};

export default Signup = reduxForm({
  form: 'signup',
  validate
})(Signup);
