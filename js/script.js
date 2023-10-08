const global = {
  currentPage: window.location.pathname,
};

const displayPopularMovies = async () => {
  const { results } = await fetchAPIData('movie/popular');
  console.log(results);
};
//fetch data from TMDB API

const fetchAPIData = async (endpoint) => {
  const API_KEY = 'c012f0436866bbf5f024bee3107b5b7d';
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data;
};
//hightlight active link

const hightlightActiveLink = () => {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
};
//initialize Application
const init = () => {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      console.log('Shows');
      break;
    case '/movie-details.html':
      console.log('Movie details');
      break;
    case '/tv-details.html':
      console.log('TV details');
      break;
    case '/search.html':
      console.log('Search');

      break;
  }
  hightlightActiveLink();
};

document.addEventListener('DOMContentLoaded', init);
