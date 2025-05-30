const NumberForm = ({ newName, newNumber, handleNameInput, handleNumberInput, onSubmit }) =>
    <div>
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
    </div>

export default NumberForm