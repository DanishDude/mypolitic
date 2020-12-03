import React from 'react';
import './SearchResults.scss';

const SearchResults = (props) => {
  const { results, select } = props;

  const handleOnClick = (x) => {
    console.log(x);
    select(x);
  };
  return (
    <div>
      {results.length ? (
        <ul className="SearchResults">
          {results.map((result, index) => (
            <li key={index} className="result" onClick={() => handleOnClick(result)}>
              {result}
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
};

export default SearchResults;
