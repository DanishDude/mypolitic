import React from 'react';
import { Avatar, Card, CardContent, Typography  } from '@material-ui/core';

import './NonClicableCard.scss';

const NonClicableCard = props => {
  const { city, firstname, lastname, party, profilePhoto } = props.profile;
  
  return (
      <Card className={'NonClicableCard'}>
        <CardContent>
          <Avatar className={'avatar'} src={profilePhoto}>
            {firstname.charAt(0).toUpperCase()}{lastname.charAt(0).toUpperCase()}
          </Avatar>
          <div className="text">
            <Typography gutterBottom variant="h5" component="h5">
              {firstname} {lastname}
            </Typography>
            <Typography variant="h6" component="h6">
              {party}
            </Typography>
            <Typography variant="h6" component="h6">
              {city[0]}
            </Typography>
          </div>
        </CardContent>
      </Card>
  );
};

export default NonClicableCard;
