import { useEffect, useState } from 'react'
import noteService from './services/notes'

import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
      .then(notes => 
        setNotes(notes)
      )
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    
    const note = {
      content: newNote,
      important: Math.random() < 0.5
    }

    noteService
      .create(note)
      .then(note => {
        setNotes(notes.concat(note))
        setNewNote('')
      })    
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportance = id => {
    const note = notes.find(note => note.id === id)
    const updatedNote = { ...note, important: !note.important }

    noteService
      .update(id, updatedNote)
      .then(returnedNote =>
        setNotes(
          notes.map(note => note.id === id ? returnedNote : note)
        )
      )
  }

  const deleteNote = id => {
    noteService
      .delete(id)
      .then(response =>
        setNotes(notes.filter(note => note.id !== id))
      )
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note 
            key={note.id} 
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
            deleteNote={() => deleteNote(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange} 
        />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App
