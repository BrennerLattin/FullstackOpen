import { useEffect, useState } from 'react'
import axios from 'axios'

import peopleService from './services/people'

import Filter from './components/Filter'
import NumberForm from './components/NumberForm'
import Numbers from './components/Numbers'

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    peopleService
      .getAll()
      .then(returnedPeople =>
        setPeople(returnedPeople)
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
    const existingPerson = people.find(person => person.name === newName)
    if (existingPerson) {
      if (existingPerson.number === newNumber)
        alert(`${newName} is already added to the phonebook`)
      else
        updatePerson({ ...existingPerson, number: newNumber })
      return
    }

    const newPerson = { 
      name: newName, 
      number: newNumber,
    }

    peopleService
      .create(newPerson)
      .then(returnedPerson => {
        setPeople(people.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const updatePerson = newPerson => {
    if (confirm(`${newPerson.name} is already added to the phonebook. Replace the existing number with a new one?`))
      peopleService
        .update(newPerson)
        .then(updatedPerson => {
          setPeople(people.map(
            person => person.id === newPerson.id ? updatedPerson : person
          ))
          setNewName('')
          setNewNumber('')
        })
  }

  const deletePerson = (event, person) => {
      event.preventDefault()

    if (confirm(`Delete ${person.name}?`))
      peopleService
        .delete(person.id)
        .then(response =>
          setPeople(people.filter(p => p.id !== person.id))
        )
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
      
      <Numbers 
        people={filteredPeople}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
