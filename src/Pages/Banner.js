import { useEffect, useState, useRef } from 'react'
import Button from '../components/Button'
import axios from 'axios'
import Video from '../components/Video'
import requests, { baseUrl } from '../adapters/request'
import DetailModal from './DetailModal'

function Banner() {
    const [movieId, setMovieId] = useState(false)
    const [banner, setBanner] = useState([])
    const [overView, setOverView] = useState('')
    const [title, setTitle] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [playVideo, setPlayVideo] = useState(false)
    const [adult, setAdult] = useState('')
    const [isShow, setIsShow] = useState(false)
    const [moviesRank, setMovieRank] = useState()
    const bannerUrl = 'https://image.tmdb.org/t/p/original/'
    const overViewRef = useRef()
    const textRef = useRef()
    const detailData = {
        apiType: 'tvApi',
        moviesRank: moviesRank,
        moviesGenre: 'Trending Now',
        detailUrl: `${baseUrl}/tv/${movieId}${requests.fetchVideoDetail}`,
        creditsUrl: `${baseUrl}/tv/${movieId}/${requests.fetchCreditsInfo}`,
        similarUrl: `${baseUrl}/tv/${movieId}/${requests.fetchSimilarVideo}`,
        episodesUrl: `${baseUrl}/tv/${movieId}/season/1${requests.fetchVideoDetail}`,
    }
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
                setMovieRank(randomBanner)
                setMovieId(data.id)
                const videoDetail = await axios.get(`${baseUrl}/tv/${data.id}${requests.fetchVideoDetail}`)
                setAdult(videoDetail.data.adult == true ? '18+' : '16+')
                setBanner(data.backdrop_path)
                // setTitle(data.title?.toUpperCase()) // Trường hợp movie api
                setTitle(data.name.toUpperCase()) //trường hợp Netflix original
                setOverView(data.overview)
                const videoResult = await axios.get(tvVideoUrl + data.id + requests.fetchVideoOnly)
                // const videoResult = await axios.get(movieVideoUrl + data.id + requests.fetchVideoOnly)
                const trailerItem = videoResult.data.results.find((item, index) => {
                    if (item.type == 'Trailer') return item.type
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
        return overView.length > 150 ? `${overView.slice(0, `150`)}...` : overView
    }
    const handleInfo = () => {
        setIsShow(true)
        document.getElementById('container').classList.add('overflow-y-hidden', 'h-screen')
    }
    const handleClose = () => {
        setIsShow(false)
        document.getElementById('container').classList.remove('overflow-y-hidden', 'h-screen')
    }
    return (
        <div>
            <img className='bg-center bg-cover w-full max-h-full' src={bannerUrl + banner} alt='Banner image' />
            <div className='flex flex-col absolute bottom-1/3 ml-15 z-10'>
                <div ref={textRef} className='text-white text-5.5 font-bold w-5/12 title-banner bannerTextA'>{title}</div>
                <div ref={overViewRef} className='text-white font-normal w-1/3 text-1.4 mt-1vw bannerOverViewA'>{handleOverView()}</div>
                <div className='flex items-end justify-between' style={{ width: '95vw' }}>
                    <div className='flex flex-row mt-1.5vw'>
                        <Button className='bg-white text-black font-bold mr-4' title='Play' icon={1} onClick={handlePlay} />
                        <Button className='text-white bg-buttonColor font-semibold' title='More Info' icon={2} onClick={handleInfo} />
                        {movieId &&
                            <DetailModal
                                detailData={detailData}
                                onShow={isShow}
                                onClose={handleClose}
                            />
                        }
                    </div>
                    <div
                        className='flex items-center w-6vw h-2.5vw text-white font-semibold text-lg border-l-3 pl-0.7vw tracking-wider'
                        style={{ backgroundColor: 'rgba(51,51,51,.6)', borderColor: '#dcdcdc', color: '#dcdcdc' }}
                    >
                        {adult}
                    </div>
                </div>
            </div>
            <div className='banner-fade absolute bottom-0 w-full' />
            <Video
                className='bottom-4vw' videoUrl={playVideo ? videoUrl : ''}
                overViewRef={overViewRef.current}
                textRef={textRef.current}
            />
        </div>
    )
}
export default Banner