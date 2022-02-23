import { useEffect, useState } from "react"
import Row from "../Components/Row"
import requests from "./request"
import axios from "axios"
function Home() {
    const [banner, setBanner] = useState('')
    const bannerUrl = 'https://image.tmdb.org/t/p/original/'
    useEffect(() => {
        async function getBanner() {
            const randomBanner = Math.floor(Math.random() * 20)
            const baseUrl = 'https://api.themoviedb.org/3'
            const results = await axios.get(baseUrl + requests.fetchNetflixOriginals)
            setBanner(results.data.results[randomBanner].backdrop_path)
        }
        getBanner()
    })
    return (
        <>
            <div className="relative">
                <div>
                    <img className='bg-center bg-cover w-full h-screen ' src={bannerUrl + banner} alt='Banner image' />
                    <div className="banner-fade absolute bottom-0 w-screen" />
                </div>
                <div className="absolute" style={{background: '#0d0e0e'}}>
                    <Row title='Phổ biến trên Netflix' fetchUrl={requests.fetchTrending} className='my-9 mt-0' />
                    <Row title='Phim chiếu rạp' fetchUrl={requests.fetchCinemaMovies} className='my-9' />
                    <Row title='Chỉ có trên Netflix' fetchUrl={requests.fetchNetflixOriginals} className='my-9' />
                    <Row title='Phim hành động, kịch tính' fetchUrl={requests.fetchActionMovies} className='my-9' />
                    <Row title='Phim hoạt hình' fetchUrl={requests.fetchAnimationMovies} className='my-9' />
                    <Row title='Khoa học viễn tưởng & siêu nhiên' fetchUrl={requests.fetchSienceFictionMovies} className='my-9' />
                    <Row title='Phim kinh dị' fetchUrl={requests.fetchHorrorMovies} className='my-9' />
                    <Row title='Chương trình truyền hình hành động & phiêu lưu kịch tính' fetchUrl={requests.fetchDramaMovies} className='my-9' />
                </div>
            </div>

        </>
    )
}
export default Home