import './Components.css'
import {VolumeUpIcon, VolumeOffIcon} from '@heroicons/react/outline'
import  { useReducer, useRef, useState } from "react";
import ReactPlayer from "react-player";
function Video({ videoId, className }) {
  const [mute, setMute] = useState(true);
  const [status, setStatus] = useState(false)
  const ref = useRef();
  const videoUrl = 'https://www.youtube.com/embed/' + videoId
  const handleClick = () => {
    const check = mute == true ? false : true;
    setMute(check)
  }
  return (
    <div>
      <ReactPlayer
        ref={ref}
        className="absolute react-player bottom-4vw pointer-events-none"
        url={videoUrl}
        playing={true}
        muted={mute}
        loop={true}
        // onPlay={handlePlay}
      />
      <button className="absolute text-white text-lg z-20 soundClass" onClick={handleClick}>
        {
          mute == true ? <VolumeOffIcon  className=' w-1.5vw' /> : <VolumeUpIcon className=' w-1.5vw' />
        }
      </button>
    </div>
  )
}
export default Video