const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views");
const partialsDirectoryPath = path.join(__dirname, "../templates/partials");

//setup handlebars engineand views location
app.set("views", viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);
app.set("view engine", "hbs");

//setup static  directory to serve
app.use(express.static(publicDirectoryPath));

//setting route for home page
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Smit Shah",
  });
});

//setting route for about page
app.get("/about", (req, res) => {
  //line for calling handlebars named about
  res.render("about", {
    title: "About Me",
    name: "Smit Shah",
  });
});
//setting route for help page

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "Sample help text",
    name: "Smit Shah",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "No Address Found! :(",
    });
  }

  geocode(address, (error, { location, longitude, latitude } = {}) => {
    if (error)
      return res.send({
        error,
      });

    forecast(longitude, latitude, (error, { message } = {}) => {
      if (error)
        return res.send({
          error,
        });

      return res.send({
        forecast: message,
        location: location,
        address: req.query.address,
      });

      // console.log(
      //   chalk.yellow.bold("\nLocation : "),
      //   chalk.magenta.italic(location)
      // );
      // console.log(chalk.yellow.bold("Data : "), chalk.magenta.italic(message));
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404error", {
    title: "Error 404!",
    errorMsg: "Help Article not found",
    name: "Smit Shah",
  });
});

app.get("/*", (req, res) => {
  res.render("404error", {
    title: "Error 404!",
    errorMsg: "Page not found",
    name: "Smit Shah",
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
