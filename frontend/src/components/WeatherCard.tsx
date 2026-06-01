import React from 'react'
import { CurrentWeather } from '../types'

interface Props {
  weather: CurrentWeather
}

export default function WeatherCard({ weather }: Props) {
  const fmt = (iso: string) =>
    new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="weather-card">
      <div className="card-top">
        <div>
          <h2 className="city-name">{weather.city}</h2>
          <span className="country">{weather.country}</span>
        </div>
        <img src={weather.iconUrl} alt={weather.description} className="weather-icon" />
      </div>

      <div className="temp-display">
        <span className="temp-number">{weather.temp}</span>
        <span className="temp-unit">°C</span>
      </div>

      <p className="description">{weather.description}</p>

      <div className="stats-grid">
        <Stat label="feels like" value={`${weather.feelsLike}°C`} />
        <Stat label="humidity" value={`${weather.humidity}%`} />
        <Stat label="wind" value={`${weather.windSpeed} m/s`} />
        <Stat label="sunrise" value={fmt(weather.sunrise)} />
        <Stat label="sunset" value={fmt(weather.sunset)} />
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  )
}