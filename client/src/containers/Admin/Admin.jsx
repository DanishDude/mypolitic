import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import { fetchAllPoliticians } from '../../actions/politicians';
import ListCard from '../../components/common/cards/ListCard';

const Admin = (props) => {
    const profiles = useSelector((state) => state.politicians.all);
    const dispatch = useDispatch();

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
                                <TableCell>Name</TableCell>
                                <TableCell>Party</TableCell>
                                <TableCell>City</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {profiles?.length
                                ? profiles.map((profile) => (
                                      <TableRow key={profile._id}>
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
