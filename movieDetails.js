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
      "Bearer yourtoken",
  },
};


fetch(imagesURL, options).then(response => response.json()).then(data => {
  const templ =
    `<div id="carouselExampleInterval" class="carousel slide background-img" data-ride="carousel" style="background: url('https://image.tmdb.org/t/p/w500/${data.backdrops[4].file_path}');">
    <div class="carousel-inner">
      <div class="carousel-item active" data-interval="10000">
        <img src="https://image.tmdb.org/t/p/w500/${data.backdrops[2].file_path}" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item" data-interval="10000">
        <img src="https://image.tmdb.org/t/p/w500/${data.backdrops[1].file_path}" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item data-interval="1000"">
        <img src="https://image.tmdb.org/t/p/w500/${data.backdrops[0].file_path}" class="d-block w-100" alt="...">
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleInterval" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  
    </a>
    <a class="carousel-control-next" href="#carouselExampleInterval" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
     
    </a>
  </div>
    `;

  document.getElementById("galerija").insertAdjacentHTML("afterbegin", templ);
}).catch(err => {
  const toastLiveExample = document.getElementById("liveToast");
  document.getElementById("error-message").innerHTML = err.message;
  const toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
});

fetch(imagesURL, options).then(response => response.json()).then(data => {
}).catch(err => {
  const toastLiveExample = document.getElementById("liveToast");
  document.getElementById("error-message").innerHTML = err.message;
  const toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
});


const appendToResponse = 'genre,keywords,alternative_titles,changes,credits,images,keywords,lists,releases,reviews,similar,translations,videos';

const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=${appendToResponse}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const templ = ``;
  }).catch((err) => {
    const toastLiveExample = document.getElementById("liveToast");
    document.getElementById("error-message").innerHTML = err.message;
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
  });
