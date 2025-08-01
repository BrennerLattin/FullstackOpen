const Note = ({ note, toggleImportance, deleteNote }) => {
    const label = note.important ? 'mark unimportant' : 'mark important'

    return (
        <li className="note">
            {note.content}
            <button onClick={toggleImportance}>{label}</button>
            <button onClick={deleteNote}>delete</button>
        </li>
    )
}

export default Note