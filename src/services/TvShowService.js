export const TvShowService = {
    query,
};

async function query() {
    try {
        const API_KEY = 'd05cd21e9e9413f2fa48a0b9079472a8';

        const response = await fetch(
            `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
        );
        const tvShowsData = await response.json();
        return tvShowsData.results.slice(2, 7);
    } catch (err) {
        console.error('Error from query', err);
    }
}
