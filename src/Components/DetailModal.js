import { useEffect, useRef, useState } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import Button from './Button'
import Video from './Video'
import RelatedVideo from './RelatedVideo'
import VideoEpisodes from './VideoEpisodes'
import { LinkRequest } from '../adapters/homeRequests'
import '../styles/DetailModal.css'
import { faThumbsUp, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Top10Icon, CircleIcon } from './icon'
import Netflix_BG from '../assets/Netflix_BG.jpg'
function DetailModal({ detailData, onClose, onShow, className }) {
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
  const newClass = `w-3/5vw mt-2vw flex relative top-0 h-fit flex-col rounded-md bg-detailModalBGColor detail-modal-open detail-modal ${className}`
  useEffect(() => {
    async function getBanner() {
      try {
        const tvVideoUrl = 'https://api.themoviedb.org/3/tv/'
        const baseVideoEmbed = 'https://www.youtube.com/embed/'
        const movieVideoUrl = 'https://api.themoviedb.org/3/movie/'
        const results = await axios.get(detailData.detailUrl)
        const creditsResult = await axios.get(detailData.creditsUrl)
        const data = results?.data
        setData(data)
        setRelatedUrl(detailData.similarUrl)
        setActors(creditsResult.data.cast)
        setGenres(data?.genres)
        setBanner(data?.backdrop_path)
        setOverView(data?.overview)
        detailData.apiType == 'movieApi'
          ? setTitle(data.title.toUpperCase())
          : setTitle(data.name.toUpperCase())
        const videoResult =
          detailData.apiType == 'movieApi'
            ? await axios.get(movieVideoUrl + data?.id + LinkRequest.fetchVideoOnly)
            : await axios.get(tvVideoUrl + data?.id + LinkRequest.fetchVideoOnly)
        let trailerItem = videoResult.data.results.find((item) => {
          if (item.name.includes('Official Trailer') == true || item.type == 'Trailer') return item
        })
        trailerItem = !!trailerItem == false ? videoResult.data.results[0] : trailerItem
        setVideoUrl(baseVideoEmbed + trailerItem.key)
      } catch (error) {
        console.error(error)
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
      releaseDate = data?.release_date
    } else {
      releaseDate = data?.first_air_date
    }
    const d = new Date()
    const vote = `Vote average: ${Math.floor(data?.vote_average) * 10 || 10 * 10}%`
    if (d.getFullYear() == parseInt(releaseDate?.slice(0, 4))) return 'New'
    else return vote
  }
  const handleTime = () => {
    if (detailData.apiType == 'movieApi') {
      return `${Math.floor(data?.runtime / 60)}h${
        Math.floor(data?.runtime) - Math.floor(data?.runtime / 60) * 60
      }m`
    } else {
      return data?.number_of_seasons > 1
        ? `${data?.number_of_seasons} Seasons`
        : `${data?.number_of_seasons} Seasons`
    }
  }
  const handleBanner = () => {
    return banner != '' ? bannerUrl + banner : Netflix_BG
  }
  if (!onShow) return null
  return ReactDom.createPortal(
    <div
      className='fixed top-0 w-screen h-screen flex justify-center bg-backgroundColorOpa overflow-y-scroll'
      onClick={onClose}
    >
      <div className={newClass} onClick={(e) => e.stopPropagation(e)}>
        <div className='relative'>
          <img
            className='bg-center bg-cover w-full max-h-full rounded'
            src={handleBanner()}
            alt='Banner image'
          />
          <div className='flex flex-col absolute bottom-1/5 ml-15 z-10 font-sans'>
            <div
              ref={textRef}
              className='text-white font-bold w-full title-banner bannerTextA text-[2vw]'
            >
              {title}
            </div>
            <div className='flex flex-row mt-1.5vw items-center icon-modal'>
              <Button
                className='bg-white text-black font-bold mr-4 w-8vw h-3vw play-button'
                title='Play'
                icon={1}
                onClick={handlePlay}
                titleClasses='opacity-100 ml-0.7vw text-1.4vw button-tittle'
                iconClasses='w-1.5vw h-1.5vw icon-classes'
              />
              <CircleIcon
                iconType={faPlus}
                className='px-0.6vw mr-0.5vw traileModalBtn text-slate-100'
                tooltipText='Add To My List'
                tooltipClass='-left-88%'
              />
              <CircleIcon
                iconType={faThumbsUp}
                className='text-slate-100 px-0.5vw mr-0.5vw traileModalBtn'
                tooltipText='I like this'
                tooltipClass='-left-46%'
                iconOnClickColor='text-sky-500 !border-sky-500 animate-wiggleV2'
              />
            </div>
          </div>
          <CircleIcon
            iconType={faXmark}
            onClick={onClose}
            containerClass='!absolute top-0 right-0 z-50'
            className='bg-black rounded-full text-slate-300 w-1.5vw h-1.5vw m-1vw close-icon'
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
        <div className='z-10 mx-4vw flex flex-row mt-0.5vw info-container'>
          <div className='w-3/5 h-full flex flex-col justify-evenly about-container'>
            <div className='text-white font-bold text-[6vw] mb-1vw sm:hidden'>{title}</div>
            <div className='flex flex-row sm:my-0.2vw items-center my-1vw'>
              <div className='text-green-600 text-1.2vw font-bold new-info'>{handleDate()}</div>
              <div className=' text-white text-1.2vw font-semibold ml-0.5vw date-info'>
                {releaseDate?.slice(0, 4)}
              </div>
              <div
                className='text-white px-0.5vw mx-0.5vw sm:pb-[1px] sm:leading-[1.1vw] adult-info'
                style={{
                  border: 'rgba(255,255,255,.5) solid 1px',
                }}
              >
                {data?.adult == true ? '18+' : '16+'}
              </div>
              <div className=' text-white text-1.2vw font-semibold time-info'>{handleTime()}</div>
            </div>
            {detailData.moviesRank < 9 ? (
              <div className='flex flex-row my-0.2vw'>
                <Top10Icon />
                <span className='text-white font-bold'>
                  #{detailData.moviesRank + 1} in {detailData.moviesGenre} Today
                </span>
              </div>
            ) : (
              ''
            )}
            <Button
              className='bg-white text-black font-bold my-2vw w-full h-[4vh] sm:h-[6vh] lg:hidden'
              title='Play'
              icon={1}
              onClick={handlePlay}
              titleClasses='opacity-100 ml-0.7vw text-1.4vw button-tittle'
              iconClasses='icon-classes'
            />
            <div className='text-white font-normal my-0.2vw'>
              {overView ||
                "Maybe this movie is new that we don't have data to render yet and apologize for the inconvenience."}
            </div>
          </div>
          <div className='w-1/3 h-full ml-5vw flex flex-col justify-between cast-container'>
            <div className='font-normal' style={{ color: '#777' }}>
              Cast:
              <span className='text-white font-normal hover:cursor-pointer'>
                {actors.map((actor, index) => {
                  if (index == 2) {
                    return (
                      <div key={index}>
                        <span className=' hover:decoration-2 hover:underline'>{actor.name}, </span>
                        <i className=' hover:decoration-2 hover:underline'>more</i>
                      </div>
                    )
                  } else if (index < 3)
                    return (
                      <span className=' hover:decoration-2 hover:underline' key={index}>
                        {' '}
                        {actor.name},{' '}
                      </span>
                    )
                })}
              </span>
            </div>
            <div className='font-normal' style={{ color: '#777' }}>
              Genres:
              <span className='text-white font-normal hover:cursor-pointer'>
                {genres.map((genre, index) => {
                  return index != genres.length - 1 ? (
                    <span className=' hover:decoration-2 hover:underline' key={index}>
                      {' '}
                      {genre.name},{' '}
                    </span>
                  ) : (
                    <span className=' hover:decoration-2 hover:underline' key={index}>
                      {genre.name}
                    </span>
                  )
                })}
              </span>
            </div>
            <div className='font-normal' style={{ color: '#777' }}>
              This show is:
              <span className='text-white font-normal hover:cursor-pointer hover:decoration-2 hover:underline'>
                {' '}
                {data?.status}
              </span>
            </div>
          </div>
        </div>
        {detailData.apiType != 'movieApi' ? (
          <VideoEpisodes episodesUrl={detailData.episodesUrl} />
        ) : (
          ''
        )}
        <RelatedVideo relatedUrl={relatedUrl} apiType={detailData.apiType} />
        <div className='mx-4vw mt-4vw mb-2vw '>
          <div className='text-2xl text-white font-semibold'>
            About
            <span className='font-bold sm:ml-0.5vw ml-2vw'>{title}</span>
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
                {actors.map((actor, index) => {
                  if (index == 9) {
                    return (
                      <span key={index}>
                        <span className=' hover:decoration-2 hover:underline'>{actor.name}, </span>
                        <i className=' hover:decoration-2 hover:underline'>more</i>
                      </span>
                    )
                  } else if (index < 10)
                    return (
                      <span className=' hover:decoration-2 hover:underline' key={index}>
                        {' '}
                        {actor.name},{' '}
                      </span>
                    )
                })}
              </span>
            </div>
            <div className='font-normal my-0.5vw' style={{ color: '#777' }}>
              Genres:
              <span className='text-white font-normal hover:cursor-pointer'>
                {genres.map((genre, index) => {
                  return index != genres.length - 1 ? (
                    <span className=' hover:decoration-2 hover:underline' key={index}>
                      {' '}
                      {genre.name},{' '}
                    </span>
                  ) : (
                    <span className=' hover:decoration-2 hover:underline' key={index}>
                      {genre.name}
                    </span>
                  )
                })}
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
                style={{
                  border: 'rgba(255,255,255,.5) solid 1px',
                  lineHeight: '1.1vw',
                  paddingBottom: '1px',
                }}
              >
                {data?.adult == true ? '18+' : '16+'}
              </span>
              <span className='text-white font-normal'>
                Recommended for ages {data?.adult == true ? '18' : '16'} and up
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('Modal')
  )
}

export default DetailModal
