import { useEffect, useState } from 'react'

import './index.css'
import noteService from './services/notes'
import Notification from './components/Notification'
import Note from './components/Note'
import Footer from './components/Footer'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

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

  const toggleImportance = noteToToggle => {
    const updatedNote = { ...noteToToggle, important: !noteToToggle.important }

    noteService
      .update(noteToToggle.id, updatedNote)
      .then(returnedNote =>
        setNotes(
          notes.map(note => note.id === noteToToggle.id ? returnedNote : note)
        )
      )
      .catch(error => {
        alreadyDeletedError(noteToToggle)
      })
  }

  const deleteNote = noteToDelete => {
    noteService
      .delete(noteToDelete.id)
      .then(response =>
        setNotes(notes.filter(note => note.id !== noteToDelete.id))
      )
      .catch(error => {
        alreadyDeletedError(noteToDelete)
      })
  }

  const alreadyDeletedError = deletedNote => {
    setErrorMessage(`Note '${deletedNote.content}' was already deleted from the server`)
    setNotes(notes.filter(note => note.id !== deletedNote.id))
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
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
            toggleImportance={() => toggleImportance(note)}
            deleteNote={() => deleteNote(note)}
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
      <Footer />
    </div>
  )
}

export default App
