import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchSearchPoliticians } from '../../actions/politicians';
import SearchPoliticianForm from './SearchPoliticianForm';

const SearchPolitician = () => {
  const dispatch = useDispatch();

  const searchPolitician = values => {
    let query = '';
    for (const key in values) {
      if (query.length > 0) {
        query = query + '&';
      }
      query = query + key + '=' + values[key];
    }

    dispatch(fetchSearchPoliticians(query));
  }

  return (
    <div className="SearchPolitician">
      <SearchPoliticianForm onSubmit={values =>  searchPolitician(values)} />
    </div>
  );
};

export default SearchPolitician;
