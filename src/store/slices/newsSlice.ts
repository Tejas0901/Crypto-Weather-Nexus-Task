import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
}

interface NewsState {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNewsArticles: (state, action: PayloadAction<NewsArticle[]>) => {
      state.articles = action.payload;
    },
  },
});

export const { setNewsArticles } = newsSlice.actions;
export default newsSlice.reducer; 