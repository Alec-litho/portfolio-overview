import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Asset } from '../types';

const loadFromLocalStorage = () => {
    return localStorage.getItem('portfolio') || [];
};

const initialState: Asset[] | [] = loadFromLocalStorage();

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<Asset>) => {
      state.push(action.payload);
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      return state.filter(asset => asset.id !== action.payload);
    },
    updatePrice: (state, action: PayloadAction<{ symbol: string; price: number }>) => {
      state.forEach(asset => {
        if (asset.symbol === action.payload.symbol) {
          asset.price = action.payload.price;
        }
      });
    }
  }
});

export const { addAsset, removeAsset, updatePrice } = portfolioSlice.actions;
export default portfolioSlice.reducer;