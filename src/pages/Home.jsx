import MusicPlayer from "../components/MusicPlayer";
import Tabs from "../components/Tabs";
import Songs from "../components/Songs";
import { useTabContext } from "../context/tabContext";
import Search from "../components/Search";
import { useGradientContext } from "../context/gradientContext";

const Home = () => {
    const { tabIndex } = useTabContext()
    const { gradient } = useGradientContext()
    
    console.log({gradient})
    
    return <>
            <div className="h-min-screen w-min-screen">
                <div className="flex gap-20">
                    <img src="/Logo.svg" alt="Spotify Logo" />
                    {tabIndex && <h2 className="text-3xl font-bold">{tabIndex.title}</h2>}
                </div>
                <div className="flex justify-between">
                    <Tabs />
                    <div>
                        <Search />
                        {tabIndex?.value && <Songs playlistId={tabIndex?.value} />}
                    </div>
                    <MusicPlayer />
                </div>
            </div>
    </>
}

export default Home;