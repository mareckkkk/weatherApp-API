const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={caa91b063acd3e87f626b1bfbc6e9e45}

async function checkWeather(city) {
  const api_key = "caa91b063acd3e87f626b1bfbc6e9e45";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  if (weather_data.cod === `404`) {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    return;
  }

  location_not_found.style.display = "none";
  weather_body.style.display = "flex";
  temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed} Km/h`;

  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "/assets/cloud.png";
      break;
    case "Clear":
      weather_img.src = "/assets/clear.png";
      break;
    case "Rain":
      weather_img.src = "/assets/rain.png";
      break;
    case "Mist":
      weather_img.src = "/assets/mist.png";
      break;
    case "Snow":
      weather_img.src = "/assets/snow.png";
      break;
  }
}

inputBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    checkWeather(inputBox.value);
  }
});

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
