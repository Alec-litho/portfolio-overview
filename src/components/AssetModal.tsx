import { useState } from "react";
import "../assets/AssetModal.scss";
import { CryptoData } from "../types";
import { FixedSizeList as List } from "react-window";

interface AddAssetModalProps {
  onClose: () => void;
  assets: CryptoData[];
  onAdd: (asset: CryptoData, amount: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function AddAssetModal({ onClose, assets, onAdd, searchQuery, setSearchQuery }: AddAssetModalProps) {
  const [amount, setAmount] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<CryptoData | null>(null);

  const handleSubmit = () => {
    if (selectedAsset && amount) {
      onAdd(selectedAsset, parseFloat(amount));
      onClose();
    }
  };

  // function Row({ index }: { index: number; style: React.CSSProperties }){
  //   const asset = assets[index];
  //   return (
  //     <div key={asset.s} className={`assetItem ${selectedAsset?.s === asset.s ? "selected" : ""}`} onClick={() => setSelectedAsset(asset)}>
  //     <span>{asset.s}</span>
  //     <span>${asset.p}</span>
  //     <span className={asset.c >= 0 ? "positive" : "negative"}>{asset.c}%</span>
  //   </div>
  //   );
  // };
  console.log("upd");
  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h2>Выберите валюту</h2>
        <input type="text" placeholder="Поиск..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

        {/* <List
         className="assetListModal"
              height={400}
              width="100%"
              itemCount={assets.length}
              itemSize={60} 
              overscanCount={15}
            >
              {Row}
            </List> */}
        <div className="assetListModal">
          {assets.map((asset) => {
            return (
              <div key={asset.s} className={`assetItem ${selectedAsset?.s === asset.s ? "selected" : ""}`} onClick={() => setSelectedAsset(asset)}>
                <span>{asset.s}</span>
                <span>${asset.p}</span>
                <span className={asset.c >= 0 ? "positive" : "negative"}>{asset.c}%</span>
              </div>
            );
          })}
        </div>

        <div className="amountInput">
          <label>Количество:</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>

        <div className="modalActions">
          <button onClick={onClose}>Отмена</button>
          <button onClick={handleSubmit} disabled={!selectedAsset || !amount}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}
