import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import politicianProfile from './politicianProfile';
import politicians from './politicians';
import user from './user';

const allReducers = combineReducers({
  politicianProfile,
  politicians,
  user,
  form: formReducer,
});

export default allReducers;
