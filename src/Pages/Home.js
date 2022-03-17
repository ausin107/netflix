import { useEffect, useRef, useState } from "react"
import Row from "../Components/Row"
import Video from "../Components/Video"
import Footer from "../Components/Footer"
import requests from "./request"
import axios from "axios"
import Button from "../Components/Button"

function Home() {
    const [banner, setBanner] = useState([])
    const [overView, setOverView] = useState('')
    const [title, setTitle] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const bannerUrl = 'https://image.tmdb.org/t/p/original/'
    const overViewRef = useRef()
    const textRef = useRef()
    useEffect(() => {
        const title = 'Home'
        document.title = `${title} - Netflix`
    })
    useEffect(() => {
        async function getBanner() {
            const randomBanner = Math.floor(Math.random() * 20)
            const baseUrl = 'https://api.themoviedb.org/3'
            const tvVideoUrl = 'https://api.themoviedb.org/3/tv/'
            const baseVideoEmbed = 'https://www.youtube.com/embed/'
            // const movieVideoUrl = 'https://api.themoviedb.org/3/moive/'
            const results = await axios.get(baseUrl + requests.fetchNetflixOriginals)
            const data = results.data.results[randomBanner]
            setBanner(data.backdrop_path)
            // setTitle(data.title.toUpperCase()) // các api khác
            setTitle(data.name.toUpperCase()) //trường hợp Netflix original
            setOverView(data.overview)
            const videoResult = await axios.get(tvVideoUrl + data.id + requests.fetchVideoOnly)
            const tvVideoData = videoResult.data.results[0]
            const trailerIndex = videoResult.data.results.find((item, index) => {
                return item.type == "Trailer";
            })
            setVideoUrl(baseVideoEmbed + trailerIndex.key)
            // console.log(videoResult.data.results)
            // console.log(trailerIndex)
        }
        getBanner()
    }, [])
    return (
        <>
            <div className="relative">
                <div>
                    <img className='bg-center bg-cover w-full max-h-full' src={bannerUrl + banner} alt='Banner image' />
                    <div className="flex flex-col absolute bottom-1/3 ml-15 z-10">
                        <div ref={textRef} className="text-white text-5.5 font-bold w-5/12 title-banner">{title}</div>
                        <div ref={overViewRef} className="text-white font-normal w-1/3 text-1.4 mt-1vw bannerOverViewA">{overView}</div>
                        <div className="flex flex-row mt-1.5vw">
                            <Button className='bg-white text-black font-bold mr-4' title='Phát' icon={1} />
                            <Button className='text-white bg-buttonColor font-semibold' title='Thông tin khác' icon={2} />
                        </div>
                    </div>
                    <div className="banner-fade absolute bottom-0 w-full" />
                    <Video className='' videoUrl={videoUrl} overViewRef={overViewRef.current} textRef={textRef.current} />
                </div>
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