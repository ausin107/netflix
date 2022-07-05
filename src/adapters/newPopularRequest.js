const API_KEY = 'ccfdfca8624b04937b3b9ebb2724678e'
export const baseUrl = 'https://api.themoviedb.org/3'
export const NewPopularRequest = {
  fetchMovieUpComing: `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=10`,
  fetchPopularMovie: `/movie/popular?api_key=${API_KEY}&language=en-US&page=20`,
  fetchMovieNowPlaying: `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=20`,
  fetchTvShowsOnAir: `/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=20`,
  fetchTvShowsAiringToday: `/tv/airing_today?api_key=${API_KEY}&language=en-US&page=20`,
  fetchPopularTvShows: `/tv/popular?api_key=${API_KEY}&language=en-US&page=20`,
}
export default NewPopularRequest
