const API_KEY = 'ccfdfca8624b04937b3b9ebb2724678e'
export const baseUrl = 'https://api.themoviedb.org/3'
export const HomeRequests = {
  fetchAdventureMovies: `/discover/movie?api_key=${API_KEY}&with_genres=12`,
  fetchFantasyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=14`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchMysteryMovies: `/discover/movie?api_key=${API_KEY}&with_genres=9648`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchHistoryMovies: `/discover/movie?api_key=${API_KEY}&with_genres=36`,
  fetchThrillerMovies: `/discover/movie?api_key=${API_KEY}&with_genres=53`,
  fetchWarMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10752`,
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchAnimationMovies: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  fetchCinemaMovies: `/discover/movie?api_key=${API_KEY}`,
  fetchDramaMovies: `/discover/movie?api_key=${API_KEY}&with_genres=18`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchCrimeMovies: `/discover/movie?api_key=${API_KEY}&with_genres=80`,
  fetchDocumentaryMovies: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchMusicMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10402`,
  fetchFamilyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10751`,
  fetchWesternMovies: `/discover/movie?api_key=${API_KEY}&with_genres=37`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchSienceFictionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
}
export const LinkRequest = {
  fetchVideoOnly: `/videos?api_key=${API_KEY}&language=en-US`,
  fetchMovieGenres: `/genre/movie/list?api_key=${API_KEY}&language=en-US`,
  fetchTvGenres: `/genre/tv/list?api_key=${API_KEY}&language=en-US`,
  fetchVideoDetail: `?api_key=${API_KEY}&language=en-US`,
  fetchSimilarVideo: `similar?api_key=${API_KEY}&language=en-US&page=20`,
  fetchCreditsInfo: `/credits?api_key=${API_KEY}&language=en-US`,
}
export default {
  HomeRequests,
  LinkRequest,
}
