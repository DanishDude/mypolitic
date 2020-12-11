import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import message from './message';
import politicianProfile from './politicianProfile';
import politicians from './politicians';
import user from './user';

const allReducers = combineReducers({
    form: formReducer,
    message,
    politicianProfile,
    politicians,
    user,
});

export default allReducers;
