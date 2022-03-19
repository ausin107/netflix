import { useEffect, useState } from "react";
import axios from 'axios'
import Carousel from "react-multi-carousel";
import { Image } from "semantic-ui-react";
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

    return (
        <div className={className} >
            <h1 className="text-neutral-200 text-xl pl-15 font-bold">{title}</h1>
            <Carousel
                ssr={true}
                slidesToSlide={5.75}
                containerClass="mt-4"
                // infinite={true}
                itemClass="image-item movie "
                responsive={responsive}
                className="pl-3.4vw"
                swipeable
                removeArrowOnDeviceType={["tablet", "mobile"]}
            >
                {
                    movies.map(movie => {
                        return <div key={movie.id}>
                            <Image draggable={false} className="rounded-md cursor-pointer" src={imgUrl + movie.poster_path} />
                            <TrailerModal url={imgUrl + movie.backdrop_path} />
                        </div>
                    })
                }
            </Carousel>
        </div>
    )
}

export default Row