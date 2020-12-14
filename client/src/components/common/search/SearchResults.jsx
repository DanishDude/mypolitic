import React, { Fragment } from 'react';
import './SearchResults.scss';

const SearchResults = (props) => {
    const { results, select } = props;

    const handleOnClick = (x) => select(x);

    return (
        <Fragment>
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
        </Fragment>
    );
};

export default SearchResults;
