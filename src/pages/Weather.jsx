import { useEffect, useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import Search from "../components/Search";
import { useDispatch } from "react-redux";
import { fetchWeather } from "../redux/weatherSlice";
import { useSelector } from "react-redux";
import { resetWeather } from "../redux/weatherSlice";

const API_KEY = "634abd9b7f2fa5de8f85be69d43aeeb8";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.weather);
  const goCurrentLocation = () => {
    dispatch(resetWeather());
  };

  const searchCity = async (query) => {
    if (!query) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`,
      );
      const data = await res.json();

      if (data.cod === 200) {
        setSearchResult({
          temp: Math.round(data.main.temp),
          description: data.weather[0].main,
          location: `${data.name}, ${data.sys.country}`,
        });
      } else {
        setSearchResult(null);
        alert("City not found");
      }
    } catch {
      alert("Failed to fetch weather data");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`,
            );
            const data = await res.json();
            setWeatherData({
              temp: Math.round(data.main.temp),
              description: data.weather[0].main,
              location: `${data.name}, ${data.sys.country}`,
            });
          } catch {
            setError("Failed to fetch weather data.");
          }
        },
        () => setError("Geolocation denied."),
      );
    } else {
      setError("Geolocation not supported.");
    }
  }, []);

  const goHome = () => {
    navigate("/");
  };

  if (error) {
    return (
      <div className="weather-page">
        <div className="weather-overlay">
          <h1>{error}</h1>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="weather-page">
        <div className="weather-overlay">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  const handleSearch = (city) => {
    dispatch(fetchWeather(city));
  };

  const getWeatherIcon = (weather) => {
    if (!weather) return "⛅";

    switch (weather.toLowerCase()) {
      case "clear":
        return "☀️";
      case "clouds":
        return "☁️";
      case "rain":
        return "☂️";
      case "drizzle":
        return "🌧️";
      case "thunderstorm":
        return "⚡";
      case "snow":
        return "⛄❄️";
      default:
        return "⛅";
    }
  };

  return (
    <div className="weather-page">
      <h3>TODAY</h3>
      <div className="weather-bg">
        <div className="weather-overlay">
          <h2 className="location">
            {data?.name
              ? `${data.name}, ${data.sys.country}`
              : weatherData.location}
          </h2>

          <h1 className="temperature">
            {data?.main?.temp ? Math.round(data.main.temp) : weatherData.temp}
            °C
          </h1>

          <p className="description">
            {data?.weather?.[0]?.main || weatherData.description}
          </p>

          <div style={{ fontSize: "60px", marginTop: "10px" }}>
            {getWeatherIcon(
              data?.weather?.[0]?.main || weatherData.description,
            )}
          </div>
        </div>
      </div>
      <div>
        <Search onSearch={handleSearch} />
        <button className="search_btn" onClick={goCurrentLocation}>
          Current Location Weather..
        </button>
      </div>
      <p className="home" onClick={goHome}>
        Go Home
      </p>
    </div>
  );
};

export default Weather;
