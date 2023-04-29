import React, { useState, useRef, useEffect } from "react";
import {
  FaForward,
  FaBackward,
  FaPlay,
  FaPause,
} from "react-icons/fa";
import { useMusicContext } from "../context/musicContext";

const MusicPlayer = ({ src }) => {
    const audioPlayer = useRef(null) // audio tag
    const progressBar = useRef(null) // seeker(progress)
    const animationRef = useRef(null)
    const { music, isPlaying, setIsPlaying } = useMusicContext()
 
    useEffect(() => {
      if(music) {
        console.log("whattt",{ music })
        audioPlayer.current.currentTime = 0
        progressBar.current.value = audioPlayer.current.currentTime
      }
    },[music])
    
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
        setIsPlaying(prev => !prev)
        return
     }
      progressBar.current.value = audioPlayer.current.currentTime
      animationRef.current = requestAnimationFrame(whilePlaying)
    }
    
    const changePlayPause = () => {
      if(isPlaying) {
        audioPlayer.current.pause()
        cancelAnimationFrame(animationRef.current)
        console.log(audioPlayer.current.currentTime, progressBar.current.value)
      }
      else {
        if(audioPlayer.current.currentTime === audioPlayer.current.duration) {
          audioPlayer.current.currentTime = 0
          progressBar.current.value = 0
        }
        else audioPlayer.current.currentTime = progressBar.current.value
        audioPlayer.current.play()
        animationRef.current = requestAnimationFrame(whilePlaying)
      }
      setIsPlaying(prev => !prev)
    }

    const changeProgress = () => {
      audioPlayer.current.currentTime = progressBar.current.value
    }
    
    if(!music) {
      return <div>Tune in</div>
    }

    return (
       <>
       <audio src={music?.url}
        ref={audioPlayer}
        preload="metadata"
       />
       <div>
        <h1>{music?.title}</h1>
        <p>{music?.artist}</p>
        <img src={music.photo} alt="cover image" />
        <div>
          <input type="range" ref={progressBar} min={0} max={isNaN(audioPlayer.current?.duration) ? 100 : audioPlayer.current?.duration} onChange={changeProgress} />
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