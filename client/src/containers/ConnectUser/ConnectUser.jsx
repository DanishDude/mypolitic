import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Login from './Login';
import SelectUserType from './SelectUserType';
import Signup from './Signup';
import { fetchLogin, fetchSignup } from '../../actions/user';
import './ConnectUser.scss';

const ConnectUser = (props) => {
    const { onHide, showSignup, user } = props;
    const dispatch = useDispatch();
    const { form } = useSelector((state) => state);
    const [loginShow, setLoginShow] = useState(true);
    const [userType, setUserType] = useState('');
    const initialValues = { userType };
    let disabled = true;

    useEffect(() => {
        if (showSignup) setLoginShow(false);
    }, [showSignup]);

    if (form && form.login && !form.login.syncErrors) {
        disabled = false;
    } else if (form && form.signup && !form.signup.syncErrors) {
        disabled = false;
    } else {
        disabled = true;
    }

    const switchLoginSignup = () => {
        setLoginShow(!loginShow);
        setUserType('');
        user.error = '';
    };

    const handleSubmit = (e) => {
        loginShow ? dispatch(fetchLogin(form.login.values)) : dispatch(fetchSignup(form.signup.values));
        e.preventDefault();
    };

    if (user.token) onHide();

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="ConnectUser"
        >
            <form>
                <Modal.Header closeButton dialogClassName="modal-header">
                    <Modal.Title dialogClassName="modal-title" id="contained-modal-title-vcenter">
                        {loginShow
                            ? `Se Connecter`
                            : `S'inscrire en tant que 
              ${
                  userType === ''
                      ? `...`
                      : `  
                ${userType === 'citizen' ? 'Citoyen(ne)' : 'Politicien(ne)'}`
              }`}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {loginShow ? (
                        <Login loginError={user.error} />
                    ) : userType === '' ? (
                        <SelectUserType setUserType={setUserType} />
                    ) : (
                        <Signup signupError={user.error} initialValues={initialValues} />
                    )}

                    <div className="action-btns">
                        <Button className="link-btn" variant="link" onClick={switchLoginSignup}>
                            {loginShow ? <p>S'inscrire</p> : <p>Se Connecter</p>}
                        </Button>

                        {userType === '' && !loginShow ? (
                            ''
                        ) : (
                            <button onClick={handleSubmit} className="submit-btn" disabled={disabled}>
                                {!loginShow ? `S'inscrire` : `Connecter`}
                            </button>
                        )}
                    </div>
                </Modal.Body>
            </form>
        </Modal>
    );
};

export default ConnectUser;
