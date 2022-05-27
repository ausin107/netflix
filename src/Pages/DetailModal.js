import { useEffect, useRef, useState } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import Button from '../components/Button'
import Video from '../components/Video'
import RelatedVideo from '../components/RelatedVideo'
import VideoEpisodes from '../components/VideoEpisodes'
import requests from '../adapters/request'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Top10Icon } from '../components/icon'
function DetailModal({detailData, onClose, onShow }) {
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
    let releaseDate
    useEffect(() => {
        async function getBanner() {
            try {
                const tvVideoUrl = 'https://api.themoviedb.org/3/tv/'
                const baseVideoEmbed = 'https://www.youtube.com/embed/'
                const movieVideoUrl = 'https://api.themoviedb.org/3/movie/'
                const results = await axios.get(detailData.detailUrl)
                const creditsResult = await axios.get(detailData.creditsUrl)
                setRelatedUrl(detailData.similarUrl)
                setActors(creditsResult.data.cast)
                const data = results.data
                setGenres(data.genres)
                setBanner(data.backdrop_path)
                detailData.apiType == 'movieApi' ? setTitle(data.title.toUpperCase()) : setTitle(data.name.toUpperCase())
                setData(data)
                setOverView(data.overview)
                const videoResult = await axios.get(movieVideoUrl + data.id + requests.fetchVideoOnly)
                const trailerItem = videoResult.data.results.find((item, index) => {
                    if (item.type == 'Trailer') return item.type
                    else return videoResult.data.results[0]
                })
                setVideoUrl(baseVideoEmbed + trailerItem.key)
            } catch (error) {

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
        if (detailData.apiType == 'movieApi') {
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
        if (detailData.apiType == 'movieApi') {
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
                    <img className='bg-center bg-cover w-full max-h-full rounded' src={bannerUrl + banner} alt='Banner image' />
                    <div className='flex flex-col absolute bottom-1/5 ml-15 z-10'>
                        <div
                            ref={textRef}
                            className='text-white font-bold w-full title-banner bannerTextA'
                            style={{ fontSize: '2vw' }}
                        >
                            {title}
                        </div>
                        <div className='flex flex-row mt-1.5vw items-center'>
                            <Button className='bg-white text-black font-bold mr-4' title='Phát' icon={1} onClick={handlePlay} />
                            <FontAwesomeIcon
                                icon={faPlus}
                                className=' text-slate-100 p-0.5vw px-0.6vw mr-0.5vw cursor-pointer hover:opacity-70 detailModalBtn text-1.5vw'
                            />
                            <FontAwesomeIcon
                                icon={faThumbsUp}
                                className=' text-slate-100 p-0.5vw mr-0.5vw cursor-pointer hover:opacity-70 detailModalBtn text-1.5vw'
                            />
                        </div>
                    </div>
                    <FontAwesomeIcon
                        icon={faXmark}
                        onClick={onClose}
                        className='absolute top-0 right-0 text-slate-300 p-0.5vw cursor-pointer hover:opacity-70 bg-black rounded-full z-50'
                        style={{ width: '1.5vw', height: '1.5vw', margin: '1vw' }}
                    />
                    <div className='detailModalFade absolute bottom-0 w-full' />
                    <Video
                        className='customVideo'
                        videoUrl={playVideo ? videoUrl : ''}
                        overViewRef={overViewRef.current}
                        textRef={textRef.current}
                        volumnClass={volumeClassName}
                    />
                </div>
                <div className='z-10 mx-4vw flex flex-row mt-0.5vw'>
                    <div className='w-3/5 h-full flex flex-col justify-evenly'>
                        <div className='flex flex-row my-0.2vw items-center'>
                            <div className='text-green-600 text-1.2vw font-bold'>{handleDate()}</div>
                            <div className=' text-white text-1.2vw font-semibold ml-0.5vw'>{releaseDate.slice(0, 4)}</div>
                            <div
                                className='text-white px-0.5vw mx-0.5vw'
                                style={{ border: 'rgba(255,255,255,.5) solid 1px', lineHeight: '1.1vw', paddingBottom: '1px' }}
                            >
                                {data.adult == true ? '18+' : '16+'}
                            </div>
                            <div className=' text-white text-1.2vw font-semibold'>{handleTime()}</div>
                        </div>
                        {
                            detailData.moviesRank < 9 ?
                                <div className='flex flex-row my-0.2vw'>
                                    <Top10Icon />
                                    <span className='text-white font-bold'>
                                        #{detailData.moviesRank + 1} in {detailData.moviesGenre} Today
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
                                        return index != genres.length - 1 ?
                                            <span className=' hover:decoration-2 hover:underline' key={index}> {genre.name}, </span>
                                            :
                                            <span className=' hover:decoration-2 hover:underline' key={index}>{genre.name}</span>
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
                {detailData.apiType != 'movieApi' ? <VideoEpisodes episodesUrl={detailData.episodesUrl} /> : ''}
                <RelatedVideo relatedUrl={relatedUrl} apiType={detailData.apiType} />
                <div className='mx-4vw mt-4vw mb-2vw'>
                    <div className='text-2xl text-white font-semibold'>About
                        <span className='font-bold ml-0.5vw'>
                            {title}
                        </span>
                    </div>
                    <div className='w-full h-full flex flex-col justify-between'>
                        <div className='font-normal mb-0.5vw mt-1vw' style={{ color: '#777' }}>
                            Director:
                            <span className='text-white font-normal hover:cursor-pointer hover:decoration-2 hover:underline'>
                                {' Null'}
                            </span>
                        </div>
                        <div className='font-normal my-0.5vw' style={{ color: '#777' }}>
                            Cast:
                            <span className='text-white font-normal hover:cursor-pointer'>
                                {
                                    actors.map((actor, index) => {
                                        if (index == 9) {
                                            return <span key={index}>
                                                <span className=' hover:decoration-2 hover:underline'>{actor.name}, </span>
                                                <i className=' hover:decoration-2 hover:underline'>more</i>
                                            </span>
                                        }
                                        else if (index < 10) return <span className=' hover:decoration-2 hover:underline' key={index}> {actor.name}, </span>
                                    })
                                }
                            </span>
                        </div>
                        <div className='font-normal my-0.5vw' style={{ color: '#777' }}>
                            Genres:
                            <span className='text-white font-normal hover:cursor-pointer'>
                                {
                                    genres.map((genre, index) => {
                                        return index != genres.length - 1 ?
                                            <span className=' hover:decoration-2 hover:underline' key={index}> {genre.name}, </span>
                                            :
                                            <span className=' hover:decoration-2 hover:underline' key={index}>{genre.name}</span>
                                    })
                                }
                            </span>
                        </div>
                        <div className='font-normal my-0.5vw' style={{ color: '#777' }}>
                            This show is:
                            <span className='text-white font-normal'> {data?.status}</span>
                        </div>
                        <div className='font-normal my-0.5vw' style={{ color: '#777' }}>
                            Maturity rating:
                            <span
                                className='text-white px-0.5vw mx-0.5vw'
                                style={{ border: 'rgba(255,255,255,.5) solid 1px', lineHeight: '1.1vw', paddingBottom: '1px' }}
                            >
                                {data.adult == true ? '18+' : '16+'}
                            </span>
                            <span className='text-white font-normal'>Recommended for ages {data.adult == true ? '18' : '16'} and up</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>, document.getElementById('DetailModal')
    )
}

export default DetailModal