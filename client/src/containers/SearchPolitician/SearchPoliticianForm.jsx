import React from 'react';
import { Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import './SearchPoliticianForm.scss';

const renderField = ({ input, placeholder, type }) => (
    <input {...input} placeholder={placeholder} type={type} />
);

let SearchPoliticianForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  
  return (
    <div className="SearchPoliticianForm">
      <form onSubmit={handleSubmit}>
        <div className="fields">
          <Field
            name="name"
            component={renderField}
            type="text"
            placeholder="Qui: Jacques Dupont"
          />
          <Field
            name="location"
            component={renderField}
            type="text"
            placeholder="Ou: Paris, Pau, Mérignac, ..."
          />
          <div className="search">
            <Button type="submit" disabled={pristine || submitting}>Chercher</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchPoliticianForm = reduxForm({
  form: 'searchPolitician'
})(SearchPoliticianForm);
