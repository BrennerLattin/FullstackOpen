const Numbers = ({ people, deletePerson }) =>
    <div>
        <h2>Numbers</h2>
        {people.map(person =>
            <div key={person.id}>
                {person.name} {person.number}
                <button onClick={event => deletePerson(event, person)}>delete</button>
            </div>
        )}
        
    </div>


export default Numbers