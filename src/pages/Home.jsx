import MusicPlayer from "../components/MusicPlayer";
import Tabs from "../components/Tabs";
import Songs from "../components/Songs";
import { useTabContext } from "../context/tabContext";
import Search from "../components/Search";
import ModalMenu from "../components/ModalMenu";

const Home = () => {
    const { tabIndex } = useTabContext()
    
    return <>
            <div className="lg:grid lg:grid-cols-[0.75fr_1.5fr_2fr] gap-y-7">
                <div className="flex justify-between">
                    <img src="/Logo.svg" alt="Spotify Logo" />
                    <div className="lg:hidden">
                        <ModalMenu />
                    </div>
                </div>
                {tabIndex && <h2 className="hidden lg:block text-3xl font-bold lg:col-start-2 lg:col-end-4">{tabIndex.title}</h2>}
                    <div className="hidden lg:block lg:w-2/3">
                        <Tabs />
                    </div>
                    <div className="hidden lg:block lg:w-5/6">
                        <Search />
                        {tabIndex?.value && <Songs playlistId={tabIndex?.value} />}
                    </div>
                    <div className="lg:mx-auto">
                        <MusicPlayer />
                    </div>
               <div className="hidden rounded-full overflow-hidden w-10 h-10 lg:block sticky bottom-2 left-2">
                <img src="/profile-pic.png" className="block" />
               </div>
            </div>
    </>
}

export default Home;