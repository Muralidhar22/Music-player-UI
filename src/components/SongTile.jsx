import { useGradientContext } from "../context/gradientContext";
import { useMusicContext } from "../context/musicContext";
import { convertMusicDuration } from "../utils/convertMusicDuration";
import { memo } from "react";

const SongTile = ({ songData }) => {
    const { artist, duration, photo, title } = songData
    const convertedDuration = convertMusicDuration(duration)
    const { updateBgGradient } = useGradientContext()
    const {  } = useMusicContext()
    
    const handleSongClick = () => {
        updateBgGradient(photo)
    }
    
     
    return (<div onClick={handleSongClick} className="flex p-2 cursor-pointer">
        <div className="overflow-hidden rounded-full">
            <img className="block w-12 h-12" src={photo} alt={title} />
        </div>
        <div className="flex justify-between">
            <div>
                <h3>{title}</h3>
                <div>{artist}</div>
            </div>
            <div>{convertedDuration}</div>
        </div>
    </div>)
}

export default memo(SongTile);