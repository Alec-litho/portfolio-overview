import { removeAsset } from "../store/portfolioSlice";
import type { Asset } from "../types";
import { useAppDispatch } from "../hooks/reduxHooks";
import "../assets/AssetRow.scss";

interface AssetRowProps {
  asset: Asset;
  totalValue: number;
}

export default function AssetRow({ asset, totalValue }: AssetRowProps) {
  const dispatch = useAppDispatch();
  const percentage = ((asset.amount * asset.price) / totalValue) * 100;

  const formatCurrency = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  return (
    <div className="assetRow" onClick={() => dispatch(removeAsset(asset.id))} role="button" tabIndex={0} aria-label={`Remove ${asset.symbol}`}>
      <div className="assetCell">{asset.symbol}</div>
      <div className="assetCell">{asset.amount}</div>
      <div className="assetCell">{formatCurrency(asset.price)}</div>
      <div className="assetCell">{formatCurrency(asset.amount * asset.price)}</div>
      <div className={`assetCell ${Number(asset.change24h) >= 0 ? "positive" : "negative"}`}>{Number(asset.change24h).toFixed(4)}%</div>
      <div className="assetCell">
        <div className="percentageBar">
          <div className="fill" style={{ width: `${percentage.toFixed(2)}%` }} aria-label={`${percentage.toFixed(2)}% of portfolio`} />
        </div>
        {percentage.toFixed(2)}%
      </div>
    </div>
  );
}
