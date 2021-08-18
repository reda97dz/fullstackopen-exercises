import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Content from './components/Content'


const App = () => {
  const [countriesToShow, setCountriesToShow] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => 
        setCountries(response.data))
  }

  useEffect(hook, [])

  // console.log(countries[0])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if (newFilter) {
      const regex = new RegExp(newFilter, 'i')
      const foundCountries = () => countries.filter(country => country.name.match(regex))
      setCountriesToShow(foundCountries)
      console.log(countriesToShow)
    }
  }

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Content list={countriesToShow} setCountries={setCountriesToShow} />
    </div>   
  )
}

export default App