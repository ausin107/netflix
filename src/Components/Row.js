import { useEffect, useState, useRef, } from "react";
import axios from 'axios'
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import './Components.css'
import TrailerModal from "./TrailerModal";
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6.5,
        paritialVisibilityGutter: 100
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4.5,
        paritialVisibilityGutter: 50
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 3.5,
        paritialVisibilityGutter: 30
    }
};
function Row({ title, fetchUrl, className, apiType }) {
    const [infinite, setInfinite] = useState(false)
    const [movies, setMovies] = useState([])
    const [classes, setClasses] = useState('')
    const [handleDelay, setHandleDelay] = useState()
    const traileModalRef = useRef([])
    const [hover, setHover] = useState(false)
    const imgUrl = 'https://image.tmdb.org/t/p/original/'
    useEffect(() => {
        async function fetchMovie() {
            try{
                const baseUrl = 'https://api.themoviedb.org/3'
                const request = await axios.get(baseUrl + fetchUrl)
                setMovies(request.data.results)
            } catch(error){
                // console.log(error)
            }
        }
        fetchMovie()
    }, [fetchUrl])

    // console.log(typeof className) 
    const handleHover = (movieId) => {
        setHandleDelay(setTimeout(() => {
           setHover(movieId)
        }, 600))
        
    }
    const handleNotHover = () => {
        clearTimeout(handleDelay)
        // setHover(false)
    }
    return (
        <div className={className} >
            <h1 className="text-neutral-200 text-xl pl-15 font-bold">{title}</h1>
            <Carousel
                ssr={true}
                // ref={traileModalRef}
                slidesToSlide={5.75}
                containerClass="mt-4"
                // infinite={true}
                itemClass="image-item movie"
                responsive={responsive}
                className="pl-3.4vw"
                // swipeable
                removeArrowOnDeviceType={["tablet", "mobile"]}
            >
                {
                    movies.map((movie, index) => {
                        
                        return (
                            <div key={movie.id} onMouseEnter={() => handleHover(movie.id)} onMouseLeave={() => handleNotHover()}>
                                <div className={hover ==movie.id ? 'image' : ''} >
                                    <img src={imgUrl + movie.poster_path} className='rounded-md cursor-pointer' />
                                </div>
                                {/* TrailerModal fetch when hover === movie.id (each movie will return their unique id) => decrease times of fecth data*/}
                                {hover == movie.id ? <TrailerModal className={classes} imgUrl={imgUrl + movie.backdrop_path} title={movie.title || movie.name} movieId={movie.id} apiType={apiType} /> : ''}
                                {/* <TrailerModal hover={movie.id} handleNotHover={handleNotHover} className={classes} imgUrl={imgUrl + movie.backdrop_path} title={movie.title || movie.name} movieId={movie.id} apiType={apiType} /> x */}
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default Row