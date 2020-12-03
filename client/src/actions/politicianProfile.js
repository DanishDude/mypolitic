import { urlApi } from '../constant';

// -------- Update Politician Profile -------- //
export const startUpdatePoliticianProfile = () => ({
  type: 'START_UPDATE_POLITICIAN_PROFILE'
});

export const successUpdatePoliticianProfile = politicianProfile => ({
  type: 'SUCCESS_UPDATE_POLITICIAN_PROFILE',
  politicianProfile
});

export const errorUpdatePoliticianProfile = err => ({
  type: 'ERROR_UPDATE_POLITICIAN_PROFILE',
  err
});

export const fetchUpdatePoliticianProfile = (politicianProfile, token) => dispatch => {
  dispatch(startUpdatePoliticianProfile());

  let fd = new FormData();
  const toStrigify = ['education', 'interviews', 'programme', 'team'];

  for (const [key, value] of Object.entries(politicianProfile)) {
    if (value) {
      if (key === 'profilePhoto') {
        if (value && typeof value !== 'string') fd.append('profilePhoto', value, value.name);
      } else if (key === 'dateOfBirth') {
        fd.append(key, new Date(value).toISOString());
      } else if (toStrigify.includes(key)) {
        fd.append(key, JSON.stringify(value));
      } else {
        fd.append(key, value);
      } ;
    };
  };
  
  const options = {
    method: politicianProfile._id ? 'PUT' : 'POST',
    headers: { Authorization : token },
    body: fd
  };
  
  fetch(`${urlApi}/politician${politicianProfile._id ? '/' + politicianProfile._id : ''}`, options)
    .then(res => res.json())
    .then(payload => {
      const { success, msg, profile } = payload;

      if (!success) {
        dispatch(errorUpdatePoliticianProfile(msg));
      } else {
        dispatch(successUpdatePoliticianProfile(profile));
        dispatch(fetchMyPoliticianProfile(token));
      }
    })
    .catch(err => dispatch(errorUpdatePoliticianProfile(err)));
};

// -------- Get My Politician Profile -------- //
export const startGetPoliticianProfile = () => ({
  type: 'START_GET_POLITICIAN_PROFILE'
});

export const successGetPoliticianProfile = politicianProfile => ({
  type: 'SUCCESS_GET_MY_POLITICIAN_PROFILE',
  politicianProfile
});

export const errorGetPoliticianProfile = err => ({
  type: 'ERROR_GET_POLITICIAN_PROFILE',
  err
});

export const fetchMyPoliticianProfile = (token) => dispatch => {
  dispatch(startGetPoliticianProfile());

  const options = {
    method: 'GET',
    headers: {
      Authorization : token,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  fetch(`${urlApi}/politician`, options)
    .then(res => res.json())
    .then(payload => {
      const { success, msg, profile } = payload;

      if (!success) {
        dispatch(errorGetPoliticianProfile(msg));
      } else {
        dispatch(successGetPoliticianProfile(profile));
        if (profile.team && profile.team.length) {
          dispatch(fetchTeamDetails(profile.team));
        }
      }
    })
    .catch(err => dispatch(errorGetPoliticianProfile(err)));
};

// -------- Politician Profile Team Details -------- //
export const startFetchTeamDetails = () => ({
  type: 'START_FETCH_TEAM_DETAILS'
});

export const successFetchTeamDetails = team => ({
  type: 'SUCCESS_FETCH_TEAM_DETAILS',
  team
});

export const fetchTeamDetails = ids => dispatch => {
  startFetchTeamDetails();
  fetch(`${urlApi}/politician/search?ids=${ids.join(',')}`)
    .then(res => res.json())
    .then(payload => {
      const {success, profiles} = payload;

      if (!success) {
        dispatch(errorGetPoliticianProfile('Error loading Team Details'));
      } else {
        dispatch(successFetchTeamDetails(profiles));
      }
    })
    .catch(err => console.error(err))
}

// -------- Delete My Politician Profile -------- //
export const deleteProfileData = () => ({
  type: 'DELETE_PROFILE_DATA'
});
