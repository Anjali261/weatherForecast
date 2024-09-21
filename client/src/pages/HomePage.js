import React, { useState, useEffect, Suspense } from "react";
import Search from "../components/Search";
import { getWeatherByCity, getFiveDayForecast } from "../api/WeatherApi";
import { convertToFahrenheit } from "../utils/temperatureConversion";

// Lazy load the components
const TemperatureDisplay = React.lazy(() =>
  import("../components/TemperatureDisplay")
);
const WeatherCondition = React.lazy(() =>
  import("../components/WeatherCondition")
);
const CityDisplay = React.lazy(() => import("../components/CityDisplay"));
const ForecastCard = React.lazy(() => import("../components/ForecastCard"));

const HomePage = () => {
  const [city, setCity] = useState("New York");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [unit, setUnit] = useState("C");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check localStorage for cached data
    const cachedData = localStorage.getItem("weatherData");
    if (cachedData) {
      const { city, weather, forecast } = JSON.parse(cachedData);
      if (weather && forecast) {
        setCity(city);
        setWeatherData(weather);
        setForecastData(forecast);
      } else {
        fetchWeatherData(city);
      }
    } else {
      fetchWeatherData(city);
    }
  }, []);

  const fetchWeatherData = async (city) => {
    try {
      const weather = await getWeatherByCity(city);
      const forecast = await getFiveDayForecast(city);
      setWeatherData(weather);
      setForecastData(processForecastData(forecast.list));
      setError("");

      // Save to localStorage
      localStorage.setItem(
        "weatherData",
        JSON.stringify({
          city,
          weather,
          forecast: processForecastData(forecast.list),
        })
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const processForecastData = (forecastList) => {
    return forecastList
      .filter((_, index) => index % 8 === 0)
      .map((item) => ({
        day: new Date(item.dt_txt).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        high: item.main.temp_max,
        low: item.main.temp_min,
        icon: item.weather[0].icon,
      }));
  };

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeatherData(searchCity);
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  const convertTemperature = (temp) => {
    return unit === "C" ? temp : convertToFahrenheit(temp);
  };

  return (
    <div className="home-page">
      <Search onSearch={handleSearch} />
   

      {error ? (
        <p>{error}</p>
      ) : (
        weatherData && (
          <Suspense fallback={<div>Loading weather data...</div>}>
            <div>
              <CityDisplay city={weatherData.name} />
              <TemperatureDisplay
                temperature={convertTemperature(weatherData.main?.temp)}
                unit={unit}
              />
              <WeatherCondition
                condition={weatherData.weather[0]?.description}
                icon={weatherData.weather[0]?.icon}
              />
              <button onClick={toggleUnit}>
                                Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
                            </button>
              <div className="forecast-container">
                {forecastData.map((dayData, index) => (
                  <ForecastCard
                    key={index}
                    day={dayData.day}
                    high={convertTemperature(dayData.high)}
                    low={convertTemperature(dayData.low)}
                    icon={dayData.icon}
                    unit={unit}
                  />
                ))}
              </div>
            </div>
          </Suspense>
        )
      )}
    </div>
  );
};

export default HomePage;
