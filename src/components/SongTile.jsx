import { useGradientContext } from "../context/gradientContext";
import { useMusicContext } from "../context/musicContext";
import { convertMusicDuration } from "../utils/convertMusicDuration";
import { memo, useRef } from "react";
import ColorThief from "colorthief";
import { arrayToRgb } from "../utils/arrayToRgb";

const getBase64 = async(url)=>{
try {
    // Fetch the image as a Blob
    const response = await fetch(url);
    const blob = await response.blob();

    // Create a new FileReader instance
    const reader = new FileReader();

    // Read the contents of the Blob as a data URL
    reader.readAsDataURL(blob);

    // Return a promise that resolves with the base64 encoded string
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64String = reader.result;
        resolve(base64String);
      };

      reader.onerror = reject;
    });
  } catch (error) {
    console.log(error);
  } 
 }


const SongTile = ({ songData }) => {
    const { artist, duration, photo, title } = songData
    const convertedDuration = convertMusicDuration(duration)
    const { setGradient } = useGradientContext()
    const { setMusic } = useMusicContext()
    const imageRef = useRef()
    
    const handleSongClick = async () => {
        const imageData = await getBase64(photo)
        const colorThief = new ColorThief()
        const image = new Image()
        image.src = imageData
        image.onload = function () {
            const gradientColor = colorThief.getColor(image)
            const rgbValue = arrayToRgb(gradientColor)
            setGradient(rgbValue)
        }
        setMusic(songData)
    }
    
    return (<div onClick={handleSongClick} className="flex p-2 cursor-pointer gap-3">
        <div className="overflow-hidden rounded-full">
            <img ref={imageRef} className="block w-12 h-12" src={photo} alt={title} />
        </div>
        <div className="flex justify-between">
            <div>
                <h3 className="text-lg">{title}</h3>
                <div>{artist}</div>
            </div>
            <div>{convertedDuration}</div>
        </div>
    </div>)
}

export default memo(SongTile);