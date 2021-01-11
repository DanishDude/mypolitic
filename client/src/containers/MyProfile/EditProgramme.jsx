import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Field, reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';

import { required, maxLength22, maxLength800 } from '../../components/forms/formValidation';
import { fetchUpdatePoliticianProfile } from '../../actions/politicianProfile';
import './EditProgramme.scss';

const renderField = ({ id, input, placeholder, type, meta: { touched, error } }) => (
    <div className="field">
        {type === 'textarea' ? (
            <textarea id={id} {...input} placeholder={placeholder} type={type} />
        ) : (
            <input id={id} {...input} placeholder={placeholder} type={type} />
        )}
        <div className="error-line">{touched && error && <span className="error">{error}</span>}</div>
    </div>
);

let EditProgramme = (props) => {
    const { isAdmin, onHide, pristine, programmeItem, submitting } = props;
    const dispatch = useDispatch();
    const { form, user } = useSelector((state) => state);
    const maxChar = 800;
    const [count, setCount] = useState(maxChar);
    const [custom, setCustom] = useState(false);

    useEffect(() => {
        if (programmeItem) {
            form.editProfile.values.description = programmeItem.description;
            form.editProfile.values.category = programmeItem.category;
            form.editProfile.values.customCategory = programmeItem.customCategory
                ? programmeItem.customCategory
                : undefined;

            if (programmeItem.category === 'custom') setCustom(true);
        }
    }, [form.editProfile, programmeItem]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { category, customCategory, description } = form.editProfile.values;
        let updateProgramme = form.editProfile.values.programme ? [...form.editProfile.values.programme] : [];

        if (programmeItem) {
            updateProgramme.map((prog) => {
                if (prog._id === programmeItem._id) {
                    prog.category = form.editProfile.values.category;
                    prog.description = form.editProfile.values.description;

                    if (form.editProfile.values.customCategory && form.editProfile.values.customCategory !== '') {
                        prog.customCategory = form.editProfile.values.customCategory;
                    }
                }
                return prog;
            });
        } else {
            if (customCategory !== '') {
                updateProgramme.push({ category, customCategory, description });
            } else {
                updateProgramme.push({ category, description });
            }
        }

        delete form.editProfile.values.category;
        delete form.editProfile.values.customCategory;
        delete form.editProfile.values.description;

        form.editProfile.values.programme = updateProgramme;
        dispatch(fetchUpdatePoliticianProfile(form.editProfile.values, user.token, isAdmin));
        setCustom(false);
        onHide();
    };

    const handleDelete = (e) => {
        e.preventDefault();
        let updateProgramme = [...form.editProfile.values.programme].filter((prog) => prog._id !== programmeItem._id);

        delete form.editProfile.values.category;
        delete form.editProfile.values.customCategory;
        delete form.editProfile.values.description;

        form.editProfile.values.programme = updateProgramme;
        dispatch(fetchUpdatePoliticianProfile(form.editProfile.values, user.token, isAdmin));
        setCustom(false);
        onHide();
    };

    const maxCharacters = (value) => {
        const newValue = value.substring(0, maxChar);
        setCount(maxChar - newValue.length);
        return newValue;
    };

    const isCustom = (e) => {
        if (e.target.value === 'custom') {
            setCustom(true);
        } else {
            form.editProfile.values.customCategory = '';
            setCustom(false);
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="EditProgramme"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {programmeItem ? `Editer Programme` : 'Ajouter un programme'}
                </Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Field name="_id" component="input" type="hidden" />

                    <div className="category-wrapper">
                        <div className="category-select">
                            <label>Catégorie</label>
                            <Field name="category" component="select" onChange={(e) => isCustom(e)} validate={required}>
                                <option />
                                <option value="Centre Ville">Centre Ville</option>
                                <option value="Ecologie">Ecologie</option>
                                <option value="Economie">Economie</option>
                                <option value="Intercommunalité">Intercommunalité</option>
                                <option value="Jeunesse/Sport">Jeunesse/Sport</option>
                                <option value="Mobilité">Mobilité</option>
                                <option value="Sécurité">Sécurité</option>
                                <option value="Social">Social</option>
                                <option value="Urbanisme">Urbanisme</option>
                                <option value="Vie Municipale">Vie Municipale</option>
                                <option value="custom">Custom</option>
                            </Field>
                        </div>

                        {custom ? (
                            <div className="custom">
                                <Field
                                    id="custom"
                                    name="customCategory"
                                    component={renderField}
                                    type="text"
                                    placeholder="Projet Centre Ville"
                                    validate={[required, maxLength22]}
                                />
                            </div>
                        ) : (
                            <div className="no-custom"></div>
                        )}
                    </div>

                    <Field
                        id="description"
                        name="description"
                        component={renderField}
                        type="textarea"
                        placeholder="Décrivez votre programme..."
                        normalize={maxCharacters}
                        validate={[required, maxLength800]}
                    />
                    <div className="count-wrapper">
                        <p className="character-count">
                            {count}/{maxChar}
                        </p>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    {programmeItem ? (
                        <Button variant="outline-danger" type="button" onClick={(e) => handleDelete(e)}>
                            Supprimer
                        </Button>
                    ) : (
                        ''
                    )}
                    <Button type="submit" disabled={pristine || submitting || form.editProfile.syncErrors}>
                        Sauvegarder
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default EditProgramme = reduxForm({
    form: 'editProfile',
})(EditProgramme);
