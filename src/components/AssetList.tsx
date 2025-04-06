import { FixedSizeList as List } from "react-window";
import { Asset } from "../types";
import AssetRow from "./AssetsRow";
import { memo } from "react";
import "../assets/AssetList.scss";

function AssetList({ assets, totalValue }: { assets: Asset[]; totalValue: number }) {
  console.log("upd list");
  const AllRows = () => assets.map((asset: Asset, index) => <AssetRow key={index} asset={asset} totalValue={totalValue}></AssetRow>);

  return (
    <div className="assetList">
      <div className="listHeader"></div>
      <List className="listContainer" height={600} itemCount={assets.length} itemSize={60} width="100%" itemData={{ assets, totalValue }}>
        {AllRows}
      </List>
    </div>
  );
}

export default memo(AssetList);
