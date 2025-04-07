import { FixedSizeList as List } from "react-window";
import { Asset } from "../types";
import AssetRow from "./AssetsRow";
import { memo } from "react";
import "../assets/AssetList.scss";

function AssetList({ assets, totalValue }: { assets: Asset[]; totalValue: number }) {
  const headers = ["актив", "количество", "текущая цена", "общая стоимость", "изм. за 24 часа", "доля в портфеле"];
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <AssetRow asset={assets[index]} totalValue={totalValue} />
    </div>
  );

  return (
    <div className="assetList">
      <div className="listHeader">
        {headers.map((header, indx) => (
          <h3 key={indx}>{header}</h3>
        ))}
      </div>
      <List className="listContainer" height={600} itemCount={assets.length} itemSize={60} width="100%">
        {Row}
      </List>
    </div>
  );
}

export default memo(AssetList);
