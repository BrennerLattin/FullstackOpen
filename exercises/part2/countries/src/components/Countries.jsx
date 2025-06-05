const Countries = ({ countries, allCountriesLength }) => {
    if (countries.length <= 1 || countries.length === allCountriesLength)
        return null

    if (countries.length > 10)
        return (<div>Too many matches, specify another filter</div>)

    return (
        <div>
            {countries.map(country =>
                <div key={country.name.official}>
                    {country.name.common}
                </div>
            )}
        </div>
    )
}

export default Countries