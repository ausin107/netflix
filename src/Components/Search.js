import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { LinkRequest, baseUrl } from '../adapters/homeRequests'
import { SearchIcon, XIcon } from '@heroicons/react/solid'
import LazyLoadingImg from './LazyLoadingImg'
import '../styles/Search.css'
import Netflix_BG from '../assets/Netflix_BG.jpg'
import DetailModal from './DetailModal'
function Search({ className }) {
  const [isShow, setIsShow] = useState(false)
  const [movieId, setMovieId] = useState('')
  const [movie, setMovie] = useState('')
  const [moviesData, setMoviesData] = useState('')
  const boxSearchRef = useRef()
  const bannerUrl = 'https://image.tmdb.org/t/p/original/'
  const newClasses = `${className} mr-4 flex flex-row items-center bg-black border pr-1vw relative`
  useEffect(() => {
    async function getMovie() {
      try {
        const results = await axios.get(
          baseUrl + LinkRequest.fetchMultiSearch + movie.replace(' ', '%20')
        )
        const data = results.data.results
        const allMovieData = data.filter((item) => {
          if (item.media_type != 'person') return item
        })
        setMoviesData(allMovieData)
      } catch (error) {
        console.error(error)
      }
    }
    !!movie && getMovie()
  }, [movie])
  const handleClear = () => {
    setMovie('')
    boxSearchRef.current.focus()
  }
  return (
    <div className={newClasses}>
      <input
        placeholder='Type movie name...'
        className='w-[15vw] h-[2.2vw] bg-transparent py-0.2vw px-1vw outline-none search-box'
        type='text'
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
        ref={boxSearchRef}
      />
      <button className='h-2vw w-2vw bg-transparent cursor-pointer search-icon'>
        {movie.length === 0 ? (
          <SearchIcon className='font-bold' />
        ) : (
          <XIcon className='font-bold' onClick={handleClear} />
        )}
      </button>
      <div className='h-fit w-fit flex bg-black rounded flex-col absolute top-[2.3vw] search-results'>
        {movie.length != 0 &&
          !!moviesData &&
          moviesData.map((item, index) => {
            const handleImgSrc = (imgSrc) => {
              return !!imgSrc == true ? bannerUrl + imgSrc : Netflix_BG
            }
            const handleDetailData = (item) => {
              const apiType = item.media_type + 'Api'
              const detailData = {
                apiType: apiType,
                moviesRank: index,
                moviesGenre: 'Searching',
                detailUrl:
                  apiType == 'movieApi'
                    ? `${baseUrl}/movie/${item.id}${LinkRequest.fetchVideoDetail}`
                    : `${baseUrl}/tv/${item.id}${LinkRequest.fetchVideoDetail}`,
                creditsUrl:
                  apiType == 'movieApi'
                    ? `${baseUrl}/movie/${item.id}/${LinkRequest.fetchCreditsInfo}`
                    : `${baseUrl}/tv/${item.id}/${LinkRequest.fetchCreditsInfo}`,
                similarUrl:
                  apiType == 'movieApi'
                    ? `${baseUrl}/movie/${item.id}/${LinkRequest.fetchSimilarVideo}`
                    : `${baseUrl}/tv/${item.id}/${LinkRequest.fetchSimilarVideo}`,
                episodesUrl: `${baseUrl}/tv/${item.id}/season/1${LinkRequest.fetchVideoDetail}`,
              }
              return detailData
            }
            const handleShow = (id) => {
              setIsShow(true)
              setMovieId(id)
              document.getElementById('container').classList.add('overflow-y-hidden', 'h-screen')
            }
            const handleClose = () => {
              setIsShow(false)
              document.getElementById('container').classList.remove('overflow-y-hidden', 'h-screen')
            }
            if (index < 5) {
              return (
                <div
                  className='flex flex-row py-0.5vw px-1vw border-b cursor-pointer w-max'
                  key={item.id}
                  onClick={() => handleShow(item.id)}
                >
                  <LazyLoadingImg
                    imgSrc={handleImgSrc(item.backdrop_path)}
                    className='bg-cover bg-full rounded h-10vh'
                    alt='Movie Image'
                  />
                  <div className='flex flex-col ml-1vw justify-between'>
                    <div className='text-white text-base font-bold'>{item.name || item.title}</div>
                    <div className='text-1vw text-green-500 font-bold '>
                      Vote: {Math.round(item.vote_average * 10)}%
                    </div>
                  </div>
                  {movieId == item.id && (
                    <DetailModal
                      onShow={isShow}
                      onClose={handleClose}
                      detailData={handleDetailData(item)}
                    />
                  )}
                </div>
              )
            }
          })}
      </div>
    </div>
  )
}
export default Search
