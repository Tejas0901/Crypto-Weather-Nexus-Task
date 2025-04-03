'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import WeatherSection from '@/components/WeatherSection'
import CryptoSection from '@/components/CryptoSection'
import NewsSection from '@/components/NewsSection'

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">CryptoWeather Nexus</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <WeatherSection />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <CryptoSection />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:col-span-2 lg:col-span-1">
          <NewsSection />
        </div>
      </div>
    </main>
  )
}
