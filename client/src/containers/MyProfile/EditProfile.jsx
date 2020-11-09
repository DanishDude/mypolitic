import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Field, reduxForm } from 'redux-form';
import { connect, useDispatch, useSelector } from 'react-redux';

import { fetchUpdatePoliticianProfile } from '../../actions/politicianProfile';
import { urlApi } from '../../constant';
import './EditProfile.scss';

const renderField = ({ input, label, placeholder, type, meta: { touched, error } }) => (
  <div className="field">
    <label>{label}</label>
    <input {...input} placeholder={placeholder} type={type} />
    <div className="error-line">
      {touched && (error && <span className="error">{error}</span>)}
    </div>
  </div>
);

let EditProfile = (props) => {
  const { initialValues, onHide } = props;
  const [profilePhotoPreview, setProfilePhotoPreview] = useState("profile_picture_placeholder.jpg");
  const dispatch = useDispatch();
  const { form, user } = useSelector(state => state);

  useEffect(() => {
    if (initialValues && initialValues.profilePhoto) {
      setProfilePhotoPreview(`${urlApi}/politician/${initialValues._id}/profilePhoto`);
    }
  }, [initialValues]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUpdatePoliticianProfile(form.editProfile.values, user.token));
    onHide();
  };

  const adaptFileEventToValue = delegate => e => {
    setProfilePhotoPreview(URL.createObjectURL(e.target.files[0]));
    delegate(e.target.files[0]);
  };
  
  const FileInput = ({
    input: { value: omitValue, onChange, onBlur, ...inputProps }, 
    meta: omitMeta, 
    ...props 
  }) => {
    return (
      <div className="upload-photo-wrapper">
         <input
        id="file-input"
        onChange={adaptFileEventToValue(onChange)}
        onBlur={adaptFileEventToValue(onBlur)}
        type="file"
        {...props.input}
        {...props}
        />
        <label for="file-input" >
         <img src="edit.svg" alt="" />
        </label>
      </div>
    );
  };

  return (
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="EditProfile"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editer profil
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>

      <Modal.Body >
        <div className="header"></div>
        <div className="avatar">
          <img className="avatar-picture" src={profilePhotoPreview} alt="" />
          <Field
            name="profilePhoto"
            component={FileInput}
            type="file"
            accept="image/png, image/jpeg"
          />
        </div>
        
        <div className="form-fields">
          <Field name="_id" component="input" type="hidden" />
          <Field name="firstname" component={renderField} type="text" label="Prénom" />
          <Field name="lastname" component={renderField} type="text" label="Nom" />
          <Field name="city" component={renderField} type="text" label="Ville" />
          <Field name="party" component={renderField} type="text" label="Parti Politique" />
          <Field name="profession" component={renderField} type="text" label="Profession" />
          <Field
            name="dateOfBirth"
            component={renderField}
            type="date"
            label="Date de naissance"
          />
          <Field name="facebook" component={renderField} type="text" label="Lien Profil Facebook" />
          <Field name="instagram" component={renderField} type="text" label="Lien Profil Instagram" />
          <Field name="linkedid" component={renderField} type="text" label="Lien Profil LinkedIn" />
          <Field name="youtube" component={renderField} type="text" label="Lien Profil Youtube" />
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

EditProfile = reduxForm({
  form: 'editProfile',
  enableReinitialize: true
})(EditProfile);

EditProfile = connect(mstp, null)(EditProfile);

export default EditProfile;
