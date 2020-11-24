import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, IconButton, Typography  } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';

import { fetchLikePolitician } from '../../actions/politicians';
import './SimpleCard.scss';

const SimpleCard = props => {
  const { _id, firstname, lastname, party, profilePhoto, likes } = props.profile;
  const { user, token } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const viewPolitician = () => history.push({ pathname: `/politicien/${_id}` })
  const like = () => dispatch(fetchLikePolitician(_id, token));
  
  return (
      <Card className={'SimpleCard'}>
          <CardActionArea onClick={viewPolitician}>
            <CardContent className={'content'}>
              <Avatar className={'avatar'} src={profilePhoto}>
                {firstname.charAt(0).toUpperCase()}{lastname.charAt(0).toUpperCase()}
              </Avatar>
              <Typography gutterBottom variant="h5" component="h2">
                {firstname} {lastname}
              </Typography>
              <Typography variant="h6" component="h4">
                {party}
              </Typography>
            </CardContent>
          </CardActionArea>
        <CardActions className={'actions'} disableSpacing={false}>
          <IconButton onClick={() => like()}>
            {user.likes.includes(_id)
              ? <ThumbUpIcon className={'like'} />
              : <ThumbUpAltOutlinedIcon className={'like'} />}
          </IconButton>
          {likes ? <Typography variant="p" className={'like-count'}>{likes}</Typography> : ''}
        </CardActions>

      </Card>
  );
};

export default SimpleCard;
