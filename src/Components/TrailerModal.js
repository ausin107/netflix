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
            <div className='w-full rounded bg-black h-full flex flex-col'>
                <img src={imgUrl} className='w-full rounded h-fit ' />
                <div className='text-white text-2xl font-sans font-bold pl-5'>{title}</div>
                <div className='flex w-full p-5' >
                    <div className=' w-full'>
                        <FontAwesomeIcon icon={faPlay} size='xl' className=" text-black bg-white mr-2 cursor-pointer hover:opacity-70 traileModalBtn" style={{ padding: '4px 6px' }} />
                        <FontAwesomeIcon icon={faPlus} size='xl' className=" text-white p-1 mr-2 cursor-pointer hover:opacity-70 traileModalBtn" />
                        <FontAwesomeIcon icon={faThumbsUp} size='xl' className=" text-white p-1 mr-2 cursor-pointer hover:opacity-70 traileModalBtn" />
                        <FontAwesomeIcon icon={faThumbsDown} size='xl' className=" text-white p-1 mr-2 cursor-pointer hover:opacity-70 traileModalBtn" />
                    </div>
                    <FontAwesomeIcon icon={faAngleDown} size='xl' className=" text-white cursor-pointer hover:opacity-70 traileModalBtn" style={{ padding: '4px 6px' }} />
                </div>
                <div className='flex pl-5' >
                    <div className=' text-lg text-green-500 font-bold' >Vote average: {vote * 10}%</div>
                    <div className=' text-lg text-white ml-2 font-normal tracking-wide' >{runtime}</div>
                </div>
                <ul className='flex pl-5 mt-5' >
                    {filmType.map((item, index) => {
                        if (index < 3) return (
                            <li className='text-base text-white font-semibold mr-1 tracking-wide' key={item.id}>{item.name}
                                <span className='text-base text-white font-semibold'>{index != (filmType.length - 1) && index != 2 && ' -'}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
export default TrailerModal