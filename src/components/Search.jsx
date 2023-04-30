import { useState, useRef } from "react";
import { useMusicContext } from "../context/musicContext";

const Search = () => {
    const [searchValue, setSearchValue] = useState()
    const { searchTerm, setSearchTerm } = useMusicContext()
    const timerRef = useRef()
    
    const onChangeHandler = (e) => {
        setSearchValue(e.target.value.toLowerCase())
        if(!searchTerm) setSearchTerm(e.target.value) 
        else {
            clearTimeout(timerRef.current)
            timerRef.current = setTimeout(() => {
                setSearchTerm(e.target.value.toLowerCase())
            }, 300)
        }
    }
   
    return <>
        <div className="bg-zinc-700/50 rounded-md flex gap-1.5 p-3 lg:mb-4 flex-grow">
            <img src="/search.svg" />
            <input className="bg-transparent block w-full outline-none" placeholder="Search Songs, Artists" onChange={onChangeHandler} value={searchValue} type="search" />
        </div>
    </>
}

export default Search;