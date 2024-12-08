"use client";
import React, { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "a1ca3358372d7aaf95d95f79f69ca751";

  const buttonStyle = {
    borderRadius: "50px",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "15px 25px",
    cursor: "pointer",
  };

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      setWeather(null); // Clear previous weather data
      return;
    }
    setError(""); // Reset error message
    setWeather(null); // Clear previous weather data

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data); // Save weather data to state
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <br></br>

      <button style={buttonStyle} onClick={fetchWeather}>
        Get Weather
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
