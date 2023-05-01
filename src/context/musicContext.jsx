import { createContext, useContext, useState } from "react";

const MusicContext = createContext({
    music: null,
    setMusic: () => {}
})

export const MusicProvider = ({ children }) => {
    const [allSongs, setAllSongs] = useState()
    const [musicNum, setMusicNum] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentSongData, setCurrentSongData] = useState()
    
    const value = {
        currentSongData,
        setCurrentSongData,
        musicNum,
        setMusicNum,
        isPlaying,
        setIsPlaying,
        setSearchTerm,
        searchTerm,
        allSongs,
        setAllSongs
    }
    return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
}

export const useMusicContext = () => {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error('useMusicContext must be used within a MusicProvider');
    }
  return context;
}