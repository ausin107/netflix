import { useEffect, useState } from "react";
import axios from 'axios'
import requests from "../Pages/request";
function Row({ title, fetchUrl }) {
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
        <div>
            <h1 className="text-neutral-200 pl-15 text-2xl">{title}</h1>
            <div className="flex flex-row px-15">
                {
                    movies.map(movie => {
                        return <img className="w-1/6 px-0.5 h-" src={imgUrl+movie.poster_path} key={movie.id} />
                    })
                }
            </div>
        </div>
    )
}

export default Row