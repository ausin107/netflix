import React from "react"
import Row from "../Components/Row"
import requests from "./request"
function Home(){
    return (
        <>
        <div className="relative bg-stone-900">
            <img className='bg-center bg-cover w-full h-screen'src='https://image.tmdb.org/t/p/original//iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg' alt='Banner image' />
            <Row title='Phổ biến trên Netflix' fetchUrl={requests.fetchTrending} />
            <Row title='Chỉ có trên Netflix' fetchUrl={requests.fetchNetflixOriginals} />
            <Row title='Top bình chọn trên Netflix' fetchUrl={requests.fetchTopRated} />
            <Row title='Phim hành động, kịch tính' fetchUrl={requests.fetchActionMovies} />
            <Row title='Phim tài liệu' fetchUrl={requests.fetchDocumantaries} />
            <Row title='Phim kinh dị' fetchUrl={requests.fetchHorrorMovies} />
            <Row title='Phim lãng mạn' fetchUrl={requests.fetchRomanceMovies} />
            <Row title='Phim hài truyền hình' fetchUrl={requests.fetchComedyMovies} />

        </div>

        </>
    )
}
export default Home