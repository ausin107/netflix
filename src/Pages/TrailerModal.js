import { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faCheck, faThumbsUp, faThumbsDown, faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import requests, { baseUrl } from '../adapters/request'
import DetailModal from './DetailModal'
function TrailerModal({ className, imgUrl, title, movieId, apiType, moviesRank, moviesGenre }) {
    const [runtime, setRuntime] = useState()
    const [seasons, setSeasons] = useState()
    const [vote, setVote] = useState()
    const [adult, setAdult] = useState()
    const [filmType, setFilmType] = useState([])
    const [onClick, setOnClick] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const detailData = {
        apiType: apiType,
        moviesRank: moviesRank,
        moviesGenre: moviesGenre,
        detailUrl: apiType == 'movieApi' ? `${baseUrl}/movie/${movieId}${requests.fetchVideoDetail}` : `${baseUrl}/tv/${movieId}${requests.fetchVideoDetail}`,
        creditsUrl: apiType == 'movieApi' ? `${baseUrl}/movie/${movieId}/${requests.fetchCreditsInfo}` : `${baseUrl}/tv/${movieId}/${requests.fetchCreditsInfo}`,
        similarUrl: apiType == 'movieApi' ? `${baseUrl}/movie/${movieId}/${requests.fetchSimilarVideo}` : `${baseUrl}/tv/${movieId}/${requests.fetchSimilarVideo}`,
        episodesUrl: `${baseUrl}/tv/${movieId}/season/1${requests.fetchVideoDetail}`,
    }
    const newClass = `trailer-modal hidden absolute top-0 h-full w-full ${className}`
    useEffect(() => {
        async function getDetail() {
            try {
                const results = await axios.get(detailData.detailUrl)
                const data = results.data
                const finalTime = apiType == 'movieApi' ? `${Math.floor(data.runtime / 60)}h${data.runtime - Math.floor(data.runtime / 60) * 60}m` : ''
                const season = apiType == 'tvApi' ? data.number_of_seasons : ''
                season > 1 ? setSeasons(`${season} Seasons`) : setSeasons(`${season} Season`)
                setAdult(data.adult)
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
    const handleTitle = () => {
        return title
    }
    return (
        <div className={newClass} >
            <div className='w-full rounded bg-black h-fit flex flex-col'>
                <img src={imgUrl} className='w-full rounded h-fit ' />
                <div className='text-white text-1.5vw font-sans font-bold pl-1.5vw'>{handleTitle()}</div>
                <div className='flex w-full p-1.5vw' >
                    <div className=' w-full'>
                        <FontAwesomeIcon icon={faPlay} className='text-black p-0.5vw px-0.7vw mr-0.5vw cursor-pointer hover:opacity-70 traileModalBtn bg-white text-1.5vw' />
                        <FontAwesomeIcon icon={faPlus} className='text-white p-0.5vw px-0.6vw mr-0.5vw cursor-pointer hover:opacity-70 traileModalBtn text-1.5vw' />
                        <FontAwesomeIcon icon={faThumbsUp} className='text-white p-0.5vw px-0.5vw mr-0.5vw cursor-pointer hover:opacity-70 traileModalBtn text-1.5vw' />
                        <FontAwesomeIcon icon={faThumbsDown} className='text-white p-0.5vw px-0.5vw cursor-pointer hover:opacity-70 traileModalBtn text-1.5vw' />
                    </div>
                    <FontAwesomeIcon icon={faAngleDown} className=' text-white p-0.5vw px-0.7vw cursor-pointer hover:opacity-70 traileModalBtn text-1.5vw' onClick={handleClick} />
                    <DetailModal
                        detailData = {detailData}
                        onShow={isShow}
                        onClose={handleClose}
                    />
                </div>
                <div className='flex pl-1.5vw items-center' >
                    <div className=' text-1.2vw text-green-500 font-bold' >Vote: {vote * 10}%</div>
                    <div
                        className='text-white px-0.5vw mx-0.5vw'
                        style={{ border: 'rgba(255,255,255,.5) solid 1px', lineHeight: '1.1vw', paddingBottom: '1px' }}
                    >
                        {adult == true ? '18+' : '16+'}
                    </div>
                    <div className=' text-1.2vw text-white font-normal tracking-wide' >{runtime || seasons}</div>
                </div>
                <ul className='flex pl-1.5vw my-1.5vw' >
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