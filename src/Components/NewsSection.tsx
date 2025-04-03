'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setNewsArticles } from '@/store/slices/newsSlice'

export default function NewsSection() {
  const dispatch = useDispatch()
  const { articles } = useSelector((state: RootState) => state.news)

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY
        const baseUrl = process.env.NEXT_PUBLIC_NEWSDATA_BASE_URL
        const response = await fetch(
          `${baseUrl}/news?apikey=${apiKey}&q=cryptocurrency&language=en&size=5`
        )
        const data = await response.json()

        const newsArticles = data.results.map((article: any) => ({
          id: article.article_id,
          title: article.title,
          description: article.description,
          url: article.link,
          publishedAt: new Date(article.pubDate).toLocaleDateString(),
        }))

        dispatch(setNewsArticles(newsArticles))
      } catch (error) {
        console.error('Error fetching news data:', error)
      }
    }

    fetchNewsData()
    const interval = setInterval(fetchNewsData, 300000) // Refresh every 5 minutes
    return () => clearInterval(interval)
  }, [dispatch])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
      <div className="space-y-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700"
          >
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-80"
            >
              <h3 className="font-medium mb-2">{article.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {article.description}
              </p>
              <p className="text-xs text-gray-500">
                Published: {article.publishedAt}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
} 