# CryptoWeather Nexus

A modern, multi-page dashboard combining weather data, cryptocurrency information, and real-time notifications via WebSocket.

## Features

- Real-time cryptocurrency price updates via WebSocket
- Weather information for multiple cities
- Latest cryptocurrency news
- Favorite tracking for both cities and cryptocurrencies
- Responsive design with dark mode support
- Real-time notifications for significant price changes

## Prerequisites

Before you begin, ensure you have:
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd cryptoweather-nexus
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
NEXT_PUBLIC_NEWSDATA_API_KEY=your_newsdata_api_key
NEXT_PUBLIC_COINCAP_API_KEY=your_coincap_api_key

NEXT_PUBLIC_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
NEXT_PUBLIC_COINCAP_BASE_URL=https://api.coincap.io/v2
NEXT_PUBLIC_NEWSDATA_BASE_URL=https://newsdata.io/api/1
NEXT_PUBLIC_WEBSOCKET_URL=wss://ws.coincap.io/prices?assets=bitcoin,ethereum
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Keys

You'll need to obtain API keys from:
- [OpenWeatherMap](https://openweathermap.org/api)
- [NewsData.io](https://newsdata.io/)
- [CoinCap](https://docs.coincap.io/)

## Deployment

The app can be deployed to Vercel with zero configuration:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables
4. Deploy!

## Built With

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React-Toastify](https://fkhadra.github.io/react-toastify/)
