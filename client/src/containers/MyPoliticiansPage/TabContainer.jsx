import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { AppBar, Paper, Tab, Tabs } from '@material-ui/core';
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
    const { user, token } = useSelector((state) => state.user);
    const { all, error, follow, liked, searchResults } = useSelector((state) => state.politicians);
    const [value, setValue] = useState(0);
    const [elevation, setElevation] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.innerWidth > 1200) {
            setElevation(3);
        }
        return () => setElevation(0);
    }, [user]);

    const handleChange = (event, newValue) => {
        if (token && newValue === 1) {
            setValue(newValue);
        } else if (newValue === 1) {
            dispatch(requestLogin());
        } else {
            setValue(newValue);
        }

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
                {liked?.length ? (
                    <div>
                        <h4 className="subtitle">Des profils qui ont votre soutien</h4>
                        <ProfileGrid profiles={liked} />
                    </div>
                ) : (
                    ''
                )}
                {follow?.length ? (
                    <div>
                        <h4 className="subtitle">Profils que vous suivez</h4>
                        <ProfileGrid profiles={follow} />
                    </div>
                ) : (
                    ''
                )}
                {!liked?.length && !follow?.length ? (
                    <h4 className="subtitle">Les profils que vous soutenez ou suivez seront affichés ici</h4>
                ) : (
                    ''
                )}
            </TabPanel>
        </div>
    );
};

export default TabContainer;
