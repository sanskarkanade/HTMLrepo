const countriesAndStates = {
    "India": [
        "Andhra Pradesh", "Bihar", "Delhi", "Gujarat", "Haryana",
        "Karnataka", "Maharashtra", "Punjab", "Rajasthan", "Uttar Pradesh"
    ],
    "United States": [
        "California", "Texas", "Florida", "New York", "Illinois",
        "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"
    ],
    "Brazil": [
        "São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Paraná",
        "Rio Grande do Sul", "Pernambuco", "Ceará", "Amazonas", "Espírito Santo"
    ],
    "Canada": [
        "Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba",
        "Saskatchewan", "Nova Scotia", "New Brunswick", "Newfoundland and Labrador", "Prince Edward Island"
    ],
    "Russia": [
        "Moscow", "Saint Petersburg", "Sverdlovsk", "Chelyabinsk", "Krasnoyarsk",
        "Tatarstan", "Bashkortostan", "Perm Krai", "Sakha (Yakutia)", "Kaluga"
    ],
    "China": [
        "Beijing", "Shanghai", "Guangdong", "Jiangsu", "Shandong",
        "Sichuan", "Hunan", "Zhejiang", "Henan", "Hebei"
    ],
    "Australia": [
        "New South Wales", "Queensland", "Victoria", "Western Australia", "South Australia",
        "Tasmania", "Australian Capital Territory", "Northern Territory"
    ],
    "France": [
        "Île-de-France", "Provence-Alpes-Côte d'Azur", "Auvergne-Rhône-Alpes", "Normandy", "Brittany",
        "Occitanie", "Nouvelle-Aquitaine", "Grand Est", "Hauts-de-France", "Bourgogne-Franche-Comté"
    ],
    "Germany": [
        "Bavaria", "North Rhine-Westphalia", "Baden-Württemberg", "Hesse", "Saxony",
        "Lower Saxony", "Rhineland-Palatinate", "Schleswig-Holstein", "Brandenburg", "Saarland"
    ],
    "United Kingdom": [
        "England", "Scotland", "Wales", "Northern Ireland"
    ],
    "Japan": [
        "Tokyo", "Osaka", "Hokkaido", "Kyoto", "Fukuoka",
        "Aichi", "Kanagawa", "Hyogo", "Okinawa", "Chiba"
    ]
};

// Get references to the select elements
// const countrySelect = document.querySelector("#country");
// const stateSelect = document.querySelector("#state");

// // Populate the country dropdown
// Object.keys(countriesAndStates).forEach(country => {
//     const option = document.createElement("option");
//     option.value = country;
//     option.textContent = country;
//     countrySelect.append(option);
// });

// // Event listener for when a country is selected
// countrySelect.addEventListener("change", function () {
//     const selectedCountry = countrySelect.value;

//     // Clear existing state options
//     stateSelect.innerHTML = "<option value=''>Select State</option>";

//     // If a valid country is selected, populate the state dropdown
//     if (selectedCountry && countriesAndStates[selectedCountry]) {
//         const states = countriesAndStates[selectedCountry];
//         states.forEach(state => {
//             const option = document.createElement("option");
//             option.value = state;
//             option.textContent = state;
//             stateSelect.append(option);
//         });
//     }
// });
