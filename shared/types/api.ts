// Every API response from backend will follow this shape.
// T is a generic — it gets replaced with the actual data type.
// e.g. ApiResponse<CurrentWeather> or ApiResponse<ForecastDay[]>

export interface ApiResponse<T> {
  success: true
  data: T
}

export interface ApiError {
  success: false
  error: string
  statusCode: number
}

// A union type — a response is either success OR error
export type ApiResult<T> = ApiResponse<T> | ApiError