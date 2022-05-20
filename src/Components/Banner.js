import { useEffect, useState, useRef } from 'react'
import Button from './Button'
import axios from 'axios'
import Video from "../Components/Video"
import requests from '../Pages/request'


function Banner() {
    const [banner, setBanner] = useState([])
    const [overView, setOverView] = useState('')
    const [title, setTitle] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [playVideo, setPlayVideo] = useState(false)
    const bannerUrl = 'https://image.tmdb.org/t/p/original/'
    const overViewRef = useRef()
    const textRef = useRef()
    const videoRef = useRef()
    useEffect(() => {
        async function getBanner() {
            try {
                const randomBanner = Math.floor(Math.random() * 20)
                const baseUrl = 'https://api.themoviedb.org/3'
                const tvVideoUrl = 'https://api.themoviedb.org/3/tv/'
                const baseVideoEmbed = 'https://www.youtube.com/embed/'
                const movieVideoUrl = 'https://api.themoviedb.org/3/movie/'
                // const results = await axios.get(baseUrl + requests.fetchTrending)
                const results = await axios.get(baseUrl + requests.fetchNetflixOriginals)
                const data = results.data.results[randomBanner]
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
    }
    const handleOverView = () => {
        return overView.length > 150 ? `${overView.slice(0,`150`)}...` : overView
    }
    return (
        <div>
            <img className='bg-center bg-cover w-full max-h-full' src={bannerUrl + banner} alt='Banner image' />
            <div className="flex flex-col absolute bottom-1/3 ml-15 z-10">
                <div ref={textRef} className="text-white text-5.5 font-bold w-5/12 title-banner bannerTextA">{title}</div>
                <div ref={overViewRef} className="text-white font-normal w-1/3 text-1.4 mt-1vw bannerOverViewA">{handleOverView()}</div>
                <div className="flex flex-row mt-1.5vw">
                    <Button className='bg-white text-black font-bold mr-4' title='Play' icon={1} onClick={handlePlay} />
                    <Button className='text-white bg-buttonColor font-semibold' title='More Info' icon={2} />
                </div>
            </div>
            <div className="banner-fade absolute bottom-0 w-full" />
            <Video className='bottom-4vw' videoUrl={playVideo ? videoUrl : ''} overViewRef={overViewRef.current} textRef={textRef.current} />
        </div>
    )
}
export default Banner