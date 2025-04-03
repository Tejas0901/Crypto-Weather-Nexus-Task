import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
}

interface CryptoState {
  cryptocurrencies: CryptoData[];
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  cryptocurrencies: [],
  loading: false,
  error: null,
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setCryptoData: (state, action: PayloadAction<CryptoData[]>) => {
      state.cryptocurrencies = action.payload;
    },
    updatePrice: (state, action: PayloadAction<{ id: string; price: number }>) => {
      const crypto = state.cryptocurrencies.find(c => c.id === action.payload.id);
      if (crypto) {
        crypto.price = action.payload.price;
      }
    },
  },
});

export const { setCryptoData, updatePrice } = cryptoSlice.actions;
export default cryptoSlice.reducer; 