export const citySearch = async (city) => {
    const query = city.split(' ').join('+');
    return await fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}&type=municipality&limit=25`)
        .then((res) => res.json())
        .then((payload) => {
            if (payload.features) {
                return payload.features;
            }
        })
        .catch((err) => {
            console.error(err);
            return [];
        });
};
