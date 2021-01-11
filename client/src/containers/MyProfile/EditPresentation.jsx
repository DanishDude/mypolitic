import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Field, reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';

import { required, maxLength2000 } from '../../components/forms/formValidation';
import { fetchUpdatePoliticianProfile } from '../../actions/politicianProfile';
import './EditPresentation.scss';

const renderField = ({ id, input, placeholder, type, meta: { touched, error } }) => (
    <div className="field">
        <textarea id={id} {...input} placeholder={placeholder} type={type} />
        <div className="error-line">{touched && error && <span className="error">{error}</span>}</div>
    </div>
);

let EditPresentation = (props) => {
    const { isAdmin, pristine, onHide, submitting } = props;
    const dispatch = useDispatch();
    const { form, user } = useSelector((state) => state);
    const maxChar = 2000;
    const [count, setCount] = useState(maxChar);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchUpdatePoliticianProfile(form.editProfile.values, user.token, isAdmin));
        onHide();
    };

    const maxCharacters = (value) => {
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
                <Modal.Title id="contained-modal-title-vcenter">Editer Presentation</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Field name="_id" component="input" type="hidden" />
                    <Field
                        id="presentation"
                        name="presentation"
                        component={renderField}
                        type="textarea"
                        placeholder="Présentez-vous..."
                        normalize={maxCharacters}
                        validate={[required, maxLength2000]}
                    />
                    <div className="count-wrapper">
                        <p className="character-count">
                            {count}/{maxChar}
                        </p>
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

export default reduxForm({
    form: 'editProfile',
})(EditPresentation);
