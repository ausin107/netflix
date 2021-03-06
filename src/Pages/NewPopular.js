import { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Row from '../components/Row'
import Footer from '../components/Footer'
import { NewPopularRequest } from '../adapters/newPopularRequest'

function NewPopular() {
  const [bannerUrl, setBannerUrl] = useState()
  const [apiType, setApiType] = useState()
  useEffect(() => {
    document.title = `Netflix`
    let keys = Object.values(NewPopularRequest)
    keys = keys.sort(() => Math.random() - 0.5)
    const randomNumber = ((keys.length - 1) * Math.random()) >> 0
    const banner = keys[randomNumber]
    setBannerUrl(banner)
    if (banner.includes('trending') == true) {
      setApiType('complexApi')
    } else if (banner.includes('tv') == true) {
      setApiType('tvApi')
    } else setApiType('movieApi')
  }, [])
  return (
    <>
      <div className='relative' id='container'>
        {!!bannerUrl && <Banner className='' apiType={apiType} fetchUrl={bannerUrl} />}
        <div className='absolute w-full overflow-hidden video-container top-[40vw]'>
          <div className='w-full absolute h-full bg-backgroundColor -z-10' />
          <Row
            title='Up Coming Movies'
            fetchUrl={NewPopularRequest.fetchMovieUpComing}
            apiType='movieApi'
            moviesGenre='Movie Up Coming'
            className='my-9 w-screen '
          />
          <Row
            title='Trending Now'
            fetchUrl={NewPopularRequest.fetchPopularMovie}
            apiType='complexApi'
            moviesGenre='Trending Movie'
            className='my-9 w-screen pt-4'
          />
          <Row
            title='Movie Now Playing'
            fetchUrl={NewPopularRequest.fetchMovieNowPlaying}
            apiType='movieApi'
            moviesGenre='Movie Now Playing'
            className='my-9 w-screen pt-4'
          />
          <Row
            title='Tv Shows Now On Air'
            fetchUrl={NewPopularRequest.fetchTvShowsOnAir}
            apiType='tvApi'
            moviesGenre='Tv Shows On Air'
            className='my-9 w-screen'
          />
          <Row
            title='Popular Tv Shows'
            fetchUrl={NewPopularRequest.fetchPopularTvShows}
            apiType='tvApi'
            moviesGenre='Treding Tv Shows'
            className='my-9 w-screen pb-7vw'
            isNetflix={true}
          />
          {window.innerWidth > 500 ? <Footer /> : ''}
        </div>
      </div>
      <div id='Modal' className='relative z-50' />
    </>
  )
}

export default NewPopular
