const API_KEY = '4cd8eda69724fa63af45af35bb5db6f9';

const BASE_URL = 'https://api.themoviedb.org/3';
const SEARCH_URL = '/search/movie';
const POPULAR_URL = '/trending/all/day';
const DETAILS_URL = '/movie/';

async function fetchWithErrorHandling(url = '') {
  const response = await fetch(url);

  return response.ok ? await response.json() : Promise.reject('Not found');
}
// Promise.reject(new Error(`Not found`));

export function fetchMoviesSearch(query, page) {
  const url = `${BASE_URL}${SEARCH_URL}?api_key=${API_KEY}&query=${query}&page=${page}`;
  return fetchWithErrorHandling(url);
}

export function fetchPopularMovies(page) {
  const url = `${BASE_URL}${POPULAR_URL}?api_key=${API_KEY}&page=${page}`;
  return fetchWithErrorHandling(url);
}

export function fetchMoviesDetails(id) {
  const url = `${BASE_URL}${DETAILS_URL}${id}?api_key=${API_KEY}`;
  return fetchWithErrorHandling(url);
}

export function fetchCast(id) {
  const url = `${BASE_URL}${DETAILS_URL}${id}/credits?api_key=${API_KEY}`;
  return fetchWithErrorHandling(url);
}

export function fetcReviews(id) {
  const url = `${BASE_URL}${DETAILS_URL}${id}/reviews?api_key=${API_KEY}`;
  return fetchWithErrorHandling(url);
}
