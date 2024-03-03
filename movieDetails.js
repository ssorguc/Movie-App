'use strict';

//Global variables
const movieId = localStorage.getItem("movieId");
const movieDetailsURL = `https://api.themoviedb.org/3/movie/${movieId}/`
const appendToResponse = 'genre,keywords,alternative_titles,changes,credits,images,keywords,lists,releases,reviews,similar,translations,videos,casts';
const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=${appendToResponse}`;
const youtubeVideoURL = "https://www.youtube.com/watch?v="


fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    let slides = "";
    data.images.backdrops?.forEach((element, index) => {
      let individualSlide = "";
      if (index === 0) {
        individualSlide = `<div class="carousel-item active" data-interval="1000">
        <img src="https://image.tmdb.org/t/p/w500${element.file_path}" class="d-block w-100" alt="...">
      </div>`;
      } else {
        individualSlide = `<div class="carousel-item" data-interval="5000">
        <img src="https://image.tmdb.org/t/p/w500${element.file_path}" class="d-block w-100" alt="...">
      </div>`;
      }
      slides += individualSlide;
    });
    const templ =
      `<div id="carouselExampleInterval" class="carousel slide background-img" data-ride="carousel" >
    <div class="carousel-inner">
    ${slides}
      
    </div>
    <a class="carousel-control-prev" href="#carouselExampleInterval" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>

    </a>
    <a class="carousel-control-next" href="#carouselExampleInterval" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>

    </a>
  </div>
    `;
    console.log(data)
    document.getElementById("galerija").insertAdjacentHTML("afterbegin", templ);
    document.getElementById("title").textContent = data.title;
    document.getElementById("year").textContent = data.release_date;
    document.getElementById("genre").textContent = data.genres.map(x => x.name);
    document.getElementById("cast").textContent = data.casts.cast.map(x => x.name).filter((index) => index < 5);
    document.getElementById("desc").textContent = data.overview;
    const findTrailer = data.videos.results.find(elm => elm.name.toLowerCase().includes("trailer"))
    const video =
      `<iframe class="px-3" height="560px" width="100%" src="https://www.youtube.com/embed/${findTrailer.key}">
      </iframe>
    `;
    document.getElementById("video-col").insertAdjacentHTML('beforeend', video);
  }).catch((err) => {
    const toastLiveExample = document.getElementById("liveToast");
    document.getElementById("error-message").innerHTML = err.message;
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
  });
