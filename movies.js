'use strict';
console.log('allmovies')
let page = 1;

function loadMore() {
    const topRatedURL = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=${apiKey}`;
    fetch(topRatedURL, options).then((response) => response.json()).then((data) => {
        page++;
        let movies = data.results;
        movies.forEach(movie => {
            const templ = `
            <img onclick="openDetails(${movie.id})" src="https://image.tmdb.org/t/p/original/${movie.poster_path}" height="200px" class="p-1"/>
            `;

            document.getElementById("all-movies").insertAdjacentHTML('beforeend', templ);

        })
    }).catch(err => {
        const toastLiveExample = document.getElementById("liveToast");
        document.getElementById("error-message").innerHTML = err.message;
        const toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
    });
}

window.onload = function () {
    loadMore();
};

const handleInfiniteScroll = () => {
    const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
    if (endOfPage) {
        console.log("end")
        loadMore();
    }
};

window.addEventListener("scroll", handleInfiniteScroll);
