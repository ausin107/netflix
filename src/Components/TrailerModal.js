import { useEffect, useState } from 'react'
import Video from './Video'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faCheck, faThumbsUp, faThumbsDown, faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import requests, { baseUrl } from '../Pages/request'
// import { v4 as uuidv4 } from 'uuid';

function TrailerModal({ className, imgUrl, title, movieId }) {
    const [runtime, setRuntime] = useState()
    const [vote, setVote] = useState()
    const [filmType, setFilmType] = useState([])
    const url = `${baseUrl}/movie/${movieId}${requests.fetchMovieDetail}`
    const newClass = `trailer-modal hidden absolute top-0 h-full w-full ${className}`
    // console.log(`${baseUrl}/movie/${movieId}${requests.fetchMovieDetail}`)
    useEffect(() => {
        async function getDetail() {
            const results = await axios.get(url)
            const data = results.data
            const finalTime = `${Math.floor(data.runtime / 60)}h${data.runtime - Math.floor(data.runtime / 60) * 60}m`
            setFilmType(data.genres)
            setRuntime(finalTime)
            setVote(data.vote_average)
            // console.log(filmType)
        }
        getDetail()
    })
    return (
        <div className={newClass} >
            {/* <Video videoUrl={video + id} className='w-full h-full' /> */}
            <img src={imgUrl} className='w-full rounded absolute top-0' />
            <div className='w-full rounded bg-black' style={{ height: '86%' }}>
                <div className='text-white absolute text-base font-sans font-bold pl-5' style={{ top: '39%' }}>{title}</div>
                <div className='flex w-full h-1/2 absolute p-5' style={{ top: '42%' }}>
                    <div className=' w-full h-full'>
                        <FontAwesomeIcon icon={faPlay} size='sm' className=" text-black bg-white mr-2 cursor-pointer hover:opacity-70 traileModalBtn" style={{ padding: '4px 6px' }} />
                        <FontAwesomeIcon icon={faPlus} size='sm' className=" text-white p-1 mr-2 cursor-pointer hover:opacity-70 traileModalBtn" />
                        <FontAwesomeIcon icon={faThumbsUp} size='sm' className=" text-white p-1 mr-2 cursor-pointer hover:opacity-70 traileModalBtn" />
                        <FontAwesomeIcon icon={faThumbsDown} size='sm' className=" text-white p-1 mr-2 cursor-pointer hover:opacity-70 traileModalBtn" />
                    </div>
                    <FontAwesomeIcon icon={faAngleDown} size='sm' className=" text-white cursor-pointer hover:opacity-70 traileModalBtn" style={{ padding: '4px 6px' }} />
                </div>
                <div className='flex absolute pl-5' style={{ top: '60%' }}  >
                    <div className=' text-xs text-green-500 font-bold' >Vote average: {vote * 10}%</div>
                    <div className=' text-xs text-white ml-2 font-normal' >{runtime}</div>
                </div>
                <ul className='flex absolute pl-5' style={{ top: '70%' }}  >
                    {filmType.map((item, index) => {
                        if (index < 3) return (
                            <li className='text-xs text-white font-semibold mr-1' key={item.id}>{item.name}
                                <span className='text-xs text-white font-semibold'>{index != (filmType.length - 1) && index != 2 && ' -'}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
export default TrailerModal