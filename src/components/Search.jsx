

const Search = () => {
    return <>
        <div className="bg-zinc-700 rounded-md flex p-2">
            <input className="bg-transparent block w-full outline-none" placeholder="Search song" type="search" />
            <img src="/search.svg" />
        </div>
    </>
}

export default Search;