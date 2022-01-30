console.log("Client Side Javascript file is loaded...");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");
const loading = document.querySelector("#loading");

const url = "/weather?address=";

const callApi = (location) =>
  fetch(url + location).then((response) => {
    response.json().then((data) => {
      //   loading.textContent = "";

      if (data.error) {
        messageOne.textContent = "Error : " + data.error;
      } else {
        messageOne.textContent = "Location : " + data.location;
        messageTwo.textContent = "Forecast : " + data.forecast;
      }
    });
  });

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = search.value;

  //   loading.textContent = "";
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  callApi(location);
});
