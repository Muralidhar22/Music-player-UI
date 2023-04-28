import React, { useState, useRef, useEffect } from "react";
import {
  FaForward,
  FaBackward,
  FaPlay,
  FaPause,
} from "react-icons/fa";

const MusicPlayer = () => {
    const audioPlayer = useRef() // audio tag
    const progressBar = useRef() // seeker(progress)
    const animationRef = useRef()
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    
    useEffect(() => {
      setDuration(Math.floor(audioPlayer.current.duration));
    },[audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState, audioPlayer.current])
    
    const skipMusicHandler = (direction) => {
      if(isPlaying) {
        if(direction == "forward") {
          progressBar.current.value = progressBar.current.value + 10
          audioPlayer.current.currentTime = audioPlayer.current.currentTime + 10
        } else {
          progressBar.current.value = progressBar.current.value - 10 ?  progressBar.current.value - 10 : 0
          audioPlayer.current.currentTime = audioPlayer.current.currentTime - 10 ? audioPlayer.current.currentTime - 10 : 0
        }
      }
    }    
    
    const whilePlaying = () => {
      if(Math.floor(audioPlayer.current.currentTime) === 
      Math.floor(audioPlayer.current.duration)) { 
        cancelAnimationFrame(animationRef.current)
        setIsPlaying(false)
        return
     }
      progressBar.current.value = audioPlayer.current.currentTime
      animationRef.current = requestAnimationFrame(whilePlaying)
    }
    
    const changePlayPause = () => {
      setIsPlaying(prev => !prev)
      if(isPlaying) {
        audioPlayer.current.pause()
        cancelAnimationFrame(animationRef.current)
      }
      else {
        audioPlayer.current.play()
        animationRef.current = requestAnimationFrame(whilePlaying)
      }
    }

    const changeProgress = () => {
      audioPlayer.current.currentTime = progressBar.current.value
    }
    
    return (
       <>
       <audio src="https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3"
        ref={audioPlayer}
        preload = "metadata"
       />
       <div>
        <h1>Title</h1>
        <p>Artist</p>
        <img src="" alt="cover image" />
        <div>
          <input type="range" ref={progressBar} min={0} max={isNaN(duration) ? 100 : duration} onChange={changeProgress} />
        </div>
        <div className="flex justify-between">
            <div>three dots</div>
            <div className="flex gap-2 items-center">
              <span onClick={() => skipMusicHandler("backward")}>
                <FaBackward />
              </span>
              <span onClick={changePlayPause}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </span>
              <span onClick={() => skipMusicHandler("forward")}>
                <FaForward />
              </span>
            </div>
            <div>Sound</div>
        </div>
       </div>
       </> 
    )
}

export default MusicPlayer;