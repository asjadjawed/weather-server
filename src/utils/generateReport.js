const weatherConditions = require("./weatherConditions");

const data = {
  observation_time: "05:39 AM",
  temperature: 21,
  weather_code: 113,
  weather_icons: [
    "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png",
  ],
  weather_descriptions: ["Sunny"],
  wind_speed: 7,
  wind_degree: 170,
  wind_dir: "S",
  pressure: 1020,
  precip: 0,
  humidity: 40,
  cloudcover: 0,
  feelslike: 21,
  uv_index: 10,
  visibility: 6,
  is_day: "yes",
};

const generateReport = (data) => {
  return `
    <div class="weather-report>
      <div class="weather-icon"><img alt="Weather icon" src=${
        data.weather_icons
      }></div>
      <p>Observation Time: ${data.observation_time}</p>
      <p>Temperature: ${data.temperature}&deg;C</p>
      <p>Feels Like: ${data.feelslike}&deg;C</p>
      <p>Weather: ${
        weatherConditions[data.weather_code]
      } - ${data.weather_descriptions.join(" ")}</p>
      <p>Wind Speed: ${data.wind_speed} Km/h</p>
      <p>Wind Direction: ${data.wind_dir}</p>
      <p>Pressure: ${data.pressure} Millibar</p>
      <p>Precipitation: ${data.precip} MM</p>
      <p>Humidity: ${data.humidity}%</p>
      <p>UV Index: ${data.uv_index}</p>
      <p>Cloud Cover: ${data.cloudcover}</p>
      <p>Visibility: ${data.visibility}Km</p>
    </div>
    `;
};

module.exports = generateReport;
