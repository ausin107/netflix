import { useEffect, useState } from 'react'
import Video from './Video'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faCheck, faThumbsUp, faThumbsDown, faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import requests, { baseUrl } from '../Pages/request'
import DetailModal from './DetailModal'
function TrailerModal({ className, imgUrl, title, movieId, apiType }) {
    const [runtime, setRuntime] = useState()
    const [seasons, setSeasons] = useState()
    const [vote, setVote] = useState()
    const [filmType, setFilmType] = useState([])
    const [onClick, setOnClick] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const url = apiType == 'movieApi' ? `${baseUrl}/movie/${movieId}${requests.fetchVideoDetail}` : `${baseUrl}/tv/${movieId}${requests.fetchVideoDetail}`
    const newClass = `trailer-modal hidden absolute top-0 h-full w-full ${className}`
    useEffect(() => {
        async function getDetail() {
            try {
                const results = await axios.get(url)
                const data = results.data
                const finalTime = apiType == 'movieApi' ? `${Math.floor(data.runtime / 60)}h${data.runtime - Math.floor(data.runtime / 60) * 60}m` : ''
                const season = apiType == 'tvApi' ? data.number_of_seasons : ''
                season > 1 ? setSeasons(`${season} Seasons`) : setSeasons(`${season} Season`)
                setFilmType(data.genres)
                setRuntime(finalTime)
                setVote(data.vote_average)
                // console.log(filmType)
            } catch (error) {
                // console.log(error)
            }
        }
        getDetail()
    }, [movieId])
    const handleClick = () => {
        setIsShow(true)
        document.getElementById('container').classList.add('overflow-y-hidden', 'h-screen')
    }
    const handleClose = () => {
        setIsShow(false)
        document.getElementById('container').classList.remove('overflow-y-hidden', 'h-screen')
    }
    return (
        <div className={newClass} >
            <div className='w-full rounded bg-black h-full flex flex-col'>
                <img src={imgUrl} className='w-full rounded h-fit ' />
                <div className='text-white text-1.5vw font-sans font-bold pl-1.5vw'>{title}</div>
                <div className='flex w-full p-1.5vw' >
                    <div className=' w-full'>
                        <FontAwesomeIcon icon={faPlay} className=" text-black p-0.5vw px-0.7vw mr-0.5vw cursor-pointer hover:opacity-70 traileModalBtn bg-white text-1.5vw" />
                        <FontAwesomeIcon icon={faPlus} className=" text-white p-0.5vw px-0.6vw mr-0.5vw cursor-pointer hover:opacity-70 traileModalBtn text-1.5vw" />
                        <FontAwesomeIcon icon={faThumbsUp} className=" text-white p-0.5vw px-0.5vw mr-0.5vw cursor-pointer hover:opacity-70 traileModalBtn text-1.5vw" />
                        <FontAwesomeIcon icon={faThumbsDown} className=" text-white p-0.5vw px-0.5vw cursor-pointer hover:opacity-70 traileModalBtn text-1.5vw" />
                    </div>
                    <FontAwesomeIcon icon={faAngleDown} className=" text-white p-0.5vw px-0.7vw cursor-pointer hover:opacity-70 traileModalBtn text-1.5vw" onClick={handleClick} />
                    <DetailModal detailUrl={url} apiType={apiType} onShow={isShow} onClose={handleClose} />
                </div>
                <div className='flex pl-1.5vw ' >
                    <div className=' text-1.2vw text-green-500 font-bold' >Vote average: {vote * 10}%</div>
                    <div className=' text-1.2vw text-white ml-0.5vw font-normal tracking-wide' >{runtime || seasons}</div>
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