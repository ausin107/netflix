import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faCheck, faThumbsUp, faThumbsDown, faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import requests, { baseUrl } from '../adapters/request'
import DetailModal from './DetailModal'
import { CircleIcon } from '../components/icon'
function TrailerModal({videoData}) {
    const [runtime, setRuntime] = useState()
    const [seasons, setSeasons] = useState()
    const [vote, setVote] = useState()
    const [adult, setAdult] = useState()
    const [filmType, setFilmType] = useState([])
    const [isShow, setIsShow] = useState(false)
    // const [detailModalClass, setClasses] = useState()
    const modalRef = useRef()
    const detailData = {
        apiType: videoData.apiType,
        moviesRank: videoData.moviesRank,
        moviesGenre: videoData.moviesGenre,
        detailUrl: videoData.apiType == 'movieApi' ? `${baseUrl}/movie/${videoData.movieId}${requests.fetchVideoDetail}` : `${baseUrl}/tv/${videoData.movieId}${requests.fetchVideoDetail}`,
        creditsUrl: videoData.apiType == 'movieApi' ? `${baseUrl}/movie/${videoData.movieId}/${requests.fetchCreditsInfo}` : `${baseUrl}/tv/${videoData.movieId}/${requests.fetchCreditsInfo}`,
        similarUrl: videoData.apiType == 'movieApi' ? `${baseUrl}/movie/${videoData.movieId}/${requests.fetchSimilarVideo}` : `${baseUrl}/tv/${videoData.movieId}/${requests.fetchSimilarVideo}`,
        episodesUrl: `${baseUrl}/tv/${videoData.movieId}/season/1${requests.fetchVideoDetail}`,
    }
    const newClass = `trailer-modal hidden absolute top-0 h-full w-full ${videoData.className}`
    useEffect(() => {
        async function getDetail() {
            try {
                const results = await axios.get(detailData.detailUrl)
                const data = results.data
                const finalTime = videoData.apiType == 'movieApi' ? `${Math.floor(data.runtime / 60)}h${data.runtime - Math.floor(data.runtime / 60) * 60}m` : ''
                const season = videoData.apiType == 'tvApi' ? data.number_of_seasons : ''
                season > 1 ? setSeasons(`${season} Seasons`) : setSeasons(`${season} Season`)
                setAdult(data.adult)
                setFilmType(data.genres)
                setRuntime(finalTime)
                setVote(data.vote_average)
            } catch (error) {
                // console.log(error)
            }
        }
        getDetail()
    }, [videoData.movieId])
    const handleClick = () => {
        setIsShow(true)
        document.getElementById('container').classList.add('overflow-y-hidden', 'h-screen')
    }
    const handleClose = () => {
        setIsShow(false)
        document.getElementById('container').classList.remove('overflow-y-hidden', 'h-screen')
    }
    const handleTitle = () => {
        return videoData.title
    }
    return (
        <div className={newClass} ref={modalRef}>
            <div className='w-full rounded bg-black h-fit flex flex-col'>
                <img src={videoData.imgUrl} className='w-full rounded h-fit ' onClick={handleClick} />
                <div className='text-white text-1.5vw font-sans font-bold pl-1.5vw' onClick={handleClick}>{handleTitle()}</div>
                <div className='flex w-full p-1.5vw'>
                    <div className='w-full flex'>
                        <CircleIcon iconType={faPlay} className='text-black px-0.7vw mr-0.5vw traileModalBtn bg-white'  />
                        <CircleIcon iconType={faPlus} className='px-0.6vw mr-0.5vw traileModalBtn text-white' tooltipText='Add To My List' tooltipClass='-left-88%'/>
                        <CircleIcon iconType={faThumbsUp} className='text-white px-0.5vw mr-0.5vw traileModalBtn' tooltipText='I like this' tooltipClass='-left-46%'/>
                        <CircleIcon iconType={faThumbsDown} className='text-white px-0.5vw traileModalBtn' tooltipText='Not for me' tooltipClass='-left-75%'/>
                    </div>
                    <CircleIcon iconType={faAngleDown} className='text-white p-0.5vw px-0.7vw traileModalBtn ' onShowInfo={handleClick} tooltipText='Episodes & info' tooltipClass='-left-108%'/>
                    <DetailModal
                        // className={detailModalClass}
                        detailData={detailData}
                        onShow={isShow}
                        onClose={handleClose}
                    />
                </div>
                <div className='flex pl-1.5vw items-center' onClick={handleClick}>
                    <div className=' text-1.2vw text-green-500 font-bold' >Vote: {vote * 10}%</div>
                    <div
                        className='text-white px-0.5vw mx-0.5vw'
                        style={{ border: 'rgba(255,255,255,.5) solid 1px', lineHeight: '1.1vw', paddingBottom: '1px' }}
                    >
                        {adult == true ? '18+' : '16+'}
                    </div>
                    <div className=' text-1.2vw text-white font-normal tracking-wide' >{runtime || seasons}</div>
                </div>
                <ul className='flex pl-1.5vw my-1.5vw' onClick={handleClick}>
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