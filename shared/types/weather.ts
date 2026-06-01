// The shape of current weather data returned by our backend
export interface CurrentWeather {
  city: string
  country: string
  temp: number
  feelsLike: number
  humidity: number
  windSpeed: number
  description: string
  iconUrl: string
  sunrise: string   // ISO string — easier to pass over HTTP than a Date object
  sunset: string
}

// One day in the 5-day forecast
export interface ForecastDay {
  date: string
  temp: number
  description: string
  iconUrl: string
  humidity: number
}