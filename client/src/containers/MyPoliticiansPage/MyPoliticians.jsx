import React from 'react';
import { Container } from '@material-ui/core';
import SearchPolitician from '../SearchPolitician/SearchPolitician';
import './MyPoliticians.scss';

const MyPoliticians = () => {
  return (
    <div className="MyPoliticians">
      <h1>Mes Politiciens</h1>
      <Container maxWidth="lg">
        <SearchPolitician />
      </Container>
    </div>
  );
};

export default MyPoliticians;
