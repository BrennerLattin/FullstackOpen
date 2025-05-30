import { useState } from 'react'

const Numbers = ({ people }) => {
  return (
    <div>
      <li>
        {people.map(person =>
          <ul key={person.name}>
            {person.name} {person.number}
          </ul>
        )}
      </li>
    </div>
  )
}

const App = () => {
  const [people, setPeople] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

    const newPerson = { name: newName, number: newNumber }
    
    setPeople(people.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const filteredPeople = people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      Filter Names <input value={filter} onChange={handleFilterInput} />
      <h2>Add an Entry</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameInput}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInput}/>
        </div>
        <div>
          <button type="submit" onClick={onSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers people={filteredPeople} />
    </div>
  )
}

export default App
