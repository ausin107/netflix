import { useEffect, useRef, useState } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import Banner from './Banner'
import Button from './Button'
import Video from './Video'
import RelatedVideo from './RelatedVideo'
import requests from '../Pages/request'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faThumbsUp, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
function DetailModal({ detailUrl, apiType, onClose, onShow, creditsUrl, moviesRank, moviesGenre, similarUrl }) {
    const [banner, setBanner] = useState([])
    const [overView, setOverView] = useState('')
    const [title, setTitle] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [volumeClassName, setVolumeClassName] = useState('')
    const [playVideo, setPlayVideo] = useState(false)
    const [actors, setActors] = useState([])
    const [genres, setGenres] = useState([])
    const [data, setData] = useState()
    const [relatedUrl, setRelatedUrl] = useState()
    const bannerUrl = 'https://image.tmdb.org/t/p/original/'
    const overViewRef = useRef()
    const textRef = useRef()
    const videoRef = useRef()
    let releaseDate
    useEffect(() => {
        async function getBanner() {
            try {
                const baseUrl = 'https://api.themoviedb.org/3'
                const tvVideoUrl = 'https://api.themoviedb.org/3/tv/'
                const baseVideoEmbed = 'https://www.youtube.com/embed/'
                const movieVideoUrl = 'https://api.themoviedb.org/3/movie/'
                // const results = await axios.get(baseUrl + requests.fetchTrending)
                const results = await axios.get(detailUrl)
                const creditsResult = await axios.get(creditsUrl)
                setRelatedUrl(similarUrl)
                // const creditsData = creditsResult.data.cast
                setActors(creditsResult.data.cast)
                // console.log(creditsResult.data.cast)
                const data = results.data
                setGenres(data.genres)
                setBanner(data.backdrop_path)
                // setTitle(data.title?.toUpperCase()) // Trường hợp movie api
                apiType == 'movieApi' ? setTitle(data.title.toUpperCase()) : setTitle(data.name.toUpperCase())
                // console.log(data)
                setData(data)
                setOverView(data.overview)
                // const videoResult = await axios.get(tvVideoUrl + data.id + requests.fetchVideoOnly)
                const videoResult = await axios.get(movieVideoUrl + data.id + requests.fetchVideoOnly)
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
        textRef.current.classList.add('bannerText')
        setVolumeClassName('DetailVolumnClass')
    }
    const handleDate = () => {

        if (apiType == 'movieApi') {
            releaseDate = data.release_date
        } else {
            releaseDate = data.first_air_date
        }
        const d = new Date()
        const vote = `Vote average: ${data.vote_average * 10}%`
        if (d.getFullYear() == parseInt(releaseDate.slice(0, 4))) return 'New'
        else return vote
    }
    const handleTime = () => {
        if (apiType == 'movieApi') {
            return `${Math.floor(data.runtime / 60)}h${data.runtime - Math.floor(data.runtime / 60) * 60}m`
        } else {
            return data.number_of_seasons > 1 ? `${data.number_of_seasons} Seasons` : `${data.number_of_seasons} Seasons`
        }
    }
    if (!onShow) return null
    return ReactDom.createPortal(
        <div className='fixed top-0 w-screen h-screen flex justify-center bg-backgroundColorOpa overflow-y-scroll' onClick={onClose}>
            <div className='w-3/5vw mt-2vw flex relative top-0 h-fit flex-col rounded-md bg-detailModalBGColor ' onClick={(e) => e.stopPropagation(e)}>
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
                <div className='z-10 mx-4vw flex flex-row mt-0.5vw'>
                    <div className='w-3/5 h-full flex flex-col justify-evenly'>
                        <div className='flex flex-row my-0.2vw'>
                            <div className='text-green-600 text-1.2vw font-bold'>{handleDate()}</div>
                            <div className=' text-white text-1.2vw font-semibold ml-0.5vw'>{releaseDate.slice(0, 4)}</div>
                            <div className=' text-white text-1.2vw font-semibold ml-0.5vw'>{handleTime()}</div>
                        </div>
                        {
                            moviesRank < 9 ?
                                <div className='flex flex-row my-0.2vw'>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=' pointer-events-none ' style={{ color: 'rgb(229, 9, 20)', width: '1.5em', height: '1.5em', marginRight: '0.5em' }}>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3 2C2.44772 2 2 2.44772 2 3V21C2 21.5523 2.44772 22 3 22H21C21.5523 22 22 21.5523 22 21V3C22 2.44772 21.5523 2 21 2H3ZM17.2299 10.8934C16.6125 10.4971 15.8913 10.2996 15.0673 10.2996C14.2444 10.2996 13.5231 10.4971 12.9056 10.8934C12.2881 11.2905 11.8114 11.8536 11.4762 12.5839C11.1411 13.3149 10.9735 14.1695 10.9735 15.1493C10.9735 16.1383 11.1411 16.9957 11.4762 17.7221C11.8114 18.4478 12.2881 19.0091 12.9056 19.4052C13.5231 19.8014 14.2444 20 15.0673 20C15.8913 20 16.6125 19.8014 17.2299 19.4052C17.8475 19.0091 18.3242 18.4478 18.6594 17.7221C18.9945 16.9957 19.1612 16.1383 19.1612 15.1493C19.1612 14.1695 18.9945 13.3149 18.6594 12.5839C18.3242 11.8536 17.8475 11.2905 17.2299 10.8934ZM9.47922 19.7994V10.3263L4.92658 11.4351V13.2656L7.20991 12.6774V19.7994H9.47922ZM13.7606 12.9513C14.0767 12.4298 14.5117 12.1701 15.0673 12.1701C15.6239 12.1701 16.0589 12.4298 16.3751 12.9513C16.6913 13.4718 16.8489 14.2058 16.8489 15.1493C16.8489 16.0938 16.6913 16.8268 16.3751 17.3473C16.0589 17.8688 15.6239 18.1296 15.0673 18.1296C14.5117 18.1296 14.0767 17.8688 13.7606 17.3473C13.4442 16.8268 13.2868 16.0938 13.2868 15.1493C13.2868 14.2058 13.4442 13.4718 13.7606 12.9513ZM13.0737 4.19939C12.7285 4.06677 12.3485 4 11.9344 4C11.5194 4 11.1405 4.06677 10.7952 4.19939C10.4521 4.33122 10.1518 4.51771 9.89848 4.75622C9.64404 4.99367 9.44963 5.27379 9.312 5.59396C9.17437 5.91504 9.10556 6.26299 9.10556 6.63872C9.10556 7.01446 9.17437 7.36241 9.312 7.68349C9.44963 8.00352 9.64404 8.28286 9.89848 8.52136C10.1518 8.75974 10.4521 8.9453 10.7952 9.07792C11.1405 9.20976 11.5194 9.27745 11.9344 9.27745C12.3485 9.27745 12.7285 9.20976 13.0737 9.07792C13.4168 8.9453 13.7161 8.75974 13.9704 8.52136C14.2239 8.28286 14.4194 8.00352 14.557 7.68349C14.6947 7.36241 14.7635 7.01446 14.7635 6.63872C14.7635 6.26299 14.6947 5.91504 14.557 5.59396C14.4194 5.27379 14.2239 4.99367 13.9704 4.75622C13.7161 4.51771 13.4168 4.33122 13.0737 4.19939ZM8.75526 5.30869V4.12288H4V5.30869H5.63894V9.15457H7.11632V5.30869H8.75526ZM18.9904 4.3469C18.6683 4.19847 18.2893 4.12327 17.8484 4.12327H15.5101V9.15392H16.9855V7.70838H17.8484C18.2893 7.70838 18.6683 7.63318 18.9904 7.48384C19.3117 7.33541 19.5601 7.12483 19.7366 6.85484C19.9132 6.58578 20 6.26931 20 5.90845C20 5.55682 19.9132 5.24587 19.7366 4.97602C19.5601 4.70683 19.3117 4.49624 18.9904 4.3469ZM11.2392 5.39166C11.4387 5.27379 11.6701 5.21545 11.9344 5.21545C12.1988 5.21545 12.4302 5.27379 12.6297 5.39166C12.8292 5.50954 12.9849 5.67653 13.0955 5.89001C13.2072 6.10521 13.2632 6.35386 13.2632 6.63872C13.2632 6.92267 13.2072 7.17224 13.0955 7.38651C12.9849 7.60092 12.8292 7.76791 12.6297 7.88565C12.4302 8.00352 12.1988 8.062 11.9344 8.062C11.6701 8.062 11.4387 8.00352 11.2392 7.88565C11.0397 7.76791 10.8841 7.60092 10.7724 7.38651C10.6617 7.17224 10.6057 6.92267 10.6057 6.63872C10.6057 6.35386 10.6617 6.10521 10.7724 5.89001C10.8841 5.67653 11.0397 5.50954 11.2392 5.39166ZM16.9855 5.27195H17.6149C17.9252 5.27195 18.1515 5.32845 18.2913 5.43895C18.4309 5.54931 18.5017 5.70616 18.5017 5.90845C18.5017 6.11535 18.4309 6.27589 18.2913 6.38902C18.1515 6.50228 17.9252 6.55878 17.6149 6.55878H16.9855V5.27195Z" fill="currentColor">
                                        </path>
                                    </svg>
                                    <span className='text-white font-bold'>
                                        #{moviesRank + 1} in {moviesGenre} Today
                                    </span>
                                </div>
                                : ''
                        }
                        <div className='text-white font-normal my-0.2vw'>
                            {overView}
                        </div>
                    </div>
                    <div className='w-1/3 h-full ml-5vw flex flex-col justify-between'>
                        <div className='font-normal' style={{ color: '#777' }}>
                            Cast:
                            <span className='text-white font-normal hover:cursor-pointer'>
                                {
                                    actors.map((actor, index) => {
                                        if (index == 2) {
                                            return <div key={index}>
                                                <span className=' hover:decoration-2 hover:underline'>{actor.name}, </span>
                                                <i className=' hover:decoration-2 hover:underline'>more</i>
                                            </div>
                                        }
                                        else if (index < 3) return <span className=' hover:decoration-2 hover:underline' key={index}> {actor.name}, </span>
                                    })
                                }
                            </span>
                        </div>
                        <div className='font-normal' style={{ color: '#777' }}>
                            Genres:
                            <span className='text-white font-normal hover:cursor-pointer'>
                                {
                                    genres.map((genre, index) => {
                                        return index != genres.length - 1 ? <span className=' hover:decoration-2 hover:underline' key={index}> {genre.name}, </span> : <span className=' hover:decoration-2 hover:underline' key={index}>{genre.name}</span>
                                    })
                                }
                            </span>
                        </div>
                        <div className='font-normal' style={{ color: '#777' }}>
                            This show is:
                            <span className='text-white font-normal hover:cursor-pointer hover:decoration-2 hover:underline'> {data?.status}</span>
                        </div>
                    </div>
                </div>
                <RelatedVideo relatedUrl={relatedUrl} />
            </div>
        </div>, document.getElementById('DetailModal')
    )
}

export default DetailModal