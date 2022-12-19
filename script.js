const API_KEY = `52fbebc6d63bb989286cd23fa1751a8c`;
// const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

const form = document.querySelector("form");
const search = document.querySelector(".search-bar");
const weather = document.querySelector(".weather loading");

const getWeather = (city) => {
  const response = fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod == 404) {
        alert("No weather found.");
        throw new Error("No weather found.");
      }

      console.log(data);
      showWeather(data);
    });
};

form.addEventListener("submit", function (event) {
  getWeather(search.value);
  event.preventDefault();
});

const showWeather = (data) => {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  document.querySelector(".city").innerHTML = "Weather in " + name;
  document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".description").innerHTML = description;
  document.querySelector(".temp").innerHTML = temp + "°C";
  document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
  document.querySelector(".wind").innerHTML = "Wind speed: " + speed + " km/h";
  document.querySelector(".weather").classList.remove("loading");
  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + name + "')";
};
getWeather("Bengaluru");
