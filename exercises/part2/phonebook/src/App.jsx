import { useState } from 'react'

const Numbers = ({ people }) => {
  return (
    <div>
      <li>
        {people.map(person =>
          <ul key={person.name}>
            {person.name}
          </ul>
        )}
      </li>
    </div>
  )
}

const App = () => {
  const [people, setPeople] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (newName.length === 0) {
      alert("Please enter a name")
      return
    }
    if (people.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const newPerson = { name: newName }

    
    setPeople(people.concat(newPerson))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameInput}/>
        </div>
        <div>
          <button type="submit" onClick={onSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers people={people} />
    </div>
  )
}

export default App
