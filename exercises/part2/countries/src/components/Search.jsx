const Search = ({ filter, setFilter }) => {
    const updateSearch = event => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <div>
                find countries
                <input value={filter} onChange={updateSearch} />
            </div>
        </div>
    )
}

export default Search