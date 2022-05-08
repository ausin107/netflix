import { useEffect, useRef, useState } from "react"
import Row from "../Components/Row"
import Footer from "../Components/Footer"
import requests from "./request"
import Banner from "../Components/Banner"
import DetailModal from "../Components/DetailModal"
function Home() {

    useEffect(() => {
        const title = 'Home'
        document.title = `${title} - Netflix`
    }, [])

    return (
        <>
            <div className="relative" id="container">
                <Banner />
                <div className="absolute w-full overflow-hidden" style={{ top: '40vw' }}>
                    <div className="w-full absolute h-full bg-backgroundColor -z-10" />
                    <Row title='Trending Now' fetchUrl={requests.fetchTrending} apiType='movieApi' className='my-9 w-screen pt-4' />
                    <Row title='Cinema Movies' fetchUrl={requests.fetchCinemaMovies} apiType='movieApi' className='my-9 w-screen ' />
                    <Row title='Only on Netflix' fetchUrl={requests.fetchNetflixOriginals} apiType='tvApi' className='my-9 w-screen' /> 
                    {/* Netflix originals apiType == tv other == movie */}
                    <Row title='Action Movies' fetchUrl={requests.fetchActionMovies} apiType='movieApi' className='my-9 w-screen' />
                    <Row title='Children & Family TV' fetchUrl={requests.fetchAnimationMovies} apiType='movieApi' className='my-9 w-screen' />
                    <Row title='Sci-Fi & Supernatural' fetchUrl={requests.fetchSienceFictionMovies} apiType='movieApi' className='my-9 w-screen' />
                    <Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} apiType='movieApi' className='my-9 w-screen' />
                    <Row title='Drama Movies' fetchUrl={requests.fetchDramaMovies} apiType='movieApi' className='my-9 w-screen pb-7vw' />
                    <Footer />
                </div>
            </div>
            <div id="DetailModal" className="relative z-50"/>
        </>
    )
}
export default Home