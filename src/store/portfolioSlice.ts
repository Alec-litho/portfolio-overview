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
      const cryptoData = action.payload;
      
      const priceMap = new Map();
      cryptoData.forEach(data => {
        priceMap.set(data.s, { 
          price: data.A, 
          change24h: data.P
        });
      });

      state.assets = state.assets.map(asset => {
        const cryptoInfo = priceMap.get(asset.symbol);
        if (cryptoInfo) {
          return {
            ...asset,
            price: cryptoInfo.price,
            value: asset.amount * cryptoInfo.price,
            change24h: cryptoInfo.change24h
          };
        }
        return asset;
      });
    },
  },
});

export const { addAsset, removeAsset, updateAssets } = portfolioSlice.actions;
export default portfolioSlice.reducer;
