import { useRef, useEffect, useState } from "react";
import {
  FaForward,
  FaBackward,
  FaPlay,
  FaPause,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { GoMute } from "react-icons/go";
import { useMusicContext } from "../context/musicContext";

const MusicPlayer = () => {
    const audioPlayer = useRef(null) // audio tag
    const progressBar = useRef(null) // seeker(progress)
    const animationRef = useRef(null)
    const thumbRef = useRef(null)
    const [isMuted, setIsMuted] = useState(false)
    const { musicNum, currentSongData, setCurrentSongData, isPlaying, setIsPlaying, allSongs, setMusicNum } = useMusicContext()
    const music = allSongs && allSongs[musicNum?.current]
 
    useEffect(() => {
      if(currentSongData && audioPlayer.current && progressBar.current) {
        audioPlayer.current.currentTime = 0
        progressBar.current.value = audioPlayer.current.currentTime
        thumbRef.current.style.width = `${(audioPlayer.current.currentTime / audioPlayer.current.duration) * 100}%`;
        setIsPlaying(true)
        audioPlayer.current.play()
        animationRef.current = requestAnimationFrame(whilePlaying)
      }
      return () => {
        cancelAnimationFrame(animationRef.current)
      }
    },[currentSongData])
    
    const skipMusicHandler = (direction) => {
      if(isPlaying) {
        if(direction == "forward") {
          const newMusicNumData = { 
            prev: allSongs[musicNum?.next - 1] ? musicNum?.next - 1 : allSongs.length - 1 ,
            current: musicNum?.next,
            next: allSongs[musicNum?.next + 1] ? musicNum?.next + 1 : 0
           }
          setMusicNum(newMusicNumData)
          setCurrentSongData(allSongs[musicNum?.next])
        } else {
          const newMusicNumData = { 
            prev: allSongs[musicNum?.prev - 1] ? musicNum?.prev - 1 : allSongs.length - 1 ,
            current: musicNum?.prev,
            next: allSongs[musicNum?.prev + 1] ? musicNum?.prev + 1 :  0
           }
          setMusicNum(newMusicNumData)
          setCurrentSongData(allSongs[musicNum?.prev])
        }
      }
    }    
    
    const whilePlaying = () => {
      if(Math.floor(audioPlayer.current.currentTime) === 
      Math.floor(audioPlayer.current.duration)) { 
        cancelAnimationFrame(animationRef.current)
        setIsPlaying(prev => !prev)
        return
     }
      progressBar.current.value = audioPlayer.current.currentTime
      thumbRef.current.style.width = `${(audioPlayer.current.currentTime / audioPlayer.current.duration) * 100}%`;
      animationRef.current = requestAnimationFrame(whilePlaying)
    }
    
    const changePlayPause = () => {
      if(isPlaying) {
        audioPlayer.current.pause()
        cancelAnimationFrame(animationRef.current)
      }
      else {
        if(audioPlayer.current.currentTime === audioPlayer.current.duration) {
          audioPlayer.current.currentTime = 0
          progressBar.current.value = 0
          thumbRef.current.style.width = `${(audioPlayer.current.currentTime / audioPlayer.current.duration) * 100}%`;
        }
        else { 
          audioPlayer.current.currentTime = progressBar.current.value
          thumbRef.current.style.width = `${(audioPlayer.current.currentTime / audioPlayer.current.duration) * 100}%`; 
        }
        audioPlayer.current.play()
        animationRef.current = requestAnimationFrame(whilePlaying)
      }
      setIsPlaying(prev => !prev)
    }

    const changeProgress = () => {
      audioPlayer.current.currentTime = progressBar.current.value
      thumbRef.current.style.width = `${(audioPlayer.current.currentTime / audioPlayer.current.duration) * 100}%`;
    }
    
    const onMuteClick = () => {
      audioPlayer.current.muted = !audioPlayer.current.muted
      setIsMuted(prev => !prev)
    }
    
    if(!music) {
      return <div className="text-white/50 text-3xl font-bold flex justify-center items-center">Tune in</div>
    }

    return (
       <>
       <audio src={currentSongData?.url}
        ref={audioPlayer}
        preload="metadata"
       />
       <div className="lg:w-3/5 mx-auto mt-5 lg:mt-0 p-2">
        <h1 className="text-3xl font-bold mb-2">{currentSongData?.title}</h1>
        <p className="text-base opacity-60 mb-7">{currentSongData?.artist}</p>
        <img src={currentSongData?.photo} alt="cover image" className="block w-128 object-fit rounded-md mb-5 mx-auto" />
        <div className="flex w-full relative mb-5">
          <span ref={thumbRef} className="absolute bg-white h-1.5 z-10 rounded-xl" ></span>
          <input type="range" className="w-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:z-20 [&::-webkit-slider-thumb]:border-none cursor-pointer appearance-none outline-none border-none rounded-xl h-1.5 bg-white/60" ref={progressBar} min={0} max={isNaN(audioPlayer.current?.duration) ? 100 : audioPlayer.current?.duration} onChange={changeProgress} />
        </div>
        <div className="flex justify-between items-center select-none">
            <div className="p-2 grid place-content-center rounded-full bg-white/10"><BsThreeDots /></div>
            <div className="flex gap-5 items-center">
              <span className="cursor-pointer" onClick={() => skipMusicHandler("backward")}>
                <FaBackward className="opacity-60" />
              </span>
              <span className="cursor-pointer text-black bg-white p-3 rounded-full" onClick={changePlayPause}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </span>
              <span className="cursor-pointer" onClick={() => skipMusicHandler("forward")}>
                <FaForward className="opacity-60" />
              </span>
            </div>
            <div onClick={onMuteClick} className="p-2 grid place-content-center rounded-full bg-white/10 cursor-pointer">
              {isMuted ? <GoMute /> : <img src="/sound.svg" className="h-4 w-4" />}
            </div>
        </div>
       </div>
       </> 
    )
}

export default MusicPlayer;