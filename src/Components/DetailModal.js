import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Banner from './Banner'
import Button from './Button'
import Video from './Video'
import requests from '../Pages/request'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faThumbsUp, faPlus } from '@fortawesome/free-solid-svg-icons'
function DetailModal({ backdrop, }) {
    const [banner, setBanner] = useState([])
    const [overView, setOverView] = useState('')
    const [title, setTitle] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [volumeClassName, setVolumeClassName] = useState('')
    const [playVideo, setPlayVideo] = useState(false)
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
                const results = await axios.get(baseUrl + requests.fetchNetflixOriginals)
                const data = results.data.results[3]
                setBanner(data.backdrop_path)
                // setTitle(data.title?.toUpperCase()) // Trường hợp movie api
                setTitle(data.name.toUpperCase()) //trường hợp Netflix original
                setOverView(data.overview)
                const videoResult = await axios.get(tvVideoUrl + data.id + requests.fetchVideoOnly)
                // const videoResult = await axios.get(movieVideoUrl + data.id + requests.fetchVideoOnly)
                const trailerItem = videoResult.data.results.find((item, index) => {
                    if (item.type == "Trailer") return item.type
                    else return videoResult.data.results[0]
                })
                setVideoUrl(baseVideoEmbed + trailerItem.key)
                // console.log(videoResult)
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
    return (
        <div className='fixed w-screen flex h-screen justify-center z-50 top-0  bg-backgroundColorOpa '>
            <div className=' w-3/5vw bg-backgroundColor h-65vh mt-3vw flex relative overflow-hidden'>
                <img className='bg-center bg-cover w-full max-h-full' src={bannerUrl + banner} alt='Banner image' />
                <div className="flex flex-col absolute bottom-1/5 ml-15 z-10">
                    <div ref={textRef} className="text-white text-5.5 font-bold w-5/12 title-banner bannerTextA">{title}</div>
                    <div className="flex flex-row mt-1.5vw items-center">
                        <Button className='bg-white text-black font-bold mr-4' title='Phát' icon={1} onClick={handlePlay} />
                        <FontAwesomeIcon icon={faPlus} className=" text-slate-100 p-0.5vw px-0.6vw mr-0.5vw cursor-pointer hover:opacity-70 detailModalBtn text-1.5vw" />
                        <FontAwesomeIcon icon={faThumbsUp} className=" text-slate-100 p-0.5vw mr-0.5vw cursor-pointer hover:opacity-70 detailModalBtn text-1.5vw" />
                    </div>
                </div>
                <div className="banner-fade absolute bottom-0 w-full" />
                <Video className='customVideo' videoUrl={playVideo ? videoUrl : ''} overViewRef={overViewRef.current} textRef={textRef.current} volumnClass={volumeClassName} ref={videoRef} />
            </div>
        </div>
    )
}

export default DetailModal