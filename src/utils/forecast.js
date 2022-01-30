const request = require("postman-request");

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=78164bedcdd5fee059fcb4f760b4054d&query=${latitude},${longitude}`;

  const options = {
    url: url,
    json: true,
  };

  request(options, (error, response, { current, location, error1 } = {}) => {
    if (error) {
      callback("Unable to connect to the weather service!", undefined);
    } else if (error1) {
      callback("Unable to find location ! ", undefined);
    } else {
      //   const data = body.current;
      // console.log(body.current);
      callback(undefined, {
        current_weather: current.weather_descriptions[0],
        temperature: current.temperature,
        precipitation: current.precip,
        is_day: current.is_day,
        location: location.name,
        message: `${current.weather_descriptions[0]} . It is currently ${
          current.temperature
        } degrees outside .Humidity over here is ${
          current.humidity
        } There is  ${current.precip}% chance of rain. Also it is ${
          current.is_day == "no" ? "night" : "day"
        } over here.`,
      });
    }
  });
};

module.exports = forecast;
