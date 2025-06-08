import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_KEY

const baseUrl = "https://api.openweathermap.org/data/2.5/weather"

const getWeather = (lat, lon) =>
    axios
        .get(`${baseUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
        .then(response => response.data)

export default { getWeather }