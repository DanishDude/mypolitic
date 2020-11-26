import { dislikePolitician, followPolitician, likePolitician, unfollowPolitician } from './user';
import { urlApi } from '../constant';
import { requestLogin } from './user';

// -------- Search Politician -------- //
export const startFetchPoliticians = () => ({   // TODO separate START_FETCH_... by actions
  type: 'START_FETCH_POLITICIAN'
});

export const successFetchPolitician = politician => ({
  type: 'SUCCESS_FETCH_POLITICIAN',
  politician
});

export const successFetchPoliticians = politicians => ({
  type: 'SUCCESS_FETCH_POLITICIANS',
  politicians
});

export const successFetchSearchResultsPoliticians = politicians => ({
  type: 'SUCCESS_FETCH_SEARCH_RESULTS_POLITICIANS',
  politicians
});

export const successFetchLikedPoliticians = politicians => ({
  type: 'SUCCESS_FETCH_LIKED_POLITICIANS',
  politicians
});

export const successFetchAllPoliticians = politicians => ({
  type: 'SUCCESS_FETCH_ALL_POLITICIANS',
  politicians
});

export const updatePolitician = politician => ({
  type: 'UPDATE_POLITICIAN',
  politician
});

export const errorFetchPoliticians = err => ({
  type: 'ERROR_FETCH_POLITICIAN',
  err
});

export const fetchSearchPoliticians = query => dispatch => {
  dispatch(startFetchPoliticians());

  fetch(`${urlApi}/politician/search?${query}`)
    .then(res => res.json())
    .then(payload => {
      const {success, msg, profiles} = payload;

      if (!success) {
        dispatch(errorFetchPoliticians(msg));
      } else {
        dispatch(successFetchSearchResultsPoliticians(profiles));
      }
    })
    .catch(err => console.error(err))
};

export const fetchLikedPoliticians = ids => dispatch => {
  dispatch(startFetchPoliticians());

  fetch(`${urlApi}/politician/search?ids=${ids.join(',')}`)
    .then(res => res.json())
    .then(payload => {
      const {success, msg, profiles} = payload;

      if (!success) {
        dispatch(errorFetchPoliticians(msg));
      } else {
        dispatch(successFetchLikedPoliticians(profiles));
      }
    })
    .catch(err => console.error(err))
};

export const fetchAllPoliticians = () => dispatch => { // - - - - - - TODO remove - - - - - - - //
  dispatch(startFetchPoliticians());

  fetch(`${urlApi}/politician/search?ids=`)
    .then(res => res.json())
    .then(payload => {
      const {success, msg, profiles} = payload;

      if (!success) {
        dispatch(errorFetchPoliticians(msg));
      } else {
        dispatch(successFetchAllPoliticians(profiles));
      }
    })
    .catch(err => console.error(err))
};

// -------- Get Politician Profile -------- //
export const fetchPoliticianProfile = _id => dispatch => {
  dispatch(startFetchPoliticians());

  fetch(`${urlApi}/politician/${_id}`)
    .then(res => res.json())
    .then(payload => {
      const { success, msg, profile } = payload;

      if (!success) {
        dispatch(errorFetchPoliticians(msg));
      } else {
        dispatch(successFetchPolitician(profile));
      }
    })
    .catch(err => dispatch(errorFetchPoliticians(err)));
};

// -------- Like Politician -------- //
export const fetchLikePolitician = (_id, token) => dispatch => {
  if (!token || token === '') {
    dispatch(requestLogin());
  } else {
    const options = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json'
      }
    };

    fetch(`${urlApi}/politician/${_id}/like`, options)
      .then(res => res.json())
      .then(payload => {
        const { liked, success, politician } = payload;

        if (success & liked) {
          dispatch(fetchFollowPolitician(_id, token));
          dispatch(likePolitician(_id));
          dispatch(updatePolitician(politician));
        } else if (success & !liked) {
          dispatch(dislikePolitician(_id));
          dispatch(updatePolitician(politician));
        }
      })
      .catch(err => console.error(err));
  }
}

// -------- Follow Politician -------- //
export const fetchFollowPolitician = (_id, token) => dispatch => {
  if (!token || token === '') {
    dispatch(requestLogin());
  } else {
    const options = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json'
      }
    };

    fetch(`${urlApi}/politician/${_id}/follow`, options)
      .then(res => res.json())
      .then(payload => {
        const { follow, success, politician } = payload;

        if (success & follow) {
          dispatch(followPolitician(_id));
          dispatch(updatePolitician(politician));
        } else if (success & !follow) {
          dispatch(unfollowPolitician(_id));
          dispatch(updatePolitician(politician));
        }
      })
      .catch(err => console.error(err));
  }
}
