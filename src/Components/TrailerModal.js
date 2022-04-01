import { useEffect, useState } from 'react'
import Video from './Video'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faCheck, faThumbsUp, faThumbsDown, faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import requests, { baseUrl } from '../Pages/request'

function TrailerModal({ className, imgUrl, title, movieId }) {
    const [runtime, setRuntime] = useState()
    const [vote, setVote] = useState()
    const [filmType, setFilmType] = useState([])
    const url = `${baseUrl}/movie/${movieId}${requests.fetchMovieDetail}`
    const newClass = `trailer-modal hidden absolute top-0 h-full w-full ${className}`
    // console.log(`${baseUrl}/movie/${movieId}${requests.fetchMovieDetail}`)
    useEffect(() => {
        async function getDetail() {
            try{
                const results = await axios.get(url)
                const data = results.data
                const finalTime = `${Math.floor(data.runtime / 60)}h${data.runtime - Math.floor(data.runtime / 60) * 60}m`
                setFilmType(data.genres)
                setRuntime(finalTime)
                setVote(data.vote_average)
                // console.log(filmType)
            } catch(error){
                // console.log(error)
            }
        }
        getDetail()
    }, [movieId])
    return (
        <div className={newClass} >
            {/* <Video videoUrl={video + id} className='w-full h-full' /> */}
            <div className='w-full rounded bg-black h-full flex flex-col'>
                <img src={imgUrl} className='w-full rounded h-fit ' />
                <div className='text-white text-1.5vw font-sans font-bold pl-1.5vw'>{title}</div>
                <div className='flex w-full p-1.5vw' >
                    <div className=' w-full'>
                        <FontAwesomeIcon icon={faPlay} className=" text-black mr-0.5 cursor-pointer hover:opacity-70 traileModalBtn bg-white text-1.5vw" style={{ padding: '4px 6px' }} />
                        <FontAwesomeIcon icon={faPlus} className=" text-white p-1 mr-0.5 cursor-pointer hover:opacity-70 traileModalBtn text-1.5vw" />
                        <FontAwesomeIcon icon={faThumbsUp} className=" text-white p-1 mr-0.5 cursor-pointer hover:opacity-70 traileModalBtn text-1.5vw" />
                        <FontAwesomeIcon icon={faThumbsDown} className=" text-white p-1 mr-0.5 cursor-pointer hover:opacity-70 traileModalBtn text-1.5vw" />
                    </div>
                    <FontAwesomeIcon icon={faAngleDown} className=" text-white cursor-pointer hover:opacity-70 traileModalBtn text-1.5vw" style={{ padding: '4px 6px' }} />
                </div>
                <div className='flex pl-1.5vw ' >
                    <div className=' text-1.2vw text-green-500 font-bold' >Vote average: {vote * 10}%</div>
                    <div className=' text-1.2vw text-white ml-0.5 font-normal tracking-wide' >{runtime}</div>
                </div>
                <ul className='flex pl-1.5vw mt-1.5vw' >
                    {filmType.map((item, index) => {
                        if (index < 3) return (
                            <li className='text-1vw text-white font-semibold mr-1 tracking-wide' key={item.id}>{item.name}
                                <span className='text-1vw text-white font-semibold'>{index != (filmType.length - 1) && index != 2 && ' -'}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
export default TrailerModal