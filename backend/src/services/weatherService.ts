import axios from 'axios'
import { CurrentWeather, ForecastDay } from '@weather-app/shared'
import { AppError } from '../middleware/errorHandler'

const BASE_URL = process.env.OPENWEATHER_BASE_URL
const API_KEY = process.env.OPENWEATHER_API_KEY

// ── Raw API shapes ──────────────────────────────────────────
// OpenWeatherMap returns a lot of fields we don't need.
// We type only what we actually use.

interface OWMCurrentResponse {
  name: string
  sys: { country: string; sunrise: number; sunset: number }
  main: { temp: number; feels_like: number; humidity: number }
  wind: { speed: number }
  weather: { description: string; icon: string }[]
}

interface OWMForecastItem {
  dt: number
  main: { temp: number; humidity: number }
  weather: { description: string; icon: string }[]
}

interface OWMForecastResponse {
  list: OWMForecastItem[]
}

// ── Service functions ───────────────────────────────────────

export async function getCurrentWeather(city: string): Promise<CurrentWeather> {
  try {
    const { data } = await axios.get<OWMCurrentResponse>(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
    return parseCurrentWeather(data)
  } catch (err: any) {
    // axios wraps HTTP errors — we extract the message and rethrow as AppError
    const message = err.response?.data?.message || 'City not found'
    const status = err.response?.status || 500
    throw new AppError(message, status)
  }
}

export async function getCurrentWeatherByCoords(
  lat: number,
  lon: number
): Promise<CurrentWeather> {
  try {
    const { data } = await axios.get<OWMCurrentResponse>(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
    return parseCurrentWeather(data)
  } catch (err: any) {
    const message = err.response?.data?.message || 'Could not fetch weather'
    const status = err.response?.status || 500
    throw new AppError(message, status)
  }
}

export async function getForecast(city: string): Promise<ForecastDay[]> {
  try {
    const { data } = await axios.get<OWMForecastResponse>(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    )
    return parseForecast(data)
  } catch (err: any) {
    const message = err.response?.data?.message || 'Could not fetch forecast'
    const status = err.response?.status || 500
    throw new AppError(message, status)
  }
}

// ── Parsers ─────────────────────────────────────────────────
// These functions transform raw API data into our clean shared types.
// The frontend never sees the raw OWM response — only these shapes.

function parseCurrentWeather(raw: OWMCurrentResponse): CurrentWeather {
  return {
    city: raw.name,
    country: raw.sys.country,
    temp: Math.round(raw.main.temp),
    feelsLike: Math.round(raw.main.feels_like),
    humidity: raw.main.humidity,
    windSpeed: raw.wind.speed,
    description: raw.weather[0].description,
    iconUrl: `https://openweathermap.org/img/wn/${raw.weather[0].icon}@2x.png`,
    sunrise: new Date(raw.sys.sunrise * 1000).toISOString(),
    sunset: new Date(raw.sys.sunset * 1000).toISOString(),
  }
}

function parseForecast(raw: OWMForecastResponse): ForecastDay[] {
  const dailyMap: Record<string, OWMForecastItem> = {}
  
  raw.list.forEach((item) => {
    const date = new Date(item.dt * 1000)
    const dayKey = date.toDateString()
    const hour = date.getHours()

    const existingHour = dailyMap[dayKey]
      ? new Date(dailyMap[dayKey].dt * 1000).getHours()
      : null

    if (existingHour === null || Math.abs(hour - 12) < Math.abs(existingHour - 12)) {
      dailyMap[dayKey] = item
    }
  })

  return Object.values(dailyMap)
    .slice(1, 6)
    .map((item) => ({
      date: new Date(item.dt * 1000).toISOString(),
      temp: Math.round(item.main.temp),
      description: item.weather[0].description,
      iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      humidity: item.main.humidity,
    }))
}