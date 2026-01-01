function createWeather(tempMin, tempMax, condition, windSpeed) {
  return {
    tempMin,
    tempMax,
    condition,
    windSpeed,
    getAverageTemperature() {
      return (this.tempMin + this.tempMax) / 2;
    },
  };
}

const weeklyForecast = [
  createWeather(10, 18, "Sunny", 12),
  createWeather(11, 19, "Cloudy", 10),
  createWeather(9, 17, "Rainy", 20),
  createWeather(12, 21, "Sunny", 8),
  createWeather(14, 23, "Sunny", 6),
  createWeather(13, 22, "Cloudy", 9),
  createWeather(8, 16, "Snow", 15),
];

function calculateMaxAverage(forecast) {
  return forecast.reduce((acc, day) => (acc += day.tempMax), 0) / forecast.length;
}

function calculateMinAverage(forecast) {
  return forecast.reduce((acc, day) => (acc += day.tempMin), 0) / forecast.length;
}

function renderToday(todayWeather) {
  const todayContainer = document.createElement("section");
  todayContainer.id = "today";

  todayContainer.innerHTML = `
    <h2>Today's Weather</h2>
    <p><strong>Condition:</strong> ${todayWeather.condition}</p>
    <p><strong>Minimum temperature:</strong> ${todayWeather.tempMin}°C</p>
    <p><strong>Maximum temperature:</strong> ${todayWeather.tempMax}°C</p>
    <p><strong>Average temperature:</strong> ${todayWeather
      .getAverageTemperature()
      .toFixed(1)}°C</p>
    <p><strong>Wind speed:</strong> ${todayWeather.windSpeed} km/h</p>
  `;

  return todayContainer;
}

function renderWeek(forecast) {
  const weekContainer = document.createElement("section");
  weekContainer.id = "week";

  const title = document.createElement("h3");
  title.textContent = "7-Day Forecast";
  weekContainer.appendChild(title);

  const daysContainer = document.createElement("div");
  daysContainer.className = "days-container";

  forecast.forEach((day, index) => {
    const dayCard = document.createElement("div");
    dayCard.className = "day-card";

    dayCard.innerHTML = `
      <h4>Day ${index + 1}</h4>
      <p>Min: ${day.tempMin}°C</p>
      <p>Max: ${day.tempMax}°C</p>
    `;

    daysContainer.appendChild(dayCard);
  });

  weekContainer.appendChild(daysContainer);

  return weekContainer;
}

function renderAverages(forecast) {
  const averagesContainer = document.createElement("section");
  averagesContainer.id = "averages";

  const maxAvg = calculateMaxAverage(forecast);
  const minAvg = calculateMinAverage(forecast);

  averagesContainer.innerHTML = `
    <h3>Weekly Averages</h3>
    <p><strong>Average maximum temperature:</strong> ${maxAvg.toFixed(1)}°C</p>
    <p><strong>Average minimum temperature:</strong> ${minAvg.toFixed(1)}°C</p>
  `;

  return averagesContainer;
}

function initApp() {
  const app = document.getElementById("uem-app");

  const todayWeather = weeklyForecast[0];

  app.appendChild(renderToday(todayWeather));
  app.appendChild(renderWeek(weeklyForecast));
  app.appendChild(renderAverages(weeklyForecast));
}

initApp();
