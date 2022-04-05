import { useEffect, useRef, useState } from "react"
import Row from "../Components/Row"
import Footer from "../Components/Footer"
import requests from "./request"
import Banner from "../Components/Banner"

function Home() {
    
    useEffect(() => {
        const title = 'Home'
        document.title = `${title} - Netflix`
    }, [])
    
    return (
        <>
            <div className="relative">
                <Banner />
                <div className="absolute overflow-hidden w-full" style={{ top: '40vw' }}>
                    <div className="w-full absolute h-full bg-backgroundColor -z-10" />
                    <Row title='Phổ biến trên Netflix' fetchUrl={requests.fetchTrending} className='my-9 w-screen pt-4' />
                    <Row title='Phim chiếu rạp' fetchUrl={requests.fetchCinemaMovies} className='my-9 w-screen ' />
                    <Row title='Chỉ có trên Netflix' fetchUrl={requests.fetchNetflixOriginals} className='my-9 w-screen' />
                    <Row title='Phim hành động, kịch tính' fetchUrl={requests.fetchActionMovies} className='my-9 w-screen' />
                    <Row title='Phim hoạt hình' fetchUrl={requests.fetchAnimationMovies} className='my-9 w-screen' />
                    <Row title='Khoa học viễn tưởng & siêu nhiên' fetchUrl={requests.fetchSienceFictionMovies} className='my-9 w-screen' />
                    <Row title='Phim kinh dị' fetchUrl={requests.fetchHorrorMovies} className='my-9 w-screen' />
                    <Row title='Chương trình truyền hình hành động & phiêu lưu kịch tính' fetchUrl={requests.fetchDramaMovies} className='my-9 w-screen pb-7vw' />
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default Home