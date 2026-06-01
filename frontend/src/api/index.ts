import { CurrentWeather, ForecastDay } from '../types'

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001'

async function get<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`)
  const json = await res.json()
  if (!json.success) throw new Error(json.error)
  return json.data as T
}

export const api = {
  getWeather: (city: string) =>
    get<CurrentWeather>(`/api/weather?city=${encodeURIComponent(city)}`),

  getWeatherByCoords: (lat: number, lon: number) =>
    get<CurrentWeather>(`/api/weather?lat=${lat}&lon=${lon}`),

  getForecast: (city: string) =>
    get<ForecastDay[]>(`/api/weather/forecast?city=${encodeURIComponent(city)}`),
}