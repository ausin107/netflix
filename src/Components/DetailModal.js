import { useEffect, useRef, useState } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import Banner from './Banner'
import Button from './Button'
import Video from './Video'
import requests from '../Pages/request'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faThumbsUp, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
function DetailModal({ detailUrl, apiType, onClose, onShow, creditsUrl }) {
    const [banner, setBanner] = useState([])
    const [overView, setOverView] = useState('')
    const [title, setTitle] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [volumeClassName, setVolumeClassName] = useState('')
    const [playVideo, setPlayVideo] = useState(false)
    const [releaseDate, setDate] = useState('')
    const [voteAverage, setVoteAverage] = useState('')
    const [runtime, setRuntime] = useState('')
    const bannerUrl = 'https://image.tmdb.org/t/p/original/'
    const overViewRef = useRef()
    const textRef = useRef()
    const videoRef = useRef()
    useEffect(() => {
        async function getBanner() {
            try {
                const baseUrl = 'https://api.themoviedb.org/3'
                const tvVideoUrl = 'https://api.themoviedb.org/3/tv/'
                const baseVideoEmbed = 'https://www.youtube.com/embed/'
                const movieVideoUrl = 'https://api.themoviedb.org/3/movie/'
                // const results = await axios.get(baseUrl + requests.fetchTrending)
                const results = await axios.get(detailUrl)
                const data = results.data
                setBanner(data.backdrop_path)
                // setTitle(data.title?.toUpperCase()) // Trường hợp movie api
                apiType == 'movieApi' ? setTitle(data.title.toUpperCase()) : setTitle(data.name.toUpperCase())
                console.log(data)
                setOverView(data.overview)
                // const videoResult = await axios.get(tvVideoUrl + data.id + requests.fetchVideoOnly)
                const videoResult = await axios.get(movieVideoUrl + data.id + requests.fetchVideoOnly)
                const trailerItem = videoResult.data.results.find((item, index) => {
                    if (item.type == 'Trailer') return item.type
                    else return videoResult.data.results[0]
                })
                setVideoUrl(baseVideoEmbed + trailerItem.key)
                // console.log(videoResult)
                const finalTime = apiType == 'movieApi' ? `${Math.floor(data.runtime / 60)}h${data.runtime - Math.floor(data.runtime / 60) * 60}m` : ''
                setDate(data.release_date)
                setVoteAverage(data.vote_average)
                setRuntime(finalTime)
            } catch (error) {
                // console.log(error)
            }
        }
        getBanner()
    }, [])
    const handlePlay = () => {
        setPlayVideo(true)
        textRef.current.classList.add('bannerText')
        setVolumeClassName('DetailVolumnClass')
    }
    const handleDate = () => {
        const d = new Date()
        const vote = `Vote average: ${voteAverage * 10}%`
        if (d.getFullYear() == parseInt(releaseDate.slice(0, 4)))
            return 'New'
        else return vote
    }
    if (!onShow) return null
    return ReactDom.createPortal(
        <div className='fixed w-screen flex h-screen justify-center bg-backgroundColorOpa top-0' onClick={onClose}>
            <div className='w-3/5vw mt-2vw flex relative top-0 h-full flex-col overflow-hidden rounded-md' style={{backgroundColor: '#181818'}} onClick={(e) => e.stopPropagation(e)}>
                <div className='relative'>
                    <img className='bg-center bg-cover w-full max-h-full' src={bannerUrl + banner} alt='Banner image' />
                    <div className='flex flex-col absolute bottom-1/5 ml-15 z-10'>
                        <div ref={textRef} className='text-white font-bold w-full title-banner bannerTextA' style={{ fontSize: '2vw' }}>{title}</div>
                        <div className='flex flex-row mt-1.5vw items-center'>
                            <Button className='bg-white text-black font-bold mr-4' title='Phát' icon={1} onClick={handlePlay} />
                            <FontAwesomeIcon icon={faPlus} className=' text-slate-100 p-0.5vw px-0.6vw mr-0.5vw cursor-pointer hover:opacity-70 detailModalBtn text-1.5vw' />
                            <FontAwesomeIcon icon={faThumbsUp} className=' text-slate-100 p-0.5vw mr-0.5vw cursor-pointer hover:opacity-70 detailModalBtn text-1.5vw' />
                        </div>
                    </div>
                    <FontAwesomeIcon icon={faXmark} onClick={onClose} className='absolute top-0 right-0 text-slate-300 p-0.5vw cursor-pointer hover:opacity-70 bg-black rounded-full z-50' style={{ width: '1.5vw', height: '1.5vw', margin: '1vw' }} />
                    <div className='detailModalFade absolute bottom-0 w-full' />
                    <Video className='customVideo' videoUrl={playVideo ? videoUrl : ''} overViewRef={overViewRef.current} textRef={textRef.current} volumnClass={volumeClassName} />
                </div>
                <div className='z-10 mx-4vw'>
                    <div className=' w-3/5 h-full mt-1vw'>
                        <div className='flex flex-row'>
                            <div className='text-green-600 text-1.2vw font-bold'>{handleDate()}</div>
                            <div className=' text-white text-1.2vw font-semibold ml-0.5vw'>{releaseDate.slice(0, 4)}</div>
                            <div className=' text-white text-1.2vw font-semibold ml-0.5vw'>{runtime}</div>
                        </div>
                        <div className='mt-1vw text-white font-semibold'>
                            {overView}
                        </div>
                    </div>
                </div>
            </div>
        </div>, document.getElementById('DetailModal')
    )
}

export default DetailModal