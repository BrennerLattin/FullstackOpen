import { useEffect, useState } from 'react'

import peopleService from './services/people'

import Notification from './components/Notification'
import Filter from './components/Filter'
import NumberForm from './components/NumberForm'
import Numbers from './components/Numbers'

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotification] = useState(null)

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
        notifySuccess('Added', newPerson)
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
          notifySuccess('Updated', newPerson)
        })
  }

  const deletePerson = (event, person) => {
      event.preventDefault()

    if (confirm(`Delete ${person.name}?`))
      peopleService
        .delete(person.id)
        .then(response => {
          setPeople(people.filter(p => p.id !== person.id))
          notifySuccess('Deleted', person)
        })
    }

  const notifySuccess = (operation, person) => {
    setNotification(`${operation} ${person.name}`)
    setTimeout(() => setNotification(null), 5000)
  }

  const filteredPeople = people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>
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
