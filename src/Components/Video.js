import './Components.css'
import { VolumeUpIcon, VolumeOffIcon, ViewGridIcon } from '@heroicons/react/outline'
import { useReducer, useRef, useState,forwardRef } from "react";
import ReactPlayer from "react-player";

function Video({ videoUrl, className, overViewRef, textRef }, ref) {
  const [mute, setMute] = useState(true);
  const [volume, setVolume] = useState(0);
  const [url, setUrl] = useState()
  const videoRef = useRef()
  const volumeRef = useRef()
  const state = videoRef.current
  const handleClick = () => {
    const check = mute == true ? false : true;
    setMute(check)
    setVolume(0.3)
  }
  const handleProgress = () => {
    // console.log(state.getDuration() - state.getCurrentTime())
    if (state.getDuration() - state.getCurrentTime() < 10) {
      setUrl('')
      overViewRef.classList.remove('bannerOverView')
      textRef.classList.remove('bannerText')
      volumeRef.current.classList.add('hidden')
    }
    // console.log(state.getCurrentTime())
    // console.log(state.getDuration())
  }
  const handlePlay = () => {
    // console.log(overViewRef.classList)
    overViewRef.classList.add('bannerOverView')
    textRef.classList.add('bannerText')
    volumeRef.current.classList.remove('hidden')
  }
  const handleError = () => {
    setUrl('')
  }
  const newClass = `absolute w-full top-0 h-full ${className}`
  return (
    <div className={newClass} >
      <ReactPlayer
        ref={videoRef}
        className="absolute react-player bottom-4vw pointer-events-none"
        url={url ?? videoUrl}
        playing={true}
        muted={mute}
        volume={volume}
        // loop={true}
        onProgress={handleProgress}
        // onReady={handleReady}
        onPlay={handlePlay}
        onError={handleError}
        onPause={handleError}
      />
      <button ref={volumeRef} className=" text-white text-lg z-20 soundClass hidden" onClick={handleClick}>
        {
          mute == true ? <VolumeOffIcon  className='w-1.5vw' /> : <VolumeUpIcon className=' w-1.5vw' />
        }
      </button>
    </div>
  )
}
const videoRef = forwardRef(Video)
export default videoRef
// export default Video