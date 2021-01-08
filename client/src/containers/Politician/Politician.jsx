import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPoliticianProfile } from '../../actions/politicians';

import Presentation from '../MyProfile/Presentation';
import Profile from '../MyProfile/Profile';
import Programme from '../MyProfile/Programme';
import Team from '../MyProfile/Team';
import './Politician.scss';

const Politician = (props) => {
    const { _id } = props.match.params;
    const { politician } = useSelector((state) => state.politicians);
    const { userType } = useSelector((state) => state.user.user);
    const { presentation, programme, teamInfo } = politician;
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userType === 'admin' || userType === 'superAdmin') {
            setIsAdmin(true);
            console.log('yoyo');
        }

        dispatch(fetchPoliticianProfile(_id));
    }, [dispatch, _id, userType]);

    return (
        <div className="Politician">
            <Profile politicianProfile={politician} isAdmin={isAdmin} />
            <div className={presentation || isAdmin ? '' : 'remove'}>
                <Presentation politicianProfile={politician} isAdmin={isAdmin} />
            </div>
            <div className={programme?.length || isAdmin ? '' : 'remove'}>
                <Programme politicianProfile={politician} isAdmin={isAdmin} />
            </div>
            <div className={teamInfo?.length || isAdmin ? '' : 'remove'}>
                <Team politicianProfile={politician} isAdmin={isAdmin} />
            </div>
        </div>
    );
};

export default Politician;
