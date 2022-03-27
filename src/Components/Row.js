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
function Row({ title, fetchUrl, className }) {
    const [infinite, setInfinite] = useState(false)
    const [movies, setMovies] = useState([])
    const [classes, setClasses] = useState('')
    const [delay, setDelay] = useState()
    const traileModalRef = useRef([])
    const [hover, setHover] = useState(false)
    const imgUrl = 'https://image.tmdb.org/t/p/original/'
    useEffect(() => {
        async function fetchMovie() {
            const baseUrl = 'https://api.themoviedb.org/3'
            const request = await axios.get(baseUrl + fetchUrl)
            setMovies(request.data.results)
            // console.log(movies) 
        }
        fetchMovie()
    }, [fetchUrl])

    // console.log(traileModalRef.current) 
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
                swipeable
                removeArrowOnDeviceType={["tablet", "mobile"]}
            >
                {
                    movies.map((movie, index) => {

                        const handleHover = () => {
                            setTimeout(() => {
                                setHover(true)
                            }, 1000)
                        }
                        const handleNotHover = () => {
                            // clearTimeout(delay)
                            // setHover(false) 
                        }
                        return (
                            <div key={movie.id} onMouseOver={() => handleHover()} onMouseOut={() => handleNotHover()} className='test'>
                                <div className={hover && 'image'} >
                                    <img src={imgUrl + movie.poster_path} className='rounded-md cursor-pointer' />
                                </div>
                                {hover && <TrailerModal className={classes} imgUrl={imgUrl + movie.backdrop_path} title={movie.title || movie.name} movieId={movie.id} />}
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default Row