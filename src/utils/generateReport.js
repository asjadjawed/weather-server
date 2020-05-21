const weatherConditions = require("./weatherConditions");

const generateReport = (data) => {
  return `
    <div class="weather-report>
      <div class="weather-icon"><img alt="Weather icon" src=${
        data.weather_icons
      }></div>
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
      <p>Cloud Cover: ${data.cloudcover}%</p>
      <p>Visibility: ${data.visibility}Km</p>
    </div>
    `;
};

module.exports = generateReport;
