import { useState, useEffect } from 'react'

import Search from './components/Search'
import Weather from './components/Weather'
import Country from './components/Country'
import Countries from './components/Countries'
import countryService from './services/countryService'
import weatherService from './services/weatherService'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
        countryService
            .getAll()
            .then(countries => setAllCountries(countries))
  }, [])

  useEffect(() => {
    const filteredCountries = allCountries.filter(country => {
        const name = country.name.common.toLowerCase()
        return name.includes(filter.toLowerCase())
    })

    if (filteredCountries.length < allCountries.length)
      setCountries(filteredCountries)
    else
      setCountries([])

    if (filteredCountries.length === 1)
        setCountry(filteredCountries[0])
    else
        setCountry(null)
  }, [filter])
 
  useEffect(() => {
    if (country !== null)
      weatherService
        .getWeather(country.latlng[0], country.latlng[1])
        .then(weather => setWeather(weather))
  }, [country])

  return (
    <div>
      <Search filter={filter} setFilter={setFilter} />
      <Countries countries={countries} setCountry={setCountry} />
      <Country country={country} />
      <Weather country={country} weather={weather} />
    </div>
  )
}

export default App
