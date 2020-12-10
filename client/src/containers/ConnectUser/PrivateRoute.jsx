import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogin } from '../../actions/user';

const PrivateRoute = ({ component: Component, ...propsRoute }) => {
    const { user } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user.isLoggedIn) {
            dispatch(requestLogin());
        }
    }, [user]);

    return (
        <Route
            {...propsRoute}
            render={(props) =>
                user.isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ path: props.history.goBack(), state: { from: props.location } }} />
                )
            }
        />
    );
};

export default PrivateRoute;
