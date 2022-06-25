const API_KEY = 'ccfdfca8624b04937b3b9ebb2724678e'
export const baseUrl = 'https://api.themoviedb.org/3'
export const MoviesRequests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchCinemaMovies: `/discover/movie?api_key=${API_KEY}`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchDramaMovies: `/discover/movie?api_key=${API_KEY}&with_genres=18`,
  fetchWarMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10752`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchThrillerMovies: `/discover/movie?api_key=${API_KEY}&with_genres=53`,
  fetchSienceFictionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
  fetchAnimationMovies: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchCrimeMovies: `/discover/movie?api_key=${API_KEY}&with_genres=80`,
  fetchDocumentaryMovies: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchMusicMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10402`,
  fetchFamilyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10751`,
  fetchWesternMovies: `/discover/movie?api_key=${API_KEY}&with_genres=37`,
}
export default {
  MoviesRequests,
}
