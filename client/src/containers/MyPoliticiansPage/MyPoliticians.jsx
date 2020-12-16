import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllPoliticians, fetchLikedPoliticians } from '../../actions/politicians';
import TabContainer from './TabContainer';
import './MyPoliticians.scss';

const MyPoliticians = (props) => {
    const { state } = { toto: 'loco' };
    const { likes } = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPoliticians());
    }, [dispatch]);

    useEffect(() => {
        if (likes?.length > 0) {
            dispatch(fetchLikedPoliticians(likes));
        }
    }, [dispatch, likes]);

    return (
        <div className="MyPoliticians">
            <TabContainer />
        </div>
    );
};

export default MyPoliticians;
