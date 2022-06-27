import { useEffect, useRef, useState } from 'react'
import Row from '../components/Row'
import Footer from '../components/Footer'
import { LinkRequest, HomeRequests } from '../adapters/homeRequests'
import Banner from '../components/Banner'
import '../styles/DetailModal.css'
function Home() {
  const [bannerUrl, setBannerUrl] = useState()
  const [apiType, setApiType] = useState()
  useEffect(() => {
    const title = 'Home'
    document.title = `${title} - Netflix`
    let keys = Object.values(HomeRequests)
    keys = keys.sort(() => Math.random() - 0.5)
    const randomNumber = ((keys.length - 1) * Math.random()) >> 0
    const banner = keys[randomNumber]
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
            title='Trending Now'
            fetchUrl={HomeRequests.fetchTrending}
            apiType='movieApi'
            moviesGenre='Trending Movie'
            className='my-9 w-screen pt-4'
          />
          <Row
            title='Cinema Movies'
            fetchUrl={HomeRequests.fetchCinemaMovies}
            apiType='movieApi'
            moviesGenre='Cinema Movie'
            className='my-9 w-screen '
          />
          <Row
            title='Only on Netflix'
            fetchUrl={HomeRequests.fetchNetflixOriginals}
            apiType='tvApi'
            moviesGenre='Netflix TV Shows'
            className='my-9 w-screen'
            isNetflix={true}
          />
          <Row
            title='Kids Tv Shows'
            fetchUrl={HomeRequests.fetchKidsTvShows}
            apiType='tvApi'
            moviesGenre='Kids Tv Shows'
            className='my-9 w-screen'
          />
          <Row
            title='Action Movies'
            fetchUrl={HomeRequests.fetchActionMovies}
            apiType='movieApi'
            moviesGenre='Action Movie'
            className='my-9 w-screen'
          />
          <Row
            title='Children & Family TV'
            fetchUrl={HomeRequests.fetchAnimationMovies}
            apiType='movieApi'
            moviesGenre='Children & Family TV Shows'
            className='my-9 w-screen'
          />
          <Row
            title='Comedies TV Shows'
            fetchUrl={HomeRequests.fetchComedyTvShows}
            apiType='tvApi'
            moviesGenre='Comedies TV Shows'
            className='my-9 w-screen'
          />
          <Row
            title='Sci-Fi & Supernatural'
            fetchUrl={HomeRequests.fetchSienceFictionMovies}
            apiType='movieApi'
            moviesGenre='Sci-Fi & Supernatural Movie'
            className='my-9 w-screen'
          />
          <Row
            title='Western Movie'
            fetchUrl={HomeRequests.fetchWesternMovies}
            apiType='movieApi'
            moviesGenre='Western Movies'
            className='my-9 w-screen'
          />
          <Row
            title='Talk Tv Shows'
            fetchUrl={HomeRequests.fetchTalkTvShows}
            apiType='tvApi'
            moviesGenre='Talk TV Shows'
            className='my-9 w-screen'
          />
          <Row
            title='Horror Movies'
            fetchUrl={HomeRequests.fetchHorrorMovies}
            apiType='movieApi'
            moviesGenre='Horror Movie'
            className='my-9 w-screen'
          />
          <Row
            title='Drama Movies'
            fetchUrl={HomeRequests.fetchDramaMovies}
            apiType='movieApi'
            moviesGenre='Drama Movie'
            className='my-9 w-screen'
          />
          <Row
            title='News'
            fetchUrl={HomeRequests.fetchNewsTvShows}
            apiType='tvApi'
            moviesGenre='News TV Shows'
            className='my-9 w-screen pb-7vw'
          />
          <Footer />
        </div>
      </div>
      <div id='Modal' className='relative z-50' />
    </>
  )
}
export default Home
