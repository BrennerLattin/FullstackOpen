const Numbers = ({ people }) =>
    <div>
        <h2>Numbers</h2>
        {people.map(person =>
            <p key={person.id}>
                {person.name} {person.number}
            </p>
        )}
    </div>


export default Numbers