const cityDiv = document.getElementById('cityDiv');
const timezone = document.getElementById('timezone');
const mainInfomation = document.getElementById('mainInformation');
const description = document.getElementById('imgDescription');
const activeTemp = document.getElementById('tempSelect');

async function apiLoad() {
    const resp = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Gomel&appid=802a121e8d5faa4aecf1cde8bb779008");
    return await resp.json(); // Convert data to json
}

//Change Temp value
activeTemp.addEventListener('change', () => {
    apiLoad().then(data => convertTemp(data));
});

//Main Information
function showInformation(item) {
    let cilcius = JSON.stringify(item.main.temp) - 273;
    //City
    cityDiv.innerText = "Current city is " + item.name + ', ' + JSON.stringify(item.sys.country).replace(/\"/g, "");   
    //Timezone 
    timezone.innerText = "current timezone is " + item.timezone;
    //Temputure
    mainInfomation.innerText = Math.floor(cilcius) + "°C";
    //Description
    description.innerText = JSON.stringify(item.weather[0].main).replace(/\"/g, ""); //Remove quotes

    console.log(item);
}

//Convert
function convertTemp(item) {
    //Convert from kelvin into cilcius
    let cilcius = JSON.stringify(item.main.temp) - 273;
    let fahrenheit = (JSON.stringify(item.main.temp) - 273.15) * 9 / 5 + 32;

    if(activeTemp.value == 'cilcius') {
        mainInfomation.innerText = Math.floor(cilcius) + "°C";
    }
    if(activeTemp.value == 'fahrenheit') {
        mainInfomation.innerText = Math.floor(fahrenheit) + "°F";
    }
}

//Draw Image
const showImageDiv = document.getElementsByClassName('card__weatherInfo-showImage')[0];

function drawWeatherImage(item) {
    const photo = 'http://openweathermap.org/img/w/' + item.weather[0].icon + '.png';
    const weatherImage = `<img class="weatherImage" src="${photo}" alt="./images/stub.png">`
    showImageDiv.innerHTML = weatherImage;
}

function drawWeatherImage1(showImageDiv) {
    showImageDiv.innerHTML = '';
    showImageDiv(element => drawWeatherImage(element));
}

apiLoad().then(data => showInformation(data));
apiLoad().then(data => drawWeatherImage(data));