var appID = "a61aea7f1f0137536dc953c81b63e73f"; //00ba46197ec62f9c0dde07bd4fde6252 a61aea7f1f0137536dc953c81b63e73f

var srchHistAry = [];
function renderSearchHistory() {
    if (JSON.parse(localStorage.getItem("searchHistory")) !== null) {
        srchHistAry = JSON.parse(localStorage.getItem("searchHistory"));
    }
    $("#searchHistory").empty();
    $("#searchHistory").append(`<hr>`);

    for (i=0; i < srchHistAry.length; i++) {
        $("#searchHistory").append(`
            <button id="pastSearchBtn"
            class="mb-2 p-3 w-100 rounded-3 text-dark">${srchHistAry[i]}</button>
        `);
    }
}

function initPage() {
    if (JSON.parse(localStorage.getItem("searchHistory")) !== null) {
        renderSearchHistory();
    }
}

function dispWeather(location) {
    fetch (genWeatherQueryURL(location))
        .then((response) => {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then((weatherData) => {
            fetch(genOneCallQueryURL(weatherData.coord.lat, weatherData.coord.lon))
              .then((response) => {
                  if (!response.ok) {
                      throw response.json();
                  }
                  return response.json();
              })
              .then((oneCallData) => {
                  var uviColor;
                $("#dayAndWeekForecast").empty();
                if (oneCallData.current.uvi <= 2.99) {
                    uviColor = "bg-success text-white";
                } else if (oneCallData.current.uvi >= 3 && oneCallData.current.uvi <= 5.99) {
                    uviColor = "bg-warning";
                } else if (oneCallData.current.uvi >= 6 && oneCallData.current.uvi <= 7.99) {
                    uviColor = "bg-orange";
                } else if (oneCallData.current.uvi >= 8 && oneCallData.current.uvi <= 10.99) {
                    uviColor = "bg-danger text-white";
                } else if (oneCallData.current.uvi >= 11) {
                    uviColor = "bg-warning text-white";
                }
                
                $("#dayAndWeekForecast").append(`
                    <section id="dailyForecast" class="border border-1 border-dark p-2">
                        <div class="d-flex flex-row">
                        <h3 class="fs-3 fw-bold">${weatherData.name + " (" + moment.unix(weatherData.dt).format("l") + " )"}</h2>
                        <img src="${genIconURL(weatherData.weather[0].icon)}" alt="${weatherData.weather[0].description}">
                        </div>
                        <div class="mt-3 d-grid gap-1">
                        <p>Temp: ${weatherData.main.temp} F</p>
                        <p>Wind: ${weatherData.wind.speed} MPH</p>
                        <p>Humidity: ${weatherData.main.humidity} %<p>
                        <p>UV Index: <span class="p-1 px-3 rounded ${uviColor}">${oneCallData.current.uvi}</span></p>
                        </div>
                    </section>
                    <section class="mt-4">
                        <h2 class="fs-5 fw-bold>Weekly Forecast:</h2>
                        <div id=weeklyForecast" class="d-flex flex-row justify-content-between"></div>
                    </section>
                `);

                for (i=1;i<6;i++) {
                    $("#weeklyForecast").append(`
                    <div id="forecastCard" class="p-2">
                        <h3>${moment.unix(oneCallData.daily[i].dt).format("l")}</h4>
                        <img src="${genIconURL(oneCallData.daily[i].weather[0].icon)}" alt="${oneCallData.daily[i].weather.description}">
                        <div class="mt-2">
                            <p>Temp: ${oneCallData.daily[i].temp.day} F</p>
                            <p>Wind: ${oneCallData.daily[i].wind_speed} MPH</p>
                            <p>Humidity: ${oneCallData.daily[i].humidity} %</p>
                        </div>
                    </div>
                    `)
                }
              })  
        })
}

initPage();

$("#searchBtn").on("click", (event) => {
    event.preventDefault();
    dispWeather($("#searchLocation").val())
    srchHistAry.unshift($("#searchLocation").val());
    if (srchHistAry.length > 6) {
        srchHistAry.length = 6;
    }
    localStorage.clear();
    localStorage.setItem("searchHistory", JSON.stringify(srchHistAry));
    renderSearchHistory();
});
$("#searchHistory").on("click", (event) => {
    dispWeather(event.target.innerText);
});