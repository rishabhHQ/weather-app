// ── Weather types ──────────────────────────────────────────
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

// ── API types ──────────────────────────────────────────────
export interface ApiResponse<T> {
  success: true
  data: T
}

export interface ApiError {
  success: false
  error: string
  statusCode: number
}

export type ApiResult<T> = ApiResponse<T> | ApiError

// ── Chat types (Phase 3) ───────────────────────────────────
export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatRequest {
  message: string
  weatherContext?: string
}