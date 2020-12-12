import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Field, reduxForm } from 'redux-form';
import { connect, useDispatch, useSelector } from 'react-redux';

import { fetchUpdatePoliticianProfile } from '../../actions/politicianProfile';
import { required, maxLength } from '../../components/forms/formValidation';
import SearchResults from '../../components/common/SearchResults';
import placeholder from '../../assets/profile_picture_placeholder.jpg';
import editIcon from '../../assets/edit.svg';
import './EditProfile.scss';

const maxLength22 = maxLength(22);

const renderField = ({ input, label, placeholder, type, meta: { touched, error, warning } }) => {
    return (
        <div className="field">
            <label>{label}</label>
            {input.name === 'city' ? (
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
            ) : (
                <input {...input} placeholder={placeholder} type={type} />
            )}
            <div className="error-line">
                {touched && ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
};

let EditProfile = (props) => {
    const { initialValues, pristine, onHide, submitting } = props;
    const [profilePhotoPreview, setProfilePhotoPreview] = useState(placeholder);
    const [cities, setCities] = useState([]);
    const [showCities, setShowCities] = useState(false);
    const dispatch = useDispatch();
    const { form, user } = useSelector((state) => state);

    useEffect(() => {
        if (initialValues && initialValues.profilePhoto) {
            setProfilePhotoPreview(initialValues.profilePhoto);
        } else {
            setProfilePhotoPreview(placeholder);
        }
    }, [initialValues]);

    const citySearch = (city) => {
        const query = city.split(' ').join('+');
        fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}&type=municipality&limit=25`)
            .then((res) => res.json())
            .then((payload) => {
                if (payload.features && payload.features.length) {
                    const cityList = payload.features.map((result) => {
                        const { name, context } = result.properties;
                        const region = context.split(', ');
                        return `${name}, ${region[1]}(${region[0]}), ${region[2]}`;
                    });
                    setCities(cityList);
                    setShowCities(true);
                }
            })
            .catch((err) => console.error(err));
    };

    const selectCity = (city) => {
        form.editProfile.values.city = city.split(', ')[0];
        setShowCities(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.editProfile.syncErrors) {
            dispatch(fetchUpdatePoliticianProfile(form.editProfile.values, user.token));
            onHide();
        }
        return;
    };

    const adaptFileEventToValue = (delegate) => (e) => {
        setProfilePhotoPreview(URL.createObjectURL(e.target.files[0]));
        delegate(e.target.files[0]);
    };

    const FileInput = ({ input: { value: omitValue, onChange, onBlur, ...inputProps }, meta: omitMeta, ...props }) => {
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
                <label for="file-input">
                    <img src={editIcon} alt="" />
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
                <Modal.Title id="contained-modal-title-vcenter">Editer profil</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>
                    <div className="header"></div>
                    <div className="avatar">
                        <img className="avatar-picture" src={profilePhotoPreview} alt="" />
                        <Field name="profilePhoto" component={FileInput} type="file" accept="image/png, image/jpeg" />
                    </div>

                    <div className="form-fields">
                        <Field name="_id" component="input" type="hidden" />
                        <Field
                            name="firstname"
                            component={renderField}
                            type="text"
                            label="Prénom*"
                            validate={[required, maxLength22]}
                        />
                        <Field
                            name="lastname"
                            component={renderField}
                            type="text"
                            label="Nom*"
                            validate={[required, maxLength22]}
                        />
                        <Field
                            name="party"
                            component={renderField}
                            type="text"
                            label="Parti Politique*"
                            validate={[required, maxLength22]}
                        />
                        <Field
                            name="city"
                            component={renderField}
                            type="text"
                            label="Ville*"
                            validate={required}
                            onChange={(event, newValue) => citySearch(newValue)}
                            onFocus={() => {
                                if (cities.length) {
                                    setShowCities(true);
                                }
                            }}
                        />
                        <div className="top-limit">
                            {showCities ? (
                                <div className="cities">
                                    <SearchResults results={cities} select={(city) => selectCity(city)} />
                                </div>
                            ) : (
                                ''
                            )}
                            <Field name="profession" component={renderField} type="text" label="Profession" />
                            <Field name="dateOfBirth" component={renderField} type="date" label="Date de naissance" />
                            <Field name="facebook" component={renderField} type="text" label="Lien Profil Facebook" />
                            <Field name="instagram" component={renderField} type="text" label="Lien Profil Instagram" />
                            <Field name="linkedid" component={renderField} type="text" label="Lien Profil LinkedIn" />
                            <Field name="youtube" component={renderField} type="text" label="Lien Profil Youtube" />
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button type="submit" disabled={pristine || submitting || form.editProfile.syncErrors}>
                        Sauvegarder
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

const mstp = (state) => {
    return { initialValues: state.politicianProfile.politicianProfile };
};

EditProfile = reduxForm({
    form: 'editProfile',
    enableReinitialize: true,
})(EditProfile);

EditProfile = connect(mstp, null)(EditProfile);

export default EditProfile;
