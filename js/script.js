const global = {
  currentPage: window.location.pathname,
};

//display 20 most  popular movies on home page
const displayPopularMovies = async () => {
  const { results } = await fetchAPIData('movie/popular');
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
  <a href="movie-details.html?id=${movie.id}">
    ${
      movie.poster_path
        ? `<img
    src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
    class="card-img-top"
    alt="${movie.title}"
  />`
        : `<img
  src="images/no-image.jpg"
  class="card-img-top"
  alt="Movie Title"
/>`
    }
  </a>
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="card-text">
      <small class="text-muted">${movie.release_date}</small>
    </p>
  </div>`;
    document.getElementById('popular-movies').appendChild(div);
  });
};

//display 20 most  popular TV shows on home page
const displayPopularTvShows = async () => {
  const { results } = await fetchAPIData('tv/popular');
  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
  <a href="tv-details.html?id=${show.id}">
    ${
      show.poster_path
        ? `<img
    src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
    class="card-img-top"
    alt="${show.name}"
  />`
        : `<img
  src="images/no-image.jpg"
  class="card-img-top"
  alt="${show.name}"
  />`
    }
  </a>
  <div class="card-body">
    <h5 class="card-title">${show.name}</h5>
    <p class="card-text">
      <small class="text-muted">Air Date: ${show.first_air_date}</small>
    </p>
  </div>`;
    document.querySelector('#popular-shows').appendChild(div);
  });
};

//Display Movie Details
const displayMovieDetails = async () => {
  const movieId = window.location.search.split('=')[1];
  const movie = await fetchAPIData(`movie/${movieId}`);
  const div = document.createElement('div');
  div.innerHTML = `<div class="details-top">
  ${
    movie.poster_path
      ? `<img
  src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
  class="card-img-top"
  alt="${movie.title}"
/>`
      : `<img 
src="images/no-image.jpg"
class="card-img-top"
alt="${movie.title}"
/>`
  }
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)}/ 10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}</p>
    <p>
      ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
    ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
    </ul>
    <a href="${
      movie.homepage
    }" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span>$${addCommasToNumber(
      movie.budget
    )}</li>
    <li><span class="text-secondary">Revenue:</span>$${addCommasToNumber(
      movie.revenue
    )}</li>
    <li><span class="text-secondary">Runtime:</span>${
      movie.runtime
    } minuites</li>
    <li><span class="text-secondary">Status:</span>${movie.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${movie.production_companies
    .map((company) => `<span>${company.name}</span>`)
    .join(', ')}</div>
</div>`;
  document.querySelector('#movie-details').appendChild(div);
};
//fetch data from TMDB API

const fetchAPIData = async (endpoint) => {
  //Register your API key at https://www.themoviedb.org/settings/api and enter here
  //Only use this for development or very small projects. You should store your key and make requests from a Server
  const API_KEY = 'c012f0436866bbf5f024bee3107b5b7d';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  hideSpinner();
  return data;
};

const showSpinner = () => {
  document.querySelector('.spinner').classList.add('show');
};

const hideSpinner = () => {
  document.querySelector('.spinner').classList.remove('show');
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
// Search for Js function to add commas to numbers in Stack Overflow
const addCommasToNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
//initialize Application
const init = () => {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularTvShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
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
