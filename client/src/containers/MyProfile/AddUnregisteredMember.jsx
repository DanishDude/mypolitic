import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { urlApi } from '../../constant';
import './AddUnregisteredMember.scss';
import placeholder from '../../assets/profile_picture_placeholder.jpg';
import editIcon from '../../assets/edit.svg';

const validate = values => {
  const errors = {};

  return errors;
}

const renderField = ({ input, label, placeholder, type, meta: { touched, error } }) => (
  <div className="field">
    <label>{label}</label>
    <input {...input} placeholder={placeholder} type={type} />
    <div className="error-line">
      {touched && (error && <span className="error">{error}</span>)}
    </div>
  </div>
);



let AddUnregisteredMember = props => {
  const { initialValues, member, profileId } = props;
  const [photoPreview, setPhotoPreview] = useState(placeholder);
  
  useEffect(() => {
    if (initialValues && initialValues.memberPhoto) {
      setPhotoPreview(`${urlApi}/politician/${profileId}/unregisteredTeam/${member._id}/photo`);
    };
  }, [initialValues, member._id, profileId]);

  const adaptFileEventToValue = delegate => e => {
    setPhotoPreview(URL.createObjectURL(e.target.files[0]));
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
         <img src={editIcon} alt="" />
        </label>
      </div>
    );
  };

  return (
    <div className="AddUnregisteredMember">
      <div className="header"></div>
        <div className="avatar">
          <img className="avatar-picture" src={photoPreview} alt="" />
          <Field
            name="memberPhoto"
            component={FileInput}
            type="file"
            accept="image/png, image/jpeg"
          />
        </div>
        
      <div className=" fields">
        <Field name="memberId" component="input" type="hidden" />
        <Field name="memberFirstname" component={renderField} type="text" label="Prénom" />
        <Field name="memberlastname" component={renderField} type="text" label="Nom" />
        <Field name="memberparty" component={renderField} type="text" label="Parti Politique" />
      </div>
    </div>
  );
};

const mstp = (state, member) => {
  if (member.member) {
    return {
      initialValues: {
        memberId: member.member._id,
        memberFirstname: member.member.firstname,
        memberlastname: member.member.lastname,
        memberparty: member.member.party,
        memberPhoto: member.member.photo
      }
    };

  };
};

AddUnregisteredMember = reduxForm({
  form: 'editProfile',
  enableReinitialize: true,
  validate
})(AddUnregisteredMember);

AddUnregisteredMember = connect(mstp, null)(AddUnregisteredMember);

export default AddUnregisteredMember;
