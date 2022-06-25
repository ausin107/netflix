const API_KEY = 'ccfdfca8624b04937b3b9ebb2724678e'
export const baseUrl = 'https://api.themoviedb.org/3'
export const TvShowRequests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchActionAdventureTvShows: `/discover/tv?api_key=${API_KEY}&with_genres=10759`,
  fetchKidsTvShows: `/discover/tv?api_key=${API_KEY}&with_genres=10762`,
  fetchNewsTvShows: `/discover/tv?api_key=${API_KEY}&with_genres=10763`,
  fetchWarPoliticsTvShows: `/discover/tv?api_key=${API_KEY}&with_genres=10768`,
  fetchTalkTvShows: `/discover/tv?api_key=${API_KEY}&with_genres=10767`,
  fetchDramaTvShows: `/discover/tv?api_key=${API_KEY}&with_genres=18`,
  fetchComedyTvShows: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
  fetchMysteryTvShows: `/discover/tv?api_key=${API_KEY}&with_genres=9648`,
  fetchSciFiFantasyTvShows: `/discover/tv?api_key=${API_KEY}&with_genres=10765`,
  fetchAnimationTvShows: `/discover/tv?api_key=${API_KEY}&with_genres=16`,
}
export default {
  TvShowRequests,
}
