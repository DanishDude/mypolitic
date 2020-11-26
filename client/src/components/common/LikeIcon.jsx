import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Typography  } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import { fetchLikePolitician } from '../../actions/politicians';
import './LikeIcon.scss';

const LikeIcon = props => {
  const { likeCount, profileId } = props
  const { user, token } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const like = () => dispatch(fetchLikePolitician(profileId, token));

  return (
    <span className="LikeIcon">
      <IconButton className={'like'} onClick={() => like()}>
        {user.likes.includes(profileId)
          ? <FavoriteIcon  />
          : <FavoriteBorderIcon />}
      </IconButton>
      {likeCount ? <Typography variant="p" className={'like-count'}>{likeCount}</Typography> : ''}
    </span>
  );
};

export default LikeIcon;
