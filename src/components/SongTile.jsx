import { useGradientContext } from "../context/gradientContext";
import { useMusicContext } from "../context/musicContext";
import { convertMusicDuration } from "../utils/convertMusicDuration";
import { memo, useRef } from "react";
import ColorThief from "colorthief";
import { arrayToRgb } from "../utils/arrayToRgb";
import { useModalContext } from "../context/ModalContext";

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


const SongTile = ({ songIdx, next, prev }) => {
    const { setMusicNum, allSongs, musicNum, setCurrentSongData } = useMusicContext()
    const { artist, duration, photo, title } = allSongs[songIdx]
    const convertedDuration = convertMusicDuration(duration)
    const { setGradient } = useGradientContext()
    const { isModalOpen, setIsModalOpen } = useModalContext()
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
        const newMusicData = {prev, current: songIdx, next}
        setMusicNum(newMusicData)
        setCurrentSongData(allSongs[songIdx])
        isModalOpen && setIsModalOpen(prev => !prev)
    }
    
    return (<div onClick={handleSongClick} className={`flex gap-3 items-center p-2 cursor-pointer ${songIdx === musicNum?.current && "bg-white/10 rounded-md"}`}>
        <div className="overflow-hidden rounded-full">
            <img ref={imageRef} className="block w-14 h-12" src={photo} alt={title} />
        </div>
        <div className="flex justify-between w-full items-center">
            <div>
                <h3 className="">{title}</h3>
                <div className="opacity-40">{artist}</div>
            </div>
            <div className="opacity-40">{convertedDuration}</div>
        </div>
    </div>)
}

export default memo(SongTile);