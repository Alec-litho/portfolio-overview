import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asset, CryptoData } from "../types";

const loadFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("assets") || "[]");
};

const initialState: { assets: Asset[] } = { assets: loadFromLocalStorage() };

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<Asset>) => {
      state.assets.push(action.payload);
      localStorage.setItem("assets", JSON.stringify(state.assets));
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      const filteredAssets = state.assets.filter((asset) => asset.id !== action.payload);
      localStorage.setItem("assets", JSON.stringify(filteredAssets));
      console.log(filteredAssets);
      state.assets = filteredAssets;
    },
    updateAssets: (state, action: PayloadAction<CryptoData[]>) => {
      const symbols = state.assets.map((asset) => asset.symbol);
      const newAssets: Asset[] = [];
      action.payload.forEach((data) => {
        if (symbols.includes(data.s)) {
          const asset = state.assets.filter((asset) => asset.symbol === data.s)[0];
          newAssets.push({
            id: asset.id,
            symbol: asset.symbol,
            amount: asset.amount,
            price: data.A,
            change24h: data.P,
          });
        }
      });

      const isEmpty = newAssets.length > 0;
      localStorage.setItem("assets", JSON.stringify(isEmpty ? newAssets : state.assets));
      if (isEmpty) state.assets = newAssets;
    },
  },
});

export const { addAsset, removeAsset, updateAssets } = portfolioSlice.actions;
export default portfolioSlice.reducer;
