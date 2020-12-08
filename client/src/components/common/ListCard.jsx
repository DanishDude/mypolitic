import React from 'react';
import { Avatar, Card, CardActionArea, Typography } from '@material-ui/core';

import './ListCard.scss';

const ListCard = (props) => {
    const { select } = props;
    const { city, firstname, lastname, profilePhoto } = props.profile;

    return (
        <Card className={'ListCard'}>
            <CardActionArea className={'content'} onClick={() => select()}>
                <Avatar className={'avatar'} src={profilePhoto}>
                    {firstname.charAt(0).toUpperCase()}
                    {lastname.charAt(0).toUpperCase()}
                </Avatar>
                <Typography className={'text'} variant="p" component="p">
                    {firstname} {lastname}
                    {city.length ? `, ${city[0]}` : ''}
                </Typography>
            </CardActionArea>
        </Card>
    );
};

export default ListCard;
