import { useQuery,gql } from "@apollo/client"
import { LOAD_SONGS } from "../graphql/Queries";
import SongTile from "./SongTile";

const Songs = ({ playlistId, search }) => {
    const { data, loading } = useQuery(LOAD_SONGS, { variables: { playlistId: parseInt(playlistId), search: search ?? "" }})

    if(loading) {
        return <div>Loading...</div>
    }
    
    if(!data) {
        return null
    }
    
    return <div>
        {data.getSongs.map((val) => (
            <SongTile key={val._id} songData={val}/>
        ))}
    </div>
}

export default Songs;