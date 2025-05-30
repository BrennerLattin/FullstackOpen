import { useEffect, useState } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import NumberForm from './components/NumberForm'
import Numbers from './components/Numbers'

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response =>
        setPeople(response.data)
      )
  }, [])

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInput = (event) => {
    setFilter(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (newName.length === 0 || newNumber.length === 0) {
      alert("Please enter a name and number")
      return
    }
    if (people.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const newPerson = { 
      name: newName, 
      number: newNumber,
      id: String(people.length + 1)
    }
    
    setPeople(people.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const filteredPeople = people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterInput={handleFilterInput} />
      
      <NumberForm 
        newName={newName} newNumber={newNumber} 
        handleNameInput={handleNameInput} handleNumberInput={handleNumberInput} onSubmit={onSubmit} 
      />
      
      <Numbers people={filteredPeople} />
    </div>
  )
}

export default App
