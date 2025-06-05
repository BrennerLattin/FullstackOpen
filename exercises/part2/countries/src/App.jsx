import { useState, useEffect } from 'react'

import Search from './components/Search'
import Country from './components/Country'
import countryService from './services/countryService'
import Countries from './components/Countries'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
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

    setCountries(filteredCountries)

    if (filteredCountries.length === 1)
        setCountry(filteredCountries[0])
    else
        setCountry(null)
  }, [filter])
 

  return (
    <div>
      <Search filter={filter} setFilter={setFilter} />
      <Countries countries={countries} allCountriesLength={allCountries.length} setCountry={setCountry} />
      <Country country={country} />
    </div>
  )
}

export default App
