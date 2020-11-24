import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid } from '@material-ui/core';

import { fetchAllPoliticians, fetchLikedPoliticians } from '../../actions/politicians';
import SimpleCard from '../../components/common/SimpleCard';
import './MyPoliticians.scss';

const MyPoliticians = () => {
  const { likes } = useSelector(state => state.user.user);
  const { all, liked } = useSelector(state => state.politicians);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPoliticians());
  }, [dispatch])

  useEffect(() => {
    if (likes.length > 0) {
      dispatch(fetchLikedPoliticians(likes));
    }
  }, [dispatch, likes]);
  
  return (
    <div className="MyPoliticians">

      <h1 className="title">Mes Politiciens</h1>
      <Container maxWidth="lg">
        <Grid className={'content'} container direction='row' justify='flex-start' spacing={4} wrap='wrap'>
          {liked.length > 0
            ? liked.map(profile => {
              return (
                <Grid key={profile._id} item lg={'auto'}>
                  <SimpleCard profile={profile} />
                </Grid>
              )})
            : 'No profile liked'
          }
        </Grid>

        <h2 className="title">Toute Profiles</h2>
        <Grid className={'content'} container direction='row' justify='flex-start' spacing={4} wrap='wrap'>
          {all.map(profile => {
            return (
              <Grid key={profile._id} item lg={'auto'}>
                <SimpleCard profile={profile} />
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default MyPoliticians;
