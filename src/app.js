const path = require("path");
const express = require("express");
const hbs = require("hbs");

const { geoCodeAddress } = require("./utils/geoCode");
const { getWeather } = require("./utils/weatherStack");

const app = express();
const PORT = process.env.PORT ? process.env.PORT : 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views/"));
hbs.registerPartials(path.join(__dirname, "../views/partials"));

app.use(express.static(path.join(__dirname, "../public/")));

const defaultProps = {
  title: "Page Title",
  author: "Asjad",
};

app.get("/", (_, res) => {
  res.render(
    "index.hbs",
    Object.assign(defaultProps, { title: "Weather App" })
  );
});

app.get("/about", (_, res) => {
  res.render("about.hbs", Object.assign(defaultProps, { title: "About" }));
});

app.get("/help", (_, res) => {
  res.render(
    "help",
    Object.assign(defaultProps, {
      title: "Help",
      message: "Help Route",
    })
  );
});

app.get("/help/*", (_, res) => {
  res.render(
    "404",
    Object.assign(defaultProps, {
      title: "Help Not Found",
    })
  );
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.status(400).json({ error: "missing address!" });
  }

  (async (queryAddress) => {
    try {
      let address = await geoCodeAddress(queryAddress);
      let weather = await getWeather(address.lat, address.lng);
      return res.json({ address, weather });
    } catch (error) {
      return res.status(500).json({ error });
    }
  })(req.query.address);
});

app.get("*", (_, res) => {
  res.render(
    "404",
    Object.assign(defaultProps, {
      title: "Page Not Found",
    })
  );
});

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
