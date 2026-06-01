export interface CurrentWeather {
  city: string
  country: string
  temp: number
  feelsLike: number
  humidity: number
  windSpeed: number
  description: string
  iconUrl: string
  sunrise: string
  sunset: string
}

export interface ForecastDay {
  date: string
  temp: number
  description: string
  iconUrl: string
  humidity: number
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatRequest {
  message: string
  weatherContext?: string
}