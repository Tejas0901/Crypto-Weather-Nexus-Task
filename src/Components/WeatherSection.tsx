'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setWeatherData } from '@/store/slices/weatherSlice'
import { toggleFavoriteCity } from '@/store/slices/userPreferencesSlice'

const CITIES = ['New York', 'London', 'Tokyo']

export default function WeatherSection() {
  const dispatch = useDispatch()
  const { cities } = useSelector((state: RootState) => state.weather)
  const { favoriteCities } = useSelector((state: RootState) => state.userPreferences)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
        const baseUrl = process.env.NEXT_PUBLIC_OPENWEATHER_BASE_URL

        const weatherData = await Promise.all(
          CITIES.map(async (city) => {
            const response = await fetch(
              `${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`
            )
            const data = await response.json()
            return {
              city,
              temperature: data.main.temp,
              humidity: data.main.humidity,
              conditions: data.weather[0].main,
            }
          })
        )

        dispatch(setWeatherData(weatherData))
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }

    fetchWeatherData()
    const interval = setInterval(fetchWeatherData, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [dispatch])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Weather</h2>
      <div className="space-y-4">
        {cities.map((city) => (
          <div
            key={city.city}
            className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 relative"
          >
            <button
              onClick={() => dispatch(toggleFavoriteCity(city.city))}
              className="absolute top-2 right-2"
            >
              {favoriteCities.includes(city.city) ? '★' : '☆'}
            </button>
            <h3 className="font-medium">{city.city}</h3>
            <p className="text-2xl font-bold">{city.temperature}°C</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {city.conditions} | Humidity: {city.humidity}%
            </p>
          </div>
        ))}
      </div>
    </div>
  )
} 