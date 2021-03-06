import { useEffect, useState } from 'react'
import axios from 'axios'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import '../styles/Components.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import AllRowVideoModal from './AllRowVideoModal'
import RowBanner from '../components/RowBanner'
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6.5,
    paritialVisibilityGutter: 100,
  },
  bigTablet: {
    breakpoint: { max: 1024, min: 801 },
    items: 4.5,
    paritialVisibilityGutter: 70,
  },
  tablet: {
    breakpoint: { max: 800, min: 501 },
    items: 3.5,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 2.2,
    paritialVisibilityGutter: 30,
  },
}
function Row({ title, fetchUrl, className, apiType, moviesGenre, isNetflix }) {
  const [movies, setMovies] = useState([])
  const [onGenreVideoShow, setGenreVideoShow] = useState(false)
  useEffect(() => {
    async function fetchMovie() {
      try {
        const baseUrl = 'https://api.themoviedb.org/3'
        const request = await axios.get(baseUrl + fetchUrl)
        setMovies(request.data.results)
      } catch (error) {
        console.error(error)
      }
    }
    fetchMovie()
  }, [fetchUrl])
  const handleShowAll = () => {
    setGenreVideoShow(true)
    document.getElementById('container').classList.add('overflow-y-hidden', 'h-screen')
  }
  const handleClose = () => {
    setGenreVideoShow(false)
    document.getElementById('container').classList.remove('overflow-y-hidden', 'h-screen')
  }
  return (
    <div className={className}>
      <div
        className='flex items-baseline text-neutral-200 text-1.4vw row-Title pl-4vw font-bold rowTitle cursor-pointer'
        onClick={handleShowAll}
      >
        {title}
        <div className='text-allRelatedVideoColor flex text-sm leading-3 ml-0.5vw font-bold invisible allRowVideo'>
          Explore All
          <FontAwesomeIcon icon={faChevronRight} className='text-xs ml-0.2vw' />
        </div>
      </div>
      <AllRowVideoModal
        title={title}
        apiType={apiType}
        moviesGenre={moviesGenre}
        isNetflix={isNetflix}
        allMovie={movies}
        onGenreVideoShow={onGenreVideoShow}
        onGenreVideoClose={handleClose}
      />
      <Carousel
        ssr={true}
        slidesToSlide={5.75}
        containerClass='mt-4'
        itemClass='image-item movie'
        responsive={responsive}
        className='pl-3.4vw'
        removeArrowOnDeviceType={['bigTablet', 'tablet', 'mobile']}
      >
        {movies.map((movie, index) => {
          const handleApiType = () => {
            if (apiType == 'complexApi') {
              return movie.media_type + 'Api'
            } else return apiType
          }
          return (
            <RowBanner
              className=''
              key={movie.id}
              bannerData={movie}
              apiType={handleApiType()}
              index={index}
              moviesGenre={moviesGenre}
              isNetflix={isNetflix}
              isRow={true} //Th l?? row b??n ngo??i home kh??ng ph???i allRow n??n c???n th??m pl v?? pr cho trailerBanner
            />
          )
        })}
      </Carousel>
    </div>
  )
}

export default Row
