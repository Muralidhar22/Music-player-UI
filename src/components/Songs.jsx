import { useQuery } from "@apollo/client"
import { LOAD_SONGS } from "../graphql/Queries";
import SongTile from "./SongTile";
import LoadingPulse from "./LoadingPulse";
import { useMusicContext } from "../context/musicContext";
import { useEffect } from "react";

const Songs = ({ playlistId }) => {
    const { searchTerm, setAllSongs, allSongs } = useMusicContext()
    const { data, loading } = useQuery(LOAD_SONGS, { variables: { playlistId: parseInt(playlistId), search: searchTerm ?? "" }})

    useEffect(() => {
        if(data) {
            setAllSongs(data.getSongs)
        }
    },[data])
    
    if(loading) {
        const loadingAnimation = Array.from({ length: 10 }, (_, index) => (
            <div key={index}><LoadingPulse /></div>
          ));
        return loadingAnimation;
    }
    
    if(data.getSongs.length === 0 && searchTerm) {
       return <div className="my-10 mx-auto text-center">Couldn't find "{searchTerm}"</div>
    }

    if(!data) {
        return null
    }
    
    return <div className="w-full">
        {allSongs?.map((val, idx) => (
            <SongTile 
                key={val._id} 
                next={data.getSongs[idx + 1] ? idx + 1 : 0}
                prev={data.getSongs[idx - 1] ? idx - 1 : allSongs.length - 1} 
                songId={val._id}
                songIdx={idx}
            />
        ))}
    </div>
}

export default Songs;