const button = document.querySelector("button");
const input = document.querySelector("input");
const cityName = document.querySelector(".location");

const temperature = document.querySelector(".weather-left h2");
const weatherType = document.querySelector(".weather-type");
const feelsLike = document.querySelector(".feels-like");


const humidity = document.querySelectorAll(".detail-box p")[0];
const windSpeed = document.querySelectorAll(".detail-box p")[1];

const visibility = document.querySelectorAll(".detail-box p")[2];



const weatherIcon = document.querySelector(".weather-icon");

const body = document.body;

const apiKey = "14cdfeb6274e2e29c52610ac12f401cb";



// =========================
// UPDATE UI
// =========================

function updateUI(data) {

    cityName.textContent =`${data.name}`;
    temperature.textContent =`${Math.round(data.main.temp)}°C`;
    weatherType.textContent = data.weather[0].main;
    feelsLike.textContent =
        `Feels like: ${Math.round(data.main.feels_like)}°C`;

    humidity.textContent =`${data.main.humidity}%`;

    windSpeed.textContent =
        `${data.wind.speed} km/h`;

    const visibility =
    `${(data.visibility / 1000).toFixed(1)} km`;


    // WEATHER ICON

    const iconCode = data.weather[0].icon;

    const iconURL =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherIcon.src = iconURL;



   
    // DYNAMIC BACKGROUND-->


    const condition = data.weather[0].main;


    if (condition === "Clear") {

        body.style.background =
        "linear-gradient(135deg, #f6d365, #fda085)";

    }

    else if (condition === "Clouds") {

        body.style.background =
        "linear-gradient(135deg, #bdc3c7, #2c3e50)";

    }

    else if (condition === "Rain") {

        body.style.background =
        "linear-gradient(135deg, #4b79a1, #283e51)";

    }

    else if (condition === "Thunderstorm") {

        body.style.background =
        "linear-gradient(135deg, #141e30, #243b55)";

    }

    else if (condition === "Snow") {

        body.style.background =
        "linear-gradient(135deg, #e6dada, #274046)";

    }

    else if (
        condition === "Mist" ||
        condition === "Haze" ||
        condition === "Fog"
    ) {

        body.style.background =
        "linear-gradient(135deg, #757f9a, #d7dde8)";

    }

    else {

        body.style.background =
        "linear-gradient(135deg, #72e2d1, #b8b6e6)";

    }

}




// FETCH WEATHER BY CITY


async function fetchWeatherByCity(city) {

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        console.log(data);
        if (data.cod !== 200) {

        alert("City not found");

        location.reload();

        return;

        }

        updateUI(data);

    }

    catch (error) {

        alert("Error fetching weather");

    }

}




// FETCH WEATHER BY LOCATION


async function fetchWeatherByLocation(lat, lon) {

    const url =
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        console.log(data);

        updateUI(data);

    }

    catch (error) {

        alert("Error fetching location weather");

    }

}




// GET CURRENT LOCATION


function getCurrentLocation() {

    navigator.geolocation.getCurrentPosition(
        success,
        error
    );

}



// =========================
// SUCCESS FUNCTION
// =========================

function success(position) {

    const latitude = position.coords.latitude;

    const longitude = position.coords.longitude;

    fetchWeatherByLocation(latitude, longitude);

}



// =========================
// ERROR FUNCTION
// =========================

function error() {

    alert("Location access denied");

}



// =========================
// SEARCH BUTTON
// =========================

button.addEventListener("click", function () {

    const city = input.value;

    if (city === "") {

        alert("Please enter a city name");

        return;

    }

    fetchWeatherByCity(city);

});



// =========================
// ENTER KEY SEARCH
// =========================

input.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        const city = input.value;

        fetchWeatherByCity(city);

    }

});



// =========================
// LOAD WEATHER ON START
// =========================

getCurrentLocation();