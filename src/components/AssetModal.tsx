import { useState } from "react";
import "../assets/AssetModal.scss";
import { CryptoData } from "../types";

interface AddAssetModalProps {
  onClose: () => void;
  assets: CryptoData[];
  onAdd: (asset: CryptoData, amount: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function AssetModal({ onClose, assets, onAdd, searchQuery, setSearchQuery }: AddAssetModalProps) {
  const [amount, setAmount] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<CryptoData | null>(null);
  const handleSubmit = () => {
    if (selectedAsset && amount) {
      onAdd(selectedAsset, parseFloat(amount));
      onClose();
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="modalHeader">
          <h2>Выберите валюту</h2>
          <input type="text" placeholder="Поиск..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>

        <div className="assetListModal">
          {assets.map((asset) => {
            return (
              <div key={asset.s} className={`assetItem ${selectedAsset?.s === asset.s ? "selected" : ""}`} onClick={() => setSelectedAsset(asset)}>
                <span>{asset.s}</span>
                <span>${asset.A}</span>
                <span className={Number(asset.P) >= 0 ? "positive" : "negative"}>{Number(asset.P).toFixed(2)}%</span>
              </div>
            );
          })}
        </div>

        <div className="amountInput">
          <label>Количество:</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>

        <div className="modalActions">
          <button onClick={onClose} className="btn-danger">
            Отмена
          </button>
          <button onClick={handleSubmit} disabled={!selectedAsset || !amount} className="btn-success">
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}
