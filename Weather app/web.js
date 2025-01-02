let select = document.querySelector("#state");
let selectcity = document.querySelector("#city");
let button = document.querySelector("button");
let points = document.querySelector(".lat-lon");


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
        let apikey = "0665e3d4055503c63ffe20b4f3f8e59a";
        try {
            let coordinte = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityname},${statename},india&appid=${apikey}`);
            let data = await coordinte.json();
            let latitude = data["0"]["lat"];
            let longitude = data["0"]["lon"];
            setlonlat(latitude, longitude);
        }
        catch {
            alert("City name and state name mismatched.");
        }
    }
    else {
        alert("City name or state name not selected.");
    }


});

let setlonlat = (latitude, longitude) => {
    points.innerHTML = `<p>Latitude = ${latitude}<br>Longitude = ${longitude}`;
}