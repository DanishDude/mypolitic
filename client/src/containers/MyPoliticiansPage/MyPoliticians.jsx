import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllPoliticians, fetchFollowedPoliticians, fetchLikedPoliticians } from '../../actions/politicians';
import TabContainer from './TabContainer';
import './MyPoliticians.scss';

const MyPoliticians = (props) => {
    const { follows, likes } = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPoliticians());
    }, [dispatch]);

    useEffect(() => {
        if (likes?.length > 0) {
            dispatch(fetchLikedPoliticians(likes));
        }
        if (follows?.length > 0) {
            dispatch(fetchFollowedPoliticians(follows));
        }
    }, [dispatch, follows, likes]);

    return (
        <div className="MyPoliticians">
            <TabContainer />
        </div>
    );
};

export default MyPoliticians;
