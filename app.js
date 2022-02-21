const { response } = require("express");
const express = require("express");
const https = require("https");
const app = express();

//

app.get("/", (req, res) => {
  const query = "95112";
  const apiKey = "bbeef114d190cf67a6f274f1eb574134";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=metric";

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const ctof = (temp * 9) / 5 + 32;
      const symbol = weatherData.weather[0].icon;
      const icon = "http://openweathermap.org/img/wn/" + symbol + "@2x.png";

      //   console.log(ctof);

      const description = weatherData.weather[0].description;
      //   console.log(description);

      res.write("<h1>The weather is currently" + description + "</h1>");

      res.write(
        "<h1>The temperature in San Jose is " +
          ctof +
          " degress Farenheit.</h1>"
      );

      res.write("<img src=" + icon + ">");
    });
  });

  //   res.send("Server is now running.");
});

//listen

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
