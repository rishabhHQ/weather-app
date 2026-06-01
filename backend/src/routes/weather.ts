import { Router, Request, Response, NextFunction } from 'express'
import {
  getCurrentWeather,
  getCurrentWeatherByCoords,
  getForecast,
} from '../services/weatherService'

const router = Router()

// GET /api/weather?city=Delhi
// GET /api/weather?lat=28.6&lon=77.2
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { city, lat, lon } = req.query

    if (city && typeof city === 'string') {
      const data = await getCurrentWeather(city)
      res.json({ success: true, data })

    } else if (lat && lon) {
      const data = await getCurrentWeatherByCoords(
        parseFloat(lat as string),
        parseFloat(lon as string)
      )
      res.json({ success: true, data })

    } else {
      res.status(400).json({
        success: false,
        error: 'Provide either ?city=name or ?lat=x&lon=y',
        statusCode: 400,
      })
    }
  } catch (err) {
    next(err) // passes error to errorHandler middleware
  }
})

// GET /api/forecast?city=Delhi
router.get('/forecast', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { city } = req.query

    if (!city || typeof city !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Provide ?city=name',
        statusCode: 400,
      })
      return
    }

    const data = await getForecast(city)
    res.json({ success: true, data })
  } catch (err) {
    next(err)
  }
})

export default router