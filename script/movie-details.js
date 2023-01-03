const xhr = new XMLHttpRequest();

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");
const apiKey = "myapikey";

xhr.open(
  "GET",
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr-FR`,
  true
);
xhr.onload = function () {
  if (this.status === 200) {
    const movie = JSON.parse(this.responseText);
    document.getElementById(
      "movie-poster"
    ).src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    document.getElementById("movie-title").textContent = movie.title;
    document.getElementById("movie-overview").textContent = movie.overview;
    const genres = movie.genres;

    let tags = "";
    for (let i = 0; i < genres.length; i++) {
      tags += `<span class="tag">${genres[i].name}</span>`;
    }

    const rating = movie.vote_average;

    document.getElementById("movie-tags").innerHTML = tags;
    document.getElementById("movie-rating").textContent = `Note: ${rating}/10`;
  }
};
xhr.send();
