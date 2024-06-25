function getWeather() {
    const apiKey = '7dda2a28381ee8b3f72f1f79df235a5c';
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter the city name !!');
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl) // fetching the response 
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error in fetching Weather', error);
            // alert('Please try again');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error in fetching forecast', error);
            // alert('Please try again');
        });
}

// showing the to user 
function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

   // This  hide all previously searched data
    tempDivInfo.innerHTML= '';
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    weatherIcon.style.display = 'none'; 

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = ` http://openweathermap.org/img/w/${iconCode}.png`;
        // https://api.openweathermap.org/img/wn/${iconCode}@4x.png
      

        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHTML = `<p>${cityName}</p><p>${description}</p>`;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
        weatherIcon.style.display = 'block'; // Show icon according to the weather 
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    hourlyForecastDiv.innerHTML = ''; // Clear previous forecast

    const next24hours = hourlyData.slice(0, 8);
    next24hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item flex-auto w-[80px] flex flex-col items-center mr-[10px] text-white"> 
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon" class="text-white mt-3"> 
                <span>${temperature}°C</span>
            </div>`;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}
