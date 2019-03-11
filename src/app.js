const path = require("path");
const express = require("express");
const hbs = require("hbs");

const { geoCodeAddressPromise } = require("./utils/geoCode");
const { fetchWeatherPromise } = require("./utils/weather");

const app = express();
const PORT = process.env.PORT ? process.env.PORT : 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views/"));
hbs.registerPartials(path.join(__dirname, "../views/partials"));

app.use(express.static(path.join(__dirname, "../public/")));

const defaultProps = {
  title: "Page Title",
  author: "Asjad"
};

app.get("/", (request, response) => {
  response.render(
    "index.hbs",
    Object.assign(defaultProps, { title: "Weather App" })
  );
});

app.get("/about", (request, response) => {
  response.render("about.hbs", Object.assign(defaultProps, { title: "About" }));
});

app.get("/help", (request, response) => {
  response.render(
    "help",
    Object.assign(defaultProps, {
      title: "Help",
      message: "Help Route"
    })
  );
});

app.get("/help/*", (request, response) => {
  response.render(
    "404",
    Object.assign(defaultProps, {
      title: "Help Not Found"
    })
  );
});

app.get("/weather", (request, response) => {
  if (!request.query.address) {
    return response.status(400).json({ error: "missing address!" });
  }

  (async queryAddress => {
    try {
      let address = await geoCodeAddressPromise(queryAddress);
      let weather = await fetchWeatherPromise(address.lat, address.lng);

      return response.json({ address, weather });
    } catch (error) {
      return response.status(500).json({ error });
    }
  })(request.query.address);
});

app.get("*", (request, response) => {
  response.render(
    "404",
    Object.assign(defaultProps, {
      title: "Page Not Found"
    })
  );
});

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
