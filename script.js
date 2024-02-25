'use strict';

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

console.log("script js")

//Global variables
const apiKey = "a496788d6dd8726ab0a300f87b22a7eb";
const popularURL = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`;

const users = [
    new User("user1", "pass123"),
    new User("user2", "securePwd"),
    new User("user3", "securePwd"),
];

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDk2Nzg4ZDZkZDg3MjZhYjBhMzAwZjg3YjIyYTdlYiIsInN1YiI6IjU5ZTI1YWM0YzNhMzY4N2MwNTAwMjI5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xdpv-G8ChAsKwkP5l7-E-G2_3xLEZWopJoaRnMyMAUM",
    },
};

fetch(popularURL, options).then((response) => response.json()).then((data) => {
    let movies = data.results;
    let brojCol = 1;

    for (let i = 0; i < 4; i++) {
        const singleMovie = `
        <div class="main-container">
        <div class="poster-container">
            <a href="#"><img src="https://image.tmdb.org/t/p/original/${movies[i].poster_path}" class="poster" /></a>
        </div>
        <div class="ticket-container">
            <div class="ticket__content">
                <h4 class="ticket__movie-title">${movies[i].original_title}</h4>
                <p class="ticket__movie-slogan">
                    ${movies[i].title}
                </p>
                <p class="ticket__current-price"> 5 BAM</p>
                <p class="ticket__old-price">⭐️${movies[i].vote_average}</p>
                <button class="ticket__buy-btn">Wish list</button>
            </div>
        </div>
    </div>
            `;
        document.getElementById(brojCol)?.insertAdjacentHTML('afterbegin', singleMovie);
        brojCol++;
    }
})



const loadingImg = document.createElement("img");
loadingImg.src = "assets/loading.gif";
loadingImg.style.width = "60px";
const resultDiv = document.getElementById("result");
const moviesFound = document.createElement("p");

function searchMovies() {
    const searchWord = document.getElementById("searchInput").value;
    if (searchWord === "" || searchWord === null || searchWord === undefined) {
        moviesFound.innerHTML = "Enter a search word so we can find your movies.";
        resultDiv.appendChild(moviesFound);
    }
    else {
        moviesFound.innerHTML = "";
        resultDiv.appendChild(loadingImg);
        setTimeout(delayedLoading, 2000);
    }
}

function delayedLoading() {
    resultDiv.removeChild(loadingImg);
    const searchWord = document.getElementById("searchInput").value;
    let searchURL = `https://api.themoviedb.org/3/search/movie?query=%22${searchWord}%22&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

    fetch(searchURL, options).then((response) => response.json()).then((data) => {
        const pronadeniFilmovi = data.results;
        pronadeniFilmovi.forEach((element) => {
            const movieFoundHTML = `<div onclick="openDetails(${element.id})" class="movie_card" id="ave">
            <div class="info_section">
              <div class="movie_header">
                <img class="locandina" src="https://image.tmdb.org/t/p/original/${element.poster_path}"/>
                <h1>${element.title}</h1>
                <h4>2018, Ryan Coogler</h4>
                <span class="minutes">134 min</span>
                <p class="type">Action, Adventure, Sci-Fi</p>
              </div>
              <div class="movie_desc">
                <p class="text">
                ${element.overview}
                </p>
              </div>
              
            </div>
            <div class="blur_back ave_back"></div>
          </div>            
            `;
            moviesFound.insertAdjacentHTML('beforeend', movieFoundHTML);
        })

    })


    resultDiv.appendChild(moviesFound);
}

function openDetails(id) {
    localStorage.setItem("movieId", id);
    window.open("movieDetails.html", "_self");
}


function attemptLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    let user = users.find(user => user.username === username && user.password === password)
    if (user !== undefined) {
        document.getElementById("loginMessage").style.color = "green";
        document.getElementById("loginMessage").innerHTML = "Login successful";
        document.getElementById("loginForm").hidden = true;
    }
    else {
        document.getElementById("loginMessage").style.color = "red";
        document.getElementById("loginMessage").innerHTML = "Login failed. Check your email or passwrod.";
    }
}

function createAccount() {
    let newUsername = document.getElementById("usernameSignUp").value;
    let newPass = document.getElementById("passwordSignUp").value;

    //Pokusaj naci postojeceg korisnika
    let postojeciUser = users.find(user => user.username === newUsername);

    if (postojeciUser === undefined) {
        let newUser = new User(newUsername, newPass);
        users.push(newUser);
        document.getElementById("signupMessage").innerHTML = "You have created and account. Welcome!"
        document.getElementById("signupForm").hidden = true;
        let homepage = document.getElementById("homepage-link");
        homepage.href = "index.html";
        homepage.textContent = "Back to home page";

    } else {
        document.getElementById("signupMessage").innerHTML = "Username is taken"
    }
}