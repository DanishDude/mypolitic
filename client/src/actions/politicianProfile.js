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
  const toStrigify = ['programme', 'team', 'unregisteredTeam'];

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
      }
    })
    .then(() => dispatch(fetchMyPoliticianProfile(token)))
    .catch(err => dispatch(errorUpdatePoliticianProfile(err)));
};

// -------- Update Unregistered Team -------- //
export const startUpdateUnregisteredTeam = () => ({
  type: 'START_UPDATE_UNREGISTERED_TEAM'
});

export const successUpdateUnregisteredTeam = politicianProfile => ({
  type: 'SUCCESS_UPDATE_UNREGISTERED_TEAM',
  politicianProfile
});

export const errorUpdateUnregisteredTeam = err => ({
  type: 'ERROR_UPDATE_UNREGISTERED_TEAM',
  err
});

export const fetchUpdateUnregisteredTeam = (member, token, profileId) => dispatch => {
  dispatch(startUpdateUnregisteredTeam());

  let fd = new FormData();

  for (const [key, value] of Object.entries(member)) {
    if (value) {
      if (key === 'photo') {
        if (value && typeof value !== 'string') fd.append('photo', value, value.name);
      } else {
        fd.append(key, value);
      } ;
    };
  };

  const options = {
    method: member._id ? 'PUT' : 'POST',
    headers: { Authorization : token },
    body: fd
  };

  fetch(`${urlApi}/politician/${profileId}/unregisteredTeam${member._id ? '/' + member._id : ''}`,
    options)
    .then(res => res.json())
    .then(payload => {
      const { success, msg, profile } = payload;

      if (!success) {
        dispatch(errorUpdateUnregisteredTeam(msg));
      } else {
        dispatch(successUpdateUnregisteredTeam(profile));
      }
    })
    .then(() => dispatch(fetchMyPoliticianProfile(token)))
    .catch(err => dispatch(errorUpdateUnregisteredTeam(err)));
};

export const fetchDeleteUnregisteredTeamMember = (profileId, memberId, token) => dispatch => {
  dispatch(startUpdateUnregisteredTeam());

  const options = {
    method: 'DELETE',
    headers: { Authorization : token },
  };

  fetch(`${urlApi}/politician/${profileId}/unregisteredTeam/${memberId}`, options)
    .then(res => res.json())
    .then(payload => {
      const { success, msg, profile } = payload;

      if (!success) {
        dispatch(errorUpdateUnregisteredTeam(msg));
      } else {
        dispatch(successUpdateUnregisteredTeam(profile));
      }
    })
    .then(() => dispatch(fetchMyPoliticianProfile(token)))
    .catch(err => dispatch(errorUpdateUnregisteredTeam(err)));
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
      }
    })
    .catch(err => dispatch(errorGetPoliticianProfile(err)));
};

// -------- Get My Politician Profile -------- //
export const deleteProfileData = () => ({
  type: 'DELETE_PROFILE_DATA'
});
