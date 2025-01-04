import { apikey } from "./code.js";

let select = document.querySelector("#state");
let selectcity = document.querySelector("#city");
let button = document.querySelector("button");
let points = document.querySelector(".lat-lon");
let weather = document.querySelector(".main");
let temperature = document.querySelector(".temperature");
let humid = document.querySelector(".humidity");
let speed = document.querySelector(".windspeed");
let rise = document.querySelector(".sunrise");
let set = document.querySelector(".sunset");


for (let state in indianStatesAndUTs) {
    let newoption = document.createElement("option");
    newoption.innerText = state;
    newoption.value = state;
    select.append(newoption);
}

for (let city of indianCities) {
    let newoption = document.createElement("option");
    newoption.innerText = city;
    newoption.value = city;
    selectcity.append(newoption);
}

button.addEventListener("click", async () => {
    let cityname;
    let statename;
    if (city.value != "") {
        cityname = city.value;
    }

    if (select.value != "select") {
        statename = select.value;
    }

    if (cityname && cityname.trim() !== "" && statename && statename !== "select") {

        try {
            let coordinte = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityname},${statename},india&appid=${apikey}`);
            let coordi_data = await coordinte.json();
            let latitude = coordi_data[0]["lat"];
            let longitude = coordi_data[0]["lon"];

            let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`);
            let wea_data = await weather.json();

            let icon = wea_data.weather[0].icon;
            let newsrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            let img = document.querySelector("img");
            img.src = newsrc;


            img.style.opacity = "0"; 
            let opacity = 0;
            img.onload = () => {
                let fadeIn = setInterval(() => {
                    if (opacity < 1) {
                        opacity += 0.05; 
                        img.style.opacity = opacity;
                    } else {
                        clearInterval(fadeIn); 
                    }
                }, 50); 
            };


            let description = wea_data["weather"][0]["description"];

            let humidity = wea_data["main"]["humidity"];

            let temp_k = wea_data["main"]["temp"];
            let temp_c = tempconvert(temp_k);

            let windspeed = wea_data["wind"]["speed"];

            let set_u = wea_data["sys"]["sunset"];
            let sunset = convertunix(set_u);

            let rise_u = wea_data["sys"]["sunrise"];
            let sunrise = convertunix(rise_u);

            let forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}`);
            let fore_data = await forecast.json();

            // Set forecast data for 4 intervals
            let forecasts = fore_data.list.slice(0, 4);
            forecasts.forEach((forecast, index) => {
                document.querySelector(`#main${index + 1}`).innerHTML = `<p>Weather<br>${forecast.weather[0].description}<p>`;
                document.querySelector(`#temp${index + 1}`).innerHTML = `<p>Temperature<br>${tempconvert(forecast.main.temp)} C<p>`;
                document.querySelector(`#wisp${index + 1}`).innerHTML = `<p>Windspeed<br>${forecast.wind.speed} m/s<p>`;
            });

            setcurrentdata(description, humidity, temp_c, windspeed, sunrise, sunset);
            setlonlat(latitude, longitude);

        } catch (error) {
            console.error("Error fetching data:", error);
            alert("City name and state name mismatched.");
        }
    } else {
        alert("City name or state name not selected.");
    }
});

let setlonlat = (latitude, longitude) => {
    points.innerHTML = `<p>Latitude = ${latitude}<br>Longitude = ${longitude}`;
};

let setcurrentdata = (description, humidity, temp_c, windspeed, sunrise, sunset) => {
    weather.innerHTML = `<p>Weather <br>${description}<p>`;
    humid.innerHTML = `<p>Humidity <br>${humidity} %<p>`;
    temperature.innerHTML = `<p>Temperature <br>${temp_c} C<p>`;
    speed.innerHTML = `<p>Wind speed <br>${windspeed} m/s<p>`;
    rise.innerHTML = `<p>Sunrise <br>${sunrise}<p>`;
    set.innerHTML = `<p>Sunset <br>${sunset}<p>`;
};

let tempconvert = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
};

let convertunix = (unix) => {
    let dateUTC = new Date(unix * 1000);
    let istOffset = 5.5 * 60 * 60 * 1000;
    let dateIST = new Date(dateUTC.getTime() + istOffset);
    return dateIST.toLocaleString("en-IN");
};
