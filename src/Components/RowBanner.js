import { useEffect, useRef, useState } from 'react'
import { baseUrl, LinkRequest } from '../adapters/homeRequests'
import TrailerModal from '../components/TrailerModal'
import DetailModal from '../components/DetailModal'
import logo from '../assets/netflixLogo2.png'
import ErrorMovie from '../assets/Netflix_Error_Movie.png'
import '../styles/RowBanner.css'
function RowBanner({ bannerData, apiType, index, moviesGenre, isNetflix, isRow, className }) {
  const [hoverId, setHoverId] = useState()
  const [itemClasses, setItemClasses] = useState('')
  const [handleDelay, setHandleDelay] = useState()
  const [isShow, setShow] = useState(false)
  const itemRef = useRef()
  const imgRef = useRef()
  const imgUrl = 'https://image.tmdb.org/t/p/original/'
  const detailData = {
    apiType: apiType,
    moviesGenre: moviesGenre,
    moviesRank: index,
    detailUrl:
      apiType == 'movieApi'
        ? `${baseUrl}/movie/${bannerData.id}${LinkRequest.fetchVideoDetail}`
        : `${baseUrl}/tv/${bannerData.id}${LinkRequest.fetchVideoDetail}`,
    creditsUrl:
      apiType == 'movieApi'
        ? `${baseUrl}/movie/${bannerData.id}/${LinkRequest.fetchCreditsInfo}`
        : `${baseUrl}/tv/${bannerData.id}/${LinkRequest.fetchCreditsInfo}`,
    similarUrl:
      apiType == 'movieApi'
        ? `${baseUrl}/movie/${bannerData.id}/${LinkRequest.fetchSimilarVideo}`
        : `${baseUrl}/tv/${bannerData.id}/${LinkRequest.fetchSimilarVideo}`,
    episodesUrl: `${baseUrl}/tv/${bannerData.id}/season/1${LinkRequest.fetchVideoDetail}`,
  }
  const getMovieBannerSrc = (movie) => {
    return movie.poster_path != null ? imgUrl + movie.poster_path : ErrorMovie
  }
  const handleHover = (movieId) => {
    setHandleDelay(
      setTimeout(() => {
        setHoverId(movieId)
      }, 600)
    )
    if (!!isRow) {
      const itemX = itemRef.current.getBoundingClientRect().x
      if (itemX < 287) {
        setItemClasses('ml-2.5vw')
      } else if (itemX > 1204 && itemX < 1434) {
        setItemClasses('!-left-38%')
      } else setItemClasses('')
    } else setItemClasses('')
  }
  const handleNotHover = () => {
    clearTimeout(handleDelay)
  }
  const handelMobileShow = () => {
    if (window.innerWidth < 1024) {
      setShow(true)
      document.getElementById('container').classList.add('overflow-y-hidden', 'h-screen')
    }
  }
  const handleClose = () => {
    setShow(false)
    document.getElementById('container').classList.remove('overflow-y-hidden', 'h-screen')
  }
  const videoData = {
    className: itemClasses,
    imgUrl: `${imgUrl}${bannerData.backdrop_path}`,
    title: bannerData.title || bannerData.name,
    movieId: bannerData.id,
    apiType: apiType,
    moviesRank: index,
    moviesGenre: moviesGenre,
  }
  useEffect(() => {
    const img = imgRef.current
    const imgSrc = img.getAttribute('lazy-src')
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        img.setAttribute('src', imgSrc)
        img.removeAttribute('lazy-src')
        img.classList.remove('skeleton')
      }
    })
    if (img) observer.observe(img)
    return () => {
      if (img) observer.unobserve(img)
    }
  }, [])
  return (
    <div
      className={className}
      onMouseEnter={() => handleHover(bannerData.id)}
      onMouseLeave={() => handleNotHover()}
      onClick={handelMobileShow}
      ref={itemRef}
    >
      <div className={hoverId == bannerData.id ? 'image' : ''} style={{ position: 'relative' }}>
        <img
          lazy-src={getMovieBannerSrc(bannerData)}
          className='rounded-md cursor-pointer skeleton h-full'
          ref={imgRef}
        />
        {isNetflix == true ? (
          <img
            src={logo}
            className='absolute top-0 left-0 mx-0.1vw my-0.4vw lg:w-1.4vw lg:h-1.2vw w-4.5vw h-[2vh] sm:h-[3.5vh] sm:w-[3.5vw]'
          />
        ) : (
          ''
        )}
      </div>
      {hoverId == bannerData.id ? <TrailerModal videoData={videoData} /> : ''}
      {isShow == true && window.innerWidth < 1024 ? (
        <DetailModal detailData={detailData} onShow={isShow} onClose={handleClose} />
      ) : (
        ''
      )}
    </div>
  )
}
export default RowBanner
