
import { LOAD_PLAYLISTS } from "../graphql/Queries";
import { useQuery } from "@apollo/client";

function formatString(str) {
    const words = str.split(' ');
    const formattedWords = words.map(word => word.toLowerCase());
    return formattedWords.join('-');
  }

const Navigation = () => {
    const { data, error, loading } = useQuery(LOAD_PLAYLISTS)

    if(!data) {
       return null 
    }
    
    return (
        <>
          <aside>
            <nav>

            </nav>
          </aside>
        </>
    )
}

export default Navigation;