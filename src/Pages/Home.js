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
                    <Row title='Phổ biến trên Netflix' fetchUrl={requests.fetchTrending} apiType='movieApi' className='my-9 w-screen pt-4' />
                    <Row title='Phim chiếu rạp' fetchUrl={requests.fetchCinemaMovies} apiType='movieApi' className='my-9 w-screen ' />
                    <Row title='Chỉ có trên Netflix' fetchUrl={requests.fetchNetflixOriginals} apiType='tvApi' className='my-9 w-screen' /> 
                    {/* Netflix originals apiType == tv other == movie */}
                    <Row title='Phim hành động, kịch tính' fetchUrl={requests.fetchActionMovies} apiType='movieApi' className='my-9 w-screen' />
                    <Row title='Phim hoạt hình' fetchUrl={requests.fetchAnimationMovies} apiType='movieApi' className='my-9 w-screen' />
                    <Row title='Khoa học viễn tưởng & siêu nhiên' fetchUrl={requests.fetchSienceFictionMovies} apiType='movieApi' className='my-9 w-screen' />
                    <Row title='Phim kinh dị' fetchUrl={requests.fetchHorrorMovies} apiType='movieApi' className='my-9 w-screen' />
                    <Row title='Chương trình truyền hình hành động & phiêu lưu kịch tính' fetchUrl={requests.fetchDramaMovies} apiType='movieApi' className='my-9 w-screen pb-7vw' />
                    <Footer />
                </div>
            </div>
            <div id="DetailModal" className="relative z-50"/>
        </>
    )
}
export default Home