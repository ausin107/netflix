import { useEffect, useRef, useState } from 'react'
import Row from './Row'
import Footer from './Footer'
import TvShowRequests from '../adapters/tvShowRequests'
import Banner from './Banner'
import '../styles/DetailModal.css'

function TvShows() {
    useEffect(() => {
        const title = 'Tv Shows'
        document.title = `${title} - Netflix`
    }, [])
    return (
        <>
            <div className='relative' id='container'>
                <Banner className='' apiType='tvApi' fetchUrl={TvShowRequests.fetchDramaTvShows} />
                <div className='absolute w-full overflow-hidden' style={{ top: '40vw' }}>
                    <div className='w-full absolute h-full bg-backgroundColor -z-10' />
                    <Row
                        title='Trending Now'
                        fetchUrl={TvShowRequests.fetchTrending}
                        apiType='movieApi'
                        moviesGenre='Trending TV Shows'
                        className='my-9 w-screen pt-4'
                    />
                    <Row
                        title='Action & Adventure Tv Shows'
                        fetchUrl={TvShowRequests.fetchActionAdventureTvShows}
                        apiType='tvApi'
                        moviesGenre='Action & Adventure Tv Shows'
                        className='my-9 w-screen '
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
                        title='Drama TV Shows'
                        fetchUrl={TvShowRequests.fetchDramaTvShows}
                        apiType='tvApi'
                        moviesGenre='Drama TV Shows'
                        className='my-9 w-screen'
                        isNetflix={true}
                    />
                    <Row
                        title='Mystery TV Shows'
                        fetchUrl={TvShowRequests.fetchMysteryTvShows}
                        apiType='movieApi'
                        moviesGenre='Mystery TV Shows'
                        className='my-9 w-screen'
                    />
                    <Row
                        title='Children & Family TV Shows'
                        fetchUrl={TvShowRequests.fetchAnimationTvShows}
                        apiType='movieApi'
                        moviesGenre='Children & Family TV Shows'
                        className='my-9 w-screen'
                    />
                    <Row
                        title='Sci-Fi & Fantasy TV Shows'
                        fetchUrl={TvShowRequests.fetchSciFiFantasyTvShows}
                        apiType='movieApi'
                        moviesGenre='Sci-Fi & Fantasy TV Shows'
                        className='my-9 w-screen'
                    />
                    <Footer />
                </div>
            </div>
            <div id='DetailModal' className='relative z-50' />
        </>
    )
}
export default TvShows