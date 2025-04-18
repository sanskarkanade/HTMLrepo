let select = document.querySelector("#state");
let select2 = document.querySelector("#country");
let selectcity = document.querySelector("#city");
let button = document.querySelector("#btn");
let points = document.querySelector(".lat-lon");
let weather = document.querySelector(".main");
let temperature = document.querySelector(".temperature");
let humid = document.querySelector(".humidity");
let speed = document.querySelector(".windspeed");
let rise = document.querySelector(".sunrise");
let set = document.querySelector(".sunset");
let aqi = document.querySelector(".aqi");




let apikey = "0665e3d4055503c63ffe20b4f3f8e59a";

// for (let country in countries) {
//     let newoption = document.createElement("option");
//     newoption.innerText = country;
//     newoption.value = country;
//     select2.append(newoption);
// }
// let temp = select2.value;

// for (let state in indianStatesAndUTs) {
//     let newoption = document.createElement("option");
//     newoption.innerText = state[temp];
//     newoption.value = state[temp];
//     select.append(newoption);
// }

Object.keys(countriesAndStates).forEach(country => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    select2.append(option);
});

// Function to restore saved selections
function restoreSelections() {
    const savedCountry = localStorage.getItem("selectedCountry");
    const savedState = localStorage.getItem("selectedState");

    if (savedCountry) {
        select2.value = savedCountry;
        populateStates(savedCountry);

        if (savedState) {
            select.value = savedState;
        }
    }
}

// Populate the state dropdown based on the selected country
function populateStates(selectedCountry) {
    select.innerHTML = "<option value=''>Select State</option>";
    if (selectedCountry && countriesAndStates[selectedCountry]) {
        const states = countriesAndStates[selectedCountry];
        states.forEach(state => {
            const option = document.createElement("option");
            option.value = state;
            option.textContent = state;
            select.append(option);
        });
    }
}

// Event listener for when a country is selected
select2.addEventListener("change", function () {
    const selectedCountry = select2.value;
    localStorage.setItem("selectedCountry", selectedCountry); // Save the country selection
    populateStates(selectedCountry);

    // Clear the state selection in localStorage
    localStorage.removeItem("selectedState");
});

// Event listener for when a state is selected
select.addEventListener("change", function () {
    const selectedState = select.value;
    localStorage.setItem("selectedState", selectedState); // Save the state selection
});

// Restore selections when the page loads
restoreSelections();




button.addEventListener("click", async () => {
    let cityname;
    let statename;
    let Countryname;
    if (selectcity.value != "") {
        cityname = selectcity.value;
    }

    if (select.value != "select") {
        statename = select.value;
    }

    if (select2.value != "select") {
        Countryname = select2.value;
    }

    if (cityname && cityname.trim() !== "" && statename && statename !== "select" && Countryname && Countryname !== "select") {

        try {
            let coordinte = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityname},${statename},${Countryname}&appid=${apikey}`);
            let coordi_data = await coordinte.json();
            let latitude = coordi_data[0]["lat"];
            let longitude = coordi_data[0]["lon"];
            

            let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`);
            let wea_data = await weather.json();

            let aqi = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apikey}`);
            let aqi_data = await aqi.json();
            // console.log(aqi_data)
            let c_aqi = aqi_data.list[0].main.aqi;
            // console.log(c_aqi)

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
            let sunset = convertUnix(set_u);

            let rise_u = wea_data["sys"]["sunrise"];
            let sunrise = convertUnix(rise_u);

            let forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}`);
            let fore_data = await forecast.json();

            let aqifore = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}`);
            let aqifore_data = await aqifore.json();
            // console.log(aqifore_data);

            let aqiforecast = aqifore_data.list.slice(0, 4);
            aqiforecast.forEach((aqi, index) => {
                document.querySelector(`#aqi${index + 1}`).innerHTML = `<p>AQI Index<br>${aqi.main.aqi}</p>`;
            });

            // Set forecast data for 4 intervals
            let forecasts = fore_data.list.slice(0, 4);
            forecasts.forEach((forecast, index) => {
                document.querySelector(`#main${index + 1}`).innerHTML = `<p>Weather<br>${forecast.weather[0].description}</p>`;
                document.querySelector(`#temp${index + 1}`).innerHTML = `<p>Temperature<br>${tempconvert(forecast.main.temp)} C</p>`;
                document.querySelector(`#wisp${index + 1}`).innerHTML = `<p>Windspeed<br>${forecast.wind.speed} m/s</p>`;
            });

            setcurrentdata(description, humidity, temp_c, windspeed, sunrise, sunset, c_aqi);
            setlonlat(latitude, longitude);

        } catch (error) {
            console.error("Error fetching data:", error);
            alert("City name and state name mismatched.");
        }
    } 
    else {
        alert("City name or state name not selected.");
    }
});

