import React, { Fragment } from 'react';
import './CitySearchResults.scss';

const CitySearchResults = (props) => {
    const { results, select } = props;

    const handleOnClick = (x) => select(x);

    return (
        <Fragment>
            {results.length ? (
                <ul className="CitySearchResults">
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

export default CitySearchResults;
