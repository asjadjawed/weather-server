const axios = require("axios").default;

const WEATHER_STACK_KEY = process.env.WEATHER_STACK_KEY;

const url = "http://api.weatherstack.com/current";

const getWeather = async (lat, lng) => {
  try {
    const weather = await axios.get(url, {
      params: {
        access_key: WEATHER_STACK_KEY,
        query: `${lat},${lng}`,
        unit: "m",
      },
    });
    if (weather.data.success === false)
      throw new Error("Failed to fetch weather");
    return weather.data.current;
  } catch (e) {
    return { error: e.message };
  }
};
module.exports = { getWeather };
