const path = require("path");
const express = require("express");
const hbs = require("hbs");

const { geoCodeAddress } = require("./utils/geoCode");
const { getWeather } = require("./utils/weatherStack");
const generateReport = require("./utils/generateReport");

const app = express();
const PORT = process.env.PORT ? process.env.PORT : 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views/"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.use(express.static(path.join(__dirname, "../public/")));

const defaultProps = {
  title: "Page Title",
  author: "Asjad",
};

app.get("/", (_, res) => {
  res.render("index.hbs", { ...defaultProps, title: "Weather App" });
});

app.get("/about", (_, res) => {
  res.render("about.hbs", { ...defaultProps, title: "About" });
});

app.get("/help", (_, res) => {
  res.render("help", { ...defaultProps, title: "Help", message: "Help Route" });
});

app.get("/help/*", (_, res) => {
  res.render("404", {
    ...defaultProps,
    title: "404",
    errorMessage: "Help Article Not Found!",
  });
});

app.get("/weather", async (req, res) => {
  if (!req.query.address) {
    return res.status(400).json({ error: "missing address!" });
  }

  const queryAddress = req.query.address;

  try {
    let address = await geoCodeAddress(queryAddress);
    let weather = await getWeather(address.lat, address.lng);
    return res.json({ address, weather: generateReport(weather) });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

app.get("*", (_, res) => {
  res.render("404", {
    ...defaultProps,
    title: "404",
    errorMessage: "Page not found!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
