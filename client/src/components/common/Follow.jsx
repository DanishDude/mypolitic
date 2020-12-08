import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { fetchFollowPolitician } from '../../actions/politicians';
import './Follow.scss';

const Follow = (props) => {
    const { profileId } = props;
    const { user, token } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const follow = () => dispatch(fetchFollowPolitician(profileId, token));

    return (
        <span className="Follow">
            {user.follows && user.follows.includes(profileId) ? (
                <Button className="following" size="small" variant="outlined" color="default" onClick={() => follow()}>
                    Suivi
                </Button>
            ) : (
                <Button className="follow" variant="outlined" size="small" color="primary" onClick={() => follow()}>
                    <AddIcon className="plus" fontSize="small" /> Suivre
                </Button>
            )}
        </span>
    );
};

export default Follow;
