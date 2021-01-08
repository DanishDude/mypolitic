import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import { fetchAllPoliticians } from '../../actions/politicians';
import './Admin.scss';

const Admin = (props) => {
    const profiles = useSelector((state) => state.politicians.all);
    const dispatch = useDispatch();
    const history = useHistory();
    const viewPolitician = (_id) => history.push({ pathname: `/politicien/${_id}` });

    useEffect(() => {
        dispatch(fetchAllPoliticians());
    }, [dispatch]);

    return (
        <div className="Admin">
            <h1>Hello Admin page</h1>
            {profiles?.length ? (
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nom</TableCell>
                                <TableCell>Partie</TableCell>
                                <TableCell>Ville</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {profiles?.length
                                ? profiles.map((profile) => (
                                      <TableRow key={profile._id} onClick={() => viewPolitician(profile._id)}>
                                          <TableCell>
                                              {profile.firstname} {profile.lastname}
                                          </TableCell>
                                          <TableCell>{profile.party}</TableCell>
                                          <TableCell>{profile.city}</TableCell>
                                      </TableRow>
                                  ))
                                : ''}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                ''
            )}
        </div>
    );
};

export default Admin;
