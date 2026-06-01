import React from 'react'
import { ForecastDay } from '../types'

interface Props {
  forecast: ForecastDay[]
}

export default function ForecastRow({ forecast }: Props) {
  return (
    <div className="forecast-section">
      <h3 className="forecast-title">5-day forecast</h3>
      <div className="forecast-row">
        {forecast.map((day, i) => (
          <div key={i} className="forecast-day">
            <span className="forecast-weekday">
              {new Date(day.date).toLocaleDateString([], { weekday: 'short' })}
            </span>
            <span className="forecast-date">
              {new Date(day.date).toLocaleDateString([], { day: 'numeric', month: 'short' })}
            </span>
            <img src={day.iconUrl} alt={day.description} className="forecast-icon" />
            <span className="forecast-temp">{day.temp}°</span>
            <span className="forecast-desc">{day.description}</span>
          </div>
        ))}
      </div>
    </div>
  )
}