let setlonlat = (latitude, longitude) => {
    points.innerHTML = `<p>Latitude = ${latitude}<br>Longitude = ${longitude}</p>`;
};

let setcurrentdata = (description, humidity, temp_c, windspeed, sunrise, sunset, c_aqi) => {
    weather.innerHTML = `<p>Weather <br>${description}</p>`;
    weather.querySelector("p").addEventListener("mouseenter", () => {
        creatdiv();
        wvalue(description);
    });

    weather.querySelector("p").addEventListener("mouseleave", () => {
        lostdiv();
    });

    humid.innerHTML = `<p>Humidity <br>${humidity} %</p>`;
    humid.querySelector("p").addEventListener("mouseenter", () => {
        creatdiv();
        hvalue(humidity);
    });

    humid.querySelector("p").addEventListener("mouseleave", () => {
        lostdiv();
    });

    temperature.innerHTML = `<p>Temperature <br>${temp_c} C</p>`;
    temperature.querySelector("p").addEventListener("mouseenter", () => {
        creatdiv();
        tvalue(temp_c);
    });

    temperature.querySelector("p").addEventListener("mouseleave", () => {
        lostdiv();
    });

    speed.innerHTML = `<p>Wind speed <br>${windspeed} m/s</p>`;
    speed.querySelector("p").addEventListener("mouseenter", () => {
        creatdiv();
        svalue(windspeed);
    });

    speed.querySelector("p").addEventListener("mouseleave", () => {
        lostdiv();
    });

    rise.innerHTML = `<p>Sunrise <br>${sunrise}</p>`;
    // rise.querySelector("p").addEventListener("mouseenter", () => {
    //     creatdiv();
    // });

    // rise.querySelector("p").addEventListener("mouseleave", () => {
    //     lostdiv();
    // });

    set.innerHTML = `<p>Sunset <br>${sunset}</p>`;
    // set.querySelector("p").addEventListener("mouseenter", () => {
    //     creatdiv();
    // });

    // set.querySelector("p").addEventListener("mouseleave", () => {
    //     lostdiv();
    // });

    aqi.innerHTML = `<p>AQI Index <br>${c_aqi}</p>`;
    aqi.querySelector("p").addEventListener("mouseenter", () => {
        creatdiv();
        avalue(c_aqi);
    });

    aqi.querySelector("p").addEventListener("mouseleave", () => {
        lostdiv();
    });
};

let tempconvert = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
};

const convertUnix = (unix) => {
    return new Date(unix * 1000).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
};


let newDiv;

let creatdiv = () => {

    newDiv = document.createElement("div");


    newDiv.style.position = "fixed";
    newDiv.style.top = "50%";
    newDiv.style.left = "50%";
    newDiv.style.transform = "translate(-50%, -50%) scale(0.5)";
    newDiv.style.backgroundColor = "lightblue";
    newDiv.style.padding = "20px";
    newDiv.style.border = "2px solid lightblue";
    newDiv.style.borderRadius = "10px";
    newDiv.style.textAlign = "center";
    newDiv.style.opacity = "0"; 
    newDiv.style.transition = "transform 2s, opacity 2s";

    setTimeout(() => {
        newDiv.style.transform = "translate(-50%, -50%) scale(1)";
        newDiv.style.opacity = "1"; 
      }, 100);

    document.body.appendChild(newDiv);

};

