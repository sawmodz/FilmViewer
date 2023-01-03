const xhr = new XMLHttpRequest();

const apiKey = "myapikey";
let page = 1;
let totalPages = 15;

const updateMovies = () => {
  xhr.open(
    "GET",
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=${page}`,
    true
  );

  xhr.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      const movies = response.results;
      let output = "";
      let pagination = "";

      for (let i = 0; i < movies.length - 2; i++) {
        output += `<div id="${movies[i].id}" onclick="displayMovieDetails(${movies[i].id})">
              <img src="https://image.tmdb.org/t/p/w500${movies[i].poster_path}" alt="Affiche de ${movies[i].title}">
              <p>${movies[i].title}</p>
            </div>`;
      }

      document.getElementById("movies").innerHTML = output;

      for (let i = 1; i <= totalPages; i++) {
        if (i === page) {
          pagination += `<button class="current">${i}</button>`;
        } else {
          pagination += `<button onclick="goToPage(${i})">${i}</button>`;
        }
      }
      document.getElementById("pagination").innerHTML = pagination;
    }
  };
  xhr.send();
};

const searchMovies = () => {
  const search = document.getElementById("search-input").value;

  xhr.open(
    "GET",
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=fr-FR&query=${search}&page=1`,
    true
  );
  xhr.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      const movies = response.results;
      let output = "";
      for (let i = 0; i < movies.length; i++) {
        output += `<div id="${movies[i].id}" onclick="displayMovieDetails(${movies[i].id})">
  <img src="https://image.tmdb.org/t/p/w500${movies[i].poster_path}" alt="Affiche de ${movies[i].title}">
  <p>${movies[i].title}</p>
  <div class="movie-tags"></div>
</div>`;
      }
      document.getElementById("movies").innerHTML = output;
    }
  };
  xhr.send();
};

const displayMovieDetails = (movieId) => {
  window.location.assign(`./movie-details.html?id=${movieId}`);
};

const goToPage = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages) {
    page = newPage;
    updateMovies();
  }
};

document.getElementById("search-form").onsubmit = (event) => {
  event.preventDefault();

  searchMovies();
};

updateMovies();
