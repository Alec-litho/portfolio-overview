import "./assets/Portfolio.scss";
import { v4 as uuidv4 } from "uuid";
import { useMemo, useState } from "react";
import  AssetList  from "./components/AssetList";
import { useWebSocket } from "./hooks/useWebSocket";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import {  AddAssetModal } from "./components/AssetModal";
import { addAsset } from "./store/portfolioSlice";
import { CryptoData } from "./types";

export function Portfolio() {
  const assets = useAppSelector((state) => state.portfolio);
  const totalValue = useMemo(() => assets.reduce((sum, asset) => sum + asset.amount * asset.price, 0), [assets]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  // const [selectedAsset, setSelectedAsset] = useState<CryptoData | null>(null);
  // const [amount, setAmount] = useState("");

  const { data: cryptoList } = useWebSocket(5000);

  const dispatch = useAppDispatch();
  const filteredAssets = searchQuery!== null? cryptoList.filter((asset:CryptoData) => asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())) : cryptoList
  // console.log(filteredAssets)

  const handleAddAsset = (asset: CryptoData, amount: number) => {
    dispatch(addAsset({
      id: uuidv4(),
      symbol: asset.symbol,
      amount,
      price: asset.price,
      change24h: asset.change
    }));
  };
  return (
    <div className="portfolioContainer">
        <button 
        className="addButton"
        onClick={() => setIsModalOpen(true)}
      >
        Добавить актив
      </button>
      <AssetList assets={assets} totalValue={totalValue} />
      {
        isModalOpen && 
        <AddAssetModal
        onClose={() => setIsModalOpen(false)}
        assets={filteredAssets}
        onAdd={handleAddAsset}
        searchQuery={searchQuery? searchQuery : ""}
        setSearchQuery={setSearchQuery}
      />
      }
   
    </div>
  );
}
