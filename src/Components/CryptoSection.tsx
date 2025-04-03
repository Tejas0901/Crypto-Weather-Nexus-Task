'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setCryptoData, updatePrice } from '@/store/slices/cryptoSlice'
import { toggleFavoriteCrypto } from '@/store/slices/userPreferencesSlice'
import { toast } from 'react-toastify'

const CRYPTO_IDS = ['bitcoin', 'ethereum', 'dogecoin']

export default function CryptoSection() {
  const dispatch = useDispatch()
  const { cryptocurrencies } = useSelector((state: RootState) => state.crypto)
  const { favoriteCryptos } = useSelector((state: RootState) => state.userPreferences)

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_COINCAP_BASE_URL
        const response = await fetch(`${baseUrl}/assets?ids=${CRYPTO_IDS.join(',')}`)
        const data = await response.json()
        
        const cryptoData = data.data.map((crypto: any) => ({
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol,
          price: parseFloat(crypto.priceUsd),
          change24h: parseFloat(crypto.changePercent24Hr),
          marketCap: parseFloat(crypto.marketCapUsd),
        }))

        dispatch(setCryptoData(cryptoData))
      } catch (error) {
        console.error('Error fetching crypto data:', error)
      }
    }

    fetchCryptoData()
    const interval = setInterval(fetchCryptoData, 60000) // Refresh every minute

    // WebSocket connection for real-time price updates
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL || '')
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      Object.entries(data).forEach(([id, price]) => {
        const crypto = cryptocurrencies.find(c => c.id === id)
        if (crypto) {
          const priceChange = ((parseFloat(price as string) - crypto.price) / crypto.price) * 100
          if (Math.abs(priceChange) > 0.5) { // Alert on 0.5% change
            toast.info(`${crypto.name} price changed by ${priceChange.toFixed(2)}%`)
          }
          dispatch(updatePrice({ id, price: parseFloat(price as string) }))
        }
      })
    }

    return () => {
      clearInterval(interval)
      ws.close()
    }
  }, [dispatch, cryptocurrencies])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Cryptocurrency</h2>
      <div className="space-y-4">
        {cryptocurrencies.map((crypto) => (
          <div
            key={crypto.id}
            className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 relative"
          >
            <button
              onClick={() => dispatch(toggleFavoriteCrypto(crypto.id))}
              className="absolute top-2 right-2"
            >
              {favoriteCryptos.includes(crypto.id) ? '★' : '☆'}
            </button>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{crypto.name}</h3>
              <span className="text-sm text-gray-500">{crypto.symbol.toUpperCase()}</span>
            </div>
            <p className="text-2xl font-bold">{formatNumber(crypto.price)}</p>
            <p className={`text-sm ${crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {crypto.change24h >= 0 ? '↑' : '↓'} {Math.abs(crypto.change24h).toFixed(2)}%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Market Cap: {formatNumber(crypto.marketCap)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
} 