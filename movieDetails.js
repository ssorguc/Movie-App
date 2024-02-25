'use strict';
console.log("Otvorili smo movie details js");

//Global variables
const movieId = localStorage.getItem("movieId");

const apiKey = "a496788d6dd8726ab0a300f87b22a7eb";
const imagesURL = `https://api.themoviedb.org/3/movie/${movieId}/images`;
const movieDetailsURL = `https://api.themoviedb.org/3/movie/${movieId}/`

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDk2Nzg4ZDZkZDg3MjZhYjBhMzAwZjg3YjIyYTdlYiIsInN1YiI6IjU5ZTI1YWM0YzNhMzY4N2MwNTAwMjI5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xdpv-G8ChAsKwkP5l7-E-G2_3xLEZWopJoaRnMyMAUM",
  },
};


fetch(imagesURL, options).then(response => response.json()).then(data => {
  const templ =
    `
    <div id="carouselExampleIndicators" class="carousel slide">
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
            aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
            aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
            aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="https://image.tmdb.org/t/p/w500/${data.backdrops[9].file_path}" class="d-block w-100" alt="Movie Theater" />
        </div>
        <div class="carousel-item">
            <img src="https://image.tmdb.org/t/p/w500/${data.backdrops[6].file_path}" class="d-block w-100" alt="Popcorn" />
        </div>
        <div class="carousel-item">
            <img src="https://image.tmdb.org/t/p/w500/${data.backdrops[7].file_path}" class="d-block w-100" alt="Friends" />
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
</div>
    `;

  document.getElementById("galerija").insertAdjacentHTML("afterbegin", templ);
})

fetch(imagesURL, options).then(response => response.json()).then(data => {
});


const appendToResponse = 'videos,credits'; // Example: Videos and credits

const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=${appendToResponse}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching movie details:', error);
  });
