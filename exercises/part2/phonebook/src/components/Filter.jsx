const Filter = ({ filter, handleFilterInput }) =>
    <div>
        Filter Names <input value={filter} onChange={handleFilterInput} />
    </div>
    
export default Filter