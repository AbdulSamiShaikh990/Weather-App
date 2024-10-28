
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (!city) {
        
        document.querySelector(".error").textContent = "Please enter a city name.";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

        if (response.status === 404) {
            document.querySelector(".error").textContent = "Invalid City Name";
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else if (!response.ok){
            throw new Error("Network response was not ok");
        } else {
            const data = await response.json();
            console.log(data);
            document.querySelector(".city").textContent = data.name;
            document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C`;
            document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
            document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

            switch (data.weather[0].main) 
            {
                case "Clouds":
                    weatherIcon.src = "images/clouds.png";
                    break;
                case "Clear":
                    weatherIcon.src = "images/clear.png";
                    break;
                case "Rain":
                    weatherIcon.src = "images/rain.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "images/drizzle.png";
                    break;
                case "Mist":
                    weatherIcon.src = "images/mist.png";
                    break;
                case "Snow":
                    weatherIcon.src = "images/snow.png";
                    break;
                default:
                    weatherIcon.src = "images/default.png"; 
            }
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").textContent = "Error fetching weather data";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
