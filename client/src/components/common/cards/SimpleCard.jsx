import React from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Card, CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core';

import Follow from '../Follow';
import LikeIcon from '../LikeIcon';
import './SimpleCard.scss';

const SimpleCard = (props) => {
    const { _id, firstname, lastname, party, profilePhoto, likes } = props.profile;
    const history = useHistory();
    const viewPolitician = () => history.push({ pathname: `/politicien/${_id}` });

    return (
        <Card className={'SimpleCard'}>
            <CardActionArea onClick={viewPolitician}>
                <CardContent className={'content'}>
                    <Avatar className={'avatar'} src={profilePhoto}>
                        {firstname.charAt(0).toUpperCase()}
                        {lastname.charAt(0).toUpperCase()}
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
                <LikeIcon likeCount={likes} profileId={_id} />
                <Follow profileId={_id} />
            </CardActions>
        </Card>
    );
};

export default SimpleCard;
