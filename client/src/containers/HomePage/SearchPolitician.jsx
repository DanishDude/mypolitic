import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchSearchPoliticians } from '../../actions/politicians';
import SearchPoliticianForm from './SearchPoliticianForm';

const SearchPolitician = () => {
  const dispatch = useDispatch();

  const searchPolitician = values => {
    console.log('here');
    console.log(values);
    
    
    dispatch(fetchSearchPoliticians(values));
  }

  return (
    <div className="SearchPolitician">
      <SearchPoliticianForm onSubmit={values =>  searchPolitician(values)} />
    </div>
  );
};

export default SearchPolitician;
