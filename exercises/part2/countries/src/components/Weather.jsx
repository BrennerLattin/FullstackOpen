const Weather = ({ country, weather }) => {
    if (country === null || weather === null)
        return null

    return (
        <div>
            <h1>Weather in {country.capital?.[0] ?? country.name.common}</h1>
            <p>Temperature: {weather.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} />
            <p>Wind: {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather