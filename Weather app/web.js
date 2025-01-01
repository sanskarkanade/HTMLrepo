let select = document.querySelector("#state");
let button = document.querySelector("button");
let city = document.querySelector("#city");


for(let state in indianStatesAndUTs)
{
    let newoption = document.createElement("option");
    newoption.innerText = state;
    newoption.value = state;
    select.append(newoption);
}

button.addEventListener("click" , () =>
{
    let cityname;
    let statename;
    if(city.value != "")
    {
         cityname = city.value;
    }
    else
    {
        alert("Enter city name");
    } 
    if(select.value != "select")   
    {
        statename = select.value;
    }
    else
    {
        alert("select state");
    }
    console.log(cityname , statename);
});