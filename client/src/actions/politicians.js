import { urlApi } from '../constant';

// -------- Search Politician -------- //
export const startFetchPoliticians = () => ({
  type: 'START_FETCH_POLITICIAN'
});

export const successFetchPoliticians = politician => ({
  type: 'SUCCESS_FETCH_POLITICIAN',
  politician
});

export const errorFetchPoliticians = err => ({
  type: 'ERROR_FETCH_POLITICIAN',
  err
});

export const fetchSearchPoliticians = search => dispatch => {
  dispatch(startFetchPoliticians());

  const searchPoliticians = search => {
    console.log('SEARCH ', search);
    
  };

  searchPoliticians(search);
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
        dispatch(successFetchPoliticians(profile));
      }
    })
    .catch(err => dispatch(errorFetchPoliticians(err)));
};