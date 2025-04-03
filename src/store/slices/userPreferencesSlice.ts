import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserPreferences {
  favoriteCities: string[];
  favoriteCryptos: string[];
}

const initialState: UserPreferences = {
  favoriteCities: [],
  favoriteCryptos: [],
};

export const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    toggleFavoriteCity: (state, action: PayloadAction<string>) => {
      const cityIndex = state.favoriteCities.indexOf(action.payload);
      if (cityIndex === -1) {
        state.favoriteCities.push(action.payload);
      } else {
        state.favoriteCities.splice(cityIndex, 1);
      }
    },
    toggleFavoriteCrypto: (state, action: PayloadAction<string>) => {
      const cryptoIndex = state.favoriteCryptos.indexOf(action.payload);
      if (cryptoIndex === -1) {
        state.favoriteCryptos.push(action.payload);
      } else {
        state.favoriteCryptos.splice(cryptoIndex, 1);
      }
    },
  },
});

export const { toggleFavoriteCity, toggleFavoriteCrypto } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer; 