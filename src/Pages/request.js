
const API_KEY = 'ccfdfca8624b04937b3b9ebb2724678e'
export const baseUrl = 'https://api.themoviedb.org/3'
const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchCinemaMovies: `/discover/movie?api_key=${API_KEY}`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchDramaMovies: `/discover/movie?api_key=${API_KEY}&with_genres=18`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchSienceFictionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
    fetchAnimationMovies: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
    fetchVideoOnly: `/videos?api_key=${API_KEY}&language=en-US`,
    fetchMovieGenres : `/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    fetchTvGenres: `/genre/tv/list?api_key=${API_KEY}&language=en-US`,
    fetchMovieDetail: `?api_key=${API_KEY}&language=en-US`
}
export default requests