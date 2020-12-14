import React from 'react';
import { Grid } from '@material-ui/core';
import SimpleCard from '../../common/cards/SimpleCard';
import './ProfileGrid.scss';

const ProfileGrid = (props) => {
    return (
        <Grid
            className={'ProfileGrid'}
            container
            direction="row"
            justify="center"
            alight
            spacing={4}
            wrap="wrap"
            zeroMinWidth={true}
        >
            {props.profiles.map((profile) => {
                return (
                    <Grid key={profile._id} item lg={'auto'}>
                        <SimpleCard profile={profile} />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default ProfileGrid;
