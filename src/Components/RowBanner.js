import { useRef, useState } from 'react'
import TrailerModal from '../pages/TrailerModal'
import logo from '../assets/netflixLogo2.png'
import ErrorMovie from '../assets/Netflix_Error_Movie.png'

function RowBanner({ bannerData, apiType, index, moviesGenre, isNetflix, isRow }) {
  const [hoverId, setHoverId] = useState()
  const [itemClasses, setItemClasses] = useState('')
  const [handleDelay, setHandleDelay] = useState()
  const itemRef = useRef()
  const imgUrl = 'https://image.tmdb.org/t/p/original/'
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
  const videoData = {
    className: itemClasses,
    imgUrl: `${imgUrl}${bannerData.backdrop_path}`,
    title: bannerData.title || bannerData.name,
    movieId: bannerData.id,
    apiType: apiType,
    moviesRank: index,
    moviesGenre: moviesGenre,
  }
  return (
    <div
      onMouseEnter={() => handleHover(bannerData.id)}
      onMouseLeave={() => handleNotHover()}
      ref={itemRef}
    >
      <div className={hoverId == bannerData.id ? 'image' : ''} style={{ position: 'relative' }}>
        <img src={getMovieBannerSrc(bannerData)} className='rounded-md cursor-pointer' />
        {isNetflix == true ? (
          <img
            src={logo}
            className='absolute top-0 left-0 mx-0.1vw my-0.4vw'
            style={{ width: '1.4vw', height: '1.2vw' }}
          />
        ) : (
          ''
        )}
      </div>
      {hoverId == bannerData.id ? <TrailerModal videoData={videoData} /> : ''}
    </div>
  )
}
export default RowBanner