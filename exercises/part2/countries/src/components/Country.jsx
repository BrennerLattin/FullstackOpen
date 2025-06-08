const Country = ({ country }) => {
    if (country === null)
        return null

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>
                <div>Capital: {country.capital?.[0] ?? 'N/A'}</div>
                <div>Area: {country.area}</div>
            </div>
            <h1>Languages</h1>
            <ul>
                {Object.values(country.languages).map(language =>
                    <li key={language}>{language}</li>
                )}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
        </div>
    )
}

export default Country