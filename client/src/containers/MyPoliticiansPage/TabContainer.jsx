import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { AppBar, Container, Paper, Tab, Tabs } from '@material-ui/core';
import ProfileGrid from '../../components/common/layout/ProfileGrid';
import { requestLogin } from '../../actions/user';
import SearchPolitician from '../../components/common/search/SearchPolitician';
import './TabContainer.scss';

let TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Fragment>{children}</Fragment>}
        </div>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabContainer = (props) => {
    const { state } = props;
    const { user } = useSelector((state) => state.user);
    const { all, error, searchResults } = useSelector((state) => state.politicians);
    const [value, setValue] = useState(0);
    const [elevation, setElevation] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.innerWidth > 1200) {
            setElevation(3);
        }
        return () => setElevation(0);
    });

    const handleChange = (event, newValue) => {
        console.log(newValue);
        // if (user._id && newValue === 1) {
        console.log('1');
        setValue(newValue);
        // } else {
        //     console.log('2');
        //     dispatch(requestLogin());
        // }

        event.preventDefault();
    };

    return (
        <div className={'TabContainer'}>
            <AppBar position="sticky" color="primary">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                    centered
                    scrollButtons="desktop"
                    variant="fullWidth"
                >
                    <Tab label="Chercher sur Mypolitic" {...a11yProps(0)} />
                    <Tab label="Mes Politiciens" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Paper className="search" square={true} elevation={elevation}>
                    <SearchPolitician />
                </Paper>
                {searchResults?.length ? <ProfileGrid profiles={searchResults} /> : ''}
                {!searchResults?.length && error === 'No profiles found for this query' ? (
                    <div>
                        <h4 className="subtitle">
                            Il n'y a pas de profils pour cette recherche, voici d'autres profils de politiciens...
                        </h4>
                        <ProfileGrid profiles={all} />
                    </div>
                ) : (
                    ''
                )}
                {!searchResults?.length && error === '' ? (
                    <h4 className="subtitle">Rechercher des politiciens sur My Politic</h4>
                ) : (
                    ''
                )}
            </TabPanel>
            <TabPanel value={value} index={1}>
                MyPoliticians PAGE
            </TabPanel>
        </div>
    );
};

export default TabContainer;
