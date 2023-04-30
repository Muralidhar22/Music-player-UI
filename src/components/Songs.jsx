import { useQuery } from "@apollo/client"
import { LOAD_SONGS } from "../graphql/Queries";
import SongTile from "./SongTile";
import LoadingPulse from "./LoadingPulse";
import { useMusicContext } from "../context/musicContext";

const Songs = ({ playlistId }) => {
    const { searchTerm } = useMusicContext()
    const { data, loading } = useQuery(LOAD_SONGS, { variables: { playlistId: parseInt(playlistId), search: searchTerm ?? "" }})

    if(loading) {
        const loadingAnimation = Array.from({ length: 10 }, (_, index) => (
            <div key={index}><LoadingPulse /></div>
          ));
        return loadingAnimation;
    }
    
    if(data.getSongs.length === 0 && searchTerm) {
       return <div className="my-10 mx-auto text-center">Couldn't find "{searchTerm}"</div>
    }
    console.log(data && searchTerm)
    if(!data) {
        return null
    }
    
    return <div className="w-full">
        {data.getSongs.map((val) => (
            <SongTile key={val._id} songData={val}/>
        ))}
    </div>
}

export default Songs;