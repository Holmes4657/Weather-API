function apiLoad() {
    return fetch("https://api.openweathermap.org/data/2.5/weather?q=Gomel&appid=802a121e8d5faa4aecf1cde8bb779008")
    .then(resp => resp.json()) // Convert data to json
    //.then(data => console.log(data))
}

function showInformation(item) {
    const cityDiv = document.getElementById('cityDiv');
    const weatherDIV = document.getElementById('weatherDiv');
    const mainInfomation = document.getElementById('mainInformation');
    const description = document.getElementById('weatherimgdescription');

    const activeTemp = document.getElementById('tempSelect');
    activeTemp.addEventListener('change', change => {
        if(activeTemp.value == 'cilcius') {
            mainInfomation.innerText = Math.floor(cilcius) + "°C";
        }
        if(activeTemp.value == 'fahrenheit') {
            mainInfomation.innerText = Math.floor(fahrenheit) + "°F";
        }
    });

    //Convert from kelvin into cilcius
    let cilcius = JSON.stringify(item.main.temp) - 273;
    let fahrenheit = (JSON.stringify(item.main.temp) - 273.15) * 9 / 5 + 32

    //City
    cityDiv.innerText = "Current city is " + item.name + ', ' + JSON.stringify(item.sys.country).replace(/\"/g, "");   
    //Timezone 
    weatherDIV.innerText = "current timezone is " + item.timezone;
    //Temputure
    mainInfomation.innerText = Math.floor(cilcius) + "°C";
    //Description
    description.innerText = JSON.stringify(item.weather[0].main).replace(/\"/g, ""); //Remove quotes

    console.log(item);
}



apiLoad().then(data => showInformation(data));