let lostdiv = () => {
    newDiv.remove();
}

let wvalue = (element) => {
    if (element === "clear sky") {
        newDiv.innerText = "The weather is clear and sunny. Perfect for outdoor activities!";
    } else if (element.includes("clouds")) {
        newDiv.innerText = "It's cloudy, but still suitable for most outdoor activities.";
    } else if (element.includes("rain") || element.includes("drizzle")) {
        newDiv.innerText = "Rainy weather. Consider carrying an umbrella and limiting outdoor activities.";
    } else if (element.includes("thunderstorm")) {
        newDiv.innerText = "Thunderstorms are expected. Stay indoors for safety!";
    } else if (element.includes("snow")) {
        newDiv.innerText = "Snowy weather. Be cautious when going outside, and consider staying indoors.";
    } else if (element.includes("fog")) {
        newDiv.innerText = "Foggy weather. Visibility is low, so stay cautious while driving and walking.";
    } else if (element.includes("smoke")) {
        newDiv.innerText = "Smoky weather. Avoid outdoor activities and stay indoors with air filtration if possible.";
    } else if (element.includes("haze")) {
        newDiv.innerText = "Hazy conditions. Visibility is poor, stay indoors or limit outdoor exposure.";
    } else {
        newDiv.innerText = "Unknown Weather condition.";
    }
}

let hvalue = (element) => {
    if (element <= 30) {
        newDiv.innerText = "The air is very dry. Stay hydrated and consider using a moisturizer.";
    } else if (element <= 50) {
        newDiv.innerText = "The air is dry, but manageable. Keep yourself hydrated.";
    } else if (element <= 70) {
        newDiv.innerText = "Comfortable humidity level. Enjoy your activities outdoors.";
    } else if (element <= 85) {
        newDiv.innerText = "It's getting a bit humid. Consider staying in cooler places or using fans.";
    } else {
        newDiv.innerText = "Unknown Humid Condition.";
    }
};

let tvalue = (element) => {
    if (element <= 0) {
        newDiv.innerText = "Freezing temperatures. Stay indoors, wear warm clothing, and avoid prolonged exposure to cold.";
    } else if (element <= 10) {
        newDiv.innerText = "Very cold. Dress in layers and keep yourself warm.";
    } else if (element <= 20) {
        newDiv.innerText = "Cool weather. Wear a jacket or sweater when going outdoors.";
    } else if (element <= 30) {
        newDiv.innerText = "Mild and comfortable. Ideal for outdoor activities.";
    } else if (element <= 40) {
        newDiv.innerText = "Hot temperatures. Stay hydrated, wear light clothing, and limit outdoor exposure.";
    } else {
        newDiv.innerText = "Unknown temperature Condition.";
    }
};

let svalue = (element) => {
    if (element <= 1) {
        newDiv.innerText = "Calm winds. Perfect conditions for outdoor activities.";
    } else if (element <= 5) {
        newDiv.innerText = "Light breeze. Ideal for most outdoor activities.";
    } else if (element <= 10) {
        newDiv.innerText = "Moderate winds. May affect some outdoor activities, but still manageable.";
    } else if (element <= 15) {
        newDiv.innerText = "Strong winds. Limit outdoor activities and be cautious of falling debris.";
    } else {
        newDiv.innerText = "Unknown Windspeed.";
    }
};

let avalue = (element) => {
    if (element === 1) {
        newDiv.innerText = "Air quality is good. Enjoy your outdoor activities!";
    } else if (element === 2) {
        newDiv.innerText = "Air quality is moderate. Sensitive groups should take precautions.";
    } else if (element === 3) {
        newDiv.innerText = "Unhealthy for sensitive groups. Consider limiting outdoor activities.";
    } else if (element === 4) {
        newDiv.innerText = "Unhealthy. Limit outdoor exposure.";
    } else if (element === 5) {
        newDiv.innerText = "Very unhealthy to hazardous. Stay indoors with air filtration.";
    } else {
        newDiv.innerText = "Unknown AQI Condition.";
    }
};


