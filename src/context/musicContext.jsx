import { createContext, useContext, useState } from "react";

const MusicContext = createContext({
    music: null,
    setMusic: () => {}
})

export const MusicProvider = ({children}) => {
    const [music, setMusic] = useState(null)
    const value = {
        music,
        setMusic
    }
    return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
}

export const useMusicContext = () => {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error('useTabContext must be used within a TabProvider');
    }
  return context;
}