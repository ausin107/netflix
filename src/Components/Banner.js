import { useEffect, useState, useRef } from 'react'
import Button from '../components/Button'
import axios from 'axios'
import Video from '../components/Video'
import { baseUrl, HomeRequests, LinkRequest } from '../adapters/homeRequests'
import DetailModal from './DetailModal'
import NetflixBG from '../assets/Netflix_BG.jpg'

function Banner({ className, apiType, fetchUrl, containerId }) {
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
  let detailData = {}
  if (apiType == 'tvApi') {
    detailData = {
      apiType: apiType,
      moviesRank: moviesRank,
      moviesGenre: 'Netflix Tv Shows',
      detailUrl: `${baseUrl}/tv/${movieId}${LinkRequest.fetchVideoDetail}`,
      creditsUrl: `${baseUrl}/tv/${movieId}/${LinkRequest.fetchCreditsInfo}`,
      similarUrl: `${baseUrl}/tv/${movieId}/${LinkRequest.fetchSimilarVideo}`,
      episodesUrl: `${baseUrl}/tv/${movieId}/season/1${LinkRequest.fetchVideoDetail}`,
    }
  } else {
    detailData = {
      apiType: apiType,
      moviesRank: moviesRank,
      moviesGenre: 'Netflix Movies',
      detailUrl: `${baseUrl}/movie/${movieId}${LinkRequest.fetchVideoDetail}`,
      creditsUrl: `${baseUrl}/movie/${movieId}/${LinkRequest.fetchCreditsInfo}`,
      similarUrl: `${baseUrl}/movie/${movieId}/${LinkRequest.fetchSimilarVideo}`,
    }
  }
  useEffect(() => {
    async function getBanner(apiType, fetchUrl) {
      try {
        const randomBanner = Math.floor(Math.random() * 20)
        const baseUrl = 'https://api.themoviedb.org/3'
        const tvVideoUrl = 'https://api.themoviedb.org/3/tv/'
        const movieVideoUrl = 'https://api.themoviedb.org/3/movie/'
        const baseVideoEmbed = 'https://www.youtube.com/embed/'
        const results = await axios.get(baseUrl + fetchUrl)
        const data = results.data.results[randomBanner]
        setMovieRank(randomBanner)
        setMovieId(data.id)
        let videoDetail, videoResult
        if (apiType == 'tvApi') {
          videoDetail = await axios.get(`${baseUrl}/tv/${data.id}${LinkRequest.fetchVideoDetail}`)
          setTitle(data.name.toUpperCase())
          videoResult = await axios.get(tvVideoUrl + data.id + LinkRequest.fetchVideoOnly)
        } else {
          videoDetail = await axios.get(
            `${baseUrl}/movie/${data.id}${LinkRequest.fetchVideoDetail}`
          )
          setTitle(data.title.toUpperCase())
          videoResult = await axios.get(movieVideoUrl + data.id + LinkRequest.fetchVideoOnly)
        }
        setAdult(videoDetail.data.adult == true ? '18+' : '16+')
        setBanner(data.backdrop_path)
        setOverView(data.overview)
        let trailerItem = videoResult.data.results.find((item) => {
          if (item.name.includes('Official Trailer') == true || item.type == 'Trailer') return item
        })
        trailerItem = !!trailerItem == false ? videoResult.data.results[0] : trailerItem
        setVideoUrl(baseVideoEmbed + trailerItem.key)
      } catch (error) {
        console.error(error)
      }
    }
    getBanner(apiType, fetchUrl)
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
  const handelBannerImg = (ImgSrc) => {
    return !!ImgSrc == false ? NetflixBG : `${bannerUrl}${ImgSrc}`
  }
  return (
    <div className='w-full'>
      <img
        className='bg-center bg-cover w-full max-h-full'
        src={handelBannerImg(banner)}
        alt='Banner image'
      />
      <div className='flex flex-col absolute bottom-1/3 z-10 w-full info-container'>
        <div
          ref={textRef}
          className='text-white text-4vw font-bold w-5/12 title-banner ml-4vw bannerTextA font-sans'
        >
          {title}
        </div>
        <div
          ref={overViewRef}
          className='text-white font-normal w-1/3 text-1.4vw mt-1vw ml-4vw bannerOverViewA'
        >
          {handleOverView()}
        </div>
        <div className='flex items-end justify-between ml-4vw'>
          <div className='flex flex-row mt-1.5vw'>
            <Button
              className='bg-white text-black font-bold mr-4 w-8vw h-3vw play-button'
              title='Play'
              icon={1}
              onClick={handlePlay}
              titleClasses='opacity-100 ml-0.7vw text-1.4vw button-tittle'
              iconClasses='w-1.5vw h-1.5vw icon-classes'
            />
            <Button
              className='text-white bg-buttonColor font-semibold w-11vw h-3vw info-button'
              title='More Info'
              icon={2}
              onClick={handleInfo}
              titleClasses='opacity-100 ml-0.6vw text-1.3vw'
              iconClasses='w-1.9vw h-1.9vw'
            />
            {!!movieId && (
              <DetailModal detailData={detailData} onShow={isShow} onClose={handleClose} />
            )}
          </div>
          <div
            className='flex items-center w-6vw h-2.5vw text-white font-semibold text-1.2vw border-l-3 pl-0.7vw tracking-wider age-tag'
            style={{
              backgroundColor: 'rgba(51,51,51,.6)',
              borderColor: '#dcdcdc',
              color: '#dcdcdc',
            }}
          >
            {adult}
          </div>
        </div>
      </div>
      <div className='banner-fade absolute bottom-0 w-full' />
      <Video
        className='bottom-4vw'
        videoUrl={playVideo ? videoUrl : ''}
        overViewRef={overViewRef.current}
        textRef={textRef.current}
      />
    </div>
  )
}
export default Banner
