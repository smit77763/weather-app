const request = require("postman-request");

const geocode = (location, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?access_token=pk.eyJ1Ijoic21pdDc3NzYzIiwiYSI6ImNreXhhZHhxNDBnY3oydnBpemYybjhvODcifQ.7TJ3j6ypCVSeZFU5CGGsyA&limit=1`;

  //callback function
  request(
    { url: url, json: true },
    (error, resp, { message, features } = {}) => {
      if (error) {
        callback("Unable to connect to GeoCoding service!", undefined);
      } else if (message || features.length == 0) {
        callback("No location found .Try Entering another one!", undefined);
      } else {
        // const data = body?.features[0];
        callback(undefined, {
          longitude: features[0].center[0],
          latitude: features[0].center[1],
          location: features[0].place_name,
        });
      }
    }
  );
};

module.exports = geocode;
