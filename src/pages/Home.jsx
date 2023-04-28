import MusicPlayer from "../components/MusicPlayer";
import Tabs from "../components/Tabs";
import { useEffect } from "react";
import Songs from "../components/Songs";
import { useTabContext } from "../context/tabContext";


const Home = () => {
    const { tabIndex } = useTabContext()
    useEffect(() => {
//   "https://images.genius.com/f2f383e82d33c1f4b4c5a46c55039513.582x594x1.jpg"
        const coverImg = new Image()
        coverImg.onload = function () { 
            const what = colorThief.getColor(coverImg) 
            console.log(what)
        }
        coverImg.src="https://images.genius.com/f2f383e82d33c1f4b4c5a46c55039513.582x594x1.jpg"
        coverImg.crossOrigin = 'Anonymous';
    },[])

    return <>
            <div className="h-min-screen w-min-screen">
                <Tabs />
                <MusicPlayer />
                <Songs playlistId={tabIndex} />
            </div>
    </>
}

export default Home;