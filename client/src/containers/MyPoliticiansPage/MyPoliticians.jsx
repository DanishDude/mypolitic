import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid } from '@material-ui/core';

import { fetchAllPoliticians, fetchLikedPoliticians } from '../../actions/politicians';
import ProfileGrid from '../../components/common/layout/ProfileGrid';
import SimpleCard from '../../components/common/cards/SimpleCard';
import TabContainer from './TabContainer';
import './MyPoliticians.scss';

const MyPoliticians = () => {
    const { likes } = useSelector((state) => state.user.user);
    const { all, liked } = useSelector((state) => state.politicians);
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
            {/* <h1 className="title">Mes Politiciens</h1>
            {liked?.length > 0 ? <ProfileGrid profiles={liked} /> : 'No profile liked'}
            <h2 className="title">Toute Profiles</h2>
            <ProfileGrid profiles={all} /> */}
        </div>
    );
};

export default MyPoliticians;
