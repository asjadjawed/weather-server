const request = require("request");

const DARK_SKY_KEY = process.env.DARK_SKY_KEY;

const fetchWeather = (lat, lng, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/${DARK_SKY_KEY}/${lat},${lng}?units=si`,
      json: true,
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect", undefined);
      } else if (body.code || response.statusCode !== 200) {
        callback(
          "Invalid Location / Server Error: Failed to fetch weather",
          undefined
        );
      } else {
        callback(undefined, body.currently);
      }
    }
  );
};

const fetchWeatherPromise = (lat, lng) => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: `https://api.darksky.net/forecast/${DARK_SKY_KEY}/${lat},${lng}?units=si`,
        json: true,
      },
      (error, response, body) => {
        if (error) {
          reject("Unable to connect");
        } else if (body.code || response.statusCode !== 200) {
          reject("Invalid Location / Server Error");
        } else {
          resolve(body);
        }
      }
    );
  });
};

module.exports = {
  fetchWeather,
  fetchWeatherPromise,
};
