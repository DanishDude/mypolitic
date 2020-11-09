import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchPoliticianProfile } from '../../actions/politicians';

import Presentation from '../MyProfile/Presentation';
import Profile from '../MyProfile/Profile';
import Programme from '../MyProfile/Programme';
import Team from '../MyProfile/Team';

const Politician = props => {
  const { _id } = props.match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPoliticianProfile(_id));
  }, [dispatch, _id]);

  return (
    <div className="Politician">
      <Profile politicianProfile={props.politician} />
      <Presentation politicianProfile={props.politician} />
      <Programme politicianProfile={props.politician} />
      <Team politicianProfile={props.politician} />
    </div>
  );
};

const mstp = state => {
  return {politician: state.politicians.politician};
};

export default connect(mstp, null)(Politician);
