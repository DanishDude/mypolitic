
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Field, reduxForm } from 'redux-form';
import { connect, useDispatch, useSelector } from 'react-redux';

import { fetchUpdatePoliticianProfile } from '../../actions/politicianProfile';
import './EditPresentation.scss';

const renderField = ({ id, input, placeholder, type, meta: { touched, error } }) => (
  <div className="field">
    <textarea id={id} {...input} placeholder={placeholder} type={type} />
    <div className="error-line">
      {touched && (error && <span className="error">{error}</span>)}
    </div>
  </div>
);

let EditPresentation = (props) => {
  const { initialValues, onHide } = props;
  const dispatch = useDispatch();
  const { form, user } = useSelector(state => state);
  const maxChar = 2000;
  const [count, setCount] = useState(maxChar);

  useEffect(() => {
    if (initialValues && initialValues.presentation) {
      setCount(maxChar - initialValues.presentation.length);
    }
  }, [initialValues]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUpdatePoliticianProfile(form.editProfile.values, user.token));
    onHide();
  };

  const maxCharacters = value => {
    const newValue = value.substring(0, maxChar);
    setCount(maxChar - newValue.length);
    return newValue;
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="EditPresentation"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editer Presentation
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>

      <Modal.Body >
        <Field name="_id" component="input" type="hidden" />
        <Field
          id="presentation"
          name="presentation"
          component={renderField}
          type="textarea"
          placeholder="Présentez-vous..."
          normalize={maxCharacters}
        />
        <div className="count-wrapper">
          <p className="character-count">{count}/{maxChar}</p>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit">Sauvegarder</Button>
      </Modal.Footer>

      </form>
    </Modal>
  );
};

const mstp = state => {
  return { initialValues: state.politicianProfile.politicianProfile };
}

EditPresentation = reduxForm({
  form: 'editProfile',
  enableReinitialize: true
})(EditPresentation);

EditPresentation = connect(mstp, null)(EditPresentation);

export default EditPresentation;
