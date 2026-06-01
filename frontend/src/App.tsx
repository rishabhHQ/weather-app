import React, { useState } from 'react'
import './App.css'
import { useWeather } from './hooks/useWeather'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ForecastRow from './components/ForecastRow'

export default function App() {
  const [input, setInput] = useState('')
  const { weather, forecast, loading, error, search, searchByLocation } = useWeather()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    search(input)
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">skycast</h1>
        <p className="tagline">weather, distilled</p>
      </header>

      <SearchBar
        value={input}
        onChange={e => setInput(e.target.value)}
        onSubmit={handleSubmit}
        onLocation={searchByLocation}
        loading={loading}
      />

      {error && (
        <div className="error-box">⚠ {error}</div>
      )}

      {loading && (
        <div className="loading">
          <div className="spinner" />
        </div>
      )}

      {!loading && weather && (
        <div className="results">
          <WeatherCard weather={weather} />
          {forecast.length > 0 && <ForecastRow forecast={forecast} />}
        </div>
      )}

      {!loading && !weather && !error && (
        <div className="empty-state">
          <p>search for any city</p>
        </div>
      )}
    </div>
  )
}