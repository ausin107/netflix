
const API_KEY = 'ccfdfca8624b04937b3b9ebb2724678e'
export const baseUrl = 'https://api.themoviedb.org/3'
const TvShowRequests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchActionAdventureTvShows: `/discover/tv?api_key=${API_KEY}&with_genres=10759`,
    fetchDramaTvShows: `/discover/tv?api_key=${API_KEY}&with_genres=18`,
    fetchMysteryTvShows: `/discover/tv?api_key=${API_KEY}&with_genres=9648`,
    fetchSciFiFantasyTvShows: `/discover/tv?api_key=${API_KEY}&with_genres=10765`,
    fetchAnimationTvShows: `/discover/tv?api_key=${API_KEY}&with_genres=16`,
    fetchVideoOnly: `/videos?api_key=${API_KEY}&language=en-US`,
    fetchtvGenres : `/genre/tv/list?api_key=${API_KEY}&language=en-US`,
    fetchTvGenres: `/genre/tv/list?api_key=${API_KEY}&language=en-US`,
    fetchVideoDetail: `?api_key=${API_KEY}&language=en-US`,
    fetchSimilarVideo: `similar?api_key=${API_KEY}&language=en-US&page=20`,
    fetchCreditsInfo:`/credits?api_key=${API_KEY}&language=en-US`,
}
export default TvShowRequests