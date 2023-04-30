import { useState, useRef } from "react";

const Search = () => {
    const [searchValue, setSearchValue] = useState()
    const timerRef = useRef()
    const [isSearchBarDisplayed, setIsSearchBarDisplayed] = useState(false)
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState()

    const onChangeHandler = (e) => {
        setSearchValue(e.target.value.toLowerCase())
        if(!debouncedSearchTerm) setDebouncedSearchTerm(e.target.value) 
        else {
            clearTimeout(timerRef.current)
            timerRef.current = setTimeout(() => {
                setDebouncedSearchTerm(e.target.value)
            }, 500)
        }
    }
   
    return <>
        <div className="bg-zinc-700/50 rounded-md flex p-3 lg:mb-4">
            <input className="bg-transparent block w-full outline-none" placeholder="Search Songs, Artists" onChange={onChangeHandler} value={searchValue} type="search" />
            <img src="/search.svg" />
        </div>
    </>
}

export default Search;