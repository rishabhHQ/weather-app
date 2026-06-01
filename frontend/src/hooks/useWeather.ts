import { useState, useCallback } from 'react'
import { CurrentWeather, ForecastDay } from '../types'
import { api } from '../api'

interface WeatherState {
  weather: CurrentWeather | null
  forecast: ForecastDay[]
  loading: boolean
  error: string | null
}

export function useWeather() {
  const [state, setState] = useState<WeatherState>({
    weather: null,
    forecast: [],
    loading: false,
    error: null,
  })

  const search = useCallback(async (city: string) => {
    if (!city.trim()) return
    setState({ weather: null, forecast: [], loading: true, error: null })

    try {
      const [weather, forecast] = await Promise.all([
        api.getWeather(city),
        api.getForecast(city),
      ])
      setState({ weather, forecast, loading: false, error: null })
    } catch (err: any) {
      setState({ weather: null, forecast: [], loading: false, error: err.message })
    }
  }, [])

  const searchByLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setState(s => ({ ...s, error: 'Geolocation not supported' }))
      return
    }

    setState({ weather: null, forecast: [], loading: true, error: null })

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      )
      const { latitude, longitude } = position.coords
      const weather = await api.getWeatherByCoords(latitude, longitude)
      const forecast = await api.getForecast(weather.city)
      setState({ weather, forecast, loading: false, error: null })
    } catch (err: any) {
      setState({ weather: null, forecast: [], loading: false, error: err.message })
    }
  }, [])

  return { ...state, search, searchByLocation }
}