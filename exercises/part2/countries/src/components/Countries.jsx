const Countries = ({ countries, setCountry }) => {
    if (countries.length <= 1)
        return null

    if (countries.length > 10)
        return (<div>Too many matches, specify another filter</div>)

    return (
        <div>
            {countries.map(country =>
                <div key={country.name.official}>
                    {country.name.common}
                    <button onClick={() => setCountry(country)}>Show</button>
                </div>
            )}
        </div>
    )
}

export default Countries