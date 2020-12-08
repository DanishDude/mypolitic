import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchPoliticianProfile } from '../../actions/politicians';

import Presentation from '../MyProfile/Presentation';
import Profile from '../MyProfile/Profile';
import Programme from '../MyProfile/Programme';
import Team from '../MyProfile/Team';
import './Politician.scss';

const Politician = (props) => {
    const { _id } = props.match.params;
    const { politician } = useSelector((state) => state.politicians);
    const { presentation, programme, teamInfo } = politician;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPoliticianProfile(_id));
    }, [dispatch, _id]);

    return (
        <div className="Politician">
            <Profile politicianProfile={politician} />
            <div className={presentation ? '' : 'remove'}>
                <Presentation politicianProfile={politician} />
            </div>
            <div className={programme && programme.length ? '' : 'remove'}>
                <Programme politicianProfile={politician} />
            </div>
            <div className={teamInfo && teamInfo.length ? '' : 'remove'}>
                <Team politicianProfile={politician} />
            </div>
        </div>
    );
};

const mstp = (state) => {
    return { politician: state.politicians.politician };
};

export default connect(mstp, null)(Politician);
