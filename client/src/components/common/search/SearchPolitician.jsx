import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { fetchSearchPoliticians } from '../../../actions/politicians';
import { citySearch } from './citySearch';
import CitySearchResults from './CitySearchResults';
import './SearchPolitician.scss';

const renderField = ({ input, placeholder, type }) => {
    return input.name === 'city' ? (
        <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
    ) : (
        <input {...input} placeholder={placeholder} type={type} />
    );
};

let SearchPolitician = (props) => {
    const { initialize, pristine, submitting } = props;
    const { form } = useSelector((state) => state);
    const [cities, setCities] = useState([]);
    const [showCities, setShowCities] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const initialValues = {
            name: location.state?.values?.name ? location.state.values.name : '',
            city: location.state?.values?.city ? location.state.values.city : '',
        };
        initialize(initialValues);
    }, [initialize]);

    async function getCities(city) {
        if (!city.length) {
            return setShowCities(false);
        }

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

    const handleSubmit = (e) => {
        const { values } = form?.searchPolitician;

        let query = '';
        for (const key in values) {
            if (query.length > 0) {
                query = query + '&';
            }
            query = query + key + '=' + values[key];
        }
        dispatch(fetchSearchPoliticians(query));

        if (!location.pathname.includes('/politiciens')) {
            history.push({
                pathname: '/politiciens',
                state: { values },
            });
        }
        e.preventDefault();
    };

    return (
        <div className="SearchPolitician">
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

export default reduxForm({
    form: 'searchPolitician',
})(SearchPolitician);
