import { useEffect, useRef, useState } from 'react'
import Banner from './Banner'
import Footer from './Footer'
import Row from './Row'
import { MoviesRequests } from '../adapters/moviesRequests'
import '../styles/DetailModal.css'

function Movies() {
  useEffect(() => {
    const title = 'Movies'
    document.title = `${title} - Netflix`
  }, [])
  let randomBannerUrl = (obj) => {
    let keys = Object.values(obj)
    keys = keys.sort(() => Math.random - 0.5)
    return keys[((keys.length - 1) * Math.random()) >> 0]
  }
  return (
    <>
      <div className='relative' id='container'>
        <Banner
          className=''
          apiType='movieApi'
          fetchUrl={randomBannerUrl(MoviesRequests)}
        />
        <div
          className='absolute w-full overflow-hidden'
          style={{ top: '40vw' }}
        >
          <div className='w-full absolute h-full bg-backgroundColor -z-10' />
          <Row
            title='Children & Family Movies'
            fetchUrl={MoviesRequests.fetchAnimationMovies}
            apiType='movieApi'
            moviesGenre='Children & Family Movies'
            className='my-9 w-screen'
          />
          <Row
            title='Trending Now'
            fetchUrl={MoviesRequests.fetchTrending}
            apiType='movieApi'
            moviesGenre='Trending Movies'
            className='my-9 w-screen pt-4'
          />
          <Row
            title='Thriller Movies'
            fetchUrl={MoviesRequests.fetchThrillerMovies}
            apiType='movieApi'
            moviesGenre='Thriller Movies'
            className='my-9 w-screen'
          />
          <Row
            title='Horror Movies'
            fetchUrl={MoviesRequests.fetchHorrorMovies}
            apiType='movieApi'
            moviesGenre='Horrow Movies'
            className='my-9 w-screen '
          />
          <Row
            title='Comedies'
            fetchUrl={MoviesRequests.fetchComedyMovies}
            apiType='movieApi'
            moviesGenre='Comedies Movies'
            className='my-9 w-screen'
            isNetflix={true}
          />
          <Row
            title='Action Movies'
            fetchUrl={MoviesRequests.fetchActionMovies}
            apiType='movieApi'
            moviesGenre='Action Movies'
            className='my-9 w-screen'
          />
          <Row
            title='Drama Movies'
            fetchUrl={MoviesRequests.fetchDramaMovies}
            apiType='movieApi'
            moviesGenre='Drama Movies'
            className='my-9 w-screen pb-7vw'
            isNetflix={true}
          />
          <Footer />
        </div>
      </div>
      <div id='DetailModal' className='relative z-50' />
    </>
  )
}

export default Movies
