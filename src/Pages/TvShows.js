import { useEffect, useRef, useState } from 'react'
import Row from '../components/Row'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import { TvShowRequests } from '../adapters/tvShowRequests'
import '../styles/DetailModal.css'

function TvShows() {
  const [bannerUrl, setBannerUrl] = useState()
  const [apiType, setApiType] = useState()
  useEffect(() => {
    const title = 'Tv Shows'
    document.title = `${title} - Netflix`
    let keys = Object.values(TvShowRequests)
    keys = keys.sort(() => Math.random - 0.5)
    const banner = keys[((keys.length - 1) * Math.random()) >> 0]
    setBannerUrl(banner)
    banner.includes('tv') == true ? setApiType('tvApi') : setApiType('movieApi')
  }, [])
  return (
    <>
      <div className='relative' id='container'>
        {!!bannerUrl && <Banner className='' apiType={apiType} fetchUrl={bannerUrl} />}
        <div className='absolute w-full overflow-hidden' style={{ top: '40vw' }}>
          <div className='w-full absolute h-full bg-backgroundColor -z-10' />
          <Row
            title='Action & Adventure Tv Shows'
            fetchUrl={TvShowRequests.fetchActionAdventureTvShows}
            apiType='tvApi'
            moviesGenre='Action & Adventure Tv Shows'
            className='my-9 w-screen '
          />
          <Row
            title='Trending Now'
            fetchUrl={TvShowRequests.fetchTrending}
            apiType='movieApi'
            moviesGenre='Trending TV Shows'
            className='my-9 w-screen pt-4'
          />
          <Row
            title='Kids Tv Shows'
            fetchUrl={TvShowRequests.fetchKidsTvShows}
            apiType='tvApi'
            moviesGenre='Kids Tv Shows'
            className='my-9 w-screen'
          />
          <Row
            title='Only on Netflix'
            fetchUrl={TvShowRequests.fetchNetflixOriginals}
            apiType='tvApi'
            moviesGenre='Netflix TV Shows'
            className='my-9 w-screen'
            isNetflix={true}
          />
          <Row
            title='Talk Tv Shows'
            fetchUrl={TvShowRequests.fetchTalkTvShows}
            apiType='tvApi'
            moviesGenre='Talk TV Shows'
            className='my-9 w-screen'
          />
          <Row
            title='Children & Family TV Shows'
            fetchUrl={TvShowRequests.fetchAnimationTvShows}
            apiType='tvApi'
            moviesGenre='Children & Family TV Shows'
            className='my-9 w-screen'
          />
          <Row
            title='News'
            fetchUrl={TvShowRequests.fetchNewsTvShows}
            apiType='tvApi'
            moviesGenre='News TV Shows'
            className='my-9 w-screen'
          />
          <Row
            title='Comedies TV Shows'
            fetchUrl={TvShowRequests.fetchComedyTvShows}
            apiType='tvApi'
            moviesGenre='Comedies TV Shows'
            className='my-9 w-screen'
          />
          <Row
            title='Drama TV Shows'
            fetchUrl={TvShowRequests.fetchDramaTvShows}
            apiType='tvApi'
            moviesGenre='Drama TV Shows'
            className='my-9 w-screen'
          />
          <Row
            title='Mystery TV Shows'
            fetchUrl={TvShowRequests.fetchMysteryTvShows}
            apiType='tvApi'
            moviesGenre='Mystery TV Shows'
            className='my-9 w-screen'
          />
          <Row
            title='Sci-Fi & Fantasy TV Shows'
            fetchUrl={TvShowRequests.fetchSciFiFantasyTvShows}
            apiType='tvApi'
            moviesGenre='Sci-Fi & Fantasy TV Shows'
            className='my-9 w-screen pb-7vw'
          />
          <Footer />
        </div>
      </div>
      <div id='Modal' className='relative z-50' />
    </>
  )
}
export default TvShows
