import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';

import { fetchFollowPolitician } from '../../actions/politicians';
import './Follow.scss';

const Follow = props => {
  const { profileId } = props
  const { user, token } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const follow = () => dispatch(fetchFollowPolitician(profileId, token));

  return (
    <span className="Follow">
      {user.follows.includes(profileId)
        ? <Button className="following" variant="outlined" color="default" onClick={() => follow()}>Suivi</Button>
        : <Button variant="outlined" color="primary" onClick={() => follow()}>Suivre</Button>}
    </span>
  );
};

export default Follow;
