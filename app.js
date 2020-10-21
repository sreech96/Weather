const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-Parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html");

  })
  app.post("/", function(req,res) {
    const query = req.body.cityName;
    const units = "imperial";
    const  appid = "733645fe88b54f2f3ef83b72c7101b6e";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&units=" + units + "&appid=" + appid;
    https.get(url, function(response) {
      console.log(response.statusCode);
      response.on("data", function(data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
        res.write("<p>The weather is currently " + description + "</p>")
        res.write("<h1>The temperature in " + query + " is:" + temp + "in degree celsius</h1>");
        res.write("<img src=" + imageURL + ">");
        res.send();

  })

  });


  })

app.listen(3000, function() {
  console.log("Server is running in the local host 3000");
});
