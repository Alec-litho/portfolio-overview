import "./assets/Portfolio.scss";
import "./assets/app.scss";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useMemo, useState } from "react";
import AssetList from "./components/AssetList";
import { useWebSocket } from "./hooks/useWebSocket";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { AssetModal } from "./components/AssetModal";
import { addAsset, updateAssets } from "./store/portfolioSlice";
import { Asset, CryptoData } from "./types";

export function Portfolio() {
  const assets = useAppSelector((state) => state.portfolio);
  console.log(assets.assets)
  const totalValue = useMemo(() => assets.assets.reduce((sum: number, asset: Asset) => sum += asset.amount, 0), [assets]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const cryptoList = useWebSocket(5000);

  const dispatch = useAppDispatch();
  const filteredAssets: CryptoData[] = searchQuery !== null ? cryptoList.filter((asset: CryptoData) => asset.s.toLowerCase().includes(searchQuery.toLowerCase())) : cryptoList;

  useEffect(() => {
    dispatch(updateAssets(cryptoList));
  }, [cryptoList]);

  const handleAddAsset = (asset: CryptoData, amount: number) => {
    dispatch(
      addAsset({
        id: uuidv4(),
        symbol: asset.s,
        amount,
        price: asset.A,
        change24h: asset.P,
      })
    );
  };
  return (
    <div className="portfolioContainer">
      <button className="addButton" onClick={() => setIsModalOpen(true)}>
        Добавить актив
      </button>
      <AssetList assets={assets.assets} totalValue={totalValue} />
      {isModalOpen && (
        <AssetModal
          onClose={() => setIsModalOpen(false)}
          assets={filteredAssets}
          onAdd={handleAddAsset}
          searchQuery={searchQuery ? searchQuery : ""}
          setSearchQuery={setSearchQuery}
        />
      )}
    </div>
  );
}
