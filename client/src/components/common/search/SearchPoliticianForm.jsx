import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { citySearch } from '../search/citySearch';
import CitySearchResults from '../search/CitySearchResults';
import './SearchPoliticianForm.scss';

const renderField = ({ input, placeholder, type }) => {
    return input.name === 'city' ? (
        <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
    ) : (
        <input {...input} placeholder={placeholder} type={type} />
    );
};

let SearchPoliticianForm = (props) => {
    const { handleSubmit, pristine, submitting } = props;
    const { form } = useSelector((state) => state);
    const [cities, setCities] = useState([]);
    const [showCities, setShowCities] = useState(false);

    async function getCities(city) {
        const cityList = await citySearch(city);
        if (cityList.length) {
            const formattedCityList = cityList.map((result) => {
                const { name, context } = result.properties;
                const region = context.split(', ');
                return `${name}, ${region[1]}(${region[0]}), ${region[2]}`;
            });
            setCities(formattedCityList);
            setShowCities(true);
        }
    }

    const selectCity = (city) => {
        if (form.searchPolitician?.values) {
            form.searchPolitician.values.city = city.split(', ')[0];
        }
        setShowCities(false);
    };

    return (
        <div className="SearchPoliticianForm">
            <form onSubmit={handleSubmit}>
                <div className="fields">
                    <Field name="name" component={renderField} type="text" placeholder="Qui: Jacques Dupont" />
                    <Field
                        name="city"
                        component={renderField}
                        type="text"
                        placeholder="Ou: Paris, Pau, Mérignac, ..."
                        onChange={(event, newValue) => getCities(newValue)}
                        onFocus={() => {
                            if (cities.length) {
                                setShowCities(true);
                            }
                        }}
                        autoComplete="off"
                    />
                    <div className="top-limit">
                        {showCities ? (
                            <div className="cities">
                                <CitySearchResults results={cities} select={(city) => selectCity(city)} />
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                <Button type="submit" disabled={pristine || submitting}>
                    Chercher
                </Button>
            </form>
        </div>
    );
};

export default SearchPoliticianForm = reduxForm({
    form: 'searchPolitician',
})(SearchPoliticianForm);
