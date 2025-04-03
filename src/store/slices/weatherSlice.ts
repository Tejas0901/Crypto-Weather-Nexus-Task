import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  conditions: string;
}

interface WeatherState {
  cities: WeatherData[];
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  cities: [],
  loading: false,
  error: null,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherData: (state, action: PayloadAction<WeatherData[]>) => {
      state.cities = action.payload;
    },
  },
});

export const { setWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer; 